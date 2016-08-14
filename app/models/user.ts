import { Identity } from './identity';

export class User {
	id: string;
	app_id: string;
	email: string;
	uattr: Object;
	uuid: string;

	confirmation_token: string;
	confirmed_at: Date;
	confirmation_sent_at: Date;
	unconfirmed_email: string;

	sign_in_count: number;
	current_sign_in_at: Date;
	last_sign_in_at: Date;
	current_sign_in_ip: string;
	last_sign_in_ip: string;

	reset_password_token: string;

	identities: Identity[];
}