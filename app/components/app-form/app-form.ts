import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { global_tools } from '../../tools';

import { App } from '../../models/app';
import { Enterprise } from '../../models/enterprise';

import { AppsProvider } from '../../providers/apps-provider/apps-provider';
import {JwtToken} from '../../providers/jwt-token/jwt-token';

/*
  Generated class for the AppForm component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'app-form',
  templateUrl: 'build/components/app-form/app-form.html',

  providers: [AppsProvider, JwtToken],
  inputs: ['apps', 'app', 'enterprise', 'mode']
})
export class AppForm {
	mode: string; // create or update
  app: App; // the object representing our App
  enterprise: Enterprise; // the Enterprise that our app belongs to
	apps: App[];
  local_slug: string;
  errors: Object[];

  constructor(private navCtrl: NavController,
  	public appsProv: AppsProvider,
  	public alert: AlertController) {

  	if(this.app == null)
  		this.app = new App();
  }

  onSubmit(){
  	if(this.mode == "create"){
      this.app.enterprise_id = this.enterprise.id;
  		this.appsProv.create(this.app).then(response => {
  			this.handleResponse(response);
  		});
  	} else if(this.mode == "update"){
  		this.appsProv.update(this.app).then(response => {
  			this.handleResponse(response);
  		});
  	} else {
  		console.error(`Invalid form mode ${this.mode}. Use 'create' or 'update'`)
  	}
  }

  generateSlug(event){
    this.local_slug = global_tools.slugify(this.app.name);
  }

  handleResponse(response){
  	let alert = null;
  	if(!!response["app"]){
			this.app = response["app"];
			if(this.mode == "create")
      	this.apps.push(this.app);
			alert = this.alert.create({
				title: "Success!",
				subTitle: `New app ${this.mode}d!`,
				buttons: ["Ok"]
			});
		} else {
      if(!!response["errors"])
        this.errors = response["errors"];
      
			alert = this.alert.create({
				title: response["statusText"],
				subTitle: `Couldn't ${this.mode} the app at the moment.`,
				buttons: ["Dismiss"]
			});
		}
		alert.present();
  }
}
