import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { global_tools } from '../../../tools';

import { App } from '../../../models/app';
import { Enterprise } from '../../../models/enterprise';

import { AppForm } from '../../../components/app-form/app-form';

/*
  Generated class for the AppDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/apps/create/create.html',

  directives: [AppForm]
})
export class AppCreationPage {
  apps: App[];
  enterprise: Enterprise; // as App belongs to Enterprise

  constructor(private navCtrl: NavController,
    public navParams: NavParams) {

    this.apps = navParams.get('apps');
    this.enterprise = navParams.get('enterprise');
  }
}
