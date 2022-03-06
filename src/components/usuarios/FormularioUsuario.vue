<template>
    <div>
        <v-form
            @submit.prevent="actualizarPerfilUsuario"
            class="form-card-profile mb-6"
        >
            <v-card elevation="6" width="100%">
                <v-card-title>Usuario</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Usuario"
                                v-model="user.displayName"
                                type="text"
                                hint="Nombre de usuario o nickname (apodo)."
                                clearable
                                required
                                :error-messages="displayNameErrors"
                                @input="$v.user.displayName.$touch()"
                                @blur="$v.user.displayName.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-file-input
                                label="Foto de perfil"
                                v-model="imagen"
                                counter
                                show-size
                                truncate-length="29"
                                prepend-icon="image"
                                v-on:change="subirImagenFireStorage"
                            ></v-file-input>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="d-flex justify-end">
                    <v-btn type="submit" color="blue darken-1" dark
                        ><v-icon left class="mr-1">send</v-icon> Actualizar
                        perfil</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-form>
        <v-form
            v-on:submit.prevent="actualizarInformacionPersonal"
            class="my-6"
        >
            <v-card width="100%" elevation="6">
                <v-card-title>Información personal</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Nombres"
                                type="text"
                                v-model="personalInformation.nombres"
                                prepend-inner-icon="description"
                                clearable
                                required
                                :error-messages="nombresErrors"
                                @input="$v.personalInformation.nombres.$touch()"
                                @blur="$v.personalInformation.nombres.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Apellidos"
                                type="text"
                                v-model="personalInformation.apellidos"
                                prepend-inner-icon="description"
                                clearable
                                required
                                :error-messages="apellidosErrors"
                                @input="
                                    $v.personalInformation.apellidos.$touch()
                                "
                                @blur="
                                    $v.personalInformation.apellidos.$touch()
                                "
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Número de identificación"
                                type="number"
                                v-model="personalInformation.nuip"
                                clearable
                                prepend-inner-icon="fingerprint"
                                required
                                :error-messages="nuipErrors"
                                @input="$v.personalInformation.nuip.$touch()"
                                @blur="$v.personalInformation.nuip.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-select
                                label="Género"
                                :items="selects.generos"
                                item-text="nombre"
                                item-value="value"
                                v-model="personalInformation.genero"
                                clearable
                                required
                                :error-messages="generoErrors"
                                @blur="$v.personalInformation.genero.$touch()"
                            ></v-select>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                type="tel"
                                label="Teléfono"
                                v-model="personalInformation.telefono"
                                clearable
                                prepend-inner-icon="call"
                                required
                                :error-messages="telefonoErrors"
                                @blur="$v.personalInformation.telefono.$touch()"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                label="Dirección"
                                type="text"
                                v-model="personalInformation.direccion"
                                prepend-inner-icon="room"
                                clearable
                                required
                                :error-messages="direccionErrors"
                                @blur="
                                    $v.personalInformation.direccion.$touch()
                                "
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions class="d-flex justify-end">
                    <v-btn type="submit" color="blue darken-1" dark
                        ><v-icon left class="mr-1">send</v-icon> Actualizar
                        información</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-form>
        <v-card class="my-6" elevation="6" width="100%">
            <v-card-title>Cambiar contraseña</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="passwordOld"
                            label="Contraseña actual"
                            type="password"
                            hint="Ingrese su contraseña actual."
                            clearable
                            prepend-inner-icon="vpn_key"
                            :error-messages="passwordOldErrors"
                            @blur="$v.passwordOld.$touch()"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="d-flex align-center">
                        <v-btn
                            @click="valdidarPassword"
                            color="blue-grey darken-1"
                            block
                            dark
                        >
                            <v-icon left class="mr-2">send</v-icon>
                            Validar contraseña</v-btn
                        >
                    </v-col>
                    <v-form class="my-6">
                        <v-col v-if="passwordOldValid">
                            <v-text-field
                                label="Nueva contraseña"
                                type="password"
                                hint="Ingrese la nueva contraseña"
                                clearable
                                prepend-inner-icon="vpn_key"
                            ></v-text-field>
                        </v-col>
                        <v-col v-if="passwordOldValid">
                            <v-text-field
                                label="Repetir contraseña"
                                type="password"
                                hint="Ingrese su contraseña actual."
                                clearable
                                prepend-inner-icon="vpn_key"
                            ></v-text-field>
                        </v-col>
                    </v-form>
                </v-row>
            </v-card-text>
            <v-card-actions class="d-flex justify-end" v-if="passwordOldValid">
                <v-btn color="blue darken-1" dark
                    ><v-icon left class="mr-1">send</v-icon> Actualizar
                    contraseña</v-btn
                >
            </v-card-actions>
        </v-card>
        <div>
            <v-btn @click="mostrarModalVehiculo()" color="blue darken-3" dark>
                <v-icon left>add_circle</v-icon>
                Agregar vehículo
            </v-btn>
        </div>
        <div v-if="personalInformation.vehiculos">
            <v-row
                v-if="Object.values(personalInformation.vehiculos).length > 0"
            >
                <v-col class="my-3" cols="12">
                    <h3>Mis vehículos</h3>
                </v-col>
                <v-col
                    v-for="(vehiculo, index) in personalInformation.vehiculos"
                    :key="index"
                    cols="12"
                    sm="4"
                    md="3"
                    lg="3"
                    class="mr-5 mb-5"
                >
                    <v-card
                        class="position__relative"
                        rounded="lg"
                        elevation="6"
                        width="100%"
                    >
                        <v-avatar
                            class="img__car"
                            rounded
                            width="100px"
                            height="100px"
                        >
                            <v-img
                                :src="vehiculo.imagenUrl"
                                :alt="vehiculo.imagenNombre"
                            >
                            </v-img>
                        </v-avatar>
                        <v-card-title>{{ vehiculo.marca }}</v-card-title>
                        <v-card-text>
                            <v-chip
                                class="mr-2 mt-2 rounded-xl"
                                color="blue darken-2"
                                label
                                text-color="white"
                            >
                                <h4 class="inline mx-1">
                                    Modelo:
                                </h4>
                                <strong>{{ vehiculo.modelo }}</strong>
                            </v-chip>
                            <v-chip
                                class="mr-2 mt-2 rounded-xl"
                                color="purple darken-2"
                                label
                                text-color="white"
                            >
                                <h4 class="inline mx-1">Placa:</h4>
                                <strong>{{ vehiculo.placa }}</strong>
                            </v-chip>
                        </v-card-text>
                        <v-card-actions class="d-flex justify-end">
                            <v-btn
                                fab
                                outlined
                                small
                                icon
                                dark
                                color="grey darken-2"
                                @click="mostrarModalVehiculo(vehiculo)"
                            >
                                <v-icon>edit</v-icon>
                            </v-btn>
                            <v-btn
                                fab
                                outlined
                                small
                                icon
                                dark
                                color="red accent-3"
                                @click="borrarVehiculo(vehiculo)"
                            >
                                <v-icon>delete</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
        <v-dialog v-model="modalVehiculo" max-width="600px" persistent>
            <FormularioVehiculo
                :key="numeroVehiculos"
                v-bind:formularioEditraVehiculo="formularioEditraVehiculo"
                v-bind:keyVehiculo="numeroVehiculos"
                v-bind:idUsuario="personalInformation.id"
                v-bind:datosVehiculo="datosVehiculo"
                @ocultarModalVehiculo="ocultarModalVehiculo"
            />
        </v-dialog>
    </div>
</template>
<script>
    import { mapGetters } from "vuex";
    import { generos } from "../../functions/constantes";
    import { validationMixin } from "vuelidate";
    import {
        required,
        minLength,
        sameAs,
        numeric,
    } from "vuelidate/lib/validators";
    import { auth, db, storage } from "../../functions/firebase";
    import Swal from "sweetalert2";

    export default {
        name: "FormularioUsuario",
        components: {
            FormularioVehiculo: () => import("./FormularioVehiculo.vue"),
        },
        mixins: [validationMixin],
        data() {
            return {
                user: null,
                personalInformation: null,
                passwordOld: "",
                passwordOldValid: false,
                changePassword: {
                    password: "",
                    repeatPassword: "",
                },
                imagen: null,
                selects: {
                    generos: generos,
                },
                modalVehiculo: false,
                numeroVehiculos: null,
                datosVehiculo: null,
                formularioEditraVehiculo: false,
            };
        },
        validations() {
            return {
                personalInformation: {
                    nuip: {
                        required,
                        numeric,
                    },
                    nombres: {
                        required,
                        minLength: minLength(2),
                    },
                    apellidos: {
                        required,
                        minLength: minLength(3),
                    },
                    genero: {
                        required,
                    },
                    telefono: {
                        required,
                        numeric,
                        minLength: minLength(10),
                    },
                    direccion: {
                        required,
                    },
                },
                user: {
                    displayName: {
                        required,
                    },
                },
                passwordOld: {
                    required,
                },
            };
        },
        methods: {
            borrarVehiculo(vehiculo) {
                Swal.fire({
                    title: "Esta seguro de borrar el vehículo?",
                    showDenyButton: true,
                    showConfirmButton: true,
                    icon: "question",
                    denyButtonText: "No, cancelar",
                    confirmButtonText: "Si, borrar",
                }).then((opcion) => {
                    if (opcion.isDenied) return;

                    delete this.personalInformation.vehiculos[vehiculo.key];
                    const vehiculos = this.personalInformation.vehiculos;

                    db.collection("usuarios")
                        .doc(this.personalInformation.id)
                        .update({
                            vehiculos: vehiculos,
                        })
                        .then(() => {
                            this.personalInformation.vehiculos = vehiculos;

                            storage
                                .ref()
                                .child(`vehiculos/${vehiculo.imagenNombre}`)
                                .delete();

                            Swal.fire({
                                title: "Exíto!",
                                text: "Se elimino el vehículo!",
                                icon: "success",
                            });
                        });
                });
            },
            mostrarModalVehiculo(datosVehiculo = null) {
                this.modalVehiculo = true;
                this.datosVehiculo = datosVehiculo;
                this.numeroVehiculos = datosVehiculo
                    ? datosVehiculo.key
                    : Object.values(this.personalInformation.vehiculos).length;
                this.formularioEditraVehiculo = datosVehiculo ? true : false;
            },
            ocultarModalVehiculo(tipo = "", key, data) {
                switch (tipo) {
                    case "nuevo":
                        this.numeroVehiculos = this.numeroVehiculos + 1;
                        this.personalInformation.vehiculos = {
                            ...this.personalInformation.vehiculos,
                            [key]: data,
                        };
                        break;

                    case "editar":
                        this.personalInformation.vehiculos[key] = data;
                        break;

                    default:
                        break;
                }

                this.modalVehiculo = false;
                this.datosVehiculo = null;
                this.numeroVehiculos = null;
                this.formularioEditraVehiculo = false;
            },
            subirImagenFireStorage(e) {
                if (!e) return;

                this.progressCircle = true;

                const imagen = e;
                imagen.url = URL.createObjectURL(e);
                this.imagen = imagen;
            },
            actualizarPerfilUsuario() {
                this.$v.$touch();
                if (!this.$v.$invalid) return;

                Swal.fire({
                    title: "Guardando cambios",
                    text:
                        "Espere un momento mientras se guardan los cambios...",
                    icon: "info",
                });

                Swal.showLoading();

                if (this.imagen) {
                    const storageRef = storage.ref();

                    const uploadProfileRef = storageRef
                        .child(`profile/${this.imagen.name}`)
                        .put(this.imagen);

                    uploadProfileRef
                        .then((snapshot) => {
                            snapshot.ref.getDownloadURL().then((url) => {
                                this.user.photoUrl = url;

                                const {
                                    displayName,
                                    photoUrl: photoURL,
                                } = this.user;

                                auth.currentUser
                                    .updateProfile({
                                        displayName,
                                        photoURL,
                                    })
                                    .then(() => {
                                        Swal.close();

                                        Swal.fire({
                                            title: "Exíto",
                                            text:
                                                "Se ha actualizado el perfil del usurio!",
                                            icon: "success",
                                        });
                                    })
                                    .catch(() => {
                                        Swal.close();

                                        Swal.fire({
                                            title: "Error",
                                            text:
                                                "Ocurrio un error al actualizar tus datos.",
                                            icon: "error",
                                        });
                                    });
                            });
                        })
                        .catch(() => {
                            Swal.close();
                            Swal.fire({
                                title: "Error",
                                text:
                                    "Ocurrio un error al subir la imagen de perfil.",
                                icon: "error",
                            });
                        });
                } else {
                    auth.currentUser
                        .updateProfile({
                            displayName,
                        })
                        .then(() => {
                            Swal.close();

                            Swal.fire({
                                title: "Exíto",
                                text: "Se ha actualizado el perfil del usurio!",
                                icon: "success",
                            });
                        })
                        .catch(() => {
                            Swal.close();

                            Swal.fire({
                                title: "Error",
                                text:
                                    "Ocurrio un error al actualizar tus datos.",
                                icon: "error",
                            });
                        });
                }
            },
            actualizarInformacionPersonal() {
                this.$v.$touch();
                if (this.$v.$invalid) return;

                const {
                    id,
                    nombres,
                    apellidos,
                    nuip,
                    telefono,
                    genero,
                    direccion,
                } = this.personalInformation;

                Swal.fire({
                    title: "Guardando cambios",
                    text:
                        "Espere un momento mientras se guardan los cambios...",
                    icon: "info",
                });

                Swal.showLoading();

                const docRef = db.collection("usuarios").doc(id);
                docRef
                    .update({
                        nombres,
                        apellidos,
                        nuip,
                        genero,
                        telefono,
                        direccion,
                    })
                    .then(() => {
                        Swal.close();

                        Swal.fire({
                            title: "Exito",
                            text: "Se han actualizado los datos personales",
                            icon: "success",
                        });
                    })
                    .catch(() => {
                        Swal.close();

                        Swal.fire({
                            title: "Error",
                            text:
                                "Ocurrio un error al actualizar los datos básicos",
                            icon: "error",
                        });
                    });
            },
            valdidarPassword() {
                this.$v.passwordOld.$touch();
                if (this.$v.passwordOld.$invalid) return;
                const user = auth.currentUser;
                const credential = this.passwordOld;

                user.reauthenticateWithCredential(credential).then(console.log);
            },
        },
        computed: {
            ...mapGetters(["obtenerUsuario", "obtenerInformacionPersonal"]),
            nuipErrors() {
                const errors = [];
                if (!this.$v.personalInformation.nuip.$dirty) return errors;
                !this.$v.personalInformation.nuip.numeric &&
                    errors.push("Este campo solo acepta valores númericos");
                !this.$v.personalInformation.nuip.required &&
                    errors.push("El capo de identificación es requerido");
                return errors;
            },
            nombresErrors() {
                const errors = [];
                if (!this.$v.personalInformation.nombres.$dirty) return errors;
                !this.$v.personalInformation.nombres.required &&
                    errors.push("El campo nombres es requerido");
                !this.$v.personalInformation.nombres.minLength &&
                    errors.push(
                        `Este campo nombres acepta mínimo ${this.$v.personalInformation.nombres.$params.minLength.min} caracteres`
                    );
                return errors;
            },
            apellidosErrors() {
                const errors = [];
                if (!this.$v.personalInformation.apellidos.$dirty)
                    return errors;
                !this.$v.personalInformation.apellidos.required &&
                    errors.push("El campo apellidos es requerido");
                !this.$v.personalInformation.apellidos.minLength &&
                    errors.push(
                        `Este campo apellidos acepta mínimo ${this.$v.personalInformation.apellidos.$params.minLength.min} caracteres`
                    );
                return errors;
            },
            generoErrors() {
                const errors = [];
                if (!this.$v.personalInformation.genero.$dirty) return errors;
                !this.$v.personalInformation.genero.required &&
                    errors.push("El campo genero es requerido");
                return errors;
            },
            telefonoErrors() {
                const errors = [];
                if (!this.$v.personalInformation.telefono.$dirty) return errors;
                !this.$v.personalInformation.telefono.required &&
                    errors.push("El campo telefono es requerido");
                !this.$v.personalInformation.telefono.numeric &&
                    errors.push(
                        "El campo telefono solo acepta valores númericos"
                    );
                !this.$v.personalInformation.telefono.minLength &&
                    errors.push(
                        `Este campo telefono acepta mínimo ${this.$v.personalInformation.telefono.$params.minLength.min} caracteres`
                    );
                return errors;
            },
            direccionErrors() {
                const errors = [];
                if (!this.$v.personalInformation.direccion.$dirty)
                    return errors;
                !this.$v.personalInformation.direccion.required &&
                    errors.push("El campo direccion es requerido");
                return errors;
            },
            displayNameErrors() {
                const errors = [];
                if (!this.$v.user.displayName.$dirty) return errors;
                !this.$v.user.displayName.required &&
                    errors.push("El campo usuario es requerido");
                return errors;
            },
            passwordOldErrors() {
                const errors = [];
                if (!this.$v.passwordOld.$dirty) return errors;
                !this.$v.passwordOld.required &&
                    errors.push("El campo contraseña actual es requerido");
                return errors;
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.usuario.password.$dirty) return errors;
                !this.$v.usuario.password.required &&
                    errors.push("El campo contraseña es requerido");
                return errors;
            },
            repeatPasswordErrors() {
                const errors = [];
                if (!this.$v.usuario.validatePassword.$dirty) return errors;
                !this.$v.usuario.validatePassword.required &&
                    errors.push("El campo confirmar contraseña es requerido");
                !this.$v.usuario.validatePassword.sameAsPassword &&
                    errors.push("Las contraseñas no coinciden");
                return errors;
            },
        },
        created() {
            this.user = this.obtenerUsuario;
            this.personalInformation = this.obtenerInformacionPersonal;
        },
    };
</script>
<style>
    .bg__color_profile {
        background-color: #eceff1;
    }

    .img__cover {
        object-fit: cover;
    }

    .form-card-profile {
        position: relative;
        width: 100%;
        min-height: 12.8rem;
    }

    .card-hero-image {
        width: 100%;
        height: 300px;
        margin: 0;
        padding: 0;
    }
</style>
