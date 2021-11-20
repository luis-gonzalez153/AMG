<template>
    <v-main class="pt-1">
        <v-form class="mx-4 mt-1">
            <v-card class="my-3">
                <v-card-title>Información personal</v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col class="py-0" cols="12" md="6">
                            <v-text-field
                                v-model="ciudadano.identificacion"
                                label="Identificación"
                                placeholder="1111111111"
                                type="number"
                                outlined
                                prepend-inner-icon="fingerprint"
                            />
                        </v-col>
                        <v-col class="py-0" cols="12" md="6">
                            <v-text-field
                                v-model="ciudadano.nombres"
                                label="Nombres"
                                placeholder="Humt"
                                type="text"
                                outlined
                            />
                        </v-col>
                        <v-col class="py-0" cols="12" md="6">
                            <v-text-field
                                v-model="ciudadano.apellidos"
                                label="Apellidos"
                                placeholder="Maxwell"
                                type="text"
                                outlined
                            />
                        </v-col>
                        <v-col class="py-0" cols="12" md="6">
                            <label class="d-block pl-2">Genero</label>
                            <v-checkbox
                                class="d-inline-flex mt-1 px-2"
                                v-for="genero in selects.genero"
                                :key="genero.value"
                                v-model="ciudadano.genero"
                                :label="genero.nombre"
                                :value="genero.value"
                            />
                        </v-col>
                        <v-col class="py-0" cols="12" md="6">
                            <v-text-field
                                v-model="ciudadano.telefono"
                                label="Telefono"
                                placeholder="3400056789"
                                prepend-inner-icon="settings_phone"
                                type="number"
                                counter="10"
                                outlined
                            />
                        </v-col>                       
                        <v-col class="py-0" cols="12" md="6">
                            <v-text-field
                                v-model="ciudadano.direccion"
                                label="Direccion"
                                placeholder="Cr 24 - #32 - 42 sur"
                                prepend-inner-icon="room"
                                type="text"
                                outlined
                            />
                        </v-col>
                         <v-col class="py-0" cols="12" md="6">
                            <v-text-field
                                v-model="ciudadano.email"
                                label="Email"
                                placeholder="usuario@mail.com"
                                prepend-inner-icon="email"
                                type="text"
                                outlined
                            />
                        </v-col>
                        <v-col class="py-0" cols="12" md="6">
                            <v-select
                                v-model="ciudadano.educacion"
                                :items="selects.educacion"
                                item-text="nombre_profesion"
                                item-value="codigo_profesion"
                                label="Educacion"
                                placeholder="Seleccione la educacion..."
                                prepend-inner-icon="record_voice_over"
                                outlined
                                chips
                                deletable-chips
                                multiple
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-btn
                                color="primary"
                                block
                                x-large
                                dark
                                @click="mostrar_modal_profesion = true"
                            >
                                <v-icon left dark x-large class="mx-5"
                                    >mdi-dna</v-icon
                                >
                                Registrar profesion
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-layout class="my-2">
                <v-btn color="green" dark @click="agregarInfoLaboral">
                    Crear información laboral
                    <v-icon right>mdi-plus-circle</v-icon>
                </v-btn>
            </v-layout>
            <v-card
                v-for="(item, index) in ciudadano.informacion_laboral"
                :key="index"
                class="my-3"
            >
                <v-card-title>
                    Información laboral
                    <div class="d-flex flex-row-reverse">
                        <v-btn
                            class="mx-2"
                            fab
                            icon
                            outlined
                            color="green"
                            small
                            @click="agregarInfoLaboral"
                        >
                            <v-icon>add_task</v-icon>
                        </v-btn>
                        <v-btn
                            class="mx-2"
                            fab
                            icon
                            outlined
                            color="red"
                            small
                            @click="eliminarInfoLaboral(index)"
                        >
                            <v-icon>delete_forever</v-icon>
                        </v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col class="py-0" cols="12" md="6">
                            <v-text-field
                                v-model="item.nombre_empresa"
                                label="Nombre de la empresa"
                                type="text"
                                placeholder="Facebook"
                                prepend-inner-icon="store"
                                outlined
                            />
                        </v-col>
                        <v-col class="py-0" cols="12" md="6">
                            <v-text-field
                                v-model="item.nombre_cargo"
                                label="Cargo"
                                type="text"
                                placeholder="Ingeniero"
                                prepend-inner-icon="store"
                                outlined
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="item.fecha_inicio"
                                label="Fecha de inicio"
                                type="text"
                                prepend-icon="mdi-calendar"
                                outlined
                                @click="fecha_inicio = true"
                            ></v-text-field>
                            <v-dialog
                                v-model="fecha_inicio"
                                persistent
                                width="290px"
                            >
                                <v-date-picker
                                    v-model="item.fecha_inicio"
                                    scrollable
                                    :max="
                                        new Date().toISOString().substr(0, 10)
                                    "
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="fecha_inicio = false"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                                v-model="item.fecha_finalizacion"
                                label="Fecha de inicio"
                                type="text"
                                prepend-icon="mdi-calendar"
                                outlined
                                @click="fecha_finalizacion = true"
                            ></v-text-field>
                            <v-dialog
                                v-model="fecha_finalizacion"
                                persistent
                                width="290px"
                            >
                                <v-date-picker
                                    v-model="item.fecha_finalizacion"
                                    scrollable
                                    :max="
                                        new Date().toISOString().substr(0, 10)
                                    "
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="fecha_finalizacion = false"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                        <v-col class="py-0" cols="12" md="6">
                            <v-select
                                v-model="item.area_laboral"
                                :items="selects.areas_laborales"
                                item-text="nombre_area"
                                item-value="codigo_area"
                                label="Área laboral"
                                placeholder="Seleccione un area laboral..."
                                prepend-inner-icon="work"
                                multiple
                                chips
                                deletable-chips
                                outlined
                            />
                        </v-col>
                        <v-col class="py-0" cols="12" md="6">
                            <v-btn
                                color="green"
                                block
                                x-large
                                dark
                                @click="mostrar_modal_area_laboral = true"
                            >
                                <v-icon left dark x-large class="mx-5"
                                    >work</v-icon
                                >
                                Crear area laboral
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-btn color="primary" dark @click="registrarCiudadano">
                <v-icon left>save</v-icon>
                Guardar registro
            </v-btn>
        </v-form>
        <FormularioProfesion
            :mostrar_modal_profesion="mostrar_modal_profesion"
            @ocultarModalProfesional="ocultarModalProfesion"
        />
        <FormularioAreaLaboral
            :mostrar_modal_area_laboral="mostrar_modal_area_laboral"
            @ocultarModalAreaLaboral="ocultarModalAreaLaboral"
        />
    </v-main>
</template>

<script>
    import { db } from "../../functions/firebase";
    import FormularioProfesion from "../ciudadano/FormularioProfesion.vue";
    import FormularioAreaLaboral from "../ciudadano/FormularioAreaLaboral.vue";
    import Swal from "sweetalert2";

    export default {
        name: "FormularioCiudadano",
        components: {
            FormularioProfesion,
            FormularioAreaLaboral,
        },
        data() {
            return {
                ciudadano: {
                    identificacion: "",
                    nombres: "",
                    apellidos: "",
                    genero: "",
                    telefono: "",
                    direccion: "",
                    email: "",
                    educacion: [],
                    informacion_laboral: [],
                },
                selects: {
                    genero: [
                        { nombre: "Masculino", value: "M" },
                        { nombre: "Femenino", value: "F" },
                        { nombre: "LGTBI", value: "LGTBI" },
                    ],
                    educacion: [],
                    areas_laborales: [],
                },
                mostrar_modal_profesion: false,
                mostrar_modal_area_laboral: false,
                fecha_inicio: false,
                fecha_finalizacion: false,
            };
        },
        created() {
            this.obtenerProfesiones().then((items) => {
                items.forEach((item) => {
                    this.selects.educacion.push({
                        nombre_profesion: item.data().nombre_profesion,
                        codigo_profesion: item.data().codigo_profesion,
                    });
                });
            });

            this.obtenerAreasLaborales().then((items) => {
                items.forEach((item) => {
                    this.selects.areas_laborales.push({
                        nombre_area: item.data().nombre_area,
                        codigo_area: item.data().codigo_area,
                    });
                });
            });
        },
        methods: {
            registrarCiudadano() {
                db.collection("ciudadanos")
                    .doc()
                    .set(this.ciudadano)
                    .then(() => {
                        this.borrarDatosFormulario();
                        Swal.fire({
                            title: "Exito!",
                            text: "Se registro el ciudadano correctamente",
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
                this.ciudadano["nombres"] = "";
                this.ciudadano["identificacion"] = "";
                this.ciudadano["apellidos"] = "";
                (this.ciudadano["genero"] = ""),
                    (this.ciudadano["telefono"] = "");
                this.ciudadano["direccion"] = "";
                this.ciudadano["email"] = "";
                this.ciudadano["educacion"] = [];
                this.ciudadano["informacion_laboral"] = [];
            },

            obtenerDatosCiudadano(id) {
                db.collection("ciudadanos").get();
            },

            agregarInfoLaboral() {
                this.ciudadano["informacion_laboral"].push({
                    fecha_inicio: new Date().toISOString().substr(0, 10),
                    fecha_finalizacion: new Date().toISOString().substr(0, 10),
                    nombre_empresa: "",
                    nombre_cargo: "",
                    area_laboral: "",
                });
            },

            eliminarInfoLaboral(index_info) {
                this.ciudadano["informacion_laboral"] = this.ciudadano[
                    "informacion_laboral"
                ].filter((item, index) => index !== index_info);
            },

            obtenerProfesiones() {
                const profesiones = db.collection("profesiones").get();
                return profesiones;
            },

            ocultarModalProfesion(profesion) {
                this.selects.educacion.push({
                    ...profesion,
                });
                this.mostrar_modal_profesion = false;
            },

            obtenerAreasLaborales() {
                const areas_laborales = db.collection("area_laboral").get();
                return areas_laborales;
            },

            ocultarModalAreaLaboral(area_laboral) {
                this.selects.areas_laborales.push({
                    ...area_laboral,
                });
                this.mostrar_modal_area_laboral = false;
            },
        },
    };
</script>
