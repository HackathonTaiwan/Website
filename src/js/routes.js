var LandingPage = require('./components/LandingPage.jsx');
var ForgotPage = require('./components/ForgotPage.jsx');
var SignInPage = require('./components/SignInPage.jsx');
var SignUpPage = require('./components/SignUpPage.jsx');
var SettingsPage = require('./components/SettingsPage.jsx');
var NotFoundPage = require('./components/NotFoundPage.jsx');
var ResetPasswordPage = require('./components/ResetPasswordPage.jsx');

module.exports = [
	{
		path: '/404',
		handler: NotFoundPage
	},
	{
		path: '/',
		handler: LandingPage
	},
	{
		path: '/HackathonMap',
		handler: require('./components/HackathonMapPage.jsx')
	},
	{
		path: '/hackathon/reg',
		handler: require('./components/HackathonRegPage.jsx')
	},
	{
		path: '/event/:id',
		handler: require('./components/EventPage.jsx')
	},
	{
		path: '/event/:id/join',
		handler: require('./components/JoinEventPage.jsx')
	},
	{
		path: '/hackathon/room',
		handler: require('./components/HackathonRoomPage.jsx')
	},
	{
		allow: 'user.access',
		path: '/hackathon/room/:id',
		handler: require('./components/HackathonRoomPage.jsx')
	},
	{
		path: '/signin',
		handler: SignInPage
	},
	{
		path: '/forgot',
		handler: ForgotPage
	},
	{
		path: '/reset_password/:userid/:token',
		handler: ResetPasswordPage
	},
	{
		path: '/signup',
		handler: SignUpPage
	},
	{
		path: '/settings',
		redirect: '/settings/profile'
	},
	{
		path: '/settings/:category',
		handler: SettingsPage
	},
	{
		allow: 'admin.access',
		path: '/admin',
		redirect: '/admin/dashboard'
	},
	{
		allow: 'admin.access',
		path: '/admin/dashboard',
		handler: require('./components/Admin/Dashboard.jsx')
	},
	{
		allow: 'admin.users',
		path: '/admin/users',
		handler: require('./components/Admin/Users.jsx')
	},
	{
		allow: 'admin.users',
		path: '/admin/users/user/:userid',
		handler: require('./components/Admin/User.jsx')
	},
	{
		allow: 'admin.roles',
		path: '/admin/roles',
		handler: require('./components/Admin/Roles.jsx')
	},
	{
		allow: 'admin.roles',
		path: '/admin/roles/role/:roleid',
		handler: require('./components/Admin/Role.jsx')
	}
];
