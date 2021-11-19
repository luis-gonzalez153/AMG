<template>
    <v-row class="d-flex justify-center">
        <v-col class="pa-10" cols="12" sm="9" md="8" lg="6">
            <v-form class="px-3">
                <v-card>
                    <v-card-title class="d-flex justify-center">Inicio de sesión</v-card-title>
                    <v-col cols="12">
                        <v-text-field v-model="email"
                            prepend-inner-icon="mail"
                            color="light-blue"
                            label="Email"
                            type="email"
                            placeholder="example@gmail.com"
                            outlined
                        />
                        <v-text-field
                            v-model="password"
                            prepend-inner-icon="shield"
                            color="light-blue"
                            label="Contraseña"
                            type="password"
                            placeholder="my password"
                            outlined
                        />
                        <v-btn color="blue" @click="login" dark block>Iniciar sesión</v-btn>
                    </v-col>
                </v-card>
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
    import { auth } from "../functions/firebase";
    import Swal from "sweetalert2";

    export default {
        data(){
            return {
                email:"",
                password:"",
                error:""
            }
        },
        methods:{
            login(){
                auth.signInWithEmailAndPassword(this.email, this.password).then(() =>
                    window.location.href = "Promocion"
                ).catch(error =>{
                    Swal.fire({
                    title: 'Error!',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                    });
                });
            }
        }
    }
</script>