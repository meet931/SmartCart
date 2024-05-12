import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  activeNavItem: string | undefined;
  userID: number = 0;
  cartItem: any[] = [];
  // TotalItemsinCart: number = 0;
  ngOnInit() {
    this.userID = JSON.parse(sessionStorage.getItem('user_id')!);

    this.getTotalItemsInCart();
  }

  constructor(private router: Router, private cartService: CartService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveNavItem(event.url);
      }
    });
  }
  setActiveNavItem(url: string) {
    // Logic to determine the active navigation item based on the URL
    // For example, you can compare the URL with the route paths
    if (url.includes('my-order')) {
      this.activeNavItem = 'my-order';
    } else if (url.includes('profile')) {
      this.activeNavItem = 'profile';
    } else if (url.includes('wishlist')) {
      this.activeNavItem = 'wishlist';
    } else if (url.includes('cart')) {
      this.activeNavItem = 'cart';
    } else {
      this.activeNavItem = ''; // If no active item, set to empty
    }
  }
  handleLogout() {
    if (confirm('Do you want to logout?')) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user_id');
      this.router.navigate(['/']);
    }
  }
  getTotalItemsInCart() {
    // console.log(this.cartItem);
    return this.cartItem.length;
  }
}
