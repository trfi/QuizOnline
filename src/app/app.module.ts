import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubjectComponent } from './subject/subject.component';
import { ExamComponent } from './exam/exam.component';
import { ResultComponent } from './result/result.component';
import { ResultDetailComponent } from './result-detail/result-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    SubjectComponent,
    ExamComponent,
    ResultComponent,
    ResultDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: SubjectComponent},
      {path: 'subject/:idSubject', component: ExamComponent},
      {path: 'subject/:idSubject/result', component: ResultComponent},
      {path: 'subject/:idSubject/result/:quesIndex', component: ResultDetailComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
