import { Component, Input } from '@angular/core'
import { Attribute } from './models/attribute/attribute.model'
import { Listing } from './pages/listing/listing'

@Component({
	selector: 'autocrud2',
	templateUrl: 'build/plugins/autocrud2/templates/autocrud.html',
	directives: [Listing]
})

export class Autocrud {
	@Input() attributes: Object[];
	@Input() templates: Object[];
	@Input() data: Object[];

	parsed_attributes: Attribute[] = [];

	constructor(){

	}
	ngOnInit(){
		for(let attr of this.attributes){
			this.parsed_attributes.push(new Attribute(attr));
		}
	}
}
