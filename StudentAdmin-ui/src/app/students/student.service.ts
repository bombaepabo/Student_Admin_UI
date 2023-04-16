import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student} from '../models/api-models/student.model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseApiUrl = "http://localhost:5253";

  constructor(private httpClient:HttpClient) { }
  GetStudent(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/student');
  }
}
