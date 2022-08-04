import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Activities, Activity } from '../model/activity';
import { NumberLiteralType } from 'typescript';

@Injectable()
export class ActivityService {

  protected url = 'v1/activities';

  constructor(protected httpClient: HttpClient) {
    this.url = `${environment.apiUrl}${this.url}`;
  }

  public find(): Observable<Activities> {
    return this.httpClient.get<Activities>(this.url);
  }

  public findById(id: number): Observable<Activity>  {
    return this.httpClient.get<Activity>(`${this.url}/${id}`);
  }

  public save(activity: Activity): Observable<any> {
    return this.httpClient.post<any>(this.url,  activity);
  }

  public update(id: number, activity: Activity): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/${id}`,  activity);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/${id}`);
  }

  public complete(id: number): Observable<any> {
    return this.httpClient.patch<any>(`${this.url}/${id}/complete`, null);
  }

}
