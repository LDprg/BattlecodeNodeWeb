import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GamesService } from '../../services/games.service';

@Component({
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.sass']
})
export class UploadComponent implements OnInit {
  githubLink: string = "";
  githubTag: string = "";
  newgithubTag: string = "";

  success: boolean = false;
  error: boolean = false;
  msg: any = '';

  entries: any = [];

  constructor(private user: UserService, private game: GamesService) { }

  ngOnInit(): void {
    this.getBots();
  }

  addBot() {
    this.game.addBot(this.githubLink, this.githubTag).subscribe((value: any) => {
      this.success = value.success;
      this.error = !value.success;

      if(value.error)
          this.msg =  value.error;

      this.getBots();

      if (this.success)
        this.msg = "Successfully added";
    });
  }

  getBots() {
    this.game.getBots().subscribe((value: any) => {
      this.entries = value.data;
    })
  }

  edit(id: any) {
    if (this.newgithubTag) {
      this.game.editBot(id, this.newgithubTag).subscribe((value: any) => {
        this.success = value.success;
        this.error = !value.success;
        if(value.error)
          this.msg =  value.error;

        this.getBots();

        this.newgithubTag = "";

        if (this.success)
          this.msg = "Successfully edited";
      });
    } else {
      this.success = false;
        this.error = true;
        this.msg = "No Tag specified!";
    }
  }

  delete(id: any) {
    this.game.deleteBot(id).subscribe((value: any) => {
      this.success = value.success;
      this.error = !value.success;
      if(value.error)
        this.msg =  value.error;

      this.getBots();

      if (this.success)
        this.msg = "Successfully deleted";
    });
  }
}
