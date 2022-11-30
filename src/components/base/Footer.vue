<template>
    <v-main>
        <v-footer dark absolute class="pa-0">
            <v-card
                flat
                tile
                class="blue darken-4 white--text text-center"
                style="width:100%"
            >
                <v-card-text class="white--text pa-5">
                    Empresa casanareña con más de 8 años de experiencia
                    en el sector automotriz con altos estándares de calidad y
                    ofreciendo el mejor servicio a su distinguida clientela.
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text class="white--text">
                    {{ new Date().getFullYear() }} — This site is protected by reCAPTCHA and the Google
                    <a href="https://policies.google.com/privacy" style="color:#FFFFFF;">Privacy Policy</a> and
                    <a href="https://policies.google.com/terms" style="color:#FFFFFF;">Terms of Service</a> apply.
                </v-card-text>
            </v-card>
        </v-footer>
    </v-main>
</template>
<script>
    export default {
        name: "Footer",
        data: () => ({
            items: ["default", "absolute", "fixed"],
            padless: false,
            variant: "default",
        }),
        computed: {
            localAttrs() {
                const attrs = {};

                if (this.variant === "default") {
                    attrs.absolute = false;
                    attrs.fixed = false;
                } else {
                    attrs[this.variant] = true;
                }
                return attrs;
            },
        },
    };
</script>
