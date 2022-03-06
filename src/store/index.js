import Vue from "vue";
import Vuex from "vuex";
import mutations from "./auth-mutations";
import actions from "./auth-actions";
import getters from "./auth-getters";

Vue.use(Vuex);

const dataInitUser = {
    user: null,
    personalInformation: null,
    error: null,
};

export default new Vuex.Store({
    state: { ...dataInitUser, mostrarModalAuth: false },
    mutations: mutations,
    actions: actions,
    getters: getters,
});
