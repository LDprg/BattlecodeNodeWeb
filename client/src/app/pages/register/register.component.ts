import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    passwd: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  success: boolean = false;
  error: boolean = false;
  errorMsg: any = '';

  constructor(private user: UserService) { }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.get('name')?.invalid)
      this.errorMsg = { err: { message: "Name not long enough (min 3 Chars)" } };
    else if (this.registerForm.get('email')?.invalid)
      this.errorMsg = { err: { message: "No Email specfied" } };
    else if (this.registerForm.get('passwd')?.invalid)
      this.errorMsg = { err: { message: "Password not long enough (min 3 Chars)" } };

    if (this.registerForm.valid) {
      this.user.register(this.registerForm.get('name')?.value, this.registerForm.get('email')?.value, this.registerForm.get('passwd')?.value).subscribe(
        (val) => {
          val = JSON.parse(val);

          this.error = !val.success;
          this.success = val.success;

          if (val.success != true)
            this.errorMsg = val;
        });
    } else {
      this.error = true;
      this.success = false;
    }
  }
}
