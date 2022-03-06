<template>
    <div>
        <BreadCrumb v-bind:items="breadCrumbs" />
        <div class="bg__color_profile position-relative my-2">
            <v-row class="d-flex flex-wrap pa-0 ma-2 rounded-lg">
                <v-col cols="12" sm="6" md="4">
                    <v-card width="100%" class="rounded-lg" elevation="6">
                        <v-avatar rounded width="100%" height="300">
                            <v-img
                                v-if="
                                    user &&
                                        user.photoUrl &&
                                        user.photoUrl !== ''
                                "
                                :src="user.photoUrl"
                                height="100%"
                                width="100%"
                                class="rounded-t-lg"
                            ></v-img>
                            <v-img
                                v-else
                                src="/assets/images/user.png"
                                height="100%"
                                width="100%"
                                class="rounded-t-lg"
                            ></v-img>
                        </v-avatar>
                        <v-card-text class="my-1">
                            <v-row>
                                <v-col
                                    cols="12"
                                    class="d-flex align-items-center py-0"
                                >
                                    <h3 class="d-inline-block mr-2">
                                        Usuario:
                                    </h3>
                                    <p class="d-inline-block">
                                        {{
                                            user &&
                                                (user.displayName ||
                                                    "Sin asignar")
                                        }}
                                    </p>
                                </v-col>
                                <v-col
                                    cols="12"
                                    class="d-flex align-items-center py-0"
                                >
                                    <h4 class="d-inline-block mr-2">
                                        Nombres:
                                    </h4>
                                    <p class="d-inline-block">
                                        {{
                                            personalInformation &&
                                                (personalInformation.nombres ||
                                                    "Sin asignar")
                                        }}
                                    </p>
                                </v-col>
                                <v-col
                                    cols="12"
                                    class="d-flex align-items-center py-0"
                                >
                                    <h4 class="d-inline-block mr-2">
                                        Apellidos:
                                    </h4>
                                    <p class="d-inline-block">
                                        {{
                                            personalInformation &&
                                                (personalInformation.apellidos ||
                                                    "Sin asignar")
                                        }}
                                    </p>
                                </v-col>
                                <v-col
                                    cols="12"
                                    class="d-flex align-items-center py-0"
                                >
                                    <v-icon
                                        class="d-inline-block mr-2"
                                        color="blue"
                                        >call</v-icon
                                    >
                                    <p class="d-inline-block">
                                        {{
                                            personalInformation &&
                                                (personalInformation.telefono ||
                                                    "### ### ####")
                                        }}
                                    </p>
                                </v-col>
                                <v-col
                                    cols="12"
                                    class="d-flex align-items-center py-0"
                                >
                                    <v-icon
                                        class="d-inline-block mr-2"
                                        color="orange"
                                        >email</v-icon
                                    >
                                    <p class="d-inline-block">
                                        {{
                                            user &&
                                                (user.email || "Sin asignar")
                                        }}
                                    </p>
                                </v-col>
                                <v-col
                                    cols="12"
                                    class="d-flex align-items-center py-0"
                                >
                                    <v-icon
                                        class="d-inline-block mr-2"
                                        color="green"
                                        >location_on</v-icon
                                    >
                                    <p class="d-inline-block">
                                        {{
                                            personalInformation &&
                                                (personalInformation.direccion ||
                                                    "Sin asignar")
                                        }}
                                    </p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="8">
                    <VistaPreviaUsuario
                        v-if="opcion === 1"
                        v-bind:user="user"
                        v-bind:personalInformation="personalInformation"
                    />
                    <FormularioUsuario
                        v-else
                        v-bind:user="user"
                        v-bind:personalInformation="personalInformation"
                    />
                </v-col>
            </v-row>
            <v-btn
                @click="seleccionarOpcion(2)"
                v-if="opcion === 1"
                bottom
                right
                fixed
                color="grey darken-4"
                fab
                dark
            >
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn
                @click="seleccionarOpcion(1)"
                v-else
                bottom
                right
                fixed
                color="orange darken-4"
                fab
                dark
            >
                <v-icon>visibility</v-icon>
            </v-btn>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from "vuex";
    import { breadCrumbs } from "../../functions/constantes";

    export default {
        name: "PerfilUsuario",
        components: {
            FormularioUsuario: () => import("./FormularioUsuario.vue"),
            VistaPreviaUsuario: () => import("./VistaPreviaUsuario.vue"),
            BreadCrumb: () => import("../compoentesGenerales/BreadCrumb.vue"),
        },
        data() {
            return {
                user: null,
                personalInformation: null,
                opcion: 1,
                breadCrumbs: breadCrumbs.perfilUsuario,
            };
        },
        methods: {
            seleccionarOpcion(opcion = 1) {
                this.opcion = opcion;
            },
        },
        computed: {
            ...mapGetters(["obtenerUsuario", "obtenerInformacionPersonal"]),
        },
        created() {
            this.user = this.obtenerUsuario;
            this.personalInformation = this.obtenerInformacionPersonal;
        },
    };
</script>
<style>
    .bg__color_profile {
        background-color: #eceff1;
    }

    .img__cover {
        object-fit: cover;
    }

    .position-relative {
        position: relative;
    }

    .form-card-profile {
        position: relative;
        width: 100%;
        min-height: 12.8rem;
    }

    .progress-circle {
        position: absolute;
        top: 35%;
        left: 35%;
        z-index: 20;
    }

    .card-hero-image {
        width: 100%;
        height: 300px;
        margin: 0;
        padding: 0;
    }
</style>
