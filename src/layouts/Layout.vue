<template>
    <v-app
        v-bind:style="{
            maxWidth: '100vw',
            maxHeight: '100vw',
        }"
    >
        <Navbar />
        <v-main
            class="pa-5"
            v-bind:style="{
                marginBottom: '13rem',
                marginTop: '0',
            }"
        >
            <v-container fluid>
                <slot name="content"></slot>
            </v-container>
        </v-main>
        <Footer />
    </v-app>
</template>
<script>
    export default {
        name: "Layout",
        components: {
            Footer: () => import("../components/base/Footer.vue"),
            Navbar: () => import("../components/base/Navbar.vue"),
        },
    };
</script>
