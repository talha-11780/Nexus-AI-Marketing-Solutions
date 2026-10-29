import { Outlet } from 'react-router-dom';
import SiteNavbar from './SiteNavbar.jsx';

export default function SiteLayout() {
  return (
    <>
      <SiteNavbar />
      <Outlet />
    </>
  );
}
