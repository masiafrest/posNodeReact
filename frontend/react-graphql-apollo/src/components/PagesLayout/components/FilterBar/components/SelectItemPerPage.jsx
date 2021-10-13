
import {
    NativeSelect, Typography,
    Grid
} from "@material-ui/core";

export default function SelectItemPerPage({
    take, setTake, setPage
}) {
    return (
        <
            >
            <Typography>items por pagina</Typography>
            <NativeSelect
                value={take}
                onChange={(e) => {
                    setTake(e.target.value * 1);
                    setPage(1);
                }}
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </NativeSelect>
        </>
    )
}
