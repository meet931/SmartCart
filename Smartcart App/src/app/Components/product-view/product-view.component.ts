import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { CartService } from 'src/app/Services/cart.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css'],
})
export class ProductViewComponent {
  isloading = false;
  productId = '';
  userID: number = 0;
  product: any = {};
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    //get the product id from url
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
    });
    this.userID = JSON.parse(sessionStorage.getItem('user_id')!);

    this.getSingleProduct(this.productId);
  }

  //api call

  getSingleProduct(id: any) {
    this.productService.getSingalProduct(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.product = res.data.attributes;
        console.log(this.product);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  //add to card api
  addTocard() {
    this.isloading = true;
    const productData = {
      data: {
        product: this.productId,
        quantity: 1,
        user_detail: this.userID,
        order: null,
      },
    };
    // console.log(productData);

    this.cartService.addTocart(productData).subscribe({
      next: (res: any) => {
        this.isloading = false;
        // console.log(res);
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Added to cart',
        });
      },
      error: (error: any) => {
        this.isloading = false;
        console.log(error);
      },
    });
  }
}

//spread opreation work only with iterable object like array
