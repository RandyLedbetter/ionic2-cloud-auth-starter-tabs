import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar, Splashscreen } from "ionic-native";
import { Auth } from "@ionic/cloud-angular";
import { LoginPage } from "../pages/login/login";
import { TabsPage } from "../pages/tabs/tabs";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(public auth: Auth, public platform: Platform) {
    if (!this.auth.isAuthenticated()) {
      this.rootPage = LoginPage;
    } else {
      this.rootPage = TabsPage;
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
