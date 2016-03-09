Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL"
});

Template.login.helpers({

});

Template.registerHelper('arrayify',function(obj){
    result = [];
    for (var key in obj) result.push({name:key,value:obj[key]});
    return result;
});

Template.login.events({
    // console.log("this: ", this);
    'change [name="budgeted"]': function(event, context) {
        console.log("this: ", this);
        var id = event.target.id;
        var value = event.target.value;

        // if (value.indexOf('.') === -1) {
        //     value += '.00';
        // } else if (value.indexOf('.') === value.length-2) {
        //     value += '0';
        // } else if (value.indexOf('.') === value.length-1) {
        //     value += '00';
        // }
        console.log(value);
        console.log(event);
        arrayIndex = event.target.parentNode.parentNode.parentNode.parentNode.className;

        Meteor.call("updateCell", value, id, arrayIndex);
    }
});

Template.sidenav.events({
    'click .addAccount': function(event, context) {
        var name = $('#accountName').val()
        var balance = $('#balance').val()
        var type = $('.across').val();
        Meteor.call("addAccount", name, balance, type);
    }
})