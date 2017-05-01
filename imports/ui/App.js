import React, {Component} from 'react';
import '../../client/main.css';
import AddBtn from './AddBtn.js';
import Entries from './Entries.js';

import {createContainer} from 'meteor/react-meteor-data';

import {Collection} from '../api/entries.js';

class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            formVisible: false
        };
    };
    showForm = () => {
        this.setState({formVisible: true});
    }
    hideForm = () => {
        this.setState({formVisible: false});
    }
    handleSubmit = e => {
        e.preventDefault(); //prevent form from refreshing the page
        var myForm = document.getElementById('addform');
        const fname = this
            .refs
            .fname
            .value
            .trim();
        const lname = this
            .refs
            .lname
            .value
            .trim();
        const email = this
            .refs
            .email
            .value
            .trim();
        const address = this
            .refs
            .address
            .value
            .trim();
        const phone = this
            .refs
            .phone
            .value
            .trim();

        Collection.insert({
            fname,
            lname,
            email,
            address,
            phone,
            createdAt: new Date(), // current time
        });
        myForm.reset(); //reset the input fields onsubmit
    }
    renderEntries() {
        return this
            .props
            .entries
            .map((entry) => (<Entries key={entry._id} entry={entry}/>)); //entries was passed to App as a prop at the bottom of this file. entries are in the collection
    }
    render() {
        return (
            <div className="header">
                <h1 id="p2">Contact Book</h1>
                <form className="search">
                    <input type="text" name="search" placeholder="Search by last name"/>
                    <button type="button">Search</button>
                </form>
                {this.state.formVisible
                    ? <form className="form" id="addform" name="addform" onSubmit={this.handleSubmit}>
                            <input ref="fname" type="text" name="fname" placeholder="First name" required/>
                            <input ref="lname" type="text" name="lname" placeholder="Last name" required/>
                            <input ref="email" type="email" name="email" placeholder="email" required/>
                            <input
                                ref="address"
                                type="input"
                                name="address"
                                placeholder="address"
                                required/>
                            <input ref="phone" type="tel" name="phone" placeholder="phone number" required/>
                            <input type="submit" id="submitbtn" value="Submit"/>
                            <button type="button" id="closebtn" onClick={this.hideForm}>
                                Close</button>
                        </form>
                    : this.state.formVisible === false
                        ? <AddBtn onClick={this.showForm}/>
                        : ""
}
                {this.renderEntries()}
            </div>
        );
    }
}

export default createContainer(() => {
    return {
        entries: Collection.find({}) //passing entries as a prop to App and then getting all the contacts in the collection
            .fetch()
    };
}, App);
