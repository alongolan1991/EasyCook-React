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
}
const api = new ApiService();
export default api;