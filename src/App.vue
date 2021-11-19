<template>
    <v-app>
        <v-card color="grey lighten-4" flat tile>
            <v-app-bar app elevation="2" dense color="primary" dark>
                <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

                <v-toolbar-title>AMG SERVICE</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon>mdi-login</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-logout</v-icon>
                </v-btn>
            </v-app-bar>
        </v-card>
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-list nav dense>
                <v-list-item class="px-2">
                    <v-list-item-avatar>
                        <v-img
                            src="https://randomuser.me/api/portraits/men/85.jpg"
                        ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-title>John Leider</v-list-item-title>
                </v-list-item>
                <v-list-group
                    :color="item.color"
                    v-for="(item, index) in opcionesGenerales"
                    :key="index"
                    v-model="item.active"
                    :prepend-icon="item.icono"
                    no-action
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title
                                v-text="item.nombre"
                            ></v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-layout column>
                        <v-flex
                            mx-0
                            v-for="(opcion, indexOpcion) in item.opciones"
                            :key="indexOpcion"
                        >
                            <v-btn
                                block
                                :to="opcion.ruta"
                                class="my-1 font-weight-medium"
                                depressed
                                dark
                                color="primary"
                            >
                                <v-icon left dark>
                                    {{ opcion.icono }}
                                </v-icon>
                                {{ opcion.nombre }}
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <router-view />
            <Footer />
        </v-main>
    </v-app>
</template>

<script>
    import { auth } from "./functions/firebase";
    import Swal from "sweetalert2";
    import rutas from "./functions/rutas";

    export default {
        name: "App",
        components: {
            Footer: () => import("./components/base/Footer.vue"),
            Login: () => import("./components/Login.vue"),
        },
        data: () => ({
            notFound: false,
            drawer: false,
            group: null,
            opcionSelecionada: 0,
            opcionesGenerales: [
                {
                    nombre: "Usuarios",
                    icono: "mdi-account-circle",
                    color: "primary",
                    opciones: [
                        {
                            nombre: "Listar Usuarios",
                            icono: "mdi-format-list-bulleted",
                            ruta: rutas.CIUDADANO_LISTAR,
                        },
                        {
                            nombre: "Crear Usuario",
                            icono: "mdi-plus-circle",
                            ruta: rutas.CIUDADANO_REGISTRAR,
                        },
                    ],
                    active: false,
                },
                {
                    nombre: "Herramientas",
                    icono: "mdi-tools",
                    color: "#006064",
                    opciones: [
                        {
                            nombre: "Listar Herramientas",
                            icono: "mdi-format-list-bulleted",
                            ruta: rutas.HERRAMIENTA_LISTAR,
                        },
                        {
                            nombre: "Crear Herramienta",
                            icono: "mdi-plus-circle",
                            ruta: rutas.HERRAMIENTA_REGISTRAR,
                        },
                    ],
                },
                {
                    nombre: "Promociones",
                    icono: "mdi-cash-marker",
                    color: "#311B92",
                    opciones: [
                        {
                            nombre: "Listar Promociones",
                            icono: "mdi-format-list-bulleted",
                            ruta: rutas.PROMOCION_LISTAR,
                        },
                        {
                            nombre: "Crear Promoción",
                            icono: "mdi-plus-circle",
                            ruta: rutas.PROMOCION_REGISTRAR,
                        },
                    ],
                    active: false,
                },
                {
                    nombre: "Productos",
                    icono: "mdi-palette-swatch",
                    color: "#00897B",
                    opciones: [
                        {
                            nombre: "Listar Productos",
                            icono: "mdi-format-list-bulleted",
                            ruta: rutas.PRODUCTO_LISTAR,
                        },
                        {
                            nombre: "Crear Producto",
                            icono: "mdi-plus-circle",
                            ruta: rutas.PRODUCTO_REGISTRAR,
                        },
                    ],
                    active: false,
                },
                {
                    nombre: "Citas",
                    icono: "mdi-calendar-star",
                    color: "#E91E63",
                    opciones: [
                        {
                            nombre: "Listar Citas",
                            icono: "mdi-format-list-bulleted",
                            ruta: rutas.CITA_LISTAR,
                        },
                        {
                            nombre: "Crear Cita",
                            icono: "mdi-plus-circle",
                            ruta: rutas.CITA_REGISTRAR,
                        },
                    ],
                    active: false,
                },
                {
                    nombre: "Reparaciones",
                    icono: "mdi-hammer-screwdriver",
                    color: "#E65100",
                    opciones: [
                        {
                            nombre: "Listar Reaparaciones",
                            icono: "mdi-format-list-bulleted",
                            ruta: rutas.REPARACIONES_LISTAR,
                        },
                        {
                            nombre: "Crear Reaparación",
                            icono: "mdi-plus-circle",
                            ruta: rutas.REPARACIONES_REGISTRAR,
                        },
                    ],
                    active: false,
                },
            ],
        }),
        created() {
            this.notFound = this.$route.path === "/" ? true : false;
        },
        methods: {
            logOut() {
                auth.signOut()
                    .then(() => {
                        Swal.fire({
                            title: "Exíto",
                            text: "Su sesión se ha cerrado exitosamente!",
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                        }).then(() => {
                            window.location.href = "/login";
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error",
                            text: error,
                            icon: "error",
                        });
                    });
            },
        },
    };
</script>
