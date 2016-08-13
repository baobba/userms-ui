import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { global_tools } from '../../../tools';

import { App } from '../../../models/app';

import { AppsPage } from '../../apps/apps';

import { AppsProvider } from '../../../providers/apps-provider/apps-provider';
import {JwtToken} from '../../../providers/jwt-token/jwt-token';

/*
  Generated class for the AppDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/apps/details/details.html',

  providers: [AppsProvider, JwtToken]
})
export class AppDetailsPage {
	app: App;
  local_slug: string;

  constructor(private navCtrl: NavController, navParams: NavParams,
  	public appsProv: AppsProvider,
  	public alert: AlertController) {

    this.app = navParams.get('app');
    this.local_slug = this.app.slug;
  }

  onSubmit(){
  	let alert: any = null;
  	this.appsProv.update(this.app).then(response => {
  		if(!!response["app"]){

  			alert = this.alert.create({
  				title: "Success!",
  				subTitle: "Update successful",
  				buttons: ["Ok"]
  			});

  		} else {
  			alert = this.alert.create({
  				title: response["statusText"],
  				subTitle: "Couldn't update app at the moment.",
  				buttons: ["Dismiss"]
  			});
  		}
  		alert.present();
  	});
  }

  appDetails(){
    this.navCtrl.push(AppsPage, {
      app: this.app
    });
  }

  generateSlug(event){
    this.local_slug = global_tools.slugify(this.app.name);
  }
}
