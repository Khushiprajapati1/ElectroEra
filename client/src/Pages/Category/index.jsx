import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { PiExportBold } from "react-icons/pi";
import Checkbox from "@mui/material/Checkbox";
import { AiOutlineEdit } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import Pagination from "@mui/material/Pagination";
import Chip from "@mui/material/Chip";
import { MyContext } from "../../App";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CategoryList = () => {
  const [categoryFilterVal, setCategoryFilterVal] = React.useState("");
  const handleChangecatFil = (event) => {
    setCategoryFilterVal(event.target.value);
  };
  const context = useContext(MyContext);
  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[18px] font-bold font[600]">Category List</h2>

        <div className="col w-[30%] ml-auto flex items-center justify-end gap-2">
          <Button className="btn !bg-green-600 !text-white btn-sm">
            <PiExportBold /> Export
          </Button>
          <Button
            className="btn-blue !text-white btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Category",
              })
            }
          >
            Add New Category
          </Button>
        </div>
      </div>

      <div className="card my-4 shadow-md pt-5 sm:rounded-lg bg-white">
        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-1 pr-0 py-3" width={60}>
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </th>
                <th
                  scope="col"
                  width={200}
                  className="px-2 py-3 whitespace-nowrap"
                >
                  Image
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Category Name
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td scope="col" className="px-1 pr-2 py-2">
                  <div className="w-[70px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-2">
                  <div className="flex items-center gap-4 w-[70px]">
                    <div className="img w-full rounded-md overflow-hidden group">
                      <img
                        src="/TV(1).jpg"
                        className="w-full g-[10px] group-hover:scale-105 transition-all"
                      />
                    </div>
                  </div>
                </td>
                <td scope="col" className="px-6 py-2 w-[50px]">
                  <Chip label="TV" />
                </td>
                <td scope="col" width={100} className="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px] " />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                      <IoEyeOutline className="text-[rgba(0,0,0,0.8)] text-[18px] " />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                      <GoTrash className="text-[rgba(0,0,0,0.8)] text-[18px] " />
                    </Button>
                  </div>
                </td>
              </tr>

              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td scope="col" className="px-1 pr-2 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-2" width={100}>
                  <div className="flex items-center gap-4 w-[70px]">
                    <div className="img w-full rounded-md overflow-hidden group">
                      <img
                        src="/WM(1).jpg"
                        className="w-full g-[10px] group-hover:scale-105 transition-all"
                      />
                    </div>
                  </div>
                </td>
                <td scope="col" className="px-6 py-2">
                  <Chip label="Washing Machine" />
                </td>
                <td scope="col" width={100} className="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px] " />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                      <IoEyeOutline className="text-[rgba(0,0,0,0.8)] text-[18px] " />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                      <GoTrash className="text-[rgba(0,0,0,0.8)] text-[18px] " />
                    </Button>
                  </div>
                </td>
              </tr>

              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td scope="col" className="px-1 pr-2 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-2" width={100}>
                  <div className="flex items-center gap-4 w-[80px]">
                    <div className="img w-full rounded-md overflow-hidden group">
                      <img
                        src="/AC(1).png"
                        className="w-full g-[10px] group-hover:scale-105 transition-all"
                      />
                    </div>
                  </div>
                </td>
                <td scope="col" className="px-6 py-2">
                  <Chip label="AC" />
                </td>
                <td scope="col" width={100} className="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px] " />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                      <IoEyeOutline className="text-[rgba(0,0,0,0.8)] text-[18px] " />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                      <GoTrash className="text-[rgba(0,0,0,0.8)] text-[18px] " />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td scope="col" className="px-1 pr-2 py-2">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </td>
                <td className="px-0 py-2">
                  <div className="flex items-center gap-4 w-[70px]">
                    <div className="img w-full rounded-md overflow-hidden group">
                      <img
                        src="/Fridge(1).png"
                        className="w-full g-[10px] group-hover:scale-105 transition-all"
                      />
                    </div>
                  </div>
                </td>
                <td scope="col" className="px-6 py-2">
                  <Chip label="Fridge" />
                </td>
                <td scope="col" width={100} className="px-6 py-2">
                  <div className="flex items-center gap-1">
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px] " />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                      <IoEyeOutline className="text-[rgba(0,0,0,0.8)] text-[18px] " />
                    </Button>
                    <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                      <GoTrash className="text-[rgba(0,0,0,0.8)] text-[18px] " />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end pt-5 pb-5 px-4">
          <Pagination count={10} color="primary" />
        </div>
      </div>
    </>
  );
};

export default CategoryList;
