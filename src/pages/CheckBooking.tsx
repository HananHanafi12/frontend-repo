import { useState } from "react";
import { z } from "zod";
import { BookingDetails } from "../types/type";
import { viewBookingSchema } from "../types/validationBooking";
import Navbar from "../components/Navbar";
import apiClient, { isAxiosError } from "../services/apiService";

export default function CheckBooking() {
  const [formData, setFormData] = useState({
    phone_number: "",
    booking_trx_id: "",
  });

  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Validating from data...");
    const validation = viewBookingSchema.safeParse(formData);

    if (!validation.success) {
      console.error("Validation error: ", validation.error.issues);
      setFormErrors(validation.error.issues);
      return;
    }

    console.log("Form data is Valid. Submitting...", formData);

    setIsLoading(true); //set loading state to true

    try {
      const response = await apiClient.post("/check-booking", {
        ...formData,
      });

      console.log("We are cheking your booking", response.data.data);
      setBookingDetails(response.data.data);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error("Error submiting form:", error.message);
        setError(error.message);
      } else {
        console.error("Unexpected error:", error);
        setError("An unecpected error occured");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const baseURL = "http://127.0.0.1:8000/storage/";

  return (
    <>
      <Navbar></Navbar>
      <div className="relative w-full h-[240px] flex items-center shrink-0 overflow-hidden -mb-[50px]" id="Banner">
        <h1 className="text-center mx-auto font-extrabold text-[40px] leading-[60px] text-white mb-5 z-20">View Your Booking Details</h1>
        <div className="absolute w-full h-full bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,#000000_91.83%)] z-10" />
        <img alt="" className="absolute w-full h-full object-cover object-top" src="/assets/images/thumbnails/thumbnail-details-5.png" />
      </div>
      <section className="relative flex flex-col w-[930px] shrink-0 gap-[30px] mx-auto mb-[100px] z-20" id="Check-Booking">
        <form onSubmit={handleSubmit} className="flex items-end rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[16px] bg-white">
          <div className="flex flex-col w-full gap-2">
            <label className="font-semibold" htmlFor="name">
              Booking TRX ID
            </label>
            <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A]">
              <img alt="icon" className="w-6 h-6" src="/assets/images/icons/receipt-text-black.svg" />
              <input
                className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                id="name"
                name="booking_trx_id"
                onChange={handleChange}
                value={formData.booking_trx_id}
                placeholder="Write your booking trx id"
                type="text"
              />
            </div>
            {formErrors.find((error) => error.path.includes("booking_trx_id")) && <p className="text-red-500">Code booking is required</p>}
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="font-semibold" htmlFor="phone">
              Phone Number
            </label>
            <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A]">
              <img alt="icon" className="w-6 h-6" src="/assets/images/icons/call-black.svg" />
              <input
                className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                id="phone"
                name="phone_number"
                onChange={handleChange}
                value={formData.phone_number}
                placeholder="Write your valid number"
                type="tel"
              />
            </div>
            {formErrors.find((error) => error.path.includes("phone_number")) && <p className="text-red">Phone Number is required</p>}
          </div>
          <button disabled={isLoading} className="flex items-center justify-center rounded-full p-[12px_30px] gap-3 bg-[#0D903A] font-bold text-[#F7F7FD]" type="submit">
            <span className="text-nowrap">{isLoading ? "Loading..." : "Check Booking"}</span>
          </button>
        </form>

        {bookingDetails && (
          <div className="grid grid-cols-2 gap-[30px]" id="Result">
            <div className="flex flex-col h-fit shrink-0 rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
              <div className="flex items-center gap-4">
                <div className="flex shrink-0 w-[140px] h-[100px] rounded-[20px] overflow-hidden">
                  <img alt="thumbnail" className="w-full h-full object-cover" src={`${baseURL}/${bookingDetails.office.thumbnail}`} />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-xl leading-[30px]">{bookingDetails.office.name} </p>
                  <div className="flex items-center gap-[6px]">
                    <img alt="icon" className="w-6 h-6" src="/assets/images/icons/location.svg" />
                    <p className="font-semibold">{bookingDetails.office.city.name}</p>
                  </div>
                </div>
              </div>
              <hr className="border-[#F6F5FD]" />
              <div className="flex flex-col gap-4">
                <h2 className="font-bold">Customer Details</h2>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Full Name</h3>
                  <div className="flex items-center rounded-full px-5 py-3 gap-[10px] bg-[#F7F7FD]">
                    <img alt="icon" className="w-6 h-6" src="/assets/images/icons/security-user-black.svg" />
                    <p className="font-semibold">{bookingDetails.name}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Phone Number</h3>
                  <div className="flex items-center rounded-full px-5 py-3 gap-[10px] bg-[#F7F7FD]">
                    <img alt="icon" className="w-6 h-6" src="/assets/images/icons/call-black.svg" />
                    <p className="font-semibold">{bookingDetails.phone_number}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Started At</h3>
                  <div className="flex items-center rounded-full px-5 py-3 gap-[10px] bg-[#F7F7FD]">
                    <img alt="icon" className="w-6 h-6" src="/assets/images/icons/calendar-black.svg" />
                    <p className="font-semibold">{bookingDetails.started_at}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Ended At</h3>
                  <div className="flex items-center rounded-full px-5 py-3 gap-[10px] bg-[#F7F7FD]">
                    <img alt="icon" className="w-6 h-6" src="/assets/images/icons/calendar-black.svg" />
                    <p className="font-semibold">{bookingDetails.ended_at}</p>
                  </div>
                </div>
              </div>
              <hr className="border-[#F6F5FD]" />
              <div className="flex items-center gap-3">
                <img alt="icon" className="w-[30px] h-[30px]" src="/assets/images/icons/shield-tick.svg" />
                <p className="font-semibold leading-[28px]">Privasi Anda aman bersama kami.</p>
              </div>
            </div>
            <div className="flex flex-col h-fit shrink-0 rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
              <h2 className="font-bold">Order Details</h2>
              <div className="flex flex-col gap-5">
                {bookingDetails.is_paid ? (
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Status Pembayaran</p>
                    <p className="rounded-full w-fit p-[6px_16px] bg-[#0D903A] font-bold text-sm leading-[21px] text-[#F7F7FD]">SUCCESS</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">Status Pembayaran</p>
                    <p className="rounded-full w-fit p-[6px_16px] bg-[#FF852D] font-bold text-sm leading-[21px] text-[#F7F7FD]">PENDING</p>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Booking TRX ID</p>
                  <p className="font-bold">{bookingDetails.booking_trx_id}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Duration</p>
                  <p className="font-bold">{bookingDetails.duration} Days Working</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Total Amount</p>
                  <p className="font-bold text-[22px] leading-[33px] text-[#0D903A]">Rp {bookingDetails.total_amount.toLocaleString("id")}</p>
                </div>
              </div>
              <hr className="border-[#F6F5FD]" />
              <h2 className="font-bold">Bonus Packages For You</h2>
              <div className="flex justify-between">
                <div className="flex items-center gap-4">
                  <img alt="icon" className="w-[34px] h-[34px]" src="/assets/images/icons/coffee.svg" />
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold">Extra Snacks</p>
                    <p className="text-sm leading-[21px]">Work-Life Balance</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <img alt="icon" className="w-[34px] h-[34px]" src="/assets/images/icons/group.svg" />
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold">Free Move</p>
                    <p className="text-sm leading-[21px]">Anytime 24/7</p>
                  </div>
                </div>
              </div>
              <hr className="border-[#F6F5FD]" />
              <a className="flex items-center justify-center w-full rounded-full border border-[#000929] p-[12px_20px] gap-3 bg-white font-semibold" href="">
                <img alt="icon" className="w-6 h-6" src="/assets/images/icons/call-black.svg" />
                <span>Call Customer Service</span>
              </a>
            </div>
          </div>
        )}
        <h4 className="text-center mx-auto font-bold text-[10px] leading-[15px] text-black mb-5 z-20">*hubungi call service jika anda lupa kode dan nomer handpone</h4>
      </section>
    </>
  );
}
