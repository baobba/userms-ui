import { Component, Input } from '@angular/core'



@Component({
	selector: 'ac2-form-phone',
	templateUrl: 'build/plugins/autocrud2/templates/form/elements/phone.html'
})

export class PhoneElementComponent {
	@Input() cur_item: Object;
	@Input() prop: string;
	@Input() index: number;
	@Input() composition_name: string;

	input_name: string;
	
	constructor(){ }

	ngOnInit(){
		if(this.composition_name == null)
			this.input_name = this.prop;
		else
			this.input_name = this.composition_name + `[${this.prop}]`;

		if(this.index != null)
			this.input_name += `[${this.index}]`;
	}
}