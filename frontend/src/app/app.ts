import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type MenuProduct = {
  name: string;
  category: string;
  price: number;
  label: string;
  details: string;
};

type CartItem = MenuProduct & {
  quantity: number;
};

type OrderSection = {
  title: string;
  items: MenuProduct[];
};

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly originalPizzas = [
    {
      name: 'Lebanese',
      price: '33CM 9$ / 40CM 11$',
      details: 'Tomato sauce, ham, mozzarella, onions, olives, green pepper, mushrooms, corn, oregano',
    },
    {
      name: 'Pepperoni',
      price: '33CM 10$ / 40CM 12$',
      details: 'Tomato sauce, mozzarella, pepperoni, oregano',
    },
    {
      name: 'Chicken Ranch',
      price: '33CM 11$ / 40CM 13$',
      details: 'Ranch sauce, mozzarella, grilled chicken, red onions, oregano',
    },
    {
      name: 'Cheese Burger Pizza',
      price: '33CM 12$ / 40CM 14$',
      details: 'Special burger sauce, mix cheese, ground beef, onions, pickles, potato chips, oregano',
    },
    {
      name: 'BBQ Chicken',
      price: '33CM 11$ / 40CM 13$',
      details: 'BBQ sauce, mix cheese, grilled chicken, red onions, oregano',
    },
    {
      name: 'BBQ Meat',
      price: '33CM 12$ / 40CM 15$',
      details: 'BBQ sauce, mix cheese, brisket, onions, bell peppers, oregano',
    },
  ];

  protected readonly healthyPizzas = [
    {
      name: 'Active Oats Pizza',
      price: '25CM 7$',
      nutrition: '597.5 kcal / 49.5g protein',
      details: 'Oat dough, grilled chicken breast, smoked turkey, tomato sauce, red onions, fresh mushrooms, oregano, green pepper, mozzarella',
    },
    {
      name: 'Power Crust',
      price: '25CM 9$',
      nutrition: '577.5 kcal / 72.5g protein',
      details: 'Chicken crust, tomato sauce, smoked turkey, mushrooms, mozzarella, green pepper, oregano',
    },
    {
      name: 'Pepperoni',
      price: '25CM 10$',
      nutrition: '602.5 kcal / 79.5g protein',
      details: 'Chicken crust, tomato sauce, pepperoni, oregano, bell pepper, mozzarella',
    },
    {
      name: 'Vegetarian',
      price: '25CM 7$',
      nutrition: '450 kcal / 23g protein',
      details: 'Oat dough, tomato sauce, mozzarella olives, red onions, corn, colored pepper, fresh mushrooms, oregano',
    },
  ];

  protected readonly orderMenu: MenuProduct[] = [
    {
      name: 'Lebanese',
      category: 'Original Pizza',
      price: 9,
      label: '33CM',
      details: 'Tomato sauce, ham, mozzarella, onions, olives, green pepper, mushrooms, corn, oregano',
    },
    {
      name: 'Lebanese',
      category: 'Original Pizza',
      price: 11,
      label: '40CM',
      details: 'Tomato sauce, ham, mozzarella, onions, olives, green pepper, mushrooms, corn, oregano',
    },
    {
      name: 'Pepperoni',
      category: 'Original Pizza',
      price: 10,
      label: '33CM',
      details: 'Tomato sauce, mozzarella, pepperoni, oregano',
    },
    {
      name: 'Pepperoni',
      category: 'Original Pizza',
      price: 12,
      label: '40CM',
      details: 'Tomato sauce, mozzarella, pepperoni, oregano',
    },
    {
      name: 'Chicken Ranch',
      category: 'Original Pizza',
      price: 11,
      label: '33CM',
      details: 'Ranch sauce, mozzarella, grilled chicken, red onions, oregano',
    },
    {
      name: 'Cheese Burger Pizza',
      category: 'Original Pizza',
      price: 12,
      label: '33CM',
      details: 'Special burger sauce, mix cheese, ground beef, onions, pickles, potato chips, oregano',
    },
    {
      name: 'BBQ Chicken',
      category: 'Original Pizza',
      price: 11,
      label: '33CM',
      details: 'BBQ sauce, mix cheese, grilled chicken, red onions, oregano',
    },
    {
      name: 'BBQ Meat',
      category: 'Original Pizza',
      price: 12,
      label: '33CM',
      details: 'BBQ sauce, mix cheese, brisket, onions, bell peppers, oregano',
    },
    {
      name: 'Active Oats Pizza',
      category: 'Healthy Protein Pizza',
      price: 7,
      label: '25CM',
      details: '597.5 kcal, 49.5g protein',
    },
    {
      name: 'Power Crust',
      category: 'Healthy Protein Pizza',
      price: 9,
      label: '25CM',
      details: '577.5 kcal, 72.5g protein',
    },
    {
      name: 'Healthy Pepperoni',
      category: 'Healthy Protein Pizza',
      price: 10,
      label: '25CM',
      details: '602.5 kcal, 79.5g protein',
    },
    {
      name: 'Vegetarian',
      category: 'Healthy Protein Pizza',
      price: 7,
      label: '25CM',
      details: '450 kcal, 23g protein',
    },
    {
      name: 'Chocolate Pizza',
      category: 'Dessert',
      price: 8,
      label: '30CM',
      details: 'Sweet chocolate, hazelnut spread, melted chocolate, crushed biscuits, mini marshmallows',
    },
    {
      name: 'Soft Drink',
      category: 'Drinks',
      price: 0.72,
      label: 'Can',
      details: 'Cold soft drink',
    },
    {
      name: 'Ranch Sauce',
      category: 'Dips',
      price: 0.6,
      label: 'Cup',
      details: 'Extra ranch sauce',
    },
    {
      name: 'Honey Mustard',
      category: 'Dips',
      price: 0.6,
      label: 'Cup',
      details: 'Extra honey mustard dip',
    },
  ];

  protected readonly orderSections: OrderSection[] = [
    {
      title: 'Pizza',
      items: this.orderMenu.filter((item) => item.category.includes('Pizza') && item.category !== 'Dessert'),
    },
    {
      title: 'Dessert',
      items: this.orderMenu.filter((item) => item.category === 'Dessert'),
    },
    {
      title: 'Drinks',
      items: this.orderMenu.filter((item) => item.category === 'Drinks'),
    },
    {
      title: 'Dips',
      items: this.orderMenu.filter((item) => item.category === 'Dips'),
    },
  ];

  protected cart: CartItem[] = [];
  protected customerName = '';
  protected customerPhone = '';
  protected customerAddress = '';
  protected orderNotes = '';

  protected addToCart(product: MenuProduct): void {
    const existing = this.cart.find((item) => this.itemKey(item) === this.itemKey(product));

    if (existing) {
      existing.quantity += 1;
      return;
    }

    this.cart = [...this.cart, { ...product, quantity: 1 }];
  }

  protected changeQuantity(item: CartItem, amount: number): void {
    const nextQuantity = item.quantity + amount;

    if (nextQuantity <= 0) {
      this.cart = this.cart.filter((cartItem) => this.itemKey(cartItem) !== this.itemKey(item));
      return;
    }

    item.quantity = nextQuantity;
  }

  protected clearCart(): void {
    this.cart = [];
  }

  protected cartTotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  protected orderLink(): string {
    const lines = [
      'Hello House of PizzA, I want to order:',
      ...this.cart.map((item) => `- ${item.quantity}x ${item.name} ${item.label} (${this.formatPrice(item.price * item.quantity)})`),
      `Total: ${this.formatPrice(this.cartTotal())}`,
      this.customerName ? `Name: ${this.customerName}` : '',
      this.customerPhone ? `Phone: ${this.customerPhone}` : '',
      this.customerAddress ? `Address: ${this.customerAddress}` : '',
      this.orderNotes ? `Notes: ${this.orderNotes}` : '',
    ].filter(Boolean);

    return `https://wa.me/96181386932?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  protected formatPrice(value: number): string {
    return `${Number.isInteger(value) ? value.toFixed(0) : value.toFixed(2)}$`;
  }

  private itemKey(item: Pick<MenuProduct, 'name' | 'label' | 'category'>): string {
    return `${item.category}-${item.name}-${item.label}`;
  }
}
