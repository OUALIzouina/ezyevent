import { useState, useEffect } from 'react';
import React from 'react';
import { providers as providersApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import locaImage from '../../assets/Location.svg'; 

import callImage from '../../assets/Call.svg';
import mailImage from '../../assets/mail.svg';

function ProviderAccount() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await providersApi.getProfile(user.id);
        setProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user.id]);

  if (loading) return <p className="text-gray-500">Loading...</p>;
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
      <h2 className="text-4xl font-semibold text-gray-900 pt-4 pb-6  mb-8">Account</h2>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-black">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl font-semibold">
            {profile.user.firstName[0]}
          </div>
          <div>
            <h3 className="text-2xl font-semibold">
              {profile.user.firstName} {profile.user.lastName}
            </h3>
            <p className="text-gray-500">{profile.serviceCategory}</p>
            {/* No rating system exists in the backend yet — omitted rather than
                faked. Add once a Review model + endpoint exist. */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className=" mb-2 text-sm bg-white rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-gray-600 p-6">
          <h4 className="text-xl font-semibold leading-3 text-black mb-4">About</h4>
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

        <div className="bg-white  rounded-xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] mb-2 p-6">
          <h4 className="font-semibold text-lg mb-4">Certifications</h4>
          <p className="text-sm text-gray-600">{profile.certification || 'None listed yet'}</p>
        </div>
      </div>
    </div>
  );
}

export default ProviderAccount;
