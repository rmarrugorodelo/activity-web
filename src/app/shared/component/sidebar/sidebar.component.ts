import { Component, OnInit } from '@angular/core';
import { NavigationRoute } from '../../constant/navigation-route.constant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public routes = NavigationRoute;

  constructor() { }

  ngOnInit(): void {
  }

}
