import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {
  test:string = "";

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.test().subscribe((val) => {
      this.test = val;
    });
  }

}
