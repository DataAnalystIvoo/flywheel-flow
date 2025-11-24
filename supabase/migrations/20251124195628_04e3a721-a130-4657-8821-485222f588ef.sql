-- Create table for flywheel analyses history
CREATE TABLE public.flywheel_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  period_label TEXT NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  attract NUMERIC NOT NULL DEFAULT 0,
  engage NUMERIC NOT NULL DEFAULT 0,
  delight NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.flywheel_analyses ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Users can view their own analyses"
ON public.flywheel_analyses
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own analyses"
ON public.flywheel_analyses
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analyses"
ON public.flywheel_analyses
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own analyses"
ON public.flywheel_analyses
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Allow anonymous users to insert without user_id (for testing without auth)
CREATE POLICY "Anonymous users can create analyses"
ON public.flywheel_analyses
FOR INSERT
TO anon
WITH CHECK (user_id IS NULL);

-- Allow anonymous users to view analyses without user_id
CREATE POLICY "Anonymous users can view their analyses"
ON public.flywheel_analyses
FOR SELECT
TO anon
USING (user_id IS NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_flywheel_analyses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_flywheel_analyses_updated_at
BEFORE UPDATE ON public.flywheel_analyses
FOR EACH ROW
EXECUTE FUNCTION public.update_flywheel_analyses_updated_at();