import { Component, Input } from '@angular/core'

import { Attribute } from './models/attribute.model'
import { Resource } from './models/resource.model'
import { Config } from './models/config.model'

import { Listing } from './pages/listing/listing'

@Component({
	selector: 'autocrud2',
	templateUrl: 'build/plugins/autocrud2/templates/autocrud.html',
	directives: [Listing]
})

export class Autocrud {
	@Input() config: Object;
	@Input() attributes: Object[];
	@Input() templates: Object[];
	@Input() data: Object[];
	@Input() resource: Object;

	parsed_attributes: Attribute[] = [];
	parsed_resource: Resource;
	parsed_config: Config;


	constructor(){

	}
	ngOnInit(){
		for(let attr of this.attributes){
			this.parsed_attributes.push(new Attribute(attr));
		}

		if(this.config == null)
			this.config = {};

		this.parsed_config = new Config(this.config);
		this.parsed_resource = new Resource(this.resource);
	}
}
