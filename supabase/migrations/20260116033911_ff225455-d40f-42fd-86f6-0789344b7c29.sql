-- Create stripe_onboarding_status enum
CREATE TYPE public.stripe_onboarding_status AS ENUM ('not_connected', 'pending', 'enabled');

-- Create payout_request_status enum
CREATE TYPE public.payout_request_status AS ENUM ('requested', 'processing', 'paid', 'failed', 'canceled');

-- Add Stripe Connect fields to profiles
ALTER TABLE public.profiles
ADD COLUMN stripe_account_id TEXT,
ADD COLUMN stripe_onboarding_status public.stripe_onboarding_status NOT NULL DEFAULT 'not_connected',
ADD COLUMN payouts_enabled BOOLEAN NOT NULL DEFAULT false;

-- Create payout_requests table
CREATE TABLE public.payout_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  amount_cents INTEGER NOT NULL,
  status public.payout_request_status NOT NULL DEFAULT 'requested',
  stripe_transfer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on payout_requests
ALTER TABLE public.payout_requests ENABLE ROW LEVEL SECURITY;

-- RLS policies for payout_requests
CREATE POLICY "Users can view their own payout requests"
ON public.payout_requests
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own payout requests"
ON public.payout_requests
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users should not be able to update or delete payout requests directly
-- These will be handled by server-side functions

-- Add index for faster lookups
CREATE INDEX idx_payout_requests_user_id ON public.payout_requests(user_id);
CREATE INDEX idx_payout_requests_status ON public.payout_requests(status);

-- Add trigger for updated_at on payout_requests
CREATE TRIGGER update_payout_requests_updated_at
BEFORE UPDATE ON public.payout_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();