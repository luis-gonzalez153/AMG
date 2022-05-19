<template>
    <div>
        <v-row class="mx-1">
            <v-col cols="12" sm="9">
                <div class="hero__image">
                    <h1>AGM SERVICE</h1>
                    <p>
                        Bienvenido, para nosotros es un gusto tenerte aquí y que puedas acceder 
                        a nuestros servios las 24hr.
                    </p>
                </div>
            </v-col>
            <v-col cols="12" sm="3">
                <div v-if="promociones.length > 0">
                    <v-card
                        v-for="promocion in promociones"
                        :key="promocion.id"
                        class="rounded-xl my-2"
                        elevation="6"
                    >
                        <v-avatar
                            height="200"
                            width="100%"
                            class="rounded-t-xl rounded-b-0"
                        >
                            <v-img
                                :alt="promocion.imagenNombre"
                                :src="promocion.imagenUrl"
                            ></v-img>
                        </v-avatar>
                        <v-card-title>{{ promocion.titulo }}</v-card-title>
                        <v-card-text>
                            <h3>{{ promocion.categoria }}</h3>
                            <p>{{ promocion.descripcion }}</p></v-card-text
                        >
                    </v-card>
                </div>
            </v-col>
        </v-row>
        <v-dialog
            v-model="mostrarModalAuth"
            width="380"
            height="auto"
            persistent
        >
            <AuthWrapper />
        </v-dialog>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import { db, firebase } from "../functions/firebase";
    export default {
        name: "Home",
        data() {
            return {
                promociones: [],
            };
        },
        components: {
            AuthWrapper: () => import("./auth/AuthWrapper.vue"),
        },
        methods: {
            obtenerHoraFechaActual() {},
            obtenerPrmociones() {
                let promociones = [];

                const date = new Date().toISOString().slice(0, 10);

                db.collection("promociones")
                    .where("fechaInicioPromocion", ">=", date)
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            promociones = [
                                ...promociones,
                                {
                                    id: doc.id,
                                    ...doc.data(),
                                },
                            ];
                        });
                        this.promociones = promociones;
                    });
            },
        },
        computed: {
            ...mapGetters(["mostrarModalAuth"]),
        },
        created() {
            this.obtenerPrmociones();
        },
    };
</script>
<style>
    .hero__image {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        border-radius: 2rem;
        background-image: url("/assets/images/pexels-cottonbro-4489732.jpg");
        background-size: cover, 50%;
    }

    .hero__image > * {
        text-align: center;
        color: #fff;
        text-shadow: 0.3rem 0.3rem 0.6rem #1565c0;
    }

    .hero__image > h1 {
        font-size: 3rem;
    }

    .hero__image > p {
        font-size: 1.5rem;
    }
</style>
