/*=========================
Name: Brittany Dockter, Justin Singleton, Gabriel Sanchez
Date: April 19, 2020
Assignment: forgot password backend
Description: reset password functions 
==========================*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
// authenticates the username that needs a password change to tell
// the database which user is changing their password so it can log it
export class ForgotPasswordComponent implements OnInit {
  isAuthenticated: string;
  username: string;
  form: FormGroup;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
    this.isAuthenticated = this.route.snapshot.queryParamMap.get('isAuthenticated');
    this.username = this.route.snapshot.queryParamMap.get('username');
  }

  ngOnInit() {
    this.form = this.fb.group({
      password: [null, Validators.compose([Validators.required])]
    });
  }
// reset password function that attaches the changed password to
// the correct user, using the session and cookies to track it
  resetPassword() {
    this.http.put('/api/session/users/' + this.username + '/reset-password', {
      password: this.form.controls['password'].value
    }).subscribe(res => {
      this.cookieService.set('sessionuser', this.username, 1);
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
    });
  }
}
