import React from "react";
import MenuItem from "@mui/material/MenuItem";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Button } from "@mui/material";
import Select from "@mui/material/Select";
import { FaCloudUploadAlt } from "react-icons/fa";

const AddSubCategory = () => {
  const [productCat, setProductCat] = React.useState("");
  const [productSubCat, setProductSubCat] = React.useState("");

  const handleChangeProductCat = (event) => {
    setProductCat(event.target.value);
  };

  const handleChangeSubProductCat = (event) => {
    setProductSubCat(event.target.value);
  };

  return (
    <section className="p-8 bg-white">
      <form className="form py-3 p-8 max-h-[500px] overflow-y-scroll">
        <div className="grid grid-cols-1 mb-3 pt-4">
          <div className="grid grid-cols-4 mb-3 gap-5">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Category
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                className="w-full bg-[#fafafa]"
                size="small"
                value={productCat}
                label="Category"
                onChange={handleChangeProductCat}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={10}>TV</MenuItem>
                <MenuItem value={20}>Fridge</MenuItem>
                <MenuItem value={30}>AC</MenuItem>
                <MenuItem value={40}>Washing Machine</MenuItem>
                <MenuItem value={50}>Home Appliances</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Sub Category Name
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.3)]
                focus:outline-none focus:border-[rgba(0,0,0,0.7)] rounded-sm p-3 text-sm bg-[#fafafa]"
              />
            </div>
          </div>
          <br />
        </div>

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

export default AddSubCategory;
