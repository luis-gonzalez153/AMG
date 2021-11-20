<template>
    <div>
        <v-card>
            <v-card-title>Registro de Herramientas</v-card-title>
            <v-card-text>
                <v-form>
                    <v-container>
                        <v-card
                            class="my-3"
                        >
                            <v-card-title>Detalles de Herramienta</v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col
                                        class="py-0"
                                        cols="6"
                                    >
                                        <v-text-field
                                            v-model="herramienta.cantidad"
                                            label="Cantidad"
                                            placeholder="1"
                                            type="number"
                                            outlined
                                        
                                        />
                                    </v-col>
                                    <v-col
                                        class="py-0"
                                        md="6"
                                    >
                                        <v-text-field
                                        v-model="herramienta.marca"
                                            label="Marca"
                                            placeholder="Stanley"
                                            type="text"
                                            outlined
                                        />
                                    </v-col>
                                    <v-col
                                        class="py-0"
                                        md="6"
                                    >
                                        <v-text-field
                                        v-model="herramienta.nombre"
                                            label="Nombre"
                                            placeholder="Llave"
                                            type="text"
                                            outlined
                                        />
                                    </v-col>
                                    <v-col
                                        class="py-0"
                                        md="6"
                                    >
                                        <label class="d-block pl-2">Tipo</label>
                                        <v-checkbox class="d-inline-flex mt-1 px-2" 
                                        v-for="categoriaherramienta in selects.categoriaherramienta"
                                            :key="categoriaherramienta.value"
                                            v-model="herramienta.categoriaherramienta"
                                            :label="categoriaherramienta.nombre"
                                            :value="categoriaherramienta.value"
                                        />
                                    </v-col>
                                    <v-col
                                        class="py-0"
                                        md="6"
                                    >
                                        <v-text-field
                                        v-model="herramienta.provedor"
                                            label="Provedor"
                                            placeholder="Distri Servicios"
                                            prepend-inner-icon="store"
                                            type="text"                                            
                                            outlined
                                        />
                                    </v-col> 
                                    <v-col
                                        class="py-0"
                                        md="6"
                                    >
                                        <v-text-field
                                            v-model="herramienta.provedortelefono"
                                            label="Telefono Provedor"
                                            placeholder="3008951234"
                                            prepend-inner-icon="phone"
                                            type="text"
                                            outlined
                                        />
                                    </v-col>
                                    <v-col
                                        class="py-0"
                                        md="6"
                                    >
                                        <v-select
                                            v-model="herramienta.asignacion"
                                            :items="selects.asignacion"
                                            item-text="nombre_banco"
                                            item-value="codigo_banco"
                                            label="Asignación"
                                            placeholder="Seleccione la asignación..."
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
                                            @click="mostrar_modal_banco = true"
                                        >
                                            Registrar Banco
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>


                        
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="primary"
                    dark
                    @click="registrarHerramienta"
                >
                    <v-icon
                        left
                    >save</v-icon>
                    Guardar Registro
                </v-btn>
            </v-card-actions>
        </v-card>
        <FormularioBanco
         :mostrar_modal_banco="mostrar_modal_banco" @ocultarModalBanconal="ocultarModalBanco" />
       </div>
</template>

<script>

    import { db } from "../../functions/firebase";
    import FormularioBanco from "../herramienta/FormularioBanco.vue";
import Swal from 'sweetalert2';

    export default {
        name:"FormularioHerramienta",
        components:{
            FormularioBanco
        },
        data(){
            return{
                herramienta:{
                    cantidad:"",
                    marca:"",
                    nombre:"",
                    categoriaherramienta:"",
                    provedor:"",
                    provedortelefono:"",
                    asignacion:[],
                    
                },
                selects:{
                    categoriaherramienta:[
                        { nombre: "Llave de Mano", value:"Mano" },
                        { nombre: "Equipo", value:"Equipo" },
                        { nombre: "Electronicos", value:"Electrico" },
                        { nombre: "Neumaticos", value:"Neumatico" },
                    ],
                    asignacion:[],
                    
                },
                mostrar_modal_banco:false,
                
            }
        },
        created(){
            this.obtenerBancos().then(items => {
                items.forEach(item => {
                    this.selects.asignacion.push({
                        nombre_banco: item.data().nombre_banco,
                        codigo_banco: item.data().codigo_banco
                    });
                });
            });
        },

        methods:{
            registrarHerramienta(){
                db.collection("herramienta").doc().set(
                    this.herramienta
                ).then(()=>{
                    this.borrarDatosFormulario();
                    Swal.fire({
                        title:"Exito!",
                        text:"Se registro la herramienta correctamente",
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
                this.herramienta["cantidad"] = "";
                this.herramienta["marca"] = "";
                this.herramienta["nombre"] = "";
                this.herramienta["categoriaherramienta"] = "",
                this.herramienta["provedor"] = "";
                this.herramienta["provedortelefono"] = "";
                this.herramienta["asignacion"] = [];
                
            },

            obtenerDatosHerramienta(id){
                db.collection("herramienta").get();
            },

            obtenerBancos(){
                const bancos  = db.collection("bancos").get();
                return bancos;
            },

            ocultarModalBanco(banco){
                this.selects.asignacion.push({
                    ...banco
                });
                this.mostrar_modal_banco = false;
            },

        },
    }
</script>