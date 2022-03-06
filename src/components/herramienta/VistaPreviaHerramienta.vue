<template>
    <v-card v-if="herramienta">
        <v-card-title>{{ herramienta.nombre }}</v-card-title>
        <v-card-text>
            <v-row>
                <v-col class="d-flex flex-row" cols="12" sm="6">
                    <h4 class="mx-1">Marca:</h4>
                    <p class="text-color-black mx-1">{{ herramienta.marca }}</p>
                </v-col>
                <v-col class="d-flex flex-row" cols="12" sm="6">
                    <h4 class="mx-1">Cantidad:</h4>
                    <p class="text-color-black mx-1">
                        {{ herramienta.cantidad }}
                    </p>
                </v-col>
                <v-col class="d-flex flex-row" cols="12" sm="6">
                    <h4 class="mx-1">Entregadas:</h4>
                    <p class="text-color-black mx-1">
                        {{ herramienta.entregadasPersonal }}
                    </p>
                </v-col>
                <v-col class="d-flex flex-row" cols="12" sm="6">
                    <h4 class="mx-1">Tipo herramienta</h4>
                    <p class="text-color-black mx-1">
                        {{ herramienta.tipoHerramienta }}
                    </p>
                </v-col>
                <v-col class="d-flex flex-row" cols="12" sm="6">
                    <h4 class="mx-1">Proveedor:</h4>
                    <p class="text-color-black mx-1">
                        {{ herramienta.proveedor }}
                    </p>
                </v-col>
                <v-col class="d-flex flex-row" cols="12" sm="6">
                    <h4 class="mx-1">Teléfono proveedor</h4>
                    <p class="text-color-black mx-1">
                        {{ herramienta.proveedorTelefono }}
                    </p>
                </v-col>
            </v-row>
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
</template>

<script>
    export default {
        name: "VistaPreviaHerramienta",
        props: {
            herramienta: {
                require: true,
                typeof: Object,
            },
        },
    };
</script>
<style>
    .text-color-black {
        color: #000;
    }
</style>
