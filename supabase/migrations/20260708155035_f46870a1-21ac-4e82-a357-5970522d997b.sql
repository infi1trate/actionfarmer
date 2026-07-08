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
  VALUES (NEW.user_id, derived_stage)
  ON CONFLICT DO NOTHING;

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

DROP TRIGGER IF EXISTS sync_plant_progress_after_session ON public.challenge_sessions;
CREATE TRIGGER sync_plant_progress_after_session
AFTER INSERT OR UPDATE OF status ON public.challenge_sessions
FOR EACH ROW
EXECUTE FUNCTION public.sync_plant_progress_after_session();

WITH completed_counts AS (
  SELECT user_id, count(*)::integer AS completed_count
  FROM public.challenge_sessions
  WHERE status IN ('completed', 'submitted')
  GROUP BY user_id
), derived AS (
  SELECT user_id,
         CASE
           WHEN completed_count <= 0 THEN 0
           ELSE ((completed_count - 1) % 7) + 1
         END AS derived_stage
  FROM completed_counts
)
UPDATE public.plants p
SET current_stage = d.derived_stage,
    updated_at = now()
FROM derived d
WHERE p.user_id = d.user_id;