import { Link, useLocation } from "react-router-dom";

export default function SuccesBooking() {
  const location = useLocation();
  const { office, booking } = location.state;

  const baseURL = "http://127.0.0.1:8000/storage/";

  console.log("details boooking: " + booking.booking_trx_id);

  return (
    <>
      <section className="flex flex-1 py-10">
        <div className="flex flex-col w-[450px] m-auto rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
          <div className="flex items-center gap-4">
            <img alt="icon" className="w-[50px] h-[50px] flex shrink-0" src="/assets/images/icons/verify.svg" />
            <h1 className="font-extrabold text-[28px] leading-[38px]">Booking Finished</h1>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex items-center gap-4">
            <div className="flex shrink-0 w-[140px] h-[100px] rounded-[20px] overflow-hidden">
              <img alt="thumbnail" className="w-full h-full object-cover" src={`${baseURL}/${office.thumbnail}`} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl leading-[30px]">{office.name}</p>
              <div className="flex items-center gap-[6px]">
                <img alt="icon" className="w-6 h-6" src="/assets/images/icons/location.svg" />
                <p className="font-semibold">{office.city.name}</p>
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex items-center gap-4">
            <img alt="icon" className="w-[34px] h-[34px]" src="/assets/images/icons/receipt-text.svg" />
            <div>
              <p className="font-bold">{booking.booking_trx_id}</p>
              <p className="text-sm leading-[21px] mt-[2px]">Salin kode untuk melihat status pemesanan</p>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <p className="font-semibold leading-[28px] text-center">Pesanan Anda sedang kami proses, kami akan menginformasikan status Anda melalui SMS</p>
          <Link to={"/check-booking"}>
            <div className="flex items-center justify-center w-full rounded-full p-[16px_26px] gap-3 bg-[#0D903A] font-bold text-[#F7F7FD]">
              <span>View Booking Details</span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
