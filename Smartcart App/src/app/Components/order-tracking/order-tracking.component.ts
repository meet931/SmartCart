import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/Services/order.service';
@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css'],
})
export class OrderTrackingComponent {
  orderId = '';
  orderDetails: any = {};
  ngOnInit() {
    //get the product id from url
    this.route.params.subscribe((params) => {
      this.orderId = params['id'];
    });
    this.getOrderDetails(this.orderId);
  }
  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}
  getOrderDetails(id: any) {
    console.log(id)
    this.orderService.getSingleOrder(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.orderDetails = res.data;
      },
      error: (error: any) => {
        console.log(error);

        console.log(error.error.error.message);
      },
    });
  }


  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return `${date.getDate()} ${this.getMonthName(
      date.getMonth()
    )} ${date.getFullYear()}`;
  }

  getMonthName(monthIndex: number): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[monthIndex];
  }
}
