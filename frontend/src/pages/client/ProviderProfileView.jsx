import { useState, useEffect } from 'react';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { providers as providersApi, events as eventsApi, bookings as bookingsApi, getUploadUrl } from '../../services/api';
import Btn from '../../components/Btn';
import locaImage from '../../assets/Location.svg'; 

import callImage from '../../assets/Call.svg';
import mailImage from '../../assets/mail.svg';

function BookingRequestForm({ service, myEvents, onClose, onSuccess }) {
  const [eventId, setEventId] = useState(myEvents[0]?.id || '');
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await bookingsApi.request({
        eventId: Number(eventId),
        serviceId: service.id,
        bookingDate,
        startTime: `${bookingDate}T${startTime}:00`,
        endTime: `${bookingDate}T${endTime}:00`,
      });
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Book "{service.serviceName}"</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select value={eventId} onChange={(e) => setEventId(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3">
            <option value="" disabled>Select an event</option>
            {myEvents.map((ev) => <option key={ev.id} value={ev.id}>{ev.title}</option>)}
          </select>
          <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3" />
          <div className="flex gap-3">
            <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3" />
            <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3" />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500">Cancel</button>
            <Btn type="submit" text={submitting ? 'Sending...' : 'Send request'} variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
}

function ProviderProfileView() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingTarget, setBookingTarget] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [providerData, eventData] = await Promise.all([
          providersApi.getProfile(providerId),
          eventsApi.mine(),
        ]);
        setProfile(providerData);
        setMyEvents(eventData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [providerId]);

  if (loading) return <p className="text-gray-500">Loading provider profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  const aboutItems = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3f27764a0078c39e8b4866e1ee85e82531e5939bcd850cb4c300c0ac42a24e90?placeholderIfAbsent=true&apiKey=d954277d988d40f19b8e9ee5ab2df23c", text: 'No degree listed' },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/eebdd24526899bd2afe0128aedb1ac41b6bf876bd28bd41bbadaf1110602f7f5?placeholderIfAbsent=true&apiKey=d954277d988d40f19b8e9ee5ab2df23c", text:  'No degree listed' },
    { icon:   locaImage , text: profile.user.wilaya },
    { icon:   mailImage , text: profile.user.email },
    { icon:   callImage , text: profile.user.phone },
  ];

  return (
    <div>
      <button onClick={() => navigate(-1)} className="text-xl text-customPurple hover:underline mb-4">
        ← Back to providers
      </button>

      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
          {successMsg}
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-8 mb-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-semibold">
            {profile.user.firstName[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold">{profile.user.firstName} {profile.user.lastName}</h2>
              {!profile.isAvailable && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-600">
                  Currently unavailable
                </span>
              )}
            </div>
            <p className="text-gray-500">{profile.serviceCategory} · {profile.user.wilaya}</p>
          </div>
        </div>
        {profile.about && <p className="text-gray-600 mt-4">{profile.about}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About */}
        <div className="bg-white rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-6 md:col-span-1">
          <h3 className="font-semibold text-lg mb-4">About</h3>
          {aboutItems.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex gap-2 mt-7  text-center whitespace-nowrap max-md:mt-10">
              <img
                loading="lazy"
                src={item.icon}
                alt=""
                className="object-contain shrink-0 w-6 aspect-square"
              />
              <div className="self-center">{item.text}</div>
            </div>
            {index < aboutItems.length - 1 && (
              <div className="shrink-0 self-stretch mt-4 w-full h-0 border border-solid opacity-10 bg-slate-950 border-slate-950" />
            )}
          </React.Fragment>
        ))}
        </div>

        {/* Services + Portfolio */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-6">
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            {profile.services.length === 0 ? (
              <p className="text-gray-500 text-sm">No services listed yet.</p>
            ) : (
              <div className="space-y-3">
                {profile.services.map((service) => (
                  <div key={service.id} className="flex justify-between items-center border-t pt-3 first:border-t-0 first:pt-0">
                    <div>
                      <p className="font-medium">{service.serviceName}</p>
                      <p className="text-sm text-gray-500">{service.description}</p>
                    </div>
                    <Btn
                      text="Request booking"
                      variant="outline"
                      className="text-xs px-4 py-1 shrink-0"
                      disabled={!profile.isAvailable}
                      onClick={() => setBookingTarget(service)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] p-6">
            <h3 className="font-semibold text-lg mb-4">Portfolio</h3>
            {profile.portfolios.length === 0 ? (
              <p className="text-gray-500 text-sm">No portfolio items yet.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {profile.portfolios.map((p) => (
                  <div key={p.id} className="rounded-lg overflow-hidden border">
                    {p.images[0] ? (
                      <img src={getUploadUrl(p.images[0].imagePath)} alt={p.title} className="w-full h-32 object-cover" />
                    ) : (
                      <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">No image</div>
                    )}
                    <div className="p-2">
                      <p className="text-sm font-medium">{p.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {bookingTarget && (
        <BookingRequestForm
          service={bookingTarget}
          myEvents={myEvents}
          onClose={() => setBookingTarget(null)}
          onSuccess={() => {
            setBookingTarget(null);
            setSuccessMsg('Booking request sent! Check "My Bookings" for status.');
          }}
        />
      )}
    </div>
  );
}

export default ProviderProfileView;
