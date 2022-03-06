const routeComponent = {
    home: () => import("../components/Home.vue"),
    perfilUsuario: () => import("../components/usuarios/PerfilUsuario.vue"),
    listarUsuarios: () => import("../components/usuarios/ListarUsuarios.vue"),
    formularioPromocion: () =>
        import("../components/promocion/FormularioPromocion.vue"),
    listarPromociones: () =>
        import("../components/promocion/ListarPromociones.vue"),
    vistaPreviaPromocion: () =>
        import("../components/promocion/VistaPreviaPromocion.vue"),
    listarHerramientas: () =>
        import("../components/herramienta/ListarHerramienta.vue"),
    listarProductos: () => import("../components/producto/ListarProductos.vue"),
    formularioReparacion: () =>
        import("../components/reparaciones/FormularioReparacion.vue"),
    listarReparaciones: () =>
        import("../components/reparaciones/ListarReparaciones.vue"),
    citas: () => import("../components/cita/CitasUsuario.vue"),
    citasAdmin: () => import("../components/cita/ListarCitas.vue"),
};

export { routeComponent };
