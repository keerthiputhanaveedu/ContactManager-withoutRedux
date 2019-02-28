import React, { Component } from 'react';
import PropType from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Contact extends Component {
    // we can aslo do
    //static means its the class propery not the insatnces thats why we use static key word
    // static ropTypes = {
    //     name: PropType.string.isRequired,
    //     email: PropType.string.isRequired,
    //     phone: PropType.string.isRequired
    // }
    state = {
        showContactInfo : false
    };

    onClickDelete = async (id, disptach) => {

        //ww wont use try catch in real life only because we are using test json data from a server
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
        
            disptach({ type: 'DELETE_CONTACT', payload: id });
        } catch(e){
            disptach({ type: 'DELETE_CONTACT', payload: id });
        }

        // axios.delete(`https://jsonplaceholder.typicode.com/users${id}`)
        // .then(res => disptach({ type: 'DELETE_CONTACT', payload: id }));

       // disptach({ type: 'DELETE_CONTACT', payload: id });
    };

    render(){
        const { id, name, email, phone } = this.props.contact;
        const { showContactInfo } = this.state;

        return(
            <Consumer>
                {value => {
                    const { disptach } = value;
                    return (
                    <div className= "card card-body mb-3">
                        <h4>
                            {name}{' '}
                            <i onClick={ () => this.setState({
                                showContactInfo: !this.state.showContactInfo})} 
                                className="fas fa-sort-down" style = {{cursor: 'pointer'}}></i>

                            <i className="fas fa-times"
                                style={{cursor:'pointer', float:'right', color:'red'}}
                                onClick={this.onClickDelete.bind(this, id, disptach)} />
 
                            <Link to={`contact/edit/${id}`}>
                            <i className="fas fa-pencil-alt"
                                style = {{
                                    cursor: 'pointer',
                                    float: 'right',
                                    color: 'black',
                                    marginRight: '1rem'
                                }} />
                            </Link>

                        </h4>

                        {showContactInfo ? <ul className="list-group">
                                        <li className="list-group-item">Email: {email}</li>
                                        <li className="list-group-item">Phone: {phone}</li>
                                </ul> : null}
                    </div>
                    )
                }}
            </Consumer>
        );
    }
};

Contact.propType = {
    contact: PropType.object.isRequired
};

export default Contact;