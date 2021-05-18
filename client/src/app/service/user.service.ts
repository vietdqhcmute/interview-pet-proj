import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private router: Router, 
              private http: HttpClient) {
                this.currentUserSubject = new BehaviorSubject({});
  }
  public currentUserValue() {
    return this.currentUserSubject.value;
  }

  public login(email: String, password: String) {
    return this.http
      .post('http://localhost:9000/users/login', { email, password })
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }
}
