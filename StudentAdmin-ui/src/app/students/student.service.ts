import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student} from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/update-student-request.model';
import { AddStudentRequest } from '../models/api-models/add-student-request.model';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseApiUrl = "http://localhost:5253";

  constructor(private httpClient:HttpClient) { }
  GetStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/student');
  }
  GetStudent(studentId:string):Observable<Student>{
    return this.httpClient.get<Student>(this.baseApiUrl + '/student/'+studentId);
  }
  updateStudent(studentId:string,studentRequest:Student){
    const UpdateStudentRequest:UpdateStudentRequest = {
      firstName:studentRequest.firstName,
      lastName:studentRequest.lastName,
      dateOfBirth:studentRequest.dateOfBirth,
      email:studentRequest.email,
      mobile:studentRequest.mobile,
      genderId:studentRequest.genderId,
      physicalAddress:studentRequest.address.physicalAddress,
      postalAddress:studentRequest.address.postalAddress
    }
   return  this.httpClient.put<Student>(this.baseApiUrl + '/student/'+studentId,UpdateStudentRequest);

  }
  deleteStudent(studentId:string):Observable<Student>{
   return this.httpClient.delete<Student>(this.baseApiUrl +'/student/' + studentId);
  }
  addStudent(studentRequest:Student):Observable<Student>{
    const addStudentRequest:AddStudentRequest = {
      firstName:studentRequest.firstName,
      lastName:studentRequest.lastName,
      dateOfBirth:studentRequest.dateOfBirth,
      email:studentRequest.email,
      mobile:studentRequest.mobile,
      genderId:studentRequest.genderId,
      physicalAddress:studentRequest.address.physicalAddress,
      postalAddress:studentRequest.address.postalAddress
    }
   return this.httpClient.post<Student>(this.baseApiUrl +'/student/Add',addStudentRequest);
  }
  uploadImage(studentId:string,file:File):Observable<any>{
    const formData = new FormData();
    formData.append("profileimage",file);
   return this.httpClient.post(this.baseApiUrl + "/student/" + studentId + '/upload-image',formData,{
      responseType :'text'
    })
  }
  getImagePath(relativePath:string){
    return '${this.baseApiUrl}/${relativePath}';
  }
}
