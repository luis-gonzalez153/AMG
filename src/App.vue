<template>
  	<v-app>
		<v-app-bar
			fixed
			color="#3BA2D9"
			app
		>
			<v-avatar
				size="48px"
			>
				<img
					src="https://scontent-bog1-1.xx.fbcdn.net/v/t1.6435-9/211298636_4142217489189381_6629705770475768039_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFXYThhxd0c9AcYqahTU5snDFC1lFuoeigMULWUW6h6KFBOPHpdHY118g11B1UsZXmNObM_aiNRKdsWhAoDxLtH&_nc_ohc=6BURUMdDI9oAX83IQHV&_nc_ht=scontent-bog1-1.xx&oh=67326a7f4c5ee24837185bac36b60f94&oe=61A72BD0"
					alt="AMG"
				>
			</v-avatar>
			<v-toolbar-title class="mx-4">AMG ADMIN</v-toolbar-title>


			<v-btn
			
				plain
				class="ma-2"
				to="/promocion"
			>
				<v-icon
					left
					dark
				>home</v-icon>
				Promociones
			</v-btn>
			<v-btn
				to="/ciudadanos"
				class="ma-2"
				plain
			>
				<v-icon
					dark
					left
				>
					people
				</v-icon>
				Usuarios
			</v-btn>

			<v-btn
				to="/herramienta"
				class="ma-2"
				plain
			>
				<v-icon
					dark
					left
				>
					settings
				</v-icon>
				herramientas
			</v-btn>

			<v-btn
				to="/producto"
				class="ma-2"
				plain
			>
				<v-icon
					dark
					left
				>
					shop
				</v-icon>
				Productos
			</v-btn>

			<v-btn
				to="/cita"
				class="ma-2"
				plain
			>
				<v-icon
					dark
					left
				>
					assignment
				</v-icon>
				Citas
			</v-btn>

			<v-spacer></v-spacer>
			<v-btn
				plain
				@click="logOut"
			>
				<v-icon
					left
					dark
				>logout</v-icon>
				Cerrar Sesión
			</v-btn>
		</v-app-bar>
		<v-main class="p-2">
			<v-container style="height: auto;">
				<router-view>
					<Promocion/>
					<Ciudadano/>
					<ListarCiudadanos />
					<Herramienta/>
					<ListarHerramienta/>
					<Producto/>
					<Cita/>
				</router-view>
			</v-container>
		</v-main>
    	<v-footer
			absolute
			app
			padless
		>
			<v-card
				flat
				tile
				width="100%"
				class="blue lighten-1 text-center"
				dark
			>
				<v-card-text>
					<h1>Página administrativa de AMG Aires Acondicionados Yopal</h1>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-text class="white--text">
					{{ new Date().getFullYear() }} — <strong>Vuetify</strong>
				</v-card-text>
			</v-card>
		</v-footer>
	</v-app>
</template>

<script>
import {auth} from "./functions/firebase";
import Swal from "sweetalert2";

export default {
	name: 'App',
	components: {
	Login: () => import("./components/Login.vue"),

	Ciudadano: () => import("./views/Ciudadano.vue"),
	ListarCiudadanos: () => import("./components/ciudadano/ListarCiudadanos.vue"),

	Herramienta: ()=> import("./views/Herramienta.vue"),
	ListarHerramienta: () => import("./components/herramienta/ListarHerramienta.vue"),
	
	Producto: ()=> import("./views/Producto.vue"),
	Cita: ()=> import("./views/Cita.vue"),
	},
	methods:{
		logOut(){
			auth.signOut().then(() => {
				Swal.fire({
					title:"Exíto",
					text:"Su sesión se ha cerrado exitosamente!",
					icon:"success",
					timer:2000,
					timerProgressBar:true
				}).then(()=>{
					window.location.href = "/login";
				});
			}).catch(error => {
				Swal.fire({
					title:"Error",
					text:error,
					icon:"error",
				});
			});
		}
	}
};
</script>
