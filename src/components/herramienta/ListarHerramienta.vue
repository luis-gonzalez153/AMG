<template>
    <v-main class="mx-3 my-0 pt-3">
        <v-data-table
            :headers="headers"
            :items="herramientas"
            sort-by="categoria"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Administrar Herramienta </v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                        >
                            Nueva Herramienta
                        </v-btn>
                    </template>
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
                    text: "Id",
                    align: "center",
                    sortable: false,
                    value: "name",
                },
                {
                    text: "Nombre",
                    align: "start",
                    sortable: true,
                    value: "nombre",
                },
                { text: "Categoria", value: "categoria" },
                { text: "Número", value: "numero" },
                { text: "Unidades", value: "unidades" },
                { text: "Técnico", value: "tecnico" },
                { text: "Acción", value: "actions", sortable: false },
            ],
            herramientas: [],
        }),
        created() {
            Swal.fire({
                title: "Obteniendo registros!",
                text: "Por favor espere un momento...",
                icon: "info",
            });
            Swal.showLoading();
            this.obtenerHerramientas()
                .then((respuesta) => {
                    respuesta.forEach((element) => {
                        this.herramientas = [
                            ...this.herramientas,
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
            obtenerHerramientas: () => db.collection("herramientas").get(),
        },
    };
</script>

<style lang="scss" scoped></style>
