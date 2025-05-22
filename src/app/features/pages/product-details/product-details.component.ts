import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../app/shared/services/product/product.service';
import { Product } from '../../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import e from 'express';
import { ProductItemComponent } from '../../../shared/ui/product-item/product-item.component';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, ProductItemComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productId!: string | null;
  productDetails: Product = {} as Product;
  recentProducts!: Product[];
  ApiError!: string;
  visiableProducts: boolean = false;
  isLoading: boolean = false;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    // navSpeed: 1000,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    autoHeight: true,
    animateOut: true,

    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  visiableRelatedProducts() {
    this.visiableProducts = !this.visiableProducts;
  }

  getProductId() {
    this.activatedRoute.paramMap.subscribe({
      next: (urlData: any) => {
        //first method to get id
        this.productId = urlData.get('id');
        this.getProductDetailesById(this.productId);
        //sec method
        // this.productId = urlData?.params?.id;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('completed id');
      },
    });
  }

  getProductDetailesById(id: string | null) {
    this.productService.getProductDetails(id).subscribe({
      next: ({ data }) => {
        this.productDetails = data;

        this.getRelatedProducts(this.productDetails.category._id);
      },
      error: (err) => {
        console.log(err);
        this.ApiError = err.error.message;
      },
      complete: () => {
        console.log('completed by id');
      },
    });
  }

  getRelatedProducts(categoryId: string) {
    this.productService.getProducts(categoryId).subscribe({
      next: (res) => {
        console.log(res);
        this.recentProducts = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete() {
        console.log('completed RelatedProducts');
      },
    });
  }

  addProductToCart(id: string) {
    this.isLoading = !this.isLoading;
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = !this.isLoading;
        // this.toastr.success(res.message, 'Hii');
        this.showToster(res.message);
      },
      error: (err) => {
        console.log(err);
      },
      complete() {
        console.log('completed addProductToCart');
      },
    });
  }

  showToster(msg: string) {
    this.toastr.success(msg, '');
  }

  ngOnInit() {
    this.getProductId();
    // this.getProductDetailesById(this.productId);
  }
}
