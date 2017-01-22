import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { User } from "@ionic/cloud-angular";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { CustomValidators } from "../../services/custom-validators";

@Component({
  selector: 'change-password',
  templateUrl: 'change-password.html',
  styleUrls: ['/src/pages/change-password/change-password.scss']
})
export class ChangePasswordPage {
  changePasswordForm: FormGroup;
  error: string;
  password: AbstractControl;
  confirmPassword: AbstractControl;
  userRef: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public user: User, public fb: FormBuilder, public viewCtrl: ViewController) {
    this.userRef = this.navParams.get("user");
    this.changePasswordForm = fb.group({
      'password': [
        '',
        Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16),
          CustomValidators.passwordValidator, CustomValidators.noEmptyWhiteSpace])
      ],
      'confirmPassword': [
        ''
      ]
    }, {validator: CustomValidators.passwordMatchValidator});

    this.password = this.changePasswordForm.controls['password'];
    this.confirmPassword = this.changePasswordForm.controls['confirmPassword'];

  }

  changePassword(form: any) {
    this.user.details.password = form.password;
    this.user.save();
    this.viewCtrl.dismiss(this.user);
  }

  dismiss() {
    this.viewCtrl.dismiss(this.user);
  }
}
