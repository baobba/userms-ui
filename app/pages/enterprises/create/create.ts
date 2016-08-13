import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { global_tools } from '../../../tools';

import { Enterprise } from '../../../models/enterprise';

import { EnterprisesProvider } from '../../../providers/enterprises-provider/enterprises-provider';
import {JwtToken} from '../../../providers/jwt-token/jwt-token';

/*
  Generated class for the EnterpriseDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/enterprises/create/create.html',

  providers: [EnterprisesProvider, JwtToken]
})
export class EnterpriseCreationPage {
  enterprise: Enterprise;
	enterprises: Enterprise[];
  local_slug: string;
  errors: Object[];

  constructor(private navCtrl: NavController,
  	public enterprisesProv: EnterprisesProvider,
    public navParams: NavParams,
  	public alert: AlertController) {

  	this.enterprise = new Enterprise();
    this.enterprises = navParams.get('enterprises');
  }

  onSubmit(){
  	let alert: any = null;
  	this.enterprisesProv.create(this.enterprise).then(response => {
  		if(!!response["enterprise"]){
  			this.enterprise = response["enterprise"];
        this.enterprises.push(this.enterprise);
  			alert = this.alert.create({
  				title: "Success!",
  				subTitle: "New enterprise created!",
  				buttons: ["Ok"]
  			});
  		} else {
        if(!!response["errors"])
          this.errors = response["errors"];
        
  			alert = this.alert.create({
  				title: response["statusText"],
  				subTitle: "Couldn't create an enterprise at the moment.",
  				buttons: ["Dismiss"]
  			});
  		}
  		alert.present();
  	});
  }

  generateSlug(event){
    this.local_slug = global_tools.slugify(this.enterprise.name);
  }
}
