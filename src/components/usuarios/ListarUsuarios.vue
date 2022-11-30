<template>
    <div class="mx-3 my-0 pt-3">
        <BreadCrumb v-bind:items="breadCrumbs" />
        <v-data-table
            :headers="headers"
            :items="usuarios"
            sort-by="categoria"
            :sort-desc="[false, true]"
            multi-sort
            class="elevation-1"
            :loading="loader"
            loading-text="Cargando la información, por favor espere un monento..."
            :search="buscar"
            append-icon="search"
            label="Buscar"
        >
            <template v-slot:top>
                <v-toolbar flat color="blue-grey lighten-5">
                    <v-toolbar-title>Usuarios</v-toolbar-title>
                </v-toolbar>
                <v-text-field
                    v-model="buscar"
                    label="Buscar..."
                    prepend-inner-icon="search"
                    class="mx-4"
                ></v-text-field>
            </template>
            <template v-slot:item.rol="{ item }">
                <v-chip
                    v-if="item.rol === 'CLIENTE'"
                    color="blue darken-2"
                    dark
                >
                    {{ item.rol }}
                </v-chip>
                <v-chip v-else-if="item.rol === 'EMPLEADO'" dark color="orange">
                    {{ item.rol }}
                </v-chip>
                <v-chip v-else color="success">
                    {{ item.rol }}
                </v-chip>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn
                    x-small
                    outlined
                    color="blue darken-3"
                    dark
                    fab
                    class="mx-1 my-1"
                    @click="mostrarModalEditarUsuario(item)"
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
                    @click="borrarUsuario(item.id)"
                >
                    <v-icon>
                        delete
                    </v-icon>
                </v-btn>
            </template>
        </v-data-table>
        <v-dialog
            v-if="usuarioSeleccionado"
            v-model="modalEditarUsuario"
            persistent
            max-width="400"
        >
            <EditarUsuarioAdmin
                :key="idUsuario"
                v-bind:datosUsuario="usuarioSeleccionado"
                @ocultarModalEditarUsuario="ocultarModalEditarUsuario"
            />
        </v-dialog>
    </div>
</template>

<script>
    import { breadCrumbs } from "../../functions/constantes";
    import { db } from "../../functions/firebase";

    export default {
        name: "ListarUsuarios",
        components: {
            EditarUsuarioAdmin: () => import("./EditarUsuarioAdmin.vue"),
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
                { text: "Identificacíon", value: "nuip", sortable: false },
                {
                    text: "Rol",
                    align: "center",
                    sortable: true,
                    value: "rol",
                },
                { text: "Genero", value: "genero" },
                { text: "Teléfono", value: "telefono" },
                { text: "Acción", value: "actions", sortable: false },
            ],
            usuarios: [],
            buscar: "",
            loader: false,
            usuarioSeleccionado: null,
            idUsuario: "",
            modalEditarUsuario: false,
            breadCrumbs: breadCrumbs.usuarios,
        }),
        created() {
            this.obtenerUsuarios();
        },
        methods: {
            obtenerUsuarios() {
                this.loader = true;

                db.collection("usuarios")
                    .get()
                    .then((respuesta) => {
                        respuesta.forEach((element) => {
                            this.usuarios = [
                                ...this.usuarios,
                                { id: element.id, ...element.data() },
                            ];
                        });
                        this.loader = false;
                    })
                    .catch(() => {
                        this.loader = false;
                    });
            },
            borrarUsuario(id) {
                console.log(id);
            },
            mostrarModalEditarUsuario({ rol, herramientas, id }) {
                this.usuarioSeleccionado = { rol, herramientas, id };
                this.idUsuario = id;
                this.modalEditarUsuario = true;
            },
            ocultarModalEditarUsuario(opcionCerrar = true) {
                this.usuarioSeleccionado = null;
                this.idUsuario = "";
                this.modalEditarUsuario = false;
                if (opcionCerrar) return;
                this.usuarios = [];
                this.obtenerUsuarios();
            },
        },
    };
</script>

<style lang="scss" scoped></style>
