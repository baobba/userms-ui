import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { global_tools } from '../../../tools';

import { Enterprise } from '../../../models/enterprise';

import { EnterpriseForm } from '../../../components/enterprise-form/enterprise-form';

import { AppsPage } from '../../../pages/apps/apps';

/*
  Generated class for the EnterpriseDetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/enterprises/details/details.html',

  directives: [EnterpriseForm]
})
export class EnterpriseDetailsPage {
  enterprise: Enterprise;
  enterprises: Enterprise[];

  constructor(private navCtrl: NavController,
    public navParams: NavParams) {

    this.enterprises = navParams.get('enterprises');
    this.enterprise = navParams.get('enterprise');
  }

  appsPage(){
    this.navCtrl.push(AppsPage, {
      enterprise: this.enterprise
    });
  }
}
