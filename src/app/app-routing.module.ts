import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { StudentComponent } from './student-landing-page/student.component';
import { ProjectComponent } from './project/project.component';
import { EoiBusinessComponent } from './eoi-business/eoi-business.component';
import { BusinessComponent } from './business-landing-page/business.component';
import { ProjectGroupComponent } from './project-group/project-group.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectGroupEditComponent } from './project-group-edit/project-group-edit.component';
import { ProfileBusinessComponent } from './profile-business/profile-business.component';
import { EoiStudentComponent } from './eoi-student/eoi-student.component';
import { LoginComponent } from './login/login.component';
import { UniversityComponent } from './university/university.component';
import { UniversityTodoComponent } from './university-todo/university-todo.component';
import { ReviewStudentEoiComponent } from './review-student-eoi/review-student-eoi.component';
import { EventsViewerComponent } from './events-viewer/events-viewer.component';
import { HomeComponent } from './home/home.component';
import { SelfSourcedProjectComponent } from './self-sourced-project/self-sourced-project.component';
import { SurveyComponent } from './survey/survey.component';
import { StudentProjectWizardComponent } from './student-project-wizard/student-project-wizard.component';

const routes: Routes = [
  { path: 'university', component: UniversityComponent },
  { path: 'university/todo/:id', component: UniversityTodoComponent },
  { path: 'student', component: StudentComponent },
  { path: 'student/self-sourced', component: SelfSourcedProjectComponent }, // canActivate: [AuthService] },
  { path: 'student/survey', component: SurveyComponent },
  { path: 'student/form/:id', component: StudentProjectWizardComponent },
  { path: 'student', component: StudentComponent },
  { path: 'student/eoi/:id/:businessId/:isNewProject', component: EoiStudentComponent }, // canActivate: [AuthService] },
  { path: 'student/eoi/:eoiId', component: EoiStudentComponent }, // canActivate: [AuthService] },
  { path: 'student/:id', component: ProjectComponent },
  { path: 'projectEdit/:id', component: ProjectEditComponent },
  { path: 'business', component: BusinessComponent },
  { path: 'business/profile', component: ProfileBusinessComponent }, // canActivate: [AuthService] },
  { path: 'business/eoi/:id/:isNewProject', component: EoiBusinessComponent }, // canActivate: [AuthService] },
  { path: 'business/eoi/:eoiId', component: EoiBusinessComponent }, // canActivate: [AuthService] },
  { path: 'business/:id', component: ProjectGroupComponent },
  { path: 'reviewStudentEoi/:uid/:id', component: ReviewStudentEoiComponent },
  { path: 'projectGroupEdit/:id', component: ProjectGroupEditComponent },
  { path: 'events', component: EventsViewerComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
