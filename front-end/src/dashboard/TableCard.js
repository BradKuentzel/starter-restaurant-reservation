import React from "react";
import { finishTable } from "../utils/api";

export default function TableCard({ table }) {
	const handleFinish = async (e) => {
		e.preventDefault();
		if (
			window.confirm(
				"Is this table ready to seat new guests? This cannot be undone."
			)
		) {
			const status = await finishTable(table.table_id);

			if (status === 200) window.location.reload();
		}
	};
	return (
		<div className="card">
			<div className="card-header">
				<h5>Table: {table.table_name}</h5>
				<h6>Seats: {table.capacity}</h6>
			</div>
			<div className="card-body">
				<h3>
					{table.occupied ? (
						<div>
							<div
								data-table-id-status={table.table_id}
								style={{ color: "#800000" }}
							>
								Occupied
							</div>
						</div>
					) : (
						<div
							data-table-id-status={table.table_id}
							style={{ color: "#00FF00" }}
						>
							Free
						</div>
					)}
				</h3>
			</div>
			{table.reservation_id && (
				<button
					data-table-id-finish={table.table_id}
					onClick={handleFinish}
					type="button"
					className="btn btn-outline-danger"
				>
					Finish
				</button>
			)}
		</div>
	);
}
