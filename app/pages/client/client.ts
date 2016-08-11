import { Component } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';

import {EnterprisesPage} from '../enterprises/enterprises';

import {sidemenu} from '../../sidemenu';

import {JwtToken} from '../../providers/jwt-token/jwt-token';

/*
  Generated class for the ClientPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/client/client.html',
  providers: [JwtToken]
})
export class ClientPage {
	sidemenu: any;

  constructor(public navCtrl: NavController,
    public menu: MenuController,
    public jwt: JwtToken) {
  	this.sidemenu = sidemenu;
  	sidemenu.pages = [{ title: 'Enterprises', component: EnterprisesPage }];
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.navCtrl.push(page.component);
  }

}
