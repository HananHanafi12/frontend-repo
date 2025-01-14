import { Swiper, SwiperSlide } from "swiper/react";
import Navbar from "../components/Navbar";
import { Office } from "../types/type";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiClient from "../services/apiService";

export default function Details() {
  const { slug } = useParams<{ slug: string }>();
  const [office, setOffice] = useState<Office | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get(`/office/${slug}`)
      .then((response) => {
        setOffice(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error instanceof Error ? error.message : "An error occurred");
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading: {error}</p>;
  }

  if (!office) {
    return <p>Office not found</p>;
  }

  const baseURL = "http://127.0.0.1:8000/storage";
  return (
    <>
      <Navbar></Navbar>
      <section className="-mb-[50px]" id="Gallery">
        <div className="swiper w-full">
          <div className="swiper-wrapper">
            <Swiper direction={"horizontal"} spaceBetween={10} slidesPerView={"auto"} slidesOffsetAfter={30} slidesOffsetBefore={30}>
              <SwiperSlide className="swiper-slide !w-fit">
                <div className="w-[700px] h-[550px] overflow-hidden">
                  <img alt="thumbnail" className="w-full h-full object-cover" src={`${baseURL}/${office.thumbnail}`} />
                </div>
              </SwiperSlide>
              {office.photos.map((photo) => (
                <SwiperSlide key={photo.id} className="swiper-slide !w-fit">
                  <div className="w-[700px] h-[550px] overflow-hidden">
                    <img alt="thumbnail" className="w-full h-full object-cover" src={`${baseURL}/${photo.photo}`} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      <section className="relative flex max-w-[1130px] mx-auto gap-[30px] mb-20 z-10" id="Details">
        <div className="flex flex-col w-full rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
          <p className="w-fit rounded-full p-[6px_16px] bg-[#0D903A] font-bold text-sm leading-[21px] text-[#F7F7FD]">Popular</p>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-extrabold text-[32px] leading-[44px]">{office.name}</h1>
              <div className="flex items-center gap-[6px] mt-[10px]">
                <img alt="icon" className="w-6 h-6" src="/assets/images/icons/location.svg" />
                <p className="font-semibold">{office.city.name}</p>
              </div>
            </div>
            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-1">
                <img alt="star" className="w-5 h-5" src="/assets/images/icons/Star 1.svg" />
                <img alt="star" className="w-5 h-5" src="/assets/images/icons/Star 1.svg" />
                <img alt="star" className="w-5 h-5" src="/assets/images/icons/Star 1.svg" />
                <img alt="star" className="w-5 h-5" src="/assets/images/icons/Star 1.svg" />
                <img alt="star" className="w-5 h-5" src="/assets/images/icons/Star 5.svg" />
              </div>
              <p className="font-semibold text-right">4.5/5 (19,384)</p>
            </div>
          </div>
          <p className="leading-[30px]">{office.about}</p>
          <hr className="border-[#F6F5FD]" />
          <h2 className="font-bold">You Get What You Need Most</h2>
          <div className="grid grid-cols-3 gap-x-5 gap-y-[30px]">
            <div className="flex items-center gap-4">
              <img alt="icon" className="w-[34px] h-[34px]" src="/assets/images/icons/security-user.svg" />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Privacy</p>
                <p className="text-sm leading-[21px]">For Yourself</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img alt="icon" className="w-[34px] h-[34px]" src="/assets/images/icons/cup.svg" />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Global Event</p>
                <p className="text-sm leading-[21px]">Startup Contest</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img alt="icon" className="w-[34px] h-[34px]" src="/assets/images/icons/home-trend-up.svg" />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Sustainbility</p>
                <p className="text-sm leading-[21px]">Long-term Goals</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img alt="icon" className="w-[34px] h-[34px]" src="/assets/images/icons/coffee.svg" />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Extra Snacks</p>
                <p className="text-sm leading-[21px]">Work-Life Balance</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img alt="icon" className="w-[34px] h-[34px]" src="/assets/images/icons/3dcube.svg" />
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg leading-[24px]">Compact</p>
                <p className="text-sm leading-[21px]">Good for Focus</p>
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
          <hr className="border-[#F6F5FD]" />
          <div className="flex flex-col gap-[6px]">
            <h2 className="font-bold">Office Address</h2>
            <p>{office.name}</p>
            <p>{office.address}</p>
          </div>
          <div className="overflow-hidden w-full h-[280px]">
            <div className="h-full w-full max-w-[none] bg-none" id="my-map-display">
              <iframe className="h-full w-full border-0" frameBorder="0" title="Google Maps - Xicheng District, Beijing" src={`https://www.google.com/maps/embed/v1/place?q=${office.name},&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`} />
            </div>
            <a className="from-embedmap-code" href="https://www.bootstrapskins.com/themes" id="enable-map-data">
              premium bootstrap themes
            </a>
          </div>
        </div>
        <div className="w-[392px] flex flex-col shrink-0 gap-[30px]">
          <div className="flex flex-col rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[30px] bg-white">
            <div>
              <p className="font-extrabold text-[32px] leading-[48px] text-[#0D903A]">Rp {office.price.toLocaleString("id")}</p>
              <p className="font-semibold mt-1">For {office.duration} days working</p>
            </div>
            <hr className="border-[#F6F5FD]" />
            <div className="flex flex-col gap-5">
              {office.benefits.map((benefit) => (
                <div className="flex items-center gap-3">
                  <img alt="icon" className="w-[30px] h-[30px]" src="/assets/images/icons/verify.svg" />
                  <p className="font-semibold leading-[28px]">{benefit.name}</p>
                </div>
              ))}
            </div>
            <hr className="border-[#F6F5FD]" />
            <div className="flex flex-col gap-[14px]">
              <Link to={`/office/${office.slug}/booking`}>
                <div className="flex items-center justify-center w-full rounded-full p-[16px_26px] gap-3 bg-[#0D903A] font-bold text-[#F7F7FD]">
                  <img alt="icon" className="w-6 h-6" src="/assets/images/icons/slider-horizontal-white.svg" />
                  <span>Book This Office</span>
                </div>
              </Link>
              <button className="flex items-center justify-center w-full rounded-full border border-[#000929] p-[16px_26px] gap-3 bg-white font-semibold">
                <img alt="icon" className="w-6 h-6" src="/assets/images/icons/save-add.svg" />
                <span>Save for Later</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col rounded-[20px] border border-[#E0DEF7] p-[30px] gap-[20px] bg-white">
            <h2 className="font-bold">Contact Our Sales</h2>
            <div className="flex flex-col gap-[30px]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <img alt="photo" className="w-full h-full object-cover" src="/assets/images/photos/hanan.jpg" />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold">Hanan</p>
                    <p className="text-sm leading-[21px]">Sales Manager</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href="#">
                    <img alt="icon" className="w-10 h-10" src="/assets/images/icons/call-green.svg" />
                  </a>
                  <a href="#">
                    <img alt="icon" className="w-10 h-10" src="/assets/images/icons/chat-green.svg" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
                    <img alt="photo" className="w-full h-full object-cover" src="/assets/images/photos/heni.jpg" />
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <p className="font-bold">Esmeray</p>
                    <p className="text-sm leading-[21px]">Sales Manager</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href="#">
                    <img alt="icon" className="w-10 h-10" src="/assets/images/icons/call-green.svg" />
                  </a>
                  <a href="#">
                    <img alt="icon" className="w-10 h-10" src="/assets/images/icons/chat-green.svg" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
