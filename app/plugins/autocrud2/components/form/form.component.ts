import { Component, Input } from '@angular/core'
import { Attribute } from '../../models/attribute/attribute.model'
import { helper } from '../../helper'

import { StringElementComponent } from './elements/string.component'
import { TextElementComponent } from './elements/text.component'
import { PhoneElementComponent } from './elements/phone.component'

@Component({
	selector: 'ac2-form',
	templateUrl: 'build/plugins/autocrud2/templates/form/form.html',
	directives: [StringElementComponent, TextElementComponent, PhoneElementComponent]
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
		console.log(this.form_attrs);
		console.log(this.item);
	}

	submit(){
		console.log(this.item);
	}
}