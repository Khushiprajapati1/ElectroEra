import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoClose } from "react-icons/io5";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [Brand, setBrand] = useState("");
  //const [productFeatured, setProductFeatured] = React.useState("");
  //const [selectedImages, setSelectedImages] = useState([]); // New state to hold selected images
  //const [files, setFiles] = useState([]);
  const [imageNames, setImageNames] = useState([]);
  const navigate = useNavigate();

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };

  // const handleChangeProductFeatured = (event) => {
  //   setProductFeatured(event.target.value);
  // };

  const handleFilesSelected = (filenames) => {
    // Convert files to an array of URLs (you can use URL.createObjectURL to display them in the LazyLoadImage)
    //const imageUrls = files.map(file => URL.createObjectURL(file));
    //setSelectedImages(imageUrls); // Update the state with the selected images
    setImageNames(filenames);
    // if(imageNames.length <= 0){
    //   toast.error("Upload atleast 1 images");
    // }
  };
  // console.log(productName,description,price,stock,rating,category,Brand,imageNames)

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageNames.length <= 0) {
      toast.error("Upload atleast 1 image");
      return;
    }
    if (category === "") {
      toast.error("Select Category");
      return;
    }
    if (Brand === "") {
      toast.error("Select Brand");
      return;
    }
    //console.log(imageNames)

    try {
      const response = await fetch(
        `http://localhost:5000/api/product/addNewProduct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: productName,
            price,
            description,
            rating,
            stock,
            brand: Brand,
            category,
            images: imageNames.map(name => `/images/${name}`)
          }),
        }
      );
      // console.log(imageNames.map(name => `/images/${name}`))

      //console.log(response);
      const res_data = await response.json();
      //console.log("res from server", res_data);

      if (response.ok) {
        toast.success(res_data.message);

       setProductName("");
       setPrice("");
       setDescription("");
       setRating(0);
       setStock("");
       setBrand("");
       setCategory("");
      //  setImageNames("");
      setTimeout(() => {
        window.location.reload();
      }, 1000); 
      navigate("/");
      } else {
        toast.error(
          res_data.message
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="p-8 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="form py-3 p-8 max-h-[500px] overflow-y-scroll"
      >
        {/* Other form fields ... */}
        <div className="grid grid-cols-1 mb-3">
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Product Name
            </h3>
            <input
              type="text"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full h-[40px] border border-[rgba(0,0,0,0.3)]
              focus:outline-none focus:border-[rgba(0,0,0,0.7)] rounded-sm p-3 text-sm bg-[#fafafa]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 mb-3">
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Product Description
            </h3>
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full h-[140px] border border-[rgba(0,0,0,0.3)]
              focus:outline-none focus:border-[rgba(0,0,0,0.7)] rounded-sm p-3 text-sm bg-[#fafafa]"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 mb-3 gap-4">
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Product Category
            </h3>
            <Select
              labelId="demo-simple-select-label"
              id="productCatDrop"
              className="w-full bg-[#fafafa]"
              size="small"
              value={category}
              label="Category"
              onChange={handleChangeCategory}
            >
              {/* <MenuItem value="">None</MenuItem> */}
              <MenuItem value="TV">TV</MenuItem>
              <MenuItem value="AC">AC</MenuItem>
              <MenuItem value="Fridge">Fridge</MenuItem>
              <MenuItem value="WM">Washing Machine</MenuItem>
              <MenuItem value="Iron">Iron</MenuItem>
              <MenuItem value="Oven">Oven</MenuItem>
              <MenuItem value="Microwave">Microwave</MenuItem>
              <MenuItem value="Mixer">Mixer</MenuItem>
              <MenuItem value="Juicer">Juicer</MenuItem>
              <MenuItem value="Blender">Blender</MenuItem>
              <MenuItem value="Griller">Griller</MenuItem>
              <MenuItem value="Fan">Fan</MenuItem>
              <MenuItem value="HT">Home Theatre</MenuItem>
              <MenuItem value="DFM">Domestic Flour Mill</MenuItem>
              <MenuItem value="Cooler">Cooler</MenuItem>
              <MenuItem value="Geyser">Geyser</MenuItem>
            </Select>
          </div>

          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Product Brand
            </h3>
            <Select
              labelId="demo-simple-select-label"
              id="productCatDrop"
              className="w-full bg-[#fafafa]"
              size="small"
              value={Brand}
              label="Category"
              onChange={handleChangeBrand}
            >
              {/* <MenuItem value="">None</MenuItem> */}
              <MenuItem value="Haier">Haier</MenuItem>
              <MenuItem value="LG">LG</MenuItem>
              <MenuItem value="Samsung">Samsung</MenuItem>
              <MenuItem value="Sony">Sony</MenuItem>
              <MenuItem value="Llyod">Llyod</MenuItem>
              <MenuItem value="WonderChef">Wonderchef</MenuItem>
              <MenuItem value="Bosch">Bosch</MenuItem>
              <MenuItem value="Usha">Usha</MenuItem>
              <MenuItem value="Phillips">Phillips</MenuItem>
              <MenuItem value="Whirlpool">Whirlpool</MenuItem>
              <MenuItem value="Voltas">Voltas</MenuItem>
              <MenuItem value="Panasonic">Panasonic</MenuItem>
              <MenuItem value="Borosil">Borosil</MenuItem>
              <MenuItem value="Prestige">Prestige</MenuItem>
              <MenuItem value="Bajaj">Bajaj</MenuItem>
              <MenuItem value="Natraj">Natraj</MenuItem>
              <MenuItem value="Havells">Havells</MenuItem>

            </Select>
          </div>

          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Product Price
            </h3>
            <input
              type="number"
              name="price"
              value={price}
              required={true}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-[40px] border border-[rgba(0,0,0,0.3)]
             focus:outline-none focus:border-[rgba(0,0,0,0.7)] rounded-sm p-3 text-sm bg-[#fafafa]"
            />
          </div>
          <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Product Stock
            </h3>
            <input
              type="number"
              name="stock"
              value={stock}
              required
              onChange={(e) => setStock(e.target.value)}
              className="w-full h-[40px] border border-[rgba(0,0,0,0.3)]
              focus:outline-none focus:border-[rgba(0,0,0,0.7)] rounded-sm p-3 text-sm bg-[#fafafa]"
            />
          </div>

          {/* <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Product Old Price
            </h3>
            <input
              type="number"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.3)]
              focus:outline-none focus:border-[rgba(0,0,0,0.7)] rounded-sm p-3 text-sm bg-[#fafafa]"
            />
          </div> */}
        </div>

        {/* <div className="grid grid-cols-4 mb-3 gap-4"> */}
        {/* <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Is Featured?
            </h3>
            <Select
              labelId="demo-simple-select-label"
              id="productCatDrop"
              className="w-full bg-[#fafafa]"
              size="small"
              value={productFeatured}
              label="Category"
              onChange={handleChangeProductFeatured}
            >
              <MenuItem value={""}>None</MenuItem>
              <MenuItem value={10}>True</MenuItem>
              <MenuItem value={20}>False</MenuItem>
            </Select>
          </div> */}

        {/* <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Product Brand
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.3)]
              focus:outline-none focus:border-[rgba(0,0,0,0.7)] rounded-sm p-3 text-sm bg-[#fafafa]"
            />
          </div> */}

        {/* <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Product Discount
            </h3>
            <input
              type="number"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.3)]
              focus:outline-none focus:border-[rgba(0,0,0,0.7)] rounded-sm p-3 text-sm bg-[#fafafa]"
            />
          </div> */}
        {/* </div> */}

        <div className="grid grid-cols-1 mb-3 gap-6">
          {/* <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Product Weight
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.3)]
             last:focus:outline-none focus:border-[rgba(0,0,0,0.7)] rounded-sm p-3 text-sm bg-[#fafafa]"
            />
          </div> */}
          {/* <div className="col">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Product Size
            </h3>
            <input
              type="text"
              className="w-full h-[40px] border border-[rgba(0,0,0,0.3)]
              focus:outline-none focus:border-[rgba(0,0,0,0.7)] rounded-sm p-3 text-sm bg-[#fafafa]"
            />
          </div> */}

          <div className="col">
            <h3 className="text-[14px] font-[500] mb-2 text-black">
              Product Rating
            </h3>
            <Rating
              name="half-rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              precision={0.1}
            />
          </div>
        </div>

        <div className="col w-full p-5 px-0">
          <h3 className="font-[700] text-[17px] mb-3">Media & Images</h3>
          <div className="grid grid-cols-7 gap-4">
            {/* Dynamically render selected images */}
            {/* {console.log("------------------",imageNames)} */}
            {imageNames.map((image, index) => (
              <div key={index} className="uploadBoxWrapper relative">
                {/* <span
                  className="absolute w-[20px] h-[20px] rounded-full overflow-hidden bg-red-700 -top-[5px] -right-[5px] flex
                  items-center justify-center z-50 cursor-pointer"
                > */}
                {/* <IoClose className="text-white text-[17px]" /> */}
                {/* </span> */}
                <div
                  className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)]
                  h-[150px] w-[100%] bg-gray-100 cursor-pointer hover:bg-gray-200 flex items-center justify-center flex-col relative"
                >
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    effect="blur"
                    wrapperProps={{
                      style: { transitionDelay: "1s" },
                    }}
                    alt={`image-${index}`}
                    src={`/images/${image}`} // Use the URL of the selected image
                  />
                </div>
              </div>
            ))}

            {/* UploadBox to select files */}
            <UploadBox multiple={true} onFilesSelected={handleFilesSelected} />
          </div>
          <h1 className="text-red-400">
            Note : Please Upload Images from images folder only.
          </h1>
          <h1 className="text-red-400">Path : Client/public/images</h1>
        </div>

        <Button type="submit" className="btn-blue btn-lg w-full flex gap-4">
          <FaCloudUploadAlt className="text-[25px] text-white" />
          Publish and View Product
        </Button>
      </form>
    </section>
  );
};

export default AddProduct;
