import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TouristNewJourney = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [journeyId, setJourneyId] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  // Fetch countries on mount
  useEffect(() => {
    fetch('/api/countries')
      .then(res => res.json())
      .then(setCountries)
      .catch(err => console.error('Error fetching countries:', err));
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (country) {
      fetch(`/api/states?countryId=${country}`)
        .then(res => res.json())
        .then(setStates)
        .catch(err => console.error('Error fetching states:', err));
    } else {
      setStates([]);
      setState('');
    }
  }, [country]);

  // Fetch districts when state changes
  useEffect(() => {
    if (state) {
      fetch(`/api/districts?stateId=${state}`)
        .then(res => res.json())
        .then(setDistricts)
        .catch(err => console.error('Error fetching districts:', err));
    } else {
      setDistricts([]);
      setDistrict('');
    }
  }, [state]);

  // Fetch cities when district changes
  useEffect(() => {
    if (district) {
      fetch(`/api/cities?districtId=${district}`)
        .then(res => res.json())
        .then(setCities)
        .catch(err => console.error('Error fetching cities:', err));
    } else {
      setCities([]);
      setFrom('');
      setTo('');
    }
  }, [district]);

  // Handle Generate Button
  const handleGenerateJourney = async () => {
    if (!startDate || !endDate || !from || !to) {
      alert('Please fill all journey details before generating QR.');
      return;
    }

    // Generate Journey ID
    const newJourneyId = `${from}-${to}-${Date.now()}`;
    setJourneyId(newJourneyId);

    try {
      // Generate QR Code
      const url = await QRCode.toDataURL(newJourneyId);
      setQrUrl(url);

      // Save to backend
      const journeyData = {
        journeyId: newJourneyId,
        startDate,
        endDate,
        from,
        to,
        country,
        state,
        district,
        qrUrl: url,
      };

      const res = await fetch('/api/journeys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(journeyData),
      });

      const data = await res.json();
      console.log('Journey saved:', data);
    } catch (err) {
      console.error('Error generating journey:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Plan New Journey</h2>

        {/* Dates */}
        <label className="block mb-2">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        />

        <label className="block mb-2">End Date (Estimated)</label>
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        />

        {/* Location Dropdowns */}
        <label className="block mb-2">Country</label>
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        >
          <option value="">Select Country</option>
          {countries.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <label className="block mb-2">State</label>
        <select
          value={state}
          onChange={e => setState(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        >
          <option value="">Select State</option>
          {states.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <label className="block mb-2">District</label>
        <select
          value={district}
          onChange={e => setDistrict(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        >
          <option value="">Select District</option>
          {districts.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>

        <label className="block mb-2">From City</label>
        <select
          value={from}
          onChange={e => setFrom(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        >
          <option value="">Select From City</option>
          {cities.map(c => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>

        <label className="block mb-2">To City</label>
        <select
          value={to}
          onChange={e => setTo(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        >
          <option value="">Select To City</option>
          {cities.map(c => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>

        {/* Generate Button */}
        <button
          onClick={handleGenerateJourney}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Generate QR & Save Journey
        </button>

        {/* Journey ID + QR */}
        {journeyId && (
          <div className="mt-6 text-center">
            <p className="font-medium">Tourist Travel ID:</p>
            <p className="text-sm text-gray-600 mb-2">{journeyId}</p>
            {qrUrl ? (
              <img src={qrUrl} alt="Journey QR" className="mx-auto w-32 h-32" />
            ) : (
              <span>Generating QR...</span>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TouristNewJourney;
