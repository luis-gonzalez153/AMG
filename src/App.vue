<template>
    <layout>
        <template v-slot:content>
            <router-view />
        </template>
    </layout>
</template>

<script>
    import { mapActions } from "vuex";

    export default {
        name: "App",
        components: {
            layout: () => import("./layouts/Layout.vue"),
        },
        methods: {
            ...mapActions(["usuarioAutenticado"]),
        },
        created() {
            this.usuarioAutenticado();
        },
    };
</script>
