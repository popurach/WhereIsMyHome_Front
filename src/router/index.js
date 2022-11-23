import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import QnA from "@/components/qna/QnA";
import Comment from "@/components/qna/QnAComment";
import QnADetail from "@/components/qna/QnADetail";
import QnAInput from "@/components/qna/QnAInput";
import QnAUpdate from "@/components/qna/QnAUpdate";
import KaKaoMap from "@/components/house/KaKaoMap";
import FavoriteList from "@/components/favorite/FavoriteList";
import HouseDetail from "@/components/house/HouseDetail";
import GoogleOauth from "@/components/user/GoogleOauth";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/detail",
        name: "Detail",
        component: () => import("@/views/Detail.vue"),
    },
    {
        path: "/qna",
        name: "QnA",
        component: QnA,
    },
    {
        path: "/comment",
        name: "Comment",
        component: Comment,
    },
    {
        path: "/check",
        name: "CheckPage",
        component: () => import("@/views/CheckPage.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("@/views/Register.vue"),
    },
    {
        path: "/mypage",
        name: "Mypage",
        component: () => import("@/components/user/Mypage.vue"),
    },
    {
        path: "/update",
        name: "Update",
        component: () => import("@/views/Update.vue"),
    },
    {
        path: "/qnadetail",
        name: "QnADetail",
        component: QnADetail,
    },
    {
        path: "/qnainput",
        name: "QnAInput",
        component: QnAInput,
    },
    {
        path: "/qnaupdate",
        name: "QnAUpdate",
        component: QnAUpdate,
    },
    {
        path: "/kakaomap",
        name: "KaKaoMap",
        component: KaKaoMap,
    },
    {
        path: "/housedetail",
        name: "HouseDetail",
        component: HouseDetail,
    },
    {
        path: "/favoritelist",
        name: "FavoriteList",
        component: FavoriteList,
    },
    {
        path: "/oauth/google",
        name: "GoogleOauth",
        component: GoogleOauth,
    },
];

const router = new VueRouter({
    routes,
    mode: "history",
    scrollBehavior() {
        document.getElementById("app").scrollIntoView();
    },
});

export default router;
