import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {Storage, LocalStorage} from 'ionic-angular';

import { App } from '../../models/app';
import { Enterprise } from '../../models/enterprise';
import { settings } from '../../settings';

import {JwtToken} from '../../providers/jwt-token/jwt-token';

/*
  Generated class for the App provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AppsProvider {
	apps: any = null;
	enterprise: Enterprise;

  constructor(private http: Http,
  	public jwt: JwtToken) {}

  load(enterprise: Enterprise){
  	this.enterprise = enterprise;

  	if(this.apps)
  		return Promise.resolve(this.apps);

  	return new Promise(resolve => {
	    let headers = new Headers();
	    this.jwt.setHeader(headers).then(res => {
	      this.http.get(`${settings.apiUrl}/apps?app[enterprise_id]=${this.enterprise.id}`, {
	      	headers: headers
	      }).map(response => {
	      	if(!!response && !!response.json())
		    		return response.json()["apps"];
		    }).subscribe(apps => {
		    	this.apps = apps;
		    	resolve(this.apps);
		    });
	    })
  	});
  }

  create(app: App){
		let headers = new Headers();
		return new Promise(resolve => {
			this.jwt.setHeader(headers).then(res => {
				this.http.post(`${settings.apiUrl}/apps`, {
					app: app
				}, {
					headers: headers
				})
				.map(response => response.json())
				.subscribe(
					res => {
						resolve(res);
						console.log("app: ", res);
					},
					err => {
						resolve(err);
						console.error("error: ", err);
					},
					() => {
						
					}
				);
			});
		}); 	
  }

  update(app: App){
		let headers = new Headers();
		return new Promise(resolve => {
			let token = <any>app.api_token["token"];
			this.jwt.setHeader(headers).then(res => {
				this.http.patch(`${settings.apiUrl}/apps/${app.slug}?token=${token}`, {
					app: app
				}, {
					headers: headers
				})
				.map(response => response.json())
				.subscribe(
					response => {
						resolve(response);
						console.log("app: ", response);
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
