import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { global_tools } from '../../../tools';

import { Enterprise } from '../../../models/enterprise';

import { AppsPage } from '../../apps/apps';

import { EnterprisesProvider } from '../../../providers/enterprises-provider/enterprises-provider';
import {JwtToken} from '../../../providers/jwt-token/jwt-token';

/*
  Generated class for the EnterpriseDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/enterprises/details/details.html',

  providers: [EnterprisesProvider, JwtToken]
})
export class EnterpriseDetailsPage {
	enterprise: Enterprise;
  local_slug: string;

  constructor(private navCtrl: NavController, navParams: NavParams,
  	public enterprisesProv: EnterprisesProvider,
  	public alert: AlertController) {

    this.enterprise = navParams.get('enterprise');
    this.local_slug = this.enterprise.slug;
  }

  onSubmit(){
  	let alert: any = null;
  	this.enterprisesProv.update(this.enterprise).then(response => {
  		if(!!response["enterprise"]){

  			alert = this.alert.create({
  				title: "Success!",
  				subTitle: "Update successful",
  				buttons: ["Ok"]
  			});

  		} else {
  			alert = this.alert.create({
  				title: response["statusText"],
  				subTitle: "Couldn't update enterprise at the moment.",
  				buttons: ["Dismiss"]
  			});
  		}
  		alert.present();
  	});
  }

  appDetails(){
    this.navCtrl.push(AppsPage, {
      enterprise: this.enterprise
    });
  }

  generateSlug(event){
    this.local_slug = global_tools.slugify(this.enterprise.name);
  }
}
