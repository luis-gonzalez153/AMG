<template>
    <v-main class="mx-3 my-0 pt-3">
        <v-data-table
            :headers="headers"
            :items="usuarios"
            sort-by="categoria"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Administrar Usuarios </v-toolbar-title>
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
                    text: "Nombres",
                    align: "center",
                    sortable: true,
                    value: "nombres",
                },
                {
                    text: "Apellidos",
                    align: "center",
                    sortable: true,
                    value: "apellidos",
                },
                { text: "Identificacíon", value: "identificacion" },
                { text: "Genero", value: "genero" },
                { text: "E-mail", value: "email" },
                { text: "Teléfono", value: "telefono" },
                { text: "Dirección", value: "direccion" },
                { text: "Acción", value: "actions", sortable: false },
            ],
            usuarios: [],
        }),
        created() {
            Swal.fire({
                title: "Obteniendo registros!",
                text: "Por favor espere un momento...",
                icon: "info",
            });
            Swal.showLoading();
            this.obtenerUsuarios()
                .then((respuesta) => {
                    respuesta.forEach((element) => {
                        this.usuarios = [
                            ...this.usuarios,
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
            obtenerUsuarios: () => db.collection("ciudadanos").get(),
        },
    };
</script>

<style lang="scss" scoped></style>
