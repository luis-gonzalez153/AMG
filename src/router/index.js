import Swal from "sweetalert2";
import Vue from "vue";
import VueRouter from "vue-router";
import { rutas } from "../functions/rutas";
import store from "../store/index";
import { routeComponent } from "./routesComponents";

Vue.use(VueRouter);

const routes = [
    {
        path: rutas.HOME,
        name: "HOME",
        component: routeComponent.home,
        meta: {
            requiresAuth: false,
            main: true,
        },
    },
    {
        path: rutas.USUARIO_PERFIL,
        name: "PERFIL_USUARIO",
        component: routeComponent.perfilUsuario,
        meta: {
            requiresAuth: false,
            main: true,
        },
    },
    {
        path: rutas.USUARIO_LISTAR,
        name: "LISTAR_USUARIOS",
        component: routeComponent.listarUsuarios,
        props: true,
        meta: {
            requiresAuth: true,
            main: true,
        },
    },
    {
        path: rutas.PROMOCION_REGISTRAR,
        name: "REGISTRAR_PROMOCION",
        component: routeComponent.formularioPromocion,
        props: true,
        meta: {
            requiresAuth: true,
            main: true,
        },
    },
    {
        path: rutas.PROMOCION_EDITAR,
        name: "EDITAR_PROMOCION",
        component: routeComponent.formularioPromocion,
        props: true,
        meta: {
            requiresAuth: true,
            main: true,
        },
    },
    {
        path: rutas.PROMOCION_LISTAR,
        name: "LISTAR_PROMOCIONES",
        component: routeComponent.listarPromociones,
        props: true,
        meta: {
            requiresAuth: true,
            main: true,
        },
    },
    {
        path: rutas.HERRAMIENTA_LISTAR,
        name: "LISTAR_HERRAMIENTAS",
        component: routeComponent.listarHerramientas,
        props: true,
        meta: {
            requiresAuth: true,
            main: true,
        },
    },
    {
        path: rutas.PRODUCTO_LISTAR,
        name: "LISTAR_PRODUCTOS",
        component: routeComponent.listarProductos,
        props: true,
        meta: {
            requiresAuth: true,
            main: true,
        },
    },
    {
        path: rutas.CITAS,
        name: "CITAS_USUARIO",
        component: routeComponent.citas,
        props: true,
        meta: {
            requiresAuth: true,
            main: true,
        },
    },
    {
        path: rutas.CITAS_ADMIN,
        name: "CITAS_USUARIO_ADMIN",
        component: routeComponent.citasAdmin,
        props: true,
        meta: {
            requiresAuth: true,
            main: true,
        },
    },
    {
        path: rutas.REPARACIONES_REGISTRAR,
        component: routeComponent.formularioReparacion,
        props: true,
        meta: {
            requiresAuth: true,
            main: true,
        },
    },
    {
        path: rutas.REPARACIONES_EDITAR,
        component: routeComponent.formularioReparacion,
        props: true,
        meta: {
            requiresAuth: true,
            main: true,
        },
    },
    // {
    //     path: rutas.REPARACIONES_VER,
    //     component: () =>
    //         import("../components/reparaciones/VistaPreviaReparaciones.vue"),
    //     props: true,
    //     meta: {
    //         requiresAuth: false,
    //         main: true,
    //     },
    // },
    {
        path: rutas.REPARACIONES_LISTAR,
        component: routeComponent.listarReparaciones,
        props: true,
        meta: {
            requiresAuth: true,
            main: true,
        },
    },
    {
        path: "*",
        component: () => import("../components/base/NotFoundPage.vue"),
        name: "not-found",
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.getters.usuarioAutenticado) {
            next();
        } else {
            Swal.fire({
                title: "Permiso denegado!",
                text: "Ésta sección requiere estar autenticado o logeado",
                icon: "warning",
            });
            next({ name: "HOME" });
        }
    } else {
        next();
    }
});

export default router;
