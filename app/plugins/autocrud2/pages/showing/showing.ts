import { NavController, NavParams } from 'ionic-angular'
import { Component } from '@angular/core'
import { Attribute } from '../../models/attribute/attribute.model'
import { helper } from '../../helper'

@Component({
	templateUrl: 'build/plugins/autocrud2/templates/creating.html'
})

export class ShowPage {
	attributes: Attribute[];
	item: Object;

	constructor(private navCtrl: NavController,
		public navParams: NavParams){

		this.attributes = navParams.get('attributes');
		this.item = navParams.get('selected_item');
	}
}