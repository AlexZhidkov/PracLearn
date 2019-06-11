import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { StudentComponent } from './student-landing-page/student.component';
import { ProjectComponent } from './project/project.component';
import { EoiBusinessComponent } from './eoi-business/eoi-business.component';
import { BusinessComponent } from './business-landing-page/business.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProfileBusinessComponent } from './profile-business/profile-business.component';
import { EoiStudentComponent } from './eoi-student/eoi-student.component';
import { LoginComponent } from './login/login.component';
import { UniversityComponent } from './university/university.component';
import { UniversityTodoComponent } from './university-todo/university-todo.component';
import { ReviewStudentEoiComponent } from './review-student-eoi/review-student-eoi.component';
import { EventsViewerComponent } from './events-viewer/events-viewer.component';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { BusinessSelfSourcedProjectComponent } from './business-self-sourced-project/business-self-sourced-project.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { StudentGetStartedComponent } from './student-get-started/student-get-started.component';
import { BusinessProjectComponent } from './business-project/business-project.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { TemplateComponent } from './template/template.component';
import { TemplateEditComponent } from './template-edit/template-edit.component';
import { ProjectWizardComponent } from './project-wizard/project-wizard.component';

const routes: Routes = [
  { path: 'profile', component: UserProfileComponent },
  { path: 'university', component: UniversityComponent },
  { path: 'university/todo/:id', component: UniversityTodoComponent },
  { path: 'student', component: StudentComponent },
  { path: 'project/self-sourced', component: BusinessSelfSourcedProjectComponent }, // canActivate: [AuthService] },
  { path: 'survey', component: SurveyComponent },
  { path: 'student', component: StudentComponent },
  { path: 'student/start', component: StudentGetStartedComponent },
  { path: 'student/eoi/:id/:businessId/:isNewProject', component: EoiStudentComponent }, // canActivate: [AuthService] },
  { path: 'student/eoi/:eoiId', component: EoiStudentComponent }, // canActivate: [AuthService] },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'projects', component: ProjectsListComponent },
  { path: 'templates', component: TemplatesListComponent },
  { path: 'template/:id', component: TemplateComponent },
  { path: 'templateEdit/:id', component: TemplateEditComponent },
  { path: 'project/:type/:id', component: ProjectViewComponent },
  { path: 'projectEdit/:id', component: ProjectEditComponent },
  { path: 'business', component: BusinessComponent },
  { path: 'business/profile', component: ProfileBusinessComponent }, // canActivate: [AuthService] },
  { path: 'business/eoi/blank', component: EoiBusinessComponent }, // canActivate: [AuthService] },
  { path: 'business/eoi/:id/:isNewProject', component: EoiBusinessComponent }, // canActivate: [AuthService] },
  { path: 'business/eoi/:eoiId', component: EoiBusinessComponent }, // canActivate: [AuthService] },
  { path: 'business/project/:id', component: BusinessProjectComponent },
  { path: 'reviewStudentEoi/:uid/:id', component: ReviewStudentEoiComponent },
  { path: 'wizard', component: ProjectWizardComponent },
  { path: 'events', component: EventsViewerComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
