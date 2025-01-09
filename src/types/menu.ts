import { Json } from "@/integrations/supabase/types";

export interface MenuStyles {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  headerImage?: string;
  backgroundImage?: string;
  layout?: "card" | "list" | "grid" | "elegant";
  headerTitle?: string;
  headerSubtitle?: string;
  showImages?: boolean;
  showDotLeaders?: boolean;
  imageSize?: "small" | "medium" | "large";
  imageBorderRadius?: "none" | "small" | "medium" | "large" | "full";
  nameSize?: "small" | "medium" | "large";
  priceSize?: "small" | "medium" | "large";
  descriptionSize?: "small" | "medium" | "large";
  descriptionLines?: 1 | 2 | 3 | "full";
  gridColumns?: 2 | 3 | 4;
  spacing?: "small" | "medium" | "large";
  // Header options
  showHeader?: boolean;
  showSearchBar?: boolean;
  headerAlignment?: "left" | "center" | "right";
  headerPadding?: "small" | "medium" | "large";
  // Category options
  collapsibleCategories?: boolean;
  showCategoryBar?: boolean;
}

export interface Menu {
  id: string;
  restaurant_id: string;
  name: string;
  description: string | null;
  type: string | null;
  start_date: string | null;
  end_date: string | null;
  is_active: boolean | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
  styles?: MenuStyles;
}

export const parseMenuStyles = (styles: Json | null): MenuStyles | undefined => {
  if (!styles) return undefined;
  
  const parsed = styles as Record<string, unknown>;
  return {
    primaryColor: parsed.primaryColor as string,
    secondaryColor: parsed.secondaryColor as string,
    backgroundColor: parsed.backgroundColor as string,
    textColor: parsed.textColor as string,
    fontFamily: parsed.fontFamily as string,
    headerImage: parsed.headerImage as string,
    backgroundImage: parsed.backgroundImage as string,
    layout: parsed.layout as "card" | "list" | "grid" | "elegant",
    headerTitle: parsed.headerTitle as string,
    headerSubtitle: parsed.headerSubtitle as string,
    showImages: parsed.showImages as boolean,
    showDotLeaders: parsed.showDotLeaders as boolean,
    imageSize: parsed.imageSize as "small" | "medium" | "large",
    imageBorderRadius: parsed.imageBorderRadius as "none" | "small" | "medium" | "large" | "full",
    nameSize: parsed.nameSize as "small" | "medium" | "large",
    priceSize: parsed.priceSize as "small" | "medium" | "large",
    descriptionSize: parsed.descriptionSize as "small" | "medium" | "large",
    descriptionLines: parsed.descriptionLines as 1 | 2 | 3 | "full",
    gridColumns: parsed.gridColumns as 2 | 3 | 4,
    spacing: parsed.spacing as "small" | "medium" | "large",
    // Add header options
    showHeader: parsed.showHeader as boolean,
    showSearchBar: parsed.showSearchBar as boolean,
    headerAlignment: parsed.headerAlignment as "left" | "center" | "right",
    headerPadding: parsed.headerPadding as "small" | "medium" | "large",
    // Add category options
    collapsibleCategories: parsed.collapsibleCategories as boolean,
    showCategoryBar: parsed.showCategoryBar as boolean,
  };
};

export const stringifyMenuStyles = (styles: MenuStyles): Json => {
  return styles as Json;
};