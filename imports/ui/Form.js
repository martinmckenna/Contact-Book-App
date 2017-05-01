import React, {Component} from 'react';
import '../../client/main.css';

class Form extends Component {
    render() {
        return (
            <form className="form" id="addform" name="addform" onSubmit={this.props.onSubmit}>
                <input type="text" name="fname" placeholder="First name" required/>
                <input type="text" name="lname" placeholder="Last name" required/>
                <input type="email" name="email" placeholder="email" required/>
                <input type="input" name="address" placeholder="address" required/>
                <input type="tel" name="phone" placeholder="phone number" required/>
                <input type="submit" id="submitbtn" value="Submit"/>
                <button type="button" id="closebtn" onClick={this.props.onClick}>
                    Close</button>
            </form>
        );
    }
}

export default Form;