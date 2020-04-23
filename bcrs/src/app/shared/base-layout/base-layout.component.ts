import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {
  show: boolean;
  year: number = Date.now();

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.http.get('/api/users/' + this.cookieService.get('sessionuser') + '/role').subscribe(res => {
      console.log(res);
      if (res = "admin") {
          console.log('true');
          this.show = true;
      } else {
          console.log('false');
          this.show = false;
      }
    });
  }

  ngOnInit() {

  }

}
