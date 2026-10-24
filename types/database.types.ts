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
      events: {
        Row: {
          id: string
          slug: string
          name: string
          edition: string
          theme: string
          subtheme: string | null
          venue: string
          city: string
          country: string
          event_date: string
          is_active: boolean | null
          registration_open: boolean | null
          voting_open: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          name: string
          edition: string
          theme: string
          subtheme?: string | null
          venue: string
          city: string
          country?: string
          event_date: string
          is_active?: boolean | null
          registration_open?: boolean | null
          voting_open?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          edition?: string
          theme?: string
          subtheme?: string | null
          venue?: string
          city?: string
          country?: string
          event_date?: string
          is_active?: boolean | null
          registration_open?: boolean | null
          voting_open?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          role: string
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name: string
          email: string
          phone?: string | null
          role?: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string | null
          role?: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      registrations: {
        Row: {
          id: string
          user_id: string | null
          event_id: string
          reference_code: string
          full_name: string
          email: string
          phone: string
          creative_discipline: string
          experience_level: string
          city_state: string
          organization: string | null
          portfolio_url: string | null
          interests: string[] | null
          tshirt_size: string | null
          dietary_requirements: string | null
          special_expectations: string | null
          status: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          event_id: string
          reference_code: string
          full_name: string
          email: string
          phone: string
          creative_discipline: string
          experience_level: string
          city_state: string
          organization?: string | null
          portfolio_url?: string | null
          interests?: string[] | null
          tshirt_size?: string | null
          dietary_requirements?: string | null
          special_expectations?: string | null
          status?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          event_id?: string
          reference_code?: string
          full_name?: string
          email?: string
          phone?: string
          creative_discipline?: string
          experience_level?: string
          city_state?: string
          organization?: string | null
          portfolio_url?: string | null
          interests?: string[] | null
          tshirt_size?: string | null
          dietary_requirements?: string | null
          special_expectations?: string | null
          status?: string
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      tickets: {
        Row: {
          id: string
          registration_id: string
          event_id: string
          ticket_token: string
          qr_code_url: string | null
          checked_in: boolean | null
          checked_in_at: string | null
          checked_in_by: string | null
          status: string
          created_at: string | null
        }
        Insert: {
          id?: string
          registration_id: string
          event_id: string
          ticket_token: string
          qr_code_url?: string | null
          checked_in?: boolean | null
          checked_in_at?: string | null
          checked_in_by?: string | null
          status?: string
          created_at?: string | null
        }
        Update: {
          id?: string
          registration_id?: string
          event_id?: string
          ticket_token?: string
          qr_code_url?: string | null
          checked_in?: boolean | null
          checked_in_at?: string | null
          checked_in_by?: string | null
          status?: string
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_registration_id_fkey"
            columns: ["registration_id"]
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_checked_in_by_fkey"
            columns: ["checked_in_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      exhibitor_applications: {
        Row: {
          id: string
          event_id: string
          business_name: string
          contact_person: string
          email: string
          phone: string
          website: string | null
          category: string
          description: string
          special_requirements: string | null
          status: string
          assigned_booth: string | null
          notes: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          event_id: string
          business_name: string
          contact_person: string
          email: string
          phone: string
          website?: string | null
          category: string
          description: string
          special_requirements?: string | null
          status?: string
          assigned_booth?: string | null
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          event_id?: string
          business_name?: string
          contact_person?: string
          email?: string
          phone?: string
          website?: string | null
          category?: string
          description?: string
          special_requirements?: string | null
          status?: string
          assigned_booth?: string | null
          notes?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exhibitor_applications_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      hackathons: {
        Row: {
          id: string
          event_id: string
          title: string
          sprint_duration_minutes: number
          starts_at: string | null
          ends_at: string | null
          status: string
        }
        Insert: {
          id?: string
          event_id: string
          title: string
          sprint_duration_minutes?: number
          starts_at?: string | null
          ends_at?: string | null
          status?: string
        }
        Update: {
          id?: string
          event_id?: string
          title?: string
          sprint_duration_minutes?: number
          starts_at?: string | null
          ends_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "hackathons_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
      hackathon_teams: {
        Row: {
          id: string
          hackathon_id: string
          team_name: string
          lead_name: string
          lead_email: string
          lead_phone: string
          team_size: number
          track: string
          portfolio_url: string | null
          status: string
          created_at: string | null
        }
        Insert: {
          id?: string
          hackathon_id: string
          team_name: string
          lead_name: string
          lead_email: string
          lead_phone: string
          team_size?: number
          track: string
          portfolio_url?: string | null
          status?: string
          created_at?: string | null
        }
        Update: {
          id?: string
          hackathon_id?: string
          team_name?: string
          lead_name?: string
          lead_email?: string
          lead_phone?: string
          team_size?: number
          track?: string
          portfolio_url?: string | null
          status?: string
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hackathon_teams_hackathon_id_fkey"
            columns: ["hackathon_id"]
            referencedRelation: "hackathons"
            referencedColumns: ["id"]
          }
        ]
      }
      hackathon_votes: {
        Row: {
          id: string
          hackathon_id: string
          team_id: string
          voter_token: string
          ip_hash: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          hackathon_id: string
          team_id: string
          voter_token: string
          ip_hash?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          hackathon_id?: string
          team_id?: string
          voter_token?: string
          ip_hash?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hackathon_votes_hackathon_id_fkey"
            columns: ["hackathon_id"]
            referencedRelation: "hackathons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hackathon_votes_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "hackathon_teams"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
