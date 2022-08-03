import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MyMessage } from 'src/app/classes/my-message';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { GlobalDataService } from 'src/app/services/global-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends MyMessage implements OnInit {

  showImage: boolean = true;

  selectedFile: File | undefined;
  downloadURL: Observable<string> | undefined;

  file: File | undefined; // Variable to store file
  url: any; //Angular 11, for stricter type
  msg = "";
  img_path:string = "";

  businessCard:boolean = true;
  contracterProfile:boolean = false;
  payment:boolean = false;

  constructor(public globalData: GlobalDataService, 
    public fs: FirestoreService,
    public dialog: MatDialog,
    public auth:AuthService) {
    super();
    auth.isUserVerified().then((u) => globalData.user.emailVerified = u!.emailVerified)
    globalData.user.contractor = true;
  }

  ngOnInit(): void {
    console.log(this.globalData.user)
    
  }

  public registerAsContractor() {

  }

  public view(i:number) {
    console.log(i)
    this.businessCard = (i == 0);
    this.contracterProfile = (i == 1);
    this.payment = (i == 2);

    console.log(this.businessCard)
  }

  selectFile(event: any) { //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }
    this.file = event.target.files[0];
    
    if (this.file === undefined) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = this.file.type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.file);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
      console.log("URL : " + reader)
    }
  }

  // OnClick of button Upload
  onUpload() {
    console.log(this.file);
  }

  verify() {
    this.auth.sendVerificationMail();
    this.dialog.open(DialogVerify);
  }

  async onSubmit() {

    if(this.file !== undefined) {
      this.globalData.user.photoURL = await this.fs.uploadFile(this.globalData.user.uid, this.file);
    }
    this.onUpload();
    this.fs.updateUserData(this.globalData.user.uid, { user: this.globalData.user }).then(
      (res) => {
        // Send Varification link in email
        this.showMessage(
          'success',
          'Profile has been successfully updated.',
          4000
        );
      },
      (err) => {
        this.showMessage(
          'danger',
          'Faild to update profile.',
          4000
        );
      }
    );
  }
}

@Component({
  selector: 'dialog-verify.html',
  templateUrl: 'dialog-verify.html',
  styleUrls: ['./profile.component.css'],
})
export class DialogVerify {
}

