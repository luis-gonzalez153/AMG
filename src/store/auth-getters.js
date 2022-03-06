const getters = {
    obtenerUsuario(state) {
        return state.user;
    },
    obtenerInformacionPersonal(state) {
        return state.personalInformation;
    },
    usuarioAutenticado(state) {
        return !!state.user;
    },
    obtenerError(state) {
        return state.error;
    },
    mostrarModalAuth(state) {
        return state.mostrarModalAuth;
    },
};

export default getters;
