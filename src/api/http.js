import axios from "axios";

// axios 객체 생성

const AxiosInstance = axios.create({
    baseURL: "http://localhost",
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${window.sessionStorage.getItem("accessToken")}`,
    },
});
export default AxiosInstance;
