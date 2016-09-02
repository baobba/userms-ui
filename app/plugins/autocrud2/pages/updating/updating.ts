import { NavController, NavParams } from 'ionic-angular'
import { Component } from '@angular/core'
import { Attribute } from '../../models/attribute/attribute.model'
import { helper } from '../../helper'

import { FormComponent } from '../../components/form/form.component'

@Component({
	templateUrl: 'build/plugins/autocrud2/templates/updating.html',
	directives: [FormComponent]
})

export class UpdatePage {
	attributes: Attribute[];
	selected_item: Object;

	constructor(private navCtrl: NavController,
		public navParams: NavParams){

		this.attributes = navParams.get('attributes');
		this.selected_item = navParams.get('selected_item');
	}

	cancel(){
		this.navCtrl.pop();
	}
}