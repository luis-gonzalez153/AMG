<template>
  <v-card class="pb-4 px-0 my-2">
    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      dark
      icons-and-text
    >
      <v-tabs-slider color="white"></v-tabs-slider>

    <v-tab
        v-for="(item, index) in items"
        :key="index"
    >
        {{item.nombre}}
        <v-icon>{{item.icono}}</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="(item, index) in items"
        :key="index"
        :value="item"
      >
        <v-card flat>
          <v-card-text>hola + {{index}}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <router-view>
    <ListarHerramienta/>
    <FormularioHerramienta/>
    </router-view>
  </v-card>
</template>

<script>
    export default {
        name:"Herramienta",
        components:{
            FormularioHerramienta: () => import("../components/herramienta/FormularioHerramienta.vue"),
            ListarHerramienta: () => import("../components/herramienta/ListarHerramienta.vue"),
            VistaPreviaHerramienta: () => import("../components/herramienta/VistaPreviaHerramienta.vue"),
        },
        data () {
            return {
                items:[
                    {
                        componente:"FormularioHerramienta",
                        icono:"engineering",
                        nombre:"Formulario"
                    },
                    {
                        componente:"ListarHerramienta",
                        icono:"format_list_bulleted",
                        nombre:"Listado"
                    },
                ],
                tab: null,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            }
        },
    }
</script>