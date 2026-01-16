-- Add notification and analytics preferences to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS push_notifications_enabled boolean NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS analytics_enabled boolean NOT NULL DEFAULT true;