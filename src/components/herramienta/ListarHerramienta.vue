<template>
    <v-main class="mx-3 my-0 pt-3">
        <v-data-table
            :headers="headers"
            :items="herramienta"
            sort-by="categoria"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Administrar Herramienta </v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon small class="mx-1">
                    mdi-pencil
                </v-icon>
                <v-icon small class="mx-1">
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
               /* {
                    text: "id",
                    align: "center",
                    sortable: false,
                    value: "id",
                },*/
                {
                    text: "Cantidad",
                    align: "center",
                    sortable: true,
                    value: "cantidad",
                },
                {
                    text: "Marca",
                    align: "center",
                    sortable: true,
                    value: "marca",
                },
                { text: "Descripción", value: "nombre" },
                { text: "Categotia", value: "categoriaherramienta" },
                { text: "Provedor", value: "provedor" },
                { text: "Tel. Provedor", value: "provedortelefono" },
                { text: "Asignación", value: "asignacion" },
                { text: "Acción", value: "actions", sortable: false },
            ],
            herramienta: [],
        }),
        created() {
            Swal.fire({
                title: "Obteniendo registros!",
                text: "Por favor espere un momento...",
                icon: "info",
            });
            Swal.showLoading();
            this.obtenerHerramienta()
                .then((respuesta) => {
                    respuesta.forEach((element) => {
                        this.herramienta = [
                            ...this.herramienta,
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
            obtenerHerramienta: () => db.collection("herramienta").get(),
        },
    };
</script>

<style lang="scss" scoped></style>
