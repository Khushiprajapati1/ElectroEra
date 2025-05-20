import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import { TbCategory } from "react-icons/tb";
import { IoBagCheckOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Collapse } from "react-collapse";
import { MyContext } from "../../App";
import { BiSolidHomeHeart } from "react-icons/bi";

const Sidebar = () => {
  const [submenuIndex, setSubmenuIndex] = useState(null);

  const isOpenSubMenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };
  const context = useContext(MyContext);

  return (
    <>
      <div className="sidebar fixed top-0 left-0 bg-[#fff] w-[18%] h-full border-r border-[rgb(0,0,0,0.1)] py-2 px-3 ">
        <div className="py-2 w-full flex items-center">
          <Link to="/dashboard" className="flex items-center">
            {/* <img
              src="/ElectroEra_logo.png"
              className="w-[70px] h-[70px] inline-block"
              alt="ElectroEra Logo"
            /> */}
            <span className="text-2xl font-extrabold ml-3 font-mono flex items-center justify-center gap-2">
              <BiSolidHomeHeart className="text-3xl" />
              ElectroEra
            </span>
          </Link>
        </div>
        <ul className="mt-4">
          <li>
            <Link to="/dashboard">
              <Button
                className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-2
            hover:!bg-[#f1f1f1] "
              >
                <MdOutlineDashboard className="text-[18px]" />
                <span>Dashboard</span>
              </Button>
            </Link>
          </li>

          <li>
            {/* <Button
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-2 
            hover:!bg-[#f1f1f1]"
              onClick={() => isOpenSubMenu(1)}
            >
              <FaRegImage className="text-[18px]" />
              <span>Home Slides</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
                <FaAngleDown
                  className={`transition-all ${
                    submenuIndex === 1 ? "rotate-180" : " "
                  }`}
                />
              </span>
            </Button> */}

            <Collapse isOpened={submenuIndex == 1 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/homeSlider/list">
                    <Button className="!text-[rgba(0,0,0,0.9)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-7 flex gap-3">
                      <span className="block w-[3px] h-[3px] rounded-full bg-[rgba(0,0,0,0.4)]"></span>{" "}
                      Add Home Banner Slide List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!text-[rgba(0,0,0,0.9)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-7 flex gap-3"
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Home Slide",
                      })
                    }
                  >
                    <span className="block w-[3px] h-[3px] rounded-full bg-[rgba(0,0,0,0.4)]"></span>{" "}
                    Add Home Banner Slide
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            <Link to="/users">
              <Button
                className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-2
            hover:!bg-[#f1f1f1]"
              >
                <FiUsers className="text-[18px]" />
                <span>Users</span>
              </Button>
            </Link>
          </li>

          <li>
            <Button
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-2 
            hover:!bg-[#f1f1f1]"
              onClick={() => isOpenSubMenu(3)}
            >
              <RiProductHuntLine className="text-[18px]" />
              <span>Products</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
                <FaAngleDown
                  className={`transition-all ${
                    submenuIndex === 3 ? "rotate-180" : " "
                  }`}
                />
              </span>
            </Button>
            <Collapse isOpened={submenuIndex == 3 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/products">
                    <Button className="!text-[rgba(0,0,0,0.9)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-7 flex gap-3">
                      <span className="block w-[3px] h-[3px] rounded-full bg-[rgba(0,0,0,0.4)]"></span>{" "}
                      Prouct List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!text-[rgba(0,0,0,0.9)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-7 flex gap-3"
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add Product",
                      })
                    }
                  >
                    <span className="block w-[3px] h-[3px] rounded-full bg-[rgba(0,0,0,0.4)]"></span>{" "}
                    Prouct Upload
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>

          <li>
            {/* <Button
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-2 
            hover:!bg-[#f1f1f1]"
              onClick={() => isOpenSubMenu(4)}
            >
              <TbCategory className="text-[18px]" />
              <span>Category</span>
              <span className="ml-auto w-[30px] h-[30px] flex items-center justify-center">
                <FaAngleDown
                  className={`transition-all ${
                    submenuIndex === 4 ? "rotate-180" : " "
                  }`}
                />
              </span>
            </Button> */}
            <Collapse isOpened={submenuIndex == 4 ? true : false}>
              <ul className="w-full">
                <li className="w-full">
                  <Link to="/category/list">
                    <Button className="!text-[rgba(0,0,0,0.9)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-7 flex gap-3">
                      <span className="block w-[3px] h-[3px] rounded-full bg-[rgba(0,0,0,0.4)]"></span>{" "}
                      category List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!text-[rgba(0,0,0,0.9)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-7 flex gap-3"
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add New Category",
                      })
                    }
                  >
                    <span className="block w-[3px] h-[3px] rounded-full bg-[rgba(0,0,0,0.4)]"></span>{" "}
                    Add a Category
                  </Button>
                </li>
                <li className="w-full">
                  <Link to="/subCategory/list">
                    <Button className="!text-[rgba(0,0,0,0.9)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-7 flex gap-3">
                      <span className="block w-[3px] h-[3px] rounded-full bg-[rgba(0,0,0,0.4)]"></span>{" "}
                      Sub Category List
                    </Button>
                  </Link>
                </li>
                <li className="w-full">
                  <Button
                    className="!text-[rgba(0,0,0,0.9)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-7 flex gap-3"
                    onClick={() =>
                      context.setIsOpenFullScreenPanel({
                        open: true,
                        model: "Add New SubCategory",
                      })
                    }
                  >
                    <span className="block w-[3px] h-[3px] rounded-full bg-[rgba(0,0,0,0.4)]"></span>{" "}
                    Add a SubCategory
                  </Button>
                </li>
              </ul>
            </Collapse>
          </li>
          <li>
            <Link to="/orders">
              <Button
                className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3
            hover:!bg-[#f1f1f1]"
              >
                <IoBagCheckOutline className="text-[20px]" />
                <span>Orders</span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/Reviews">
              <Button
                className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3
            hover:!bg-[#f1f1f1]"
              >
                <AiOutlineLogout className="text-[20px]" />
                <span>Manage Reviews</span>
              </Button>
            </Link>
          </li>
          {/* <li> */}
          {/* <Button */}
          {/* // className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3 */}
          {/* // hover:!bg-[#f1f1f1]" */}
          {/* // > */}
          {/* <FaRegStar className="text-[20px]" /> */}
          {/* <span>Ratings</span> */}
          {/* </Button> */}
          {/* </li> */}
          <li>
            <Button
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3
            hover:!bg-[#f1f1f1]"
            >
              <AiOutlineLogout className="text-[20px]" />
              <span><Link to="/logout">LogOut</Link></span>
            </Button>
          </li>
          <li>
            <Button
              className="w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[700] items-center !py-3
            hover:!bg-[#f1f1f1]"
            >
              <AiOutlineLogout className="text-[20px]" />
              <span>
                <Link to="/">Visit User Side</Link>
              </span>
            </Button>
          </li>
        </ul>
      </div>
    </>
  );
};
export default Sidebar;
