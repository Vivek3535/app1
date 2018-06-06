import { AuthService } from './../../providers/authservice/authservice';
import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { firstname: '', lastname: '', email: '', password: '',confirmpass: '',};
constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) { } 
 public backtomain()
      {
          this.nav.push('HomescreenPage');
      }
  public register() {
     this.auth.register(this.registerCredentials).subscribe(success => {
     
      if (success) {
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
        //this.nav.push('HomescreenPage');
       
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
     
  }
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
              this.nav.push('HomescreenPage');
            }
          }
        }
      ]
    });
    alert.present(); 
  }
}