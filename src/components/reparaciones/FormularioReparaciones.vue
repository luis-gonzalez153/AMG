<template>
    <v-main class="pt-1">
            <v-card-title>Registro de Reparaciones</v-card-title>
            <v-card-text>
                <v-form>
                    <v-container>
                        <v-card class="my-3">
                            <v-card-title>Realizar Ingreso</v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col class="py-0" cols="6">
                                        <v-text-field
                                            v-model="reparacion.id"
                                            label="Id"
                                            placeholder="1"
                                            type="number"
                                            outlined
                                        
                                        />
                                    </v-col>

                                    <v-col cols="12" md="6">
                            <v-text-field
                                v-model="reparacion.fechareparacion"
                                label="Fecha de Ingreso"
                                type="text"
                                prepend-icon="mdi-calendar"
                                outlined
                                @click="fechareparacion = true"
                            ></v-text-field>
                            <v-dialog
                                v-model="fechareparacion"
                                persistent
                                width="290px"
                            >
                                <v-date-picker
                                    v-model="reparacion.fechareparacion"
                                    scrollable
                                    :max="
                                        new Date().toISOString().substr(0, 10)
                                    "
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="fechareparacion = false"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-dialog>
                            </v-col>

                                    <v-col
                                        class="py-0"
                                        md="6"
                                    >
                                        <v-text-field
                                        v-model="reparacion.cliente"
                                            label="Cliente"
                                            placeholder="Nombre Cliente"
                                            type="text"
                                            prepend-inner-icon="person"
                                            outlined
                                        />
                                    </v-col>

                                    <v-col class="py-0" md="6" >
                                        <v-text-field
                                        v-model="reparacion.cita"
                                            label="Codigo Cita"
                                            placeholder="123456"
                                            type="text"
                                            outlined
                                        />
                                    </v-col>

                                    <v-col class="py-0" md="6">
                                        <label class="d-block pl-2">Tipo</label>
                                        <v-checkbox class="d-inline-flex mt-1 px-2" 
                                        v-for="horarioreparacion in selects.horarioreparacion"
                                            :key="horarioreparacion.value"
                                            v-model="reparacion.horarioreparacion"
                                            :label="horarioreparacion.nombre"
                                            :value="horarioreparacion.value"
                                        />
                                    </v-col>

                                    <v-col class="py-0" md="6">
                                        <v-text-field
                                        v-model="reparacion.empleadoreparacion"
                                            label="Encargado de la Reparacion"
                                            placeholder="Nombre"                                            
                                            type="text"   
                                            prepend-inner-icon="person_search"                                         
                                            outlined
                                        />
                                    </v-col> 
                                   
                                    <v-col class="py-0" md="6">
                                        <v-select
                                            v-model="reparacion.productoreparacion"
                                            :items="selects.productoreparacion"
                                            item-text="nombre_productoreparacion"
                                            item-value="codigo_productoreparacion"
                                            label="Productos y Repuestos"
                                            placeholder="Seleccione uno o varios..."
                                            prepend-inner-icon="home_repair_service"
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
                                            @click="mostrar_modal_productoreparacion = true"
                                        >
                                            Registrar Productos o Repuestos
                                        </v-btn>
                                    </v-col>

                                    <v-col class="py-0" md="6">
                                        <v-select
                                            v-model="reparacion.tiporeparacion"
                                            :items="selects.tiporeparacion"
                                            item-text="nombre_tiporeparacion"
                                            item-value="codigo_tiporeparacion"
                                            label="Tipo Reparacion"
                                            placeholder="Seleccione la uno o varios..."
                                            prepend-inner-icon="home_repair_service"
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
                                            @click="mostrar_modal_tiporeparacion = true"
                                        >
                                            Registrar Tipo de Reparacion
                                        </v-btn>
                                    </v-col>

                                    <v-col class="py-0" md="6">
                                        <v-text-field
                                        v-model="reparacion.comentarios"
                                            label="Comentarios de la Reparacion"
                                            placeholder="Comentarios"
                                            prepend-inner-icon="task"
                                            type="text"                                            
                                            outlined
                                        />
                                    </v-col> 
                                </v-row>
                            </v-card-text>                           
                        </v-card>                        
                    </v-container>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" dark
                    @click="registrarReparacion"
                >
                    <v-icon
                        left
                    >save</v-icon>
                    Guardar Registro
                </v-btn>
            </v-card-actions>
        </v-card>
        <FormularioProductoreparacion
         :mostrar_modal_productoreparacion="mostrar_modal_productoreparacion" @ocultarModalProductoreparacional="ocultarModalProductoreparacion" />
         
        <FormularioTiporeparacion
         :mostrar_modal_tiporeparacion="mostrar_modal_tiporeparacion" @ocultarModalTiporeparacional="ocultarModalTiporeparacion" />
      
       </v-main>
</template>

<script>

    import { db } from "../../functions/firebase";
    import FormularioProductoreparacion from "../reparaciones/FormularioProductoreparacion.vue";
     import FormularioTiporeparacion from "../reparaciones/FormularioTiporeparacion.vue";
import Swal from 'sweetalert2';

    export default {
        name:"FormularioReparaciones",
        components:{
            FormularioProductoreparacion,
            FormularioTiporeparacion,
        },
        data(){
            return{
                reparacion:{
                    id:"",
                    fechareparacion:"",
                    cita:"",
                    horarioreparacion:"",
                    empleadoreparacion:"",
                    productoreparacion:[],
                    tiporeparacion:[],
                    comentarios:"",
                    
                    
                },
                selects:{
                    horarioreparacion:[
                        { nombre: "En la Mañana", value:"Mañana" },
                        { nombre: "En la Tarde", value:"Tarde" },
                    ],
                    productoreparacion:[],
                    tiporeparacion:[],
                    
                },
                mostrar_modal_productoreparacion:false,
                mostrar_modal_tiporeparacion:false,
                fechareparacion:false,                
            }
        },
        created(){
            this.obtenerProductoreparacion().then(items => {
                items.forEach(item => {
                    this.selects.productoreparacion.push({
                        nombre_productoreparacion: item.data().nombre_productoreparacion,
                        codigo_productoreparacion: item.data().codigo_productoreparacion
                    });
                });
            });
            this.obtenerTiporeparacion().then(items => {
                items.forEach(item => {
                    this.selects.tiporeparacion.push({
                        nombre_tiporeparacion: item.data().nombre_tiporeparacion,
                        codigo_tiporeparacion: item.data().codigo_tiporeparacion
                    });
                });
            });
        },

        methods:{
            registrarReparacion(){
                db.collection("reparaciones").doc().set(
                    this.reparacion
                ).then(()=>{
                    this.borrarDatosFormulario();
                    Swal.fire({
                        title:"Exito!",
                        text:"Se registro la reparacion correctamente",
                        icon:"success",
                        timerProgressBar:true,
                        timer:2000
                    });
                }).catch(error => {
                    Swal.fire({
                        title:"Error!",
                        text:error,
                        icon:"error",
                        timerProgressBar:true,
                        timer:2000
                    });
                });
            },

            borrarDatosFormulario(){
                this.reparacion["id"] = "";
                this.reparacion["fechareparacion"] = "";
                this.reparacion["cita"] = "";
                this.reparacion["horarioreparacion"] = "",
                this.reparacion["empleadoreparacion"] = "";
                this.reparacion["productoreparacion"] = [];
                this.reparacion["tiporeparacion"] = [];
                this.reparacion["comentarios"] = "";
                
            },

            obtenerDatosReparacion(id){
                db.collection("reparaciones").get();
            },

            obtenerProductoreparacion(){
                const productoreparaciones  = db.collection("productoreparaciones").get();
                return productoreparaciones;
            },

            ocultarModalProductoreparacion(productoreparacion){
                this.selects.productoreparacion.push({
                    ...productoreparacion
                });
                this.mostrar_modal_productoreparacion = false;
            },
            

            obtenerTiporeparacion(){
                const tiporeparaciones  = db.collection("tiporeparaciones").get();
                return tiporeparaciones;
            },

            ocultarModalTiporeparacion(tiporeparacion){
                this.selects.tiporeparacion.push({
                    ...tiporeparacion
                });
                this.mostrar_modal_tiporeparacion = false;
            },

        },
    };
</script>