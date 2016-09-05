import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SignInPage } from '../sign-in/sign-in';
import { RegistrationPage } from '../registration/registration';
import { ClientPage } from '../client/client';

import {JwtToken} from '../../providers/jwt-token/jwt-token';
import {sidemenu} from '../../sidemenu';
import {Autocrud} from '../../plugins/autocrud2/autocrud';

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
  attrs = [{
    name: 'phone',
    label: 'Phone number',
    type: 'phone'
  },{
    name: 'address',
    label: 'Address',
    type: 'text'
  },{
    name: 'profile_pic',
    label: 'Profile Picture',
    type: 'image',
    size: 'small-medium'
  }];
  tpls = [/*{
    action: 'list',
    url: 'custom_url.html'
  }*/];
  data = [{
    id: 'idblah',
    address: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Nam mattis metus sit amet lectus scelerisque lobortis.
Cras viverra sem nulla, vel vehicula leo rhoncus nec`,
    phone: '111222333',
    profile_pic: 'https://upload.wikimedia.org/wikipedia/commons/1/12/A_sheep_in_the_long_grass.jpg'
  }, {
    id: 2,
    address: 'address 2',
    phone: '222333444'
  }, {
    id: 3,
    address: 'address 3',
    phone: '333444555'
  }];

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
