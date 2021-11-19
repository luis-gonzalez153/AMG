<template>
	<v-row justify="center">
		<v-dialog
			v-model="mostrar_modal_profesion"
			transition="dialog-bottom-transition"
			max-width="500"
		>
			<v-card>
				<v-card-title class="headline grey lighten-2">
					Registro de Profesiones
				</v-card-title>

				<v-card-text class="my-3 p-2">
					<v-text-field
						v-model="profesion['codigo_profesion']"
						outlined
						label="Codigo"
						placeholder="PRO01"
						type="text"
						required
					/>
					<v-text-field
						v-model="profesion['nombre_profesion']"
						outlined
						label="Nombre de la profesión"
						type="text"
						required
					/>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						@click="guardarProfesion"
					>
						<v-icon
							left
						>save</v-icon>
						Guardar Profesión
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>

import { db } from "../../functions/firebase";

export default {
	name:"FormularioProfesion",
	 props:{
		mostrar_modal_profesion:{
			type:Boolean,
			default:false,
		}
	},
	data: () => (
		{
			profesion:{
				nombre_profesion:"",
				codigo_profesion:"",
				fecha_creacion: Date.now()
			}
		}
	),
	methods:{
		guardarProfesion(){
			db.collection("profesiones").doc().set(
				this.profesion
			).then(() => {
				this.$emit('ocultarModalProfesional', this.profesion);
			}).catch(error => {
				console.log(error);
			});
		}
	}
}
</script>