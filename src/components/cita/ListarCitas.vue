<template>
    <div>
        <BreadCrumb v-bind:items="breadCrumbs" />
        <v-data-table
            :headers="headers"
            :items="citas"
            sort-by="categoria"
            :sort-desc="[false, true]"
            multi-sort
            :loading="loader"
            loading-text="Cargando la información, por favor espere un monento..."
            :search="buscar"
            append-icon="search"
            label="Buscar"
            class="elevation-4 mx-3 my-0 pt-3"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Citas</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-text-field
                    v-model="buscar"
                    label="Buscar..."
                    prepend-inner-icon="search"
                    class="mx-4"
                ></v-text-field>
            </template>
            <template v-slot:item.estadoCita="{ item }">
                <v-chip
                    class="ma-0 rounded-xl"
                    color="success"
                    label
                    text-color="white"
                    small
                    v-if="item.estadoCita === 'Atendida'"
                >
                    <v-icon left small>
                        check_circle
                    </v-icon>
                    Atendida
                </v-chip>
                <v-chip
                    class="ma-0 rounded-xl"
                    color="error"
                    label
                    dark
                    small
                    v-else-if="item.estadoCita === 'Rechazada'"
                >
                    <v-icon left small>
                        cancel
                    </v-icon>
                    Cancelada
                </v-chip>
                <v-chip
                    class="ma-0 rounded-xl"
                    color="orange darken-1"
                    small
                    label
                    dark
                    v-else
                >
                    <v-icon left small>
                        pending
                    </v-icon>
                    Pendiente
                </v-chip>
            </template>
            <template
                class="d-flex justify-center"
                v-slot:item.actions="{ item }"
            >
                <v-btn
                    x-small
                    outlined
                    color="blue darken-3"
                    dark
                    fab
                    class="mx-1 my-1"
                    @click="mostrarModalCita(item)"
                >
                    <v-icon dark>
                        edit
                    </v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <v-dialog v-model="modalCita" persistent max-width="450px">
            <EditarCitaAdmin
                :key="idCita"
                v-bind:id="idCita"
                v-bind:estadoCita="estadoCita"
                @ocultarModalCita="ocultarModalCita"
            />
        </v-dialog>
    </div>
</template>

<script>
    import { db } from "../../functions/firebase";
    import Swal from "sweetalert2";
    import { breadCrumbs } from "../../functions/constantes";

    export default {
        name: "ListarCitas",
        components: {
            BreadCrumb: () => import("../compoentesGenerales/BreadCrumb.vue"),
            EditarCitaAdmin: () => import("./EditarCitaAdmin.vue"),
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
                    text: "Fecha",
                    align: "center",
                    sortable: true,
                    value: "fecha",
                },
                { text: "Hora", value: "tiempo", sortable: true },
                { text: "Estado", value: "estadoCita", sortable: true },
                { text: "Cliente", value: "cliente", sortable: true },
                { text: "Acción", value: "actions", sortable: false },
            ],
            citas: [],
            buscar: "",
            loader: false,
            breadCrumbs: breadCrumbs.citasAdmin,
            modalCita: false,
            estadoCita: "",
            idCita: "",
        }),
        created() {
            this.obtenerCitas();
        },
        methods: {
            mostrarModalCita(cita) {
                this.idCita = cita.id;
                this.estadoCita = cita.estadoCita;
                this.modalCita = true;
            },
            ocultarModalCita(estadoCita) {
                if (this.estadoCita !== estadoCita) {
                    this.obtenerCitas();
                }

                this.indexCita = -1;
                this.idCita = "";
                this.estadoCita = "";
                this.modalCita = false;
            },
            obtenerCitas() {
                this.citas = [];

                Swal.fire({
                    title: "Obteniendo registros!",
                    text: "Por favor espere un momento...",
                    icon: "info",
                });
                Swal.showLoading();
                db.collectionGroup("citas")
                    .get()
                    .then((respuesta) => {
                        respuesta.forEach((element) => {
                            this.citas = [
                                ...this.citas,
                                { id: element.id, ...element.data() },
                            ];
                        });
                        Swal.close();
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error!",
                            text: "Ocurrió un error en el servidor!",
                            icon: "error",
                        });
                    });
            },
        },
    };
</script>

<style lang="scss" scoped></style>
