import { Component, Input } from '@angular/core'
import { Attribute } from '../../models/attribute/attribute.model'
import { helper } from '../../helper'

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
	]
})

export class FormComponent {
	@Input() attrs: Attribute[];
	@Input() item: Object;


	form_attrs: Attribute[] = [];

	MIN_COL_WIDTH = 15; // measurement: 'em'

	constructor(){}

	ngOnInit(){
		for(let attr of this.attrs){
			if(attr.on_form != 'none'){
				this.form_attrs.push(attr);
			}
		}
	}

	submit(form){
		console.log(this.item);
		console.log(form);
	}
}