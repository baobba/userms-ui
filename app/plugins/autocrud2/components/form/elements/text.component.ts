import { Component, Input } from '@angular/core'



@Component({
	selector: 'ac2-form-text',
	templateUrl: 'build/plugins/autocrud2/templates/form/elements/text.html'
})

export class TextElementComponent {
	@Input() cur_item: Object;
	@Input() prop: string;
	
	constructor(){ }

	ngOnInit(){
	}
}