import React from 'react';
import Header from '../../components/Header';
import LabeledIcon from '../../components/LabeledIcon/LabeledIcon';
import api from '../../services/api.services';
import Icon from '../../components/Icon';
import { withRouter } from 'react-router-dom';
import Iframe from 'react-iframe';
import './single-recipe.css';
import userPic from '../../sketch/user.png';





class SingleRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeID: props.match.params.recipeid,
            userID: props.match.params.userid,
            name: props.match.params.name,
            recipe: '',
            comments: [],
        };

    }



    componentWillMount() {
        api.getRecipeByID(this.state.recipeID)
            .then(response => {
                console.log(response.data);
                this.setState({
                    recipe: response.data
                })
                api.getCommentContent(this.state.recipe.comments)
                    .then(response => {
                        console.log(response.data);
                        this.setState({
                            comments: response.data
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });

    }



    render() {
        if (!this.state.recipe) {
            return (
                <div>Lodaing...</div>
            )
        }
        return (
            <div>
                <Header>
                    <button onClick={() => this.props.history.push(`/home/${this.state.userID}/${this.state.name}`)}><Icon name="arrow" /></button>
                    <button><Icon name="favorites" /></button>
                </Header>
                <Iframe url="http://www.youtube.com/embed/xDMP3i36naA"
                    width="100%"
                    height="190px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    allowFullScreen
                />
                <div style={{bottom: '0'}}>
                    <div style={{ borderBottom: '2px solid rgb(157, 157, 157)' }}>
                        <h3>{this.state.recipe.name}</h3>
                        <div className="icon-div">
                            <LabeledIcon row iconName={'calories'} text={`${this.state.recipe.calories} cal`} />
                            <LabeledIcon row iconName={'clock'} text={`${this.state.recipe.preparation_time} min`} />
                            <LabeledIcon row iconName={'ingredients'} text={`${this.state.recipe.calories} ingr`} />
                        </div>

                    </div>
                    <div >
                        <h4 className="ingre-header">Ingredients</h4 >
                        {this.state.recipe.ingredients.map((ingr, index) => {
                            return (
                                <li className="ingre-item">
                                    {ingr}
                                </li>
                            );
                        })}
                    </div>
                    <div className="preparation-div">
                        <h4 className="preparation-header">Directions</h4 >
                        <ol style={{ paddingLeft: '5%' }}>
                            {this.state.recipe.preparation_method.map((prep, index) => {
                                return (
                                    <li className="preparation-item">
                                        {prep}
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                    <div>
                        <div className="add-comment">
                            Finished? Add Comment
                        </div>
                        <h4 className="comment-header">Discustion</h4 >
                        {this.state.comments.map((comment, index) => {
                            return (
                                <div className="comment-item">
                                    <div style={{ display: 'flex' }}>
                                        <img src={userPic} style={{ width: '50px', height: '50px' }} />
                                        <div style={{display: 'flex' , flexDirection: 'column' , marginLeft: '15px'}}>
                                        <p className="comment-details">{comment.user_name}</p>
                                        <p className="comment-details paint-gray">rate: {comment.rate} stars</p>
                                        </div>
                                    </div>
                                    <p className="paint-gray">{comment.content}</p>
                                </div>
                            );
                        })}
                    </div>
                    
                </div>

            </div>
        );

    }
}

export default withRouter(SingleRecipe);