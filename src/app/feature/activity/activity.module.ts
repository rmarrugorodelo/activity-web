import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityListComponent } from './component/activity-list/activity-list.component';
import { ActivityFormComponent } from './component/activity-form/activity-form.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivityService } from './service/activity.service';
import { EmployeeService } from '../employee/service/employee.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: ActivityListComponent
  }
]


@NgModule({
  declarations: [
    ActivityListComponent,
    ActivityFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    ActivityService,
    EmployeeService
  ]
})
export class ActivityModule { }
