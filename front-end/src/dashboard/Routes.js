import React, { useState } from "react";
import useQuery from "../utils/useQuery";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Search from "./Search";
import NotFound from "../layout/NotFound";
import NewTable from "./NewTable";
import ReservationForm from "./ReservationForm";
import Seating from "./Seating";
import { today } from "../utils/date-time";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
	const query = useQuery();
	const [date, setDate] = useState(query.get("date") || today());
	return (
		<Switch>
			<Route exact={true} path="/">
				<Redirect to={"/dashboard"} />
			</Route>
			<Route exact={true} path="/reservations">
				<Redirect to={"/dashboard"} />
			</Route>
			<Route path="/dashboard">
				<Dashboard date={date} setDate={setDate} />
			</Route>
			<Route path="/search">
				<Search />
			</Route>
			<Route
				exact={true}
				path={["/reservations/new", "/reservations/:reservation_id/edit"]}
			>
				<ReservationForm setDate={setDate} />
			</Route>
			<Route path="/tables/new">
				<NewTable />
			</Route>
			<Route path="/reservations/:reservation_id/seat">
				<Seating />
			</Route>
			<Route>
				<NotFound />
			</Route>
		</Switch>
	);
}

export default Routes;
