export var helper = {
	deserialize: (json, environment, clazz) => {
	  var instance = new clazz();
	  for(var prop in json) {
	      if(!json.hasOwnProperty(prop)) {
	          continue;
	      }

	      if(typeof json[prop] === 'object') {
	          instance[prop] = helper.deserialize(json[prop], environment, environment[prop]);
	      } else {
	          instance[prop] = json[prop];
	      }
	  }

	  return instance;
	}
}