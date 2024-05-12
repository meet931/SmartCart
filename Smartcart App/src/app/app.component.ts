import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'smart-cart-app';
  userloggedin = true;
  constructor(private router: Router) {}

  pathName: any;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.pathName = event.url;
      }
    });
  }
}
