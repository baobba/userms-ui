import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AppDetailsPage } from './details/details';
import { AppCreationPage } from './create/create';

import { AppsProvider } from '../../providers/apps-provider/apps-provider';
import { JwtToken } from '../../providers/jwt-token/jwt-token';

import { App } from '../../models/app';

/*
  Generated class for the AppsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/apps/apps.html',

  providers: [AppsProvider, JwtToken]
})
export class AppsPage {
	apps: App[];

  constructor(private navCtrl: NavController, appsProv: AppsProvider,
  	public navParams: NavParams) {
  	appsProv.load(navParams.get('enterprise')).then(apps => this.apps = apps);
  }

  goToDetails(app){
  	this.navCtrl.push(AppDetailsPage, {
  		app: app
  	});
  }

  addApp(){
  	this.navCtrl.push(AppCreationPage, {
  		apps: this.apps,
  		enterprise: this.navParams.get('enterprise')
  	});
  }

}