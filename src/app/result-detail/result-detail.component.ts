import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-result-detail',
  templateUrl: './result-detail.component.html',
  styleUrls: ['./result-detail.component.css']
})
export class ResultDetailComponent implements OnInit {

  quesIndex:any;
  subId:any;
  question:any;
  answers:any;

  constructor(private _ActivatedRoute:ActivatedRoute, private _http:HttpClient) { }

  ngOnInit(): void {
    this.subId = this._ActivatedRoute.snapshot.paramMap.get('idSubject')
    this.quesIndex = this._ActivatedRoute.snapshot.paramMap.get('quesIndex')
    console.log(this.subId)
    console.log(this.quesIndex)
    this.getAllQuestions().subscribe(data => {
      this.question = data[this.quesIndex]
      console.log(this.question)
    })
    this.answers = JSON.parse(localStorage.getItem(this.subId))
    console.log(this.answers)
  }

  getQuestion() {
    
  }
  getAllQuestions() {
    return this._http.get(`./assets/db/Quizs/${this.subId}.json`)
  }
}
