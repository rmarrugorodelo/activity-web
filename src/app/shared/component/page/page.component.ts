import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  public _opened: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  public _toggleSidebar() {
    this._opened = !this._opened;
  }

}
