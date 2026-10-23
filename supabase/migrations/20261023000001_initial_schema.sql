-- Northern Creative Designers Summit Digital Platform
-- Initial Database Migration Schema
-- Developed in collaboration with Amee Technology Ltd

-- 1. Events Table
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

-- 2. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'attendee',
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- 3. Registrations Table
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE RESTRICT,
  reference_code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  creative_discipline TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  city_state TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed', -- confirmed, cancelled, waitlisted
  dietary_requirements TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- 4. Tickets Table (Unguessable Cryptographic Tokens for QR Check-in)
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE RESTRICT,
  ticket_token TEXT UNIQUE NOT NULL, -- Cryptographic random string
  qr_code_url TEXT,
  checked_in BOOLEAN DEFAULT false,
  checked_in_at TIMESTAMPTZ,
  checked_in_by UUID REFERENCES public.profiles(id),
  status TEXT NOT NULL DEFAULT 'valid', -- valid, void, cancelled
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- 5. Exhibitor Applications
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

-- 6. Hackathon Teams & Projects
CREATE TABLE IF NOT EXISTS public.hackathons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  sprint_duration_minutes INT NOT NULL DEFAULT 120,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'upcoming'
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

-- Enable Row Level Security (RLS) on all exposed tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exhibitor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hackathon_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hackathon_votes ENABLE ROW LEVEL SECURITY;

-- Public Read Policies for verified event information
CREATE POLICY "Public events are viewable by everyone" ON public.events
  FOR SELECT USING (true);

CREATE POLICY "Public hackathons are viewable by everyone" ON public.hackathons
  FOR SELECT USING (true);

CREATE POLICY "Shortlisted teams are viewable by everyone" ON public.hackathon_teams
  FOR SELECT USING (status IN ('shortlisted', 'stage_finalist', 'winner'));
