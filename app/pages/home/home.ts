import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignInPage } from '../sign-in/sign-in';
import { RegistrationPage } from '../registration/registration';
import { ClientPage } from '../client/client';

import {JwtToken} from '../../providers/jwt-token/jwt-token';
import {sidemenu} from '../../sidemenu';
import {Autocrud} from '../../plugins/autocrud2/autocrud';

import { samples } from '../../plugins/autocrud2/.samples/samples';

/*
  Generated class for the HomePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [JwtToken],
  directives: [Autocrud]
})
export class HomePage {
  sidemenu: any;

  sample = samples.sample1;

  attrs = this.sample.attrs;
  data = this.sample.data;
  config = this.sample.config;
  resource = this.sample.resource;
  tpls = this.sample.tpls;

  constructor(public navCtrl: NavController, jwt: JwtToken) {

    this.sidemenu = sidemenu;
    // set our app's pages
    sidemenu.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Sign In', component: SignInPage }
    ];

    // check if the user has a JWT token, so we can skip authentication.
    jwt.getJwt().then(jwt_obj => {
      // user has JWT token. is it valid?
      if(!!jwt_obj){
        // expires_at is seconds since epoch. transform to millis.
        let expires_at = jwt_obj["expires_at"] * 1000;
        let diff = expires_at - (new Date()).getTime();
        // token should be at most 1 hour from expiring to proceed.
        diff -= 1000*60*60;
        
        if(diff > 0){ // it is valid. proceed to clients page
          navCtrl.setRoot(ClientPage);
        } else { // it is expired. remove token
          jwt.removeJwt();
        }
        
      }
    })
      
  }

  goToSignIn(event){
  	this.navCtrl.push(SignInPage);
  }
  goToRegistration(event){
  	this.navCtrl.push(RegistrationPage);
  }

}
