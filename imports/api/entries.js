import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Collection = new Mongo.Collection('entries');

Meteor.methods({
    'entries.insert' (fname, lname, email, address, phone) {
        check(fname, String); //check if they're strings
        check(lname, String);
        check(email, String);
        check(address, String);
        check(phone, String);

        // Make sure the user is logged in before inserting a task
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Collection.insert({ //insert to the database the new args
            fname,
            lname,
            email,
            address,
            phone,
            createdAt: new Date(), // current time
            owner: Meteor.userId(), // _id of logged in user
            username: Meteor
                .user()
                .username // username of logged in user
        });
    },
    'entries.remove' (entryId) { //function name with the argument
        check(entryId, String); //check that the arg is a string?

        Collection.remove(entryId); //remove the argument
    },
    'entries.update' (entryId, newFname, newLname, newEmail, newAddress, newPhone) {
        check(newFname, String);
        check(newLname, String);
        check(newEmail, String);
        check(newAddress, String);
        check(newPhone, String);

        Collection.update(entryId, {
            $set: {
                fname: newFname,
                lname: newLname,
                email: newEmail,
                address: newAddress,
                phone: newPhone
            }
        });
    }
});