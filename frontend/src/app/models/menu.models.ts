export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface MenuItemSize {
  label: string;
  price: number;
  currency: string;
}

export interface MenuItem {
  id: number;
  name: string;
  categorySlug: string;
  sizes: MenuItemSize[];
  ingredients: string[];
  calories?: number;
  proteinGrams?: number;
}

export interface CartItem {
  key: string;
  menuItemId: number;
  name: string;
  categorySlug: string;
  size: MenuItemSize;
  excludedIngredients: string[];
  quantity: number;
}
