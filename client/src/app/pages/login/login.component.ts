import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),//, Validators.email]),
    passwd: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  success: boolean = false;
  error: boolean = false;
  errorMsg: any = '';

  constructor(private user: UserService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.get('email')?.invalid)
      this.errorMsg = { err: { message: "No Email specfied" } };
    else if (this.loginForm.get('passwd')?.invalid)
      this.errorMsg = { err: { message: "Password not long enough (min 3 Chars)" } };

    if (this.loginForm.valid) {
      this.user.login(this.loginForm.get('email')?.value, this.loginForm.get('passwd')?.value).subscribe(
        (val) => {
          this.error = !val.success;
          this.success = val.success;

          if (val.success != true)
            this.errorMsg = val;
          else
            this.user.updatelogin();
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
