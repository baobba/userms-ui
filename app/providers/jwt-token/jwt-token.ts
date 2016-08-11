import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import {Storage, LocalStorage} from 'ionic-angular';

/*
  Generated class for the JwtToken provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class JwtToken {
	local: Storage;
	jwt_obj: any = null;

  constructor(private http: Http) {
  	this.local = new Storage(LocalStorage);
  }

  storeJwt(jwt: Object){
  	this.local.set('jwt-token', JSON.stringify(jwt));
  }
  // returns promise
  getJwt(){
  	if(this.jwt_obj)
  		return Promise.resolve(this.jwt_obj);

  	return new Promise(resolve => {
  		this.local.get('jwt-token').then(jwt_str => {
  			if(!!jwt_str){
  				this.jwt_obj = JSON.parse(jwt_str);
  				resolve(this.jwt_obj);
  			} else
  				resolve(null);
  		})
  	});
  }
  // returns promise
  getToken(){
  	return new Promise(resolve => {
  		this.getJwt().then(jwt_obj => {
  			if(!!jwt_obj)
  				resolve(jwt_obj["token"]);
  			else
  				resolve(null);
  		})
  	});
  }

  setHeader(headers: Headers){
  	return new Promise(resolve => {
  		this.getToken().then(token => {
  			headers.append('Authorization', <any>token);
  			resolve(headers);
  		});
  	});
  }
}

