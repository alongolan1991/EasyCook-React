import React from 'react';
import Header from '../../components/Header';
import LabeledIcon from '../../components/LabeledIcon/LabeledIcon';
import api from '../../services/api.services';
import Icon from '../../components/Icon';
import { withRouter } from 'react-router-dom';
import Iframe from 'react-iframe';
import './single-recipe.css';
import userPic from '../../sketch/user.png'



class SingleRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeID: props.match.params.recipeid,
            userID: props.match.params.userid,
            name: props.match.params.name,
            recipe: '',
            comments: [],
            isClick: false
        };
        this.commentClick = this.commentClick.bind(this);
        this.addComment = this.addComment.bind(this);
        this.getCommentContent = this.getCommentContent.bind(this);
        this.getRecipeID = this.getRecipeID.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }



    componentWillMount() {
        this.getRecipeID();
    }

    getRecipeID() {
        api.getRecipeByID(this.state.recipeID)
            .then(response => {
                this.setState({
                    recipe: response.data
                });
                this.getCommentContent();
            })
            .catch(error => {
                console.log(error);
            });

    }

    getCommentContent() {
        api.getCommentContent(this.state.recipe.comments)
            .then(response => {
                this.setState({
                    comments: response.data,
                    isClick: false
                })
            })
            .catch(error => {
                console.log(error);
            });

    }

    commentClick() {
        this.setState({
            isClick: true
        })

    }

    deleteComment(commentID) {
        api.deleteComment(this.state.recipeID, commentID, this.state.name)
            .then(response => {
                this.getRecipeID();
            })
            .catch(error => {
                console.log(error);
            });
    }

    addComment(rate, content) {
        api.createComment(this.state.name, rate, content, this.state.recipeID)
            .then(response => {
                this.getRecipeID();
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
                <Iframe url={this.state.recipe.video_steps[0]}
                    width="100%"
                    height="190px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"
                    allowFullScreen
                />
                <div style={{ bottom: '0' }}>
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
                        <div onClick={this.commentClick} className="add-comment">
                            Finished? Add Comment
                        </div>
                        {this.state.isClick && (
                            <div style={{ padding: "5%" }}>
                                <label style={{ color: "#222222" }}> Rate:
                                <select ref="rate" style={{ width: "38px", height: "25px" }}>
                                        <option value="1" >1</option>
                                        <option value="2" selected>2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </label>
                                <br /><br />
                                <label style={{ color: "#222222" }}> Leave your comment here:
                                    <br />
                                    <textarea className="comment-content" ref={
                                        (input) => {
                                            this.commentContent = input;
                                        }
                                    } />
                                </label>
                                <br />
                                <button type="button" className="update-comment" onClick={() => this.addComment(this.refs.rate.value, this.commentContent.value)}>send</button>
                            </div>



                        )}
                        <h4 className="comment-header">Discustion</h4 >
                        {this.state.comments.map((comment, index) => {
                            return (
                                <div className="comment-item">
                                {comment.user_name === this.state.name && (
                                    <div className="bin-icon" onClick={() => this.deleteComment(comment._id)}>
                                        <Icon name="bin" />
                                    </div>
                                )}
                                    <div style={{ display: 'flex' }}>
                                        <img alt="" src={userPic} style={{ width: '50px', height: '50px' }} />
                                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '15px' }}>
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