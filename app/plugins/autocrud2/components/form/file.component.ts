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
	selector: 'ac2-form-file',
	templateUrl: 'build/plugins/autocrud2/templates/form/file.html',
	providers: [{provide: NG_VALUE_ACCESSOR, useExisting: FormFileElementComponent, multi: true}]
})

export class FormFileElementComponent implements ControlValueAccessor {
	@Input() attr: Attribute;
	@Input() item: any; // data that is bound to the form

	fn: any; // required by "registerOnChange"

	childControl = new FormControl(); // required to bind the element to the form

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