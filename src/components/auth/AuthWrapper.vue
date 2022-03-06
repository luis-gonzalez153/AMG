<template>
    <Login
        v-if="opcion === 1"
        :key="opcion"
        @seleccionarOpcion="this.seleccionarOpcion"
    />
    <Register
        v-else
        :key="opcion"
        @seleccionarOpcion="this.seleccionarOpcion"
    />
</template>
<script>
    export default {
        name: "AuthWrapper",
        components: {
            Login: () => import("./Login.vue"),
            Register: () => import("./Register.vue"),
        },
        data() {
            return {
                opcion: 1,
            };
        },
        methods: {
            seleccionarOpcion(opcion) {
                this.opcion = opcion;
            },
        },
    };
</script>
