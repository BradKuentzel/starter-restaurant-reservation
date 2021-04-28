import React from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL as url } from "../utils/api";

export default function ReservationCard({ reservation }) {
	const history = useHistory();

	const {
		reservation_id,
		first_name,
		last_name,
		people,
		reservation_time,
		mobile_number,
		status,
	} = reservation;

	const cancelReservation = () => {
		window.confirm(
			"Do you want to cancel this reservation? This cannot be undone."
		) &&
			axios
				.put(`${url}/reservations/${reservation_id}/status`, {
					data: { status: "cancelled" },
				})
				.then((res) => {
					res.status === 200 && history.push("/");
				});
	};
	return (
		<div className="card">
			<div className="card-header">
				<h4>{reservation_time.slice(0, 5)}</h4>
				<h6 data-reservation-id-status={reservation.reservation_id}>
					Status: {status.toUpperCase()}
				</h6>
			</div>
			<div className="card-body">
				<h6 className="card-title">
					{last_name}, {first_name}
				</h6>
				<p className="card-text">{mobile_number}</p>
				<h5>People: {people}</h5>
			</div>

			{status === "booked" ? (
				<>
					<Link
						to={`/reservations/${reservation.reservation_id}/seat`}
						className="btn btn-outline-success"
					>
						Seat
					</Link>
					<Link
						to={`/reservations/${reservation.reservation_id}/edit`}
						className="btn btn-outline-warning"
					>
						Edit
					</Link>
					<button
						data-reservation-id-cancel={reservation_id}
						className="btn btn-outline-danger"
						onClick={cancelReservation}
					>
						Cancel
					</button>
				</>
			) : null}
		</div>
	);
}
