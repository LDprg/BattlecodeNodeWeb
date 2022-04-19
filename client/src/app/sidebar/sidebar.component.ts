import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  constructor(private user : UserService) {
  }

  ngOnInit() : void {
  }

  logout() : void {
    this.user.logout();
  }

  isLoggedIn() : boolean {
    return this.user.loggedIn;
  }

  getName() : string {
    return this.user.getName();
  }
}
