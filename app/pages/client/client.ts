import { Component } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';

import {EnterprisesPage} from '../enterprises/enterprises';
import {HomePage} from '../home/home';

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
  	sidemenu.pages = [{ title: 'Enterprises', component: EnterprisesPage },
    {title: 'Sign Out', func: () => {
      console.log('AEHOEEEEEEEEEEEEE');
      jwt.removeJwt();
      navCtrl.setRoot(HomePage);
    }}];
  }

}
