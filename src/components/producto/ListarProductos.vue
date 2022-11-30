<template>
    <div class="mx-3 my-0 pt-3">
        <BreadCrumb v-bind:items="breadCrumbs" />
        <v-data-table
            :headers="headers"
            :items="productos"
            sort-by="categoria"
            class="elevation-1"
            :sort-desc="[false, true]"
            multi-sort
            :loading="loader"
            loading-text="Cargando la información, por favor espere un monento..."
            :search="buscar"
            append-icon="search"
            label="Buscar"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Productos</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        @click="mostrarModalProducto()"
                    >
                        <v-icon class="mr-2">add_circle</v-icon>
                        Nuevo producto
                    </v-btn>
                </v-toolbar>
                <v-text-field
                    v-model="buscar"
                    label="Buscar..."
                    prepend-inner-icon="search"
                    class="mx-4"
                ></v-text-field>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn
                    x-small
                    outlined
                    color="blue darken-3"
                    dark
                    fab
                    class="mx-1 my-1"
                    @click="mostrarModalProducto(item.id)"
                >
                    <v-icon dark>
                        edit
                    </v-icon>
                </v-btn>
                <v-btn
                    color="grey darken-3"
                    outlined
                    fab
                    dark
                    x-small
                    class="mx-1 my-1"
                    @click="mostrarModalVistaPrevia(item)"
                >
                    <v-icon>
                        visibility
                    </v-icon>
                </v-btn>
                <v-btn
                    color="red darken-1"
                    outlined
                    fab
                    dark
                    x-small
                    class="mx-1 my-1"
                    @click="borrarProducto(item.id)"
                >
                    <v-icon>
                        delete
                    </v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <v-dialog
            max-width="800"
            class="ma-2 pa-2"
            persistent
            v-model="modalProducto"
        >
            <v-card height="auto">
                <v-card-title class="py-2 mb-3 d-flex justify-center"
                    ><h3>
                        {{
                            idSeleccionado !== ""
                                ? "Editar producto"
                                : "Registrar producto"
                        }}
                    </h3>
                </v-card-title>
                <v-card-text class="pa-3">
                    <FormularioProducto
                        v-bind:idProducto="idSeleccionado"
                        :key="idSeleccionado"
                        @ocultarModalProducto="ocultarModalProducto"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="modalVistaPrevia" persistent max-width="600">
            <VistaPreviaProducto
                v-bind:producto="datosProducto"
                @ocultarModal="this.ocultarModalVistaPrevia"
            />
        </v-dialog>
    </div>
</template>

<script>
    import { db } from "../../functions/firebase";
    import Swal from "sweetalert2";
    import { breadCrumbs } from "../../functions/constantes";

    export default {
        name: "ListarProductos",
        components: {
            FormularioProducto: () => import("./FormularioProducto.vue"),
            VistaPreviaProducto: () => import("./VistaPreviaProducto.vue"),
            BreadCrumb: () => import("../compoentesGenerales/BreadCrumb.vue"),
        },
        data: () => ({
            headers: [
                {
                    text: "Nombre",
                    sortable: false,
                    value: "nombre",
                },
                {
                    text: "Marca",
                    sortable: true,
                    value: "marca",
                },
                {
                    text: "Cantidad",
                    align: "center",
                    sortable: true,
                    value: "cantidad",
                },
                { text: "Categoria", value: "tipoProducto" },
                { text: "Precio", value: "precio" },
                { text: "Proveedor", value: "proveedor" },
                { text: "Tel. Provedor", value: "proveedorTelefono" },
                { text: "Acción", value: "actions", sortable: false },
            ],
            productos: [],
            buscar: "",
            loader: false,
            idSeleccionado: "",
            datosProducto: null,
            modalProducto: false,
            modalVistaPrevia: false,
            breadCrumbs: breadCrumbs.productos,
        }),
        created() {
            this.obtenerProductos();
        },
        methods: {
            obtenerProductos() {
                this.loader = true;
                db.collection("productos")
                    .get()
                    .then((respuesta) => {
                        respuesta.forEach((element) => {
                            this.productos = [
                                ...this.productos,
                                { id: element.id, ...element.data() },
                            ];
                        });
                        this.loader = false;
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({
                            title: "Error!",
                            text: "Ocurrió un error en el servidor!",
                            icon: "error",
                        });
                        this.loader = false;
                    });
            },
            borrarProducto(id) {
                Swal.fire({
                    title: "Esta seguro de borrar el producto?",
                    icon: "question",
                    showDenyButton: true,
                    showConfirmButton: true,
                    denyButtonText: "No, cancelar",
                    confirmButtonText: "Si, borrar",
                }).then((opcion) => {
                    if (opcion.isConfirmed) {
                        db.collection("productos")
                            .doc(id)
                            .delete()
                            .then(() => {
                                Swal.fire(
                                    "Exito",
                                    "Se borro el producto",
                                    "success"
                                );
                                this.productos = this.productos.filter(
                                    (item) => item.id !== id
                                );
                            });
                    }
                });
            },
            mostrarModalProducto(id = "") {
                this.idSeleccionado = id;
                this.modalProducto = true;
            },
            ocultarModalProducto(opcionCerrar = true) {
                this.idSeleccionado = "";
                this.modalProducto = false;
                if (opcionCerrar) return;
                this.productos = [];
                this.obtenerProductos();
            },
            mostrarModalVistaPrevia(item) {
                this.datosProducto = item;
                this.modalVistaPrevia = true;
            },
            ocultarModalVistaPrevia() {
                this.datosProducto = null;
                this.modalVistaPrevia = false;
            },
        },
    };
</script>
