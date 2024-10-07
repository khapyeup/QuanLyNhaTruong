import authHeader from "./auth_header";

class UserService {
    async getUserBoard() {
        return await fetch("http://localhost:3000/api/" + "user/dashboard", {headers: authHeader()}); 
    }
    async getAdminBoard() {
        return await fetch("http://localhost:3000/api/" + "admin/dashboard", {headers: authHeader()}); 
    }
}
export default new UserService();
