import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { MyApp } from "./app.component";
import { Storage } from "@ionic/storage";
import { TabsPage } from "../pages/tabs/tabs";
import { HomePage } from "../pages/home/home";
import { AboutPage } from "../pages/about/about";
import { ContactPage } from "../pages/contact/contact";
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { ForgotPasswordPage } from "../pages/forgot-password/forgot-password";
import { ConfirmPasswordResetPage } from "../pages/confirm-password-reset/confirm-password-reset";
import { SettingsPage } from "../pages/settings/settings";
import { EditUserDetailsPage } from "../pages/edit-user-details/edit-user-details";
import { ChangePasswordPage } from "../pages/change-password/change-password";
import { CloudSettings, CloudModule } from "@ionic/cloud-angular";
import { UserAuth } from "../services/user-auth";
import { ErrorMessages } from "../services/error-messages";
import { CustomValidators } from "../services/custom-validators";
import { MomentModule } from "angular2-moment";

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'YOUR_IONIC_APP_ID'
  }
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ForgotPasswordPage,
    ConfirmPasswordResetPage,
    SettingsPage,
    EditUserDetailsPage,
    ChangePasswordPage,
    ErrorMessages
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    ForgotPasswordPage,
    ConfirmPasswordResetPage,
    SettingsPage,
    EditUserDetailsPage,
    ChangePasswordPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    UserAuth,
    CustomValidators
  ]
})
export class AppModule {
}
