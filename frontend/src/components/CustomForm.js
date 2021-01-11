import { json } from "body-parser";
import React from "react";

export default class CustomForm extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            repeatPassword: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        var value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });
    }

    handleSubmit() {
        this.props.option === 1 ? this.login() : this.register();
    }

    login() {
        fetch('/login', {
			method: 'POST',
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
			}),
			headers: {
				"Content-type": "application/json"
			}
		}).then(response => {
            return response.json();
        }).then(response => {
            alert(response.message);
        });
    }

    register() {
        fetch('/user/register', {
			method: 'POST',
			body: JSON.stringify({
				email: this.state.email,
                password: this.state.password,
                repeatPassword: this.state.repeatPassword
			}),
			headers: {
				"Content-type": "application/json"
			}
		}).then(response => {
            return response.json();
        }).then(response => {
            alert(response.message);
        });
    }

    render() {
        return (
            <div className='account-form'>
                <div className={'account-form-fields ' + (this.props.option === 1 ? 'login' : 'register') }>
                    <input id='email' onChange={this.handleInputChange} name='email' type='email' placeholder='E-mail' required />
                    <input id='password' onChange={this.handleInputChange} name='password' type='password' placeholder='Password' required={this.props.option === 1 || this.props.option === 2 ? true : false} />
                    <input id='repeatPassword' onChange={this.handleInputChange} name='repeatPassword' type='password' placeholder='Repeat password' required={this.props.option === 2 ? true : false} disabled={this.props.option === 1} />
                </div>
                <button className='btn-submit-form' onClick = {this.handleSubmit}>
                    { this.props.option === 1 ? 'Login' : 'Register' }
                </button>
            </div>
        )
    }
}