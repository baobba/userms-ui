import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { global_tools } from '../../tools';

import { Enterprise } from '../../models/enterprise';

import { EnterprisesProvider } from '../../providers/enterprises-provider/enterprises-provider';
import {JwtToken} from '../../providers/jwt-token/jwt-token';

/*
  Generated class for the EnterpriseForm component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'enterprise-form',
  templateUrl: 'build/components/enterprise-form/enterprise-form.html',

  providers: [EnterprisesProvider, JwtToken],
  inputs: ['enterprises', 'enterprise', 'mode']
})
export class EnterpriseForm {
	mode: string; // create or update
  enterprise: Enterprise;
	enterprises: Enterprise[];
  local_slug: string;
  errors: Object[];

  constructor(private navCtrl: NavController,
  	public enterprisesProv: EnterprisesProvider,
  	public alert: AlertController) {

  	if(this.enterprise == null)
  		this.enterprise = new Enterprise();
  }

  onSubmit(){
  	if(this.mode == "create"){
  		this.enterprisesProv.create(this.enterprise).then(response => {
  			this.handleResponse(response);
  		});
  	} else if(this.mode == "update"){
  		this.enterprisesProv.update(this.enterprise).then(response => {
  			this.handleResponse(response);
  		});
  	} else {
  		console.error(`Invalid form mode ${this.mode}. Use 'create' or 'update'`)
  	}
  }

  generateSlug(event){
    this.local_slug = global_tools.slugify(this.enterprise.name);
  }

  handleResponse(response){
  	let alert = null;
  	if(!!response["enterprise"]){
			this.enterprise = response["enterprise"];
			if(this.mode == "create")
      	this.enterprises.push(this.enterprise);
			alert = this.alert.create({
				title: "Success!",
				subTitle: `New enterprise ${this.mode}d!`,
				buttons: ["Ok"]
			});
		} else {
      if(!!response["errors"])
        this.errors = response["errors"];
      
			alert = this.alert.create({
				title: response["statusText"],
				subTitle: `Couldn't ${this.mode} the enterprise at the moment.`,
				buttons: ["Dismiss"]
			});
		}
		alert.present();
  }
}
