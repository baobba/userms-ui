import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { global_tools } from '../../../tools';

import { UsersPage } from '../../users/users';

import { App } from '../../../models/app';

import { AppForm } from '../../../components/app-form/app-form';

/*
  Generated class for the AppDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/apps/details/details.html',

  directives: [AppForm]
})
export class AppDetailsPage {
  app: App;
  apps: App[];

  constructor(private navCtrl: NavController,
    public navParams: NavParams) {

    this.apps = navParams.get('apps');
    this.app = navParams.get('app');
  }

  usersPage(){
    this.navCtrl.push(UsersPage, {
      app: this.app
    });
  }
}
