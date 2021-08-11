import ImgStepper from "./ImgStepper";
import EditDialogIcon from "../ItemDialog";
import DelBtn from "../DelBtn";
import AddBtn from "../AddBtn";

import {
    Typography,
    CardContent,
    CardActions,
    Card,
} from "@material-ui/core/";

export default function ItemCard({ item }) {
    const { id, marca, modelo, descripcion, qty, precio: { precio }, ubicacion, image_url } = item
    const categorias = item.categorias.map((cat) => cat.nombre).join(", ");
    const imgFileName = image_url.split(', ')

    return (
        <Card>
            <ImgStepper imgFileName={imgFileName} />
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
                <EditDialogIcon item={item} />
                <AddBtn item={item} reciboTipo="venta" />
                <DelBtn id={id} paths={imgFileName} />
            </CardActions>
        </Card>
    );
}