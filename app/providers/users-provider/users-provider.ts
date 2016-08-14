import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { App } from '../../models/app';
import { User } from '../../models/user';
import { Identity } from '../../models/identity';

import { settings } from '../../settings';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsersProvider {
	users: any = null;
	app: App;

  constructor(private http: Http) {}

  load(app: App){
  	this.app = app;

  	if(this.users)
  		return Promise.resolve(this.users);

  	return new Promise(resolve => {
      this.http.get(`${settings.apiUrl}/users?token=${this.app.api_token.token}`)
      .map(response => {
      	let res_json = null;
      	try {
      		res_json = response.json();
      		if(!!res_json["users"])
      			return res_json["users"]
      		else
      			return res_json;
      	} catch(e){
      		return response;
      	}
	    }).subscribe(
	    	users => {
	    		this.users = users;
	    		resolve(this.users);
	    	},
	    	err => {
	    		console.error(err);
	    		resolve(err);
	    	}
	    );
	  });
  }

  create(user: User){
		/*let headers = new Headers();
		return new Promise(resolve => {
			this.jwt.setHeader(headers).then(res => {
				this.http.post(`${settings.apiUrl}/users`, {
					user: user
				}, {
					headers: headers
				})
				.map(response => response.json())
				.subscribe(
					res => {
						resolve(res);
						console.log("user: ", res);
					},
					err => {
						resolve(err);
						console.error("error: ", err);
					},
					() => {
						
					}
				);
			});
		});*/
  }

  update(user: User){
		/*let headers = new Headers();
		return new Promise(resolve => {
			let token = <any>user.api_token["token"];
			this.jwt.setHeader(headers).then(res => {
				this.http.patch(`${settings.apiUrl}/users/${user.slug}?token=${token}`, {
					user: user
				}, {
					headers: headers
				})
				.map(response => response.json())
				.subscribe(
					response => {
						resolve(response);
						console.log("user: ", response);
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
		});*/
  }
}
