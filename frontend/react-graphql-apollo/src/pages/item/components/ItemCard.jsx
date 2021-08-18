import ImgStepper from "./ImgStepper";
import EditDialogIcon from "./ItemDialog";
import DelBtn from "./DelBtn";
import AddBtn from "./AddBtn";

import {
	Typography,
	CardContent,
	CardActions,
	Card,
} from "@material-ui/core/";

export default function ItemCard({ data }) {
	const { id, marca, modelo, descripcion, qty, precio: { precio }, ubicacion, image_url } = data
	const categorias = data.categorias.map((cat) => cat.nombre).join(", ");
	const imgFileNameArr = image_url.split(', ')

	return (
		<Card
			style={{
				height: 450
			}}
		>
			<ImgStepper
				imgFileName={imgFileNameArr} />
			<CardContent>
				<Typography variant="h5" component="h2">
					{`${marca} ${modelo} ${descripcion}`}
				</Typography>
				<Typography>
					qty: {qty}, precio:{precio}, ubicacion:
					{ubicacion.tipo},{ubicacion.dirrecion}, categorias:{" "}
					{categorias}
				</Typography>
			</CardContent>
			<CardActions>
				<EditDialogIcon item={data} />
				<AddBtn item={data} reciboTipo="venta" />
				<DelBtn id={id} paths={image_url} />
			</CardActions>
		</Card>
	);
}