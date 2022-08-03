import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  public login = new BehaviorSubject(false);

  admin: boolean = false;
  user: User = {
    uid: '',
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
    providerId: '',
    company: '',
    job_title: '',
    city: '',
    address: '',
    country: '',
    about: '',
    department: '',
    emailVerified: false,
    contractor: false
  };

  isLogin(): BehaviorSubject<boolean> {
    return this.login;
  }

  clearUser() {
    this.user = {
      uid: '',
      displayName: '',
      email: '',
      phoneNumber: '',
      photoURL: '',
      providerId: '',
      company: '',
      job_title: '',
      city: '',
      address: '',
      country: '',
      about: '',
      department: '',
      emailVerified: false,
      contractor: false
    };
  }

  constructor() { }
}
