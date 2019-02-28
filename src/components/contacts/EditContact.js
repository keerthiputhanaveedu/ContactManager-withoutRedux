import React, { Component } from 'react';
import TextInputGroup from '../layout/TextInputGroup';
//import uuid from 'uuid';
import { Consumer } from '../../context';
import axios from 'axios';

class EditContact extends Component {

    state = {
        name: '',
        email: '',
        phone:'',
        errors: {}
    }

    async componentDidMount(){
        const { id } = this.props.match.params;

        const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

        const editContact = res.data;

        this.setState({
            name: editContact.name,
            email: editContact.email,
            phone: editContact.phone
        });

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

        const updateContact = {
            name,
            email,
            phone
        }

        const { id } = this.props.match.params;

        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updateContact);
        disptach({type: 'UPDATE_CONTACT', payload: res.data});

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
                            <div className="card-header">Edit Contact</div>
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
                                        value="Update Contact"
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

export default EditContact;