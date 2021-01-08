import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  idSub:any;
  answers:any;
  listQuestion:any;

  constructor(private _ActivatedRoute:ActivatedRoute, private _http:HttpClient) { }

  ngOnInit(): void {
    this.idSub = this._ActivatedRoute.snapshot.paramMap.get('idSubject')
    console.log(this.idSub)
    this.answers = JSON.parse(localStorage.getItem(this.idSub))
    console.log(this.answers)

    this.getAllQuestions(this.idSub).subscribe(data => {
      this.listQuestion=data
      console.log(this.listQuestion)
    });
  }

  getAllQuestions(idsub) {
    return this._http.get(`./assets/db/Quizs/${idsub}.json`);
  }

  isCorrect(answerId) {
    return this.listQuestion.some(value => parseInt(answerId) === value['AnswerId'])
  }

}
