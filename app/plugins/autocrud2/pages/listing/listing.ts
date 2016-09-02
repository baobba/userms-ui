import { NavController } from 'ionic-angular'
import { Component, Input } from '@angular/core'
import { Attribute } from '../../models/attribute/attribute.model'

import { ShowPage } from '../showing/showing';
import { CreatePage } from '../creating/creating';
import { UpdatePage } from '../updating/updating';

@Component({
	selector: 'ac2-listing',
	templateUrl: 'build/plugins/autocrud2/templates/listing.html'
})



export class Listing {
	@Input() parsed_attributes: Attribute[];
	@Input() data: Object[];

	listing_attributes: Attribute[] = [];

	MIN_COL_WIDTH = 15; // measurement: 'em'

	constructor(private navCtrl: NavController){ }

	ngOnInit(){
		for(let attr of this.parsed_attributes){
			if(attr.list)
				this.listing_attributes.push(attr);
		}
	}

	selectItem(obj){
		this.navCtrl.push(UpdatePage, {
			selected_item: obj,
			attributes: this.parsed_attributes
		});
	}
}
