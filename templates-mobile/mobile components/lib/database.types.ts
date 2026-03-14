
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      brands: {
        Row: {
          created_at: string
          formulation: string | null
          id: string
          manufacturer: string | null
          name: string
          notes: string | null
          serotype: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          formulation?: string | null
          id?: string
          manufacturer?: string | null
          name: string
          notes?: string | null
          serotype?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          formulation?: string | null
          id?: string
          manufacturer?: string | null
          name?: string
          notes?: string | null
          serotype?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      checklist_records: {
        Row: {
          created_at: string
          id: string
          pdf_url: string | null
          procedure_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          pdf_url?: string | null
          procedure_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          pdf_url?: string | null
          procedure_name?: string
          user_id?: string
        }
        Relationships: []
      }
      complication_procedures: {
        Row: {
          complication_id: string
          created_at: string
          procedure_id: string
        }
        Insert: {
          complication_id: string
          created_at?: string
          procedure_id: string
        }
        Update: {
          complication_id?: string
          created_at?: string
          procedure_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "complication_procedures_complication_id_fkey"
            columns: ["complication_id"]
            isOneToOne: false
            referencedRelation: "complications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complication_procedures_procedure_id_fkey"
            columns: ["procedure_id"]
            isOneToOne: false
            referencedRelation: "procedures"
            referencedColumns: ["id"]
          },
        ]
      }
      complication_references: {
        Row: {
          complication_id: string
          reference_id: string
        }
        Insert: {
          complication_id: string
          reference_id: string
        }
        Update: {
          complication_id?: string
          reference_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "complication_references_complication_id_fkey"
            columns: ["complication_id"]
            isOneToOne: false
            referencedRelation: "complications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "complication_references_reference_id_fkey"
            columns: ["reference_id"]
            isOneToOne: false
            referencedRelation: "literature_references"
            referencedColumns: ["id"]
          },
        ]
      }
      complication_signs_symptoms: {
        Row: {
          complication_id: string
          created_at: string
          display_order: number
          id: string
          label: string
        }
        Insert: {
          complication_id: string
          created_at?: string
          display_order?: number
          id?: string
          label: string
        }
        Update: {
          complication_id?: string
          created_at?: string
          display_order?: number
          id?: string
          label?: string
        }
        Relationships: [
          {
            foreignKeyName: "complication_signs_symptoms_complication_id_fkey"
            columns: ["complication_id"]
            isOneToOne: false
            referencedRelation: "complications"
            referencedColumns: ["id"]
          },
        ]
      }
      complications: {
        Row: {
          associated_procedures: string[] | null
          created_at: string
          id: string
          management_protocol: Json | null
          name: string
          signs_symptoms: string[] | null
          slug: string | null
          updated_at: string
        }
        Insert: {
          associated_procedures?: string[] | null
          created_at?: string
          id?: string
          management_protocol?: Json | null
          name: string
          signs_symptoms?: string[] | null
          slug?: string | null
          updated_at?: string
        }
        Update: {
          associated_procedures?: string[] | null
          created_at?: string
          id?: string
          management_protocol?: Json | null
          name?: string
          signs_symptoms?: string[] | null
          slug?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      danger_zones: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          region: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          region?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          region?: string | null
        }
        Relationships: []
      }
      indications: {
        Row: {
          created_at: string
          id: string
          label: string
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
        }
        Relationships: []
      }
      injection_patterns: {
        Row: {
          created_at: string
          dosages: Json | null
          id: string
          pattern_name: string
          procedure_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          dosages?: Json | null
          id?: string
          pattern_name: string
          procedure_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          dosages?: Json | null
          id?: string
          pattern_name?: string
          procedure_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "injection_patterns_procedure_id_fkey"
            columns: ["procedure_id"]
            isOneToOne: false
            referencedRelation: "procedures"
            referencedColumns: ["id"]
          },
        ]
      }
      literature_references: {
        Row: {
          authors: string[] | null
          city: string | null
          created_at: string
          doi_url: string | null
          id: string
          issue: string | null
          journal: string | null
          pages: string | null
          publication_year: number | null
          publisher: string | null
          pubmed_id: string | null
          reference_type: string | null
          summary: string | null
          title: string
          updated_at: string
          url: string | null
          volume: string | null
        }
        Insert: {
          authors?: string[] | null
          city?: string | null
          created_at?: string
          doi_url?: string | null
          id?: string
          issue?: string | null
          journal?: string | null
          pages?: string | null
          publication_year?: number | null
          publisher?: string | null
          pubmed_id?: string | null
          reference_type?: string | null
          summary?: string | null
          title: string
          updated_at?: string
          url?: string | null
          volume?: string | null
        }
        Update: {
          authors?: string[] | null
          city?: string | null
          created_at?: string
          doi_url?: string | null
          id?: string
          issue?: string | null
          journal?: string | null
          pages?: string | null
          publication_year?: number | null
          publisher?: string | null
          pubmed_id?: string | null
          reference_type?: string | null
          summary?: string | null
          title?: string
          updated_at?: string
          url?: string | null
          volume?: string | null
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          alt_text: string | null
          asset_type: string
          caption: string | null
          created_at: string
          id: string
          url: string
        }
        Insert: {
          alt_text?: string | null
          asset_type: string
          caption?: string | null
          created_at?: string
          id?: string
          url: string
        }
        Update: {
          alt_text?: string | null
          asset_type?: string
          caption?: string | null
          created_at?: string
          id?: string
          url?: string
        }
        Relationships: []
      }
      muscle_content_sections: {
        Row: {
          content: string | null
          created_at: string
          display_order: number | null
          id: string
          muscle_id: string
          section_type: Database["public"]["Enums"]["section_type"]
        }
        Insert: {
          content?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          muscle_id: string
          section_type: Database["public"]["Enums"]["section_type"]
        }
        Update: {
          content?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          muscle_id?: string
          section_type?: Database["public"]["Enums"]["section_type"]
        }
        Relationships: [
          {
            foreignKeyName: "muscle_content_sections_muscle_id_fkey"
            columns: ["muscle_id"]
            isOneToOne: false
            referencedRelation: "muscles"
            referencedColumns: ["id"]
          },
        ]
      }
      muscle_danger_zones: {
        Row: {
          created_at: string
          danger_zone_id: string
          muscle_id: string
        }
        Insert: {
          created_at?: string
          danger_zone_id: string
          muscle_id: string
        }
        Update: {
          created_at?: string
          danger_zone_id?: string
          muscle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "muscle_danger_zones_danger_zone_id_fkey"
            columns: ["danger_zone_id"]
            isOneToOne: false
            referencedRelation: "danger_zones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "muscle_danger_zones_muscle_id_fkey"
            columns: ["muscle_id"]
            isOneToOne: false
            referencedRelation: "muscles"
            referencedColumns: ["id"]
          },
        ]
      }
      muscle_indications: {
        Row: {
          created_at: string
          indication_id: string
          muscle_id: string
        }
        Insert: {
          created_at?: string
          indication_id: string
          muscle_id: string
        }
        Update: {
          created_at?: string
          indication_id?: string
          muscle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "muscle_indications_indication_id_fkey"
            columns: ["indication_id"]
            isOneToOne: false
            referencedRelation: "indications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "muscle_indications_muscle_id_fkey"
            columns: ["muscle_id"]
            isOneToOne: false
            referencedRelation: "muscles"
            referencedColumns: ["id"]
          },
        ]
      }
      muscle_references: {
        Row: {
          muscle_id: string
          reference_id: string
        }
        Insert: {
          muscle_id: string
          reference_id: string
        }
        Update: {
          muscle_id?: string
          reference_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "muscle_references_muscle_id_fkey"
            columns: ["muscle_id"]
            isOneToOne: false
            referencedRelation: "muscles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "muscle_references_reference_id_fkey"
            columns: ["reference_id"]
            isOneToOne: false
            referencedRelation: "literature_references"
            referencedColumns: ["id"]
          },
        ]
      }
      muscle_safety_flags: {
        Row: {
          created_at: string
          muscle_id: string
          safety_flag_id: string
        }
        Insert: {
          created_at?: string
          muscle_id: string
          safety_flag_id: string
        }
        Update: {
          created_at?: string
          muscle_id?: string
          safety_flag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "muscle_safety_flags_muscle_id_fkey"
            columns: ["muscle_id"]
            isOneToOne: false
            referencedRelation: "muscles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "muscle_safety_flags_safety_flag_id_fkey"
            columns: ["safety_flag_id"]
            isOneToOne: false
            referencedRelation: "safety_flags"
            referencedColumns: ["id"]
          },
        ]
      }
      muscle_section_citations: {
        Row: {
          created_at: string
          id: string
          occurrence_order: number
          reference_id: string
          section_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          occurrence_order: number
          reference_id: string
          section_id: string
        }
        Update: {
          created_at?: string
          id?: string
          occurrence_order?: number
          reference_id?: string
          section_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "muscle_section_citations_reference_id_fkey"
            columns: ["reference_id"]
            isOneToOne: false
            referencedRelation: "literature_references"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "muscle_section_citations_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "muscle_content_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      muscles: {
        Row: {
          abbr: string | null
          anatomical_region: string | null
          arterial_supply: string | null
          bio_digital_id: string | null
          categories: string[]
          clinical_notes: Json | null
          created_at: string
          danger_zone_ids: string[] | null
          function: string | null
          function_short: string | null
          has_ultrasound_window: boolean
          id: string
          indications: string[] | null
          innervation: string | null
          innervation_nerve: string | null
          innervation_root: string | null
          insertion: string | null
          name: string
          origin: string | null
          safety_flags: string[] | null
          search_tsv: string | null
          slug: string | null
          updated_at: string
        }
        Insert: {
          abbr?: string | null
          anatomical_region?: string | null
          arterial_supply?: string | null
          bio_digital_id?: string | null
          categories?: string[]
          clinical_notes?: Json | null
          created_at?: string
          danger_zone_ids?: string[] | null
          function?: string | null
          function_short?: string | null
          has_ultrasound_window?: boolean
          id?: string
          indications?: string[] | null
          innervation?: string | null
          innervation_nerve?: string | null
          innervation_root?: string | null
          insertion?: string | null
          name: string
          origin?: string | null
          safety_flags?: string[] | null
          search_tsv?: string | null
          slug?: string | null
          updated_at?: string
        }
        Update: {
          abbr?: string | null
          anatomical_region?: string | null
          arterial_supply?: string | null
          bio_digital_id?: string | null
          categories?: string[]
          clinical_notes?: Json | null
          created_at?: string
          danger_zone_ids?: string[] | null
          function?: string | null
          function_short?: string | null
          has_ultrasound_window?: boolean
          id?: string
          indications?: string[] | null
          innervation?: string | null
          innervation_nerve?: string | null
          innervation_root?: string | null
          insertion?: string | null
          name?: string
          origin?: string | null
          safety_flags?: string[] | null
          search_tsv?: string | null
          slug?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      pattern_muscles: {
        Row: {
          created_at: string
          injection_pattern_id: string
          muscle_id: string
        }
        Insert: {
          created_at?: string
          injection_pattern_id: string
          muscle_id: string
        }
        Update: {
          created_at?: string
          injection_pattern_id?: string
          muscle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pattern_muscles_injection_pattern_id_fkey"
            columns: ["injection_pattern_id"]
            isOneToOne: false
            referencedRelation: "injection_patterns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pattern_muscles_muscle_id_fkey"
            columns: ["muscle_id"]
            isOneToOne: false
            referencedRelation: "muscles"
            referencedColumns: ["id"]
          },
        ]
      }
      pattern_references: {
        Row: {
          injection_pattern_id: string
          reference_id: string
        }
        Insert: {
          injection_pattern_id: string
          reference_id: string
        }
        Update: {
          injection_pattern_id?: string
          reference_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pattern_references_injection_pattern_id_fkey"
            columns: ["injection_pattern_id"]
            isOneToOne: false
            referencedRelation: "injection_patterns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pattern_references_reference_id_fkey"
            columns: ["reference_id"]
            isOneToOne: false
            referencedRelation: "literature_references"
            referencedColumns: ["id"]
          },
        ]
      }
      private_notes: {
        Row: {
          created_at: string
          id: string
          kind: string
          note: string
          slug: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind: string
          note: string
          slug: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          note?: string
          slug?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      procedure_references: {
        Row: {
          procedure_id: string
          reference_id: string
        }
        Insert: {
          procedure_id: string
          reference_id: string
        }
        Update: {
          procedure_id?: string
          reference_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "procedure_references_procedure_id_fkey"
            columns: ["procedure_id"]
            isOneToOne: false
            referencedRelation: "procedures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "procedure_references_reference_id_fkey"
            columns: ["reference_id"]
            isOneToOne: false
            referencedRelation: "literature_references"
            referencedColumns: ["id"]
          },
        ]
      }
      procedures: {
        Row: {
          area: string
          categories: string[]
          condition_type: string | null
          created_at: string
          description: string | null
          evidence_level: string | null
          guidance: string | null
          id: string
          name: string
          region: string | null
          search_vec: string | null
          sites_max: number | null
          sites_min: number | null
          slug: string | null
          total_dose_max: number | null
          total_dose_min: number | null
          type: Database["public"]["Enums"]["procedure_type"]
          updated_at: string
        }
        Insert: {
          area: string
          categories?: string[]
          condition_type?: string | null
          created_at?: string
          description?: string | null
          evidence_level?: string | null
          guidance?: string | null
          id?: string
          name: string
          region?: string | null
          search_vec?: string | null
          sites_max?: number | null
          sites_min?: number | null
          slug?: string | null
          total_dose_max?: number | null
          total_dose_min?: number | null
          type: Database["public"]["Enums"]["procedure_type"]
          updated_at?: string
        }
        Update: {
          area?: string
          categories?: string[]
          condition_type?: string | null
          created_at?: string
          description?: string | null
          evidence_level?: string | null
          guidance?: string | null
          id?: string
          name?: string
          region?: string | null
          search_vec?: string | null
          sites_max?: number | null
          sites_min?: number | null
          slug?: string | null
          total_dose_max?: number | null
          total_dose_min?: number | null
          type?: Database["public"]["Enums"]["procedure_type"]
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          brand_id: string | null
          created_at: string
          description: string | null
          id: string
          is_default: boolean | null
          units: number
          updated_at: string
        }
        Insert: {
          brand_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_default?: boolean | null
          units: number
          updated_at?: string
        }
        Update: {
          brand_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_default?: boolean | null
          units?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          metadata: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          metadata?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_flags: {
        Row: {
          created_at: string
          id: string
          label: string
        }
        Insert: {
          created_at?: string
          id?: string
          label: string
        }
        Update: {
          created_at?: string
          id?: string
          label?: string
        }
        Relationships: []
      }
      saved_items: {
        Row: {
          created_at: string
          id: string
          kind: string
          slug: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          kind: string
          slug: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          kind?: string
          slug?: string
          user_id?: string
        }
        Relationships: []
      }
      section_media_assets: {
        Row: {
          display_order: number | null
          media_id: string
          section_id: string
        }
        Insert: {
          display_order?: number | null
          media_id: string
          section_id: string
        }
        Update: {
          display_order?: number | null
          media_id?: string
          section_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "section_media_assets_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media_assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "section_media_assets_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "muscle_content_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      standard_dilutions: {
        Row: {
          brand_id: string | null
          created_at: string
          dilution_ml: number
          id: string
          label: string | null
        }
        Insert: {
          brand_id?: string | null
          created_at?: string
          dilution_ml: number
          id?: string
          label?: string | null
        }
        Update: {
          brand_id?: string | null
          created_at?: string
          dilution_ml?: number
          id?: string
          label?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "standard_dilutions_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      user_brand_settings: {
        Row: {
          created_at: string
          default_brand_id: string | null
          default_dilution_ml: number | null
          default_product_id: string | null
          id: string
          last_used_brand: string | null
          last_used_dilution: number | null
          last_used_product: string | null
          ui_theme: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          default_brand_id?: string | null
          default_dilution_ml?: number | null
          default_product_id?: string | null
          id?: string
          last_used_brand?: string | null
          last_used_dilution?: number | null
          last_used_product?: string | null
          ui_theme?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          default_brand_id?: string | null
          default_dilution_ml?: number | null
          default_product_id?: string | null
          id?: string
          last_used_brand?: string | null
          last_used_dilution?: number | null
          last_used_product?: string | null
          ui_theme?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_brand_settings_default_brand_id_fkey"
            columns: ["default_brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_brand_settings_default_product_id_fkey"
            columns: ["default_product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_brand_settings_last_used_brand_fkey"
            columns: ["last_used_brand"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_brand_settings_last_used_product_fkey"
            columns: ["last_used_product"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      user_dilutions: {
        Row: {
          brand_id: string | null
          created_at: string
          dilution_ml: number
          id: string
          label: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          brand_id?: string | null
          created_at?: string
          dilution_ml: number
          id?: string
          label?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          brand_id?: string | null
          created_at?: string
          dilution_ml?: number
          id?: string
          label?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_dilutions_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      user_favorites: {
        Row: {
          created_at: string
          id: string
          product_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          product_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_favorites_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          practice_setting: string | null
          professional_title: string | null
          specialty: string | null
        }
        Insert: {
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          practice_setting?: string | null
          professional_title?: string | null
          specialty?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          practice_setting?: string | null
          professional_title?: string | null
          specialty?: string | null
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
      procedure_type: "Therapeutic" | "Aesthetic"
      section_type:
        | "introduction"
        | "origin"
        | "insertion"
        | "function"
        | "innervation"
        | "arterial_supply"
        | "clinical_notes"
        | "injection_technique"
        | "safety_precautions"
        | "ultrasound_guidance"
        | "videos"
        | "images"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
