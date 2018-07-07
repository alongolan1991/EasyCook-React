import React from 'react';
import Header from '../../components/Header';
import small_logo from '../../sketch/easy-logo-small.svg';
import axios from 'axios';
import LabeledIcon from '../../components/LabeledIcon/LabeledIcon';
import api from '../../services/api.services';
import Icon from '../../components/Icon';
import { withRouter } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blocklist: false,
            user: ''
        }
        this.responseFacebook = this.responseFacebook.bind(this);
        this.renderlogin = this.renderlogin.bind(this);
        this.renderform = this.renderform.bind(this);
        this.updateblocklist = this.updateblocklist.bind(this);
    }

    responseFacebook = (response) => {

        api.createUser(response.name, response.email)
            .then(response1 => {
                if (response1.data.password === "0") {
                    this.setState({
                        blocklist: true,
                        user: response1.data
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

    updateblocklist(){
        api.setUserBlockList(this.state.user._id, this.refs.gluten.checked , this.refs.lactose.checked , this.refs.peanuts.checked , this.refs.fast.checked, this.refs.diet.checked)
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
        return (
            <div>
                <Header justifyContent="center">
                    <img src={small_logo} />
                </Header>
                <form>
                    <label> lactose:
                        <input type="checkbox" ref="lactose" />
                    </label>
                    <br />
                    <label> gluten:
                        <input type="checkbox" ref="gluten" />
                    </label>
                    <br />
                    <label> peanuts:
                        <input type="checkbox" ref="peanuts"/>
                    </label>
                    <br />
                    <label> diet:
                        <input type="checkbox" ref="diet" />
                    </label>
                    <br />
                    <label> fast:
                        <input type="checkbox" ref="fast" />
                    </label>
                    <br />
                    <button type="button" onClick={() => this.updateblocklist()}>update</button>
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
                <FacebookLogin
                    appId="791617204560345"
                    fields="name,email,picture"
                    callback={this.responseFacebook}
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>This is my custom FB button</button>
                    )}
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