<template>
	<v-row justify="center">
		<v-dialog
			v-model="mostrar_modal_banco"
			transition="dialog-bottom-transition"
			max-width="500"
		>
			<v-card>
				<v-card-title class="headline grey lighten-2">
					Registro de Bancos de Herramienta
				</v-card-title>

				<v-card-text class="my-3 p-2">
					<v-text-field
						v-model="banco['codigo_banco']"
						outlined
						label="Codigo"
						placeholder="B01"
						type="text"
						required
					/>
					<v-text-field
						v-model="banco['nombre_banco']"
						outlined
						label="Nombre del Banco"
						type="text"
						required
					/>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						@click="guardarBanco"
					>
						<v-icon
							left
						>save</v-icon>
						Guardar Banco
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>

import { db } from "../../functions/firebase";

export default {
	name:"FormularioBanco",
	 props:{
		mostrar_modal_banco:{
			type:Boolean,
			default:false,
		}
	},
	data: () => (
		{
			banco:{
				nombre_banco:"",
				codigo_banco:"",
				fecha_creacion: Date.now()
			}
		}
	),
	methods:{
		guardarBanco(){
			db.collection("bancos").doc().set(
				this.banco
			).then(() => {
				this.$emit('ocultarModalBanconal', this.banco);
			}).catch(error => {
				console.log(error);
			});
		}
	}
}
</script>