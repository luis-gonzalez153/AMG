<template>
    <v-main class="mx-3 my-0 pt-3">
        <v-data-table
            :headers="headers"
            :items="promocion"
            sort-by="categoria"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Administrar Pubicaciones</v-toolbar-title>
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
               {
                    text: "id",
                    align: "center",
                    sortable: false,
                    value: "id",
                },
                
                {
                    text: "Fecha Inicio",
                    align: "center",
                    sortable: true,
                    value: "inicio_promocion",
                },
                {
                    text: "Fecha Finalización",
                    align: "center",
                    sortable: true,
                    value: "fin_promocion",
                },
                { text: "Descripción", value: "detalles" },
                { text: "Categoria", value: "categoria" },
                { text: "Ubicación", value: "direccion" },
                { text: "Acción", value: "actions", sortable: false },
            ],
            promocion: [],
        }),
        created() {
            Swal.fire({
                title: "Obteniendo promociones!",
                text: "Por favor espere un momento...",
                icon: "info",
            });
            Swal.showLoading();
            this.obtenerPromocion()
                .then((respuesta) => {
                    respuesta.forEach((element) => {
                        this.promocion = [
                            ...this.promocion,
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
            obtenerPromocion: () => db.collection("promociones").get(),
        },
    };
</script>

<style lang="scss" scoped></style>
