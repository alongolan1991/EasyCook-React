import axios from 'axios';

class ApiService {
    getUserRecipesByStatistics(userID) {
        return axios.post('https://easy-cook.herokuapp.com/getUserRecipesByStatistics', {
            userID: userID
        });
    }

    getRecipeByCategory(categoryName) {
        return axios.post('https://easy-cook.herokuapp.com/getRecipesByCategory', {
            category: categoryName
        });
    }

    getFavorites(userID) {
        return axios.post('https://easy-cook.herokuapp.com/getFavorites', {
            userID: userID
        });
    }

    getRecipeByID(recipeID) {
        return axios.post('https://easy-cook.herokuapp.com/getRecipeById', {
            recipeID: recipeID
        });
    }

    getCommentContent(commetnsId) {
        return axios.post('https://easy-cook.herokuapp.com/getcommentcontent', {
            commentsid: commetnsId
        });
    }

    createComment(userName, rate, content, recipeID) {
        return axios.post('https://easy-cook.herokuapp.com/createComment', {
            userName: userName,
            rate: rate,
            content: content,
            recipeID: recipeID
        });
    }

    deleteComment(recipeID, commentID, userName) {
        return axios.post('https://easy-cook.herokuapp.com/deleteComment', {
            userName: userName,
            commentID: commentID,
            recipeID: recipeID
        });
    }

    createUser(userid, email) {
        return axios.post('https://easy-cook.herokuapp.com/createUser', {
            userName: userid,
            password: "111111",
            email: email,
        });
    }

    setUserBlockList(userid, gluten, lactose, peanuts, fast, diet) {
        return axios.post('https://easy-cook.herokuapp.com/setUserBlockList', {
            userID: userid,
            gluten: gluten,
            lactose: lactose,
            peanuts: peanuts,
            diet: diet,
            fast: fast
        });
    }
    setStatistics(userid, category) {
        return axios.post('https://easy-cook.herokuapp.com/setStatistics', {
            userID: userid,
            category: category
        });

    }

    addFavorites(userid, recipeid) {
        return axios.post('https://easy-cook.herokuapp.com/addFavorites', {
            userID: userid,
            recipeID: recipeid
        });

    }

    deleteFavorites(userid, recipeid) {
        return axios.post('https://easy-cook.herokuapp.com/deleteFavorites', {
            userID: userid,
            recipeID: recipeid
        });


    }

}
const api = new ApiService();
export default api;