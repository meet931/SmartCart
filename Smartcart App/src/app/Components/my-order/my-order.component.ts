import { Component } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css'],
})
export class MyOrderComponent {
  orderDetails: any[] = [];
  userID: any = '';
  ngOnInit() {
    this.userID = JSON.parse(sessionStorage.getItem('user_id')!);
    if (this.userID) {
      this.getOrderDetails();
    } else {
      console.error('User ID not found.');
    }
  }
  constructor(private orderService: OrderService) {}
  getOrderDetails() {
    this.orderService.getOrder().subscribe({
      next: (res: any) => {
        this.orderDetails = this.filterOrder(res.data);
        console.log(this.orderDetails);
      },
      error: (error: any) => {
        console.log(error);
        console.log(error.error.error.message);
      },
    });
  }

  //filter orders
  filterOrder(data: any): any[] {
    return data.filter(
      (order: any) => order.attributes.user_details.data.id === this.userID
    );
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
