class AuthService {
    async  login(username, password) {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"username": username, "password": password})
        };
        return await fetch("http://localhost:3000/api/auth/signin", requestOptions)
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
    }
    
    logout() {
        localStorage.removeItem("user");
    }
    
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();