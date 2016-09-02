import { helper } from '../../helper';

export class Attribute {
	name: string;
	label: string;
	type: string = "string"; // 'string', 'text', 'phone', 'price', 'date', 'time', 'datetime', 'int', 'float', 'decimal', 'composition'

	composition: Attribute; // if the attribute is composed by multiple sub-attributes. E.g. phone number may be composed of 'type' (residential, work, cell) and 'number'

	// related to viewing
	list: boolean = true;
	list_css: string = ''; // all css classes you want to apply to the element.
	on_form: string = 'both'; // 'create', 'update', 'both' or 'none'
	on_form_css: string = '';
	on_show: boolean = false;
	on_show_css: string = '';

	// related to images
	size: string = ''; // 'tiny', 'small', 'small-medium', 'medium', 'medium-big', 'big', 'huge'

	// is set by autocrud
	display: string = "textual"; // 'textual', 'image', 'icon', 'link'

	constructor(json){
		for(let prop in json){
			this[prop] = json[prop];
		}

		switch(this.type){
			case "image": {
				this.display = "image";
				break;
			}
		}
	}
}