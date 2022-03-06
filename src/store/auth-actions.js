import Swal from "sweetalert2";
import { auth, db } from "../functions/firebase";
import { firebaseErrors } from "../functions/firebase-errors";

const actions = {
    usuarioAutenticado({ commit }) {
        auth.onAuthStateChanged((user) => {
            if (user) {
                const { uid, displayName, email, photoURL: photoUrl } = user;
                const userRef = db.collection("usuarios");
                userRef
                    .where("userId", "==", uid)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const informacionPersonal = {
                                id: doc.id,
                                ...doc.data(),
                            };
                            commit(
                                "setPersonalInformacion",
                                informacionPersonal
                            );
                            commit("setUsuario", {
                                uid,
                                email,
                                displayName,
                                photoUrl,
                                rol: informacionPersonal.rol,
                            });
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un error, vuelva a intentarlo",
                            icon: "error",
                        });
                    });
            } else {
                commit("setUsuario", null);
                commit("setPersonalInformacion", null);
            }
        });
    },
    iniciarSesionAction({ commit }, payload) {
        auth.signInWithEmailAndPassword(payload.email, payload.password)
            .then((currentUser) => {
                const {
                    uid,
                    displayName,
                    email,
                    photoURL: photoUrl,
                    emailVerified,
                } = currentUser.user;

                if (!emailVerified) {
                    Swal.fire({
                        title: "Verificar cuenta!",
                        text:
                            "Verifica tu cuenta por favor, hemos enviadó un mensaje de confirmación a tu email",
                        icon: "warning",
                    });
                    return;
                }

                commit("setModalAuth", false);

                const userRef = db.collection("usuarios");
                userRef
                    .where("userId", "==", uid)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            const informacionPersonal = {
                                id: doc.id,
                                ...doc.data(),
                            };
                            commit(
                                "setPersonalInformacion",
                                informacionPersonal
                            );
                            commit("setUsuario", {
                                uid,
                                email,
                                displayName,
                                photoUrl,
                                rol: informacionPersonal.rol,
                            });
                        });
                    })
                    .catch((error) => {
                        const { code } = error;
                        const { message } = firebaseErrors(code);
                        Swal.fire({
                            title: "Error",
                            text: message,
                            icon: "error",
                        });
                    });
            })
            .catch((error) => {
                const { code } = error;
                const { message } = firebaseErrors(code);
                Swal.fire({
                    title: "Error",
                    text: message,
                    icon: "error",
                });
                commit("setError", { code, message });
            });
    },
    registrarUsuarioAction({ commit }, payload) {
        auth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then((currentUser) => {
                const { uid } = currentUser.user;

                auth.languageCode = "es";
                auth.currentUser
                    .sendEmailVerification()
                    .then(() => {
                        Swal.fire({
                            title: "OK!",
                            text:
                                "Hemos enviadó un mensaje de confirmación  a tu email, por favor revisa la bandeja de entrada de tu cuenta",
                            icon: "success",
                        }).then(() => {
                            const usuario = {
                                userId: uid,
                                ...payload.datosUsuario,
                            };

                            db.collection("usuarios")
                                .add(usuario)
                                .catch(() => {
                                    Swal.fire({
                                        title: "Eror!",
                                        text: "Ocurrio un error en el servidor",
                                        icon: "error",
                                    });
                                });
                        });
                    })
                    .then(() => {
                        commit("setModalAuth", false);
                    });
            })
            .catch(() => {
                Swal.fire({
                    title: "Eror!",
                    text: "Ocurrio un error en el servidor",
                    icon: "error",
                });
            });
    },
    cerrarSesion({ commit }) {
        auth.signOut()
            .then(() => {
                commit("setUsuario", null);
                window.location.href = "/";
            })
            .catch((error) => {
                commit("setError", error);
            });
    },
    mostrarModalAuth({ commit }) {
        commit("setModalAuth", true);
    },
    ocultarModalAuth({ commit }) {
        commit("setModalAuth", false);
    },
};

export default actions;
