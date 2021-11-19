<template>
    <v-main class="mx-3 my-0 pt-3">
        <v-data-table
            :headers="headers"
            :items="citas"
            sort-by="categoria"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Administrar Citas </v-toolbar-title>
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
                    text: "Fecha",
                    align: "start",
                    sortable: false,
                    value: "fecha",
                },
                { text: "Codigo", value: "codigo" },
                { text: "Cliente", value: "cliente" },
                { text: "Asunto", value: "asunto" },
                { text: "Técnico", value: "tecnico" },
                { text: "Acción", value: "actions", sortable: false },
            ],
            citas: [],
        }),
        created() {
            Swal.fire({
                title: "Obteniendo registros!",
                text: "Por favor espere un momento...",
                icon: "info",
            });
            Swal.showLoading();
            this.obtenerCitas()
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

        methods: {
            obtenerCitas: () => db.collection("citas").get(),
        },
    };
</script>

<style lang="scss" scoped></style>
