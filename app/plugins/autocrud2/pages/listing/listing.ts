import { NavController } from 'ionic-angular'
import { Component, Input } from '@angular/core'
import { Attribute } from '../../models/attribute.model'
import { Resource } from '../../models/resource.model'
import { Config } from '../../models/config.model'

import { ShowPage } from '../showing/showing'
import { CreatePage } from '../creating/creating'
import { UpdatePage } from '../updating/updating'

import { ResourceProvider } from '../../providers/resource.provider'

import { ListItemDirective } from '../../directives/listing/list-item'

@Component({
	selector: 'ac2-listing',
	templateUrl: 'build/plugins/autocrud2/templates/listing/listing.html',
	providers: [ResourceProvider],
	directives: [ListItemDirective]
})



export class Listing {
	@Input() parsed_attributes: Attribute[];
	@Input() data: Object[];
	@Input() config: Config;
	@Input() resource: Resource;

	listing_attributes: Attribute[] = [];

	MIN_COL_WIDTH = 15; // measurement: 'em'

	constructor(private navCtrl: NavController,
		public resProv: ResourceProvider){ }

	ngOnInit(){
		this.resProv.setConfig(this.config);
		this.resProv.setResource(this.resource);

		// get data from server if none was supplied
		if(this.data == null || this.data.length == 0){
			this.resProv.load().subscribe(
				res => {
					// res is an array of [XMLHttpRequest, Object]
					// we want the object. Thus, we need to fetch res[1].
					let dRes = res[1];

					// the data (dRes) may be wrapped (Rails way).
					// so, we check if resource's 'wrap' attribute is true.
					// if so, as we're fetching a list of objects, we'll consider the plural name.
					if(this.resource.wrap){
						if(!!dRes) // don't worry about dRes being 'null' for now.
							dRes = dRes[this.resource.plural_name];
					}

					// check if the dRes is null. If so, throw an error.
					if(dRes == null){
						console.error("Response for listing objects cannot be null. If there are no objects, we expect the server to return an empty array '[]'");
						throw new Error("Unexpected null response");
					}
					// we'll check to see if it's an array. If not, we'll throw an error.
					if(dRes.constructor === Array){
						this.data = dRes;
					} else {
						console.error(`Response for listing objects should be an array. "${typeof dRes}" found`);
						throw new Error(`Unexpected "${typeof dRes}" response`);
					}
				},
				err => {
					console.log("Error!! ", err)
				},
				() => {
					console.log("Finished!!")
				}
			);
		}

		for(let attr of this.parsed_attributes){
			if(attr.list)
				this.listing_attributes.push(attr);
		}
	}

	selectItem(obj){
		this.navCtrl.push(UpdatePage, {
			selected_item: obj,
			attributes: this.parsed_attributes,
			config: this.config,
			resource: this.resource
		});
	}
	newItem(){
		this.navCtrl.push(CreatePage, {
			attributes: this.parsed_attributes,
			config: this.config,
			resource: this.resource
		});
	}
}
