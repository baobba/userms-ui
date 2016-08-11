import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EnterpriseDetailsPage } from '../enterprise-details/enterprise-details';

import { EnterprisesProvider } from '../../providers/enterprises-provider/enterprises-provider';
import {JwtToken} from '../../providers/jwt-token/jwt-token';

import { Enterprise } from '../../models/enterprise';

/*
  Generated class for the EnterprisesPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/enterprises/enterprises.html',

  providers: [EnterprisesProvider, JwtToken]
})
export class EnterprisesPage {
	enterprises: Enterprise[];

  constructor(private navCtrl: NavController, enterprisesProv: EnterprisesProvider) {
  	enterprisesProv.load().then(enterprises => this.enterprises = enterprises);
  }

  goToDetails(enterprise){
  	this.navCtrl.push(EnterpriseDetailsPage, {
  		enterprise: enterprise
  	});
  }
}
