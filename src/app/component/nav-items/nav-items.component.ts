import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MyRout } from './my-rout';


@Component({
  selector: 'app-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['./nav-items.component.css']
})
export class NavItemsComponent implements OnInit, AfterViewInit {
  step: number = 0;

  myRout: MyRout = {
    '': 0,
    jobs: 1,
    contractors: 2,
    users: 3,
    register: 4,
    login: 5,
    help: 6,
    settings: 7,
    profile: 9,
    dashboard: 10,
    my_jobs: 11,
    messages: 12,
    notifications:13
  };

  constructor(public authService: AuthService, private router: Router) {}

  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.step = this.myRout[event.url.split('/')[1] as keyof MyRout];
      }
    });
  }

  ngOnInit(): void {}


  logout() {
    this.authService.logout();
  }

  nav(i: number) {
    this.step = i;
    console.log(this.step);
  }
}
