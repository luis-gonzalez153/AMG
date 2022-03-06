<template>
    <div class="mx-3 my-0 pt-3">
        <BreadCrumb v-bind:items="breadCrumbs" />
        <v-data-table
            :headers="headers"
            :items="promociones"
            sort-by="categoria"
            class="elevation-1"
            :loading="loader"
            loading-text="Cargando la información, por favor espere un monento..."
            :search="buscar"
            append-icon="search"
            label="Buscar"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Promociones</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        :to="rutaRegistrarPromocion"
                    >
                        <v-icon class="mr-2">add_circle</v-icon>
                        Nueva promoción
                    </v-btn>
                </v-toolbar>
                <v-text-field
                    v-model="buscar"
                    label="Buscar..."
                    prepend-inner-icon="search"
                    class="mx-4"
                />
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn
                    x-small
                    outlined
                    color="blue darken-3"
                    dark
                    fab
                    class="mx-1 my-1"
                    :to="rutaEditarPromocion.replace(':id', item.id)"
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
                    @click="mostrarModalPromocion(item)"
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
                    @click="borrarPromocion(item.id)"
                >
                    <v-icon>
                        delete
                    </v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <v-dialog
            v-model="mostrarModal"
            persistent
            max-width="900"
            height="auto"
        >
            <VistaPreviaPromocion
                v-bind:promocion="promocionSeleccionada"
                @ocultarModal="this.ocultarModalPromocion"
            />
        </v-dialog>
    </div>
</template>

<script>
    import { db } from "../../functions/firebase";
    import Swal from "sweetalert2";
    import { rutas } from "../../functions/rutas";
    import { breadCrumbs } from "../../functions/constantes";

    export default {
        name: "ListarPromociones",
        components: {
            VistaPreviaPromocion: () => import("./VistaPreviaPromocion.vue"),
            BreadCrumb: () => import("../compoentesGenerales/BreadCrumb.vue"),
        },
        data: () => ({
            headers: [
                {
                    text: "id",
                    align: "center",
                    sortable: false,
                    value: "id",
                },
                {
                    text: "Título",
                    align: "center",
                    sortable: true,
                    value: "titulo",
                },
                {
                    text: "Fecha Inicio",
                    align: "center",
                    sortable: true,
                    value: "fechaInicioPromocion",
                },
                {
                    text: "Fecha Finalización",
                    align: "center",
                    sortable: true,
                    value: "fechaFinPromocion",
                },
                { text: "Categoria", value: "categoria" },
                { text: "Acción", value: "actions", sortable: false },
            ],
            promociones: [],
            loader: false,
            buscar: "",
            promocionSeleccionada: null,
            mostrarModal: false,
            rutaRegistrarPromocion: rutas.PROMOCION_REGISTRAR,
            rutaEditarPromocion: rutas.PROMOCION_EDITAR,
            breadCrumbs: breadCrumbs.promosionesListar,
        }),
        created() {
            this.obtenerPromocion();
        },
        methods: {
            obtenerPromocion() {
                this.loader = true;
                db.collection("promociones")
                    .get()
                    .then((respuesta) => {
                        respuesta.forEach((element) => {
                            this.promociones = [
                                ...this.promociones,
                                { id: element.id, ...element.data() },
                            ];
                        });
                        this.loader = false;
                    })
                    .catch(() => {
                        this.loader = false;
                        Swal.fire({
                            title: "Error!",
                            text: "Ocurrió un error en el servidor!",
                            icon: "error",
                        });
                    });
            },
            borrarPromocion(id) {
                Swal.fire({
                    title: "Esta seguro de borrar la promoción?",
                    showDenyButton: true,
                    showConfirmButton: true,
                    icon: "question",
                    denyButtonText: "No, cancelar",
                    confirmButtonText: "Si, borrar",
                }).then((opcion) => {
                    if (opcion.isConfirmed) {
                        db.collection("promociones")
                            .doc(id)
                            .delete()
                            .then(() => {
                                Swal.fire(
                                    "Exito",
                                    "Se borro la promoción",
                                    "success"
                                );
                                this.promociones = this.promociones.filter(
                                    (item) => item.id !== id
                                );
                            });
                    }
                });
            },
            mostrarModalPromocion(item) {
                this.promocionSeleccionada = item;
                this.mostrarModal = true;
            },
            ocultarModalPromocion() {
                this.promocionSeleccionada = null;
                this.mostrarModal = false;
            },
        },
    };
</script>
