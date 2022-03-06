const mutations = {
    setUsuario(state, payload) {
        state.user = payload;
    },
    setPersonalInformacion(state, payload) {
        state.personalInformation = payload;
    },
    setError(state, payload) {
        state.error = payload;
    },
    setModalAuth(state, payload) {
        state.mostrarModalAuth = payload;
    },
};

export default mutations;
