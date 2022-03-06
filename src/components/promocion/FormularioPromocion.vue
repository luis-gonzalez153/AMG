<template>
    <div>
        <BreadCrumb v-bind:items="breadCrumbs" />
        <v-form class="mx-4 mt-1">
            <v-card class="my-3" elevation="10">
                <v-card-title class="d-flex justify-center">
                    <h3 class="text-center">
                        {{ `${id ? "Editar" : "Registrar "} Pubicacion` }}
                    </h3>
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="promocion.fechaInicioPromocion"
                                label="Fecha de inicio"
                                type="text"
                                outlined
                                required
                                :error-messages="fechaInicioPromocionErrors"
                                @input="
                                    $v.promocion.fechaInicioPromocion.$touch()
                                "
                                @blur="
                                    $v.promocion.fechaInicioPromocion.$touch()
                                "
                                @click="fechaInicioPromocion = true"
                            ></v-text-field>
                            <v-dialog
                                v-model="fechaInicioPromocion"
                                persistent
                                width="290px"
                            >
                                <v-date-picker
                                    v-model="promocion.fechaInicioPromocion"
                                    scrollable
                                    :min="
                                        new Date().toISOString().substr(0, 10)
                                    "
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="fechaInicioPromocion = false"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="promocion.fechaFinPromocion"
                                label="Fecha de finalización"
                                type="text"
                                outlined
                                required
                                :error-messages="fechaFinPromocionErrors"
                                @input="$v.promocion.fechaFinPromocion.$touch()"
                                @blur="$v.promocion.fechaFinPromocion.$touch()"
                                @click="fechaFinPromocion = true"
                            />
                            <v-dialog
                                v-model="fechaFinPromocion"
                                persistent
                                width="290px"
                            >
                                <v-date-picker
                                    v-model="promocion.fechaFinPromocion"
                                    scrollable
                                    :min="
                                        new Date().toISOString().substr(0, 10)
                                    "
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="fechaFinPromocion = false"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                        <v-col class="py-0" cols="12" sm="6">
                            <v-select
                                v-model="promocion.categoria"
                                :items="selects.categorias"
                                item-text="nombre"
                                item-value="value"
                                label="Categoria"
                                placeholder="Seleccione una categoria..."
                                prepend-inner-icon="inventory"
                                outlined
                                required
                                :error-messages="categoriaErrors"
                                @input="$v.promocion.categoria.$touch()"
                                @blur="$v.promocion.categoria.$touch()"
                            />
                        </v-col>
                        <v-col class="py-0" cols="12" sm="6">
                            <v-text-field
                                v-model="promocion.titulo"
                                label="Título"
                                placeholder="Ingresa un título para la promoción"
                                type="text"
                                outlined
                                prepend-inner-icon=""
                                required
                                :error-messages="tituloErrors"
                                @input="$v.promocion.titulo.$touch()"
                                @blur="$v.promocion.titulo.$touch()"
                            />
                        </v-col>
                        <v-col class="py-0" cols="12" sm="6">
                            <v-textarea
                                v-model="promocion.descripcion"
                                label="Descripcón"
                                placeholder="Solo por 15% de descuento!"
                                type="text"
                                prepend-inner-icon="description"
                                outlined
                                no-resize
                                required
                                :error-messages="descripcionErrors"
                                @input="$v.promocion.descripcion.$touch()"
                                @blur="$v.promocion.descripcion.$touch()"
                            />
                        </v-col>
                        <v-col class="py-0" cols="12" sm="6">
                            <v-file-input
                                v-model="imagen"
                                accept="image/*"
                                name="urlImagen"
                                chips
                                show-size=""
                                placeholder="Upload your documents"
                                label="File input"
                                prepend-icon="mdi-paperclip"
                                @change="cargarImagen"
                            >
                                <template v-slot:selection="{ text }">
                                    <v-chip small label color="primary">
                                        {{ text }}
                                    </v-chip>
                                </template>
                            </v-file-input>
                        </v-col>
                        <v-col
                            class="d-flex justify-center align-center py-0"
                            cols="12"
                            sm="6"
                            v-if="imagen"
                        >
                            <div
                                v-bind:style="{
                                    margin: '0 auto',
                                    position: 'relative',
                                }"
                            >
                                <img
                                    v-bind:style="{
                                        objectFit: 'cover',
                                        borderRadius: '1rem',
                                        boxShadow: '0.5rem 0.5rem 0.7rem',
                                        opcatiy: '0.7',
                                    }"
                                    :src="imagen.url"
                                    width="200"
                                    height="200"
                                />
                                <button
                                    type="button"
                                    @click="borrarImagen"
                                    v-bind:style="{
                                        width: '1.2rem',
                                        height: '1.2rem',
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '0.6rem',
                                        borderRadius: '50%',
                                        backgroundColor: '#D32F2F',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        textAlign: 'center',
                                        lineHeight: '13px',
                                    }"
                                >
                                    X
                                </button>
                            </div>
                        </v-col>
                        <v-col
                            class="d-flex justify-center align-center py-0"
                            cols="12"
                            sm="6"
                            v-else-if="promocion.imagenUrl !== ''"
                        >
                            <div
                                v-bind:style="{
                                    margin: '0 auto',
                                    position: 'relative',
                                }"
                            >
                                <img
                                    v-bind:style="{
                                        objectFit: 'cover',
                                        borderRadius: '1rem',
                                        boxShadow: '0.5rem 0.5rem 0.7rem',
                                        opcatiy: '0.7',
                                    }"
                                    :src="promocion.imagenUrl"
                                    width="200"
                                    height="200"
                                />
                                <button
                                    type="button"
                                    @click="borrarImagen()"
                                    v-bind:style="{
                                        width: '1.2rem',
                                        height: '1.2rem',
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '0.6rem',
                                        borderRadius: '50%',
                                        backgroundColor: '#D32F2F',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: '13px',
                                        textAlign: 'center',
                                        lineHeight: '13px',
                                    }"
                                >
                                    X
                                </button>
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                        v-if="id"
                        color="orange accent-3"
                        dark
                        @click="editarPromocion"
                    >
                        <v-icon left class="mr-1">edit</v-icon>
                        Editar registro
                    </v-btn>
                    <v-btn
                        v-else
                        color="primary"
                        dark
                        @click="registrarPromocion"
                    >
                        <v-icon left class="mr-1">add_circle</v-icon>
                        Guardar registro
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </div>
</template>

<script>
    import { db, storage } from "../../functions/firebase";
    import Swal from "sweetalert2";
    import { validationMixin } from "vuelidate";
    import { required, minLength } from "vuelidate/lib/validators";
    import { rutas } from "../../functions/rutas";
    import { breadCrumbs, tipoPromocion } from "../../functions/constantes";

    export default {
        name: "FormularioPromocion",
        mixins: [validationMixin],
        components: {
            BreadCrumb: () => import("../compoentesGenerales/BreadCrumb.vue"),
        },
        data() {
            return {
                id: null,
                imagen: null,
                imagenCargada: false,
                promocion: {
                    titulo: "",
                    fechaInicioPromocion: "",
                    fechaFinPromocion: "",
                    descripcion: "",
                    categoria: "",
                    imagenUrl: "",
                    imagenNombre: "",
                },
                selects: {
                    categorias: tipoPromocion,
                },
                breadCrumbs: this.id
                    ? breadCrumbs.promosionesEditar
                    : breadCrumbs.promosionesRegistrar,
                menuFechaInicio: false,
                fechaInicioPromocion: false,
                fechaFinPromocion: false,
            };
        },
        validations() {
            return {
                promocion: {
                    fechaInicioPromocion: {
                        required,
                    },
                    fechaFinPromocion: {
                        required,
                    },
                    titulo: {
                        required,
                        minLength: minLength(4),
                    },
                    descripcion: {
                        required,
                        minLength: minLength(10),
                    },
                    categoria: {
                        required,
                    },
                },
            };
        },
        methods: {
            cargarImagen(e) {
                if (!e) return;

                const imagen = e;
                imagen.url = URL.createObjectURL(e);
                this.imagen = imagen;
                this.promocion.imagenNombre = e.name;
                this.imagenCargada = true;
            },
            registrarPromocion() {
                this.$v.$touch();
                if (this.$v.$invalid) return;

                if (!this.imagen) {
                    Swal.fire({
                        title: "Error",
                        text: "Debe elegir una imagen",
                        icon: "error",
                    });
                    return;
                }

                Swal.fire({
                    title: "Guardando cambios",
                    text:
                        "Espere un momento mientras se guardan los cambios...",
                    icon: "info",
                });

                Swal.showLoading();

                const storageRef = storage.ref();
                storageRef
                    .child(`promociones/${this.imagen.name}`)
                    .put(this.imagen)
                    .then((snapshot) => {
                        snapshot.ref.getDownloadURL().then((url) => {
                            this.promocion.imagenUrl = url;
                            db.collection("promociones")
                                .add(this.promocion)
                                .then(() => {
                                    Swal.close();
                                    Swal.fire({
                                        title: "Exíto!",
                                        text: "Se guardaron los cambios.",
                                        icon: "success",
                                    }).then(() => {
                                        this.$router.push(
                                            rutas.PROMOCION_LISTAR
                                        );
                                    });
                                })
                                .catch(() => {
                                    Swal.close();
                                    Swal.fire({
                                        text: "Error",
                                        text:
                                            "Ocurrio un error, intente nuevamente.",
                                        icon: "error",
                                    }).then(() => {
                                        storageRef
                                            .child(
                                                `promociones/${this.imagen.name}`
                                            )
                                            .delete();
                                    });
                                });
                        });
                    });
            },
            editarPromocion() {
                this.$v.$touch();
                if (this.$v.$invalid) return;

                if (this.promocion.imagenUrl === "") {
                    Swal.fire({
                        title: "Error",
                        text: "Debe elegir una imagen",
                        icon: "error",
                    });
                    return;
                }

                const storageRef = storage.ref();
                const docRef = db.collection("promociones").doc(this.id);

                Swal.fire({
                    title: "Guardando cambios",
                    text:
                        "Espere un momento mientras se guardan los cambios...",
                    icon: "info",
                });

                Swal.showLoading();

                if (this.imagenCargada) {
                    storageRef
                        .child(`promociones/${this.promocion.imagenNombre}`)
                        .delete()
                        .then(() => {
                            storageRef
                                .child(`promociones/${this.imagen.name}`)
                                .put(this.imagen)
                                .then((snapshot) => {
                                    snapshot.ref
                                        .getDownloadURL()
                                        .then((url) => {
                                            this.promocion.imagenNombre = this.imagen.name;
                                            this.promocion.imagenUrl = url;

                                            docRef
                                                .update(this.promocion)
                                                .then(() => {
                                                    Swal.close();
                                                    Swal.fire({
                                                        title: "Exíto!",
                                                        text:
                                                            "Se guardaron los cambios.",
                                                        icon: "success",
                                                    }).then(() => {
                                                        this.$router.push(
                                                            rutas.PROMOCION_LISTAR
                                                        );
                                                    });
                                                });
                                        });
                                });
                        });
                    this.$router.push(rutas.PROMOCION_LISTAR);
                    return;
                }
                docRef
                    .update(this.promocion)
                    .then(() => {
                        Swal.close();
                        Swal.fire({
                            title: "Exíto!",
                            text: "Se guardaron los cambios.",
                            icon: "success",
                        });
                    })
                    .then(() => {
                        this.$router.push(rutas.PROMOCION_LISTAR);
                    });
            },
            borrarImagen(nueva = true) {
                if (nueva) {
                    this.imagen = null;
                    return;
                }
            },
            obtenerDatosPromocion() {
                Swal.fire({
                    title: "Cargando los datos!",
                    text: "Espere un momento...",
                    icon: "info",
                });

                Swal.showLoading();
                db.collection("promociones")
                    .doc(this.id)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            this.promocion = doc.data();
                            Swal.close();
                            return;
                        }
                        Swal.close();

                        Swal.fire({
                            text: "Error",
                            text:
                                "Ocurrio un error, el registro no existe o ha sido borrado.",
                            icon: "error",
                        });
                    })
                    .catch(() => {
                        Swal.close();
                        Swal.fire({
                            text: "Error",
                            text: "Ocurrio un error, intente nuevamente.",
                            icon: "error",
                        });
                    });
            },
        },
        computed: {
            fechaInicioPromocionErrors() {
                const errors = [];
                if (!this.$v.promocion.fechaInicioPromocion.$dirty)
                    return errors;
                !this.$v.promocion.fechaInicioPromocion.required &&
                    errors.push("El capo fecha inicio es requerido");
                return errors;
            },
            fechaFinPromocionErrors() {
                const errors = [];
                if (!this.$v.promocion.fechaFinPromocion.$dirty) return errors;
                !this.$v.promocion.fechaFinPromocion.required &&
                    errors.push("El capo fecha fin es requerido");
                return errors;
            },
            tituloErrors() {
                const errors = [];
                if (!this.$v.promocion.titulo.$dirty) return errors;
                !this.$v.promocion.titulo.required &&
                    errors.push("El capo título es requerido");
                !this.$v.promocion.titulo.minLength &&
                    errors.push(
                        `El campo título acepta mínimo ${this.$v.promocion.titulo.$params.minLength.min} valores`
                    );
                return errors;
            },
            descripcionErrors() {
                const errors = [];
                if (!this.$v.promocion.descripcion.$dirty) return errors;
                !this.$v.promocion.descripcion.required &&
                    errors.push("El campo descripción es requerido");
                !this.$v.promocion.descripcion.minLength &&
                    errors.push(
                        `El campo descripción acepta mínimo ${this.$v.promocion.descripcion.$params.minLength.min} valores`
                    );
                return errors;
            },
            categoriaErrors() {
                const errors = [];
                if (!this.$v.promocion.categoria.$dirty) return errors;
                !this.$v.promocion.categoria.required &&
                    errors.push("el campo categioria es requerido");
                return errors;
            },
        },
        created() {
            const { id } = this.$route.params;
            this.id = id;
            if (id) {
                this.obtenerDatosPromocion();
            }
        },
    };
</script>
