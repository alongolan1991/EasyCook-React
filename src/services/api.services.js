import axios from 'axios';

class ApiService {
    getUserRecipesByStatistics(userID) {
        return axios.post('http://localhost:3000/getUserRecipesByStatistics', {
            userID: userID
        });
    }

    getRecipeByCategory(categoryName) {
        return axios.post('http://localhost:3000/getRecipesByCategory', {
            category: categoryName
        });
    }

    getFavorites(userID) {
        return axios.post('http://localhost:3000/getFavorites', {
            userID: userID
        });
    }

    getRecipeByID(recipeID) {
        return axios.post('http://localhost:3000/getRecipeById', {
            recipeID: recipeID
        });
    }

    getCommentContent(commetnsId) {
        return axios.post('http://localhost:3000/getcommentcontent', {
            commentsid: commetnsId
        });
    }

    createUser(userid, email) {
        return axios.post('http://localhost:3000/createUser', {
            userName: userid,
            password: "111111",
            email: email,
        });
    }

    setUserBlockList(userid, gluten, lactose, peanuts, fast, diet) {
        return axios.post('http://localhost:3000/setUserBlockList', {
            userID: userid,
            gluten: gluten,
            lactose: lactose,
            peanuts: peanuts,
            diet: diet,
            fast: fast
        });
    }
    setStatistics(userid, category) {
        return axios.post('http://localhost:3000/setStatistics', {
            userID: userid,
            category: category
        });

    }

}
const api = new ApiService();
export default api;