import { Router, Request, Response } from 'express';
import { db } from '../db/index';
import { menuItems } from '../db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

// GET /api/menu - Get all menu items
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, available } = req.query;

    let query = db.select().from(menuItems);

    // Filter by category if provided
    if (category && typeof category === 'string') {
      query = query.where(eq(menuItems.category, category)) as any;
    }

    // Filter by availability if provided
    if (available !== undefined) {
      const isAvailable = available === 'true';
      query = query.where(eq(menuItems.available, isAvailable)) as any;
    }

    const items = await query;

    res.json({
      success: true,
      data: items,
      count: items.length,
    });
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch menu items',
    });
  }
});

// GET /api/menu/:id - Get a specific menu item
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid menu item ID',
      });
    }

    const [item] = await db
      .select()
      .from(menuItems)
      .where(eq(menuItems.id, id));

    if (!item) {
      return res.status(404).json({
        success: false,
        error: 'Menu item not found',
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch menu item',
    });
  }
});

export default router;
