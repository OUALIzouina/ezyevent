import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = {
  client: [
    { to: '/client-dashboard', label: 'Overview', end: true },
    { to: '/client-dashboard/events', label: 'My Events' },
    { to: '/client-dashboard/providers', label: 'Find Providers' },
    { to: '/client-dashboard/bookings', label: 'My Bookings' },
  ],
  provider: [
    { to: '/provider-dashboard', label: 'Requests', end: true },
    { to: '/provider-dashboard/services', label: 'My Services' },
    { to: '/provider-dashboard/portfolio', label: 'Portfolio' },
    { to: '/provider-dashboard/account', label: 'Account' },
  ],
  admin: [
    { to: '/admin-dashboard', label: 'Overview', end: true },
    { to: '/admin-dashboard/users', label: 'Users' },
    { to: '/admin-dashboard/events', label: 'Events' },
    { to: '/admin-dashboard/bookings', label: 'Bookings' },
  ],
};

function SideBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const items = NAV_ITEMS[user?.role] || [];

  async function handleLogout() {
    await logout();
    navigate('/');
  }

  return (
    <aside className="w-[15%] fixed inset-y-0 ml-0.5  my-2 rounded-[10px] bg-[#10103A] text-white flex flex-col ">
        <div className="px-3 py-2">
      <svg width="117" height="67" viewBox="0 0 117 67" fill="none" xmlns="http://www.w3.org/2000/svg">

<path d="M12.54 30.9V41.4H26.64V48.06H12.54V59.16H28.44V66H4.14V24.06H28.44V30.9H12.54Z" fill="white"/>

<path d="M36.713 36.665H43.876V40H32.102V36.723L39.12 27.269H32.131V23.934H43.789V27.211L36.713 36.665ZM62.3896 23.934L52.4426 47.598H48.1216L51.6016 39.594L45.1636 23.934H49.7166L53.8636 35.157L58.0686 23.934H62.3896Z" fill="#00D1FF"/>

<path d="M40.75 62.13L44.95 49.38H49.42L43.27 66H38.17L32.05 49.38H36.55L40.75 62.13ZM67.229 57.33C67.229 57.93 67.189 58.47 67.109 58.95H54.959C55.059 60.15 55.479 61.09 56.219 61.77C56.959 62.45 57.869 62.79 58.949 62.79C60.509 62.79 61.619 62.12 62.279 60.78H66.809C66.329 62.38 65.409 63.7 64.049 64.74C62.689 65.76 61.019 66.27 59.039 66.27C57.439 66.27 55.999 65.92 54.719 65.22C53.459 64.5 52.469 63.49 51.749 62.19C51.049 60.89 50.699 59.39 50.699 57.69C50.699 55.97 51.049 54.46 51.749 53.16C52.449 51.86 53.429 50.86 54.689 50.16C55.949 49.46 57.399 49.11 59.039 49.11C60.619 49.11 62.029 49.45 63.269 50.13C64.529 50.81 65.499 51.78 66.179 53.04C66.879 54.28 67.229 55.71 67.229 57.33ZM62.879 56.13C62.859 55.05 62.469 54.19 61.709 53.55C60.949 52.89 60.019 52.56 58.919 52.56C57.879 52.56 56.999 52.88 56.279 53.52C55.579 54.14 55.149 55.01 54.989 56.13H62.879ZM79.5046 49.14C81.4846 49.14 83.0846 49.77 84.3046 51.03C85.5246 52.27 86.1346 54.01 86.1346 56.25V66H81.9346V56.82C81.9346 55.5 81.6046 54.49 80.9446 53.79C80.2846 53.07 79.3846 52.71 78.2446 52.71C77.0846 52.71 76.1646 53.07 75.4846 53.79C74.8246 54.49 74.4946 55.5 74.4946 56.82V66H70.2946V49.38H74.4946V51.45C75.0546 50.73 75.7646 50.17 76.6246 49.77C77.5046 49.35 78.4646 49.14 79.5046 49.14ZM95.0186 52.83V60.87C95.0186 61.43 95.1486 61.84 95.4086 62.1C95.6886 62.34 96.1486 62.46 96.7886 62.46H98.7386V66H96.0986C92.5586 66 90.7886 64.28 90.7886 60.84V52.83H88.8086V49.38H90.7886V45.27H95.0186V49.38H98.7386V52.83H95.0186ZM108.119 66.27C106.759 66.27 105.539 66.03 104.459 65.55C103.379 65.05 102.519 64.38 101.879 63.54C101.259 62.7 100.919 61.77 100.859 60.75H105.089C105.169 61.39 105.479 61.92 106.019 62.34C106.579 62.76 107.269 62.97 108.089 62.97C108.889 62.97 109.509 62.81 109.949 62.49C110.409 62.17 110.639 61.76 110.639 61.26C110.639 60.72 110.359 60.32 109.799 60.06C109.259 59.78 108.389 59.48 107.189 59.16C105.949 58.86 104.929 58.55 104.129 58.23C103.349 57.91 102.669 57.42 102.089 56.76C101.529 56.1 101.249 55.21 101.249 54.09C101.249 53.17 101.509 52.33 102.029 51.57C102.569 50.81 103.329 50.21 104.309 49.77C105.309 49.33 106.479 49.11 107.819 49.11C109.799 49.11 111.379 49.61 112.559 50.61C113.739 51.59 114.389 52.92 114.509 54.6H110.489C110.429 53.94 110.149 53.42 109.649 53.04C109.169 52.64 108.519 52.44 107.699 52.44C106.939 52.44 106.349 52.58 105.929 52.86C105.529 53.14 105.329 53.53 105.329 54.03C105.329 54.59 105.609 55.02 106.169 55.32C106.729 55.6 107.599 55.89 108.779 56.19C109.979 56.49 110.969 56.8 111.749 57.12C112.529 57.44 113.199 57.94 113.759 58.62C114.339 59.28 114.639 60.16 114.659 61.26C114.659 62.22 114.389 63.08 113.849 63.84C113.329 64.6 112.569 65.2 111.569 65.64C110.589 66.06 109.439 66.27 108.119 66.27Z" fill="white"/>

</svg> 
      </div>

      <nav className="flex-1 mt-32 space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              ` flex items-center px-6 py-4 font-medium text-lg transition duration-200 ${
                isActive ? 'bg-secondary text-white' : 'text-[#A0A0A0] hover:bg-white/10 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="text-left px-4 py-7  text-secondary hover:underline font-medium text-lg hover:bg-white/10 rounded-lg"
      >
        Log out
      </button>
    </aside>
  );
}

export default SideBar;
