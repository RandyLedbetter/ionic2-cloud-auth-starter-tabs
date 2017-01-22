import { Component, ViewChild } from "@angular/core";
import { NavController, ModalController, AlertController } from "ionic-angular";
import { Auth, User } from "@ionic/cloud-angular";
import { LoginPage } from "../login/login";
import { EditUserDetailsPage } from "../edit-user-details/edit-user-details";
import { ChangePasswordPage } from "../change-password/change-password";
import * as moment from "moment";

@Component({
  selector: 'settings-page',
  templateUrl: 'settings.html',
  styleUrls: ['/settings.scss']
})
export class SettingsPage {
  selected: any = moment();
  date: any = moment().toISOString();
  birthdate: string;

  @ViewChild('datePicker') datePicker;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
              public modalCtrl: ModalController, public auth: Auth, public user: User) {
    this.birthdate = this.user.get('birthdate', '');

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

  editUserDetails(): void {
    let editUserDetailsModal = this.modalCtrl.create(EditUserDetailsPage, {user: this.user});
    editUserDetailsModal.onDidDismiss(data => {
      this.user = data;
      this.user.save();
      this.birthdate = this.user.get('birthdate', '');
    });
    editUserDetailsModal.present(editUserDetailsModal);
  }

  changePassword(): void {
    let changePasswordModal = this.modalCtrl.create(ChangePasswordPage, {user: this.user});
    changePasswordModal.onDidDismiss(data => {
      this.user = data;
      this.user.save();
      this.birthdate = this.user.get('birthdate', '');
    });
    changePasswordModal.present(changePasswordModal);
  }

  dateChanged(date): void {
    const {day, month, year} = date;
    this.selected.month(month.text).date(day.value).year(year.value);
    this.user.set('birthdate', this.selected);
    this.birthdate = this.selected;
    this.user.save();
  };

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
