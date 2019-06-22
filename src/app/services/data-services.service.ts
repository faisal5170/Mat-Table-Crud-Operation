import { Injectable } from '@angular/core';
import { CrudModule } from '../models/crud/crud.module';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
export class ApiClass {
  name: string;
  salary: string;
  age: string;
  constructor(name,salary,age) {
    this.name = name;
    this.salary = salary;
    this.age = age;
  }
}
@Injectable({
  providedIn: 'root'
})
export class DataServicesService {

  dataChange: BehaviorSubject<CrudModule[]> = new BehaviorSubject<CrudModule[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) { }

  get data(): CrudModule[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.httpClient.get<CrudModule[]>('http://dummy.restapiexample.com/api/v1/employees').subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  addIssue(issue: CrudModule): void {
    let apiData = new ApiClass(issue.employee_name,issue.employee_salary,issue.employee_age);
    console.log(apiData);
    this.httpClient.post('http://dummy.restapiexample.com/api/v1/create', apiData).subscribe(data => {
      this.dialogData = data;
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  updateIssue(issue: CrudModule): void {
    let apiData = new ApiClass(issue.employee_name,issue.employee_salary,issue.employee_age);
    console.log(apiData);
    this.httpClient.put('http://dummy.restapiexample.com/api/v1/update/' + issue.id, apiData).subscribe(data => {
      this.dialogData = data;
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  deleteIssue(id: number): void {
    this.httpClient.delete('http://dummy.restapiexample.com/api/v1/delete/' + id).subscribe(data => {
      console.log(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }
}
