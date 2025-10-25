import { pgTable, serial, integer, text, varchar, timestamp, decimal, boolean, jsonb } from 'drizzle-orm/pg-core';

// Menu Items Table
export const menuItems = pgTable('menu_items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  category: varchar('category', { length: 100 }).notNull(), // e.g., 'pizza', 'savory', 'dessert', 'seasonal'
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url'),
  available: boolean('available').default(true).notNull(),
  ingredients: jsonb('ingredients').$type<string[]>(),
  allergens: jsonb('allergens').$type<string[]>(),
  isVegetarian: boolean('is_vegetarian').default(false),
  isVegan: boolean('is_vegan').default(false),
  isGlutenFree: boolean('is_gluten_free').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Events Table
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  address: text('address').notNull(),
  latitude: decimal('latitude', { precision: 10, scale: 8 }),
  longitude: decimal('longitude', { precision: 11, scale: 8 }),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  status: varchar('status', { length: 50 }).default('scheduled').notNull(), // scheduled, active, completed, cancelled
  imageUrl: text('image_url'),
  maxCapacity: integer('max_capacity'),
  currentAttendees: integer('current_attendees').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Catering Requests Table
export const cateringRequests = pgTable('catering_requests', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull(),
  eventDate: timestamp('event_date').notNull(),
  eventType: varchar('event_type', { length: 100 }).notNull(), // e.g., 'wedding', 'corporate', 'birthday', 'other'
  guestCount: integer('guest_count').notNull(),
  location: text('location').notNull(),
  message: text('message'),
  menuPreferences: jsonb('menu_preferences').$type<string[]>(),
  dietaryRestrictions: text('dietary_restrictions'),
  budget: varchar('budget', { length: 100 }),
  status: varchar('status', { length: 50 }).default('pending').notNull(), // pending, contacted, quoted, confirmed, completed, cancelled
  squareCustomerId: varchar('square_customer_id', { length: 255 }),
  zapierWebhookSent: boolean('zapier_webhook_sent').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Type exports for TypeScript
export type MenuItemType = typeof menuItems.$inferSelect;
export type NewMenuItem = typeof menuItems.$inferInsert;

export type EventType = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

export type CateringRequestType = typeof cateringRequests.$inferSelect;
export type NewCateringRequest = typeof cateringRequests.$inferInsert;
