import { Component, inject, OnInit } from '@angular/core';
// import { PopularCategoriesService } from '../../../../../../shared/services/popularCategories/popular-categories.service';
import { PopularCategoriesService } from '../../../../../shared/services/popularCategories/popular-categories.service';
// import { Category } from '../../../../../../shared/interfaces/Category';
import { Category } from '../../../../../shared/interfaces/Category';

import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {
  private readonly popularCategoriesService = inject(PopularCategoriesService);

  popCategories!: Category[];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
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
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 7,
      },
    },
    nav: false,
  };
  customOptionsReserved: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
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
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 7,
      },
    },
    nav: false,
    rtl: true,
  };

  getCategories() {
    this.popularCategoriesService.getAllCategories().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.popCategories = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('categories Complete');
      },
    });
  }

  ngOnInit(): void {
    this.getCategories();
  }
}
