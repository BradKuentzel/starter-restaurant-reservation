import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, next, previous, formatAsDate } from "../utils/date-time";
import ReservationCard from "./ReservationCard";
import TableCard from "./TableCard";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
	const [reservations, setReservations] = useState([]);
	const [tables, setTables] = useState([]);
	const [reservationsError, setReservationsError] = useState(null);
	const [tablesError, setTablesError] = useState(null);

	useEffect(loadDashboard, [date]);

	function loadDashboard() {
		const abortController = new AbortController();
		setReservationsError(null);
		listReservations({ date }, abortController.signal)
			.then(setReservations)
			.catch(setReservationsError);
		listTables(abortController.signal).then(setTables).catch(setTablesError);
		return () => abortController.abort();
	}

	return (
		<main>
			<div className="dashboard">
				<h1 className="date">Reservations for {formatAsDate(date)}</h1>
			</div>
			<div className="row">
				<div className="reservation-list col-6">
					<h3 className="list-title">Reservations</h3>
					{reservations.map((reservation) => (
						<ReservationCard
							key={reservation.reservation_id}
							reservation={reservation}
						/>
					))}
				</div>

				<div className="tables-list col-6">
					<h3 className="list-title">Tables</h3>
					{tables.map((table) => (
						<TableCard key={table.table_id} table={table} />
					))}
				</div>
			</div>

			<div className="date-selector-btns">
				<button
					onClick={() => setDate(previous(date))}
					type="button"
					className="date-btn btn-dark"
				>
					Prev
				</button>
				<button
					onClick={() => setDate(today())}
					type="button"
					className="date-btn btn-primary"
				>
					Today
				</button>
				<button
					onClick={() => setDate(next(date))}
					type="button"
					className="date-btn btn-dark"
				>
					Next
				</button>
			</div>

			<ErrorAlert error={reservationsError} />
			<ErrorAlert error={tablesError} />
		</main>
	);
}

export default Dashboard;
