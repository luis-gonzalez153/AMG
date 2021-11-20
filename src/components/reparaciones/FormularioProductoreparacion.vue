<template>
	<v-row justify="center">
		<v-dialog
			v-model="mostrar_modal_productoreparacion"
			transition="dialog-bottom-transition"
			max-width="500"
		>
			<v-card>
				<v-card-title class="headline grey lighten-2">
					Registro de productos o repuestos
				</v-card-title>

				<v-card-text class="my-3 p-2">
					<v-text-field
						v-model="productoreparacion['codigo_productoreparacion']"
						outlined
						label="Nombre"
						placeholder="Filtro"
						type="text"
						required
					/>
					<v-text-field
						v-model="productoreparacion['nombre_productoreparacion']"
						outlined
						label="Cantidad"
						type="text"
						required
					/>
				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						@click="guardarProductoreparacion"
					>
						<v-icon
							left
						>save</v-icon>
						Guardar Producto
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-row>
</template>

<script>

import { db } from "../../functions/firebase";

export default {
	name:"FormularioProductoreparacion",
	 props:{
		mostrar_modal_productoreparacion:{
			type:Boolean,
			default:false,
		}
	},
	data: () => (
		{
			productoreparacion:{
				nombre_productoreparacion:"",
				codigo_productoreparacion:"",
				fecha_creacion: Date.now()
			}
		}
	),
	methods:{
		guardarProductoreparacion(){
			db.collection("productoreparaciones").doc().set(
				this.productoreparacion
			).then(() => {
				this.$emit('ocultarModalProductoreparacional', this.productoreparacion);
			}).catch(error => {
				console.log(error);
			});
		}
	}
}
</script>