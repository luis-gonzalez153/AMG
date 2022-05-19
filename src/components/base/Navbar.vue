<template>
    <div class="mb-10">
        <div
            v-if="
                usuarioAutenticado &&
                    obtenerUsuario &&
                    obtenerUsuario.rol === roles[2].value
            "
        >
            <v-card
                v-if="usuarioAutenticado && obtenerUsuario"
                color="grey lighten-4"
                flat
                tile
            >
                <v-app-bar app elevation="2" dense color="primary" dark>
                    <v-app-bar-nav-icon
                        @click="drawer = true"
                    ></v-app-bar-nav-icon>
                    <v-toolbar-title>
                        <v-btn text to="/">AMG</v-btn>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <h4 v-if="usuarioAutenticado">
                        {{ obtenerUsuario.displayName }}
                    </h4>
                    <v-btn
                        color="blue-grey lighten-5"
                        text
                        v-if="!usuarioAutenticado"
                        @click="mostrarModalAuth"
                    >
                        Iniciar sesión
                        <v-icon class="mx-1">login</v-icon>
                    </v-btn>
                    <v-menu v-else offset-y rounded bottom min-width="200px">
                        <template
                            v-if="obtenerUsuario"
                            v-slot:activator="{ on }"
                        >
                            <v-btn color="primary" icon x-large v-on="on">
                                <v-avatar size="38">
                                    <v-img
                                        v-if="obtenerUsuario.photoUrl"
                                        width="100%"
                                        height="100%"
                                        :src="obtenerUsuario.photoUrl"
                                    ></v-img>
                                    <v-img
                                        v-else
                                        width="100%"
                                        height="100%"
                                        src="/assets/images/user.png"
                                    ></v-img>
                                </v-avatar>
                            </v-btn>
                        </template>
                        <v-list class="rounded-lg">
                            <v-list-item>
                                <v-btn text :to="rutas.USUARIO_PERFIL" block>
                                    <v-icon mx-1>account_circle</v-icon>
                                    Perfil
                                </v-btn>
                            </v-list-item>
                            <v-list-item>
                                <v-btn text @click="cerrarSesion" block>
                                    <v-icon mx-1>logout</v-icon>
                                    Cerrar sesión
                                </v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-app-bar>
            </v-card>
            <v-navigation-drawer v-model="drawer" absolute temporary>
                <v-list nav dense>
                    <v-list-item class="px-2">
                        <v-list-item-avatar>
                            <v-img
                                v-if="obtenerUsuario"
                                :src="obtenerUsuario.photoUrl"
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-title>Administrador</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-btn
                            :to="rutas.HOME"
                            text
                            dark
                            block
                            color="black"
                            class="my-1 font-weight-medium text-capitalize"
                        >
                            <v-icon left dark>
                                home
                            </v-icon>
                            Inicio</v-btn
                        >
                    </v-list-item>
                    <v-list-item
                        v-if="
                            obtenerUsuario &&
                                obtenerUsuario.rol === roles[2].value
                        "
                    >
                        <v-btn
                            :to="rutas.HERRAMIENTA_LISTAR"
                            text
                            dark
                            block
                            color="black"
                            class="my-1 font-weight-medium text-capitalize"
                        >
                            <v-icon left dark>
                                handyman
                            </v-icon>
                            Herramientas</v-btn
                        >
                    </v-list-item>
                    <v-list-item
                        v-if="
                            obtenerUsuario &&
                                obtenerUsuario.rol === roles[2].value
                        "
                    >
                        <v-btn
                            :to="rutas.PRODUCTO_LISTAR"
                            text
                            dark
                            block
                            color="black"
                            class="my-1 font-weight-medium text-capitalize"
                        >
                            <v-icon left dark>
                                inventory_2
                            </v-icon>
                            Productos</v-btn
                        >
                    </v-list-item>
                    <v-list-item
                        v-if="
                            obtenerUsuario &&
                                obtenerUsuario.rol === roles[2].value
                        "
                    >
                        <v-btn
                            :to="rutas.USUARIO_LISTAR"
                            text
                            dark
                            block
                            color="black"
                            class="my-1 font-weight-medium text-capitalize"
                        >
                            <v-icon left dark>
                                person
                            </v-icon>
                            Usuarios</v-btn
                        >
                    </v-list-item>
                    <v-list-item
                        v-if="
                            (obtenerUsuario &&
                                obtenerUsuario.rol === roles[1].value) ||
                                obtenerUsuario.rol === roles[0].value
                        "
                    >
                        <v-btn
                            :to="rutas.CITAS"
                            text
                            dark
                            block
                            color="black"
                            class="my-1 font-weight-medium text-capitalize"
                        >
                            <v-icon left dark>
                                event
                            </v-icon>
                            Citas</v-btn
                        >
                    </v-list-item>
                    <v-list-item
                        v-if="
                            obtenerUsuario &&
                                obtenerUsuario.rol === roles[2].value
                        "
                    >
                        <v-btn
                            :to="rutas.CITAS_ADMIN"
                            text
                            dark
                            block
                            color="black"
                            class="my-1 font-weight-medium text-capitalize"
                        >
                            <v-icon left dark>
                                event
                            </v-icon>
                            Citas</v-btn
                        >
                    </v-list-item>
                    <div
                        v-if="
                            obtenerUsuario &&
                                obtenerUsuario.rol === roles[2].value
                        "
                    >
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
                                    v-for="(opcion,
                                    indexOpcion) in item.opciones"
                                    :key="indexOpcion"
                                >
                                    <v-btn
                                        block
                                        :to="opcion.ruta"
                                        class="my-1 font-weight-medium"
                                        depressed
                                        dark
                                        text
                                        color="black"
                                    >
                                        <v-icon left dark>
                                            {{ opcion.icono }}
                                        </v-icon>
                                        {{ opcion.nombre }}
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-list-group>
                    </div>
                </v-list>
            </v-navigation-drawer>
        </div>
        <div v-else>
            <v-app-bar dense fixed dark color="blue darken-3">
                <v-btn
                    class="app__icon_menu"
                    @click="menuMovil = !menuMovil"
                    icon
                    fab
                    small
                >
                    <v-icon>menu</v-icon>
                </v-btn>
                <v-toolbar-title class="mx-2">Amgservice</v-toolbar-title>
                <div v-if="usuarioAutenticado" class="display">
                    <v-btn
                        :to="rutas.HOME"
                        text
                        class="my-1 mx-2 font-weight-medium text-capitalize"
                    >
                        <v-icon left dark>
                            home
                        </v-icon>
                        Inicio</v-btn
                    >
                    <v-btn
                        :to="rutas.CITAS"
                        text
                        class="my-1 mx-2 font-weight-medium text-capitalize"
                    >
                        <v-icon left dark>
                            event
                        </v-icon>
                        Citas</v-btn
                    >
                    <v-btn
                        :to="rutas.REPARACIONES_LISTAR"
                        text
                        class="my-1 font-weight-medium text-capitalize"
                    >
                        <v-icon left dark>
                            mdi-hammer-screwdriver
                        </v-icon>
                        Reparaciones</v-btn
                    >
                </div>
                <v-spacer></v-spacer>
                <h5 v-if="usuarioAutenticado">
                    {{ obtenerUsuario.displayName }}
                </h5>
                <v-btn
                    color="blue-grey lighten-5"
                    text
                    v-if="!usuarioAutenticado"
                    @click="mostrarModalAuth"
                >
                    Iniciar sesión
                    <v-icon class="mx-1">login</v-icon>
                </v-btn>
                <v-menu v-else offset-y rounded bottom min-width="200px">
                    <template v-slot:activator="{ on }">
                        <v-btn color="primary" icon x-large v-on="on">
                            <v-avatar size="38">
                                <v-img
                                    v-if="obtenerUsuario.photoUrl"
                                    width="100%"
                                    height="100%"
                                    :src="obtenerUsuario.photoUrl"
                                ></v-img>
                                <v-img
                                    v-else
                                    width="100%"
                                    height="100%"
                                    src="/assets/images/user.png"
                                ></v-img>
                            </v-avatar>
                        </v-btn>
                    </template>
                    <v-list class="rounded-lg">
                        <v-list-item>
                            <v-btn text :to="rutas.USUARIO_PERFIL" block>
                                <v-icon mx-1>account_circle</v-icon>
                                Perfil
                            </v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn text @click="cerrarSesion" block>
                                <v-icon mx-1>logout</v-icon>
                                Cerrar sesión
                            </v-btn>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-app-bar>
            <div v-if="menuMovil">
                <nav class="menu__movil">
                    <v-btn
                        :to="rutas.HOME"
                        color="white"
                        class="my-1 mx-2 mt-2 font-weight-medium text-capitalize btn__border"
                    >
                        <v-icon left dark>
                            home
                        </v-icon>
                        Inicio</v-btn
                    >
                    <v-btn
                        v-if="
                            obtenerUsuario &&
                                obtenerUsuario.rol === roles[1].value
                        "
                        :to="rutas.REPARACIONES_LISTAR"
                        color="white"
                        class="my-1 mx-2 font-weight-medium text-capitalize btn__border"
                    >
                        <v-icon left dark>
                            mdi-hammer-screwdriver
                        </v-icon>
                        Reparaciones</v-btn
                    >
                    <v-btn
                        :to="rutas.CITAS"
                        color="white"
                        class="my-1 mx-2 font-weight-medium text-capitalize btn__border"
                    >
                        <v-icon left dark>
                            event
                        </v-icon>
                        Citas</v-btn
                    >
                </nav>
            </div>
        </div>
    </div>
</template>
<script>
    import { rutas } from "../../functions/rutas";
    import { mapGetters, mapActions } from "vuex";
    import { roles } from "../../functions/constantes";

    export default {
        name: "Navbar",
        data: () => ({
            drawer: false,
            rutas,
            roles,
            opcionesGenerales: [
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
            menuMovil: false,
        }),
        methods: {
            ...mapActions(["cerrarSesion", "mostrarModalAuth"]),
            controlMenuMovil() {
                this.menuMovil = !this.menuMovil;
            },
        },
        computed: {
            ...mapGetters(["obtenerUsuario", "usuarioAutenticado"]),
        },
    };
</script>
<style>
    .display {
        display: none;
    }

    .app__icon_menu {
        visibility: visible;
    }

    .btn__border {
        border: thin solid black;
    }

    .menu__movil {
        display: flex;
        flex-direction: column;
        width: 100vw;
        height: auto;
        margin-top: 3rem;
        position: relative;
        z-index: 2;
        background-color: #1976d2;
    }

    @media screen and (min-width: 768px) {
        .display {
            display: inline-block;
        }

        .app__icon_menu {
            visibility: hidden;
        }

        .menu__movil {
            display: none;
        }
    }
</style>
