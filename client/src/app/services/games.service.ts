import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  public server: string = 'http://localhost:8080';

  success: boolean = false;
  error: boolean = false;
  errorMsg: any = '';

  constructor(private http: HttpClient) { }

  addBot(github: string, tag :string) {
    var url = this.server + "/addbot";

    url += '?link=' + github.trim();
    url += '&tag=' + tag.trim();

    return this.http.get(url, { withCredentials: true });
  }

  getBots(){
    var url = this.server + "/getbot";

    return this.http.get(url, { withCredentials: true });
  }

  deleteBot(id: string){
    var url = this.server + "/rmbot";

    url += '?id=' + id;

    return this.http.get(url, { withCredentials: true });
  }

  editBot(id:string, tag:string){
    var url = this.server + "/editbot";

    url += '?id=' + id;
    url += '&tag=' + tag.trim();

    return this.http.get(url, { withCredentials: true });
  }
}
