import { rutas } from "./rutas";

const roles = [
    { nombre: "Cliente", value: "CLIENTE" },
    { nombre: "Empleado", value: "EMPLEADO" },
    { nombre: "Administrador", value: "ADMINISTRADOR" },
];

const estadosRevisiones = [
    { nombre: "Recibido", value: "RECIBIDO" },
    { nombre: "Revisando", value: "REVISADO" },
    { nombre: "Terminado", value: "TERMINADO" },
    { nombre: "Entregado", value: "ENTREGADO" },
];

const tipoHerramientas = [
    { nombre: "Llave de Mano", value: "Mano" },
    { nombre: "Equipo", value: "Equipo" },
    { nombre: "Electronicos", value: "Electrico" },
    { nombre: "Neumaticos", value: "Neumatico" },
];

const generos = [
    { nombre: "Masculino", value: "M" },
    { nombre: "Femenino", value: "F" },
    { nombre: "LGTBI", value: "LGTBI" },
];

const tipoPromocion = [
    { nombre: "Promocion", value: "PROMOCION" },
    { nombre: "Tip", value: "TIP" },
];

const tipoProductos = [
    { nombre: "Filtro", value: "FILTRO" },
    { nombre: "Refrigerante", value: "REFRIGERANTE" },
    { nombre: "Aceite", value: "ACEITE" },
    { nombre: "Auto Partes", value: "REFRIGERACION" },
];

const estadoCitas = ["Pendiente", "Atendida", "Rechazada"];

const marcasVehiculos = [
    "AUDI",
    "BAIC",
    "BMW",
    "BRILLIANCE",
    "BYD",
    "CHANGAN",
    "CHANGHE",
    "CHERY",
    "CHEVROLET",
    "CHRYSLER",
    "CITROËN",
    "DAIHATSU",
    "DFSK",
    "DODGE",
    "DONGFENG",
    "DS AUTOMOBILES",
    "FAW",
    "FERRARI",
    "FIAT",
    "FORD",
    "FOTON",
    "GAC GONOW",
    "GREAT WALL",
    "HAVAL",
    "HIGER",
    "HONDA",
    "HYUNDAI",
    "ISUZU",
    "IVECO",
    "JAC",
    "JAGUAR",
    "JEEP",
    "JINBEI",
    "JMC",
    "JOYLONG",
    "KIA",
    "KENBO",
    "LAND ROVER",
    "LEXUS",
    "LIFAN",
    "MAHINDRA",
    "MASERATI",
    "MAZDA",
    "MERCEDES BENZ",
    "MG",
    "MINI",
    "MITSUBISHI MOTORS",
    "PEUGEOT",
    "PIAGGIO",
    "PORSCHE",
    "RENAULT",
    "SEAT",
    "SHINERAY",
    "SKODA",
    "SOUEAST",
    "SSANGYONG",
    "SUBARU",
    "SUZUKI",
    "TOYOTA",
    "VOLKSWAGEN",
    "VOLVO",
];

const breadCrumbGenerales = {
    breadCrumbHome: {
        text: "Inicio",
        disabled: false,
        href: rutas.HOME,
    },
    breadCrumbPromocion: {
        text: "Promociones",
        href: rutas.PROMOCION_LISTAR,
        disabled: false,
    },
};

const breadCrumbs = {
    perfilUsuario: [
        { ...breadCrumbGenerales.breadCrumbHome },
        {
            text: "Perfil usuario",
            disabled: false,
            href: rutas.USUARIO_PERFIL,
        },
    ],
    usuarios: [
        { ...breadCrumbGenerales.breadCrumbHome },
        {
            text: "Listado usuarios",
            href: rutas.USUARIO_LISTAR,
            disabled: false,
        },
    ],
    promosionesListar: [
        { ...breadCrumbGenerales.breadCrumbHome },
        { ...breadCrumbGenerales.breadCrumbPromocion },
        {
            text: "Listar",
            href: rutas.PROMOCION_LISTAR,
            disabled: false,
        },
    ],
    promosionesRegistrar: [
        { ...breadCrumbGenerales.breadCrumbHome },
        { ...breadCrumbGenerales.breadCrumbPromocion },

        {
            text: "Registrar",
            href: "",
            disabled: true,
        },
    ],
    promosionesEditar: [
        { ...breadCrumbGenerales.breadCrumbHome },
        { ...breadCrumbGenerales.breadCrumbPromocion },
        {
            text: "Editar",
            href: "",
            disabled: true,
        },
    ],
    herramientas: [
        { ...breadCrumbGenerales.breadCrumbHome },
        {
            text: "Herramientas",
            href: rutas.HERRAMIENTA_LISTAR,
            disabled: false,
        },
    ],
    productos: [
        { ...breadCrumbGenerales.breadCrumbHome },
        {
            text: "Productos",
            href: rutas.PRODUCTO_LISTAR,
            disabled: false,
        },
    ],
    citas: [
        { ...breadCrumbGenerales.breadCrumbHome },
        {
            text: "Citas",
            disabled: false,
            href: rutas.CITAS,
        },
    ],
    citasAdmin: [
        { ...breadCrumbGenerales.breadCrumbHome },
        {
            text: "Citas",
            disabled: true,
            href: rutas.CITAS,
        },
    ],
};

export {
    roles,
    estadosRevisiones,
    tipoHerramientas,
    estadoCitas,
    generos,
    tipoPromocion,
    tipoProductos,
    breadCrumbs,
    marcasVehiculos,
};
