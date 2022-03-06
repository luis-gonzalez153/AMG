<template>
    <div>
        <BreadCrumb v-bind:items="breadCrumbs" />
        <div class="mb-2 d-flex justify-end">
            <v-btn color="primary" @click="mostrarModalCita()">
                <v-icon left>today</v-icon>
                Agendar Cita
            </v-btn>
        </div>
        <v-row v-if="citas.length > 0">
            <v-col
                v-for="(cita, index) in citas"
                :key="cita.id"
                cols="12"
                sm="6"
                md="4"
                lg="3"
                xl="2"
            >
                <v-card
                    :color="
                        cita.estadoCita === 'Atendida'
                            ? 'green lighten-3'
                            : cita.estadoCita === 'Rechazada'
                            ? 'red lighten-3'
                            : 'orange lighten-4'
                    "
                    class="rounded-lg"
                    elevation="5"
                    v-bind:style="{ position: 'relative' }"
                >
                    <v-chip
                        v-if="cita.estadoCita === 'Atendida'"
                        class="ma-0 rounded-xl"
                        color="success"
                        label
                        text-color="white"
                        small
                        v-bind:style="{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                        }"
                    >
                        <v-icon left small>
                            check_circle
                        </v-icon>
                        Atendida
                    </v-chip>
                    <v-chip
                        v-else-if="cita.estadoCita === 'Rechazada'"
                        class="ma-0 rounded-xl"
                        color="error"
                        label
                        dark
                        small
                        v-bind:style="{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                        }"
                    >
                        <v-icon left small>
                            cancel
                        </v-icon>
                        Cancelada
                    </v-chip>
                    <v-chip
                        v-else
                        class="ma-0 rounded-xl"
                        color="orange darken-1"
                        small
                        label
                        dark
                        v-bind:style="{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                        }"
                    >
                        <v-icon left small>
                            pending
                        </v-icon>
                        Pendiente
                    </v-chip>
                    <v-card-title>{{ cita.motivo }}</v-card-title>
                    <v-card-text class="pa-0">
                        <v-chip
                            class="ma-2 rounded-xl"
                            color="teal darken-2"
                            label
                            dark
                            >Fecha: <v-icon class="mx-2">today</v-icon>
                            <strong>{{ cita.fecha }}</strong></v-chip
                        >
                        <v-chip
                            class="ma-2 rounded-xl"
                            color="blue darken-2"
                            label
                            dark
                        >
                            Hora: <v-icon class="mx-2">timer</v-icon>
                            <strong>{{ cita.tiempo }}</strong>
                        </v-chip>
                        <v-chip
                            class="ma-2 rounded-xl"
                            color="purple darken-2"
                            label
                            dark
                        >
                            Vehículo
                            <v-icon class="mx-2">time_to_leave</v-icon>
                            <strong>{{ cita.vehiculo }}</strong>
                        </v-chip>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                        <v-btn
                            @click="mostrarModalCita(cita, index)"
                            x-small
                            fab
                            dark
                            color="blue darken-2"
                        >
                            <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn
                            @click="borrarCita(cita.id)"
                            x-small
                            fab
                            dark
                            color="red accent-3"
                        >
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <div v-else class="container__img_citas">
            <div class="hero__image_cita">
                <h2>Aún no has agendado una cita!</h2>
            </div>
        </div>
        <v-dialog
            v-model="modalCita"
            max-width="800"
            class="ma-2 pa-2"
            persistent
        >
            <AgendarCita
                v-bind:id="idSeleccionado"
                v-bind:datosCita="datosCita"
                :key="idSeleccionado"
                @ocultarModalCita="ocultarModalCita"
            />
        </v-dialog>
    </div>
</template>
<script>
    import { db } from "../../functions/firebase";
    import { mapGetters } from "vuex";
    import Swal from "sweetalert2";
    import { breadCrumbs } from "../../functions/constantes";

    export default {
        name: "CitasUsuario",
        components: {
            AgendarCita: () => import("./AgendarCita.vue"),
            BreadCrumb: () => import("../compoentesGenerales/BreadCrumb.vue"),
        },
        data: () => ({
            citas: [],
            idSeleccionado: "",
            datosCita: {},
            indexCita: null,
            modalCita: false,
            breadCrumbs: breadCrumbs.citas,
        }),
        methods: {
            mostrarModalCita(cita = {}, index = null) {
                this.idSeleccionado = cita.id;
                this.datosCita = cita;
                this.modalCita = true;
                this.indexCita = index;
            },
            ocultarModalCita(tipo, cita) {
                switch (tipo) {
                    case "nueva":
                        this.citas = [...this.citas, cita];
                        break;
                    case "editada":
                        this.citas[this.indexCita] = cita;
                        break;
                    default:
                        break;
                }

                this.idSeleccionado = "";
                this.modalCita = false;
                this.indexCita = null;
            },
            obtenterCitas() {
                Swal.fire({
                    title: "Citas",
                    text: "Por favor espere un momento...",
                    icon: "info",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                });

                Swal.showLoading();

                db.collection("citas")
                    .where("idUser", "==", this.obtenerInformacionPersonal.id)
                    .get()
                    .then((docs) => {
                        let citas = [];
                        docs.forEach((doc) => {
                            citas = [...citas, { id: doc.id, ...doc.data() }];
                        });
                        this.citas = citas;
                        Swal.close();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            borrarCita(id) {
                Swal.fire({
                    title: "Esta seguro de borrar la cita?",
                    showDenyButton: true,
                    showConfirmButton: true,
                    icon: "question",
                    denyButtonText: "No, cancelar",
                    confirmButtonText: "Si, borrar",
                }).then((opcion) => {
                    if (opcion.isDenied) return;
                    db.collection("usuarios")
                        .doc(this.obtenerInformacionPersonal.id)
                        .collection("citas")
                        .doc(id)
                        .delete()
                        .then(() => {
                            Swal.fire(
                                "Exíto",
                                "Se borro la cita",
                                "success"
                            ).then(() => {
                                this.citas = this.citas.filter(
                                    (el) => el.id !== id
                                );
                            });
                        })
                        .catch(() => {
                            Swal.fire(
                                "Error",
                                "Ocurrio un error al borrar la cita",
                                "error"
                            );
                        });
                });
            },
        },
        computed: {
            ...mapGetters(["obtenerInformacionPersonal"]),
        },
        created() {
            this.obtenterCitas();
        },
    };
</script>
<style>
    .container__img_citas {
        max-width: 500px;
        height: 100vh;
        margin: 1rem auto;
    }

    @media screen and (min-width: 768px) {
        .container__img_citas {
            height: 500px;
        }
    }

    .hero__image_cita {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        background-image: url("/assets/images/pexels-karolina-grabowska-8361431.jpg");
        background-size: cover, 50%;
    }

    .hero__image_cita > * {
        text-align: center;
        color: #000;
    }

    .hero__image > h2 {
        font-size: 4rem;
    }
</style>
