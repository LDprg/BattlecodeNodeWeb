import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {
  test:string = "";

  constructor(private user: UserService) { }

  ngOnInit(): void {
    //this.user.isLoggedIn(true);
    this.user.test().forEach(val => this.test += val);
  }

}
