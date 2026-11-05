-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Custom Types (Enums)
create type appointment_status as enum ('pending', 'confirmed', 'cancelled', 'completed');
create type appointment_source as enum ('website', 'marham', 'manual');
create type user_role as enum ('admin', 'user');

-- 1. Profiles (Tied to Supabase Auth)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  role user_role default 'user'::user_role,
  full_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Admin Verification Function for RLS
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- 2. Doctor Profiles
create table public.doctor_profiles (
  id uuid primary key default uuid_generate_v4(),
  name_en text not null,
  name_ur text not null,
  bio_en text,
  bio_ur text,
  philosophy_en text,
  philosophy_ur text,
  profile_image_url text,
  experience_years integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. Education
create table public.education (
  id uuid primary key default uuid_generate_v4(),
  degree_en text not null,
  degree_ur text not null,
  institution_en text not null,
  institution_ur text not null,
  completion_year integer not null,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- 4. Certifications
create table public.certifications (
  id uuid primary key default uuid_generate_v4(),
  title_en text not null,
  title_ur text not null,
  organization_en text,
  organization_ur text,
  year integer,
  certificate_image_url text,
  display_order integer default 0,
  created_at timestamptz default now()
);

-- 5. Specialities
create table public.specialities (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title_en text not null,
  title_ur text not null,
  short_description_en text,
  short_description_ur text,
  full_description_en text,
  full_description_ur text,
  icon_url text,
  image_url text,
  is_published boolean default false,
  display_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. Success Stories
create table public.success_stories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title_en text not null,
  title_ur text not null,
  concern_en text,
  concern_ur text,
  initial_situation_en text,
  initial_situation_ur text,
  approach_en text,
  approach_ur text,
  outcome_en text,
  outcome_ur text,
  image_url text,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 7. Testimonials
create table public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  patient_name_en text not null,
  patient_name_ur text not null,
  review_en text not null,
  review_ur text not null,
  rating integer check (rating >= 1 and rating <= 5),
  is_published boolean default false,
  review_date date default current_date,
  created_at timestamptz default now()
);

-- 8. Blog Categories
create table public.blog_categories (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name_en text not null,
  name_ur text not null,
  created_at timestamptz default now()
);

-- 9. Blog Posts
create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  category_id uuid references public.blog_categories(id) on delete set null,
  title_en text not null,
  title_ur text not null,
  excerpt_en text,
  excerpt_ur text,
  content_en text,
  content_ur text,
  featured_image_url text,
  author_id uuid references public.profiles(id) on delete set null,
  seo_title_en text,
  seo_title_ur text,
  meta_description_en text,
  meta_description_ur text,
  focus_keyword_en text,
  focus_keyword_ur text,
  is_published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 10. Appointments
create table public.appointments (
  id uuid primary key default uuid_generate_v4(),
  reference_code text unique not null,
  patient_name text not null,
  phone text not null,
  whatsapp text,
  email text,
  age integer,
  gender text,
  consultation_type text not null,
  appointment_date date not null,
  appointment_time time not null,
  reason text,
  notes text, -- Admin internal notes
  status appointment_status default 'pending'::appointment_status,
  source appointment_source default 'website'::appointment_source,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 11. Contact Inquiries
create table public.contact_inquiries (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text,
  phone text not null,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- 12. Clinic Settings
create table public.clinic_settings (
  id uuid primary key default uuid_generate_v4(),
  clinic_name_en text not null,
  clinic_name_ur text not null,
  logo_url text,
  phone text,
  whatsapp text,
  email text,
  address_en text,
  address_ur text,
  working_hours_en text,
  working_hours_ur text,
  maps_url text,
  marham_url text,
  facebook_url text,
  instagram_url text,
  updated_at timestamptz default now()
);

-- Indexes for performance
create index idx_specialities_slug on public.specialities(slug);
create index idx_success_stories_slug on public.success_stories(slug);
create index idx_blog_posts_slug on public.blog_posts(slug);
create index idx_appointments_date on public.appointments(appointment_date);
create index idx_appointments_status on public.appointments(status);
create index idx_appointments_ref on public.appointments(reference_code);

-- Trigger Function: Auto-update updated_at column
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply triggers
create trigger set_updated_at_doctor_profiles before update on public.doctor_profiles for each row execute procedure public.handle_updated_at();
create trigger set_updated_at_specialities before update on public.specialities for each row execute procedure public.handle_updated_at();
create trigger set_updated_at_success_stories before update on public.success_stories for each row execute procedure public.handle_updated_at();
create trigger set_updated_at_blog_posts before update on public.blog_posts for each row execute procedure public.handle_updated_at();
create trigger set_updated_at_appointments before update on public.appointments for each row execute procedure public.handle_updated_at();
create trigger set_updated_at_clinic_settings before update on public.clinic_settings for each row execute procedure public.handle_updated_at();

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.doctor_profiles enable row level security;
alter table public.education enable row level security;
alter table public.certifications enable row level security;
alter table public.specialities enable row level security;
alter table public.success_stories enable row level security;
alter table public.testimonials enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_posts enable row level security;
alter table public.appointments enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.clinic_settings enable row level security;

-- Storage Setup
insert into storage.buckets (id, name, public) values ('clinic-media', 'clinic-media', true);

-- RLS POLICIES

-- Profiles: Users can read their own profile. Admins can read/write all.
create policy "Admins can manage profiles" on public.profiles for all using (public.is_admin());
create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);

-- Doctor Profiles: Public can read. Admins can update.
create policy "Public can read doctor profiles" on public.doctor_profiles for select using (true);
create policy "Admins can manage doctor profiles" on public.doctor_profiles for all using (public.is_admin());

-- Education & Certifications: Public can read. Admins can update.
create policy "Public can read education" on public.education for select using (true);
create policy "Admins can manage education" on public.education for all using (public.is_admin());
create policy "Public can read certifications" on public.certifications for select using (true);
create policy "Admins can manage certifications" on public.certifications for all using (public.is_admin());

-- Specialities, Success Stories, Testimonials, Blogs: Public read only if published. Admins all access.
create policy "Public can read published specialities" on public.specialities for select using (is_published = true);
create policy "Admins can manage specialities" on public.specialities for all using (public.is_admin());

create policy "Public can read published success stories" on public.success_stories for select using (is_published = true);
create policy "Admins can manage success stories" on public.success_stories for all using (public.is_admin());

create policy "Public can read published testimonials" on public.testimonials for select using (is_published = true);
create policy "Admins can manage testimonials" on public.testimonials for all using (public.is_admin());

create policy "Public can read categories" on public.blog_categories for select using (true);
create policy "Admins can manage categories" on public.blog_categories for all using (public.is_admin());

create policy "Public can read published blogs" on public.blog_posts for select using (is_published = true);
create policy "Admins can manage blogs" on public.blog_posts for all using (public.is_admin());

-- Appointments: Public can INSERT only. Public CANNOT SELECT. Admins can all.
create policy "Public can insert appointments" on public.appointments for insert with check (true);
create policy "Admins can manage appointments" on public.appointments for all using (public.is_admin());

-- Contact Inquiries: Public can INSERT only. Admins can all.
create policy "Public can insert contact inquiries" on public.contact_inquiries for insert with check (true);
create policy "Admins can manage contact inquiries" on public.contact_inquiries for all using (public.is_admin());

-- Clinic Settings: Public can read. Admins can manage.
create policy "Public can read clinic settings" on public.clinic_settings for select using (true);
create policy "Admins can manage clinic settings" on public.clinic_settings for all using (public.is_admin());

-- Storage Policies (clinic-media bucket)
create policy "Public Access" on storage.objects for select using ( bucket_id = 'clinic-media' );
create policy "Admin Insert" on storage.objects for insert with check ( bucket_id = 'clinic-media' and public.is_admin() );
create policy "Admin Update" on storage.objects for update using ( bucket_id = 'clinic-media' and public.is_admin() );
create policy "Admin Delete" on storage.objects for delete using ( bucket_id = 'clinic-media' and public.is_admin() );