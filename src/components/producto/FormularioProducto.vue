<template>
    <div>
        <v-card>
            <v-card-title>Registro de Productos</v-card-title>
            <v-card-text>
                <v-form>
                    <v-container>
                        <v-card
                            class="my-3"
                        >
                            <v-card-title>Detalles de Producto</v-card-title>
                            <v-card-text>
                                <v-row>
                                    <v-col
                                        class="py-0"
                                        cols="6"
                                    >
                                        <v-text-field
                                            v-model="producto.cantidad"
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
                                        v-model="producto.marca"
                                            label="Marca"
                                            placeholder="AirFlow"
                                            type="text"
                                            outlined
                                        />
                                    </v-col>
                                    <v-col
                                        class="py-0"
                                        md="6"
                                    >
                                        <v-text-field
                                        v-model="producto.nombre"
                                            label="Nombre"
                                            placeholder="Filtro"
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
                                        v-for="categoriaproducto in selects.categoriaproducto"
                                            :key="categoriaproducto.value"
                                            v-model="producto.categoriaproducto"
                                            :label="categoriaproducto.nombre"
                                            :value="categoriaproducto.value"
                                        />
                                    </v-col>
                                    <v-col
                                        class="py-0"
                                        md="6"
                                    >
                                        <v-text-field
                                        v-model="producto.precio"
                                            label="Precio"
                                            placeholder="$0.000.00"
                                            prepend-inner-icon="attach_money"
                                            type="text"                                            
                                            outlined
                                        />
                                    </v-col> 
                                    <v-col
                                        class="py-0"
                                        md="6"
                                    >
                                        <v-text-field
                                        v-model="producto.provedor"
                                            label="Provedor"
                                            placeholder="Distri Repuestos"
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
                                            v-model="producto.provedortelefono"
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
                                            v-model="producto.seccion"
                                            :items="selects.seccion"
                                            item-text="nombre_estante"
                                            item-value="codigo_estante"
                                            label="Estante"
                                            placeholder="Seleccione una sección..."
                                            prepend-inner-icon="inventory"
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
                                            @click="mostrar_modal_estante = true"
                                        >
                                            Registrar Estante
                                        </v-btn>
                                    </v-col>
                                     <v-col
                                        class="py-0"
                                        md="6"
                                    >
                                        <v-text-field
                                            v-model="producto.ubicacionproducto"
                                            label="Ubicacion en el estante"
                                            placeholder="1, 2, 3..."
                                            prepend-inner-icon="my_location"
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
                <v-btn
                    color="primary"
                    dark
                    @click="registrarProducto"
                >
                    <v-icon
                        left
                    >save</v-icon>
                    Guardar Registro
                </v-btn>
            </v-card-actions>
        </v-card>
        <FormularioEstante
         :mostrar_modal_estante="mostrar_modal_estante" @ocultarModalEstantenal="ocultarModalEstante" />
       </div>
</template>

<script>

    import { db } from "../../functions/firebase";
    import FormularioEstante from "../producto/FormularioEstante.vue";
import Swal from 'sweetalert2';

    export default {
        name:"FormularioProducto",
        components:{
            FormularioEstante
        },
        data(){
            return{
                producto:{
                    cantidad:"",
                    marca:"",
                    nombre:"",
                    categoriaproducto:"",
                    precio:"",
                    provedor:"",
                    provedortelefono:"",
                    seccion:[],
                    ubicacionproducto:"",
                    
                },
                selects:{
                    categoriaproducto:[
                        { nombre: "Filtros", value:"Filtro" },
                        { nombre: "Refrigerantes", value:"Refrigerante" },
                        { nombre: "Aceites", value:"Aceite" },
                        { nombre: "Auto Partes", value:"Refaccion" },
                    ],
                    seccion:[],
                    
                },
                mostrar_modal_estante:false,
                
            }
        },
        created(){
            this.obtenerEstantes().then(items => {
                items.forEach(item => {
                    this.selects.seccion.push({
                        nombre_estante: item.data().nombre_estante,
                        codigo_estante: item.data().codigo_estante
                    });
                });
            });
        },

        methods:{
            registrarProducto(){
                db.collection("productos").doc().set(
                    this.producto
                ).then(()=>{
                    this.borrarDatosFormulario();
                    Swal.fire({
                        title:"Exito!",
                        text:"Se registro el producto correctamente",
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
                this.producto["cantidad"] = "";
                this.producto["marca"] = "";
                this.producto["nombre"] = "";
                this.producto["categoriaproducto"] = "",
                this.producto["precio"] = "";
                this.producto["provedor"] = "";
                this.producto["provedortelefono"] = "";
                this.producto["seccion"] = [];
                this.producto["ubicacionproducto"] = "";
                
            },

            obtenerDatosProducto(id){
                db.collection("productos").get();
            },

            obtenerEstantes(){
                const estantes  = db.collection("estantes").get();
                return estantes;
            },

            ocultarModalEstante(estante){
                this.selects.seccion.push({
                    ...estante
                });
                this.mostrar_modal_estante = false;
            },

        },
    }
</script>