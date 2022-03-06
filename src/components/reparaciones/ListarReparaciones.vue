<template>
    <v-main class="mx-3 my-0 pt-3">
        <v-data-table
            :headers="headers"
            :items="reparaciones"
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
                    <v-toolbar-title>Reparaciones </v-toolbar-title>
                    <v-spacer></v-spacer>
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
                    :to="rutaReparacion.replace(':id', item.id)"
                >
                    <v-icon dark>
                        edit
                    </v-icon>
                </v-btn>
                <v-btn
                    color="red darken-1"
                    outlined
                    fab
                    dark
                    x-small
                    class="mx-1 my-1"
                >
                    <v-icon>
                        delete
                    </v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-main>
</template>

<script>
    import { db } from "../../functions/firebase";
    import Swal from "sweetalert2";
    import { rutas } from "../../functions/rutas";

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
                    text: "Estado reparación",
                    align: "center",
                    sortable: true,
                    value: "estadoReparacion",
                },
                { text: "Horario", value: "horarioreparacion" },
                { text: "Encargado", value: "empleadoreparacion" },
                { text: "Acción", value: "actions", sortable: false },
            ],
            reparaciones: [],
            loader: false,
            buscar: "",
            rutaReparacion: rutas.REPARACIONES_EDITAR,
        }),
        created() {
            this.obtenerReparacion();
        },
        methods: {
            obtenerReparacion() {
                this.loader = true;
                db.collection("reparaciones")
                    .get()
                    .then((respuesta) => {
                        respuesta.forEach((element) => {
                            this.reparaciones = [
                                ...this.reparaciones,
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
        },
    };
</script>
