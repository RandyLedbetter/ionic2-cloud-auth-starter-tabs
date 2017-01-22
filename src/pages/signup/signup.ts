import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { UserAuth } from "../../services/user-auth";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { CustomValidators } from "../../services/custom-validators";
import { Md5 } from "ts-md5/dist/md5";
import { TabsPage } from "../tabs/tabs";


@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html',
  styleUrls: ['/signup.scss']
})
export class SignupPage {
  signupForm: FormGroup;
  error: string;
  firstName: AbstractControl;
  lastName: AbstractControl;
  username: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController,
              private userAuthService: UserAuth, private fb: FormBuilder) {
    this.signupForm = fb.group({
      'firstName': [
        '',
        Validators.compose([Validators.required, Validators.maxLength(20),
          CustomValidators.noEmptyWhiteSpace])
      ],

      'lastName': [
        '',
        Validators.compose([Validators.required, Validators.maxLength(20),
          CustomValidators.noEmptyWhiteSpace])
      ],

      'username': [
        '',
        Validators.compose([Validators.required, Validators.maxLength(20),
          CustomValidators.usernameValidator, CustomValidators.noEmptyWhiteSpace])
      ],

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

    this.firstName = this.signupForm.controls['firstName'];
    this.lastName = this.signupForm.controls['lastName'];
    this.username = this.signupForm.controls['username'];
    this.email = this.signupForm.controls['email'];
    this.password = this.signupForm.controls['password'];
  }

  signup(form: any) {
    let details: any = {
      'name': `${ form.firstName.trim() } ${ form.lastName.trim() }`,
      'username': form.username.trim(),
      'email': form.email.trim(),
      'password': form.password.trim(),
      'image': 'https://www.gravatar.com/avatar/' + Md5.hashStr(form.email.trim()),
      'custom': {
        'firstName': form.firstName,
        'lastName': form.lastName
      }
    };
    this.userAuthService.signup(details).then((data) => {
      if (data.error) {
        for (let e of data.error.details) {
          this.error = CustomValidators.getErrorMessage(e, data.error);
          this.showAlert();
        }
      } else {
        this.signin(details);
      }
    });
  }

  signin(details: any) {
    this.userAuthService.signin(details).then((data) => {
      if (data.error) {
        this.error = CustomValidators.getErrorMessage(data.error.message, data.error);
        this.showAlert();
      } else {
        this.navCtrl.setRoot(TabsPage);
      }
    })
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Failed to Register',
      message: this.error,
      buttons: ['OK']
    });

    alert.present();
  }
}
