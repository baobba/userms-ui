import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

//import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
//import {ListPage} from './pages/list/list';

import {HomePage} from './pages/home/home';
import {SignInPage} from './pages/sign-in/sign-in';
import {sidemenu} from './sidemenu';


@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  sidemenu: any;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();
    this.sidemenu = sidemenu;
    // set our app's pages
    sidemenu.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Sign In', component: SignInPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.push(page.component);
  }
}

ionicBootstrap(MyApp);
