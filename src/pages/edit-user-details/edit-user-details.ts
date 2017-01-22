import { Component } from "@angular/core";
import { NavController, NavParams, ViewController } from "ionic-angular";
import { User } from "@ionic/cloud-angular";
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { CustomValidators } from "../../services/custom-validators";
import { Md5 } from "ts-md5/dist/md5";

@Component({
  selector: 'edit-user-details-form',
  templateUrl: 'edit-user-details.html',
  styleUrls: ['/src/pages/edit-user-details/edit-user-details.scss']
})
export class EditUserDetailsPage {
  userDetailsForm: FormGroup;
  error: string;
  firstName: AbstractControl;
  lastName: AbstractControl;
  email: AbstractControl;
  username: AbstractControl;
  birthdate: AbstractControl;
  userRef: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public user: User, public fb: FormBuilder, public viewCtrl: ViewController) {
    this.userRef = this.navParams.get("user");
    this.userDetailsForm = fb.group({
      'firstName': [
        this.userRef.get('firstName'),
        Validators.compose([Validators.required, Validators.maxLength(20),
          CustomValidators.noEmptyWhiteSpace])
      ],

      'lastName': [
        this.userRef.get('lastName'),
        Validators.compose([Validators.required, Validators.maxLength(20),
          CustomValidators.noEmptyWhiteSpace])
      ],

      'email': [
        this.userRef.details.email,
        Validators.compose([Validators.required, CustomValidators.emailValidator,
          CustomValidators.noEmptyWhiteSpace])
      ],

      'username': [
        this.userRef.details.username,
        Validators.compose([Validators.required, Validators.maxLength(20),
          CustomValidators.usernameValidator, CustomValidators.noEmptyWhiteSpace])
      ],

      'birthdate': [this.userRef.get('birthdate') || 'Not Set']
    });

    this.firstName = this.userDetailsForm.controls['firstName'];
    this.lastName = this.userDetailsForm.controls['lastName'];
    this.email = this.userDetailsForm.controls['email'];
    this.username = this.userDetailsForm.controls['username'];
    this.birthdate = this.userDetailsForm.controls['birthdate'];
  }

  updateUserDetails(form: any) {
    this.user.set('firstName', form.firstName.trim());
    this.user.set('lastName', form.lastName.trim());
    this.user.set('birthdate', form.birthdate);
    this.user.details.name = `${ form.firstName.trim() } ${ form.lastName.trim() }`;
    this.user.details.email = form.email.trim();
    this.user.details.image = 'https://www.gravatar.com/avatar/' + Md5.hashStr(form.email.trim()),
      this.user.details.username = form.username.trim();

    this.user.save();
    this.viewCtrl.dismiss(this.user);
  }

  dismiss() {
    this.viewCtrl.dismiss(this.user);
  }
}
