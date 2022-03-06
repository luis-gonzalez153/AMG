<template>
    <v-card elevation="10">
        <v-card-title class="d-flex justify-center">
            <h3 class="text-center">Editar Cita</h3>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12">
                    <v-select
                        v-model="estado"
                        label="Estado cita"
                        :items="estadoCitas"
                        prepend-icon="time_to_leave"
                        outlined
                        required
                    />
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
            <v-btn color="orange darken-2" dark @click="editarCita">
                <v-icon left>edit</v-icon>
                Editar
            </v-btn>
            <v-btn color="red accent-3" dark @click="$emit('ocultarModalCita')">
                <v-icon left>cancel</v-icon>
                Cerrar
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
    import Swal from "sweetalert2";
    import { estadoCitas } from "../../functions/constantes";
    import { db } from "../../functions/firebase";
    export default {
        name: "EditarCitaAdmin",
        props: {
            id: {
                type: String,
                require: true,
                default: "",
            },
            estadoCita: {
                type: String,
                require: true,
                default: "",
            },
        },
        data() {
            return {
                estado: this.$props.estadoCita,
                estadoCitas,
            };
        },
        methods: {
            editarCita() {
                if (this.estado === "" && this.$props.id === "") return;
                db.collection("citas")
                    .doc(this.$props.id)
                    .update({
                        estadoCita: this.estado,
                    })
                    .then(() => {
                        Swal.fire({
                            title: "Exíto!",
                            text: "Se guardarón los cambios!",
                            icon: "success",
                        }).then(() => {
                            this.$emit("ocultarModalCita", this.estado);
                        });
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Error!",
                            text: "Ocurrio un error al guardar los cambios!",
                            icon: "error",
                        });
                    });
            },
        },
    };
</script>
