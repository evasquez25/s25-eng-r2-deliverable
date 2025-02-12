-- Add endangered column to species table
ALTER TABLE species
ADD COLUMN endangered BOOLEAN NOT NULL DEFAULT false;
