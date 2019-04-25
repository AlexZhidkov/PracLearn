import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, Subscription, Subject } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserProfile } from '../model/user-profile';
import { EoiStudentService } from './eoi-student.service';
import { EoiBusinessService } from './eoi-business.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  auth: Subscription;
  private userDoc: AngularFirestoreDocument<UserProfile>;
  user: Observable<UserProfile>;
  isStudentRole: boolean;
  isBusinessRole: boolean;
  isUniversityRole: boolean;
  isAdminRole: boolean;
  isLoggedIn: boolean;
  initialDetails = new Subject<{ isLogin: boolean, photoURL: string }>();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
    public eoiStudentService: EoiStudentService,
    public eoiBusinessService: EoiBusinessService) {

    this.auth = afAuth.authState.subscribe(authUser => {
      if (authUser) {
        localStorage.setItem('user', JSON.stringify(authUser));
        this.userDoc = this.afs.doc<UserProfile>('users/' + authUser.uid);
        this.userDoc.set({
          displayName: authUser.displayName,
          email: authUser.email,
          photoURL: authUser.photoURL,
          primaryRole: localStorage.getItem('userPrimaryRole'),
          university: localStorage.getItem('university'),
          faculty: localStorage.getItem('faculty')
        }, { merge: true });
        this.isLoggedIn = true;
        this.emitInitialDetails(this.isLoggedIn, authUser.photoURL);
      } else {
        localStorage.setItem('user', null);
        this.isLoggedIn = false;
        this.emitInitialDetails(this.isLoggedIn, null);
      }
    });
  }

  canActivate(): boolean {
    if (localStorage.getItem('user') === 'null' || !this.isAuthenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  get isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  get currentUser(): any {
    return this.isAuthenticated ? this.afAuth.authState : null;
  }

  loginWithFacebook() {
    return new Promise<any>((resolve, reject) => {
      const provider = new auth.FacebookAuthProvider();
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  loginWithGoogle() {
    return new Promise<any>((resolve, reject) => {
      const provider = new auth.GoogleAuthProvider();
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.eoiStudentService.setEoiStudentPath(null);
    this.eoiBusinessService.setEoiBusinessPath(null);
    this.isStudent = false;
    this.isBusiness = false;
    this.isUniversity = false;
    this.isAdmin = false;
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  set isStudent(value: boolean) {
    this.isStudentRole = value;
  }
  get isStudent(): boolean {
    return this.isStudentRole;
  }

  set isBusiness(value: boolean) {
    this.isBusinessRole = value;
  }
  get isBusiness(): boolean {
    return this.isBusinessRole;
  }

  set isUniversity(value: boolean) {
    this.isUniversityRole = value;
  }
  get isUniversity(): boolean {
    return this.isUniversityRole;
  }

  set isAdmin(value: boolean) {
    this.isAdminRole = value;
  }
  get isAdmin(): boolean {
    return this.isAdminRole;
  }

  emitInitialDetails(isLogin: boolean, photoURL: string) {
    this.initialDetails.next({ isLogin, photoURL });
  }
}
