import { createClient } from "@/lib/supabase/server";

// --- Specialities ---
export async function getPublishedSpecialities() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("specialities")
    .select("*")
    .eq("is_published", true)
    .order("display_order", { ascending: true });

  if (error) console.error("Error fetching specialities:", error);
  return data || [];
}

export async function getSpecialityBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("specialities")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) console.error("Error fetching speciality:", error);
  return data;
}

// --- Blogs ---
export async function getPublishedBlogs() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, blog_categories(name_en, name_ur)")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  if (error) console.error("Error fetching blogs:", error);
  return data || [];
}

export async function getBlogBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*, blog_categories(name_en, name_ur), profiles(full_name)")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) console.error("Error fetching blog post:", error);
  return data;
}

// --- Success Stories ---
export async function getPublishedSuccessStories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("success_stories")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching success stories:", error);
  return data || [];
}

export async function getSuccessStoryBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("success_stories")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) console.error("Error fetching success story:", error);
  return data;
}

// --- Clinic Settings ---
export async function getClinicSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("clinic_settings")
    .select("*")
    .limit(1)
    .single();

  if (error) console.error("Error fetching clinic settings:", error);
  return data;
}