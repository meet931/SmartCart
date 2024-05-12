import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  userDetailURL: string = environment.baseUrl + environment.user_details;
  addUserAddressURL: string =
    environment.baseUrl + environment.add_user_address;
  updateUserMobileURL = environment.baseUrl + environment.updateUserMobile;
  getCityURL: string = environment.baseUrl + environment.cities;

  constructor(private http: HttpClient) {}

  getuserInfo() {
    return this.http.get(this.userDetailURL);
  }
  addUserAddress(addressData: any) {
    return this.http.post(this.addUserAddressURL, addressData);
  }

  getCities() {
    return this.http.get(this.getCityURL);
  }

  updateUserMobile(userId: any, data: any) {
    return this.http.put(this.updateUserMobileURL + userId, data);
  }
}
// http://localhost:1337/api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city&populate[2]=user_addresses.city.state

// all city http://localhost:1337/api/cities?populate=state
