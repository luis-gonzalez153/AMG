import Vue from "vue";
import VueRouter from "vue-router";
import rutas from "../functions/rutas";
import { auth } from "../functions/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name:"Login",
    component: () => import("../components/Login.vue"),
  },
  {
    path:"*",
    name:"not-found",
    component: () => import("../views/NotFound.vue")
  },
  {
    path: "promocion",
    component:() => import("../components/promocion/ListarPromocion.vue"),
    meta:{
      requiresAuth: true
    },
    children:[
      {
        path: rutas.PROMOCION_REGISTRAR,
        component: () => import("../components/promocion/FormularioPromocion.vue"),
        props:true
      },
      {
        path: rutas.PROMOCION_EDITAR,
        component: () => import("../components/promocion/FormularioPromocion.vue"),
        props:true
      },
      {
        path: rutas.PROMOCION_VER,
        component: () => import("../components/promocion/VistaPreviaPromocion.vue"),
        props:true
      },
      {
        path: rutas.PROMOCION_LISTAR,
        component: () => import("../components/promocion/ListarPromocion.vue"),
        props:true
      },
    ],
  
  },
  {
    path:"/ciudadanos/",
    component:() => import("../components/ciudadano/ListarCiudadanos.vue"),
    meta:{
      requiresAuth: true
    },
    children:[
      {
        path: rutas.CIUDADANO_REGISTRAR,
        component: () => import("../components/ciudadano/FormularioCiudadano.vue"),
        props:true
      },
      {
        path: rutas.CIUDADANO_EDITAR,
        component: () => import("../components/ciudadano/FormularioCiudadano.vue"),
        props:true
      },
      {
        path: rutas.CIUDADANO_VER,
        component: () => import("../components/ciudadano/VistaPreviaCiudadano.vue"),
        props:true
      },
      {
        path: rutas.CIUDADANO_LISTAR,
        component: () => import("../components/ciudadano/ListarCiudadanos.vue"),
        props:true
      },
    ],
  },


      
      {
        path:"/herramienta/",
        component:() => import("../components/herramienta/ListarHerramienta.vue"),
        meta:{
          requiresAuth: true          
    },
    children:[
      {
        path: rutas.HERRAMIENTA_REGISTRAR,
        component: () => import("../components/herramienta/FormularioHerramienta.vue"),
        props:true
      },
      {
        path: rutas.HERRAMIENTA_EDITAR,
        component: () => import("../components/herramienta/FormularioHerramienta.vue"),
        props:true
      },
      {
        path: rutas.HERRAMIENTA_VER,
        component: () => import("../components/herramienta/VistaPreviaHerramienta.vue"),
        props:true
      },
      {
        path: rutas.HERRAMIENTA_LISTAR,
        component: () => import("../components/herramienta/ListarHerramienta.vue"),
        props:true
      },
    ],
  },
  {
    path:"/producto/",
    component:() => import("../components/producto/ListarProducto.vue"),
    meta:{
      requiresAuth: true
    },
    children:[
      {
        path: rutas.PRODUCTO_REGISTRAR,
        component: () => import("../components/producto/FormularioProducto.vue"),
        props:true
      },
      {
        path: rutas.PRODUCTO_EDITAR,
        component: () => import("../components/producto/FormularioProducto.vue"),
        props:true
      },
      {
        path: rutas.PRODUCTO_VER,
        component: () => import("../components/producto/VistaPreviaProducto.vue"),
        props:true
      },
      {
        path: rutas.PRODUCTO_LISTAR,
        component: () => import("../components/producto/ListarProducto.vue"),
        props:true
      },
    ],
  },


  {
    path:"/cita/",
    component:() => import("../components/cita/ListarCita.vue"),
    meta:{
      requiresAuth: true
    },
    children:[
      {
        path: rutas.CITA_REGISTRAR,
        component: () => import("../components/cita/FormularioCita.vue"),
        props:true
      },
      {
        path: rutas.CITA_EDITAR,
        component: () => import("../components/cita/FormularioCita.vue"),
        props:true
      },
      {
        path: rutas.CITA_VER,
        component: () => import("../components/cita/VistaPreviaCita.vue"),
        props:true
      },
      {
        path: rutas.CITA_LISTAR,
        component: () => import("../components/cita/ListarCita.vue"),
        props:true
      },
    ],
  },

]


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = auth.currentUser

  if (requiresAuth && !currentUser) next({ path: '/login', query: { redirect: to.fullPath } })
  else if (!requiresAuth && currentUser) next('/')
  else if (!requiresAuth && !currentUser) next()
  else next()
})


export default router
