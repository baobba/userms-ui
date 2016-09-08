import { helper } from '../../helper';

export class Attribute {
	name: string;
	label: string;
	type: string = "string"; // 'string', 'text', 'phone', 'price', 'date', 'time', 'datetime', 'int', 'float', 'decimal', 'composition', 'file', 'image'

	is_array: boolean = false;
	composition: Attribute[]; // if the attribute is composed by multiple sub-attributes. E.g. phone number may be composed of 'type' (residential, work, cell) and 'number'

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
	classification: string = "normal"; // 'normal', 'file', 'composition', 'array'
	input_tag_type: string = "string"; // 'string', 'text', 'file', 'composition'
	input_type: string = "text"; // 'text', 'email', 'tel', 'file', 'image', ...

	constructor(json){
		for(let prop in json){
			this[prop] = json[prop];
		}

		switch(this.type){
			case "string": {

				break;
			}
			case "text": {
				this.input_tag_type = "text";
				break;
			}
			case "phone": {
				this.input_type = "tel";
				break;
			}
			case "file": {
				this.display = "link";
				this.classification = "file";
				this.input_tag_type = "file";
				this.input_type = "file";
				break;
			}
			case "image": {
				this.display = "image";
				this.classification = "file";
				this.input_tag_type = "file";
				this.input_type = "image";
				break;
			}
			case "composition": {
				this.classification = "composition";
				this.input_tag_type = "composition";
				this.input_type = "composition";
				break;
			}
		}

		if(this.is_array)
			this.classification = "array";
	}
}