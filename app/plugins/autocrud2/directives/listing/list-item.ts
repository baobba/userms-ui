import { Directive, ElementRef, Renderer, Input } from '@angular/core'

import { Attribute } from '../../models/attribute.model'
import { helper } from '../../helper'


@Directive({
	selector: '[ac2-list-item]'
})

export class ListItemDirective {
	elRef: ElementRef;
	rend: Renderer;

	@Input() attr;
	@Input() obj;

	constructor(elRef: ElementRef, rend: Renderer){
		this.elRef = elRef;
		this.rend = rend;
	}

	ngOnInit(){
		console.log(this.elRef, this.rend);
		this.genChild(this.elRef.nativeElement, this.attr, this.obj[this.attr.name]);
	}
	genChild(parent: HTMLElement, attr: Attribute, value: any, handleArray = true){
		if(value == null)
			return;
		let el = this.createElement(parent, attr);
		this.setElementProperties(el, attr, value, handleArray);
	}
	createElement(el: HTMLElement, attr: Attribute): HTMLElement {
		return this.rend.createElement(el, attr.list_tag);
	}
	setElementProperties(el: HTMLElement, attr: Attribute, value: any, handleArray: boolean): void{
		if(attr.is_array && handleArray){
			this.setArrayElementProperties(el, attr, value);
			return;
		}
		
		switch(attr.display){
			case "textual":{
				el.innerText = value;
				break;
			}
			case "link":{
				el['href'] = value;
				el.innerText = !!attr.link_label ? attr.link_label : value;
				break;
			}
			case "file":{
				el['href'] = value;
				el.innerText = !!attr.link_label ? attr.link_label : value;
				break;
			}
			case "image":{
				el['src'] = value;
				break;
			}
			case "icon":{

				break;
			}
			case "composition":{
				let first = true;
				for(let cattr of attr.composition){
					if( !!attr.composition_separator && !first && !!value[cattr.name] ){
						let separatorSpan = this.rend.createElement(el, 'span');
						separatorSpan.innerHTML = attr.composition_separator;
					}
					this.genChild(el, cattr, value[cattr.name]);
					first = false;
				}
				break;
			}
		}

		this.addCss(el, attr);
		this.addStyle(el, attr);
	}
	setArrayElementProperties(el: HTMLElement, attr: Attribute, value: any[]){
		let arrayContainer = this.rend.createElement(el, 'div');
		let first = true;
		for(let item of value){
			if( !!attr.array_separator && !first && !!item ) {
				let separatorSpan = this.rend.createElement(arrayContainer, 'span');
				separatorSpan.innerHTML = attr.array_separator;
			}
			this.genChild(arrayContainer, attr, item, false);
			first = false;
		}
	}
	addCss(el: HTMLElement, attr: Attribute){
		if(attr.display == 'image'){
			el.classList.add('image');
			if(attr.size != '')
				el.classList.add(attr.size);
		}
		for(let css of attr.list_css){
			el.classList.add(css);
		}
	}
	addStyle(el: HTMLElement, attr: Attribute){
		let style = "";
		for(let prop in attr.list_style){
			style += `${prop}:${attr.list_style[prop]};`;
		}
		el.style = <any>style;
	}
}