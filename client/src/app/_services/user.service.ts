import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn: boolean = false;
  private name: string = 'user';
  private email: string = 'user@gmx.at';

  constructor(private router: Router, private http: HttpClient) { }

  register(name: string, email: string, password: string): void {

  }

  test() :Observable<string>{
    return this.http.get('http://localhost:8080/', {responseType: 'text'});
  }

  logout(): void {
    this.loggedIn = false;
    this.router.navigate(['home']);
  }

  isLoggedIn(redirectHome:boolean = false):boolean {
    if(!this.loggedIn && redirectHome )
      this.router.navigate(['home']);

    return this.loggedIn;
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
