import { Component, Input } from '@angular/core'
import { Attribute } from '../../models/attribute/attribute.model'
import { helper } from '../../helper'

@Component({
	selector: 'ac2-form',
	templateUrl: 'build/plugins/autocrud2/templates/form/form.html'
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
		console.log(helper, this.attrs);
	}

	submit(){
		console.log(this.item);
	}
}