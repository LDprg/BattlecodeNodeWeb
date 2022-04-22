import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),//, Validators.email]),
    passwd: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  success: boolean = false;
  error: boolean = false;
  errorMsg: any = '';

  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.get('name')?.invalid)
      this.errorMsg = { err: { message: "No Username specfied" } };
    else if (this.loginForm.get('passwd')?.invalid)
      this.errorMsg = { err: { message: "Password not long enough (min 3 Chars)" } };

    if (this.loginForm.valid) {
      this.user.login(this.loginForm.get('name')?.value, this.loginForm.get('passwd')?.value).subscribe(
        (user) => {
          console.log(user);
          var success = false;

          if(user.username == this.loginForm.get('name')?.value)
            success = true

          this.error = !success;
          this.success = success;

          if (!success)
            this.errorMsg = { err: { message: "Wrong Password or Username!" } };
          else{
            this.user.setUserInfo(user);
            this.user.updatelogin();
            this.router.navigate(["home"]);
          }
        },
        (err) => {
          this.error = true;
          this.success = false;
          this.errorMsg = { err: { message: "Wrong Password or Username!" } };
        });
    } else {
      this.error = true;
      this.success = false;
    }
  }

}
