import user from './user';
import admin from './admin';
import admin_users from './admin_users';
import admin_user from './admin_user';
import admin_dashboard from './admin_dashboard';
import admin_permission from './admin_permission';
import admin_roles from './admin_roles';
import admin_role from './admin_role';
import speakers from './speakers';

export default {
	user: user,
	admin: admin,
	admin_users: admin_users,
	admin_user: admin_user,
	admin_dashboard: admin_dashboard,
	admin_permission: admin_permission,
	admin_roles: admin_roles,
	admin_role: admin_role,
	speakers: speakers,
	hackathon_map: require('./hackathon_map'),
	room: require('./room'),
	event: require('./event'),
	Events: require('./Events'),
	ticket: require('./Ticket'),
	tickets: require('./Tickets'),
	EventRegistration: require('./EventRegistration'),
	EventRegister: require('./EventRegister')
};
