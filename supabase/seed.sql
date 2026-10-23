-- Northern Creative Designers Summit 2.0 Seed Data

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
) ON CONFLICT (slug) DO NOTHING;
