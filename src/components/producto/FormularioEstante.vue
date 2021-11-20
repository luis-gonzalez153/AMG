<template>
	<v-row justify="center">
		<v-dialog
			v-model="mostrar_modal_estante"
			transition="dialog-bottom-transition"
			max-width="500"
		>
			<v-card>
				<v-card-title class="headline grey lighten-2">
					Registro de Estante de Productos 
				</v-card-title>

				<v-card-text class="my-3 p-2">
					<v-text-field
						v-model="estante['codigo_estante']"
						outlined
						label="Identificador"
						placeholder="EST01"
						type="text"
						required
					/>
					<v-text-field
						v-model="estante['nombre_estante']"
						outlined
						label="Estante"
                        placeholder="ESTANTE A"
						type="text"
						required
					/>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						@click="guardarEstante"
					>
						<v-icon
							left
						>save</v-icon>
						Guardar Estante
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>

import { db } from "../../functions/firebase";

export default {
	name:"FormularioEstante",
	 props:{
		mostrar_modal_estante:{
			type:Boolean,
			default:false,
		}
	},
	data: () => (
		{
			estante:{
				nombre_estante:"",
				codigo_estante:"",
				fecha_creacion: Date.now()
			}
		}
	),
	methods:{
		guardarEstante(){
			db.collection("estantes").doc().set(
				this.estante
			).then(() => {
				this.$emit('ocultarModalEstantenal', this.estante);
			}).catch(error => {
				console.log(error);
			});
		}
	}
}
</script>