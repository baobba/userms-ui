
export class FormDataItem {
	fd: FormData;
	data_obj: Object;
	files_obj: Object;

	constructor(fd: FormData, data_obj: Object, files_obj: Object = null){
		this.fd = fd;
		this.data_obj = data_obj;
		this.files_obj = files_obj;
	}

	
}