
import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/authservice/authservice';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }
  public createAccount() {
    this.nav.push('RegisterPage');
  }
  gotologin()
  {
     this.nav.push('HomescreenPage');
  }  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {        
        this.nav.setRoot('HomePage');
      } else {
        this.showError("Incorrect!!!");
      }
    },
      error => {
        this.showError(error);
      });
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  showError(text) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Username and Password',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}