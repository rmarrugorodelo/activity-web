import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Employee } from '../model/employee';

@Injectable()
export class EmployeeService {

  protected url = 'v1/employees';

  constructor(protected httpClient: HttpClient) {
    this.url = `${environment.apiUrl}${this.url}`;
  }

  public find(): Observable<Array<Employee>> {
    return this.httpClient.get<Array<Employee>>(this.url);
  }

}
