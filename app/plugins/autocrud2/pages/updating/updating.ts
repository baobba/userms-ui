import { NavController, NavParams } from 'ionic-angular'
import { Component } from '@angular/core'
import { Attribute } from '../../models/attribute.model'
import { Resource } from '../../models/resource.model'
import { Config } from '../../models/config.model'
import { helper } from '../../helper'

import { FormComponent } from '../../components/form/form.component'

@Component({
	templateUrl: 'build/plugins/autocrud2/templates/updating.html',
	directives: [FormComponent]
})

export class UpdatePage {
	attributes: Attribute[];
	selected_item: Object;
	config: Config;
	resource: Resource;

	constructor(private navCtrl: NavController,
		public navParams: NavParams){

		// clone this attribute so we won't change the actual data.
		this.selected_item = helper.clone(navParams.get('selected_item'));
		
		this.attributes = navParams.get('attributes');
		this.resource = navParams.get('resource');
		this.config = navParams.get('config');
	}

	cancel(){
		this.navCtrl.pop();
	}
}