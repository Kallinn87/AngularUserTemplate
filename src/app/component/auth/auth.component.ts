import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/compat/app';
import { MyMessage } from 'src/app/classes/my-message';
// firebase was moved from auth service to login to reduce first load.
// and script used at first load.

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent extends MyMessage implements OnInit {
  authType: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  hide:boolean = true;

  constructor(private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    if(this.auth.globalData.login.value) {
      this.router.navigate(['/']);
    }
    
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
     if (this.authType === 'register') {
      }
    });
  }

  onSubmit() {
    if(this.authType === 'register') {
      this.registerUser();
    } else {
      this.loginWithEmail();
    }
  }

  loginWithGoogle() {
    this.loginGoogle()
      .then((result) => {
        this.showMessage('success', 'Successfully signed in!', 4000);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      })
      .catch((err) => {
        this.showMessage('danger', err.message, 4000);
      });
  }

  loginWithEmail() {
    this.auth
      .login(this.email, this.password)
      .then((res) => {
        this.showMessage('success', 'Successfully signed in!', 4000);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      })
      .catch((err) => {
        this.showMessage('danger', err.message, 4000);
      });
  }

  registerUser() {
    if(this.username.length > 3) {
      this.auth.register(this.email, this.password, this.username)
      .then(res => {
        // This is user I know it. But Angular is being difficult 
        // so I have to first cat to any and then get the id
        // Update user display name because we regesterd witout any user info
        setTimeout(() => {
          // We have to wait 5 sek or else firbase functions will overright this function
          this.auth.fs.updateUser((res as any).uid, {
            displayName: this.username,
          });
        }, 5000);
        // Lets next send the user some where 
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
        this.showMessage("success", "Registration Successful! Please Verify Your Email", 4000);
      }, err => {
        this.showMessage("danger", err.message, 4000);
      });
    } else {
      this.showMessage("danger", "Name needs to be at least 4 characters", 4000);
    }
  }

  // Send link on given email to reset password
  forgotPassword() {
    this.auth.sendPasswordResetEmail(this.email).then(
      (res) => {
        this.showMessage('success', 'Please Check Your Email', 4000);
      },
      (err) => {
        this.showMessage('danger', err.message, 4000);
      }
    );
  }
  
  loginGoogle() {
    return this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  loginWithPhone() {
    this.auth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }
}
