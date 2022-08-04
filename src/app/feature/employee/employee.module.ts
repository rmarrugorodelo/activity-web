import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeLisComponent } from './component/employee-lis/employee-lis.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from './service/employee.service';


const routes: Routes = [
  {
    path: '',
    component: EmployeeLisComponent
  }
]

@NgModule({
  declarations: [
    EmployeeLisComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule
  ],
  providers: [
    EmployeeService
  ]
})
export class EmployeeModule { }
