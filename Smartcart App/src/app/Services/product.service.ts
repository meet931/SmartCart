import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getAllProductURL: string = environment.baseUrl + environment.products;
  getSingalProductURL: string =
    environment.baseUrl + environment.single_product;
  getCategoryURL = environment.baseUrl + environment.getCategory;
  searchProductURL = environment.baseUrl + environment.productSearch;
  constructor(private http: HttpClient) {}

  //getting all produc with pagination
  getAllProduct(pageNumber: any, pageSize: any) {
    return this.http.get(
      this.getAllProductURL +
        `&pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}`
    );
  }
  getSingalProduct(id: any) {
    return this.http.get(
      this.getSingalProductURL + id + '?populate[product_image][fields][1]=url'
    );
  }
  getCategories() {
    return this.http.get(this.getCategoryURL);
  }
  getFilterProduct(id: any) {
    return this.http.get(
      this.getAllProductURL + `&filters[category][id]=${id}`
    );
  }
  searchProduct(keyword: any) {
    return this.http.get(
      this.searchProductURL + `&filters[product_name][$containsi][0]=${keyword}`
    );
  }
}
