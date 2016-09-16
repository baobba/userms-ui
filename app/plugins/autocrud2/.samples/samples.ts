export var samples = {
	sample1: {
		"attrs": [{
			"name" : "username",
			"label" : "Username",
			"type" : "string",
		},{
			"name" : "cover",
			"composition" : [{
				"name" : "picture",
				"type" : "image",
				"size" : "medium"
			},{
				"name" : "title",
				"type" : "string"
			}],
			"composition_separator" : "<br>"
		},{
			"name" : "albums",
			"is_array" : true,
			"composition" : [{
				"name" : "picture",
				"type" : "image",
				"size" : "small"
			},{
				"name" : "title",
				"type" : "small",
				/*"list_style" : {
					"float" : "left",
					"color" : "red"
				}*/
			}],
			"composition_separator" : null,
			"array_separator" : null
		}],
		"config": {
			"sufix" : "api/v1/",
			"base_url" : "http://localhost:3000/",
			"headers" : {
				"token" : "1dbaf0a5a454c5d1cc3f3cf33f6a7cf777a46e4a-4cf9-4a7b-9958-a8010637ecc1"
			},
			"url_params" : {
				"format" : "json"
			}
		},
		"resource": {
			"name" : "user",
			"plural_name" : "users",
			"label" : "User"
		},
		"data": [{
			"username" : "aleksandrus",
			"cover" : {
				"picture" : "http://media.mnn.com/assets/images/2016/07/goats-wattles.jpg.838x0_q80.jpg",
				"title" : "A goat"
			},
			"albums" : [{
				"picture" : "http://onehdwallpaper.com/wp-content/uploads/2015/07/Cute-little-White-Rabbit-HD-Wallpaper.jpg",
				"title" : "A rabbit"
			},{
				"picture" : "http://onehdwallpaper.com/wp-content/uploads/2015/07/Cute-little-White-Rabbit-HD-Wallpaper.jpg",
				"title" : "Another rabbit"
			},{
				"picture" : "http://onehdwallpaper.com/wp-content/uploads/2015/07/Cute-little-White-Rabbit-HD-Wallpaper.jpg",
				"title" : "A third rabbit..."
			},{
				"picture" : "http://media.mnn.com/assets/images/2016/07/goats-wattles.jpg.838x0_q80.jpg",
				"title" : "and a goat!"
			}]
		}],
		"tpls" : {

		}
	},
	userms: {
	  attrs: [{
	    name: 'uuid',
	    type: 'id'
	  },{
	    name: 'email',
	    label: 'E-mail',
	    type: 'string'
	  },{
	    name: 'uattr',
	    composition: [{
	      name: 'attr2',
	      type: 'string'
	    },{
	      name: 'attr1',
	      is_array: true,
	      type: 'string'
	    }]
	  }],
	  config: {
	    sufix: 'api/v1/',
	    base_url: 'http://localhost:3000/',
	    headers: {
	      token: '1dbaf0a5a454c5d1cc3f3cf33f6a7cf777a46e4a-4cf9-4a7b-9958-a8010637ecc1'
	    },
	    url_params: {
	      format: 'json'
	    }
	  },
	  resource: {
	    name: 'user',
	    plural_name: 'users',
	    label: 'User',
	    resource_urls: {
	      update: '/:uuid'
	    },
	    /*headers: {
	      update: {
	        header1: 'val header1',
	        header2: 'val header2'
	      },
	      create: {
	        header1: 'val header1',
	        header2: 'val header2'
	      }
	    }*/
	  },
	  tpls: [/*{
	    action: 'list',
	    component: 'CustomTemplate', // or
	    html: 'custom_template.html'
	  }*/],
	  /*data: [{
	    uuid: '48810eb0-4e20-0134-6fae-3888e3812d7c',
	    email: 'email16734@email.com',
	    uattr: {
	      attr2: 10
	    }
	  }];*/
		}
}