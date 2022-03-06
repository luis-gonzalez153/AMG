<template>
    <div class="my-2 p-2">
        <v-breadcrumbs class="grey lighten-4" :items="items">
            <template v-slot:divider>
                <v-icon>keyboard_arrow_right</v-icon>
            </template>
            <template v-slot:item="{ item }">
                <v-breadcrumbs-item :to="item.href" :disabled="item.disabled">
                    {{ item.text }}
                </v-breadcrumbs-item>
            </template>
        </v-breadcrumbs>
    </div>
</template>
<script>
    export default {
        name: "BreadCrumb",
        props: {
            items: {
                type: Array,
                require: true,
                default: [],
            },
        },
    };
</script>
