<template>
    <v-form v-on:submit.prevent="editarUsuario">
        <v-card class="rounded-lg">
            <v-card-title>Editar Usuario</v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-select
                            v-model="rol"
                            :items="selects.roles"
                            item-text="nombre"
                            item-value="value"
                            label="Seleccione el rol"
                            placeholder="Elige un rol para el usuario..."
                            prepend-inner-icon="games"
                            outlined
                            required
                            :error-messages="rolErrors"
                            @blur="$v.rol.$touch()"
                        />
                    </v-col>
                    <v-col
                        v-if="rol !== '' && rol === 'EMPLEADO'"
                        class="py-0"
                        cols="12"
                    >
                        <v-select
                            v-model="herramientas"
                            :items="selects.herramientas"
                            item-text="nombre"
                            item-value="id"
                            label="Herramientas"
                            placeholder="Elige las herramientas para el empleado"
                            prepend-inner-icon="construction"
                            outlined
                            chips
                            deletable-chips
                            multiple
                        />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="d-flex justify-end">
                <v-btn color="orange accent-3" type="submit" dark>
                    <v-icon left>edit</v-icon>
                    Editar usuario
                </v-btn>
                <v-btn
                    class="mx-2"
                    color="red darken-1"
                    dark
                    @click="$emit('ocultarModalEditarUsuario')"
                >
                    <v-icon left>close</v-icon>
                    Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>
<script>
    import { roles } from "../../functions/constantes";
    import { validationMixin } from "vuelidate";
    import { required } from "vuelidate/lib/validators";
    import { db, firebase } from "../../functions/firebase";
    import Swal from "sweetalert2";

    export default {
        name: "EditarUsuarioAdmin",
        props: {
            datosUsuario: {
                required: true,
                Object: true,
            },
        },
        mixins: [validationMixin],
        data() {
            return {
                id: this.$props.datosUsuario.id,
                rol: this.$props.datosUsuario.rol,
                herramientas: this.$props.datosUsuario.herramientas,
                copiaHerramientas: this.$props.datosUsuario.herramientas,
                selects: {
                    herramientas: [],
                    roles: roles,
                },
            };
        },
        validations() {
            return {
                rol: {
                    required,
                },
            };
        },
        mounted() {
            this.obtenerHerramientas();
        },
        methods: {
            obtenerHerramientas() {
                db.collection("herramientas")
                    .get()
                    .then((doc) => {
                        let herramientas = [];
                        doc.forEach((herramienta) => {
                            herramientas = [
                                ...herramientas,
                                { id: herramienta.id, ...herramienta.data() },
                            ];
                        });
                        this.selects.herramientas = herramientas;
                    });
            },
            editarUsuario() {
                this.$v.$touch();
                if (this.$v.$invalid) return;

                Swal.fire({
                    title: "Guardando cambios",
                    text: "Por favor espere mientras se guardan los cambios.",
                    icon: "info",
                });

                Swal.showLoading();

                const docRef = db.collection("usuarios").doc(this.id);

                if (this.rol === "EMPLEADO") {
                    const collectRef = db.collection("herramientas");

                    if (this.copiaHerramientas.length > 0) {
                        this.copiaHerramientas.forEach((el) => {
                            if (!this.herramientas.includes(el)) {
                                const {
                                    entregadasPersonal,
                                } = this.selects.herramientas.find(
                                    (herramineta) => herramineta.id === el
                                );

                                collectRef.doc(el).update({
                                    entregadasPersonal: entregadasPersonal - 1,
                                });
                            }
                        });
                    } else {
                        this.herramientas.forEach((el) => {
                            collectRef.doc(el).update({
                                entregadasPersonal: firebase.firestore.FieldValue.increment(
                                    1
                                ),
                            });
                        });
                    }

                    docRef
                        .update({
                            rol: this.rol,
                            herramientas: this.herramientas,
                        })
                        .then(() => {
                            Swal.close();
                        })
                        .catch(() => {
                            Swal.close();
                            Swal.fire({
                                title: "Error",
                                text:
                                    "Ocurrio un error en el servidor, intente una vez más",
                                icon: "error",
                            });

                            return;
                        });
                } else {
                    docRef
                        .update({
                            rol: this.rol,
                        })
                        .then(() => {
                            Swal.close();
                        })
                        .catch(() => {
                            Swal.close();
                            Swal.fire({
                                title: "Error",
                                text:
                                    "Ocurrio un error en el servidor, intente una vez más",
                                icon: "error",
                            });

                            return;
                        });
                }
                this.$emit("ocultarModalEditarUsuario", false);
            },
        },
        computed: {
            rolErrors() {
                const errors = [];
                if (!this.$v.rol.$dirty) return errors;
                !this.$v.rol.required &&
                    errors.push("El campo rol es obligatorio");
                return errors;
            },
        },
    };
</script>
