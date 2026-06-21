import { Injectable, signal, computed } from '@angular/core';
import { CartItem, MenuItem, MenuItemSize } from '../models/menu.models';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>([]);

  readonly count = computed(() =>
    this.items().reduce((sum, i) => sum + i.quantity, 0)
  );

  readonly total = computed(() => {
    const usd = this.items()
      .filter(i => i.size.currency === 'USD')
      .reduce((sum, i) => sum + i.size.price * i.quantity, 0);
    const ll = this.items()
      .filter(i => i.size.currency === 'LL')
      .reduce((sum, i) => sum + i.size.price * i.quantity, 0);
    const parts: string[] = [];
    if (usd > 0) parts.push(`$${usd}`);
    if (ll > 0) parts.push(`${ll.toLocaleString()} LL`);
    return parts.join(' + ') || '$0';
  });

  add(item: MenuItem, size: MenuItemSize, excluded: string[]): void {
    const key = `${item.id}|${size.label}|${excluded.join(',')}`;
    const current = this.items();
    const existing = current.find(i => i.key === key);
    if (existing) {
      this.items.set(current.map(i =>
        i.key === key ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      this.items.set([...current, {
        key, menuItemId: item.id, name: item.name,
        categorySlug: item.categorySlug, size,
        excludedIngredients: excluded, quantity: 1,
      }]);
    }
  }

  changeQuantity(key: string, delta: number): void {
    this.items.set(
      this.items()
        .map(i => i.key === key ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0)
    );
  }

  clear(): void {
    this.items.set([]);
  }
}
