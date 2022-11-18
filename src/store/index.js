import Vue from "vue";
import Vuex from "vuex";
import http from "../api/http";
import createPersistedState from "vuex-persistedstate";

//모든 컴포넌트에서 this.$store라는 값으로 store에 접근 가능
Vue.use(Vuex);

const store = new Vuex.Store({
    //data
    // TODO: 로그인 유지 state
    state: {
        userId: "",
        userPass: "",
        sidos: [{ value: null, text: "선택하세요" }],
        guguns: [{ value: null, text: "선택하세요" }],
        dongs: [{ value: null, text: "선택하세요" }],
        apts: [{ value: null, text: "선택하세요" }],
        houses: [],
        house: null,
        qna: [],
        detailqna: {},
        map: null
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
            return state.map
        }
    },
    actions: {
        loginAction: (store, payload) => {
            store.commit("loginMutation", payload);
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
            const params = { sidoName: sidoName };
            console.log(params);
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
            console.log(sidoName);
            console.log(gugunName);
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
        QnAListAction() {
            http.get("/qna").then((response) => {
                store.commit("QnAListMutation", { qna: response.data });
            });
        },
        QnASearchAction: (store, payload) => {
            http.get(`/qna/search/${payload}`).then((response) => {
                store.commit("QnASearchMutation", { search: response.data });
            });
        },
        getApt({ commit }, { sidoName, gugunName, dongName }) {
            console.log(sidoName);
            console.log(gugunName);
            console.log(dongName);
            http.post("/getInfo", {
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
        },
        detailQnA({ commit }, payload) {
            commit("QnADetail", { detail: payload });
        },
        mapInitializeAction({ commit }, payload) {
            
            console.log('in action' , commit , payload)
            commit("mapInitalize" , payload)
        }
    },
    mutations: {
        loginMutation: (state, payload) => {
            (state.userId = payload.id), (state.userPass = payload.pass);
        },
        logoutMutation: (state) => {
            state.userId = "";
            state.userPass = "";
            this.$router.push("/");
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
        SET_APT_LIST(state, apts) {
            apts.forEach((apt) => {
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

            console.log('in mutation' , state , payload)
            state.map = payload;
        }
    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
        }),
    ],
});
export default store;
