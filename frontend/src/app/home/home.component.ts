import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../services/menu.service';
import { CartService } from '../services/cart.service';
import { Category, MenuItem, MenuItemSize } from '../models/menu.models';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly menuService = inject(MenuService);
  protected readonly cart = inject(CartService);

  protected readonly categories = signal<Category[]>([]);
  protected readonly menuItems = signal<MenuItem[]>([]);
  protected readonly loading = signal(true);
  protected readonly loadError = signal(false);

  protected customizeItem: MenuItem | null = null;
  protected selectedSizeLabel = '';
  protected excludedIngredients = new Set<string>();

  protected readonly orderSections = [
    { title: 'Original Pizza',        slug: 'original-pizza' },
    { title: 'Healthy Protein Pizza', slug: 'healthy-protein-pizza' },
    { title: 'Dessert',               slug: 'dessert' },
    { title: 'Drinks',                slug: 'drinks' },
    { title: 'Dips',                  slug: 'dips' },
  ];

  ngOnInit(): void {
    this.menuService.getMenuItems().subscribe({
      next: items => { this.menuItems.set(items); this.loading.set(false); },
      error: ()    => { this.loading.set(false); this.loadError.set(true); },
    });
    this.menuService.getCategories().subscribe({
      next: cats => { this.categories.set(cats); },
    });
  }

  protected itemsBySlug(slug: string): MenuItem[] {
    return this.menuItems().filter(i => i.categorySlug === slug);
  }

  // ── Customization modal ──────────────────────────────────────────────────

  protected openCustomize(item: MenuItem): void {
    this.customizeItem = item;
    this.selectedSizeLabel = item.sizes[0]?.label ?? '';
    this.excludedIngredients = new Set<string>();
  }

  protected closeCustomize(): void {
    this.customizeItem = null;
  }

  protected get selectedSize(): MenuItemSize | undefined {
    return this.customizeItem?.sizes.find(s => s.label === this.selectedSizeLabel);
  }

  protected toggleIngredient(name: string): void {
    if (this.excludedIngredients.has(name)) {
      this.excludedIngredients.delete(name);
    } else {
      this.excludedIngredients.add(name);
    }
    this.excludedIngredients = new Set(this.excludedIngredients);
  }

  protected isIncluded(name: string): boolean {
    return !this.excludedIngredients.has(name);
  }

  protected confirmAdd(): void {
    const item = this.customizeItem;
    const size = this.selectedSize;
    if (!item || !size) return;
    this.cart.add(item, size, [...this.excludedIngredients].sort());
    this.closeCustomize();
  }

  protected quickAdd(item: MenuItem): void {
    const size = item.sizes[0];
    if (!size) return;
    this.cart.add(item, size, []);
  }

  // ── Formatting ───────────────────────────────────────────────────────────

  protected formatPrice(size: MenuItemSize): string {
    if (size.currency === 'LL') return `${size.price.toLocaleString()} LL`;
    return `$${size.price}`;
  }

  protected formatPriceRange(item: MenuItem): string {
    return item.sizes.map(s => `${s.label} ${this.formatPrice(s)}`).join(' / ');
  }

  protected getCategoryName(slug: string | undefined): string {
    return this.categories().find(c => c.slug === slug)?.name ?? '';
  }
}
