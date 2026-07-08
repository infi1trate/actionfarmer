WITH ranked_plants AS (
  SELECT id,
         row_number() OVER (PARTITION BY user_id ORDER BY updated_at DESC, created_at DESC, id DESC) AS rn
  FROM public.plants
)
DELETE FROM public.plants p
USING ranked_plants rp
WHERE p.id = rp.id
  AND rp.rn > 1;

CREATE UNIQUE INDEX IF NOT EXISTS plants_user_id_unique ON public.plants (user_id);