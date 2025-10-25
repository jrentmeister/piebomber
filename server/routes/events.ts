import { Router, Request, Response } from 'express';
import { db } from '../db/index';
import { events } from '../db/schema';
import { eq, gte } from 'drizzle-orm';

const router = Router();

// GET /api/events - Get all events
router.get('/', async (req: Request, res: Response) => {
  try {
    const { status, upcoming } = req.query;

    let query = db.select().from(events);

    // Filter by status if provided
    if (status && typeof status === 'string') {
      query = query.where(eq(events.status, status)) as any;
    }

    // Filter for upcoming events only
    if (upcoming === 'true') {
      const now = new Date();
      query = query.where(gte(events.startTime, now)) as any;
    }

    const eventsList = await query;

    res.json({
      success: true,
      data: eventsList,
      count: eventsList.length,
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch events',
    });
  }
});

// GET /api/events/:id - Get a specific event
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid event ID',
      });
    }

    const [event] = await db
      .select()
      .from(events)
      .where(eq(events.id, id));

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found',
      });
    }

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch event',
    });
  }
});

export default router;
