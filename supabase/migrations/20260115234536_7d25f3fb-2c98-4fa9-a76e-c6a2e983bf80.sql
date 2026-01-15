-- =============================================
-- CHALLENGES CATALOG (Global content table)
-- =============================================
CREATE TABLE public.challenges_catalog (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INT NOT NULL DEFAULT 5,
  difficulty TEXT NOT NULL DEFAULT 'easy' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  video_url TEXT,
  thumbnail_url TEXT,
  icon_emoji TEXT DEFAULT '🏠',
  xp_base INT NOT NULL DEFAULT 20,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public read
ALTER TABLE public.challenges_catalog ENABLE ROW LEVEL SECURITY;

-- Public read-only access
CREATE POLICY "Challenges catalog is publicly readable"
  ON public.challenges_catalog
  FOR SELECT
  USING (true);

-- =============================================
-- PLANTS (User's garden - one active plant per user)
-- =============================================
CREATE TABLE public.plants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_stage INT NOT NULL DEFAULT 0 CHECK (current_stage >= 0 AND current_stage <= 7),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.plants ENABLE ROW LEVEL SECURITY;

-- Users can only see their own plants
CREATE POLICY "Users can view their own plants"
  ON public.plants
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own plants
CREATE POLICY "Users can insert their own plants"
  ON public.plants
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own plants
CREATE POLICY "Users can update their own plants"
  ON public.plants
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own plants
CREATE POLICY "Users can delete their own plants"
  ON public.plants
  FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_plants_updated_at
  BEFORE UPDATE ON public.plants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- CHALLENGE_SESSIONS (User challenge activity)
-- =============================================
CREATE TYPE public.challenge_status AS ENUM ('started', 'submitted', 'completed');

CREATE TABLE public.challenge_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES public.challenges_catalog(id) ON DELETE CASCADE,
  status public.challenge_status NOT NULL DEFAULT 'started',
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INT,
  xp_multiplier NUMERIC(3,2) NOT NULL DEFAULT 1.0,
  points_earned INT NOT NULL DEFAULT 0,
  watering_points INT NOT NULL DEFAULT 0,
  sunlight_points INT NOT NULL DEFAULT 0,
  vitality_multiplier NUMERIC(3,2) NOT NULL DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.challenge_sessions ENABLE ROW LEVEL SECURITY;

-- Users can view their own sessions
CREATE POLICY "Users can view their own challenge sessions"
  ON public.challenge_sessions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own sessions
CREATE POLICY "Users can insert their own challenge sessions"
  ON public.challenge_sessions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own sessions
CREATE POLICY "Users can update their own challenge sessions"
  ON public.challenge_sessions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- =============================================
-- INSIGHTS_WEEKLY (User weekly insights)
-- =============================================
CREATE TABLE public.insights_weekly (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  headline TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  patterns JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.insights_weekly ENABLE ROW LEVEL SECURITY;

-- Users can view their own insights
CREATE POLICY "Users can view their own weekly insights"
  ON public.insights_weekly
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own insights
CREATE POLICY "Users can insert their own weekly insights"
  ON public.insights_weekly
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Unique constraint on user + week
CREATE UNIQUE INDEX idx_insights_weekly_user_week 
  ON public.insights_weekly(user_id, week_start);

-- =============================================
-- SEED CHALLENGES CATALOG WITH EXISTING DATA
-- =============================================
INSERT INTO public.challenges_catalog (id, title, description, duration_minutes, difficulty, video_url, icon_emoji, xp_base) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Grocery Unload', 'Unpack groceries and organize in storage. A calm, focused task to start your day.', 8, 'medium', '/videos/challenge-groceries.mp4', '🛒', 35),
  ('22222222-2222-2222-2222-222222222222', 'Kitchen Cleanup', 'Clear and wipe down kitchen surfaces. Bring order to your cooking space.', 6, 'easy', '/videos/challenge-table.mp4', '🍳', 25),
  ('33333333-3333-3333-3333-333333333333', 'Fold Laundry', 'Fold a load of clean laundry neatly and organize by type.', 10, 'easy', '/videos/challenge-laundry.mp4', '👕', 30),
  ('44444444-4444-4444-4444-444444444444', 'Reset Table', 'Clear and reset a dining table for the next meal.', 4, 'easy', '/videos/challenge-table.mp4', '🍽️', 20),
  ('55555555-5555-5555-5555-555555555555', 'Sort Recycling', 'Separate recyclables into proper bins.', 5, 'easy', '/videos/challenge-recycling.mp4', '♻️', 20),
  ('66666666-6666-6666-6666-666666666666', 'Make the Bed', 'Create a crisp, welcoming bed setup.', 3, 'easy', '/videos/challenge-bed.mp4', '🛏️', 15),
  ('77777777-7777-7777-7777-777777777777', 'Handle Fragile Items', 'Carefully pack or unpack delicate items.', 7, 'hard', '/videos/challenge-fragile.mp4', '📦', 40),
  ('88888888-8888-8888-8888-888888888888', 'Fill Dishwasher', 'Load dishes efficiently for a full cycle.', 5, 'easy', '/videos/challenge-dishwasher.mp4', '🧼', 20),
  ('99999999-9999-9999-9999-999999999999', 'Organize Shelf', 'Arrange items on a shelf or bookcase neatly.', 8, 'medium', '/videos/challenge-shelf.mp4', '📚', 30),
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Multitask Challenge', 'Handle multiple small tasks in sequence.', 12, 'hard', '/videos/challenge-multitask.mp4', '⚡', 50);