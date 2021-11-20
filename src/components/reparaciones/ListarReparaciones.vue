<template>
    <v-main class="mx-3 my-0 pt-3">
        <v-data-table
            :headers="headers"
            :items="reparacion"
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
                    text: "Fecha Reparación",
                    align: "center",
                    sortable: true,
                    value: "fechareparacion",
                },
                {
                    text: "Cita",
                    align: "center",
                    sortable: true,
                    value: "cita",
                },
                { text: "Horario", value: "horarioreparacion" },
                { text: "Encargado", value: "empleadoreparacion" },
                { text: "Productos", value: "productoreparacion" },
                { text: "Tipo Reparación", value: "tiporeparacion" },
                { text: "Comentarios", value: "comentarios" },
                { text: "Acción", value: "actions", sortable: false },
            ],
            reparacion: [],
        }),
        created() {
            Swal.fire({
                title: "Obteniendo registros!",
                text: "Por favor espere un momento...",
                icon: "info",
            });
            Swal.showLoading();
            this.obtenerReparacion()
                .then((respuesta) => {
                    respuesta.forEach((element) => {
                        this.reparacion = [
                            ...this.reparacion,
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
            obtenerReparacion: () => db.collection("reparaciones").get(),
        },
    };
</script>

<style lang="scss" scoped></style>
