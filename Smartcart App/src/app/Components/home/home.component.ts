import { Component, ElementRef } from '@angular/core';

import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  pageSize = 8;
  isloading: boolean[] = []; // Initialize array for each product,beacause if we take single value then it will display spinner to all product
  iswishlistloading: boolean[] = [];

  showPagination = true;
  productsData: any[] = [];
  paginationData: any = {};
  categories: any[] = [];
  userID: number = 0;
  constructor(
    private el: ElementRef,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    //loading first page of product
    this.getProducts(1);
    this.userID = JSON.parse(sessionStorage.getItem('user_id')!);
    this.getAllcategories();
  }

  getProducts(pageNumber: any) {
    this.showPagination = true;
    // getAllProduct take two arguments pageNnmber and pageSize
    this.productService.getAllProduct(pageNumber, this.pageSize).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.productsData = res.data;
        this.paginationData = res.meta;
      },
      error: (error: any) => {
        console.log(error);
        this.toast.error({
          detail: 'ERROR',
          summary: error.error.error.message,
          sticky: true,
        });
      },
    });
  }
  pageCountArray(): number[] {
    const pageCount = this.paginationData?.pagination?.pageCount;
    const arrayLength = new Array(pageCount);
    for (let i = 0; i < pageCount; i++) {
      arrayLength[i] = i + 1;
    }
    return arrayLength;
  }

  viewProductDetails(productId: string) {
    this.router.navigate([`/product-detail/${productId}`]);
  }

  addTocard(productId: any, index: number) {
    this.isloading[index] = true;
    const productData = {
      data: {
        product: productId,
        quantity: 1,
        user_detail: this.userID,
        order: null,
      },
    };

    this.cartService.addTocart(productData).subscribe({
      next: (res: any) => {
        this.isloading[index] = false;
        // console.log(res);
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Item added to cart',
        });
      },
      error: (error: any) => {
        this.isloading[index] = false;
        console.log(error);
        this.toast.error(error.error.error.message);
      },
    });
  }

  handleSearch(event: Event): void {
    const keyword = (event.target as HTMLSelectElement).value;

    this.productSearch(keyword);
  }
  productSearch(keyword: any) {
    this.showPagination = false;
    if (keyword) {
      this.productService.searchProduct(keyword).subscribe({
        next: (res: any) => {
          console.log(res.data);
          this.productsData = res.data;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    } else {
      this.toast.info({
        detail: 'INFO',
        summary: 'Search cancelled',
      });
      this.getProducts(1);
      this.showPagination = true;
    }
  }
  handleChange(event: Event): void {
    let selectedCategoryId = Number((event.target as HTMLSelectElement).value);

    if (selectedCategoryId) {
      this.handleFilterChange(selectedCategoryId);
    } else {
      this.toast.info({
        detail: 'INFO',
        summary: 'Filter Disabled',
      });
      this.getProducts(1);
    }
  }
  handleFilterChange(id: any) {
    this.showPagination = false;
    this.productService.getFilterProduct(id).subscribe({
      next: (res: any) => {
        // console.log(res.data);
        this.productsData = res.data;
      },
      error: (error: any) => {
        console.log(error);
        this.toast.error(error.error.error.message);
      },
    });
  }
  getAllcategories() {
    this.productService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
      },
      error: (error: any) => {
        console.log(error);
        this.toast.error(error.error.error.message);
      },
    });
  }

  // scroll to product
  scrollToElement(elementId: string): void {
    const element = this.el.nativeElement.querySelector(`#${elementId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  //add to wishlist

  addToWishlist(productId: string, index: number) {
    this.iswishlistloading[index] = true;
    const wishlistData = {
      data: {
        user_detail: this.userID,
        product: productId,
      },
    };

    this.wishlistService.addToWishlist(wishlistData).subscribe({
      next: (res: any) => {
        this.iswishlistloading[index] = false;
        console.log(res);

        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Item added to wishlist',
        });
      },
      error: (error: any) => {
        this.iswishlistloading[index] = false;
        console.log(error);
        this.toast.error(error.error.error.message);
      },
    });
  }
}
