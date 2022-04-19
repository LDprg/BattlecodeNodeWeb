import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loggedIn: boolean = true;
  private name: string = 'user';
  private email: string = 'user@gmx.at';

  private server: string = 'http://localhost:8080';

  constructor(private router: Router, private http: HttpClient) { }

  register(name: string, email: string, passwd: string): Observable<any> {
    var url = this.server + '/register';

    url += '?name='+name.trim();
    url += '&email='+email.trim();
    url += '&passwd='+passwd;

    return this.http.get(url, {responseType: 'text'});
  }

  login(name: string, passwd: string): Observable<any> {
    var url = this.server + '/login';

    return this.http.post(url, {username : name.trim(), password : passwd.trim()});
  }

  test() :Observable<string>{
    return this.http.get(this.server, {responseType: 'text'});
  }

  logout(): void {
    var url = this.server + '/logout';
    this.loggedIn = false;
    this.router.navigate(['home']);
    this.http.get(url, {responseType: 'text'});
  }

  updatelogin(){
    var url = this.server + '/islogin';
    this.http.get(url, {responseType: 'text'}).subscribe((data) => {
      console.log('Login update :' + data);
      var val = JSON.parse(data);
      this.loggedIn = val.success;
    });
  }

  onlyLogIn() {
    var url = this.server + '/islogin';
    this.http.get(url, {responseType: 'text'}).subscribe((data) => {
      if(!this.loggedIn)
        this.router.navigate(['home']);
    });
  }

  getName(): string {
    if (this.loggedIn)
      return this.name;
    else
      throw new Error('Login first!');
  }

  getEmail(): string {
    if (this.loggedIn)
      return this.email;
    else
      throw new Error('Login first!');
  }
}
