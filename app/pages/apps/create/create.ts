import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { global_tools } from '../../../tools';

import { App } from '../../../models/app';

import { AppsProvider } from '../../../providers/apps-provider/apps-provider';
import {JwtToken} from '../../../providers/jwt-token/jwt-token';

//import { ErrorHandler } from '../../../components/error-handler/error-handler';

/*
  Generated class for the AppDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/apps/create/create.html',

  providers: [AppsProvider, JwtToken],
  //directives: [ErrorHandler]
})
export class AppCreationPage {
  app: App;
	apps: App[];
  local_slug: string;
  errors: Object[];

  constructor(private navCtrl: NavController,
  	public appsProv: AppsProvider,
    public navParams: NavParams,
  	public alert: AlertController) {

  	this.app = new App();
    this.app["enterprise_id"] = navParams.get('enterprise')["id"]["$oid"];
    this.apps = navParams.get('apps');
  }

  onSubmit(){
  	let alert: any = null;
  	this.appsProv.create(this.app).then(response => {
      console.log(response);
  		if(!!response["app"]){
  			this.app = response["app"];
        this.apps.push(this.app);
  			alert = this.alert.create({
  				title: "Success!",
  				subTitle: "New app created!",
  				buttons: ["Ok"]
  			});
  		} else {
        if(!!response["errors"])
          this.errors = response["errors"];
        console.log(this.errors);
  			alert = this.alert.create({
  				title: response["statusText"],
  				subTitle: "Couldn't create an app at the moment.",
  				buttons: ["Dismiss"]
  			});
  		}
  		alert.present();
  	});
  }
  
  generateSlug(event){
    this.local_slug = global_tools.slugify(this.app.name);
  }
}
