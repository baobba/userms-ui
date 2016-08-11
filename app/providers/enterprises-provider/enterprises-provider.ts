import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {Storage, LocalStorage} from 'ionic-angular';

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
  	public jwt: JwtToken) {}

  load(){
  	if(this.enterprises)
  		return Promise.resolve(this.enterprises);

  	return new Promise(resolve => {
	    let headers = new Headers();
	    this.jwt.setHeader(headers).then(res => {
	      this.http.get(`${settings.apiUrl}/enterprises`, {
	      	headers: headers
	      }).map(response => {
	      	if(!!response && !!response.json())
		    		return response.json()["enterprises"];
		    }).subscribe(enterprises => {
		    	this.enterprises = enterprises;
		    	resolve(this.enterprises);
		    });
	    })
  		/*this.http.get(`${settings.apiUrl}/enterprises`)
  		.map(res => <Array<Enterprise>>(res["enterprises"].json()))
  		.subscribe(enterprises => {
  			this.enterprisesProvider = enterprises;
  			resolve(this.enterprisesProvider);
  		});*/
  	});
  }
}



