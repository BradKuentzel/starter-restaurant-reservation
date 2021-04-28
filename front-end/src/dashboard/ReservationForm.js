import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { API_BASE_URL as url, readReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

export default function ReservationForm({ setDate }) {
	const history = useHistory();
	const { reservation_id } = useParams();
	const [reservation, setReservation] = useState({
		first_name: "",
		last_name: "",
		mobile_number: "",
		reservation_date: "",
		reservation_time: "",
		people: "",
	});
	const [resError, setResError] = useState(null);

	useEffect(() => {
		const abortController = new AbortController();
		reservation_id && readReservation(reservation_id).then(setReservation);
		return () => abortController.abort();
		// eslint-disable-next-line
	}, []);

	const { first_name, last_name, mobile_number } = reservation;

	let { reservation_time, reservation_date, people } = reservation;

	reservation.reservation_date = reservation.reservation_date.slice(0, 10);

	// Add Reservation
	const addReservation = (reservation) => {
		axios
			.post(`${url}/reservations`, { data: reservation })
			.then((res) => {
				res.status === 201 &&
					history.push(`/dashboard?date=${reservation.reservation_date}`);
			})
			.catch((err) => {
				setResError({ message: err.response.data.error });
			});
	};

	// Update Reservation
	const updateReservation = async (reservation) => {
		axios
			.put(`${url}/reservations/${reservation.reservation_id}`, {
				data: reservation,
			})
			.then((res) => {
				res.status === 200 &&
					history.push(`/dashboard?date=${reservation.reservation_date}`);
			})
			.catch((err) => {
				setResError({ message: err.response.data.error });
			});
	};

	const handleChange = (e) =>
		setReservation({ ...reservation, [e.target.name]: e.target.value });

	const handleSubmit = (e) => {
		e.preventDefault();
		setResError(null);
		reservation.people = Number(reservation.people);

		if (!reservation_id) {
			addReservation(reservation);
		} else {
			updateReservation(reservation);
		}
		setDate(reservation.reservation_date);
	};

	return (
		<div>
			<form className="col-lg-10" onSubmit={handleSubmit}>
				<h1 className="form-title text-center py-4">
					{reservation.reservation_id ? "Edit" : "New"} Reservation
				</h1>
				<div className="mb-3">
					<label htmlFor="first_name" className="form-label">
						First Name
					</label>
					<input
						name="first_name"
						type="text"
						className="form-control"
						id="first_name"
						onChange={handleChange}
						value={first_name}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="last_name" className="form-label">
						Last Name
					</label>
					<input
						name="last_name"
						type="text"
						className="form-control"
						id="last_name"
						onChange={handleChange}
						value={last_name}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="mobile_number" className="form-label">
						Mobile Number
					</label>
					<input
						name="mobile_number"
						type="text"
						className="form-control"
						id="mobile_number"
						onChange={handleChange}
						value={mobile_number}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="reservation_date" className="form-label">
						Reservation Date
					</label>
					<input
						name="reservation_date"
						type="date"
						className="form-control"
						id="reservation_date"
						onChange={handleChange}
						value={reservation_date}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="reservation_time" className="form-label">
						Reservation Time
					</label>
					<input
						name="reservation_time"
						type="time"
						className="form-control"
						id="reservation_time"
						onChange={handleChange}
						value={reservation_time}
					/>
					<div className="mb-3">
						<label htmlFor="people" className="form-label">
							Party Size
						</label>
						<input
							name="people"
							type="text"
							className="form-control"
							id="people"
							onChange={handleChange}
							value={people}
						/>
					</div>
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
			<ErrorAlert error={resError} />
		</div>
	);
}
