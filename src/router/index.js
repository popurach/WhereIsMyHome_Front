import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import QnA from "@/components/qna/QnA";
import Comment from "@/components/qna/QnAComment";
import QnADetail from "@/components/qna/QnADetail";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/category",
        name: "Category",
        component: () => import("@/views/Category.vue"),
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
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/qnadetail",
        name: "QnADetail",
        component: QnADetail,
    },
];

const router = new VueRouter({
    routes,
    scrollBehavior() {
        document.getElementById("app").scrollIntoView();
    },
});

export default router;
