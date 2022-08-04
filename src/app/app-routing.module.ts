import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './shared/component/page/page.component';
import { NavigationRoute } from './shared/constant/navigation-route.constant';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      {
        path: '',
        redirectTo: NavigationRoute.ACTIVITIES,
        pathMatch: 'full'
      },
      {
        path: NavigationRoute.ACTIVITIES,
        loadChildren: () => import('./feature/activity/activity.module').then( (m) => m.ActivityModule)
      },
      {
        path: NavigationRoute.EMPLOYEES,
        loadChildren: () => import('./feature/employee/employee.module').then( (m) => m.EmployeeModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
