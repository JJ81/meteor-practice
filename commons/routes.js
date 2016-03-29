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
    yieldRegions: {
        // 템플릿 이름 -> 공통 템플릿 내에 위치한 영역이름
        travelSearch: {to: 'searchArea'}
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