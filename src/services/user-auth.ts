import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Auth, UserDetails, IDetailedError } from "@ionic/cloud-angular";
import "rxjs/add/operator/map";

@Injectable()
export class UserAuth {
  constructor(public http: Http, public auth: Auth) {
  }

  signin(form: any): any {
    let details: UserDetails = {'email': form.email, 'password': form.password};
    return this.auth.login('basic', details).then(() => {
      return {error: null};
    }, (err) => {
      return {error: err};
    });
  }

  signup(form: any): any {
    let details: UserDetails = form;
    return this.auth.signup(details).then(() => {
      return {error: null};
    }, (err: IDetailedError<string[]>) => {
      return {error: err};
    });
  }

  requestPasswordReset(email: string): any {
    return this.auth.requestPasswordReset(email).then(() => {
      return {error: null};
    }, (err) => {
      return {error: err};
    });
  }

  confirmPasswordReset(form: any): any {
    return this.auth.confirmPasswordReset(form.resetCode, form.password).then(() => {
      return {error: null};
    }, (err) => {
      return {error: err, message: 'The reset code has either been entered incorrectly or it has expired.'};
    });
  }

}
