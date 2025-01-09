export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
}

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