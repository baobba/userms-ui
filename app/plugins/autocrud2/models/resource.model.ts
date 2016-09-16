import { Config } from './config.model'
import { Headers } from '@angular/http';
export class Resource {
	/**
	 * Resource's name. Usually singular and lower case.
	 * 
	 * It is expected that the response's body, when fetching a resource, will include this (Example 1).
	 * Also, when creating or updating a resource, the attributes will be wraped by this name (Example 2).
	 *
	 * To avoid this, set 'wrap' to false.
	 *
	 * Example 1 (fetching a resource):
	 *
	 * 		A "Client" resource:
	 * 		name: 'client'
	 * 		When fetching a client by id of '5':
	 * 			Request:
	 * 				GET 'http://localhost/clients/5'
	 * 			Response 200 OK:
	 * 				client: {
	 * 					id: 5,
	 * 				 	username: 'client_username',
	 * 				 	...
	 * 				}
	 * 				
	 * Example 2 (creating a resource):
	 *
	 * 		A "Client" resource:
	 * 		name: 'client'
	 * 		When creaing a client with attributes {name: 'Client 1', username: 'client1' }:
	 * 			Request:
	 * 				POST 'http://localhost/clients/'
	 * 				Body:
	 * 					client: {
	 * 						name: 'Client 1',
	 * 						username: 'client1'
	 * 					}
	 * 			Response 201 CREATED
	 * 				
	 * @type {string}
	 */
	name: string;
	wrap: boolean = true;

	/**
	 * Plural name of the resource.
	 * Unlike Rails, we don't do this automatically, so you should do this yourself (sorry about that).
	 * A resource's plural name will be part of a request's url.
	 * It is expected that a resource's plural name will wrap an array of resource's objects in a response.
	 *
	 * Example 1 (request's url):
	 * 
	 * 		A 'category' resource:
	 * 		plural_name: 'categories'
	 * 		When listing categories:
	 * 			Request:
	 * 				GET 'http://localhost/categories'
	 * 			Response 200 OK:
	 * 				Body:
	 * 					categories: [{<category object>}, {<category object>}]
	 * 					
	 * @type {string}
	 */
	plural_name: string;
	/**
	 * Requests a resource may be prefixed.
	 * Prefixes should be ended with '/'
	 * Useful for non-trivial resources.
	 *
	 * Example (default values):
	 * 
	 * 		The category of a product
	 * 		url_prefix: 'products/'
	 * 		Listing categories: 'http://localhost/products/categories'
	 * 		
	 * @type {string}
	 */
	url_prefix: string = '';

	/**
	 * Name of the resource to be showed in messages and layouts.
	 *
	 * Example:
	 *
	 * 		Berry blender's resource:
	 * 		name: 'berry-blender',
	 * 		label: 'Berry Blender'
	 * 		
	 * @type {string}
	 */
	label: string;

	// If set, these values will take Config's attributes place.
	// Unless your resource is different from the others, you shouldn't touch these attributes.
	// For more info, check these attributes on config.model.ts
	http_methods: Object = {
		list: null,
		fetch: null,
		create: null,
		update: null,
		delete: null
	};
	resource_urls: Object = {
		list: null,
		fetch: null,
		create: null,
		update: null,
		delete: null,
	};


	/**
	 * Headers that should be included on a specific action.
	 * See Config's 'headers' attribute.
	 * 
	 * @type {Object} Object that holds string-value pairs for each available action.
	 */
	headers: Object = {
		list: {},
		create: {},
		fetch: {},
		update: {},
		delete: {}
	};
	/**
	 * Url parameters that should be included on a specific action.
	 * See Config's 'url_params' attribute.
	 *
	 * @type {Object} Object that holds string-value pairs for each available action.
	 */
	url_params: Object = {
		list: {},
		create: {},
		fetch: {},
		update: {},
		delete: {}
	};

	private _required = ["name", "plural_name"];

	constructor(json){
		for(let prop in json){
			this[prop] = json[prop];
		}
		for(let prop of this._required){
			if(this[prop] == undefined){
				console.error(`Autocrud2: Required param ${prop} for Resource. Provided: `, json);
				throw new Error(`Autocrud2: Required param ${prop} for Resource`);
			}
		}
	}

	/**
	 * Resource's url.
	 * If 'config' is supplied, returns the complete url to make requests.
	 * If 'action' is supplied, returns the complete url for that specific action.
	 * 
	 * @param {Config = null} config Config object that allows this method to return a complete url for the resource.
	 * @param {string = 'list'} action For what purpose this url should be formed. 'list', 'create', 'update', 'fetch' or 'delete'?
	 */
	url(config: Config = null, action: string = 'list'){
		let str = '';

		if(!!config)
			str += config.base_url + config.sufix;

		str += this.url_prefix + this.plural_name;

		// action url
		let aurl = this.resource_urls[action];
		if(aurl == null)
			aurl = config.resource_urls[action];

		return str + aurl;
	}
	/**
	 * Resource's method for a given action.
	 * If 'action' is supplied, returns the complete url for that specific action.
	 * 
	 * @param {string = 'list'} action For what purpose this method should be returned. 'list', 'create', 'update', 'fetch' or 'delete'?
	 * @param {Config} config Config object that will be accessed if the info cannot be found on 'resource'.
	 */
	method(action: string = 'list', config: Config = null){
		if(!!this.http_methods[action])
			return this.http_methods[action]
		else {
			try {
				return config.http_methods[action];
			} catch(e) {
				console.error(e);
				throw Error(`Http method for action '${action}' cannot be found on neither 'resource' nor 'config' objects`);
			}
		}
	}
	/**
	 * Return a Headers instance containing headers declared in 'headers' variable for a given action.
	 * If a Config is supplied, returns it also appends it's headers.
	 * 
	 * @param {string = 'list'} action
	 * @param {Config = null} config
	 * @returns {Headers} headers
	 */
	makeHeaders(action: string = 'list', config: Config = null){
		let headers: Headers;
		if(!!config)
			headers = config.makeHeaders();
		else
			headers = new Headers();
		for(let prop in this.headers[action]){
			headers.append(prop, this.headers[action][prop]);
		}
		return headers;
	}
	/**
   * Replaces url attribute tags with the actual value.
   *
   * Example:
   *
   *   Given url: 'http://localhost/products/:id/categories/:category_slug'
   *   Item attributes: {
   *     id: 1,
   *     name: 'Soup',
   *     category_slug: 'food'
   *   }
   *   Resulting url: 'http://localhost/products/1/categories/food'
   *   
   * @param {Object} item   [description]
   * @param {string} action [description]
   * @param {Config} config [description]
   */
  parseUrl(item: Object, action: string, config: Config){
    let url = this.url(config, action);

    // ith occurrence of ':'
    let i = 0;
    while(true){
      i++;
      // colem index.
      // when 'i' is too big, 'ci' == url.length.
      // that's why we'll check with ci_aux.
      let ci = url.split(':', i).join(':').length;
      // check if 'ci' is not end of string.
      // if ci_aux == -1, there are no more matches.
      let ci_aux = url.indexOf(':', ci);

      if(ci_aux == -1)
        break;

      // possibly 'http://' or 'https://'
      // or, if is a number, is possibly the port: 'http://domain:3000/'
      // get next occurrence
      if(url[ci + 1] == '/' || !isNaN(<any>url[ci + 1]))
        continue;

      // url substring starting from 'ci'.
      // 
      let us = url.substr(ci);

      // '/' index, where the substring may end.
      // if not found, change '-1' to 9999.
      // as we'll want the min value, -1 would be a trouble.
      let si = us.indexOf('/');
      si = si != -1 ? si : 9999;
      // '?' index, where the substring may end.
      // if not found, change '-1' to 9999.
      // as we'll want the min value, -1 would be a trouble.
      let qmi = us.indexOf('?');
      qmi = qmi != -1 ? qmi : 9999;

      // get the first occurence's index.
      let min = Math.min(si, qmi);

      // parameter name after ':'
      let param: string;

      // there are no '/' or '?'.
      // param ends at the end of the 'url' string.
      if(min == 9999)
        param = us.substr(1); // throws ':' away
      else
        param = us.substr(1, min - 1) // from 1 character after ':' 'til 1 character before '/' or '?'

      // replace url's attributes (e.g. ':id') with the actual value (e.g. '1')
      url = url.replace(':' + param, item[param]);
      // as we've replaced, we have 1 less ':', so we need to decrement i.
      i--;

    }

    return url;
  }
  /**
   * Add params declared both here and in 'config' for a given action.
   * 
   * @param {string} url    [description]
   * @param {Config} config [description]
   * @param {string} action [description]
   */
  addUrlParams(url: string, config: Config, action: string = 'list'){
  	let url2 = config.addUrlParams(url);
    let first = url == url2;
    for(let prop in this.url_params[action]){
      if(first){
        url2 += '?';
        first = false;
      } else {
        url2 += '&';
      }
      url2 += `${prop}=${this.url_params[action][prop]}`;
    }
    return url2;
  }
}