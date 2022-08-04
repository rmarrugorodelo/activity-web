import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLisComponent } from './employee-lis.component';

describe('EmployeeLisComponent', () => {
  let component: EmployeeLisComponent;
  let fixture: ComponentFixture<EmployeeLisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeLisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
