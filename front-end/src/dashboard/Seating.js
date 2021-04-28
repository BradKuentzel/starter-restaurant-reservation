import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationCard from "./ReservationCard";
import { listTables, updateTable, readReservation } from "../utils/api";

export default function Seating() {
	const [formData, setFormData] = useState("Please Select a table");
	const [tables, setTables] = useState([]);
	const [tablesError, setTablesError] = useState(null);
	const [reservation, setReservation] = useState([]);
	const [reservationError, setReservationError] = useState(null);

	const history = useHistory();
	const { reservation_id } = useParams();

	useEffect(() => {
		async function loadDashboard() {
			const abortController = new AbortController();
			setTablesError(null);
			setReservationError(null);
			try {
				const listedTables = await listTables(abortController.signal);
				setTables(listedTables);
				const reserved = await readReservation(reservation_id);
				setReservation(reserved);
			} catch (err) {
				setTablesError({ message: err.response.data.error });
				setReservationError({ message: err.response.data.error });
			}
			return () => abortController.abort();
		}
		loadDashboard();
	}, [reservation_id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (formData === "Please Select a table")
				throw new Error("Please select a valid table");
			await updateTable(formData, { data: { reservation_id } });
			history.push("/dashboard");
		} catch (error) {
			if (error.response)
				setTablesError({ message: error.response.data.error });
			if (!error.response) setTablesError(error);
		}
	};
	const handleChange = (event) => {
		setFormData(event.target.value);
	};
	const handleCancel = () => {
		setFormData("Please Select a table");
		history.goBack();
	};

	return (
		<div>
			<div className="seat-card">
				<div className="seat-card-header">
					<h1 className="form-title">Reserve a table</h1>
				</div>
				<div className="card-body">
					<form
						action=""
						onSubmit={handleSubmit}
						className="d-flex flex-column justify-content-center"
					>
						<label htmlFor="table_id">
							<select
								id="table_id"
								name="table_id"
								onChange={handleChange}
								value={formData}
							>
								<option>Please select a table</option>
								{tables.map((table) => {
									return (
										<option key={table.table_id} value={table.table_id}>
											{table.table_name} - {table.capacity}
										</option>
									);
								})}
							</select>
						</label>
					</form>
				</div>
				<button type="submit" className="btn-sm btn-outline-success">
					Submit
				</button>
				<button
					onClick={handleCancel}
					className="mb-5 mt-2 btn-sm btn-outline-danger"
				>
					Cancel
				</button>
				<ErrorAlert error={tablesError} />
				<ErrorAlert error={reservationError} />
			</div>
		</div>
	);
}
