import { Component } from '@angular/core';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent {
  userID: number = 0;
  wishlistProduct: any[] = [];

  ngOnInit() {
    this.userID = JSON.parse(sessionStorage.getItem('user_id')!);
    this.getWishlistProduct();
  }
  constructor(
    private wishlistService: WishlistService,
    private toast: NgToastService
  ) {}
  getWishlistProduct() {
    this.wishlistService.getWishlist(this.userID).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.wishlistProduct = res.data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  RemoveWishlistItem(id: string) {
    if (confirm('Remove Item from wishlist ?')) {
      this.wishlistService.removeWishListItem(id).subscribe({
        next: (res: any) => {
          console.log(res);

          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Item Removed From Wishlist',
          });
          this.getWishlistProduct();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }
}
