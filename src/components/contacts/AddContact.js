import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
//import uuid from 'uuid';
import { Consumer } from '../../context';
import axios from 'axios';

class AddContact extends Component {

    state = {
        name: '',
        email: '',
        phone:'',
        errors: {}
    }

    onSubmit = async (disptach, e) => {
        e.preventDefault();

        const { name, email, phone } = this.state;

        //check for validation erros
        if (name === ''){
            this.setState({
                errors: {name: 'Name is Required'}
            });
            return;
        }

        if (email === ''){
            this.setState({
                errors: {email: 'Email is Required'}
            });
            return;
        }

        if (phone === ''){
            this.setState({
                errors: {phone: 'Phone Number is Required'}
            });
            return;
        }


        const newContact = {
            //id: uuid(), // no need because db usyally automatically geneartes id
            name,
            email,
            phone
        };

        const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact)
        disptach({ type: 'ADD_CONTACT', payload: res.data });
        // .then(res => disptach({ type: 'ADD_CONTACT', payload: res.data }));

        //regular disptach menthod without http
        //disptach({ type: 'ADD_CONTACT', payload: newContact });

        //clear state
        this.setState({
            name: '',
            email: '',
            phone: '',
            errors: {}
        });

        //redirecting a page after clicking submit to home
        this.props.history.push('/');
    };

    onChange = e => this.setState({[e.target.name]: e.target.value});

    render() {
        const {name, email, phone, errors} =  this.state;
        return (
            <Consumer>
            { value => {
                const { disptach } = value;
                return(
                    <div className="card mb-3">
                            <div className="card-header">Add Contact</div>
                            <div className="card-body">
                                <form onSubmit= {this.onSubmit.bind(this, disptach)}>
                                    <TextInputGroup 
                                            label="Name"
                                            name="name"
                                            placeholder="Enter Name.."
                                            value={name}
                                            onChange= {this.onChange}
                                            error={errors.name}
                                        />
                                    <TextInputGroup 
                                            label="Email"
                                            name="email"
                                            type="email "
                                            placeholder="Enter Email.."
                                            value={email}
                                            onChange= {this.onChange}
                                            error={errors.email}
                                    />
                                    <TextInputGroup 
                                            label="Phone"
                                            name="phone"
                                            placeholder="Enter Phone.."
                                            value={phone}
                                            onChange= {this.onChange}
                                            error={errors.phone}
                                    />
                                    
                                    
                                    <input 
                                        type="submit" 
                                        value="Add Contact"
                                        className = "btn btn-light btn-block"
                                    /> 
                                </form>
                            </div>
                        </div>
                )

            }}
        </Consumer>
        )
    }

}

export default AddContact;