<template>
    <div class="mx-3 my-0 pt-3">
        <BreadCrumb v-bind:items="breadCrumbs" />
        <v-data-table
            :headers="headers"
            :items="herramientas"
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
                    <v-toolbar-title>Herramientas</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        @click="mostrarModalHerramienta()"
                    >
                        <v-icon class="mr-2">add_circle</v-icon>
                        Nueva herramienta
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
                    @click="mostrarModalHerramienta(item.id)"
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
                    @click="borrarHerramienta(item.id)"
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
            v-model="modalHerramienta"
        >
            <v-card height="auto">
                <v-card-title class="py-2 my-3 d-flex justify-center"
                    ><h3>
                        {{
                            idSeleccionado !== ""
                                ? "Editar herramienta"
                                : "Registrar herramienta"
                        }}
                    </h3>
                </v-card-title>
                <v-card-text class="pa-4">
                    <FormularioHerramienta
                        :key="idSeleccionado"
                        v-bind:id="idSeleccionado"
                        @ocultarModalHerramienta="ocultarModalHerramienta"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="modalVistaPrevia" persistent max-width="600">
            <VistaPreviaHerramienta
                v-bind:herramienta="datosHerramienta"
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
        name: "ListarHerramientas",
        components: {
            FormularioHerramienta: () => import("./FormularioHerramienta.vue"),
            VistaPreviaHerramienta: () =>
                import("./VistaPreviaHerramienta.vue"),
            BreadCrumb: () => import("../compoentesGenerales/BreadCrumb.vue"),
        },
        data: () => ({
            headers: [
                //{
                    //text: "id",
                    //align: "center",
                    //sortable: false,
                    //value: "id",
                //},
                {
                    text: "Cantidad",
                    align: "center",
                    sortable: true,
                    value: "cantidad",
                },
                {
                    text: "Entregadas",
                    align: "center",
                    sortable: true,
                    value: "entregadasPersonal",
                },
                {
                    text: "Nombre",
                    align: "center",
                    sortable: true,
                    value: "nombre",
                },
                {
                    text: "Marca",
                    align: "center",
                    sortable: true,
                    value: "marca",
                },
                {
                    text: "Tipo",
                    value: "tipoHerramienta",
                    sortable: true,
                    align: "center",
                },
                { text: "Acción", value: "actions", sortable: false },
            ],
            herramientas: [],
            idSeleccionado: "",
            buscar: "",
            loader: false,
            modalHerramienta: false,
            modalVistaPrevia: false,
            datosHerramienta: null,
            breadCrumbs: breadCrumbs.herramientas,
        }),
        created() {
            this.obtenerHerramientas();
        },
        methods: {
            obtenerHerramientas() {
                this.loader = true;
                db.collection("herramientas")
                    .get()
                    .then((respuesta) => {
                        respuesta.forEach((element) => {
                            this.herramientas = [
                                ...this.herramientas,
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
            mostrarModalHerramienta(id = "") {
                this.idSeleccionado = id;
                this.modalHerramienta = true;
            },
            ocultarModalHerramienta(opcionCerrar = true) {
                this.idSeleccionado = "";
                this.modalHerramienta = false;
                if (opcionCerrar) return;
                this.herramientas = [];
                this.obtenerHerramientas();
            },
            mostrarModalVistaPrevia(item) {
                this.datosHerramienta = item;
                this.modalVistaPrevia = true;
            },
            ocultarModalVistaPrevia() {
                this.modalVistaPrevia = false;
                this.datosHerramienta = null;
            },
            borrarHerramienta(id) {
                Swal.fire({
                    title: `Esta seguro de borrar la herramienta ${
                        this.herramientas.filter((item) => item.id === id)[0]
                            .nombre
                    } ?`,
                    icon: "question",
                    showDenyButton: true,
                    showConfirmButton: true,
                    denyButtonText: "No, cancelar",
                    confirmButtonText: "Si, borrar",
                }).then((opcion) => {
                    if (opcion.isConfirmed) {
                        db.collection("herramientas")
                            .doc(id)
                            .delete()
                            .then(() => {
                                Swal.fire(
                                    "Exito",
                                    "Se borro la herramienta",
                                    "success"
                                );
                                this.herramientas = this.herramientas.filter(
                                    (item) => item.id !== id
                                );
                            });
                    }
                });
            },
        },
    };
</script>

<style lang="scss" scoped></style>
