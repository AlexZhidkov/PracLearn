import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentComponent } from './student-landing-page/student.component';
import { ProjectEditDialogComponent } from './project-edit-dialog/project-edit-dialog.component';
import { ProjectService } from './services/project.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ProjectComponent } from './project/project.component';
import { EoiBusinessComponent } from './eoi-business/eoi-business.component';
import { BusinessComponent } from './business-landing-page/business.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { EoiBusinessService } from './services/eoi-business.service';
import { ProfileBusinessComponent } from './profile-business/profile-business.component';
import { EoiStudentComponent } from './eoi-student/eoi-student.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { LoginComponent } from './login/login.component';
import { EoiStudentService } from './services/eoi-student.service';
import { UniversityComponent } from './university/university.component';
import { UniversityTodoComponent } from './university-todo/university-todo.component';
import { UniversityTodoService } from './services/university-todo.service';
import { EventStoreService } from './services/event-store.service';
import { ReviewStudentEoiComponent } from './review-student-eoi/review-student-eoi.component';
import { EventsViewerComponent } from './events-viewer/events-viewer.component';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';
import { ProjectViewComponent } from './project-view/project-view.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { StudentGetStartedComponent } from './student-get-started/student-get-started.component';
import { BusinessProjectComponent } from './business-project/business-project.component';
import { StudentHelpComponent } from './student-help/student-help.component';
import { BusinessHelpComponent } from './business-help/business-help.component';
import { UniversityHelpComponent } from './university-help/university-help.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { TemplateComponent } from './template/template.component';
import { TemplateEditComponent } from './template-edit/template-edit.component';
import { ProjectWizardComponent } from './project-wizard/project-wizard.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    ProjectEditDialogComponent,
    ProjectComponent,
    EoiBusinessComponent,
    BusinessComponent,
    ProjectEditComponent,
    ProfileBusinessComponent,
    EoiStudentComponent,
    ProfileStudentComponent,
    LoginComponent,
    UniversityComponent,
    UniversityTodoComponent,
    ReviewStudentEoiComponent,
    EventsViewerComponent,
    HomeComponent,
    SurveyComponent,
    ProjectViewComponent,
    ProjectsListComponent,
    StudentGetStartedComponent,
    BusinessProjectComponent,
    StudentHelpComponent,
    BusinessHelpComponent,
    UniversityHelpComponent,
    UserProfileComponent,
    TemplatesListComponent,
    TemplateComponent,
    TemplateEditComponent,
    ProjectWizardComponent
  ],
  entryComponents: [
    ProjectEditDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: true,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: false,
        }
      }
    }),
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatListModule,
    MatStepperModule,
    MatSelectModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatTableModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ProjectService,
    EoiBusinessService,
    EoiStudentService,
    UniversityTodoService,
    EventStoreService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
