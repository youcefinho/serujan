CREATE TYPE public.lead_type AS ENUM ('buy', 'sell');

CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type public.lead_type NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  address TEXT,
  property_type TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone (anon + authenticated) can insert a lead via the public form
CREATE POLICY "Anyone can submit a lead"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No one can read/update/delete via public API; owner reads from Cloud dashboard
CREATE INDEX idx_leads_created_at ON public.leads (created_at DESC);