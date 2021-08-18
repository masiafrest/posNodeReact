import { useContext } from "react";
import { useQuery } from "@apollo/client";
import debounce from "lodash/debounce";
import { NativeSelect, Typography, Switch, Grid } from "@material-ui/core";

import CardViewIcon from "@material-ui/icons/ViewModule";
import PaperViewIcon from "@material-ui/icons/Dehaze";

export default function FilterBar({
    context, recibo = false,
    SearchField,
    getQuery,
    queryType
}) {
    const Context = useContext(context);
    let page, setPage, take, setTake, view, setView;

    if (!recibo) {
        ({
            pageState: [page, setPage],
            takeState: [take, setTake],
            viewState: [view, setView],
        } = Context);
    }

    const {
        filterState: [filter, setFilter],
    } = Context;

    //query to get suggestions
    const { data, loading } = useQuery(getQuery, {
        variables: {
            filter,
            skip: 0,
            take,
        },
    });

    const setSearchTermDebounced = debounce(setFilter, 500);
    console.log('queryType: ', queryType)
    console.log('filterbar: ',
        loading ? 'loading' :
            data[queryType]?.query)
    return (
        <>
            <SearchField
                data={loading ? [] : data[queryType]?.query} // search suggestions returned
                loading={loading}
                initialTerm={filter}
                updateSearchTerm={setSearchTermDebounced}
                recibo={recibo}
            />
            {!recibo && (
                <>
                    <div style={{ display: "flex", alignItems: "center" }}>
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
                    </div>
                    <Grid component="label" container alignItems="center" spacing={1}>
                        <Grid item>
                            <PaperViewIcon />
                        </Grid>
                        <Grid item>
                            <Switch
                                checked={view}
                                onChange={() => setView(!view)}
                                name="viewSwitch"
                            />
                        </Grid>
                        <Grid item>
                            <CardViewIcon />
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}