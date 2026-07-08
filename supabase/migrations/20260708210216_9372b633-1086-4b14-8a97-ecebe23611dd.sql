
CREATE TABLE public.download_clicks (
  id INT PRIMARY KEY DEFAULT 1,
  count BIGINT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO public.download_clicks (id, count) VALUES (1, 0);

-- No direct grants to anon/authenticated: all access goes via SECURITY DEFINER functions.
GRANT ALL ON public.download_clicks TO service_role;

ALTER TABLE public.download_clicks ENABLE ROW LEVEL SECURITY;

-- No policies: table is locked to clients. Server code uses service_role.

CREATE OR REPLACE FUNCTION public.increment_download_clicks()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  UPDATE public.download_clicks
     SET count = count + 1,
         updated_at = now()
   WHERE id = 1
   RETURNING count INTO new_count;
  RETURN new_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_download_clicks() TO anon, authenticated;
