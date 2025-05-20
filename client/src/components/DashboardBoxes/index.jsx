import React, { useState,useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { AiTwotoneGift } from "react-icons/ai";
import { IoStatsChartSharp } from "react-icons/io5";
import { AiOutlinePieChart } from "react-icons/ai";
import { BsBank } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { useOrder } from "../../store/order-context";
import { useAuth } from "../../store/auth";



const DashboardBoxes = () => {
  const {getAllOrders} =useOrder();
  const [totalOrders,setTotalOrders] = useState(0)
  const { products } = useAuth();
  useEffect(() => {
      const getallUserOrders = async () => {
        try {
          const response = await getAllOrders();
          if (response.success) {
            setTotalOrders(response.orders.length);
          }
          else{
            toast.error("Failed to fetch Orders");
          }
        } catch (error) {
          console.log(`products frontend error ${error}`);
        }
      };
      getallUserOrders();
    }, []);
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBoxesSlider"
      >
        <SwiperSlide>
          <div className="box p-5 bg-white cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <AiTwotoneGift className="text-[40px] text-[#3872fa]" />
            <div className="info w-[70%]">
              <h3>Total Orders</h3>
              <b>{totalOrders}</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-[#3872fa]" />
          </div>
        </SwiperSlide>
        {/* <SwiperSlide>
          <div className="box p-5 cursor-pointer bg-white hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <AiOutlinePieChart className="text-[40px] text-[#10b981]" />
            <div className="info w-[70%] ">
              <h3>Sales</h3>
              <b>$57,890</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-[#10b981]" />
          </div>
        </SwiperSlide> */}
        {/* <SwiperSlide>
          <div className="box p-5 cursor-pointer bg-white hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <BsBank className="text-[40px] text-[#7928ca]" />
            <div className="info w-[70%]">
              <h3>Revenue</h3>
              <b>$12,390</b>
            </div>
            <IoStatsChartSharp className="text-[40px] text-[#7928ca]" />
          </div>
        </SwiperSlide> */}
        <SwiperSlide>
          <div className="box p-5 cursor-pointer bg-white hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
            <RiProductHuntLine className="text-[40px] text-[#312be1d8]" />
            <div className="info w-[70%]">
              <h3>Total Products</h3>
              <b>{products.length}</b>
            </div>
            <IoStatsChartSharp className="text-[50px] text-[#312be1d8]" />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
export default DashboardBoxes;
