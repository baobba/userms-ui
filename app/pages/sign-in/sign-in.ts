import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { settings } from '../../settings';

import {ClientPage} from '../client/client';

import {JwtToken} from '../../providers/jwt-token/jwt-token';
 
@Component({
  templateUrl: 'build/pages/sign-in/sign-in.html',
  providers: [JwtToken]
})

export class SignInPage {

	login = {
		email: "",
		password: "",
	};
 
  constructor(private navController: NavController,
  	public http: Http,
  	public alert: AlertController,
    public jwt: JwtToken) {
  }
     
  onSubmit() {

    this.http.post(`${settings.serverUrl}/clients/sign_in`, {
    	client: this.login,
    	format: "json"
    })
    .map(res => {
        let res_json = res.json();
    	if(res["_body"] != ""){
            this.jwt.storeJwt(res_json);
        }
        return res_json;
    })
    .subscribe(
    	res => {
    	},
    	err => {
    		let alert = this.alert.create({
    			title: "Error",
    			subTitle: err["statusText"],
    			buttons: ["Dismiss"]
    		});
    		alert.present();
    		console.error("Error: ", err);
    	},
    	() => {
    		let alert = this.alert.create({
    			title: "Authorized",
    			buttons: [{
    				text: "Proceed",
    				handler: () => {
    					this.navController.setRoot(ClientPage);
    				}
    			}]
    		});
    		alert.present();
    		console.log('Authenticated', alert, this.navController);
    	}
    );
  }  
}