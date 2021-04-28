import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

export default function NewTable() {
	const initialFormState = {
		table_name: "",
		capacity: "",
	};
	const [tablesError, setTablesError] = useState(null);
	const [formData, setFormData] = useState({ ...initialFormState });
	const history = useHistory();

	const handleChange = ({ target }) => {
		const value =
			target.type === "number" ? Number(target.value) : target.value;
		setFormData({
			...formData,
			[target.name]: value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await createTable({ data: formData });
			setFormData({ ...initialFormState });
			history.push(`/dashboard`);
		} catch (err) {
			setTablesError({ message: err.response.data.error });
		}
	};

	return (
		<div>
			<h1 className="form-title">New Table</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="table_name" className="form-label">
						Table Name
					</label>
					<input
						type="text"
						className="form-control"
						id="table_name"
						name="table_name"
						value={formData.table_name}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="capacity" className="form-label">
						Capacity
					</label>
					<input
						type="number"
						className="form-control"
						id="capacity"
						name="capacity"
						value={formData.capacity}
						onChange={handleChange}
					/>
				</div>
				<button type="submit" className="new-btn btn-outline-success">
					Submit
				</button>
				<button
					onClick={() => history.goBack()}
					type="button"
					className="new-btn btn-outline-danger"
				>
					Cancel
				</button>
			</form>
			<ErrorAlert error={tablesError} />
		</div>
	);
}
