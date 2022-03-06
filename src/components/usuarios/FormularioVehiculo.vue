<template>
    <v-card>
        <v-card-title v-if="!formularioEditraVehiculo"
            >Registrar Vehículo</v-card-title
        >
        <v-card-title v-else>Editar Vehículo</v-card-title>
        <v-card-text>
            <v-form>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-select
                            v-model="vehiculo.modelo"
                            label="Modelo"
                            :items="modelosVehiculos"
                            placeholder="Seleccione un modelo..."
                            prepend-inner-icon="memory"
                            clearable
                            required
                            :error-messages="modeloErrors"
                            @blur="$v.vehiculo.modelo.$touch()"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="vehiculo.placa"
                            label="Placa"
                            placeholder="Placa del vehículo"
                            type="text"
                            prepend-inner-icon="money"
                            required
                            :error-messages="placaErrors"
                            @blur="$v.vehiculo.placa.$touch()"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                            v-model="vehiculo.marca"
                            label="Marca"
                            :items="marcasVehiculos"
                            placeholder="Seleccione una marca..."
                            clearable
                            prepend-inner-icon="time_to_leave"
                            required
                            :error-messages="marcaErrors"
                            @blur="$v.vehiculo.marca.$touch()"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-file-input
                            v-model="imagen"
                            accept="image/*"
                            name="imagen"
                            chips
                            show-size
                            placeholder="Cargue la imagen aquí"
                            label="Subir imagen"
                            prepend-icon="image"
                            @change="cargarImagen"
                        >
                            <template v-slot:selection="{ text }">
                                <v-chip small label color="primary">
                                    {{ text }}
                                </v-chip>
                            </template>
                        </v-file-input>
                    </v-col>
                    <v-col
                        class="d-flex justify-center align-center py-0"
                        cols="12"
                        sm="6"
                        v-if="imagen"
                    >
                        <div
                            v-bind:style="{
                                margin: '0 auto',
                                position: 'relative',
                            }"
                        >
                            <img
                                v-bind:style="{
                                    objectFit: 'cover',
                                    borderRadius: '1rem',
                                    boxShadow: '0.5rem 0.5rem 0.7rem',
                                    opcatiy: '0.7',
                                }"
                                :src="imagen.url"
                                width="200"
                                height="200"
                            />
                            <button
                                type="button"
                                v-bind:style="{
                                    width: '1.2rem',
                                    height: '1.2rem',
                                    position: 'absolute',
                                    top: '0.5rem',
                                    right: '0.6rem',
                                    borderRadius: '50%',
                                    backgroundColor: '#D32F2F',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    textAlign: 'center',
                                    lineHeight: '13px',
                                }"
                                @click="borrarImagen"
                            >
                                x
                            </button>
                        </div>
                    </v-col>
                    <v-col
                        class="d-flex justify-center align-center py-0"
                        cols="12"
                        sm="6"
                        v-else-if="vehiculo.imagenUrl !== ''"
                    >
                        <div
                            v-bind:style="{
                                margin: '0 auto',
                                position: 'relative',
                            }"
                        >
                            <img
                                v-bind:style="{
                                    objectFit: 'cover',
                                    borderRadius: '1rem',
                                    boxShadow: '0.5rem 0.5rem 0.7rem',
                                    opcatiy: '0.7',
                                }"
                                :src="vehiculo.imagenUrl"
                                :alt="vehiculo.imagenNombre"
                                width="200"
                                height="200"
                            />
                            <button
                                v-bind:style="{
                                    width: '1.2rem',
                                    height: '1.2rem',
                                    position: 'absolute',
                                    top: '0.5rem',
                                    right: '0.6rem',
                                    borderRadius: '50%',
                                    backgroundColor: '#D32F2F',
                                    color: '#fff',
                                    fontWeight: 'bold',
                                    fontSize: '13px',
                                    textAlign: 'center',
                                    lineHeight: '13px',
                                }"
                                type="button"
                                @click="borrarImagen(false)"
                            >
                                x
                            </button>
                        </div>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
        <v-card-actions class="d-flex flex-column flex-sm-row justify-end">
            <v-btn
                v-if="!formularioEditraVehiculo"
                color="blue accent-3"
                class="d-block d-sm-inline my-1 mx-1 w-100"
                dark
                @click="registrarVehiculo"
            >
                <v-icon class="mr-1" left>add_circle</v-icon>
                Registrar
            </v-btn>
            <v-btn
                v-else
                color="orange accent-3"
                class="d-block d-sm-inline my-1 mx-1 w-100"
                dark
                @click="editarVehiculo"
            >
                <v-icon class="mr-1" left>edit</v-icon>
                Editar
            </v-btn>
            <v-btn
                color="red accent-3"
                class="d-block d-sm-inline my-1 mx-0 w-100"
                dark
                @click="$emit('ocultarModalVehiculo')"
            >
                <v-icon class="mr-1" left>cancel</v-icon>
                Cerrar
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
    import { validationMixin } from "vuelidate";
    import { required, minLength } from "vuelidate/lib/validators";
    import Swal from "sweetalert2";
    import { db, storage } from "../../functions/firebase";
    import { marcasVehiculos } from "../../functions/constantes";

    const dataInitVehiculo = {
        key: "",
        marca: "",
        modelo: "",
        placa: "",
        imagenUrl: "",
        imagenNombre: "",
    };
    export default {
        name: "FormularioVehiculo",
        mixins: [validationMixin],
        props: {
            keyVehiculo: {
                String: true,
                required,
                default: "",
            },
            formularioEditraVehiculo: {
                Boolean: true,
                required: true,
                default: false,
            },
            idUsuario: {
                String: true,
                required: true,
            },
            datosVehiculo: {
                Object: true,
                default: {},
            },
        },
        data() {
            return {
                vehiculo: { ...dataInitVehiculo, ...this.$props.datosVehiculo },
                imagen: null,
                imagenCargada: false,
                modelosVehiculos: [],
                marcasVehiculos: marcasVehiculos,
            };
        },
        validations() {
            return {
                vehiculo: {
                    marca: {
                        required,
                    },
                    modelo: {
                        required,
                    },
                    placa: {
                        required,
                        minLength: minLength(3),
                    },
                },
            };
        },
        methods: {
            cargarImagen(e) {
                if (!e) return;

                const imagen = e;
                imagen.url = URL.createObjectURL(e);
                this.imagen = imagen;
                this.imagenCargada = true;
            },
            borrarImagen(nueva = true) {
                if (nueva) {
                    this.imagen = null;
                    return;
                } else {
                    this.vehiculo.imagenUrl = "";
                }
            },
            registrarVehiculo() {
                this.$v.vehiculo.$touch();
                if (this.$v.vehiculo.$invalid) return;
                if (!this.imagen) {
                    Swal.fire({
                        title: "Error!",
                        text: "Debe seleccionar una imagen",
                        icon: "error",
                    });
                    return;
                }

                Swal.fire({
                    title: "Guardando cambios",
                    text:
                        "Espere un momento mientras se guardan los cambios...",
                    icon: "info",
                });

                Swal.showLoading();

                const key = `VHLO-${this.$props.keyVehiculo}`;

                const storageRef = storage.ref();
                storageRef
                    .child(`vehiculos/${this.imagen.name}`)
                    .put(this.imagen)
                    .then((snapshot) => {
                        snapshot.ref.getDownloadURL().then((url) => {
                            this.vehiculo.imagenUrl = url;
                            this.vehiculo.imagenNombre = this.imagen.name;
                            this.vehiculo.key = key;

                            db.collection("usuarios")
                                .doc(this.$props.idUsuario)
                                .update({
                                    vehiculos: {
                                        [key]: this.vehiculo,
                                    },
                                })
                                .then(() => {
                                    Swal.close();
                                    Swal.fire({
                                        title: "Exíto!",
                                        text: "Se guardaron los cambios.",
                                        icon: "success",
                                    }).then(() => {
                                        this.$emit(
                                            "ocultarModalVehiculo",
                                            "nuevo",
                                            key,
                                            this.vehiculo
                                        );
                                    });
                                })
                                .catch(() => {
                                    Swal.close();
                                    Swal.fire({
                                        text: "Error",
                                        text:
                                            "Ocurrio un error, intente nueva mente.",
                                        icon: "error",
                                    }).then(() => {
                                        storageRef
                                            .child(
                                                `vehiculos/${this.imagen.name}`
                                            )
                                            .delete();
                                    });
                                });
                        });
                    });
            },
            editarVehiculo() {
                this.$v.vehiculo.$touch();
                if (this.$v.vehiculo.$invalid) return;
                if (this.vehiculo.imagenUrl === "") {
                    Swal.fire({
                        title: "Error!",
                        text: "Debe seleccionar una imagen",
                        icon: "error",
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    });
                    return;
                }

                Swal.fire({
                    title: "Guardando cambios",
                    text:
                        "Espere un momento mientras se guardan los cambios...",
                    icon: "info",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });

                Swal.showLoading();

                const key = `vehiculos.${this.$props.keyVehiculo}`;

                const docRef = db
                    .collection("usuarios")
                    .doc(this.$props.idUsuario);

                if (this.imagenCargada) {
                    const nombreAnteriorImagen = this.vehiculo.imagenNombre;
                    const storageRef = storage.ref();
                    storageRef
                        .child(`vehiculos/${this.imagen.name}`)
                        .put(this.imagen)
                        .then((snapshot) => {
                            snapshot.ref.getDownloadURL().then((url) => {
                                this.vehiculo.imagenUrl = url;
                                this.vehiculo.imagenNombre = this.imagen.name;

                                docRef
                                    .update({
                                        [key]: this.vehiculo,
                                    })
                                    .then(() => {
                                        Swal.close();
                                        Swal.fire({
                                            title: "Exíto!",
                                            text: "Se guardaron los cambios.",
                                            icon: "success",
                                        }).then(() => {
                                            storageRef
                                                .child(
                                                    `vehiculos/${nombreAnteriorImagen}`
                                                )
                                                .delete();

                                            this.$emit(
                                                "ocultarModalVehiculo",
                                                "editar",
                                                this.$props.keyVehiculo,
                                                this.vehiculo
                                            );
                                        });
                                    })
                                    .catch(() => {
                                        Swal.close();
                                        Swal.fire({
                                            text: "Error",
                                            text:
                                                "Ocurrio un error, intente nuevamente.",
                                            icon: "error",
                                        }).then(() => {
                                            storageRef
                                                .child(
                                                    `vehiculos/${this.imagen.name}`
                                                )
                                                .delete();
                                        });
                                    });
                            });
                        })
                        .catch(() => {
                            Swal.close();
                            Swal.fire({
                                text: "Error",
                                text: "Ocurrio un error, intente nuevamente.",
                                icon: "error",
                            });
                        });

                    return;
                }

                docRef
                    .update({
                        [key]: this.vehiculo,
                    })
                    .then(() => {
                        Swal.close();
                        Swal.fire({
                            title: "Exíto!",
                            text: "Se guardaron los cambios.",
                            icon: "success",
                        }).then(() => {
                            this.$emit(
                                "ocultarModalVehiculo",
                                "editar",
                                this.$props.keyVehiculo,
                                this.vehiculo
                            );
                        });
                    })
                    .catch(() => {
                        Swal.close();
                        Swal.fire({
                            text: "Error",
                            text: "Ocurrio un error, intente nuevamente.",
                            icon: "error",
                        });
                    });
            },
        },
        computed: {
            modeloErrors() {
                const errors = [];
                if (!this.$v.vehiculo.modelo.$dirty) return errors;
                !this.$v.vehiculo.modelo.required &&
                    errors.push("El campo modelo es requerido");
                return errors;
            },
            marcaErrors() {
                const errors = [];
                if (!this.$v.vehiculo.marca.$dirty) return errors;
                !this.$v.vehiculo.marca.required &&
                    errors.push("El campo marca es requerido");
                return errors;
            },
            placaErrors() {
                const errors = [];
                if (!this.$v.vehiculo.placa.$dirty) return errors;
                !this.$v.vehiculo.placa.required &&
                    errors.push("El campo placa es requerido");
                !this.$v.vehiculo.placa.minLength &&
                    errors.push(
                        `Este campo acepta minímo ${this.$v.vehiculo.placa.$params.minLength.min} caracteres`
                    );
                return errors;
            },
        },
        created() {
            const year = new Date().getFullYear();
            const years = [];
            for (let index = year; year - 30 < index; index--) {
                years.push(index);
            }
            this.modelosVehiculos = years;
        },
    };
</script>
<style>
    @media screen and (max-width: 600px) {
        .w-100 {
            width: 100%;
        }
    }
</style>
