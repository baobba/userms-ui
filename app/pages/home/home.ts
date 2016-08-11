import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignInPage } from '../sign-in/sign-in';
import { RegistrationPage } from '../registration/registration';
import { ClientPage } from '../client/client';

import {JwtToken} from '../../providers/jwt-token/jwt-token';

/*
  Generated class for the HomePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [JwtToken]
})
export class HomePage {

  constructor(public navCtrl: NavController, jwt: JwtToken) {
    jwt.getJwt().then(jwt_obj => {
      if(!!jwt_obj)
        navCtrl.setRoot(ClientPage);
    })
      
  }

  goToSignIn(event){
  	this.navCtrl.push(SignInPage);
  }
  goToRegistration(event){
  	this.navCtrl.push(RegistrationPage);
  }

}
