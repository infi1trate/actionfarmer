CREATE OR REPLACE FUNCTION public.sync_plant_progress_after_session()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  completed_count integer;
  derived_stage integer;
BEGIN
  IF NEW.status NOT IN ('completed', 'submitted') THEN
    RETURN NEW;
  END IF;

  SELECT count(*)
  INTO completed_count
  FROM public.challenge_sessions
  WHERE user_id = NEW.user_id
    AND status IN ('completed', 'submitted');

  IF completed_count <= 0 THEN
    derived_stage := 0;
  ELSE
    derived_stage := ((completed_count - 1) % 7) + 1;
  END IF;

  INSERT INTO public.plants (user_id, current_stage)
  SELECT NEW.user_id, derived_stage
  WHERE NOT EXISTS (
    SELECT 1
    FROM public.plants
    WHERE user_id = NEW.user_id
  );

  UPDATE public.plants
  SET current_stage = derived_stage,
      updated_at = now()
  WHERE id = (
    SELECT id
    FROM public.plants
    WHERE user_id = NEW.user_id
    ORDER BY updated_at DESC
    LIMIT 1
  );

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.sync_plant_progress_after_session() FROM PUBLIC, anon, authenticated;