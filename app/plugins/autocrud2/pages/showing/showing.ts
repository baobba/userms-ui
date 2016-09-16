import { NavController, NavParams } from 'ionic-angular'
import { Component } from '@angular/core'
import { Attribute } from '../../models/attribute.model'
import { Resource } from '../../models/resource.model'
import { Config } from '../../models/config.model'
import { helper } from '../../helper'

@Component({
	templateUrl: 'build/plugins/autocrud2/templates/creating.html'
})

export class ShowPage {
	attributes: Attribute[];
	item: Object;
	resource: Resource;
	config: Config;

	constructor(private navCtrl: NavController,
		public navParams: NavParams){

		this.attributes = navParams.get('attributes');
		this.item = navParams.get('selected_item');
		this.attributes = navParams.get('attributes');
		this.resource = navParams.get('resource');
		this.config = navParams.get('config');
	}
}