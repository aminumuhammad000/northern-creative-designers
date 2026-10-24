-- ==============================================================================
-- Northern Creative Designers Summit 2.0 (NCD Summit 26)
-- Complete Database Initialization Script for Supabase
-- Theme: Roots & Vectors: Shaping the Future of Arewa Design
-- ==============================================================================

-- 0. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. Events Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  edition TEXT NOT NULL,
  theme TEXT NOT NULL,
  subtheme TEXT,
  venue TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Nigeria',
  event_date TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN DEFAULT false,
  registration_open BOOLEAN DEFAULT true,
  voting_open BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- ==============================================================================
-- 2. Profiles Table (Linked to auth.users)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'attendee', -- attendee, speaker, volunteer, admin
  avatar_url TEXT,
  bio TEXT,
  organization TEXT,
  portfolio_url TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- ==============================================================================
-- 3. Registrations Table
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE RESTRICT,
  reference_code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  creative_discipline TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  city_state TEXT NOT NULL,
  organization TEXT,
  portfolio_url TEXT,
  interests TEXT[],
  tshirt_size TEXT DEFAULT 'L',
  dietary_requirements TEXT,
  special_expectations TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed', -- confirmed, cancelled, waitlisted
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- ==============================================================================
-- 4. Tickets Table (Cryptographic Pass & QR Validation)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE RESTRICT,
  ticket_token TEXT UNIQUE NOT NULL, -- Unguessable token
  qr_code_url TEXT,
  checked_in BOOLEAN DEFAULT false,
  checked_in_at TIMESTAMPTZ,
  checked_in_by UUID REFERENCES public.profiles(id),
  status TEXT NOT NULL DEFAULT 'valid', -- valid, void, cancelled
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- ==============================================================================
-- 5. Exhibitor Applications
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.exhibitor_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE RESTRICT,
  business_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  website TEXT,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  special_requirements TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected, waitlisted
  assigned_booth TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- ==============================================================================
-- 6. Hackathons & 2-Hour Live Sprints
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.hackathons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  description TEXT,
  sprint_duration_minutes INT NOT NULL DEFAULT 120,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'upcoming' -- upcoming, active, voting, completed
);

CREATE TABLE IF NOT EXISTS public.hackathon_teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hackathon_id UUID NOT NULL REFERENCES public.hackathons(id) ON DELETE CASCADE,
  team_name TEXT NOT NULL UNIQUE,
  lead_name TEXT NOT NULL,
  lead_email TEXT NOT NULL,
  lead_phone TEXT NOT NULL,
  team_size INT NOT NULL DEFAULT 2,
  track TEXT NOT NULL,
  portfolio_url TEXT,
  pitch TEXT,
  status TEXT NOT NULL DEFAULT 'applied', -- applied, shortlisted, stage_finalist, winner
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

CREATE TABLE IF NOT EXISTS public.hackathon_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hackathon_id UUID NOT NULL REFERENCES public.hackathons(id) ON DELETE CASCADE,
  team_id UUID NOT NULL REFERENCES public.hackathon_teams(id) ON DELETE CASCADE,
  voter_token TEXT NOT NULL,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  CONSTRAINT unique_vote_per_token UNIQUE (hackathon_id, voter_token)
);

-- ==============================================================================
-- 7. Automatic Profile Provisioning Trigger on User Sign Up
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Summit Delegate'),
    new.email,
    new.raw_user_meta_data->>'phone',
    COALESCE(new.raw_user_meta_data->>'role', 'attendee')
  )
  ON CONFLICT (id) DO UPDATE
  SET full_name = EXCLUDED.full_name,
      phone = EXCLUDED.phone;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 8. Row Level Security (RLS) Setup
-- ==============================================================================
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exhibitor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hackathon_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hackathon_votes ENABLE ROW LEVEL SECURITY;

-- 8.1 Events Policies
DROP POLICY IF EXISTS "Public events are viewable by everyone" ON public.events;
CREATE POLICY "Public events are viewable by everyone" ON public.events
  FOR SELECT USING (true);

-- 8.2 Profiles Policies
DROP POLICY IF EXISTS "Users can view all public profiles" ON public.profiles;
CREATE POLICY "Users can view all public profiles" ON public.profiles
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 8.3 Registrations Policies
DROP POLICY IF EXISTS "Anyone can create a registration" ON public.registrations;
CREATE POLICY "Anyone can create a registration" ON public.registrations
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view their own registration" ON public.registrations;
CREATE POLICY "Users can view their own registration" ON public.registrations
  FOR SELECT USING (
    auth.uid() = user_id 
    OR email = (auth.jwt()->>'email')
  );

-- 8.4 Tickets Policies
DROP POLICY IF EXISTS "Users can view their own tickets" ON public.tickets;
CREATE POLICY "Users can view their own tickets" ON public.tickets
  FOR SELECT USING (
    registration_id IN (
      SELECT id FROM public.registrations 
      WHERE user_id = auth.uid() OR email = (auth.jwt()->>'email')
    )
  );

DROP POLICY IF EXISTS "Anyone can insert ticket on registration" ON public.tickets;
CREATE POLICY "Anyone can insert ticket on registration" ON public.tickets
  FOR INSERT WITH CHECK (true);

-- 8.5 Exhibitor Applications Policies
DROP POLICY IF EXISTS "Anyone can submit exhibitor application" ON public.exhibitor_applications;
CREATE POLICY "Anyone can submit exhibitor application" ON public.exhibitor_applications
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Exhibitors can view their own applications" ON public.exhibitor_applications;
CREATE POLICY "Exhibitors can view their own applications" ON public.exhibitor_applications
  FOR SELECT USING (email = (auth.jwt()->>'email'));

-- 8.6 Hackathons & Teams Policies
DROP POLICY IF EXISTS "Public hackathons are viewable by everyone" ON public.hackathons;
CREATE POLICY "Public hackathons are viewable by everyone" ON public.hackathons
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Shortlisted teams are viewable by everyone" ON public.hackathon_teams;
CREATE POLICY "Shortlisted teams are viewable by everyone" ON public.hackathon_teams
  FOR SELECT USING (status IN ('shortlisted', 'stage_finalist', 'winner'));

DROP POLICY IF EXISTS "Anyone can apply as hackathon team" ON public.hackathon_teams;
CREATE POLICY "Anyone can apply as hackathon team" ON public.hackathon_teams
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can submit one hackathon vote" ON public.hackathon_votes;
CREATE POLICY "Anyone can submit one hackathon vote" ON public.hackathon_votes
  FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- 9. Seed Data (Summit 2.0 Default Event, Hackathon, and Finalist Teams)
-- ==============================================================================
INSERT INTO public.events (
  slug,
  name,
  edition,
  theme,
  subtheme,
  venue,
  city,
  country,
  event_date,
  is_active,
  registration_open,
  voting_open
) VALUES (
  'summit-2-0',
  'Northern Creative Designers Summit',
  '2.0',
  'Roots & Vectors: Shaping the Future of Arewa Design',
  'Bridging Indigenous Storytelling with Cutting-Edge Modern Craft',
  'Kano, Nigeria',
  'Kano',
  'Nigeria',
  '2026-12-19 08:30:00+01',
  true,
  true,
  false
) ON CONFLICT (slug) DO UPDATE
SET theme = EXCLUDED.theme,
    subtheme = EXCLUDED.subtheme,
    event_date = EXCLUDED.event_date;

-- Insert Seed Hackathon
INSERT INTO public.hackathons (
  id,
  event_id,
  title,
  description,
  sprint_duration_minutes,
  status
)
SELECT 
  'a0000000-0000-0000-0000-000000000001'::uuid,
  e.id,
  'Roots & Vectors: 2-Hour Live Stage Design Sprint',
  'Shortlisted teams build live cultural product concepts on stage in 120 minutes with audience voting.',
  120,
  'active'
FROM public.events e
WHERE e.slug = 'summit-2-0'
ON CONFLICT (id) DO NOTHING;

-- Insert Seed Shortlisted Teams
INSERT INTO public.hackathon_teams (
  id,
  hackathon_id,
  team_name,
  lead_name,
  lead_email,
  lead_phone,
  team_size,
  track,
  pitch,
  status
) VALUES
(
  'b0000000-0000-0000-0000-000000000001'::uuid,
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'Team Arewa Heritage UI',
  'Fatima Sani',
  'fatima.sani@example.com',
  '08031112233',
  3,
  'UI/UX & Mobile Products',
  'Revitalizing traditional Hausa architectural motifs into modern accessible mobile UI design systems.',
  'shortlisted'
),
(
  'b0000000-0000-0000-0000-000000000002'::uuid,
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'Vector Craft Studio',
  'Aliyu Umar',
  'aliyu.umar@example.com',
  '08034445566',
  2,
  'Brand Identity Systems',
  'Bridging Northern indigenous leathercraft textures into contemporary digital visual brands.',
  'shortlisted'
),
(
  'b0000000-0000-0000-0000-000000000003'::uuid,
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'Northern Motion Lab',
  'Zainab Abubakar',
  'zainab.abubakar@example.com',
  '08037778899',
  3,
  '3D & Interactive Motion',
  '3D interactive cultural archives spotlighting Arewa folklore and creative storytelling.',
  'stage_finalist'
)
ON CONFLICT (id) DO NOTHING;
