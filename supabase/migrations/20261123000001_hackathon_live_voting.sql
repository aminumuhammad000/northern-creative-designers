-- ==============================================================================
-- Migration: 20261123000001_hackathon_live_voting.sql
-- Northern Design Hackathon 2.0 Live Voting, Profiles, Jury & Leaderboard System
-- ==============================================================================

-- 1. Extend hackathons table with voting window controls and publishing flags
ALTER TABLE public.hackathons
ADD COLUMN IF NOT EXISTS voting_starts_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS voting_ends_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS voting_duration_minutes INT NOT NULL DEFAULT 20,
ADD COLUMN IF NOT EXISTS results_published BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS is_rehearsal BOOLEAN DEFAULT false;

-- 2. Extend hackathon_teams table with profile and project presentation fields
ALTER TABLE public.hackathon_teams
ADD COLUMN IF NOT EXISTS professional_title TEXT,
ADD COLUMN IF NOT EXISTS avatar_url TEXT,
ADD COLUMN IF NOT EXISTS project_title TEXT,
ADD COLUMN IF NOT EXISTS short_description TEXT,
ADD COLUMN IF NOT EXISTS detailed_description TEXT,
ADD COLUMN IF NOT EXISTS problem_statement TEXT,
ADD COLUMN IF NOT EXISTS proposed_solution TEXT,
ADD COLUMN IF NOT EXISTS target_audience TEXT,
ADD COLUMN IF NOT EXISTS presentation_url TEXT,
ADD COLUMN IF NOT EXISTS is_winner BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS winner_badge TEXT;

-- 3. Create Jury Evaluation Table for 70% weighted scoring
CREATE TABLE IF NOT EXISTS public.hackathon_jury_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hackathon_id UUID NOT NULL REFERENCES public.hackathons(id) ON DELETE CASCADE,
  team_id UUID NOT NULL REFERENCES public.hackathon_teams(id) ON DELETE CASCADE,
  judge_name TEXT NOT NULL,
  judge_email TEXT,
  cultural_semiotics NUMERIC(5,2) NOT NULL DEFAULT 0,
  problem_solution NUMERIC(5,2) NOT NULL DEFAULT 0,
  craft_execution NUMERIC(5,2) NOT NULL DEFAULT 0,
  presentation NUMERIC(5,2) NOT NULL DEFAULT 0,
  total_score NUMERIC(5,2) NOT NULL DEFAULT 0,
  feedback TEXT,
  status TEXT NOT NULL DEFAULT 'draft', -- 'draft', 'locked'
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc', now()),
  CONSTRAINT unique_judge_team UNIQUE (hackathon_id, team_id, judge_name)
);

-- 4. Create Hackathon Audit Log Table for administrative security
CREATE TABLE IF NOT EXISTS public.hackathon_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hackathon_id UUID REFERENCES public.hackathons(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  actor TEXT NOT NULL DEFAULT 'admin',
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc', now())
);

-- 5. Indexes for high-speed live voting tally and leaderboard aggregation
CREATE INDEX IF NOT EXISTS idx_hackathon_votes_tally 
ON public.hackathon_votes (hackathon_id, team_id);

CREATE INDEX IF NOT EXISTS idx_hackathon_teams_status 
ON public.hackathon_teams (hackathon_id, status);

CREATE INDEX IF NOT EXISTS idx_jury_scores_team 
ON public.hackathon_jury_scores (hackathon_id, team_id);

-- 6. Enable RLS on new tables
ALTER TABLE public.hackathon_jury_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hackathon_audit_logs ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies
-- Public can view jury scores only if results are officially published
DROP POLICY IF EXISTS "Public can view jury scores when results published" ON public.hackathon_jury_scores;
CREATE POLICY "Public can view jury scores when results published" ON public.hackathon_jury_scores
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.hackathons 
      WHERE public.hackathons.id = hackathon_jury_scores.hackathon_id 
      AND public.hackathons.results_published = true
    )
  );

-- Admins / Service role can perform all operations
DROP POLICY IF EXISTS "Admins have full access to jury scores" ON public.hackathon_jury_scores;
CREATE POLICY "Admins have full access to jury scores" ON public.hackathon_jury_scores
  FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Admins have full access to audit logs" ON public.hackathon_audit_logs;
CREATE POLICY "Admins have full access to audit logs" ON public.hackathon_audit_logs
  FOR ALL USING (auth.role() = 'service_role');

-- 8. Seed default project information for the initial finalists
UPDATE public.hackathon_teams
SET 
  professional_title = 'Lead Product & Interaction Designer',
  avatar_url = '/images/community/ncd_student_showcase.jpg',
  project_title = 'Kano Heritage UI: Hausa Motif Design System',
  short_description = 'An accessible, culturally-grounded design system translating indigenous Hausa architecture into scalable mobile interfaces.',
  detailed_description = 'Kano Heritage UI digitizes Northern Nigerian geometric patterns and decorative wall motifs (Zanen Gida) into WCAG-compliant design tokens, icon sets, and React components tailored for financial and e-commerce apps across the Sahel region.',
  problem_statement = 'Modern Northern Nigerian fintech apps lack localized cultural resonance and accessibility for bilingual Hausa-English speakers.',
  proposed_solution = 'A unified vector design kit with typography optimized for Arewa cultural identity and high-contrast accessibility.',
  target_audience = 'Northern Nigerian digital product designers, mobile app builders, and regional technology startups.',
  presentation_url = 'https://figma.com/@ncd_heritage_ui',
  status = 'stage_finalist'
WHERE id = 'b0000000-0000-0000-0000-000000000001';

UPDATE public.hackathon_teams
SET 
  professional_title = 'Brand Identity & Visual Typographer',
  avatar_url = '/images/community/ncd_class_training.jpg',
  project_title = 'Tafarki Craft: Contemporary Leather Branding',
  short_description = 'A contemporary visual identity and sustainable packaging system rooted in centuries-old Kano tannery craftsmanship.',
  detailed_description = 'Tafarki Craft synthesizes traditional vegetal tanning textures, stamp marks, and Arabic-Hausa calligraphic vectors into an export-ready brand packaging suite for artisan tanners.',
  problem_statement = 'Generational Northern leathercraft artisans struggle to access global luxury markets due to obsolete packaging and unstandardized visual identities.',
  proposed_solution = 'A modern luxury branding standard with QR-verified authenticity certificates, tactile box packaging, and localized typography.',
  target_audience = 'Artisanal leather cooperatives, fashion designers, and international luxury craft distributors.',
  presentation_url = 'https://behance.net/gallery/tafarki_craft',
  status = 'stage_finalist'
WHERE id = 'b0000000-0000-0000-0000-000000000002';

UPDATE public.hackathon_teams
SET 
  professional_title = 'Creative Director & 3D Interactive Specialist',
  avatar_url = '/images/community/ncd_peer_interaction.jpg',
  project_title = 'Arewa Archives: 3D Folklore Interactive',
  short_description = 'An immersive web-based 3D digital museum preserving historical Northern artifacts, folklore, and textiles.',
  detailed_description = 'Arewa Archives brings classical Sahelian artifacts, royal regalia, and oral histories to life through real-time WebGL interactive 3D models and spatial audio recordings.',
  problem_statement = 'Historical Arewa cultural relics are scattered and under-documented in digital educational curricula for youth.',
  proposed_solution = 'An open web-based 3D repository optimized for low-bandwidth mobile devices with interactive Hausa audio guides.',
  target_audience = 'Students, cultural researchers, museums, and the global African diaspora.',
  presentation_url = 'https://arewa-archives.example.com',
  status = 'stage_finalist'
WHERE id = 'b0000000-0000-0000-0000-000000000003';
