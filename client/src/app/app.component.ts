import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'client';

  constructor(private router : Router, private user: UserService){  }

  ngOnInit() {
    this.user.updatelogin();
  }
}
