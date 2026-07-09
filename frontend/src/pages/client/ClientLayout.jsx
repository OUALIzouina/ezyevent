import { Outlet } from 'react-router-dom';
import SideBar from '../../components/SideBar';

function ClientLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <main className="flex-1 px-8 py-6 ml-[15%] overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default ClientLayout;
