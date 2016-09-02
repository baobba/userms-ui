import { Component, Input } from '@angular/core'



@Component({
	selector: 'ac2-form-string',
	templateUrl: 'build/plugins/autocrud2/templates/form/elements/string.html'
})

export class StringElementComponent {
	@Input() cur_item: Object;
	@Input() prop: string;
	
	constructor(){ }

	ngOnInit(){
	}
}