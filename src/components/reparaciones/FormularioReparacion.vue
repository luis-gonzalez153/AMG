<template>
    <v-form>
        <v-card class="my-3" elevation="10">
            <v-card-title class="d-flex justify-center mb-5"
                ><h3 class="text-center">
                    Realizar ingreso vehículo
                </h3></v-card-title
            >
            <v-card-text>
                <v-row>
                    <v-col class="py-0" cols="12" sm="6">
                        <v-select
                            v-model="reparacion.productosReparacion"
                            :items="selects.productosReparacion"
                            item-text="nombre_productoreparacion"
                            item-value="codigo_productoreparacion"
                            label="Productos y Repuestos"
                            placeholder="Seleccione uno o varios..."
                            prepend-inner-icon="home_repair_service"
                            outlined
                            chips
                            deletable-chips
                            multiple
                            required
                            :error-messages="productosReparacionErrors"
                            @input="$v.reparacion.productosReparacion.$touch()"
                            @blur="$v.reparacion.productosReparacion.$touch()"
                        />
                    </v-col>
                    <v-col class="py-0" cols="12" sm="6">
                        <v-select
                            v-model="reparacion.tiposReparacion"
                            :items="selects.tiposReparacion"
                            item-text="nombre_tiporeparacion"
                            item-value="codigo_tiporeparacion"
                            label="Tipo Reparacion"
                            placeholder="Seleccione la uno o varios..."
                            prepend-inner-icon="home_repair_service"
                            outlined
                            chips
                            deletable-chips
                            multiple
                            required
                            :error-messages="tiposReparacionErrors"
                            @input="$v.reparacion.tiposReparacion.$touch()"
                            @blur="$v.reparacion.tiposReparacion.$touch()"
                        />
                    </v-col>
                    <v-col class="py-0" cols="12" sm="6">
                        <v-select
                            v-model="reparacion.estadoRevision"
                            :items="selects.estadosRevision"
                            item-text="nombre"
                            item-value="value"
                            label="Estado revisión"
                            placeholder="Seleccione un estado"
                            prepend-inner-icon="home_repair_service"
                            outlined
                            chips
                            deletable-chips
                            required
                            :error-messages="estadoRevisionErrors"
                            @input="$v.reparacion.estadoRevision.$touch()"
                            @blur="$v.reparacion.estadoRevision.$touch()"
                        />
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                            v-model="reparacion.fechaReparacion"
                            label="Fecha de Ingreso"
                            type="text"
                            prepend-inner-icon="mdi-calendar"
                            @click="fechaReparacion = true"
                            required
                            :error-messages="fechaReparacionErrors"
                            @input="$v.reparacion.fechaReparacion.$touch()"
                            @blur="$v.reparacion.fechaReparacion.$touch()"
                        ></v-text-field>
                        <v-dialog
                            v-model="dialogFechaReparacion"
                            persistent
                            width="290px"
                        >
                            <v-date-picker
                                v-model="reparacion.fechaReparacion"
                                scrollable
                                :max="new Date().toISOString().substr(0, 10)"
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="dialogFechaReparacion = false"
                                >
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </v-col>
                    <v-col class="py-0" cols="12" md="6">
                        <v-text-field
                            v-model="reparacion.cliente"
                            label="Cliente"
                            placeholder="Nombre Cliente"
                            type="text"
                            prepend-inner-icon="person"
                            outlined
                        />
                    </v-col>
                    <v-col class="py-0" cols="12" sm="6">
                        <label class="d-block pl-2">Tipo horario</label>
                        <v-radio-group
                            v-model="reparacion.horarioReparacion"
                            row
                            required
                            :error-messages="horarioReparacionErrors"
                            @input="$v.reparacion.horarioReparacion.$touch()"
                            @blur="$v.reparacion.horarioReparacion.$touch()"
                        >
                            <v-radio label="Mañana" value="MAÑANA"></v-radio>
                            <v-radio label="Tarde" value="TARDE"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col class="py-0" cols="12" sm="6">
                        <v-textarea
                            v-model="reparacion.comentarios"
                            label="Comentarios"
                            placeholder="Ingresa aquí los comentarios de la reparación..."
                            type="text"
                            no-resize
                            outlined
                            required
                            :error-messages="comentariosErrors"
                            @input="$v.reparacion.comentarios.$touch()"
                            @blur="$v.reparacion.comentarios.$touch()"
                        />
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="orange accent-3"
                    dark
                    @click="registrarReparacion"
                >
                    <v-icon left>edit</v-icon>
                    Guardar cambios
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-form>
</template>

<script>
    import { db } from "../../functions/firebase";
    import Swal from "sweetalert2";
    import { validationMixin } from "vuelidate";
    import { required, minLength } from "vuelidate/lib/validators";
    import { estadosRevisiones } from "../../functions/constantes";

    export default {
        name: "FormularioReparacion",
        mixins: [validationMixin],
        data() {
            return {
                id: null,
                reparacion: {
                    fechaReparacion: "",
                    horarioReparacion: "",
                    empleadoReparacion: null,
                    productosReparacion: [],
                    tiposReparacion: [],
                    comentarios: "",
                    cita: null,
                    estadoRevision: "",
                },
                selects: {
                    productosReparacion: [],
                    tiposReparacion: [],
                    estadosRevision: estadosRevisiones,
                },
                dialogFechaReparacion: false,
            };
        },
        validations() {
            return {
                reparacion: {
                    fechaReparacion: {
                        required,
                    },
                    horarioReparacion: {
                        required,
                    },
                    productosReparacion: {
                        required,
                    },
                    tiposReparacion: {
                        required,
                    },
                    estadosRevisiones: {
                        required,
                    },
                    comentarios: {
                        required,
                        minLength: minLength(10),
                    },
                },
            };
        },
        beforeMount() {
            const { id } = this.$route.params;
            this.id = id;
        },
        methods: {
            registrarReparacion() {
                db.collection("reparaciones")
                    .doc()
                    .set(this.reparacion)
                    .then(() => {
                        this.borrarDatosFormulario();
                        Swal.fire({
                            title: "Exito!",
                            text: "Se registro la reparacion correctamente",
                            icon: "success",
                            timerProgressBar: true,
                            timer: 2000,
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: error,
                            icon: "error",
                            timerProgressBar: true,
                            timer: 2000,
                        });
                    });
            },

            borrarDatosFormulario() {
                this.reparacion.fechaReparacion = "";
                this.reparacion.cita = null;
                this.reparacion.horarioReparacion = "";
                this.reparacion.empleadoReparacion = null;
                this.reparacion.productosReparacion = [];
                this.reparacion.tiposReparacion = [];
                this.reparacion.comentarios = "";
            },
        },
        computed: {
            fechaReparacionErrors() {
                const errors = [];
                if (!this.$v.reparacion.fechaReparacion.$dirty) return errors;
                !this.$v.reparacion.fechaReparacion.required &&
                    errors.push("El campo fecha repación es requerido");
                return errors;
            },
            horarioReparacionErrors() {
                const errors = [];
                if (!this.$v.reparacion.horarioReparacion.$dirty) return errors;
                !this.$v.reparacion.horarioReparacion.required &&
                    errors.push("El campo horario de reparación es requerido");
                return errors;
            },
            productosReparacionErrors() {
                const errors = [];
                if (!this.$v.reparacion.productosReparacion.$dirty)
                    return errors;
                !this.$v.reparacion.productosReparacion.required &&
                    errors.push("El camapo productos reparación es requerido");
                return errors;
            },
            tiposReparacionErrors() {
                const errors = [];
                if (!this.$v.reparacion.tiposReparacion.$dirty) return errors;
                !this.$v.reparacion.tiposReparacion.required &&
                    errors.push("El campo tipos de reparación es requerido");
                return errors;
            },
            estadosRevisionesErrors() {
                const errors = [];
                if (!this.$v.reparacion.estadoRevision.$dirty) return errors;
                !this.$v.reparacion.estadoRevision.required &&
                    errors.push("El campo estado revisión es requerido");
                return errors;
            },
            comentariosErrors() {
                const errors = [];
                if (!this.$v.reparacion.comentarios.$dirty) return errors;
                !this.$v.reparacion.comentarios.required &&
                    errors.push("el campo comentarios es requerido");
                !this.$v.reparacion.comentarios.minLength &&
                    errors.push(
                        `El campo comentarios acepta mínimo ${this.$v.reparacion.comentarios.$params.minLength.min} valores`
                    );
                return errors;
            },
        },
    };
</script>
