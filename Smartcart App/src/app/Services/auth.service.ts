import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginUrl: string = environment.baseUrl + environment.login;
  registerUrl: string = environment.baseUrl + environment.register;
  constructor(private http: HttpClient) {}

  login(credentials: any) {
   return this.http.post(this.loginUrl, credentials);
  }

  register(credentials: any) {
   return this.http.post(this.registerUrl, credentials);
   //wen need to subscribe this observable

   //store jwt in localstorge and pass this into header while calling product and all other stuff
  }
}
// http://localhost:1337/api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city&populate[2]=user_addresses.city.state

// all city http://localhost:1337/api/cities?populate=state