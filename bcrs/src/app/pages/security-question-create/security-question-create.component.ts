import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-security-question-create',
<<<<<<< HEAD
  template: `
   
  `,
  styles: []
=======
  templateUrl: './security-question-create.component.html',
  styleUrls: ['./security-question-create.component.css']
>>>>>>> b07f4117adc2a4d5734e439562fa319a5d1917d7
})
export class SecurityQuestionCreateComponent implements OnInit {

  form: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }

<<<<<<< HEAD
  ngOnInit():  {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
}

// create
create(){
  this.http.post('/api/security-questions', {
    text: this.form.controls.text.value,
    })
    .subscribe(res => ){
      this.router.navigate(['/security-questions'])};
    });
  }

  // cancel
  cancel(){
    this.router.navigate(['/security-questions']);
  }
=======
  ngOnInit() {
    this.form = this.fb.group({
      text: [null,Validators.compose([Validators.required])],
    });
  }

  //create
  create() {
    this.http.post('/api/security-questions', {
      text: this.form.controls.text.value,
    }).subscribe(res => {
      this.router.navigate(['/security-questions']);
    });
  }

  //cancel
  cancel() {
    this.router.navigate(['/security-questions']);
  }
}
>>>>>>> b07f4117adc2a4d5734e439562fa319a5d1917d7
