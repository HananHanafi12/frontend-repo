import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Office } from "../types/type";

import { z } from "zod";
import { bookingSchema } from "../types/validationBooking";
import apiClient, { isAxiosError } from "../services/apiService";

export default function BookOffice() {
  const { slug } = useParams<{ slug: string }>();
  const [office, setOffice] = useState<Office | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    started_at: "",
    office_space_id: "",
    totalAmountWithUniqueCode: 0,
  });

  const [formErrors, setFormErrors] = useState<z.ZodIssue[]>([]);
  const [isLoading, setIsLoading] = useState(false); //add loading state

  const [uniqueCode, setUniqueCode] = useState<number>(0);
  const [totalAmountWithUniqueCode, setTotalAmountWithUniqueCode] = useState<number>(0);

  useEffect(() => {
    console.log("Fetching office data...");
    apiClient
      .get(`/office/${slug}`)
      .then((response) => {
        console.log("Office data fetched successfully", response.data.data);

        setOffice(response.data.data);

        const officeSpaceId = response.data.data.id;
        const generateUniqueCode = Math.floor(100 + Math.random() * 900); // random 3 digit-code
        const grandTotal = response.data.data.price - generateUniqueCode;

        setUniqueCode(generateUniqueCode);
        setTotalAmountWithUniqueCode(grandTotal);

        setFormData((prevData) => ({
          ...prevData,
          office_space_id: officeSpaceId,
          total_amount: grandTotal,
        }));

        setLoading(false);
      })
      .catch((error: unknown) => {
        if (isAxiosError(error)) {
          console.error("Error fetching office data:", error.message);
          setError(error.message);
        } else {
          console.error("An unknown error occurred while fetching office data:", error);
          setError("An unknown error occurred while fetching office data");
        }
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error Loading: {error}</p>;
  }

  if (!office) {
    return <p>Office not found</p>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("validating form data...");
    const validation = bookingSchema.safeParse(formData);

    if (!validation.success) {
      console.error("Validaton error", validation.error.issues);
      setFormErrors(validation.error.issues);
      return;
    }

    console.log("Form data is valid", formData);

    setLoading(true); //setloading to true

    try {
      const response = await apiClient.post("/booking-transaction", {
        ...formData,
        //the rest of the fields are handled by the backend
      });

      console.log("Form submitted successfully", response.data);
      //handle success (e.g., show a success message or redirect)

      //handle to the succes page with the office and booking id
      navigate("/succes-booking", {
        state: {
          office,
          booking: response.data.data,
        },
      });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error("error submitting form:", error.message);
        setError(error.message);
      } else {
        console.error("Unexpected error occurred while submitting form:", error);
        setError("An unexpected error occurred while submitting the form");
      }
    } finally {
      setIsLoading(false); //set loading to false
    }
  };

  const baseURL = "http://127.0.0.1:8000/storage";

  return (
    <>
      <Navbar></Navbar>
      <div className="relative w-full h-[240px] flex items-center shrink-0 overflow-hidden -mb-[50px]" id="Banner">
        <h1 className="text-center mx-auto font-extrabold text-[40px] leading-[60px] text-white mb-5 z-20">Start Booking Your Office</h1>
        <div className="absolute w-full h-full bg-[linear-gradient(180deg,_rgba(0,0,0,0)_0%,#000000_91.83%)] z-10" />
        <img alt="" className="absolute w-full h-full object-cover object-top" src="/assets/images/thumbnails/thumbnail-details-4.png" />
      </div>
      <form onSubmit={handleSubmit} className="relative flex justify-center max-w-[1130px] mx-auto gap-[30px] mb-20 z-20">
        <div className="flex flex-col shrink-0 w-[500px] h-fit rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
          <div className="flex items-center gap-4">
            <div className="flex shrink-0 w-[140px] h-[100px] rounded-[20px] overflow-hidden">
              <img alt="thumbnail" className="w-full h-full object-cover" src={`${baseURL}/${office.thumbnail}`} />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl leading-[30px]">{office.name} </p>
              <div className="flex items-center gap-[6px]">
                <img alt="icon" className="w-6 h-6" src="/assets/images/icons/location.svg" />
                <p className="font-semibold">{office.city.name}</p>
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex flex-col gap-4">
            <h2 className="font-bold">Complete The Details</h2>
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="name">
                Full Name
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A]">
                <img alt="icon" className="w-6 h-6" src="/assets/images/icons/security-user-black.svg" />
                <input
                  onChange={handleChange}
                  className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                  id="name"
                  name="name"
                  value={formData.name}
                  placeholder="Write your complete name"
                  type="text"
                />
              </div>
              {formErrors.find((error) => error.path.includes("name")) && <p className="text-red-500">*Name is required</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="phone">
                Phone Number
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A]">
                <img alt="icon" className="w-6 h-6" src="/assets/images/icons/call-black.svg" />
                <input
                  onChange={handleChange}
                  className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#000929]"
                  id="phone_number"
                  name="phone_number"
                  value={formData.phone_number}
                  placeholder="Write your valid number"
                  type="tel"
                />
              </div>
              {formErrors.find((error) => error.path.includes("phone_number")) && <p className="text-red-500">*Phone number is required</p>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="date">
                Started At
              </label>
              <div className="flex items-center rounded-full border border-[#000929] px-5 gap-[10px] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#0D903A] overflow-hidden">
                <img alt="icon" className="w-6 h-6" src="/assets/images/icons/calendar-black.svg" />
                <input
                  onChange={handleChange}
                  className="relative appearance-none outline-none w-full py-3 font-semibold [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0"
                  id="date"
                  name="started_at"
                  value={formData.started_at}
                  type="date"
                />
              </div>
              {formErrors.find((error) => error.path.includes("started_at")) && <p className="text-danger">*Date is required</p>}
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex items-center gap-3">
            <img alt="icon" className="w-[30px] h-[30px]" src="/assets/images/icons/shield-tick.svg" />
            <p className="font-semibold leading-[28px]">Kami akan melindungi privasi Anda sebaik mungkin sehingga dapat fokus bekerja</p>
          </div>
          <hr className="border-[#F6F5FD]" />
          <div className="flex flex-col gap-[30px]">
            <h2 className="font-bold">Bonus Packages For You</h2>
            <div className="grid grid-cols-2 gap-[30px]">
              <div className="flex items-center gap-4">
                <img alt="icon" className="w-[34px] h-[34px]" src="/assets/images/icons/coffee.svg" />
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-lg leading-[24px]">Extra Snacks</p>
                  <p className="text-sm leading-[21px]">Work-Life Balance</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img alt="icon" className="w-[34px] h-[34px]" src="/assets/images/icons/group.svg" />
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-lg leading-[24px]">Free Move</p>
                  <p className="text-sm leading-[21px]">Anytime 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col shrink-0 w-[400px] h-fit rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
          <h2 className="font-bold">Your Order Details</h2>
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Duration</p>
              <p className="font-bold">{office.duration} Days Working</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Sub Total</p>
              <p className="font-bold">Rp {office.price.toLocaleString("id")}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Unique Code</p>
              <p className="font-bold text-[#FF2D2D]">-Rp {uniqueCode}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-semibold">Grand Total</p>
              <p className="font-bold text-[22px] leading-[33px] text-[#0D903A]">
                Rp{" "}
                {totalAmountWithUniqueCode.toLocaleString("id", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
            <div className="relative rounded-xl p-[10px_20px] gap-[10px] bg-[#000929] text-white">
              <img alt="" className="absolute -top-[15px] right-[10px] " src="/assets/images/icons/Polygon 1.svg" />
              <p className="font-semibold text-sm leading-[24px] z-10">Tolong perhatikan kode unik berikut ketika melakukan pembayaran kantor</p>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <h2 className="font-bold">Send Payment to</h2>
          <div className="flex flex-col gap-[30px]">
            <div className="flex items-center gap-3">
              <div className="w-[71px] flex shrink-0">
                <img alt="bank logo" className="w-full object-contain" src="/assets/images/logos/bri.svg" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <div className="flex items-center gap-1">
                  <p className="font-semibold">Kopi Mbah O</p>
                  <img alt="icon" className="w-[18px] h-[18px]" src="/assets/images/icons/verify.svg" />
                </div>
                <p>1283008822</p>
              </div>
            </div>
          </div>
          <hr className="border-[#F6F5FD]" />
          <button
            disabled={isLoading} //disable the button when loading
            className="flex items-center justify-center w-full rounded-full p-[16px_26px] gap-3 bg-[#0D903A] font-bold text-[#F7F7FD]"
            type="submit"
          >
            <span>{isLoading ? "Loading..." : "Check Out"}</span>
          </button>
        </div>
      </form>
    </>
  );
}
