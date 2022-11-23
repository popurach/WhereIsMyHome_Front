import Vue from "vue";
import Vuex from "vuex";
import http from "../api/http";
import createPersistedState from "vuex-persistedstate";
import jwtDecode from "jwt-decode";
import router from "@/router/index";

//모든 컴포넌트에서 this.$store라는 값으로 store에 접근 가능
Vue.use(Vuex);

const store = new Vuex.Store({
    //data
    // TODO: 로그인 유지 state
    state: {
        userId: "",
        userPass: "",
        num: 999,
        sidos: [{ value: null, text: "선택하세요" }],
        guguns: [{ value: null, text: "선택하세요" }],
        dongs: [{ value: null, text: "선택하세요" }],
        apts: [{ value: null, text: "선택하세요" }],
        houses: [],
        house: null,
        qna: [],
        detailqna: {},
        map: null,
        IS_LOGIN: false,
        IS_TOKEN_VALID: false,
        favorites: [],
    },
    getters: {
        loginGetter(state) {
            return state.userId;
        },
        QnAListGetter(state) {
            return state.qna;
        },
        QnADetailGetter(state) {
            return state.detailqna;
        },
        mapGetter(state) {
            return state.map;
        },
        HousesGetter(state) {
            return state.houses;
        },
        FavoriteListGetter(state) {
            return state.favorites;
        },
    },
    actions: {
        googleLoginAction: (store, payload) => {
            store.commit("SET_IS_LOGIN", true);
            store.commit("SET_IS_TOKEN_VALID", true);

            sessionStorage.setItem("accessToken", payload.access);
            sessionStorage.setItem("refreshToken", payload.refresh);

            // TODO: google login id 보내주기
            store.commit("getUserId", { accessToken: payload.access });

            alert("로그인 성공했습니다.");
            router.push("/");
        },
        loginAction: (store, payload) => {
            // accessToken, refreshToken 받기
            http.post("http://localhost/login", payload)
                .then(({ data }) => {
                    if (data.message === "success") {
                        let accessToken = data["access-token"];
                        let refreshToken = data["refresh-token"];

                        store.commit("SET_IS_LOGIN", true);
                        store.commit("SET_IS_TOKEN_VALID", true);

                        sessionStorage.setItem("accessToken", accessToken);
                        sessionStorage.setItem("refreshToken", refreshToken);

                        store.commit("loginMutation", payload);

                        console.log(accessToken);
                        alert("로그인 성공했습니다.");
                        router.push("/");
                    } else {
                        store.commit("SET_IS_LOGIN", false);
                        store.commit("SET_IS_TOKEN_VALID", false);
                        // 로그인 정보가 정확하지 않음
                        alert("id와 비밀번호를 다시 확인해주세요.");
                        router.go();
                    }
                })
                .catch((error) => console.log(error));
        },
        logoutAction: (store, payload) => {
            store.commit("logoutMutation");
        },
        getSido({ commit }) {
            http.get(`/getSidolist`)
                .then(({ data }) => {
                    console.log(data);
                    commit("SET_SIDO_LIST", data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getGugun({ commit }, sidoName) {
            http.get("/getGunguList/" + sidoName)
                .then(({ data }) => {
                    console.log(data);
                    commit("SET_GUGUN_LIST", data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getDong({ commit }, { sidoName, gugunName }) {
            http.post("/getDongList", {
                sidoName: sidoName,
                gugunName: gugunName,
            })
                .then(({ data }) => {
                    console.log(data);
                    commit("SET_DONG_LIST", data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        QnAListAction(store) {
            http.get("/qna")
                .then((response) => {
                    store.commit("QnAListMutation", { qna: response.data });
                })
                .catch((error) => {
                    // TODO: accessToken이 만료되었는지 로그인이 필요한지 확인
                    if (error.response.status === 500) {
                        if (this.state.userId === "") {
                            // 로그인 해야함!
                            alert("로그인이 필요한 페이지입니다.");
                            router.push("/");
                        }
                    }
                    store.commit("GenerateAccessToken");
                });
        },
        QnASearchAction: (store, payload) => {
            http.get(`/qna/search/${payload}`, {
                headers: {
                    Authorization: sessionStorage.getItem("accessToken"),
                },
            }).then((response) => {
                store.commit("QnASearchMutation", { search: response.data });
            });
        },
        async getApt({ commit }, { sidoName, gugunName, dongName }) {
            await http
                .post("/getInfo", {
                    sidoName: sidoName,
                    gugunName: gugunName,
                    dongName: dongName,
                })
                .then(({ data }) => {
                    console.log(data);
                    commit("SET_APT_LIST", data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getHouseList({ commit }, { sidoName, gugunName, dongName, aptName }) {
            if (sidoName && gugunName && dongName && aptName) {
                http.post("/getSearch", {
                    sidoName: sidoName,
                    gugunName: gugunName,
                    dongName: dongName,
                    aptName: aptName,
                })
                    .then(({ data }) => {
                        console.log(data);
                        commit("SET_HOUSE_LIST", data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        },
        getFavoriteList({ commit }, userId) {
            http.get("/favorite/" + userId)
                .then(({ data }) => {
                    console.log(data);
                    commit("SET_FAVORITE_LIST", data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        detailQnA({ commit }, payload) {
            commit("QnADetail", { detail: payload });
        },
        mapInitializeAction({ commit }, payload) {
            console.log("in action", commit, payload);
            commit("mapInitalize", payload);
        },
    },
    mutations: {
        getUserId: (state, payload) => {
            let decodeToken = jwtDecode(payload.accessToken);
            state.userId = decodeToken.id;
        },
        loginMutation: (state, payload) => {
            state.userId = payload.id;
            state.userPass = payload.pass;
        },
        logoutMutation: (state) => {
            http.get(`/logout/${state.userId}`).then(({ data }) => {
                if (data.message === "success") {
                    alert("로그아웃 되었습니다.");
                    state.userId = "";
                    state.userPass = "";
                } else {
                    alert("로그아웃 실패했습니다.");
                }
            });
        },
        GenerateAccessToken: (state, payload) => {
            // refresh Token 확인하여 accessToken 재발급
            http.get(`/retoken/${state.userId}`)
                .then(({ data }) => {
                    if (data.message === "success") {
                        sessionStorage.setItem(
                            "accessToken",
                            data["access-token"]
                        );
                        router.go();
                    } else {
                        alert(
                            "accessToken 재발급에 실패했습니다. 다시 로그인해주십시오."
                        );
                        store.commit("SET_IS_LOGIN", false);
                        store.commit("SET_IS_TOKEN_VALID", false);
                        router.push("/login");
                    }
                })
                .catch((error) => {
                    alert(error);
                });
        },
        SET_SIDO_LIST(state, sidos) {
            sidos.forEach((sido) => {
                state.sidos.push({ value: sido, text: sido });
            });
        },
        SET_GUGUN_LIST(state, guguns) {
            guguns.forEach((gugun) => {
                state.guguns.push({ value: gugun, text: gugun });
            });
        },
        SET_DONG_LIST(state, dongs) {
            dongs.forEach((dong) => {
                state.dongs.push({ value: dong, text: dong });
            });
        },
        async SET_APT_LIST(state, apts) {
            await apts.forEach((apt) => {
                state.apts.push({ value: apt.aptName, text: apt.aptName });
            });
            state.houses = apts;
        },
        CLEAR_SIDO_LIST(state) {
            state.sidos = [{ value: null, text: "선택하세요" }];
        },
        CLEAR_GUGUN_LIST(state) {
            state.guguns = [{ value: null, text: "선택하세요" }];
        },
        CLEAR_DONG_LIST(state) {
            state.dongs = [{ value: null, text: "선택하세요" }];
        },
        CLEAR_APT_LIST(state) {
            state.apts = [{ value: null, text: "선택하세요" }];
        },
        CLEAR_HOUSE_LIST(state) {
            state.houses = [];
            state.house = null;
        },
        CLEAR_FAVORITE_LIST(state) {
            state.favorites = [];
        },
        SET_HOUSE_LIST(state, houses) {
            state.houses = houses;
        },
        SET_DETAIL_HOUSE(state, house) {
            state.house = house;
        },
        QnAListMutation: (state, payload) => {
            state.qna = payload.qna;
        },
        QnASearchMutation: (state, payload) => {
            state.qna = payload.search;
        },
        QnADetail: (state, payload) => {
            state.detailqna = payload.detail;
        },
        initializeMap: (state, payload) => {
            console.log("in mutation", state, payload);
            state.map = payload;
        },
        SET_IS_LOGIN: (state, payload) => {
            state.IS_LOGIN = payload;
        },
        SET_IS_TOKEN_VALID: (state, payload) => {
            state.IS_TOKEN_VALID = payload;
        },
        SET_FAVORITE_LIST: (state, favorites) => {
            favorites.forEach((favorite) => {
                state.favorites.push(favorite);
            });
        },
    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
        }),
    ],
});
export default store;
