import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';
import { LoginPage } from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private navCtrl: NavController, private alertCtrl: AlertController,
              private auth: Auth, private user: User) {

  }

  getRootNav(nav: NavController): NavController {
    let root = nav;
    while (root.parent != null) {
      root = root.parent;
    }
    return root;
  }

  signout(): void {
    this.auth.logout();
    let rootNav = this.getRootNav(this.navCtrl);
    rootNav.setRoot(LoginPage);
  }

  deleteAccount(): void {
    this.user.delete(); // Delete user from API
    this.user.unstore(); // Delete user from local storage
    this.auth.logout();
    let rootNav = this.getRootNav(this.navCtrl);
    rootNav.setRoot(LoginPage);
  }

  confirmDeleteAccount(): void {
    let alert = this.alertCtrl.create({
      title: 'Are You Sure?',
      message: 'This will irreversibly delete your account.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteAccount();
          }
        }
      ]
    });
    alert.present();
  }
}
