import React, {Component} from 'react';
import FaPlus from 'react-icons/lib/fa/plus'; //test comment

class AddBtn extends Component {
    render() {
        return (
            <button type="button" id="addbtn" onClick={this.props.onClick}><FaPlus/>&nbsp;Add
            </button>
        );
    }
}

export default AddBtn;