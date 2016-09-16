import { Attribute } from './models/attribute.model'

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
	},
	/**
	 * Creates a separate data object with only file input attributes.
	 * 
	 * @param {Attribute[]} attributes
	 * @param {Object} existing Existing item. Will be used to keep array size. When used internally, it may be an Array.
	 * @param {is_composition_array} boolean NOT to be set externally. It is used internally only.
	 *
	 * @returns {Object} obj Empty object containing only nullified file attributes.
	 */
	file_data_obj: (attributes: Attribute[], existing = null, is_composition_array = false) => {
		let obj = {};
		// iterate through attributes to find the ones that are of type 'file'.
		for(let attr of attributes){
			// will hold the processed value for a composition.
			let comp_obj = null;

			if(!!attr.composition){
				// will be supplied when we call this method recursively.
				let existing_child = null;
				if(!!existing){
					if(!!existing[attr.name]){
						existing_child = existing[attr.name];
					} else if(existing.constructor === Array){
						existing_child = [];
						for(let i in existing){
							if(!!existing[i][attr.name]){
								existing_child.push(existing[i][attr.name]);
							}
						}
					}
				}
				// resolve compositions recursively
				comp_obj = helper.file_data_obj(attr.composition, existing_child, attr.is_array);
				// attach to our resulting object if it's not empty (otherwise it wouldn't make sense).
				if(!helper.isEmptyObject(comp_obj)){
					obj[attr.name] = comp_obj;
				}
			}


			if(attr.input_tag_type == "file"){
				if(attr.is_array){
					obj[attr.name] = [];
					if(!!existing && !!existing[attr.name]){
						for(let i in existing[attr.name])
							obj[attr.name].push(null);
					}
				} else {
					obj[attr.name] = null;
				}

				if(is_composition_array){
					// resulting value to attach must be an array.
					let aux = obj;
					obj = [];
					if(!!existing && existing.constructor === Array){
						for(let i in existing){
							obj['push'](aux);
						}
					} else {
						obj['push'](aux);
					}
				}
			}
		}
		return obj;
	},
	/**
	 * Check if object is empty.
	 * If 'not_null' param is 'false', it considers { prop: null } as not empty
	 * @param {Object} obj [description]
	 */
	isEmptyObject(obj: Object, not_null: boolean = false){
		for(let prop in obj){
			if(not_null){ // must have a property that is set.
				if(obj.hasOwnProperty(prop)){
					return false;
				}
			} else { // having a property, even if value is 'null', is considered not empty
				return false;
			}
		}

		return true;
	},
	/**
	 * Transforms the json data into form data.
	 *
	 * Example:
	 *
	 * Input:
	 * 
	 * fd = new FormData();
	 * dob = {
	 * 	name: 'phone',
	 * 	photos: ['myphoto.jpg', 'myotherphoto.png'],
	 * 	price: '615.99',
	 * 	color: {
	 * 		front: 'red',
	 * 		back: 'blue'
	 * 	},
	 * 	buttons: ['power', 'volup', 'voldown'],
	 * 	cameras: [{
	 * 		name: 'front',
	 * 		res: '5Mpx'
	 * 	},{
	 * 		name: 'back',
	 * 		res: '10Mpx'
	 * 	}]
	 * };
	 * Say we want to replace 'myotherphoto.png'. We'll have this 'fob'.
	 * fob = {
	 * 	photos: [null, <File object>]
	 * };
	 * Say we want to wrap the object (Rails way):
	 * p = 'product';
	 *
	 * Output:
	 *
	 * 'fd' object updated. Now it will have these key-values "<key>, <value>":
	 *
	 * product[name], phone
	 * product[photos][], myphoto.jpg
	 * product[photos][], <File object>
	 * product[color][front], red
	 * product[color][back], blue
	 * product[buttons][], power
	 * product[buttons][], volup
	 * product[buttons][], voldown
	 * product[cameras][][name], front
	 * product[cameras][][res], 5Mpx
	 * product[cameras][][name], back
	 * product[cameras][][res], 10Mpx
	 * 
	 * @param {FormData}  fd  FormData object where items will be appended to.
	 * @param {Object}    dob Data object where items will be read from.
	 * @param {Object =   null} fob File object where items will override dob's.
	 * @param {string =   ''} p Prefix. Useful for wrapping objects and necessary for internal use (as this is a recursive method).
	 */
	json_to_formdata(fd: FormData, dob: Object, fob: Object = null, p: string = ''){
		let apnd = helper.json_to_formdata;

		function isObj(dob, fob, p){
			if(typeof dob == "object"){
				if(!!dob && dob.constructor === Array){
					p += '[]';
					for(let i = 0; i < dob.length; i++){
						let aux_fob = !!fob ? fob[i] : fob;
						isObj(dob[i], aux_fob, p);
					}
				} else {
					apnd(fd, dob, fob, p);
				}
			} else {
				let value = !!fob ? fob : dob;
				fd.append(p, value);
			}
		}

		for(let prop in dob){
			let aux_p = p == '' ? prop : `${p}[${prop}]`;
			let aux_fob = !!fob ? fob[prop] : fob;
			isObj(dob[prop], aux_fob, aux_p);
		}
	}
}
