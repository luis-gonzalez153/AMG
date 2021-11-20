<template>
    <v-main class="pt-1">
        <v-form class="mx-4 mt-1">
            <v-card class="my-3">
                <v-card-title>Información Pubicacion</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col class="py-0" cols="12" md="6">
                            <v-text-field
                                v-model="promocion.id"
                                label="Id"
                                placeholder="Public01"
                                type="text"
                                outlined
                                prepend-inner-icon="done"
                            />
                        </v-col>
                         <v-col class="py-0" cols="12" md="6">
                            <v-text-field
                                
                                label=""
                                placeholder=""
                                type=""
                                outlined
                                prepend-inner-icon=""
                            />
                        </v-col>
                        
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="promocion.inicio_promocion"
                                label="Fecha de inicio"
                                type="text"
                                prepend-icon="mdi-calendar"
                                outlined
                                @click="inicio_promocion = true"
                            ></v-text-field>
                            <v-dialog
                                v-model="inicio_promocion"
                                persistent
                                width="290px"
                            >
                                <v-date-picker
                                    v-model="promocion.inicio_promocion"
                                    scrollable
                                    :max="
                                        new Date().toISOString().substr(0, 10)
                                    "
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="inicio_promocion = false"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>

                         <v-col cols="12" md="6">
                            <v-text-field
                                v-model="promocion.fin_promocion"
                                label="Fecha de finalización"
                                type="text"
                                prepend-icon="mdi-calendar"
                                outlined
                                @click="fin_promocion = true"
                            ></v-text-field>
                            <v-dialog
                                v-model="fin_promocion"
                                persistent
                                width="290px"
                            >
                                <v-date-picker
                                    v-model="promocion.fin_promocion"
                                    scrollable
                                    :max="
                                        new Date().toISOString().substr(0, 10)
                                    "
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="fin_promocion = false"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>

                        <v-col class="py-0" cols="12" md="6">
                            <v-text-field
                                v-model="promocion.detalles"
                                label="Descripcón"
                                placeholder="Solo por 15% de descuento!"
                                type="text"
                                prepend-inner-icon="description"
                                outlined
                            />
                        </v-col>
                        <v-col class="py-0" cols="12" md="6">
                            <label class="d-block pl-2">Categoria</label>
                            <v-checkbox
                                class="d-inline-flex mt-1 px-2"
                                v-for="categoria in selects.categoria"
                                :key="categoria.value"
                                v-model="promocion.categoria"
                                :label="categoria.nombre"
                                :value="categoria.value"
                            />
                        </v-col>                     
                        <v-col class="py-0" cols="12" md="6">
                            <v-text-field
                                v-model="promocion.direccion"
                                label="Dirección"
                                placeholder="Sede Yopal"
                                prepend-inner-icon="room"
                                type="text"
                                outlined
                            />
                        </v-col>
                         <v-col class="py-0" cols="12" md="6">
                            <v-text-field
                                v-model="promocion.imagen"
                                label="Imagen"
                                placeholder="JPEJ, JPG, PNG, SVG, GIF"
                                prepend-inner-icon="image"
                                type="text"
                                outlined
                            />
                        </v-col>
                        
                    </v-row>
                </v-card-text>
            </v-card>
            <v-btn color="primary" dark @click="registrarPromocion">
                <v-icon left>save</v-icon>
                Guardar registro
            </v-btn>
        </v-form>
    </v-main>
</template>

<script>
    import { db } from "../../functions/firebase";
    import Swal from "sweetalert2";

    export default {
        name: "FormularioPromocion",
       
        data() {
            return {
                promocion: {
                    id: "",
                    inicio_promocion: "",
                    fin_promocion: "",
                    detalles: "",
                    categoria: "",
                    direccion: "",
                },
                selects: {
                    categoria: [
                        { nombre: "Promoción", value: "Promocion" },
                        { nombre: "Consejo", value: "Tips" },
                    ],
                },
                inicio_promocion: false,
                fin_promocion: false,
            };
        },
        methods: {
            registrarPromocion() {
                db.collection("promociones")
                    .doc()
                    .set(this.promocion)
                    .then(() => {
                        this.borrarDatosFormulario();
                        Swal.fire({
                            title: "Exito!",
                            text: "Se registro el promocion correctamente",
                            icon: "success",
                            timerProgressBar: true,
                            timer: 2000,
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error!",
                            text: error,
                            icon: "error",
                            timerProgressBar: true,
                            timer: 2000,
                        });
                    });
            },

            borrarDatosFormulario() {
                this.promocion["id"] = "";
                this.promocion["inicio_promocion"] = "";
                this.promocion["fin_promocion"] = "";
                (this.promocion["categoria"] = ""),
                (this.promocion["detalles"] = "");                    
                this.promocion["direccion"] = "";
            },

            obtenerDatosPromocion(id) {
                db.collection("promociones").get();
            },
        },
    };
</script>
