import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  listQuestions:any;
  index=0;
  point=0;
  idSub:any;
  currentQuestion:any;
  answers:any = {};
  countdown = {
    miliseconds: 60*1000,
    minutes: 0,
    seconds: 0
  };
  constructor(private _ActivatedRoute:ActivatedRoute, private _http:HttpClient) { }

  ngOnInit(): void {
    this.idSub = this._ActivatedRoute.snapshot.paramMap.get('idSubject');
    this.getAllQuestions(this.idSub).subscribe(data => {
      this.listQuestions=data
      this.currentQuestion=this.listQuestions[this.index]
    });
    this.startCountdown();
  }
  classActive() {
    try {
      const element = document.querySelectorAll('#listNumberQuestion > div')
      element.forEach(el => {
        el.classList.remove("bg-pink-600","text-white");
      });
      element[this.index].classList.add("bg-pink-600","text-white");
    } catch (error) {
      
    }
  }
  getAllQuestions(idsub) {
    return this._http.get(`./assets/db/Quizs/${idsub}.json`);
  }
  previous() {
    if (this.index>0) this.index--;
    this.currentQuestion = this.listQuestions[this.index];
  }
  next() {
    if (this.index+1 == this.listQuestions.length) return
    this.index++
    this.currentQuestion = this.listQuestions[this.index]
    console.log(this.answers)
  }
  goToIndex(index) {
    this.index = parseInt(index)
    if (this.index+1 == this.listQuestions.length) return
    this.currentQuestion = this.listQuestions[this.index]
  }
  startCountdown() {
    let x = setInterval(function() {
      this.countdown.miliseconds-=1000;
      this.countdown.minutes = Math.floor((this.countdown.miliseconds % (1000 * 60 * 60)) / (1000 * 60));
      this.countdown.seconds = Math.floor((this.countdown.miliseconds % (1000 * 60)) / 1000);
      if (this.countdown.miliseconds < 0) {
        this.submit();
        clearInterval(x);
      }
    }.bind(this), 1000);
  }
  choose(quesId, answerId) {
    this.answers[quesId] = Number(answerId)
  }
  submit() {
    this.listQuestions.map(value => (Number(this.answers[value.Id]) === value['AnswerId']) && (this.point+=value.Marks))
    localStorage.setItem(this.idSub, JSON.stringify(this.answers));
    // let point = (this.point/(this.listQuestions.length/100)).toFixed(1)
    this.point = 0;
  }
}
