<template>
    <v-main>
        <v-footer dark padless>
            <v-card
                flat
                tile
                class="indigo lighten-1 white--text text-center"
                style="width:100%"
            >
                <v-card-text>
                    <v-btn
                        v-for="icon in icons"
                        :key="icon"
                        class="mx-4 white--text"
                        icon
                    >
                        <v-icon size="24px">
                            {{ icon }}
                        </v-icon>
                    </v-btn>
                </v-card-text>

                <v-card-text class="white--text pt-0">
                    Empresa casanareña dedicada con más de 8 años de experiencia en el sector automotriz con altos estándares de calidad y ofreciendo el mejor servicio a su distinguida clientela. 
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text class="white--text">
                    {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
                </v-card-text>
            </v-card>
        </v-footer>
    </v-main>
</template>
<script>
    export default {
        data: () => ({
            icons: ["mdi-home", "mdi-email", "mdi-calendar", "mdi-delete"],
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
