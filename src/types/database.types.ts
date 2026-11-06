export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'admin' | 'user'
          full_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: { id: string; role?: 'admin' | 'user'; full_name?: string | null; created_at?: string; updated_at?: string }
        Update: { id?: string; role?: 'admin' | 'user'; full_name?: string | null; created_at?: string; updated_at?: string }
      }
      appointments: {
        Row: {
          id: string
          reference_code: string
          patient_name: string
          phone: string
          whatsapp: string | null
          email: string | null
          age: number | null
          gender: string | null
          consultation_type: string
          appointment_date: string
          appointment_time: string
          reason: string | null
          notes: string | null
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          source: 'website' | 'marham' | 'manual'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string; reference_code: string; patient_name: string; phone: string; whatsapp?: string | null; email?: string | null; age?: number | null; gender?: string | null; consultation_type: string; appointment_date: string; appointment_time: string; reason?: string | null; notes?: string | null; status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'; source?: 'website' | 'marham' | 'manual'; created_at?: string; updated_at?: string
        }
        Update: { status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'; notes?: string | null; appointment_date?: string; appointment_time?: string }
      }
      contact_inquiries: {
        Row: { id: string; name: string; email: string | null; phone: string; subject: string | null; message: string; is_read: boolean; created_at: string }
        Insert: { id?: string; name: string; email?: string | null; phone: string; subject?: string | null; message: string; is_read?: boolean; created_at?: string }
        Update: { is_read?: boolean }
      }
      blog_posts: {
        Row: {
          id: string
          slug: string
          category_id: string | null
          title_en: string
          title_ur: string
          excerpt_en: string | null
          excerpt_ur: string | null
          content_en: string | null
          content_ur: string | null
          featured_image_url: string | null
          author_id: string | null
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: { id?: string; slug: string; title_en: string; title_ur: string; is_published?: boolean; created_at?: string; updated_at?: string }
        Update: { is_published?: boolean; updated_at?: string }
      }
      clinic_settings: {
        Row: {
          id: string
          clinic_name_en: string
          clinic_name_ur: string
          logo_url: string | null
          phone: string | null
          whatsapp: string | null
          email: string | null
          address_en: string | null
          address_ur: string | null
          working_hours_en: string | null
          working_hours_ur: string | null
          maps_url: string | null
          marham_url: string | null
          updated_at: string
        }
        Insert: { id?: string; clinic_name_en: string; clinic_name_ur: string; updated_at?: string }
        Update: {
          clinic_name_en?: string
          clinic_name_ur?: string
          phone?: string | null
          whatsapp?: string | null
          email?: string | null
          marham_url?: string | null
          address_en?: string | null
          address_ur?: string | null
          working_hours_en?: string | null
          working_hours_ur?: string | null
          updated_at?: string
        }
      }
      specialities: {
        Row: { id: string; slug: string; title_en: string; title_ur: string; short_description_en: string | null; short_description_ur: string | null; full_description_en: string | null; full_description_ur: string | null; is_published: boolean; created_at: string; updated_at: string }
        Insert: { id?: string; slug: string; title_en: string; title_ur: string; is_published?: boolean }
        Update: { is_published?: boolean }
      }
      success_stories: {
        Row: { id: string; slug: string; title_en: string; title_ur: string; concern_en: string | null; concern_ur: string | null; initial_situation_en: string | null; initial_situation_ur: string | null; approach_en: string | null; approach_ur: string | null; outcome_en: string | null; outcome_ur: string | null; is_published: boolean; created_at: string; updated_at: string }
        Insert: { id?: string; slug: string; title_en: string; title_ur: string; is_published?: boolean }
        Update: { is_published?: boolean }
      }
    }
    Enums: {
      appointment_status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
      appointment_source: 'website' | 'marham' | 'manual'
      user_role: 'admin' | 'user'
    }
  }
}