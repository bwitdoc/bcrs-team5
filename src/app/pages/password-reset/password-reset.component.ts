import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  form: FormGroup;
  password: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService) { }

  ngOnInit() {
  }

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
