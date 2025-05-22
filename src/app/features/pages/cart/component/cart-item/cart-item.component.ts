import { Component, Input } from '@angular/core';
import { Product } from '../../../../../shared/interfaces/cart';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
})
export class CartItemComponent {
  @Input() product: Product = {} as Product;
}
