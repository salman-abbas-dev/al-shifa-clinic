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
        Insert: {
          id: string
          role?: 'admin' | 'user'
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'admin' | 'user'
          full_name?: string | null
          created_at?: string
          updated_at?: string
        }
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
          id?: string
          reference_code: string
          patient_name: string
          phone: string
          whatsapp?: string | null
          email?: string | null
          age?: number | null
          gender?: string | null
          consultation_type: string
          appointment_date: string
          appointment_time: string
          reason?: string | null
          notes?: string | null
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          source?: 'website' | 'marham' | 'manual'
          created_at?: string
          updated_at?: string
        }
        Update: {
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          notes?: string | null
          appointment_date?: string
          appointment_time?: string
        }
      }
      contact_inquiries: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string
          subject: string | null
          message: string
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone: string
          subject?: string | null
          message: string
          is_read?: boolean
          created_at?: string
        }
        Update: {
          is_read?: boolean
        }
      }
    }
    Enums: {
      appointment_status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
      appointment_source: 'website' | 'marham' | 'manual'
      user_role: 'admin' | 'user'
    }
  }
}