import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgForm} from '@angular/forms'
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/ui-models/student.model';
@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit{
  studentId: string | null |undefined;
  student:Student = {
    id:'',
    firstName:'',
    lastName:'',
    dateOfBirth:'',
    email:'',
    mobile:0,
    genderId:'',
    profileImageUrl:'',
    gender:{
      id:'',
      description:''
    },
    address:{
      id:'',
      physicalAddress:'',
      postalAddress:''
    }
  }

  constructor(private readonly studentService: StudentService,private readonly route:ActivatedRoute){


  }
  ngOnInit(): void{
    this.route.paramMap.subscribe(
      (params) =>{
       this.studentId = params.get('id');
        if(this.studentId){
          this.studentService.GetStudent(this.studentId).subscribe(
            (successResponse) => {
                this.student = successResponse;
            }
          );

        }

      }
    );
  }
}
