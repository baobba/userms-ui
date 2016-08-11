import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Enterprise } from '../../models/enterprise';

/*
  Generated class for the EnterpriseDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/enterprise-details/enterprise-details.html',
})
export class EnterpriseDetailsPage {
	enterprise: Enterprise;

  constructor(private navCtrl: NavController, navParams: NavParams) {
  	this.enterprise = navParams.get('enterprise');
  }

  onSubmit(){
  	console.log("WORKING - submit form");
  }
}
