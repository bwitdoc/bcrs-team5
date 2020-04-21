import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesByServiceComponent } from './purchases-by-service.component';

describe('PurchasesByServiceComponent', () => {
  let component: PurchasesByServiceComponent;
  let fixture: ComponentFixture<PurchasesByServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesByServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesByServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
