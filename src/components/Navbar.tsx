import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white">
      <div className="flex items-center justify-between w-full max-w-[1130px] py-[22px] mx-auto">
        <Link to={`/`}>
          <img alt="logo" src="/assets/images/logos/logokmo.svg" />
        </Link>
        <ul className="flex items-center gap-[50px] w-fit">
          <li>
            <Link to={`/`}>Browse</Link>
          </li>
          <li>
            <a href="">Popular</a>
          </li>
          <li>
            <a href="">Categories</a>
          </li>
          <li>
            <a href="">Events</a>
          </li>
          <li>
            <Link to={`/check-booking`}>My Booking</Link>
          </li>
        </ul>
        <a className="flex items-center gap-[10px] rounded-full border border-[#000929] py-3 px-5" href="#">
          <img alt="icon" className="w-6 h-6" src="/assets/images/icons/call.svg" />
          <span className="font-semibold">Contact Us</span>
        </a>
      </div>
    </nav>
  );
}
