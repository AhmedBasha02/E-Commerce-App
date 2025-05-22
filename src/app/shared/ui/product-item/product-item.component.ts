import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css',
})
export class ProductItemComponent {
  isLoading: boolean = false;
  idTimeOut: any;
  @Input() product!: Product;
  @Output() fireAddProductToCart: EventEmitter<string> = new EventEmitter();
  // or product = input.required<Product>();

  handleAddProductToCart(id: string) {
    this.fireAddProductToCart.emit(id);
  }

  loading() {
    if (!this.isLoading) {
      this.isLoading = true;
      console.log('basha');

      this.idTimeOut = setTimeout(() => {
        this.isLoading = false;
        console.log('false');
      }, 2000);
    } else {
      clearTimeout(this.idTimeOut);
      this.isLoading = false;
      console.log('true');
    }
  }
}
