import { Component, inject, OnInit } from '@angular/core';
// import { ProductService } from '../../../../../../shared/services/product/product.service';
import { ProductService } from '../../../../../shared/services/product/product.service';
// import { Product } from '../../../../../../shared/interfaces/product';
import { Product } from '../../../../../shared/interfaces/product';
// import { ProductItemComponent } from '../../../../../../shared/ui/product-item/product-item.component';
import { ProductItemComponent } from '../../../../../shared/ui/product-item/product-item.component';
import { CartService } from '../../../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-recent-products',
  imports: [ProductItemComponent],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.css',
})
export class RecentProductsComponent implements OnInit {
  allProducts!: Product[];
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  getProducts() {
    this.productService.getProducts().subscribe({
      next: (res /* or {data}*/) => {
        // console.log(res.data);
        this.allProducts = res.data; /*or this.allproducts = data */
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete products');
      },
    });
  }

  addProductToCart(id: string) {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        // this.toastr.success(res.message, 'Hii');
        this.showToster(res.message);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed add to cart');
      },
    });
  }

  showToster(msg: string) {
    this.toastr.success(msg, '', {
      progressBar: true,
      progressAnimation: 'decreasing',
      timeOut: 2000,
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }
}
