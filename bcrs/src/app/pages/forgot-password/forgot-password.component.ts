/*=========================
Name: Brittany Dockter, Justin Singleton, Gabriel Sanchez
Date: April 19, 2020
Assignment: forgot password backend
Description: reset password functions
==========================*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
// authenticates the username that needs a password change to tell
// the database which user is changing their password so it can log it
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])]
    });
  }
// reset password function that attaches the changed password to
// the correct user, using the session and cookies to track it
  resetPassword() {
    let username = this.form.controls['username'].value;
    this.http.put('/api/session/users/' + username + '/reset-password', {
      password: this.form.controls['password'].value
    }).subscribe(res => {
      this.cookieService.set('sessionuser', username, 1);
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
    });
  }
}
