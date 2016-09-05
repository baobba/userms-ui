import { Attribute } from './models/attribute/attribute.model'

export var helper = {
	clone: (obj) => {
		let copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
          copy[i] = helper.clone(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (let attr in obj) {
          if (obj.hasOwnProperty(attr)) copy[attr] = helper.clone(obj[attr]);
      }
      return copy;
    }

    throw new Error("Unable to copy object! It's type isn't supported.");
	},
	empty_data_obj: (template: Object, attributes: Attribute[]) => {
		if(!!template)
			return helper.clone(template);

		let obj = {};
		for(let attr of attributes){
			let comp_obj = null;
			if(!!attr.composition){
				comp_obj = helper.empty_data_obj(null, attr.composition);
			}

			let aux = null;
			switch(attr.type){
				case 'string':
				case 'text':
				case 'phone':
				case 'price': {
					aux = '';
					break;
				}
				case 'int':
				case 'float':
				case 'decimal': {
					aux = 0;
					break;
				}
				case 'date':
				case 'time':
				case 'datetime': {
					aux = new Date();
					break;
				}
				case 'composition': {
					aux = comp_obj;
					break;
				}
			}

			if(!!attr.is_array)
				aux = [aux];

			obj[attr.name] = aux;
		}

		return obj;
	}
}
