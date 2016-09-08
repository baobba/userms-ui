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
	selector: 'ac2-form-array',
	templateUrl: 'build/plugins/autocrud2/templates/form/array.html',
	providers: [{provide: NG_VALUE_ACCESSOR, useExisting: FormArrayElementComponent, multi: true}]
})

export class FormArrayElementComponent implements ControlValueAccessor {
	@Input() attr: Attribute;
	@Input() item: any;

	MIN_COL_WIDTH = 15; // measurement: 'em'

	childControl = new FormControl();

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
		this.childControl.valueChanges.subscribe(fn);
	}
	registerOnTouched(){

	}
}