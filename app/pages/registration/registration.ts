import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { settings } from '../../settings';

import {HomePage} from '../home/home';
 
@Component({
  templateUrl: 'build/pages/registration/registration.html'
})

export class RegistrationPage {
	passwordError = false;

	registration = {
		email: "",
		password: "",
		password_confirmation: "",
		registration_token: ""
	};
 
  constructor(private navController: NavController,
  	public http: Http,
  	public alert: AlertController) {
  }
     
  onSubmit() {

    this.http.post(`${settings.serverUrl}/clients`, {
    	client: this.registration,
    	format: "json"
    })
    .map(res => {
      try {
        return res.json();
      } catch(e) {
        // may be caused by empty response
        return res;
      }
    })
    .subscribe(
    	res => {
        let alert = this.alert.create({
          title: "Account created",
          subTitle: "Please confirm your e-mail before proceeding",
          buttons: [{
            text: "Ok",
            handler: () => {
              this.navController.setRoot(HomePage);
            }
          }]
        });
        alert.present();
        this.navController.setRoot(HomePage);
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
    	}
    );
  }

  checkPassword(event){
  	if(this.registration.password != this.registration.password_confirmation)
  		this.passwordError = true;
    else
      this.passwordError = false;
  }
}