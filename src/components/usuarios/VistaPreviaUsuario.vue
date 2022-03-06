<template>
    <v-row v-if="user && personalInformation" class="pa-5">
        <v-col class="d-flex flex-row justify-start" cols="12" md="6">
            <h3 class="mx-1">Nombres:</h3>
            <p class="ma-1">
                {{ personalInformation.nombres || "Sin asignar" }}
            </p>
        </v-col>
        <v-col class="d-flex flex-row justify-start" cols="12" md="6">
            <h3 class="mx-1">Apellidos:</h3>
            <p class="ma-1">
                {{ personalInformation.apellidos || "Sin asignar" }}
            </p>
        </v-col>
        <v-col class="d-flex flex-row justify-start" cols="12" md="6">
            <h3 class="mx-1">Genéro:</h3>
            <p v-if="personalInformation.genero === 'F'" class="ma-1">
                Femenino
            </p>
            <p v-else-if="personalInformation.genero === 'M'" class="ma-1">
                Masculino
            </p>
            <p v-else-if="personalInformation.genero === 'LGTB'" class="ma-1">
                LGTB
            </p>
            <p v-else class="mx-1">
                Sin asignar
            </p>
        </v-col>
        <v-col class="d-flex flex-row justify-start" cols="12" md="6">
            <h3 class="mx-1">Usuario:</h3>
            <p class="ma-1">
                {{ user.displayName || "Sin asignar" }}
            </p>
        </v-col>
        <v-col class="d-flex flex-row justify-start" cols="12" md="6">
            <h3 class="mx-1">Email:</h3>
            <p class="ma-1">{{ user.email }}</p>
        </v-col>
        <v-col class="d-flex flex-row justify-start" cols="12" md="6">
            <h3 class="mx-1">Teléfono:</h3>
            <p class="ma-1">
                {{ personalInformation.telefono || "Sin asignar" }}
            </p>
        </v-col>
        <v-col class="d-flex flex-row justify-start" cols="12" md="6">
            <h3 class="mx-1">Dirección:</h3>
            <p class="ma-1">
                {{ personalInformation.direccion || "Sin asignar" }}
            </p>
        </v-col>
        <v-col cols="12">
            <v-row>
                <v-col
                    cols="12"
                    sm="12"
                    md="4"
                    v-if="user.rol !== 'ADMINISTRADOR'"
                >
                    <v-card
                        rounded="xl"
                        color="teal acent-1"
                        dark
                        elevation="6"
                    >
                        <v-card-title>Citas</v-card-title>
                        <v-card-text>
                            <h3 class="inline-block">
                                Citas Agendadas
                            </h3>
                            <v-chip
                                class="mr-2 mt-2 rounded-xl"
                                color="white"
                                label
                                text-color="black"
                            >
                                <v-icon left>
                                    today
                                </v-icon>
                                <strong>{{ cantidadCitas }}</strong>
                            </v-chip>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn small block rounded color="blue darken-4">
                                Ver citas</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="4" v-if="user.rol === 'EMPLEADO'">
                    <v-card
                        rounded="xl"
                        color="orange acent-1"
                        dark
                        elevation="6"
                    >
                        <v-card-title>Reparaciones</v-card-title>
                        <v-card-text>
                            <h3 class="inline-block">
                                Reparaciones realizadas
                            </h3>
                            <v-chip
                                class="mr-2 mt-2 rounded-xl"
                                color="white"
                                label
                                text-color="black"
                            >
                                <v-icon left>
                                    handyman
                                </v-icon>
                                <strong>{{ cantidadRepaciones }}</strong>
                            </v-chip>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn small block rounded color="blue darken-4">
                                Ver reparaciones</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="4" v-if="user.rol === 'EMPLEADO'">
                    <v-card rounded="xl" color="red acent-1" dark elevation="6">
                        <v-card-title>Herramientas</v-card-title>
                        <v-card-text>
                            <h3 class="inline-block">
                                Herramientas asignadas
                            </h3>
                            <v-chip
                                class="mr-2 mt-2 rounded-xl"
                                color="white"
                                label
                                text-color="black"
                            >
                                <v-icon left>home_repair_service</v-icon>
                                <strong>{{ cantidadHerramientas }}</strong>
                            </v-chip>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <div v-if="personalInformation.vehiculos">
                <v-row
                    v-if="
                        Object.values(personalInformation.vehiculos).length > 0
                    "
                >
                    <v-col class="my-3" cols="12">
                        <h3>Mis vehículos</h3>
                    </v-col>
                    <v-col
                        v-for="(vehiculo,
                        index) in personalInformation.vehiculos"
                        :key="index"
                        cols="12"
                        sm="4"
                        md="3"
                        lg="3"
                        class="mr-5 mb-5"
                    >
                        <v-card
                            class="position__relative"
                            rounded="lg"
                            elevation="6"
                            width="100%"
                        >
                            <v-avatar
                                class="img__car"
                                rounded
                                width="100px"
                                height="100px"
                            >
                                <v-img
                                    :src="vehiculo.imagenUrl"
                                    :alt="vehiculo.imagenNombre"
                                >
                                </v-img>
                            </v-avatar>
                            <v-card-title>{{ vehiculo.marca }}</v-card-title>
                            <v-card-text>
                                <v-chip
                                    class="mr-2 mt-2 rounded-xl"
                                    color="blue darken-2"
                                    label
                                    text-color="white"
                                >
                                    <h4 class="inline mx-1">
                                        Modelo:
                                    </h4>
                                    <strong>{{ vehiculo.modelo }}</strong>
                                </v-chip>
                                <v-chip
                                    class="mr-2 mt-2 rounded-xl"
                                    color="purple darken-2"
                                    label
                                    text-color="white"
                                >
                                    <h4 class="inline mx-1">Placa:</h4>
                                    <strong>{{ vehiculo.placa }}</strong>
                                </v-chip>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-col>
    </v-row>
    <div v-else class="d-flex justify-center items-center">
        <h1>Ocurrio un error, vuelva atras e intente nuevamente!</h1>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { db } from "../../functions/firebase";

    export default {
        name: "VistaPreviaUsuario",
        data() {
            return {
                user: null,
                personalInformation: null,
                cantidadCitas: 0,
                cantidadRepaciones: 0,
                cantidadHerramientas: 0,
            };
        },
        methods: {
            obtenerCitas() {
                db.collection("citas")
                    .where("idUser", "==", this.obtenerInformacionPersonal.id)
                    .get()
                    .then((docs) => {
                        let citas = [];
                        docs.forEach((doc) => {
                            citas = [...citas, { id: doc.id, ...doc.data() }];
                        });
                        this.cantidadCitas = citas.length;
                    });
            },
        },
        computed: {
            ...mapGetters(["obtenerUsuario", "obtenerInformacionPersonal"]),
        },
        created() {
            this.user = this.obtenerUsuario;
            this.personalInformation = this.obtenerInformacionPersonal;
            if (this.personalInformation) {
                this.cantidadHerramientas = this.personalInformation.herramientas.length;
            }
            this.obtenerCitas();
        },
    };
</script>

<style>
    .position__relative {
        position: relative;
    }

    .img__car {
        position: absolute;
        top: -30px;
        right: -30px;
    }
</style>
