import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  isloading = false;
  userData: any = {};
  userID: any = '';
  cityData: any[] = [];

  userForm = new FormGroup({
    address_line_1: new FormControl('', [Validators.required]),
    landmark: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
    ]),
  });

  get mobile() {
    // console.log(this.loginForm.get('email'));
    return this.userForm.get('mobile');
  }
  constructor(
    private userService: UserService,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.getUserData();
    this.getAllCities();
    this.userID = JSON.parse(sessionStorage.getItem('user_id')!);
  }

  //api call
  getAllCities() {
    this.userService.getCities().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.cityData = res.data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  //api call
  getUserData() {
    this.userService.getuserInfo().subscribe({
      next: (res: any) => {
        console.log(res);
        this.userData = res;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  //api call
  addUserDetails() {
    this.isloading = true;
    const formData = {
      data: {
        user_details: this.userID,
        address_line_1: this.userForm.value.address_line_1,
        address_line_2: null,
        landmark: this.userForm.value.landmark,
        isDefault: true,
        city: Number(this.userForm.value.city),
      },
    };
    const data = {
      mobile_number: this.userForm.value.mobile,
    };

    this.userService.addUserAddress(formData).subscribe({
      next: (res: any) => {
        // console.log(res);
      },
      error: (error: any) => {
        console.log(error);
        this.isloading = false;
      },
    });

    this.userService.updateUserMobile(this.userID, data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isloading = false;
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'User Details Saved.',
        });
        this.getUserData();
      },
      error: (error: any) => {
        console.log(error);
        this.isloading = false;
      },
    });
  }
}
