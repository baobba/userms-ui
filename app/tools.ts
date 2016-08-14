export var global_tools = {
	slugify: (text) => {
		return text.toString().toLowerCase()
	    .replace(/\s+/g, '-')           // Replace spaces with -
	    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
	    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
	    .replace(/^-+/, '')             // Trim - from start of text
	    .replace(/-+$/, '');            // Trim - from end of text
	},
	capitalize: (str) => {
		return !!str ? str.charAt(0).toUpperCase() + str.substr(1) : '';
	},
	clone: (obj) => {
		var copy;

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
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = this.clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = this.clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
	}
};