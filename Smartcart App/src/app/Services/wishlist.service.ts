import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  addTowishlistURL = environment.baseUrl + environment.addTowishlist;
  getWishListURL = environment.baseUrl + environment.getWishList;
  removeWishlist = environment.baseUrl + environment.removeWishlist;
  constructor(private http: HttpClient) {}

  addToWishlist(wishlistData: any) {
    return this.http.post(this.addTowishlistURL, wishlistData);
  }
  getWishlist(userID: any) {
    return this.http.get(
      this.getWishListURL + `&filters[user_detail][id][$eq][0]=${userID}`
    );
  }
  removeWishListItem(id: any) {
    return this.http.delete(this.removeWishlist + id);
  }
}
