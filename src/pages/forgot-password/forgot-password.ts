import { Component } from "@angular/core";
import { AlertController, NavController } from "ionic-angular";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { CustomValidators } from "../../services/custom-validators";
import { UserAuth } from "../../services/user-auth";
import { ConfirmPasswordResetPage } from "../confirm-password-reset/confirm-password-reset";

@Component({
  selector: 'forgot-password-page',
  templateUrl: 'forgot-password.html'
})
export class ForgotPasswordPage {
  forgotPasswordForm: FormGroup;
  email: AbstractControl;
  error: string;

  constructor(public navCtrl: NavController, public userAuthService: UserAuth,
              public fb: FormBuilder, public alertCtrl: AlertController) {
    this.forgotPasswordForm = fb.group({
      'email': [
        '',
        Validators.compose([Validators.required, CustomValidators.emailValidator,
          CustomValidators.noEmptyWhiteSpace])
      ]
    });

    this.email = this.forgotPasswordForm.controls['email'];
  }

  getResetCode(form: any): void {
    this.userAuthService.requestPasswordReset(form.email).then((data) => {
      if (data.error) {
        this.error = CustomValidators.getErrorMessage(data.error.message, data.error);
        this.showAlert();

      } else {
        this.navCtrl.setRoot(ConfirmPasswordResetPage, {'email': form.email});
      }
    });
  }

  showAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Could Not Request Password Reset',
      message: this.error,
      buttons: ['OK']
    });

    alert.present();
  }
}
