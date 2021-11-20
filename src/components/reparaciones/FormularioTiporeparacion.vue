<template>
	<v-row justify="center">
		<v-dialog
			v-model="mostrar_modal_tiporeparacion"
			transition="dialog-bottom-transition"
			max-width="500"
		>
			<v-card>
				<v-card-title class="headline grey lighten-2">
					Registro de tipo de reparacion
				</v-card-title>

				<v-card-text class="my-3 p-2">
					<v-text-field
						v-model="tiporeparacion['codigo_tiporeparacion']"
						outlined
						label="Tipo"
						placeholder="A/C, electrico..."
						type="text"
						required
					/>
					<v-text-field
						v-model="tiporeparacion['nombre_tiporeparacion']"
						outlined
						label="Describa la reparación"
						type="text"
						required
					/>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						@click="guardarTiporeparacion"
					>
						<v-icon
							left
						>save</v-icon>
						Guardar Tipo Reparación
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>

import { db } from "../../functions/firebase";

export default {
	name:"FormularioTiporeparacion",
	 props:{
		mostrar_modal_tiporeparacion:{
			type:Boolean,
			default:false,
		}
	},
	data: () => (
		{
			tiporeparacion:{
				nombre_tiporeparacion:"",
				codigo_tiporeparacion:"",
				fecha_creacion: Date.now()
			}
		}
	),
	methods:{
		guardarTiporeparacion(){
			db.collection("tiporeparaciones").doc().set(
				this.tiporeparacion
			).then(() => {
				this.$emit('ocultarModalTiporeparacional', this.tiporeparacion);
			}).catch(error => {
				console.log(error);
			});
		}
	}
}
</script>