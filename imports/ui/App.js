import React, {Component} from 'react';
import '../../client/main.css';
import AddBtn from './AddBtn.js';
import Entries from './Entries.js';
import Toast from './Toast.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import {Meteor} from 'meteor/meteor';
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';

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
    search = () => {
        let searchFormValue = this.refs.search.value;
        var eachEntryContainer = document.getElementsByClassName("entryContain");
        for (let i = 0; i < eachEntryContainer.length; i++) {
            let thisEntry = eachEntryContainer[i];
            if (thisEntry.getElementsByTagName("div")[0].textContent.toLowerCase().includes(searchFormValue.toLowerCase())) { //to lower case because search needs to be case insensitive
                thisEntry.style.display = "block";
            } else {
                thisEntry.style.display = "none";
            }
        }

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
        Meteor.call('entries.insert', fname, lname, email, address, phone); //this method is found in api/entires. All database logic is located there, seperate from the view
        toast(<Toast
            whatUpdate="added"
            className="toast"
            name={this
            .refs
            .fname
            .value
            .trim()}/>);
        myForm.reset(); //reset the input fields onsubmit

    }
    userEntries = (entry) => {
        if (this.props.currentUser) {
            return entry.props.entry.username == Meteor //checks if the logged in username is equal to the username data on the entry
                .user()
                .username;
        } else {
            return;
        }

    }
    renderEntries() {
        return this
            .props
            .entries
            .map((entry) => (<Entries key={entry._id} entry={entry}/>))
            .filter(this.userEntries); //entries was passed to App as a prop at the bottom of this file
    }
    render() {
        return (
            <div className="header">
                <div id="logo"><img id="logoimg" src="../img/book.png"/></div>
                <ToastContainer
                    className="toast-container"
                    closeButton={false}
                    autoClose={1500}
                    position="top-center"/>
                <AccountsUIWrapper/> {this.props.currentUser
                    ? <form className="search">
                            <input
                                ref="search"
                                type="input"
                                name="search"
                                onKeyUp={this
                                .search
                                .bind(this)}
                                placeholder="Begin typing to search"/>
                        </form>
                    : <div></div>
}
                {this.state.formVisible && this.props.currentUser
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
                            <input
                                ref="phone"
                                pattern="^([a-zA-Z,#/ \.\(\)\-\+\*]*[0-9]){7}[0-9a-zA-Z,#/ \.\(\)\-\+\*]*$"
                                title="Please enter a valid phone number!"
                                type="tel"
                                name="phone"
                                placeholder="phone number"
                                required/>
                            <input type="submit" className="submitbtn" value="Submit"/>
                            <button type="button" id="closebtn" onClick={this.hideForm}>
                                Close</button>
                        </form>
                    : this.state.formVisible === false && this.props.currentUser
                        ? <AddBtn onClick={this.showForm}/>
                        : <div
                            style={{
                            margin: 1 + "em"
                        }}>Create an Account or Login</div>
}
                <div className="entryWrapper">{this.renderEntries()}</div>
            </div>
        );
    }
}
export default createContainer(() => {
    return {
        entries: Collection.find({}, {
            sort: {
                fname: 1
            }
        }) //passing entries as a prop to App and then getting all the contacts in the collection
            .fetch(),
        currentUser: Meteor.user()
    };
}, App);
