import { Component, Input } from '@angular/core'
import { Attribute } from '../../models/attribute.model'
import { Resource } from '../../models/resource.model'
import { Config } from '../../models/config.model'
import { helper } from '../../helper'

import { ResourceProvider } from '../../providers/resource.provider'

import { FormArrayElementComponent } from './array.component'
import { FormNormalElementComponent } from './normal.component'
import { FormFileElementComponent } from './file.component'
import { FormCompositionElementComponent } from './composition.component'

@Component({
	selector: 'ac2-form',
	templateUrl: 'build/plugins/autocrud2/templates/form/form.html',
	directives: [
		FormArrayElementComponent,
		FormNormalElementComponent,
		FormFileElementComponent,
		FormCompositionElementComponent,
	],
	providers: [ResourceProvider]
})

export class FormComponent {
	@Input() attrs: Attribute[];
	@Input() item: Object;
	@Input() config: Config;
	@Input() resource: Resource;
	@Input() action: string;


	form_attrs: Attribute[] = [];
	file_items: Object;

	MIN_COL_WIDTH = 15; // measurement: 'em'

	constructor(public prov: ResourceProvider){}

	ngOnInit(){
		for(let attr of this.attrs){
			if(attr.on_form != 'none'){
				this.form_attrs.push(attr);
			}
		}
		this.file_items = helper.file_data_obj(this.form_attrs, this.item);
		this.prov.setConfig(this.config);
		this.prov.setResource(this.resource);
	}

	submit(form){
		this.prov[this.action](this.item);
	}

	fileChanged(event, file_item: Object, attr: Attribute){
		let file_list: FileList = event.srcElement.files;
		let	files: File[] = [];

		for(let i = 0; i < file_list.length; i++){
			files.push(file_list[i]);
		}
		if(attr.is_array){
			file_item[attr.name] = files[0];
		} else {
			file_item[attr.name] = files;
		}
		console.log(file_item);
	}
}