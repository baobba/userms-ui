import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {NavController, Storage, LocalStorage, AlertController} from 'ionic-angular';

import {HomePage} from '../../pages/home/home';

import { Enterprise } from '../../models/enterprise';
import { settings } from '../../settings';

import {JwtToken} from '../../providers/jwt-token/jwt-token';

/*
  Generated class for the Enterprise provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EnterprisesProvider {
	enterprises: any = null;

  constructor(private http: Http,
  	public jwt: JwtToken,
  	public navCtrl: NavController,
  	public alert: AlertController) {}

  load(){
  	if(this.enterprises)
  		return Promise.resolve(this.enterprises);

  	return new Promise(resolve => {
	    let headers = new Headers();
	    this.jwt.setHeader(headers).then(res => {
	      this.http.get(`${settings.apiUrl}/enterprises`, {
	      	headers: headers
	      }).map(response => response.json()).subscribe(
		    	response => {
			    	this.enterprises = response["enterprises"];
			    	resolve(this.enterprises);
			    },
			    err => {
			    	let alert = this.alert.create({
		  				title: "Error",
		  				subTitle: err["statusText"],
		  				buttons: ["Dismiss"]
		  			});
		  			alert.present();
			    	if(err["status"] == 401){
			    		this.jwt.removeJwt();
			    		this.navCtrl.setRoot(HomePage);
			    	}
			    	resolve(err);
			    }
			  );
	    })
  	});
  }

  create(enterprise: Enterprise){
		let headers = new Headers();
		return new Promise(resolve => {
			this.jwt.setHeader(headers).then(res => {
				this.http.post(`${settings.apiUrl}/enterprises`, {
					enterprise: enterprise
				}, {
					headers: headers
				})
				.map(res => res.json())
				.subscribe(
					data => {
						resolve(data);
					},
					err => {
						resolve(err.json());
					}
				);
			});
		}); 	
  }

  update(enterprise: Enterprise){
		let headers = new Headers();
		return new Promise(resolve => {
			this.jwt.setHeader(headers).then(res => {
				this.http.patch(`${settings.apiUrl}/enterprises/${enterprise.slug}`, {
					enterprise: enterprise
				}, {
					headers: headers
				})
				.map(response => response.json())
				.subscribe(
					response => {
						resolve(response);
						console.log("enterprise: ", response);
					},
					err => {
						resolve(err);
						console.error("error: ", err);
					},
					() => {
						console.log("Finished");
					}
				);
			});
		});
  }
}
