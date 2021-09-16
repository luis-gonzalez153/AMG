<template>
  	<v-app>
		<v-app-bar
			fixed
			color="blue"
			app
		>
			<v-avatar
				size="48px"
			>
				<img
					src="https://cdn.vuetifyjs.com/images/john.jpg"
					alt="John"
				>
			</v-avatar>
			<v-toolbar-title class="mx-4">AMG ADMINISTRADOR</v-toolbar-title>


			<v-btn
				plain
				class="ma-2"
				to="/"
			>
				<v-icon
					left
					dark
				>home</v-icon>
				Inicio
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
				to="/herramientas"
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
				to="/productos"
				class="ma-2"
				plain
			>
				<v-icon
					dark
					left
				>
					shop
				</v-icon>
				productos
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
					<Ciudadano/>
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
