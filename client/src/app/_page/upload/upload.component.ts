import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.isLoggedIn(true);
  }

}
