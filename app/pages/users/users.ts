import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';

import { UsersProvider } from '../../providers/users-provider/users-provider';

/*
  Generated class for the UsersPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/users/users.html',

  providers: [UsersProvider]
})
export class UsersPage {
	users: User[];

  constructor(private navCtrl: NavController,
  	public navParams: NavParams,
  	public usersProv: UsersProvider) {
  	usersProv.load(navParams.get('app')).then(users => this.users = users);
  }

}
