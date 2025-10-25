import * as dotenv from 'dotenv';

// Load environment variables FIRST
dotenv.config();

import { db } from './index';
import { menuItems, events } from './schema';

async function seed() {
  console.log('Seeding database...');

  // Seed menu items
  await db.insert(menuItems).values([
    {
      name: 'Classic Margherita Pizza Pie',
      description: 'Wood-fired pizza pie with San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil',
      category: 'pizza',
      price: '18.00',
      available: true,
      ingredients: ['tomatoes', 'mozzarella', 'basil', 'olive oil', 'pizza dough'],
      allergens: ['gluten', 'dairy'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
    },
    {
      name: 'Pepperoni Explosion',
      description: 'Loaded with premium pepperoni, mozzarella, and our signature tomato sauce',
      category: 'pizza',
      price: '20.00',
      available: true,
      ingredients: ['pepperoni', 'mozzarella', 'tomato sauce', 'pizza dough'],
      allergens: ['gluten', 'dairy', 'pork'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
    },
    {
      name: 'Chicken Pot Pie',
      description: 'Creamy chicken filling with vegetables in a flaky, buttery crust',
      category: 'savory',
      price: '16.00',
      available: true,
      ingredients: ['chicken', 'carrots', 'peas', 'celery', 'cream', 'pie crust'],
      allergens: ['gluten', 'dairy'],
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
    },
    {
      name: 'Classic Apple Pie',
      description: 'Traditional apple pie with cinnamon, brown sugar, and a lattice crust',
      category: 'dessert',
      price: '14.00',
      available: true,
      ingredients: ['apples', 'cinnamon', 'brown sugar', 'butter', 'pie crust'],
      allergens: ['gluten', 'dairy'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
    },
    {
      name: 'Pumpkin Spice Pie',
      description: 'Seasonal favorite with pumpkin puree, warm spices, and whipped cream',
      category: 'seasonal',
      price: '15.00',
      available: true,
      ingredients: ['pumpkin', 'cream', 'eggs', 'cinnamon', 'nutmeg', 'pie crust'],
      allergens: ['gluten', 'dairy', 'eggs'],
      isVegetarian: true,
      isVegan: false,
      isGlutenFree: false,
    },
    {
      name: 'Vegan Mediterranean Pizza',
      description: 'Plant-based pizza with roasted vegetables, olives, and vegan cheese',
      category: 'pizza',
      price: '19.00',
      available: true,
      ingredients: ['zucchini', 'eggplant', 'bell peppers', 'olives', 'vegan cheese', 'pizza dough'],
      allergens: ['gluten'],
      isVegetarian: true,
      isVegan: true,
      isGlutenFree: false,
    },
  ]);

  // Seed events
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(now);
  nextWeek.setDate(nextWeek.getDate() + 7);

  await db.insert(events).values([
    {
      title: 'Downtown Food Truck Friday',
      description: 'Join us at the downtown plaza for our weekly pizza pie extravaganza!',
      location: 'Downtown Plaza',
      address: '123 Main Street, Downtown',
      latitude: '37.7749',
      longitude: '-122.4194',
      startTime: tomorrow,
      endTime: new Date(tomorrow.getTime() + 4 * 60 * 60 * 1000), // 4 hours later
      status: 'scheduled',
      maxCapacity: 100,
      currentAttendees: 0,
    },
    {
      title: 'Farmers Market Pop-Up',
      description: 'Fresh pies at the local farmers market. Come grab a slice!',
      location: 'City Farmers Market',
      address: '456 Market Ave, Farmers District',
      latitude: '37.7849',
      longitude: '-122.4094',
      startTime: nextWeek,
      endTime: new Date(nextWeek.getTime() + 5 * 60 * 60 * 1000), // 5 hours later
      status: 'scheduled',
      maxCapacity: 150,
      currentAttendees: 0,
    },
  ]);

  console.log('Database seeded successfully!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
