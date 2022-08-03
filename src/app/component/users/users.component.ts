import { Component, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { MyMessage } from 'src/app/classes/my-message';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends MyMessage implements OnInit {
  destroyed: ReplaySubject<boolean> = new ReplaySubject(1);
  users:any[] = [];

  constructor(public fs: FirestoreService) {
    super();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

}
