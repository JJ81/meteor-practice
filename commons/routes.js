/**
 * Created by yijaejun on 2016. 3. 25..
 */

Router.configure({
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});

Router.onBeforeAction('loading'); // before every action call show loading template

Router.route('/', {
    name: 'home',
    layoutTemplate: 'homeLayout',
    template: 'home',
    yieldRegions: { // what is this key?
        travelSearch: {to: 'search'}
    }
});

// creating a bus service
Router.route('/create-travel', {
    name: 'createTravel',
    layoutTemplate: 'createTravelLayout',
    template: 'createTravel'
});


//Accounts.config({
//    restrictCreationByEmailDomain: 'school.edu'
//});