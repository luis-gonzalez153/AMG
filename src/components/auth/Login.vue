<template>
    <v-form
        v-on:submit.prevent="iniciarSesion"
        class="pa-0 rounded-lg position-relative"
    >
        <v-card>
            <v-avatar class="rounded-b-0" rounded width="100%" height="250px">
                <v-img
                    src="/assets/images/pexels-sourav-mishra-1149831.jpg"
                ></v-img>
            </v-avatar>
            <v-card-title class="d-flex justify-center"
                >Iniciar de sesión</v-card-title
            >
            <v-col cols="12">
                <v-text-field
                    v-model="email"
                    prepend-inner-icon="mail"
                    color="light-blue"
                    label="Email"
                    type="email"
                    placeholder="example@gmail.com"
                    outlined
                    required
                    :error-messages="emailErrors"
                    @blur="$v.email.$touch()"
                />
                <v-text-field
                    v-model="password"
                    prepend-inner-icon="shield"
                    color="light-blue"
                    label="Contraseña"
                    type="password"
                    placeholder="my password"
                    outlined
                    required
                    :error-messages="passwordErrors"
                    @blur="$v.password.$touch()"
                />
                
                <v-btn color="blue" type="submit" dark block>
                    <v-icon class="mr-2">
                        mdi-send
                    </v-icon>
                    Iniciar sesión
                </v-btn>
                <v-btn
                    class="mt-1"
                    text
                    dark
                    block
                    color="primary"
                    @click="$emit('seleccionarOpcion', 2)"
                    >Crear cuenta</v-btn
                >
            </v-col>
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
    import { mapActions } from "vuex";
    import { validationMixin } from "vuelidate";
    import { required, email } from "vuelidate/lib/validators";

    export default {
        name: "Login",
        mixins: [validationMixin],
        data() {
            return {
                email: "",
                password: "",
                error: "",
            };
        },
        validations() {
            return {
                email: {
                    required,
                    email,
                },
                password: {
                    required,
                },
            };
        },
        methods: {
            ...mapActions(["iniciarSesionAction", "ocultarModalAuth"]),
            iniciarSesion() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.iniciarSesionAction({
                        email: this.email,
                        password: this.password,
                    });
                }
            },
        },
        computed: {
            emailErrors() {
                const errors = [];
                if (!this.$v.email.$dirty) return errors;
                !this.$v.email.required &&
                    errors.push("El campo email es requerido");
                !this.$v.email.email && errors.push("El email no es valido");
                return errors;
            },
            passwordErrors() {
                const errors = [];
                if (!this.$v.password.$dirty) return errors;
                !this.$v.password.required &&
                    errors.push("El campo contraseña es requerido");
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
