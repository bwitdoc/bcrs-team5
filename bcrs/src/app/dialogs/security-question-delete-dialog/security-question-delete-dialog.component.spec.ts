import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionDeleteDialogComponent } from './security-question-delete-dialog.component';

describe('SecurityQuestionDeleteDialogComponent', () => {
  let component: SecurityQuestionDeleteDialogComponent;
  let fixture: ComponentFixture<SecurityQuestionDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityQuestionDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
