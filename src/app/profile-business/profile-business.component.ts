import { Component, OnInit } from '@angular/core';
import { EoiBusiness } from '../model/eoi-business';
import { Observable } from 'rxjs';
import { EoiBusinessService } from '../services/eoi-business.service';
import { UserProfile } from '../model/user-profile';
import { EoiStudentService } from '../services/eoi-student.service';
import { EoiStudent } from '../model/eoi-student';

@Component({
  selector: 'app-profile-business',
  templateUrl: './profile-business.component.html',
  styleUrls: ['./profile-business.component.scss']
})
export class ProfileBusinessComponent implements OnInit {
  user: UserProfile;
  eois: Observable<EoiBusiness[]>;
  eoiStudents: Observable<EoiStudent[]>;
  isLoading: boolean;
  constructor(
    private eoiBusinessService: EoiBusinessService,
    private eoiStudentService: EoiStudentService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.user = JSON.parse(localStorage.getItem('user'));

    const eoiBusinessUrl = '/users/' + this.user.uid + '/eoiBusiness';
    this.eoiBusinessService.setCollection(eoiBusinessUrl);
    this.eois = this.eoiBusinessService.list();
    this.eois.subscribe(e => {
      this.isLoading = false;
    });

    const eoiStudentUrl = '/users/' + this.user.uid + '/submittedEoiStudent';
    this.eoiStudentService.setCollection(eoiStudentUrl);
    this.eoiStudents = this.eoiStudentService.list();
    this.eoiStudents.subscribe(e => {
      this.isLoading = false;
    });

  }

}
