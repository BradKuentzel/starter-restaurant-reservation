import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { listTables, API_BASE_URL as url } from "../utils/api";
import axios from "axios";

export default function Seating() {
	const [tables, setTables] = useState([]);
	const [tableId, setTableId] = useState(0);

	const history = useHistory();
	const { reservation_id } = useParams();

	const loadTables = () => {
		const abortController = new AbortController();
		listTables(abortController.signal)
			.then(setTables)
			.catch((error) => console.error(error));

		return () => abortController.abort();
	};

	useEffect(loadTables, []);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (reservation_id) {
			axios
				.put(`${url}/tables/${tableId}/seat`, {
					data: { reservation_id: reservation_id },
				})
				.then((response) =>
					response.status === 200 ? history.push("/") : null
				)
				.catch((error) => console.log(error));
		}
	};

	const handleChange = (event) => {
		setTableId(event.target.value);
	};
	const handleCancel = () => {
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
								onChange={(e) => handleChange(e)}
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
						<div className="tbl-btns">
							<button
								type="submit"
								className="tbl-btn btn-sm btn-outline-success"
							>
								Submit
							</button>
							<button
								onClick={handleCancel}
								className="tbl-btn btn-sm btn-outline-danger"
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
