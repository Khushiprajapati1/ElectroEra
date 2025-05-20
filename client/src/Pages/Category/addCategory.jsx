import React from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddCategory = () => {
  return (
    <section className="p-8 bg-gray-100">
      <form className="form py-3 p-8 max-h-[500px] overflow-y-scroll">
        <div className="grid grid-cols-1 mb-3 pt-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col w-[25%]">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Category Name
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)] focus:outline-none focus:border-[rgba(0,0,0,0.7)] rounded-sm p-3 text-sm bg-[#fafafa]"
              />
            </div>
          </div>
          <br />
          <h3 className="text-[14px] font-[500] mb-1 text-black">
            Category Image
          </h3>
          <br />
          <div className="grid grid-cols-7 gap-4">
            <div className="uploadBoxWrapper relative">
              <span
                className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex
                items-center justify-center z-50 cursor-pointer"
              >
                <IoClose className="text-white text-[17px]" />
              </span>
              <div
                className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)]
                h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative"
              >
                <LazyLoadImage
                  className="w-full h-[120px] object-cover"
                  effect="blur"
                  wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: { transitionDelay: "1s" },
                  }}
                  alt={"image"}
                  src={"/MP(1).png"}
                />
              </div>
            </div>

            <UploadBox multiple={true} />
          </div>
        </div>
        <br />
        <br />

        <div className="w-[250px]">
          <Button type="button" className="btn-blue btn-lg w-full flex gap-2">
            <FaCloudUploadAlt className="text-[25px] text-white" />
            Publish and View
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddCategory;
