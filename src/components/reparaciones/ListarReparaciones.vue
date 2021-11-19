<template>
    <v-main class="mx-3 my-0 pt-3">
        <v-data-table
            :headers="headers"
            :items="reparaciones"
            sort-by="categoria"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Administrar Reparaciones </v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2">
                    mdi-pencil
                </v-icon>
                <v-icon small>
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </v-main>
</template>

<script>
    import { db } from "../../functions/firebase";
    import Swal from "sweetalert2";

    export default {
        data: () => ({
            headers: [
                {
                    text: "id",
                    align: "center",
                    sortable: false,
                    value: "id",
                },
                {
                    text: "Fecha Inicio",
                    align: "start",
                    sortable: false,
                    value: "fecha_inicio",
                },
                { text: "Fecha Fin", value: "fecha_fin" },
                { text: "Descripción", value: "descripcion" },
                { text: "Ubicación", value: "ubicacion" },
                { text: "Acción", value: "actions", sortable: false },
            ],
            reparaciones: [],
        }),
        created() {
            Swal.fire({
                title: "Obteniendo registros!",
                text: "Por favor espere un momento...",
                icon: "info",
            });
            Swal.showLoading();
            this.obtenerReparaciones()
                .then((respuesta) => {
                    respuesta.forEach((element) => {
                        this.reparaciones = [
                            ...this.reparaciones,
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

        methods: {
            obtenerReparaciones: () => db.collection("reparaciones").get(),
        },
    };
</script>

<style lang="scss" scoped></style>
