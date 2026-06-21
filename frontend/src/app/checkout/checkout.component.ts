import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { CartItem, MenuItemSize } from '../models/menu.models';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  protected readonly cart = inject(CartService);

  protected customerName = '';
  protected customerPhone = '';
  protected customerAddress = '';
  protected orderNotes = '';

  protected formatPrice(size: MenuItemSize): string {
    if (size.currency === 'LL') return `${size.price.toLocaleString()} LL`;
    return `$${size.price}`;
  }

  protected formatLineTotal(item: CartItem): string {
    if (item.size.currency === 'LL') {
      return `${(item.size.price * item.quantity).toLocaleString()} LL`;
    }
    return `$${item.size.price * item.quantity}`;
  }

  protected orderLink(): string {
    const lines = [
      'Hello House of PizzA, I want to order:',
      ...this.cart.items().map(item => {
        let line = `- ${item.quantity}x ${item.name} (${item.size.label}, ${this.formatPrice(item.size)})`;
        if (item.excludedIngredients.length > 0) {
          line += ` — no: ${item.excludedIngredients.join(', ')}`;
        }
        return line;
      }),
      `Total: ${this.cart.total()}`,
      this.customerName    ? `Name: ${this.customerName}`       : '',
      this.customerPhone   ? `Phone: ${this.customerPhone}`     : '',
      this.customerAddress ? `Address: ${this.customerAddress}` : '',
      this.orderNotes      ? `Notes: ${this.orderNotes}`        : '',
    ].filter(Boolean);
    return `https://wa.me/96181386932?text=${encodeURIComponent(lines.join('\n'))}`;
  }
}
