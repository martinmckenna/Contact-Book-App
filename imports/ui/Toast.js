import React, {Component} from 'react';
import '../../client/main.css';

export default class Toast extends Component {
    render() {
        return <div>{this.props.name + " " + this.props.whatUpdate + "!"}</div>
    }
}