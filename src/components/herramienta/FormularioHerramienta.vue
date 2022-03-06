<template>
    <div class="pt-1">
        <v-form v-on:submit.prevent="registrarHerramienta" class="mx-4 mt-1">
            <v-row>
                <v-col class="py-0" cols="12" sm="6">
                    <v-text-field
                        v-model="herramienta.cantidad"
                        label="Cantidad"
                        placeholder="Ingrese la cantidad"
                        prepend-inner-icon="tag"
                        type="text"
                        outlined
                        required
                        :error-messages="cantidadErrors"
                        @input="$v.herramienta.cantidad.$touch()"
                        @blur="$v.herramienta.cantidad.$touch()"
                    />
                </v-col>
                <v-col class="py-0" cols="12" sm="6">
                    <v-text-field
                        v-model="herramienta.marca"
                        label="Marca"
                        placeholder="Nombre marca"
                        prepend-inner-icon="business"
                        type="text"
                        outlined
                        required
                        :error-messages="marcaErrors"
                        @input="$v.herramienta.marca.$touch()"
                        @blur="$v.herramienta.marca.$touch()"
                    />
                </v-col>
                <v-col class="py-0" cols="12" sm="6">
                    <v-text-field
                        v-model="herramienta.nombre"
                        label="Nombre"
                        placeholder="Nombre herramienta"
                        prepend-inner-icon="hardware"
                        type="text"
                        outlined
                        required
                        :error-messages="nombreErrors"
                        @input="$v.herramienta.nombre.$touch()"
                        @blur="$v.herramienta.nombre.$touch()"
                    />
                </v-col>
                <v-col class="py-0" cols="12" sm="6">
                    <v-select
                        v-model="herramienta.tipoHerramienta"
                        :items="selects.tipoHerramienta"
                        item-text="nombre"
                        item-value="value"
                        label="Tipo de herramienta"
                        placeholder="Seleccione una herramienta..."
                        prepend-inner-icon="handyman"
                        outlined
                        required
                        :error-messages="tipoHerramientaErrors"
                        @input="$v.herramienta.tipoHerramienta.$touch()"
                        @blur="$v.herramienta.tipoHerramienta.$touch()"
                    />
                </v-col>
                <v-col class="py-0" cols="12" sm="6">
                    <v-text-field
                        v-model="herramienta.proveedor"
                        label="Provedor"
                        placeholder="Nombre proveedor"
                        prepend-inner-icon="store"
                        type="text"
                        outlined
                        required
                        :error-messages="proveedorErrors"
                        @input="$v.herramienta.proveedor.$touch()"
                        @blur="$v.herramienta.proveedor.$touch()"
                    />
                </v-col>
                <v-col class="py-0" cols="12" sm="6">
                    <v-text-field
                        v-model="herramienta.proveedorTelefono"
                        label="Telefono Provedor"
                        placeholder="Número de telefono"
                        prepend-inner-icon="phone"
                        type="tel"
                        counter
                        outlined
                        required
                        :error-messages="proveedorTelefonoErrors"
                        @input="$v.herramienta.proveedorTelefono.$touch()"
                        @blur="$v.herramienta.proveedorTelefono.$touch()"
                    />
                </v-col>
                <v-col class="d-flex justify-content-right">
                    <v-btn
                        color="orange accent-3"
                        dark
                        v-if="id !== ''"
                        @click="actualizarDatosHerramienta"
                    >
                        <v-icon left>edit</v-icon>
                        Editar herramienta
                    </v-btn>
                    <v-btn color="primary" type="submit" dark v-else>
                        <v-icon left>add_circle</v-icon>
                        Registrar herramienta
                    </v-btn>
                    <v-btn
                        class="mx-2"
                        color="red darken-1"
                        dark
                        @click="$emit('ocultarModalHerramienta')"
                    >
                        <v-icon left>close</v-icon>
                        Cerrar
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
    import { db } from "../../functions/firebase";
    import Swal from "sweetalert2";
    import { validationMixin } from "vuelidate";
    import { required, minLength, numeric } from "vuelidate/lib/validators";
    import { tipoHerramientas } from "../../functions/constantes";

    export default {
        name: "FormularioHerramienta",
        mixins: [validationMixin],
        props: {
            id: {
                type: String,
                default: "",
                required: true,
            },
        },
        data() {
            return {
                herramienta: {
                    cantidad: "",
                    entregadasPersonal: 0,
                    marca: "",
                    nombre: "",
                    tipoHerramienta: "",
                    proveedor: "",
                    proveedorTelefono: "",
                },
                selects: {
                    tipoHerramienta: tipoHerramientas,
                    asignacion: [],
                },
            };
        },
        validations() {
            return {
                herramienta: {
                    cantidad: {
                        required,
                        numeric,
                    },
                    marca: {
                        required,
                        minLength: minLength(3),
                    },
                    nombre: {
                        required,
                        minLength: minLength(3),
                    },
                    tipoHerramienta: {
                        required,
                    },
                    proveedor: {
                        required,
                        minLength: minLength(3),
                    },
                    proveedorTelefono: {
                        required,
                        numeric,
                    },
                },
            };
        },
        methods: {
            registrarHerramienta() {
                this.$v.$touch();
                if (this.$v.$invalid) return;

                db.collection("herramientas")
                    .add(this.herramienta)
                    .then(() => {
                        this.borrarDatosFormulario();
                        this.$emit("ocultarModalHerramienta", false);
                        Swal.fire({
                            title: "Exito",
                            text: "Se registro la herramienta",
                            icon: "success",
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error",
                            text:
                                "Ocurrio un error al registrar la herramienta",
                            icon: "error",
                        });
                    });
            },
            actualizarDatosHerramienta() {
                this.$v.$touch();
                if (this.$v.$invalid) return;
                const docRef = db.collection("herramientas").doc(this.id);
                docRef
                    .update(this.herramienta)
                    .then(() => {
                        this.borrarDatosFormulario();
                        this.$emit("ocultarModalHerramienta", false);
                        Swal.fire({
                            title: "Exito",
                            text: "Se actualiso la herramienta",
                            icon: "success",
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error",
                            text:
                                "Ocurrio un error al actualizar la herramienta",
                            icon: "error",
                        });
                    });
            },
            borrarDatosFormulario() {
                this.herramienta.cantidad = "";
                this.herramienta.disponibles = "";
                this.herramienta.marca = "";
                this.herramienta.nombre = "";
                this.herramienta.categoriaherramienta = "";
                this.herramienta.proveedor = "";
                this.herramienta.proveedorTelefono = "";
                this.herramienta.asignacion = [];
            },

            obtenerDatosHerramienta(id) {
                const docRef = db.collection("herramientas").doc(id);
                docRef.get().then((doc) => {
                    if (doc.exists) {
                        this.herramienta = doc.data();
                    } else {
                        Swal.fire({
                            title: "Error",
                            text:
                                "La herramienta a la que trata de acceder no existe, pruebe con otra",
                        });
                    }
                });
            },
        },
        computed: {
            cantidadErrors() {
                const errors = [];
                if (!this.$v.herramienta.cantidad.$dirty) return errors;
                !this.$v.herramienta.cantidad.required &&
                    errors.push("El campo cantidad es requerido");
                !this.$v.herramienta.cantidad.numeric &&
                    errors.push(
                        "El campo cantidad solo acepta valores númericos"
                    );
                return errors;
            },
            marcaErrors() {
                const errors = [];
                if (!this.$v.herramienta.marca.$dirty) return errors;
                !this.$v.herramienta.marca.required &&
                    errors.push("El campo marca es requerido");
                !this.$v.herramienta.marca.minLength &&
                    errors.push(
                        `El campo marca acepta minímo ${this.$v.herramienta.marca.$params.minLength.min} valores`
                    );
                return errors;
            },
            nombreErrors() {
                const errors = [];
                if (!this.$v.herramienta.nombre.$dirty) return errors;
                !this.$v.herramienta.nombre.required &&
                    errors.push("El campo nombre es requerido");
                !this.$v.herramienta.nombre.minLength &&
                    errors.push(
                        `El campo nombre acepta minímo ${this.$v.herramienta.nombre.$params.minLength.min} valores`
                    );
                return errors;
            },
            tipoHerramientaErrors() {
                const errors = [];
                if (!this.$v.herramienta.tipoHerramienta.$dirty) return errors;
                !this.$v.herramienta.tipoHerramienta.required &&
                    errors.push("El campo tipo de herramienta es requerido");
                return errors;
            },
            proveedorErrors() {
                const errors = [];
                if (!this.$v.herramienta.proveedor.$dirty) return errors;
                !this.$v.herramienta.proveedor.required &&
                    errors.push("El campo proveedor es requerido");
                !this.$v.herramienta.proveedor.minLength &&
                    errors.push(
                        `El campo proveedor acepta minímo ${this.$v.herramienta.proveedor.$params.minLength.min} valores`
                    );
                return errors;
            },
            proveedorTelefonoErrors() {
                const errors = [];
                if (!this.$v.herramienta.proveedorTelefono.$dirty)
                    return errors;
                !this.$v.herramienta.proveedorTelefono.required &&
                    errors.push("El campo cantidad es requerido");
                !this.$v.herramienta.proveedorTelefono.numeric &&
                    errors.push(
                        "El campo teléfono proveedor solo acepta valores númericos"
                    );
                return errors;
            },
        },
        created() {
            if (this.id !== "") {
                this.obtenerDatosHerramienta(this.id);
            }
        },
    };
</script>
