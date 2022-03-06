<template>
    <v-form>
        <v-card elevation="10">
            <v-card-title class="d-flex justify-center">
                <h3 v-if="id === ''" class="text-center">Agendar Cita</h3>
                <h3 v-else class="text-center">Editar Cita</h3>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="cita.motivo"
                            label="Motivo"
                            prepend-inner-icon="description"
                            outlined
                            clearable
                            counter
                            required
                            :error-messages="motivoErrors"
                            @blur="$v.cita.motivo.$touch()"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="cita.fecha"
                            label="Fecha"
                            prepend-inner-icon="today"
                            clearable
                            outlined
                            type="date"
                            :min="fechaActual"
                            required
                            :error-messages="fechaErrors"
                            @blur="$v.cita.fecha.$touch()"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-dialog
                            ref="dialog"
                            v-model="modalTiempo"
                            :return-value.sync="cita.tiempo"
                            persistent
                            width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="cita.tiempo"
                                    label="Hora"
                                    prepend-icon="mdi-clock-time-four-outline"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    required
                                    :error-messages="tiempoErrors"
                                    @blur="$v.cita.tiempo.$touch()"
                                ></v-text-field>
                            </template>
                            <v-time-picker
                                v-if="modalTiempo"
                                v-model="cita.tiempo"
                                full-width
                                format="24hr"
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="modalTiempo = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.dialog.save(cita.tiempo)"
                                >
                                    OK
                                </v-btn>
                            </v-time-picker>
                        </v-dialog>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-select
                            v-model="cita.vehiculo"
                            label="Vehículo"
                            :items="selects.vehiculos"
                            item-text="placa"
                            item-value="key"
                            clearable
                            prepend-icon="time_to_leave"
                            outlined
                            required
                            :error-messages="vehiculoErrors"
                            @blur="$v.cita.vehiculo.$touch()"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions class="d-flex justify-end">
                <v-btn
                    v-if="id === ''"
                    color="blue darken-2"
                    dark
                    @click="registrarCita"
                >
                    <v-icon left>add_circle</v-icon>
                    Guardar
                </v-btn>
                <v-btn v-else color="orange darken-2" dark @click="editarCita">
                    <v-icon left>edit</v-icon>
                    Editar
                </v-btn>
                <v-btn
                    color="red accent-3"
                    dark
                    @click="$emit('ocultarModalCita')"
                >
                    <v-icon left>cancel</v-icon>
                    Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
    import { db } from "../../functions/firebase";
    import Swal from "sweetalert2";
    import { mapGetters } from "vuex";
    import { estadoCitas } from "../../functions/constantes";
    import { validationMixin } from "vuelidate";
    import { required, minLength } from "vuelidate/lib/validators";

    const datosInitCita = {
        idUser: "",
        motivo: "",
        fecha: "",
        tiempo: "",
        estadoCita: estadoCitas[0],
        vehiculo: "",
        cliente: "",
    };

    export default {
        name: "AgendarCita",
        props: {
            id: {
                type: String,
                required: true,
                default: "",
            },
            datosCita: {
                type: Object,
                default: {},
            },
        },
        mixins: [validationMixin],
        data() {
            return {
                cita: { ...datosInitCita, ...this.$props.datosCita },
                selects: {
                    vehiculos: [],
                },
                fechaActual: new Date().toISOString().substr(0, 10),
                modalTiempo: false,
            };
        },
        validations() {
            return {
                cita: {
                    motivo: { required, minLength: minLength(3) },
                    fecha: { required },
                    tiempo: { required },
                    vehiculo: { required },
                },
            };
        },
        methods: {
            registrarCita() {
                this.$v.cita.$touch();
                if (this.$v.cita.$invalid) return;

                Swal.fire({
                    title: "Guardando cambios",
                    text:
                        "Espere un momento mientras se guardan los cambios...",
                    icon: "info",
                });

                Swal.showLoading();

                this.cita.idUser = this.obtenerInformacionPersonal.id;
                this.cita.cliente = `${this.obtenerInformacionPersonal.nombres} ${this.obtenerInformacionPersonal.apellidos}`;

                db.collection("citas")
                    .add(this.cita)
                    .then((doc) => {
                        Swal.close();

                        Swal.fire({
                            title: "Exíto!",
                            text: "Se guardaron los cambios.",
                            icon: "success",
                        }).then(() => {
                            this.$emit("ocultarModalCita", "nueva", {
                                id: doc.id,
                                ...this.cita,
                            });
                        });
                    })
                    .catch(() => {
                        Swal.close();

                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un error, vuelva a intentarlo.",
                            icon: "error",
                        });
                    });
            },
            editarCita() {
                this.$v.cita.$touch();
                if (this.$v.cita.$invalid) return;

                Swal.fire({
                    title: "Guardando cambios",
                    text:
                        "Espere un momento mientras se guardan los cambios...",
                    icon: "info",
                });

                Swal.showLoading();

                delete this.cita.id;
                this.cita.cliente = `${this.obtenerInformacionPersonal.nombres} ${this.obtenerInformacionPersonal.apellidos}`;

                db.collection("citas")
                    .doc(this.$props.id)
                    .update(this.cita)
                    .then(() => {
                        Swal.close();

                        Swal.fire({
                            title: "Exíto!",
                            text: "Se guardaron los cambios.",
                            icon: "success",
                        }).then(() => {
                            this.$emit("ocultarModalCita", "editada", {
                                id: this.$props.id,
                                ...this.cita,
                            });
                        });
                    })
                    .catch(() => {
                        Swal.close();

                        Swal.fire({
                            title: "Error",
                            text: "Ocurrio un error, vuelva a intentarlo.",
                            icon: "error",
                        });
                    });
            },
        },
        computed: {
            ...mapGetters(["obtenerInformacionPersonal"]),
            motivoErrors() {
                const errors = [];
                if (!this.$v.cita.motivo.$dirty) return errors;
                !this.$v.cita.motivo.required &&
                    errors.push("El campo motivo es requerido.");
                !this.$v.cita.motivo.minLength &&
                    errors.push(
                        `El campo motivo acepta minímo ${this.$v.cita.motivo.$params.minLength.min} caracteres.`
                    );
                return errors;
            },
            fechaErrors() {
                const errors = [];
                if (!this.$v.cita.fecha.$dirty) return errors;
                !this.$v.cita.fecha.required &&
                    errors.push("El campo fecha es requerido.");
                return errors;
            },
            tiempoErrors() {
                const errors = [];
                if (!this.$v.cita.tiempo.$dirty) return errors;
                !this.$v.cita.tiempo.required &&
                    errors.push("El campo hora es requerido.");
                return errors;
            },
            vehiculoErrors() {
                const errors = [];
                if (!this.$v.cita.vehiculo.$dirty) return errors;
                !this.$v.cita.vehiculo.required &&
                    errors.push("El campo vehiculo es requerido.");
                return errors;
            },
        },
        created() {
            this.selects.vehiculos = Object.values(
                this.obtenerInformacionPersonal.vehiculos
            );
        },
    };
</script>
