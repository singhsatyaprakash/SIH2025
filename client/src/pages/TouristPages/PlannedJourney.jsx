import React, { useState } from 'react';
import QRCode from 'qrcode';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const hardcodedJourneys = [
	{
		journeyId: 'DEL-MUM-1694092800000',
		from: 'Delhi',
		to: 'Mumbai',
		startDate: '2025-09-07',
		endDate: '2025-09-10',
		qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=DEL-MUM-1694092800000',
	},
	{
		journeyId: 'BLR-GOA-1694179200000',
		from: 'Bangalore',
		to: 'Goa',
		startDate: '2025-09-12',
		endDate: '2025-09-15',
		qrUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=BLR-GOA-1694179200000',
	},
];

const defaultForm = {
	from: '',
	to: '',
	startDate: '',
	endDate: '',
};

const PlannedJourney = () => {
	const [journeys, setJourneys] = useState(hardcodedJourneys);
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState(defaultForm);
	const [editingIndex, setEditingIndex] = useState(null);
	const [qrUrl, setQrUrl] = useState('');
	const [journeyId, setJourneyId] = useState('');
	const [showPopup, setShowPopup] = useState(false);
	const [popupJourney, setPopupJourney] = useState(null);

	// Open form for new journey
	const handleNewJourney = () => {
		setForm(defaultForm);
		setEditingIndex(null);
		setQrUrl('');
		setJourneyId('');
		setShowForm(true);
	};

	// Open form for editing
	const handleEdit = (index) => {
		const j = journeys[index];
		setForm({
			from: j.from,
			to: j.to,
			startDate: j.startDate,
			endDate: j.endDate,
		});
		setEditingIndex(index);
		setQrUrl(j.qrUrl);
		setJourneyId(j.journeyId);
		setShowForm(true);
	};

	// Cancel form
	const handleCancel = () => {
		setShowForm(false);
		setForm(defaultForm);
		setEditingIndex(null);
		setQrUrl('');
		setJourneyId('');
	};

	// Form input change
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	// Add or update journey
	const handleSubmit = async (e) => {
		e.preventDefault();
		let newJourneyId = journeyId;
		let newQrUrl = qrUrl;

		if (editingIndex === null) {
			newJourneyId = `${form.from}-${form.to}-${Date.now()}`;
			newQrUrl = await QRCode.toDataURL(newJourneyId);
		}

		const newJourney = {
			...form,
			journeyId: newJourneyId,
			qrUrl: newQrUrl,
		};

		if (editingIndex !== null) {
			// Update
			const updated = [...journeys];
			updated[editingIndex] = newJourney;
			setJourneys(updated);
		} else {
			// Add
			setJourneys([newJourney, ...journeys]);
		}

		handleCancel();
	};

	// Show journey details in popup
	const handleShowDetails = (journey) => {
		setPopupJourney(journey);
		setShowPopup(true);
	};

	// Close popup
	const handleClosePopup = () => {
		setShowPopup(false);
		setPopupJourney(null);
	};

	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 mt-16 py-10">
				<div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
							<span role="img" aria-label="calendar">
								🗺️
							</span>
							Planned Journeys
						</h2>
						<button
							className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition font-semibold"
							onClick={handleNewJourney}
						>
							+ New Journey
						</button>
					</div>

					{showForm && (
						<form
							onSubmit={handleSubmit}
							className="mb-8 space-y-4 bg-blue-50 border border-blue-200 p-6 rounded-xl shadow"
						>
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block mb-1 font-semibold text-blue-700">
										From City
									</label>
									<input
										name="from"
										value={form.from}
										onChange={handleChange}
										placeholder="From City"
										className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-200"
										required
									/>
								</div>
								<div>
									<label className="block mb-1 font-semibold text-blue-700">
										To City
									</label>
									<input
										name="to"
										value={form.to}
										onChange={handleChange}
										placeholder="To City"
										className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-200"
										required
									/>
								</div>
								<div>
									<label className="block mb-1 font-semibold text-blue-700">
										Start Date
									</label>
									<input
										name="startDate"
										type="date"
										value={form.startDate}
										onChange={handleChange}
										className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-200"
										required
									/>
								</div>
								<div>
									<label className="block mb-1 font-semibold text-blue-700">
										End Date
									</label>
									<input
										name="endDate"
										type="date"
										value={form.endDate}
										onChange={handleChange}
										className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-200"
										required
									/>
								</div>
							</div>
							<div className="flex gap-3 mt-2">
								<button
									type="submit"
									className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 font-semibold"
								>
									{editingIndex !== null
										? 'Update Journey'
										: 'Add Journey'}
								</button>
								<button
									type="button"
									onClick={handleCancel}
									className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg shadow hover:bg-gray-400 font-semibold"
								>
									Cancel
								</button>
							</div>
						</form>
					)}

					{journeys.length === 0 ? (
						<p className="text-gray-500 text-center py-10">
							No journeys planned yet.
						</p>
					) : (
						<ul className="space-y-5">
							{journeys.map((j, idx) => (
								<li
									key={j.journeyId}
									className="border border-blue-100 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white hover:shadow-lg transition"
								>
									<div
										className="flex-1 cursor-pointer"
										onClick={() => handleShowDetails(j)}
									>
										<div className="font-semibold text-lg text-blue-800">
											{j.from}{' '}
											<span className="text-blue-400">→</span> {j.to}
										</div>
										<div className="text-sm text-gray-600 mt-1">
											{j.startDate} to {j.endDate}
										</div>
										<div className="text-xs text-gray-400 mt-1">
											ID: {j.journeyId}
										</div>
									</div>
									<div className="flex items-center gap-3 mt-4 sm:mt-0">
										<img
											src={j.qrUrl}
											alt="QR"
											className="w-16 h-16 rounded bg-gray-100 border"
										/>
										<button
											className="px-4 py-1 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 font-semibold"
											onClick={() => handleEdit(idx)}
										>
											Edit
										</button>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>

				{/* Popup for journey details */}
				{showPopup && popupJourney && (
					<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
						<div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
							<button
								className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
								onClick={handleClosePopup}
								aria-label="Close"
							>
								&times;
							</button>
							<h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
								<span role="img" aria-label="details">🧳</span>
								Journey Details
							</h3>
							<div className="mb-4">
								<div className="font-semibold text-lg text-blue-800">
									{popupJourney.from} <span className="text-blue-400">→</span> {popupJourney.to}
								</div>
								<div className="text-sm text-gray-600 mt-1">
									{popupJourney.startDate} to {popupJourney.endDate}
								</div>
								<div className="text-xs text-gray-400 mt-1">
									ID: {popupJourney.journeyId}
								</div>
							</div>
							<div className="flex justify-center">
								<img
									src={popupJourney.qrUrl}
									alt="QR"
									className="w-32 h-32 rounded bg-gray-100 border"
								/>
							</div>
						</div>
					</div>
				)}
			</div>
			<Footer />
		</>
	);
};

export default PlannedJourney;
