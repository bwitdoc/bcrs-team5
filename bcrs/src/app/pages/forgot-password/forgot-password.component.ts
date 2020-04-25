/*=========================
Name: Brittany Dockter, Justin Singleton, Gabriel Sanchez
Date: April 19, 2020
Assignment: forgot password backend
Description: reset password functions
==========================*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
  forgotForm: FormGroup;
  securityQuestions: any;
  errorMessage: string;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.forgotForm = new FormGroup({
      username: new FormGroup({
        username: new FormControl(null, Validators.required),
      }),
      securityQuestions: new FormGroup({
        answerToSecurityQuestion1: new FormControl(null, Validators.required),
        answerToSecurityQuestion2: new FormControl(null, Validators.required),
        answerToSecurityQuestion3: new FormControl(null, Validators.required)
      }),
      password: new FormGroup({
        password: new FormControl(null, Validators.required)
      })
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

  getQuestions() {
    let username = this.form.controls['username'].value;
    this.http.get('/api/users/' + username + '/security-questions').subscribe(res => {
      this.securityQuestions = res;
    }, err => {
      console.log(err)
    });
  }

  verifyAnswers() {
    let username = this.form.controls['username'].value;
    this.http.post('/api/session/users/' + username + '/security-questions', {
      answerToSecurityQuestion1: this.form.controls['answerToSecurityQuestion1'].value,
      answerToSecurityQuestion2: this.form.controls['answerToSecurityQuestion2'].value,
      answerToSecurityQuestion3: this.form.controls['answerToSecurityQuestion3'].value
    }).subscribe(res => {
      console.log('correct');
    }, err => {
      console.log(err);
      this.errorMessage = err;
      this.router.navigate(['/']);
    });
  }
}
