<template>
    <v-form v-on:submit.prevent="registrarUsuario" class="position-relative">
        <v-card class="pa-3">
            <v-card-title class="d-flex justify-center pa-1"
                ><h4>Crear Cuenta</h4></v-card-title
            >
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="informacionPersonal.nombres"
                        prepend-inner-icon="assignment"
                        color="light-blue"
                        label="Nombres"
                        type="text"
                        placeholder="Ingresa tus nombres"
                        outlined
                        required
                        :error-messages="nombresErrors"
                        @blur="$v.informacionPersonal.nombres.$touch()"
                    />
                    <v-text-field
                        v-model="informacionPersonal.apellidos"
                        prepend-inner-icon="assignment"
                        color="light-blue"
                        label="Apellidos"
                        type="text"
                        placeholder="Ingresa tus apellidos"
                        outlined
                        required
                        :error-messages="apellidosErrors"
                        @blur="$v.informacionPersonal.apellidos.$touch()"
                    />
                    <v-text-field
                        v-model="usuario.email"
                        prepend-inner-icon="mail"
                        color="light-blue"
                        label="Email"
                        type="email"
                        placeholder="example@gmail.com"
                        outlined
                        required
                        :error-messages="emailErrors"
                        @blur="$v.usuario.email.$touch()"
                    />
                    <v-text-field
                        v-model="usuario.password"
                        prepend-inner-icon="vpn_key"
                        color="light-blue"
                        label="Contraseña"
                        type="password"
                        placeholder="my password"
                        outlined
                        required
                        counter
                        :error-messages="passwordErrors"
                        @blur="$v.usuario.password.$touch()"
                    />
                    <v-text-field
                        v-model="usuario.validatePassword"
                        prepend-inner-icon="vpn_key"
                        color="light-blue"
                        label="Confirmar Contraseña"
                        type="password"
                        placeholder="my password"
                        outlined
                        required
                        counter
                        :error-messages="validatePasswordErrors"
                        @blur="$v.usuario.validatePassword.$touch()"
                    />
                    <div>
                        <v-btn
                            class="mb-3"
                            color="blue"
                            type="submit"
                            dark
                            block
                        >
                            <v-icon class="mr-1">
                                add_circle_outline
                            </v-icon>
                            Crear cuenta
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            block
                            @click="$emit('seleccionarOpcion', 1)"
                            >Iniciar sesión</v-btn
                        >
                    </div>
                </v-col>
            </v-row>
        </v-card>
        <button
            @click="ocultarModalAuth"
            type="button"
            class="position-absolute btn__close"
        >
            x
        </button>
    </v-form>
</template>
<script>
    import { roles } from "../../functions/constantes";
    import { validationMixin } from "vuelidate";
    import {
        required,
        minLength,
        email,
        sameAs,
    } from "vuelidate/lib/validators";
    import Swal from "sweetalert2";
    import { mapActions } from "vuex";

    export default {
        name: "Register",
        mixins: [validationMixin],
        data: () => ({
            usuario: {
                displayName: "",
                email: "",
                password: "",
                validatePassword: "",
            },
            informacionPersonal: {
                nuip: "",
                nombres: "",
                apellidos: "",
                genero: "",
                telefono: "",
                direccion: "",
                herramientas: [],
                citas: [],
                vehiculos: [],
                rol: roles[0].value,
            },
        }),
        validations() {
            return {
                informacionPersonal: {
                    nombres: {
                        required,
                        minLength: minLength(2),
                    },
                    apellidos: {
                        required,
                        minLength: minLength(3),
                    },
                },
                usuario: {
                    email: { required, email },
                    password: {
                        required,
                        minLength: minLength(8),
                    },
                    validatePassword: {
                        sameAsPassword: sameAs("password"),
                    },
                },
            };
        },
        methods: {
            ...mapActions(["registrarUsuarioAction", "ocultarModalAuth"]),
            registrarUsuario() {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    console.log("Have some errors");
                    Swal.fire({
                        title: "Error",
                        text: "Hay errores en los campos",
                        icon: "error",
                    });
                } else {
                    const { email, password } = this.usuario;

                    this.registrarUsuarioAction({
                        email,
                        password,
                        datosUsuario: this.informacionPersonal,
                    });
                }
            },
        },
        computed: {
            nombresErrors() {
                const errors = [];
                if (!this.$v.informacionPersonal.nombres.$dirty) return errors;
                !this.$v.informacionPersonal.nombres.required &&
                    errors.push("El campo nombres es requerido");
                !this.$v.informacionPersonal.nombres.minLength &&
                    errors.push(
                        `Este campo acepta minímo ${this.$v.informacionPersonal.nombres.$params.minLength.min} caracteres`
                    );
                return errors;
            },
            apellidosErrors() {
                const errors = [];
                if (!this.$v.informacionPersonal.apellidos.$dirty)
                    return errors;
                !this.$v.informacionPersonal.apellidos.required &&
                    errors.push("El campo apellidos es requerido");
                !this.$v.informacionPersonal.apellidos.minLength &&
                    errors.push(
                        `Este campo acepta minímo ${this.$v.informacionPersonal.apellidos.$params.minLength.min} caracteres`
                    );
                return errors;
            },
            emailErrors() {
                const errors = [];
                if (!this.$v.usuario.email.$dirty) return errors;
                !this.$v.usuario.email.email &&
                    errors.push("El campo email no es valido");
                !this.$v.usuario.email.required &&
                    errors.push("El campo email es requerido");
                return errors;
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.usuario.password.$dirty) return errors;
                !this.$v.usuario.password.required &&
                    errors.push("El campo contraseña es requerido");
                !this.$v.usuario.password.minLength &&
                    errors.push(
                        `El campo contraseña acepta mínimo ${this.$v.usuario.password.$params.minLength.min} caracteres`
                    );
                return errors;
            },
            validatePasswordErrors() {
                const errors = [];
                if (!this.$v.usuario.validatePassword.$dirty) return errors;
                !this.$v.usuario.validatePassword.sameAsPassword &&
                    errors.push("Las contraseñas no coinciden");
                return errors;
            },
        },
    };
</script>
<style>
    .position-relative {
        position: relative;
    }
    .position-absolute {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
    }
    .btn__close {
        width: 3ch;
        height: 3ch;
        line-height: 3ch;
        border-radius: 50%;
        text-align: center;
        z-index: 10;
        color: #fff;
        background-color: #ff1744;
    }

    .btn__close:hover {
        background-color: #ee0c39;
    }
</style>
