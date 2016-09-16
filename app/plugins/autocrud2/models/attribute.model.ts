export class Attribute {
	name: string;
	label: string; // defaults to 'name'
	type: string = "string"; // 'id', 'string', 'link', 'text', 'phone', 'price', 'date', 'time', 'datetime', 'int', 'float', 'decimal', 'composition', 'file', 'image'

	is_array: boolean = false;
	composition: Attribute[]; // if the attribute is composed by multiple sub-attributes. E.g. phone number may be composed of 'type' (residential, work, cell) and 'number'

	// related to listing
	list: boolean = true;
	list_style: Object = {}; // html tag's 'style' attribute on key-value pairs. Example: { float: "left" }
	list_css: string[] = []; // all css classes you want to apply to the element.
	composition_separator: string = ' &vert; '; // in case of composition, separator will serve to separate composed data on a column when listing.
	array_separator: string = ' <br> '; // in case of array, separator will serve to separate composed data on a column when listing.

	// related to form
	on_form: string = 'both'; // 'create', 'update', 'both' or 'none'
	on_form_style: Object = {}; // html tag's 'style' attribute on key-value pairs. Example: { float: "left" }
	on_form_css: string[] = [];

	// related to showing
	on_show: boolean = false;
	on_show_style: Object = {}; // html tag's 'style' attribute on key-value pairs. Example: { float: "left" }
	on_show_css: string = '';

	// related to images
	size: string = ''; // 'tiny', 'small', 'small-medium', 'medium', 'medium-big', 'big', 'huge'

	// related to links
	link_label: string;

	// is set by autocrud
	display: string = "textual"; // 'textual', 'image', 'icon', 'link', 'composition'
	classification: string = "normal"; // 'normal', 'file', 'composition', 'array'
	input_tag_type: string = "string"; // 'string', 'text', 'file', 'composition'
	input_type: string = "text"; // 'text', 'email', 'tel', 'file', 'image', ...
	list_tag: string = "span"; // 'span', 'div', 'a', 'img', ...

	// required properties:
	_required_properties = ['name'];

	constructor(json){
		// overwrite defaults
		switch(json["type"]){
			case "id":{
				this.list = false;
				this.on_form = 'none';
				break;
			}
		}

		for(let prop in json){
			this[prop] = json[prop];
		}
		// check for required attributes unset.
		for(let i in this._required_properties){
			let prop = this._required_properties[i];
			if(this[prop] == null){
				console.error(`Autocrud2: Missing property ${prop} for Attribute`);
				console.error("Input: ", json);
			}
		}

		if(this.label == null)
			this.label = this.name;

		if(!!this.composition && this.composition.length > 0){
			this.type = "composition";
			let comp_attrs: Attribute[] = [];
			for(let i in this.composition){
				comp_attrs.push(new Attribute(this.composition[i]));
			}
			this.composition = comp_attrs;
		}

		switch(this.type){
			case "string": {

				break;
			}
			case "link": {
				this.list_tag = 'a';
				this.display = "link";
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
				this.list_tag = "img";
				this.display = "image";
				this.classification = "file";
				this.input_tag_type = "file";
				this.input_type = "image";
				break;
			}
			case "composition": {
				this.display = "composition";
				this.classification = "composition";
				this.input_tag_type = "composition";
				this.input_type = "composition";
				break;
			}
		}
		// 'array' classification must override other attribute types.
		if(this.is_array){
			this.classification = "array";
		}
	}
}