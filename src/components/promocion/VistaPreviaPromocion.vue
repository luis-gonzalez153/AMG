<template>
    <v-row class="ma-0" v-if="promocion">
        <v-col class="pa-0" cols="12" sm="12" md="4">
            <v-avatar rounded width="100%" height="100%">
                <v-img
                    :src="promocion.imagenUrl"
                    :alt="promocion.imagenNombre"
                ></v-img>
            </v-avatar>
        </v-col>
        <v-col class="pa-0" cols="12" sm="12" md="8">
            <v-card class="pa-2">
                <v-card-title>{{ promocion.titulo }}</v-card-title>
                <v-card-text>
                    <p>{{ promocion.descripcion }}</p>
                    <v-chip-group>
                        <h4 class="ma-2">
                            Fecha inicio:
                            <v-chip color="green darken-2" dark>
                                <v-icon class="mr-1" left>today</v-icon>
                                <span>{{
                                    promocion.fechaInicioPromocion
                                }}</span></v-chip
                            >
                        </h4>
                        <h4 class="ma-2">
                            Fecha fin:
                            <v-chip color="red darken-1" dark>
                                <v-icon class="mr-1" left>today</v-icon>
                                <span>{{
                                    promocion.fechaFinPromocion
                                }}</span></v-chip
                            >
                        </h4>
                    </v-chip-group>
                    <h3>
                        Categoria:
                        <v-chip
                            v-if="promocion.categoria === 'TIP'"
                            color="yellow accent-3"
                        >
                            <v-icon left class="mr-1" color="black"
                                >support</v-icon
                            >
                            <span>{{ promocion.categoria }}</span></v-chip
                        >
                        <v-chip v-else dark color="purple">
                            <v-icon left class="mr-1">redeem</v-icon>
                            <span>{{ promocion.categoria }}</span></v-chip
                        >
                    </h3>
                </v-card-text>
                <v-card-actions class="d-flex justify-end">
                    <v-btn
                        color="red accent-3"
                        dark
                        class="float-right"
                        @click="$emit('ocultarModal')"
                    >
                        <v-icon class="mr-1" left>cancel</v-icon>
                        Cerrar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
    export default {
        name: "VistaPreviaPromocion",
        props: {
            promocion: {
                require: true,
                typeof: Object,
            },
        },
    };
</script>
