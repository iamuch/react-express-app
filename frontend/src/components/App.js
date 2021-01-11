import React from 'react';
import '../sass/app.scss';
import CustomForm from './CustomForm';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      option: 1,
      users: []
    }

    this.setOption.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    fetch('/users')
    .then(
        response =>
        response.ok
            ? response.json()
            : Promise.reject(`Cannot communicate with the mocked API server (${response.statusText})`),
    )
    .then(users => {
        this.setState({users});
    });
  }

  setOption(option) {
    this.setState({option});
  }

  render() {
    return (
      <div className='container'>
        <header>
          <div className={'header-headings ' + (this.state.option === 1 ? 'login' : 'register') }>
            <span>Login</span>
            <span>Registration</span>
          </div>
        </header>
        <ul className='options'>
          <li className={this.state.option === 1 ? 'active' : ''} onClick={() => this.setOption(1)}>Login</li>
          <li className={this.state.option === 2 ? 'active' : ''} onClick={() => this.setOption(2)}>Register</li>
        </ul>
        <CustomForm option={this.state.option} users={this.state.users}/>
      </div>
    );
  }
}
