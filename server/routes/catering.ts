import { Router, Request, Response } from 'express';
import { db } from '../db/index';
import { cateringRequests } from '../db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import axios from 'axios';

const router = Router();

// Validation schema for catering requests
const cateringRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Phone number is required'),
  eventDate: z.string().datetime('Valid event date is required'),
  eventType: z.string().min(1, 'Event type is required'),
  guestCount: z.number().int().positive('Guest count must be positive'),
  location: z.string().min(1, 'Location is required'),
  message: z.string().optional(),
  menuPreferences: z.array(z.string()).optional(),
  dietaryRestrictions: z.string().optional(),
  budget: z.string().optional(),
});

// Helper function to send webhook to Zapier
async function sendToZapier(data: any): Promise<boolean> {
  const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;

  if (!zapierWebhookUrl) {
    console.warn('ZAPIER_WEBHOOK_URL not configured, skipping webhook');
    return false;
  }

  try {
    await axios.post(zapierWebhookUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    });
    return true;
  } catch (error) {
    console.error('Failed to send webhook to Zapier:', error);
    return false;
  }
}

// Helper function to create Square customer (placeholder for future implementation)
async function createSquareCustomer(data: any): Promise<string | null> {
  const squareAccessToken = process.env.SQUARE_ACCESS_TOKEN;

  if (!squareAccessToken) {
    console.warn('SQUARE_ACCESS_TOKEN not configured, skipping Square integration');
    return null;
  }

  // TODO: Implement actual Square API integration
  // This is a placeholder for the Square customer creation
  console.log('Square integration would create customer here');
  return null;
}

// POST /api/catering - Submit a catering request
router.post('/', async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedData = cateringRequestSchema.parse(req.body);

    // Create Square customer (if configured)
    const squareCustomerId = await createSquareCustomer({
      email: validatedData.email,
      name: validatedData.name,
      phone: validatedData.phone,
    });

    // Insert catering request into database
    const [newRequest] = await db
      .insert(cateringRequests)
      .values({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        eventDate: new Date(validatedData.eventDate),
        eventType: validatedData.eventType,
        guestCount: validatedData.guestCount,
        location: validatedData.location,
        message: validatedData.message || null,
        menuPreferences: validatedData.menuPreferences || null,
        dietaryRestrictions: validatedData.dietaryRestrictions || null,
        budget: validatedData.budget || null,
        squareCustomerId: squareCustomerId || null,
        status: 'pending',
        zapierWebhookSent: false,
      })
      .returning();

    // Send to Zapier automation pipeline
    const webhookSent = await sendToZapier({
      requestId: newRequest.id,
      ...validatedData,
      squareCustomerId,
      submittedAt: new Date().toISOString(),
    });

    // Update webhook status if sent successfully
    if (webhookSent) {
      await db
        .update(cateringRequests)
        .set({ zapierWebhookSent: true })
        .where(eq(cateringRequests.id, newRequest.id));
    }

    res.status(201).json({
      success: true,
      data: {
        id: newRequest.id,
        status: newRequest.status,
        message: 'Catering request submitted successfully. We will contact you soon!',
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.errors,
      });
    }

    console.error('Error creating catering request:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to submit catering request',
    });
  }
});

// GET /api/catering/:id - Get a specific catering request (admin use)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid catering request ID',
      });
    }

    const [request] = await db
      .select()
      .from(cateringRequests)
      .where(eq(cateringRequests.id, id));

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Catering request not found',
      });
    }

    res.json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error('Error fetching catering request:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch catering request',
    });
  }
});

export default router;
