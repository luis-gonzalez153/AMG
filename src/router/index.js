import Vue from "vue";
import VueRouter from "vue-router";
import rutas from "../functions/rutas";
import Home from "../views/Home.vue";
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
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      requiresAuth: true
    }
  },
  {
    path:"/ciudadanos/",
    component:() => import("../views/Ciudadano.vue"),
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
      
      {
        path:"/herramientas/",
        component:() => import("../views/Herramienta.vue"),
        meta:{
          requiresAuth: true
        },
      }

    ]
  }
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
