import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-security-question-ask',
  templateUrl: './security-question-ask.component.html',
  styleUrls: ['./security-question-ask.component.css']
})
export class SecurityQuestionAskComponent implements OnInit {

  form: FormGroup;
  securityQuestions: any;
  questions: any;
  username: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService) {
    this.username = this.route.snapshot.paramMap.get('username');
    this.http.get('/api/users/' + this.username + '/security-questions').subscribe(res => {
      this.questions = res;
      console.log(res);
    }, err => {
      console.log(err)
    });

    this.http.post('/find-by-ids', {
      questions: this.questions.questionId
    }).subscribe(res => {
      this.securityQuestions = res;
      console.log(res);
    }, err => {
      console.log(err)
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      securityQuestion1: new FormControl(null, Validators.required),
      securityQuestion2: new FormControl(null, Validators.required),
      securityQuestion3: new FormControl(null, Validators.required),
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])]
    });
  }

  getNew() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.http.post('/api/session/users/' + this.username + '/security-questions', {
      answerToSecurityQuestion1: this.form.controls['answerToSecurityQuestion1'].value,
      answerToSecurityQuestion2: this.form.controls['answerToSecurityQuestion2'].value,
      answerToSecurityQuestion3: this.form.controls['answerToSecurityQuestion3'].value
    }).subscribe(res => {
      console.log('correct');
      this.router.navigate(['/password-reset'])
    }, err => {
      console.log(err);
    });
  }
}
