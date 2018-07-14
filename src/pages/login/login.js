import React from 'react';
import Header from '../../components/Header';
import small_logo from '../../sketch/easy-logo-small.svg';
import axios from 'axios';
import LabeledIcon from '../../components/LabeledIcon/LabeledIcon';
import api from '../../services/api.services';
import Icon from '../../components/Icon';
import { withRouter } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import './login.css';


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            blocklist: false,
            user: '',
            autoload: false
        }
        this.responseFacebook = this.responseFacebook.bind(this);
        this.renderlogin = this.renderlogin.bind(this);
        this.renderform = this.renderform.bind(this);
        this.updateblocklist = this.updateblocklist.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle = (response) => {
        console.log(response);
      }

    responseFacebook = (response) => {
        console.log(response);
        api.createUser(response.name, response.email)
            .then(response1 => {
                if (response1.data.password === "0") {
                    this.setState({
                        blocklist: true,
                        user: response1.data,
                        autoload: true
                    })
                }
                else {
                    this.props.history.push(`/home/${response1.data._id}/${response1.data.full_name}`);
                }
            })
            .catch(error => {
                console.log(error);
            });

    }

    updateblocklist() {
        api.setUserBlockList(this.state.user._id, this.refs.gluten.checked, this.refs.lactose.checked, this.refs.peanuts.checked, this.refs.fast.checked, this.refs.diet.checked)
            .then(response1 => {
                this.setState({
                    blocklist: false
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderform() {
        console.log(this.state.user);
        return (
            <div>
                <Header justifyContent="center">
                    <img src={small_logo} />
                </Header>
                <h3>Welcome {this.state.user.full_name} </h3>
                <h4 style={{ textAlign: 'center' }}>Are you allergic to certain foods?</h4>
                <form>
                    <div className="block-list-div">
                        <label className="container"> Lactose
                        <input type="checkbox" ref="lactose" />
                            <span class="checkmark"></span>
                        </label>
                        <label className="container"> Gluten
                        <input type="checkbox" ref="gluten" />
                            <span class="checkmark"></span>
                        </label>
                        <label className="container"> Peanuts
                        <input type="checkbox" ref="peanuts" />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <h4 style={{ textAlign: 'center' }}>How would you like to arrange your recipes?</h4>
                    <div className="block-list-div">
                        <label className="container"> Diet
                        <input type="checkbox" ref="diet" />
                            <span class="checkmark"></span>
                        </label>
                        <label className="container"> Fast
                        <input type="checkbox" ref="fast" />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <button className="update-button" type="button" onClick={() => this.updateblocklist()}>update</button>
                </form>
            </div>
        );
    }

    renderlogin() {
        return (
            <div>
                <Header justifyContent="center">
                    <img src={small_logo} />
                </Header>
                <h2 style={{ textAlign: 'center' }}>Welcome to Easy Cook</h2>
                <FacebookLogin
                    appId="791617204560345"
                    fields="name,email,picture"
                    className="facebook-button"
                    callback={this.responseFacebook}
                    autoLoad={this.state.autoload}
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>This is my custom FB button</button>
                    )}
                />

                <GoogleLogin
                    clientId="427996517537-n49776f8rf63c8su4log1cussk96ijs9.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                />
            </div>
        );
    }



    render() {
        console.log(this.state.blocklist);
        return (
            this.state.blocklist ? this.renderform() : this.renderlogin()
        );

    }
}

export default withRouter(Login);