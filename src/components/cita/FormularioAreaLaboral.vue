<template>
	<v-row justify="center">
		<v-dialog
			v-model="mostrar_modal_area_laboral"
			transition="dialog-bottom-transition"
			max-width="500"
		>
			<v-card>
				<v-card-title class="headline grey lighten-2">
					Registro de área laboral
				</v-card-title>

				<v-card-text class="my-3 p-2">
					<v-text-field
						v-model="area_laboral['codigo_area']"
						outlined
						label="Codigo"
						placeholder="AREA01"
						type="text"
						required
					/>
					<v-text-field
						v-model="area_laboral['nombre_area']"
						outlined
						label="Nombre del área laboral"
						type="text"
						required
					/>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						@click="guardarAreaLaboral"
					>
						<v-icon
							left
						>save</v-icon>
						Guardar área laboral
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>

import { db } from "../../functions/firebase";

export default {
	name:"FormularioAreaLaboral",
	 props:{
		mostrar_modal_area_laboral:{
			type:Boolean,
			default:false,
		}
	},
	data: () => (
		{
			area_laboral:{
				nombre_area:"",
				codigo_area:"",
				fecha_creacion: Date.now()
			}
		}
	),
	methods:{
		guardarAreaLaboral(){
			db.collection("area_laboral").doc().set(
				this.area_laboral
			).then(() => {
				this.$emit('ocultarModalAreaLaboral', this.area_laboral);
			}).catch(error => {
				console.log(error);
			});
		}
	}
}
</script>