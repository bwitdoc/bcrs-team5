import { Component, OnInit } from '@angular/core';
import { FormBuilder, FromGroup, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
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

  resetPassword() {
    this.http.post('/api/session/users/' + this.username + './reset-password', {
      password: this.form.controls['password'].value
    }).subscribe(res => {
      this.cookieService.set('sessionuser', this.username, 1);
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
    });
  }
}