import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { UserAuth } from "../../services/user-auth";
import { TabsPage } from "../tabs/tabs";
import { SignupPage } from "../signup/signup";
import { ForgotPasswordPage } from "../forgot-password/forgot-password";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { CustomValidators } from "../../services/custom-validators";

@Component({
  selector: 'login-page',
  templateUrl: 'login.html',
  styleUrls: ['/login.scss']
})
export class LoginPage {
  signupPage: any;
  forgotPasswordPage: any;
  loginForm: FormGroup;
  error: string;
  email: AbstractControl;
  password: AbstractControl;

  constructor(public navCtrl: NavController, public userAuthService: UserAuth,
              public fb: FormBuilder, public alertCtrl: AlertController) {
    this.signupPage = SignupPage;
    this.forgotPasswordPage = ForgotPasswordPage;

    this.loginForm = fb.group({
      'email': [
        '',
        Validators.compose([Validators.required, CustomValidators.emailValidator,
          CustomValidators.noEmptyWhiteSpace])
      ],

      'password': [
        '',
        Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16),
          CustomValidators.passwordValidator, CustomValidators.noEmptyWhiteSpace])
      ]
    });

    this.email = this.loginForm.controls['email'];
    this.password = this.loginForm.controls['password'];
  }

  signin(form: any) {
    this.userAuthService.signin(form).then((data) => {
      if (data.error) {
        this.error = CustomValidators.getErrorMessage(data.error.message, data.error);
        this.showAlert();
      } else {
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Login Failed',
      message: this.error,
      buttons: ['OK']
    });

    alert.present();
  }
}
