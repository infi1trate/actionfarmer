export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      challenge_sessions: {
        Row: {
          challenge_id: string
          created_at: string
          duration_seconds: number | null
          ended_at: string | null
          id: string
          points_earned: number
          started_at: string
          status: Database["public"]["Enums"]["challenge_status"]
          sunlight_points: number
          user_id: string
          vitality_multiplier: number
          watering_points: number
          xp_multiplier: number
        }
        Insert: {
          challenge_id: string
          created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          points_earned?: number
          started_at?: string
          status?: Database["public"]["Enums"]["challenge_status"]
          sunlight_points?: number
          user_id: string
          vitality_multiplier?: number
          watering_points?: number
          xp_multiplier?: number
        }
        Update: {
          challenge_id?: string
          created_at?: string
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          points_earned?: number
          started_at?: string
          status?: Database["public"]["Enums"]["challenge_status"]
          sunlight_points?: number
          user_id?: string
          vitality_multiplier?: number
          watering_points?: number
          xp_multiplier?: number
        }
        Relationships: [
          {
            foreignKeyName: "challenge_sessions_challenge_id_fkey"
            columns: ["challenge_id"]
            isOneToOne: false
            referencedRelation: "challenges_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      challenges_catalog: {
        Row: {
          created_at: string
          description: string | null
          difficulty: string
          duration_minutes: number
          icon_emoji: string | null
          id: string
          is_active: boolean
          thumbnail_url: string | null
          title: string
          updated_at: string
          video_url: string | null
          xp_base: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          difficulty?: string
          duration_minutes?: number
          icon_emoji?: string | null
          id?: string
          is_active?: boolean
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
          xp_base?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          difficulty?: string
          duration_minutes?: number
          icon_emoji?: string | null
          id?: string
          is_active?: boolean
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
          xp_base?: number
        }
        Relationships: []
      }
      insights_weekly: {
        Row: {
          created_at: string
          headline: string | null
          highlights: Json | null
          id: string
          patterns: Json | null
          user_id: string
          week_end: string
          week_start: string
        }
        Insert: {
          created_at?: string
          headline?: string | null
          highlights?: Json | null
          id?: string
          patterns?: Json | null
          user_id: string
          week_end: string
          week_start: string
        }
        Update: {
          created_at?: string
          headline?: string | null
          highlights?: Json | null
          id?: string
          patterns?: Json | null
          user_id?: string
          week_end?: string
          week_start?: string
        }
        Relationships: []
      }
      plants: {
        Row: {
          created_at: string
          current_stage: number
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_stage?: number
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_stage?: number
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          analytics_enabled: boolean
          created_at: string
          first_name: string
          id: string
          push_notifications_enabled: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          analytics_enabled?: boolean
          created_at?: string
          first_name: string
          id?: string
          push_notifications_enabled?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          analytics_enabled?: boolean
          created_at?: string
          first_name?: string
          id?: string
          push_notifications_enabled?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          available_balance_cents: number
          created_at: string
          first_reward_amount_cents: number
          first_reward_claimed: boolean
          id: string
          lifetime_earned_cents: number
          pending_balance_cents: number
          updated_at: string
          user_id: string
        }
        Insert: {
          available_balance_cents?: number
          created_at?: string
          first_reward_amount_cents?: number
          first_reward_claimed?: boolean
          id?: string
          lifetime_earned_cents?: number
          pending_balance_cents?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          available_balance_cents?: number
          created_at?: string
          first_reward_amount_cents?: number
          first_reward_claimed?: boolean
          id?: string
          lifetime_earned_cents?: number
          pending_balance_cents?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      challenge_status: "started" | "submitted" | "completed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      challenge_status: ["started", "submitted", "completed"],
    },
  },
} as const
