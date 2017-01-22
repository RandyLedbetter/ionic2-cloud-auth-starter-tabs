import { Component } from "@angular/core";
import { AlertController, NavController, NavParams } from "ionic-angular";
import { LoginPage } from "../login/login";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { CustomValidators } from "../../services/custom-validators";
import { UserAuth } from "../../services/user-auth";

@Component({
  selector: 'confirm-password-reset-page',
  templateUrl: 'confirm-password-reset.html',
  styleUrls: ['/confirm-password-reset.scss']
})
export class ConfirmPasswordResetPage {
  confirmPasswordResetForm: FormGroup;
  error: string;
  loginPage: any;
  email: string;
  resetCode: AbstractControl;
  password: AbstractControl;

  constructor(public navCtrl: NavController, public userAuthService: UserAuth, public fb: FormBuilder,
              public alertCtrl: AlertController, public params: NavParams) {
    this.loginPage = LoginPage;
    this.email = this.params.get('email');

    this.confirmPasswordResetForm = fb.group({
      'resetCode': [
        '',
        Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6),
          CustomValidators.noEmptyWhiteSpace])
      ],
      'password': [
        '',
        Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16),
          CustomValidators.passwordValidator, CustomValidators.noEmptyWhiteSpace])
      ]
    });

    this.resetCode = this.confirmPasswordResetForm.controls['resetCode'];
    this.password = this.confirmPasswordResetForm.controls['password'];
  }

  confirmResetCode(form: any): void {
    this.userAuthService.confirmPasswordReset(form).then((data) => {
      if (data.error) {
        this.error = data.message;
        this.showAlert();
      } else {
        this.navCtrl.setRoot(LoginPage);
      }
    });
  }

  showAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Could Not Change Password',
      message: this.error,
      buttons: ['OK']
    });

    alert.present();
  }

  gotoLoginPage(): void {
    this.navCtrl.setRoot(LoginPage);
  }


}
