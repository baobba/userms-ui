import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map'

import { Config } from '../models/config.model'
import { Resource } from '../models/resource.model'

import { helper } from '../helper'

@Injectable()
export class ResourceProvider {
	config: Config;
  resource: Resource;

  constructor(private http: Http) {}

  setConfig(config: Config){
  	this.config = config;
  }
  setResource(resource: Resource){
    this.resource = resource;
  }

  load(): Observable<any>{
    return this.sendRequest('list');
  }

  create(item: Object): Observable<any>{
    return this.sendRequest('create', item);
  }

  update(item: Object): Observable<any>{
    return this.sendRequest('update', item);
  }

  delete(item: Object): Observable<any>{
    return this.sendRequest('delete', item);
  }

  // TODO
  unique(){

  }

  ////////////////////////////////////////////////////////////////////////////
  sendRequest(action: string, item: Object = null, file_item: Object = null): Observable<any>{
    let headers = this.resource.makeHeaders(action, this.config);
    let parsed_url, parsed_url_with_params: string;

    if(!!item){
      parsed_url = this.resource.parseUrl(item, action, this.config);
    } else {
      parsed_url = this.resource.url(this.config, action);
    }
    parsed_url_with_params = this.resource.addUrlParams(parsed_url, this.config, action);

    let fd: FormData = new FormData();
    let prefix = this.resource.wrap ? this.resource.name : '';
    helper.json_to_formdata(fd, item, file_item, prefix);
    let xhr: XMLHttpRequest = new XMLHttpRequest();

    return Observable.fromPromise(new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 ) {
          if(xhr.status >= 400 && xhr.status < 600){
            console.error(xhr);
            let json: Object;
            try{
              json = JSON.parse(xhr.response);
            } catch(e){
              console.error(`Cannot parse '${xhr.response}' as json`);
              json = {};
            }
            this.handleError(xhr);
            let returnVal = [xhr, json]
            reject(xhr);
          } else {
            console.log(xhr);
            let returnVal = [xhr, JSON.parse(xhr.response)]
            resolve(returnVal);
          }
        }
      }

      xhr.open(this.resource.method(action, this.config).toUpperCase(), parsed_url_with_params, true);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

      let json = headers.toJSON();
      for(let header in json){
        xhr.setRequestHeader(header, json[header][0]);
      }

      xhr.send(fd);
    }));
  }

  handleError(xhr: XMLHttpRequest){
    console.error(`Error ${xhr.status}: ${xhr.statusText}.`, xhr.response);
  }
}
