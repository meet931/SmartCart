import { Component } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { UserService } from 'src/app/Services/user.service';
import { OrderService } from 'src/app/Services/order.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent {
  isloading = false;
  cartsData: any[] = [];
  cartIDs: any[] = [];
  userData: any = {};
  userID: number = 0;
  TotalItemsinCart: number = 0;
  amountSummary: {
    subTotal: number;
    shippingCharge: number;
    tax: number;
    total: number;
  } = {
    subTotal: 0,
    shippingCharge: 50,
    tax: 0,
    total: 0,
  };
  ngOnInit() {
    this.userID = JSON.parse(sessionStorage.getItem('user_id')!);
    this.getCardProducts();
    this.getUserData();
  }

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private toast: NgToastService
  ) {}
  getCardProducts() {
    this.cartService.getCart(this.userID).subscribe({
      next: (res: any) => {
        console.log(res);
        this.cartsData = res.data;
        this.TotalItemsinCart = res.meta.pagination.total;
        this.calculateTotal();
        this.setCartIds();
        console.log(this.cartIDs);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  calculateTotal() {
    this.amountSummary.subTotal = this.calculateSubtotal();
    this.amountSummary.tax = (this.amountSummary.subTotal * 18) / 100;
    this.amountSummary.total =
      this.amountSummary.subTotal +
      this.amountSummary.shippingCharge +
      this.amountSummary.tax;
  }

  calculateSubtotal(): number {
    return this.cartsData.reduce((accumulator, currentValue) => {
      return (
        accumulator +
        currentValue.attributes.product.data.attributes.price *
          currentValue.attributes.quantity
      );
    }, 0);
  }
  setCartIds() {
    this.cartsData.map((cart: any) => {
      this.cartIDs.push(cart.id);
    });
  }
  getUserData() {
    this.userService.getuserInfo().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.userData = res;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  placeOrder() {
    if (this.userData.user_addresses.length === 0) {
      this.toast.error({
        detail: 'ERROR',
        summary: 'Please add remaining details before placing the order',
        sticky: true,
      });
    } else {
      //placing Order
      this.isloading = true;
      const orderData = {
        data: {
          order_id: Date.now().toString(),
          order_date: new Date(),
          order_status: 'Placed,',
          order_status_updated_at: null,
          tax_amount: this.amountSummary.tax,
          total_amount: this.amountSummary.subTotal,
          payable_amount: this.amountSummary.total,
          order_items: this.cartsData,
          carts: this.cartIDs,
          user_details: this.userID,
        },
      };
      this.orderService.placeOrder(orderData).subscribe({
        next: (res: any) => {
          this.isloading = false;
          // console.log(res);
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Thank You...Your order is Confirmed!',
          });
          this.router.navigate([`/order-track/${res.data.id}`]);
        },
        error: (error: any) => {
          this.isloading = false;
          console.log(error);
        },
      });
    }
  }
}
