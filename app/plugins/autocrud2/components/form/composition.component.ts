import { Component, Input } from '@angular/core'
import { 
  FormControl,
  FormGroup,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms'

import { Attribute } from '../../models/attribute/attribute.model'
import { helper } from '../../helper'

@Component({
	selector: 'ac2-form-composition',
	templateUrl: 'build/plugins/autocrud2/templates/form/composition.html',
	providers: [{provide: NG_VALUE_ACCESSOR, useExisting: FormCompositionElementComponent, multi: true}]
})

export class FormCompositionElementComponent implements ControlValueAccessor {
	@Input() attr: Attribute;
	@Input() item: any; // data that is bound to the form

	fn: any; // required by "registerOnChange"

	childControl = new FormControl(); // required to bind the element to the form

	file_input: any;

	constructor(){}

	ngOnInit(){

	}

	/* ControlValueAccessor methods */
	writeValue(value: any){
		try{
			this.childControl['setValue'](value);
		} catch(e){
			this.childControl.updateValue(value);
		}
	}
	registerOnChange(fn: (value: any) => void) {
		this.fn = fn;
	}
	registerOnTouched(){

	}
}