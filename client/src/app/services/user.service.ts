import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loggedIn: boolean = false;

  public server: string = 'http://localhost:8080';

  constructor(private router: Router, private http: HttpClient) { }

  private isJSONValid(data: any): boolean {
    return data && JSON.parse(data);
  }

  setUserInfo(user: any) {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  register(name: string, email: string, passwd: string): Observable<any> {
    var url = this.server + '/register';

    url += '?name=' + name.trim();
    url += '&email=' + email.trim();
    url += '&passwd=' + passwd;

    return this.http.get(url, { responseType: 'text', withCredentials: true });
  }

  login(name: string, passwd: string): Observable<any> {
    var url = this.server + '/login';

    return this.http.post(url, { username: name.trim(), password: passwd.trim() }, { withCredentials: true });
  }

  test(): Observable<string> {
    return this.http.get(this.server, { responseType: 'text' });
  }

  logout(): void {
    var url = this.server + '/logout';
    localStorage.removeItem('userInfo');
    this.loggedIn = false;
    this.http.get(url, { responseType: 'text', withCredentials: true }).subscribe(data => {
      this.router.navigate(['home']);
    });
  }

  updatelogin() {
    var url = this.server + '/islogin';

    this.http.get(url, { responseType: 'text', withCredentials: true }).subscribe((data) => {
      console.log('Login update :' + data);
      var val = JSON.parse(data);
      this.loggedIn = val.success;
    });
  }

  getName(): string {
    let userData = localStorage.getItem('userInfo')
    if (this.isJSONValid(userData))
      return JSON.parse(userData!).username;
    else
      throw new Error('Login first!');
  }

  getEmail(): string {
    let userData = localStorage.getItem('userInfo')
    if (this.isJSONValid(userData))
      return JSON.parse(userData!).email;
    else
      throw new Error('Login first!');
  }
}
