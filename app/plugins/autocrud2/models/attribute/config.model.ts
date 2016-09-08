export class Config {
	/**
	 * Base url ended with '/'
	 * Requests will be formed using this url + a sufix as base.
	 * 
	 * @type {string}
	 */
	base_url: string = 'http://localhost/';
	/**
	 * Url sufix ended with '/'
	 * Urls for requests will be mounted using base_url + sufix + <resource>'s url.
	 * Useful for APIs
	 *
	 * Example:
	 * 
	 * 	Creating a "product" via POST '<resource>/' using an API
	 * 	base_url: 'http://localhost/' => url of the server
	 * 	sufix: 'api/v1/' => url of the version 1 of our API
	 *	The resulting request url will be: POST 'http://localhost/api/v1/products'
	 *	
	 * @type {string}
	 */
	sufix: string = '';
	/**
	 * Headers that should be included on EVERY request.
	 * May be useful for a security/authentication token.
	 *
	 * Example:
	 *
	 * {
	 * 	authenticity_token: <string variable>,
	 * 	csrf_token: 'a csrf token'
	 * }
	 * 
	 * @type {Object[]} Array of string key-value pairs.
	 */
	headers: Object[] = [];
	/**
	 * Url parameters that should be included on EVERY request.
	 * May be useful to set the desired language or response format for an API request.
	 *
	 * Example:
	 *
	 * {
	 * 	format: 'json',
	 * 	language: 'en-US'
	 * }
	 * @type {Object[]}
	 */
	url_params: Object[] = [];

	/**
	 * Pagination settings.
	 * 'page_size': default number of items fetched at once when using pagination.
	 * 'page_size_attr': default attribute name for page size.
	 * 'page_number_attr': default attribute name for the page number.
	 *
	 * Example:
	 *
	 * 	Using default values results in a request to list "products" via GET '<resource>/':
	 *  GET 'http://localhost/products?items_per_page=10&page=1'
	 *
	 * 
	 * @type {Object}
	 */
	pagination: Object = {
		page_size: 10,
		page_size_attr: 'items_per_page',
		page_number_attr: 'page'
	};

	// Convention over configuration.
	// This is the Rails's way of routing.
	// It is expected that you won't need to change it.
	// But for versatility's sake, here it is.
	http_methods: Object = {
		list: 'get',
		fetch: 'get',
		create: 'post',
		update: 'patch',
		delete: 'delete'
	};
	resource_urls: Object = {
		list: '/',
		fetch: '/:id',
		create: '/',
		update: '/:id',
		delete: '/:id',
	};

	/**
	 * How to query for unique-index attributes.
	 * The query is a 'list' operation, filtered by the param:
	 * 
	 * Example for a 'product' name (default values):
	 * 		GET 'products?name=sample'
	 * 				Status Response:
	 * 						if response is 200, value exists.
	 * 		  	 		if response is 404, value does not exist.
	 * 		    Or, by body response:
	 * 		    		if response is {name: 'exists'}, value exists.
	 * 		    		if response is {name: 'does not exist'}, value does not exist.
	 * 		    		
	 * 		    		When 'response_attr' is ':resource', instead of {name: <value>},
	 * 		    		we'll consider {product: <value>}
	 *
	 * 		
	 * @type {Object}
	 */
	unique_index: Object = {
		query: 'status', // 'status', 'body'
		// when 'query' is 'status'
		found_status: 200,
		not_found_status: 404,
		// when 'query' is 'body'
		response_attr: ':attr', // ':attr', ':resource'
		found_value: 'exists',
		not_found_value: 'does not exist'
	};

	constructor(json){
		for(let prop in json){
			this[prop] = json[prop];
		}
	}
}