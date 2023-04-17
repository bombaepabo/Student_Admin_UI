import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { NgForm} from '@angular/forms'
import { Observable } from 'rxjs';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  genderList:Gender[] = [];

  constructor(private readonly studentService: StudentService,private readonly route:ActivatedRoute,
    private readonly genderService :GenderService,private snackbar:MatSnackBar){


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
          this.genderService.getGenderList().subscribe(
            (successResponse) => {
              this.genderList = successResponse;
            }
          );

        }

      }
    );
  }
  onUpdate(): void{
    this.studentService.updateStudent(this.student.id,this.student).subscribe(
      (successResponse) => {
        this.snackbar.open('Student Updated succuesfully',undefined,{
          duration:2000
        });
        //Show notification
      },
      (errorResponse) =>{
        this.snackbar.open('Student Update Failed',undefined,{
          duration:2000
        });
      }
    );
  }
}
