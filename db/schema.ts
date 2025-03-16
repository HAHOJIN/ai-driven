import { integer, pgTable, serial, text, timestamp, boolean, primaryKey, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 이미지 스타일 타입 상수 정의 (enum 대신 사용)
export const STYLE_TYPES = {
  PHOTOGRAPHIC: 'photographic',
  DIGITAL_ART: 'digital_art',
  ANIME: 'anime',
  CINEMATIC: 'cinematic',
  CARTOON: 'cartoon',
  PIXEL_ART: 'pixel_art'
} as const;

// 타입 정의를 위한 타입 (TypeScript 타입 시스템에서만 사용)
export type StyleType = typeof STYLE_TYPES[keyof typeof STYLE_TYPES];

// 생성된 이미지 테이블
export const images = pgTable('images', {
  id: serial('id').primaryKey(),
  imageUrl: text('image_url').notNull(),
  prompt: text('prompt').notNull(),
  negativePrompt: text('negative_prompt'),
  style: text('style').notNull(), // enum 대신 text 타입 사용
  width: integer('width').notNull().default(512),
  height: integer('height').notNull().default(512),
  seed: text('seed'),
  storagePath: text('storage_path'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  userId: text('user_id').notNull(),  // Clerk에서 제공하는 사용자 ID
});

// 갤러리 테이블 (사용자가 저장한 이미지 컬렉션)
export const galleryImages = pgTable('gallery_images', {
  id: serial('id').primaryKey(),
  imageId: integer('image_id').references(() => images.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').notNull(),  // Clerk에서 제공하는 사용자 ID
  title: text('title'),
  description: text('description'),
  isFavorite: boolean('is_favorite').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 태그 테이블
export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 이미지-태그 중간 테이블 (다대다 관계)
export const imageTags = pgTable('image_tags', {
  id: serial('id').primaryKey(),
  imageId: integer('image_id').references(() => galleryImages.id, { onDelete: 'cascade' }).notNull(),
  tagId: integer('tag_id').references(() => tags.id, { onDelete: 'cascade' }).notNull(),
});

// 관계 설정
export const imagesRelations = relations(images, ({ many }) => ({
  galleryImages: many(galleryImages),
}));

export const galleryImagesRelations = relations(galleryImages, ({ one, many }) => ({
  image: one(images, {
    fields: [galleryImages.imageId],
    references: [images.id],
  }),
  tags: many(imageTags),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  imageTags: many(imageTags),
}));

export const imageTagsRelations = relations(imageTags, ({ one }) => ({
  image: one(galleryImages, {
    fields: [imageTags.imageId],
    references: [galleryImages.id],
  }),
  tag: one(tags, {
    fields: [imageTags.tagId],
    references: [tags.id],
  }),
}));

// 타입 추론을 위한 export
export type Image = typeof images.$inferSelect;
export type InsertImage = typeof images.$inferInsert;

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = typeof galleryImages.$inferInsert;

export type Tag = typeof tags.$inferSelect;
export type InsertTag = typeof tags.$inferInsert;
