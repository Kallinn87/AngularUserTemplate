import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FirestoreService } from './firestore/firestore.service';
import { RestApiService } from './rest-api.service';
import { GlobalDataService } from './global-data.service';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn = new BehaviorSubject(false);

  constructor(public auth: AngularFireAuth, public fs: FirestoreService, public restApi: RestApiService, public globalData: GlobalDataService) {
    auth.onAuthStateChanged((user) => {
      console.log("Auth state changed")
      if (user) {
        // Just connected. Set user
        this.setLogin(user);
        // Get all data that user has
        this.fs.loggedIn(user.uid).then(
          (suc) => { this.loggedIn.next(true) },
          (err) => { this.loggedIn.next(true) }
        );

        this.fs.isAdmin(user.uid).subscribe((data) => {
          // Here we can see if the user is admin
          this.globalData.admin = data !== null && data !== undefined;
        });

      } else {
        // Logout if loged in
        this.globalData.admin = false;
        this.fs.logout();
        this.logout();
        this.loggedIn.next(false);
      }
    });
  }


  setLogin(auth: any) {
    if (auth) {
      // We are logged in
      this.globalData.login.next(true);
      setTimeout(() => {
        // We wait until everhting has been setup
        this.fs.getUserInfo(auth.uid).subscribe((data: User | undefined) => {
          console.log(data)
          if (data !== undefined) {
            this.globalData.user = data
          }
        });
      }, 1500);
    }
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password).then(
        (userData) => {
          resolve(userData);
        },
        (err) => reject(err)
      );
    });
  }

  register(email: string, password: string, username: string) {
    return new Promise((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password).then(
        (userData) => {
          /*if (userData !== null) {
            setTimeout(() => {
              // We wait until everhting has been setup
              this.fs.updateUser(userData.user!.uid, {
                displayName: username,
              });
            }, 2000);
          }*/
          resolve(userData.user);
        },
        (err) => reject(err)
      );
    });
  }

  getAuth() {
    return this.auth.authState.pipe(map((auth) => auth));
  }

  logout() {
    this.auth.signOut();
    this.globalData.clearUser();
    this.globalData.login.next(false);
  }

  sendPasswordResetEmail(passwordResetEmail: string) {
    return this.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  sendVerificationMail() {
    return this.auth.currentUser.then((u) => u?.sendEmailVerification());
  }

  isUserVerified() {
    return this.auth.currentUser;
  }
}