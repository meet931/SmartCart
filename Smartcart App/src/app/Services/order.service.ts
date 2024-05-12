import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  placeOrderURL = environment.baseUrl + environment.placeOrder;
  getOrderURL = environment.baseUrl + environment.getOrderDetails;
  getSingleOrderURL = environment.baseUrl + environment.getSingleOrder;
  constructor(private http: HttpClient) {}

  placeOrder(orderData: any) {
    return this.http.post(this.placeOrderURL, orderData);
  }

  getOrder() {
    return this.http.get(this.getOrderURL);
  }

  getSingleOrder(orderId: any) {
    return this.http.get(this.getSingleOrderURL + orderId);
  }
}
