import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { ICourse } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = '/assets/courses.json';

  constructor(private httpClient: HttpClient) {}

  public findAllCourses(): Observable<ICourse[]> {
    return this.httpClient.get<ICourse[]>(this.API).pipe(first());
  }
}
