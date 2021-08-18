import { useContext } from "react";
import { useQuery } from "@apollo/client";
import debounce from "lodash/debounce";
import { NativeSelect, Typography, Switch, Grid } from "@material-ui/core";

import SwitchView from "./SwitchView";
import SelectItemPerPage from "./SelectItemPerPage";

export default function FilterBar({
	context,
	recibo = false,
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

	return (
		<>
			<SearchField
				data={loading ? [] : data[queryType]?.query}
				loading={loading}
				initialTerm={filter}
				updateSearchTerm={setSearchTermDebounced}
				recibo={recibo}
				context={context}
			/>
			{!recibo && (
				<>
					<SelectItemPerPage
						take={take}
						setTake={setTake}
						setPage={setPage}
					/>
					<SwitchView
						view={view}
						setView={setView}
					/>
				</>
			)}
		</>
	)
}