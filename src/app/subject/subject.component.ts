import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {

  constructor(private _http:HttpClient) {}

  subjects:any;
  page = 1;
  pageSize = 8;
  total = 0


  ngOnInit(): void {
    this.getAllSubjects().subscribe(data => {
      this.subjects = data;
    })    
  }
  getAllSubjects() {
    return this._http.get(`./assets/db/Subjects.json`);
  }
}
