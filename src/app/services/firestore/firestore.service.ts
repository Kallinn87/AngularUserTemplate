import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, ReplaySubject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  destroyed: ReplaySubject<boolean> = new ReplaySubject(1);

  clientDoc!: AngularFirestoreDocument;

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  loggedIn(uid: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.destroyed = new ReplaySubject(1);
      resolve();
    });
  }

  isAdmin(id: string) {
    // Here we have to find out if the user is admin
    this.clientDoc = this.afs.doc(`admins/${id}`);
    return this.clientDoc
      .snapshotChanges()
      .pipe(takeUntil(this.destroyed))
      .pipe(
        map((action) => {
          return action.payload.data();
        })
      );
  }

  updateUser(uid: string, user: any): Promise<void> {
    return this.afs.collection('users').doc(uid).set(user, { merge: true });
  }

  updateUserData(uid: string, user: any): Promise<void> {
    return this.afs.collection('users').doc(uid).set(JSON.parse(JSON.stringify(user.user)), { merge: true });
  }

  getUsers() {
    return this.afs
      .collection('users')
      .snapshotChanges()
      .pipe(takeUntil(this.destroyed))
      .pipe(
        map((changes: any[]) => {
          return changes.map((action) => {
            return {
              data: action.payload.doc.data(),
              id: action.payload.doc.id,
            };
          });
        })
      );
  }

  getUserInfo(user_id: string): Observable<any> {
    return this.afs
      .collection('users')
      .doc(user_id)
      .snapshotChanges()
      .pipe(takeUntil(this.destroyed))
      .pipe(
        map((action) => {
          return action.payload.data();
        })
      );
  }

  logout() {
    this.destroyed.next(true);
    this.destroyed.complete();
  }

  getNode(node: string, key: string, val: string): any {
    const ref = this.afs.collection('/' + node, (ref) =>
      ref.where(key, '==', val)
    );
    return ref
      .snapshotChanges()
      .pipe(
        map((changes: any[]) => {
          return changes.map((action) => {
            return {
              data: action.payload.doc.data(),
              id: action.payload.doc.id,
            };
          });
        })
      );
  }

  addNode(node: string, obj: any) {
    let ref = this.afs.collection(node);
    return ref.add(obj);
  }

  deleteNode(node: string, doc: string) {
    let ref = this.afs.collection(node).doc(doc);
    return ref.delete();
  }

  updateNode(node: string, doc: string, obj: any) {
    let ref = this.afs.collection(node).doc(doc);
    return ref.update(obj);
  }

  async uploadFile(id: string, file: File): Promise<any> {
    try {
      await this.storage.ref('users/' + id).child(file.name).put(file);
      return this.storage.ref(`users/${id}/${file.name}`).getDownloadURL().toPromise();
    } catch (error) {
      console.log(error);
    }
  }
}