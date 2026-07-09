// import { useState, useEffect } from 'react';
// import { providers as providersApi, events as eventsApi, bookings as bookingsApi } from '../../services/api';
// import Btn from '../../components/Btn';

// function BookingRequestForm({ service, myEvents, onClose, onSuccess }) {
//   const [eventId, setEventId] = useState(myEvents[0]?.id || '');
//   const [bookingDate, setBookingDate] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [error, setError] = useState('');
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSubmitting(true);
//     try {
//       await bookingsApi.request({
//         eventId: Number(eventId),
//         serviceId: service.id,
//         bookingDate,
//         startTime: `${bookingDate}T${startTime}:00`,
//         endTime: `${bookingDate}T${endTime}:00`,
//       });
//       onSuccess();
//     } catch (err) {
//       // Surfaces the overlap-conflict message from the backend directly —
//       // e.g. "This provider is already booked during that time slot"
//       setError(err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl p-8 w-full max-w-md">
//         <h3 className="text-xl font-semibold mb-4">Book "{service.serviceName}"</h3>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <select
//             value={eventId}
//             onChange={(e) => setEventId(e.target.value)}
//             required
//             className="w-full border border-gray-300 rounded-lg p-3"
//           >
//             <option value="" disabled>Select an event</option>
//             {myEvents.map((ev) => (
//               <option key={ev.id} value={ev.id}>{ev.title}</option>
//             ))}
//           </select>
//           <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3" />
//           <div className="flex gap-3">
//             <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3" />
//             <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required className="w-full border border-gray-300 rounded-lg p-3" />
//           </div>
//           {error && <div className="text-red-500 text-sm">{error}</div>}
//           <div className="flex gap-3 justify-end">
//             <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500">Cancel</button>
//             <Btn type="submit" text={submitting ? 'Sending...' : 'Send request'} variant="primary" />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function BrowseProviders() {
//   const [providerList, setProviderList] = useState([]);
//   const [myEvents, setMyEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [bookingTarget, setBookingTarget] = useState(null); // { service, providerName }
//   const [successMsg, setSuccessMsg] = useState('');

//   useEffect(() => {
//     async function load() {
//       try {
//         const [providerData, eventData] = await Promise.all([
//           providersApi.list(),
//           eventsApi.mine(),
//         ]);
//         setProviderList(providerData);
//         setMyEvents(eventData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     load();
//   }, []);

//   if (loading) return <p className="text-gray-500">Loading providers...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   if (myEvents.length === 0) {
//     return (
//       <div className="bg-white rounded-xl shadow-lg p-12 text-center">
//         <h3 className="text-xl font-semibold text-gray-600 mb-2">Create an event first</h3>
//         <p className="text-gray-500">You need an event before you can book a provider for it.</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="text-4xl font-semibold text-gray-900 mb-8">Find Providers</h2>

//       {successMsg && (
//         <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6">
//           {successMsg}
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {providerList.map((provider) => (
//           <div key={provider.providerId} className="bg-white rounded-xl shadow-lg p-6">
//             <div className="flex items-center gap-4 mb-4">
//               <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">
//                 {provider.user.firstName[0]}
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold">
//                   {provider.user.firstName} {provider.user.lastName}
//                 </h3>
//                 <p className="text-sm text-gray-500">{provider.serviceCategory}</p>
//               </div>
//             </div>
//             <p className="text-sm text-gray-600 mb-4">{provider.about}</p>

//             <div className="space-y-2">
//               {provider.services.map((service) => (
//                 <div key={service.id} className="flex justify-between items-center border-t pt-2">
//                   <span className="text-sm">{service.serviceName}</span>
//                   <Btn
//                     text="Request booking"
//                     variant="outline"
//                     className="text-xs px-4 py-1"
//                     onClick={() => setBookingTarget(service)}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {bookingTarget && (
//         <BookingRequestForm
//           service={bookingTarget}
//           myEvents={myEvents}
//           onClose={() => setBookingTarget(null)}
//           onSuccess={() => {
//             setBookingTarget(null);
//             setSuccessMsg('Booking request sent! Check "My Bookings" for status.');
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default BrowseProviders;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { providers as providersApi, events as eventsApi } from '../../services/api';

function BrowseProviders() {
  const [providerList, setProviderList] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [providerData, eventData] = await Promise.all([
          providersApi.list(),
          eventsApi.mine(),
        ]);
        setProviderList(providerData);
        setMyEvents(eventData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="text-gray-500">Loading providers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (myEvents.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Create an event first</h3>
        <p className="text-gray-500">You need an event before you can book a provider for it.</p>
      </div>
    );
  }

  const filtered = providerList.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.user.firstName.toLowerCase().includes(term) ||
      p.user.lastName.toLowerCase().includes(term) ||
      p.serviceCategory?.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <h2 className="text-3xl font-semibold font-poppins text-gray-900 mb-8">Find Providers</h2>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by name or category "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm py-3 pl-4 pr-4 border border-gray-300 rounded-3xl shadow-sm focus:ring-customPurple focus:border-customPurple"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center text-gray-500">
          No providers match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((provider) => (
            <Link
              key={provider.providerId}
              to={`/client-dashboard/providers/${provider.providerId}`}
              className="bg-white rounded-xl  items-center shadow-lg p-6 hover:shadow-xl transition block"
            >
              <div className=" items-center borde gap-4 mb-3">
                <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">
                  {provider.user.firstName[0]}
                </div>
                <div className="flex-1 items-center">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{provider.user.firstName} {provider.user.lastName}</h3>
                    {!provider.isAvailable && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-gray-200 text-gray-600">Unavailable</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{provider.serviceCategory} · {provider.user.wilaya}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{provider.about}</p>
              <p className="text-xs text-customPurple mt-3">{provider.services.length} service(s) · {provider.portfolios.length} portfolio item(s) →</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseProviders;

