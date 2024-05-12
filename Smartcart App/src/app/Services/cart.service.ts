import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  addTocartURL: string = environment.baseUrl + environment.addtocart;
  getCardItemURL: string = environment.baseUrl + environment.getCartProduct;
  removeUpdateCartItemURL: string =
    environment.baseUrl + environment.removeUpdateCartItem;
  constructor(private http: HttpClient) {}

  addTocart(productData: any) {
    return this.http.post(this.addTocartURL, productData);
  }
  getCart(id: any) {
    return this.http.get(
      this.getCardItemURL +
        `filters[user_detail][id][$eq][0]=${id}&populate=product&filters[order][id][$notNull]`
    );
  }
  removeCartItem(id: any) {
    return this.http.delete(this.removeUpdateCartItemURL + id);
  }
  updateCartItem(id: any, productData: any) {
    return this.http.put(this.removeUpdateCartItemURL + id, productData);
  }
}
