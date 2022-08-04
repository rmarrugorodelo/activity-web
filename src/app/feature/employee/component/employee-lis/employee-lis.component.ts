import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../../model/employee';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee-lis',
  templateUrl: './employee-lis.component.html',
  styleUrls: ['./employee-lis.component.scss']
})
export class EmployeeLisComponent implements OnInit, OnDestroy {

  public employees: Array<Employee>

  private subscription = new Subscription();
  public language: string;


  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.find();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private find() {
    const sub = this.employeeService.find().subscribe(resp => {
      this.employees = resp;
    });
    this.subscription.add(sub);
  }

}
