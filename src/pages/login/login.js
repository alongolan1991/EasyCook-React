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
        this.renderlogin = this.renderlogin.bind(this);
        this.renderform = this.renderform.bind(this);
        this.updateblocklist = this.updateblocklist.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle = (response) => {
        console.log(response);
        api.createUser(response.profileObj.name, response.profileObj.email)
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
            <div className="loginBg">
                <Header justifyContent="center">
                    <img src={small_logo} />
                </Header>
                <h1 className="header-font">Welcome {this.state.user.full_name} </h1>
                <br/>
                <br/>
                <h3 className="header-font">Are you allergic to certain foods?</h3>
                <form>
                    <div className="block-list-div">
                        <label className="container"> Lactose
                        <input type="checkbox" ref="lactose" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container"> Gluten
                        <input type="checkbox" ref="gluten" />
                            <span className="checkmark"></span>
                        </label>
                        <label className="container"> Peanuts
                        <input type="checkbox" ref="peanuts" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <br/>
                    <br/>
                    <h3 className="header-font">How would you like to arrange your recipes?</h3>
                    <div className="block-list-div">
                        <label className="container"> Diet
                        <input type="checkbox" ref="diet"/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="container"> Fast
                        <input type="checkbox" ref="fast" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <br/>
                    <button className="update-button" type="button" onClick={() => this.updateblocklist()}>Launch</button>
                </form>
            </div>
        );
    }

    renderlogin() {
        return (
            <div className="loginBg">
                    <Header justifyContent="center">
                        <img src={small_logo} />
                    </Header>
                    <br/><br/><br/>
                    <h1 className="header-font">Welcome to Easy Cook</h1>
                    <GoogleLogin
                        clientId="360224907049-frodfgirnrnjhc129ljvt6v38i3t84nb.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        className="google-login"
                        autoLoad={this.state.autoload}
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                    />
            </div>
        );
    }



    render() {
        return (
            this.state.blocklist ? this.renderform() : this.renderlogin()
        );

    }
}

export default withRouter(Login);