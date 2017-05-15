import React, {Component} from 'react';
import '../../client/main.css';
import Toast from './Toast.js';
import {ToastContainer} from 'react-toastify';
import {toast} from 'react-toastify';

import {Collection} from '../api/entries.js';

const style = {}

class Entries extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editing: false,
            class: ""
        };
    }
    remove() {
        Meteor.call('entries.remove', this.props.entry._id); //remove entire entry where the id matches
        toast(<Toast className="toast" whatUpdate="deleted" name={this.props.entry.fname}/>);
    }
    edit() {
        this.setState({editing: true}); //show the editing form
    }
    save(e) {
        e.preventDefault();
        Meteor.call('entries.update', this.props.entry._id, this.refs.newFName.value, this.refs.newLName.value, this.refs.newEmail.value, this.refs.newAddress.value, this.refs.newPhone.value);
        this.setState({editing: false});
        toast(<Toast
            className="toast"
            whatUpdate="updated"
            name={this
            .refs
            .newFName
            .value
            .trim()}/>);
    }
    componentDidMount() {
        this.setState({class: "backgroundAnimated"});
    }
    renderForm() {
        return (
            <form
                className="form"
                id="form"
                name="addform"
                onSubmit={this
                .save
                .bind(this)}>
                <h2>Editing {this.props.entry.fname}
                    {" " + this.props.entry.lname}</h2>
                <input
                    type="text"
                    name="fname"
                    placeholder="First name"
                    ref="newFName"
                    defaultValue={this.props.entry.fname}
                    required/>
                <input
                    type="text"
                    name="lname"
                    placeholder="Last name"
                    ref="newLName"
                    defaultValue={this.props.entry.lname}
                    required/>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    ref="newEmail"
                    defaultValue={this.props.entry.email}
                    required/>
                <input
                    type="input"
                    name="address"
                    placeholder="address"
                    ref="newAddress"
                    defaultValue={this.props.entry.address}
                    required/>
                <input
                    type="tel"
                    name="phone"
                    pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
                    title="Must be a valid 10-digit telephone number!"
                    placeholder="phone number"
                    ref="newPhone"
                    defaultValue={this.props.entry.phone}
                    required/>
                <input type="submit" id="submitbtn" value="Save"/>
            </form>
        )
    }
    renderEntry() {
        return (
            <div ref="newEntry" className={this.state.class + " entryContain"}>
                <div className="contactContain">
                    <h1>{this.props.entry.fname} {this.props.entry.lname}</h1>
                    <p>
                        <strong>
                            <em>Email:
                            </em>
                        </strong>
                        {" " + this.props.entry.email}</p>
                    <p>
                        <strong>
                            <em>Address:
                            </em>
                        </strong>
                        {" " + this.props.entry.address}</p>
                    <p>
                        <strong>
                            <em>Phone:
                            </em>
                        </strong>
                        {" " + this.props.entry.phone}</p>
                </div>
                <button
                    className="entryBtn"
                    type="button"
                    onClick={this
                    .edit
                    .bind(this)}>Edit</button>
                <button
                    className="entryBtn"
                    type="button"
                    onClick={this
                    .remove
                    .bind(this)}>Delete</button>
            </div>

        )
    }
    render() {
        return (this.state.editing)
            ? this.renderForm()
            : this.renderEntry()
    }
}

export default Entries;
