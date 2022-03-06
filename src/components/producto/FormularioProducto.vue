<template>
    <v-form>
        <v-row>
            <v-col class="py-0" cols="12" sm="6">
                <v-text-field
                    v-model="producto.cantidad"
                    label="Cantidad"
                    placeholder="1"
                    type="text"
                    outlined
                    required
                    :error-messages="cantidadErrors"
                    @input="$v.producto.cantidad.$touch()"
                    @blur="$v.producto.cantidad.$touch()"
                />
            </v-col>
            <v-col class="py-0" cols="12" sm="6">
                <v-text-field
                    v-model="producto.marca"
                    label="Marca"
                    placeholder="AirFlow"
                    type="text"
                    outlined
                    required
                    :error-messages="marcaErrors"
                    @input="$v.producto.marca.$touch()"
                    @blur="$v.producto.marca.$touch()"
                />
            </v-col>
            <v-col class="py-0" cols="12" sm="6">
                <v-text-field
                    v-model="producto.nombre"
                    label="Nombre"
                    placeholder="Filtro"
                    type="text"
                    outlined
                    required
                    :error-messages="nombreErrors"
                    @input="$v.producto.nombre.$touch()"
                    @blur="$v.producto.nombre.$touch()"
                />
            </v-col>
            <v-col class="py-0" cols="12" sm="6">
                <v-select
                    v-model="producto.tipoProducto"
                    :items="selects.tipoProductos"
                    item-text="nombre"
                    item-value="value"
                    label="Tipo de producto"
                    placeholder="Seleccione un tipo de producto..."
                    prepend-inner-icon="inventory"
                    outlined
                    required
                    :error-messages="tipoProductoErrors"
                    @input="$v.producto.tipoProducto.$touch()"
                    @blur="$v.producto.tipoProducto.$touch()"
                />
            </v-col>
            <v-col class="py-0" cols="12" sm="6">
                <v-text-field
                    v-model="producto.precio"
                    label="Precio"
                    placeholder="$0.000.00"
                    prepend-inner-icon="attach_money"
                    type="text"
                    outlined
                    required
                    :error-messages="precioErrors"
                    @input="$v.producto.precio.$touch()"
                    @blur="$v.producto.precio.$touch()"
                />
            </v-col>
            <v-col class="py-0" cols="12" sm="6">
                <v-text-field
                    v-model="producto.proveedor"
                    label="Provedor"
                    placeholder="Distri Repuestos"
                    prepend-inner-icon="store"
                    type="text"
                    outlined
                    required
                    :error-messages="proveedorErrors"
                    @input="$v.producto.proveedor.$touch()"
                    @blur="$v.producto.proveedor.$touch()"
                />
            </v-col>
            <v-col class="py-0" cols="12" sm="6">
                <v-text-field
                    v-model="producto.proveedorTelefono"
                    label="Telefono Provedor"
                    placeholder="3008951234"
                    prepend-inner-icon="phone"
                    type="text"
                    outlined
                    required
                    :error-messages="proveedorTelefonoErrors"
                    @input="$v.producto.proveedorTelefono.$touch()"
                    @blur="$v.producto.proveedorTelefono.$touch()"
                />
            </v-col>
            <v-col cols="12" class="d-flex justify-content-right">
                <v-btn
                    color="orange accent-3"
                    dark
                    v-if="id !== ''"
                    @click="editarProducto"
                >
                    <v-icon left>edit</v-icon>
                    Editar producto
                </v-btn>
                <v-btn color="primary" dark v-else @click="registrarProducto">
                    <v-icon left>add_circle</v-icon>
                    Registrar producto
                </v-btn>
                <v-btn
                    class="mx-2"
                    color="red darken-1"
                    dark
                    @click="$emit('ocultarModalProducto')"
                >
                    <v-icon left>close</v-icon>
                    Cerrar
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script>
    import { db } from "../../functions/firebase";
    import Swal from "sweetalert2";
    import { validationMixin } from "vuelidate";
    import { required, minLength, numeric } from "vuelidate/lib/validators";
    import { tipoProductos } from "../../functions/constantes";

    export default {
        name: "FormularioProducto",
        mixins: [validationMixin],
        props: {
            idProducto: {
                type: String,
                default: "",
                required: true,
            },
        },
        data() {
            return {
                id: this.idProducto,
                producto: {
                    cantidad: "",
                    marca: "",
                    nombre: "",
                    tipoProducto: "",
                    precio: "",
                    provedor: "",
                    proveedorTelefono: "",
                },
                selects: {
                    tipoProductos,
                },
            };
        },
        validations() {
            return {
                producto: {
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
                    tipoProducto: {
                        required,
                    },
                    precio: {
                        required,
                        numeric,
                        minLength: minLength(1),
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
            registrarProducto() {
                this.$v.$touch();
                if (this.$v.$invalid) return;

                db.collection("productos")
                    .add(this.producto)
                    .then(() => {
                        this.borrarDatosFormulario();
                        this.$emit("ocultarModalProducto", false);
                        Swal.fire({
                            title: "Exito!",
                            text: "Se registro el producto correctamente",
                            icon: "success",
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error!",
                            text: "Ocurrio un error, intente una vez más!",
                            icon: "error",
                        });
                    });
            },
            editarProducto() {
                this.$v.$touch();
                if (this.$v.$invalid) return;
                db.collection("productos")
                    .doc(this.id)
                    .update(this.producto)
                    .then(() => {
                        this.borrarDatosFormulario();
                        this.$emit("ocultarModalProducto", false);
                        Swal.fire({
                            title: "Exito!",
                            text: "Se actualizo el producto correctamente!",
                            icon: "success",
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error!",
                            text: "Ocurrio un error, intente una vez más!",
                            icon: "error",
                        });
                    });
            },
            borrarDatosFormulario() {
                this.producto.cantidad = "";
                this.producto.marca = "";
                this.producto.nombre = "";
                this.producto.tipoProducto = "";
                this.producto.precio = "";
                this.producto.provedor = "";
                this.producto.proveedorTelefono = "";
                this.producto.ubicacionproducto = "";
            },
            obtenerDatosProducto() {
                Swal.fire({
                    title: "Cargando los datos!",
                    text: "Espere un momento...",
                    icon: "info",
                });

                Swal.showLoading();

                db.collection("productos")
                    .doc(this.id)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            this.producto = doc.data();
                            Swal.close();
                            return;
                        }
                        Swal.close();

                        Swal.fire({
                            text: "Error",
                            text:
                                "Ocurrio un error, el registro no existe o ha sido borrado.",
                            icon: "error",
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
            cantidadErrors() {
                const errors = [];
                if (!this.$v.producto.cantidad.$dirty) return errors;
                !this.$v.producto.cantidad.required &&
                    errors.push("El campo cantidad es requerido");
                !this.$v.producto.cantidad.numeric &&
                    errors.push(
                        "El campo cantidad solo acepta valores númericos"
                    );
                return errors;
            },
            marcaErrors() {
                const errors = [];
                if (!this.$v.producto.marca.$dirty) return errors;
                !this.$v.producto.marca.required &&
                    errors.push("El campo marca es requerido");
                !this.$v.producto.marca.minLength &&
                    errors.push(
                        `El campo marca acepta minímo ${this.$v.producto.marca.$params.minLength.min} valores`
                    );
                return errors;
            },
            nombreErrors() {
                const errors = [];
                if (!this.$v.producto.nombre.$dirty) return errors;
                !this.$v.producto.nombre.required &&
                    errors.push("El campo nombre es requerido");
                !this.$v.producto.nombre.minLength &&
                    errors.push(
                        `El campo nombre acepta minímo ${this.$v.producto.nombre.$params.minLength.min} valores`
                    );
                return errors;
            },
            precioErrors() {
                const errors = [];
                if (!this.$v.producto.precio.$dirty) return errors;
                !this.$v.producto.precio.required &&
                    errors.push("El campo precio es requerido");
                !this.$v.producto.precio.numeric &&
                    errors.push("El campo precio solo números");
                !this.$v.producto.precio.minLength &&
                    errors.push(
                        `El campo precio acepta minímo ${this.$v.producto.precio.$params.minLength.min} valor`
                    );
                return errors;
            },
            tipoProductoErrors() {
                const errors = [];
                if (!this.$v.producto.tipoProducto.$dirty) return errors;
                !this.$v.producto.tipoProducto.required &&
                    errors.push("El campo tipo de producto es requerido");
                return errors;
            },
            proveedorErrors() {
                const errors = [];
                if (!this.$v.producto.proveedor.$dirty) return errors;
                !this.$v.producto.proveedor.required &&
                    errors.push("El campo proveedor es requerido");
                !this.$v.producto.proveedor.minLength &&
                    errors.push(
                        `El campo proveedor acepta minímo ${this.$v.producto.proveedor.$params.minLength.min} valores`
                    );
                return errors;
            },
            proveedorTelefonoErrors() {
                const errors = [];
                if (!this.$v.producto.proveedorTelefono.$dirty) return errors;
                !this.$v.producto.proveedorTelefono.required &&
                    errors.push("El campo cantidad es requerido");
                !this.$v.producto.proveedorTelefono.numeric &&
                    errors.push(
                        "El campo teléfono proveedor solo acepta números"
                    );
                return errors;
            },
        },
        created() {
            if (this.idProducto) {
                this.obtenerDatosProducto();
            }
        },
    };
</script>
