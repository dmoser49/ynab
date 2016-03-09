Accounts.onCreateUser(function(options, user) {
    user.profile = {};
    user.profile.categories = [
        {
            "name": "Immediate Obligations",
            "budgeted": {
                "Rent/Mortgage":[0,0,0],
                "Electric":[0,0,0],
                "Water":[0,0,0],
                "Internet":[0,0,0],
                "Groceries":[0,0,0],
                "Transportation":[0,0,0]
            },
            "total": [0,0,0]
        },
        {
            "name": "True Expenses",
            "budgeted": {
                "Bike Maintanence":[0,0,0], 
                "Auto Maintanence":[0,0,0], 
                "Home Maintenance":[0,0,0], 
                "Home/Renter's Insurance":[0,0,0], 
                "Medical":[0,0,0], 
                "Clothing":[0,0,0], 
                "Gifts":[0,0,0], 
                "Computer Replacement":[0,0,0], 
                "Stuff I Forgot to Budget For":[0,0,0]
            },
            "total": [0,0,0]
        },
        {
            "name": "Debt Payments",
            "budgeted": {
                "Student Loan":[0,0,0],
                "Auto Loan":[0,0,0]
            },
            "total": [0,0,0]
        },
        {
            "name": "Quality of Life Goals",
            "budgeted": {
                "Meditation":[0,0,0],
                "Vacation":[0,0,0],
                "Fitness":[0,0,0],
                "Education":[0,0,0]
            },
            "total": [0,0,0]
        },
        {
            "name": "Just for Fun",
            "budgeted": {
                "Dining Out":[0,0,0],
                "Gaming":[0,0,0],
                "Music":[0,0,0],
               "Fun Money":[0,0,0]
            },
            "total": [0,0,0]
        }
    ];
    return user;
});

Meteor.methods({
    updateCell: function (value, id, arrayIndex) {
        if (!Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        //update changed row
        var name = "profile.categories." + arrayIndex + ".budgeted." + id + ".0";
        var update = {};
        update[name] = value;
        Meteor.users.update({_id: Meteor.userId()}, {$set:update});

        //Get categories object
        var cursor = Meteor.users.find({_id:Meteor.userId}).fetch();

        //Go through cursor object
        cursor.forEach(function(doc) {
            var budgeted = doc.profile.categories[arrayIndex].budgeted;
            var totalBudgeted = 0;
            var totalAvailable = 0;
            //for each item
            for (key in budgeted) {
                //keep track of totals
                totalBudgeted += Number(budgeted[key][0]);
                totalAvailable += (Number(budgeted[key][0]) - Number(budgeted[key][1]));

                //update available
                var available = "profile.categories." + arrayIndex + ".budgeted." + key + ".2";
                var updateAvailable = {};
                updateAvailable[available] = Number(budgeted[key][0]) - Number(budgeted[key][1]);
                Meteor.users.update({_id: Meteor.userId()}, {$set:updateAvailable});
            }

            //update total budgeted
            var name2 = "profile.categories." + arrayIndex + ".total.0";
            var update2 = {};
            update2[name2] = Number(totalBudgeted);
            Meteor.users.update({_id: Meteor.userId()}, {$set:update2});

            //update total available
            var name3 = "profile.categories." + arrayIndex + ".total.2";
            var update3 = {};
            update3[name3] = Number(totalAvailable);
            console.log("update3: ",update3);
            Meteor.users.update({_id: Meteor.userId()}, {$set:update3});
        })
        // Meteor.users.update({_id: Meteor.userId()}, {$set})
    },

    addAccount: function(name, balance, type) {
        console.log("check it account adding!", name, " : ", balance, " : ", type);
    }
});