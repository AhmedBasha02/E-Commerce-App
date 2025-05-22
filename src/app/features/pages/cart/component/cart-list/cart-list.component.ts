import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../../../shared/services/cart/cart.service';
import { Cart } from '../../../../../shared/interfaces/cart';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart-list',
  imports: [CartItemComponent],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css',
})
export class CartListComponent implements OnInit {
  private readonly cartService = inject(CartService);
  isLoading: boolean = false;

  cartDetails: Cart = {} as Cart;
  getCart() {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails = res;
        this.isLoading = true;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed get Cart');
      },
    });
  }

  ngOnInit(): void {
    this.getCart();
  }
}
