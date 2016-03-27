/**
 * Created by yijaejun on 2016. 3. 25..
 */
/*
* we can access this collection both in the server and client
* I don't have to define collections in two places
*
* */

// this is global variable
// this is bad practice, so where it is avoidable, avoid it.
BusServices = new Meteor.Collection("busservices");


