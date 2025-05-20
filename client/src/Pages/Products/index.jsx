import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { PiExportBold } from "react-icons/pi";
import Checkbox from "@mui/material/Checkbox";
import ProgressBar from "../../components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { GoTrash } from "react-icons/go";
import Pagination from "@mui/material/Pagination";
import SearchBox from "../../components/SearchBox";
import { MyContext } from "../../App";
import { useAuth } from "../../store/auth";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";
import Rating from "@mui/material/Rating";
import UploadBox from "../../components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";

// const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Products = () => {
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const handleChangecatFil = (event) => {
    setCategoryFilterVal(event.target.value);
  };
  const context = useContext(MyContext);
  const { products } = useAuth();

  const filteredProducts = categoryFilterVal
    ? products.filter((product) => product.category === categoryFilterVal)
    : products;

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const [imageNames, setImageNames] = useState([]);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleOpenDialog = (productId) => {
    setSelectedProductId(productId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProductId(null);
  };

  const handleConfirmDelete = async () => {
    // Implement the delete logic here
    // console.log("Deleting product with ID:", selectedProductId);
    try {
      const response = await fetch(
        "https://electroera.onrender.com/api/product/deleteProduct",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: selectedProductId }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        // After deletion
        handleCloseDialog();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProduct = async () => {
    if (imageNames.length <= 0) {
      toast.error("Upload atleast 1 image");
      return;
    }
    if (editProductData.category === "") {
      toast.error("Select Category");
      return;
    }
    if (editProductData.brand === "") {
      toast.error("Select Brand");
      return;
    }
    if (editProductData.name === "") {
      toast.error("Product Name is Required");
      return;
    }
    if (editProductData.description === "") {
      toast.error("Product Description is Required");
      return;
    }
    if (editProductData.price === "") {
      toast.error("Product Price is Required");
      return;
    }
    try {
      const response = await fetch(
        "https://electroera.onrender.com/api/product/updateProduct",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editProductData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        toast.success("Product updated successfully!");
        setOpenEditDialog(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating.");
    }
  };

  const handleFilesSelected = (filenames) => {
    setImageNames(filenames);
    setEditProductData((prev) => ({
      ...prev,
      images: filenames.map((name) => `/images/${name}`),
    }));
  };

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3">
        <h2 className="text-[23px] font-bold font[600]">
          ElectroEra Products
          {/* <span className="font-[400] text-[15px]">(Tailwind CSS Table)</span> */}
        </h2>

        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">
          {/* <Button className="btn !bg-green-600 !text-white btn-sm">
            <PiExportBold /> Export
          </Button> */}
          <Button
            className="btn-blue !text-white btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }
          >
            Add Product
          </Button>
        </div>
      </div>

      <div className="card my-4 shadow-md pt-5 sm:rounded-lg bg-white">
        <div className="flex items-center w-full px-5 justify-between">
          <div className="col w-[20%]">
            <h4 className="font-[600] text[13px] mb-3">Category By</h4>
            <Select
              className="w-full h-[35px]"
              size="small"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={categoryFilterVal}
              onChange={handleChangecatFil}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
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

          {/* <div className="col w-[20%] ml-auto">
            <SearchBox />
          </div> */}
        </div>
        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {/* <th scope="col" className="px-1 pr-0 py-3" width="10%"> */}
                {/* <div className="w-[60px]"> */}
                {/* <Checkbox {...label} size="small" /> */}
                {/* </div> */}
                {/* </th> */}
                <th scope="col" className="px-10 py-3 whitespace-nowrap">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Category
                </th>
                {/* <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  subcategory
                </th> */}
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Brand
                </th>
                <th scope="col" className="px-10 py-3 whitespace-nowrap">
                  price
                </th>
                <th scope="col" className="px-10 py-3 whitespace-nowrap">
                  Stock
                </th>
                <th scope="col" className="px-10 py-3 whitespace-nowrap">
                  Rating
                </th>
                {/* <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  sales
                </th> */}
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredProducts
                .slice(indexOfFirstProduct, indexOfLastProduct)
                .map((product) => {
                  return (
                    <tr
                      key={product._id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      {/* <td scope="col" className="px-1 pr-2 py-2"> */}
                      {/* <div className="w-[60px]"> */}
                      {/* <Checkbox {...label} size="small" /> */}
                      {/* </div> */}
                      {/* </td> */}

                      <td className="px-10 py-2">
                        <div className="flex items-center gap-4 w-[300px]">
                          <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                            <img
                              src={product.images?.[0]}
                              alt={product.name}
                              className="w-full group-hover:scale-105 transition-all"
                            />
                          </div>
                          <div className="info w-[75%]">
                            <h3 className="font-[600] text-[14px]">
                              {product.name}
                            </h3>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-2">{product.category}</td>
                      {/* <td scope="col" className="px-6 py-2">
                        {product.category}
                      </td> */}
                      <td scope="col" className="px-6 py-2">
                        {product.brand}
                      </td>

                      <td scope="col" className="px-6 py-2">
                        <div className="flex items-center gap-1 flex-col">
                          {/* <span className="oldPrice line-through leading text-gray-500 text-[14px] font-[500]">
                          &#8377; {product.price}
                          </span> */}
                          <span className="price text-primary text-[15px] font-[600]">
                            &#8377; {product.price}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-2 text-center">{product.stock}</td>
                      <td className="px-6 py-2 text-center">
                        {product.rating}
                      </td>

                      {/* <td scope="col" className="px-6 py-2">
                        <p className="text-[14px] w-[100px]">
                          <span className="font-[600]">{product.rating}</span>{" "}
                          sale
                        </p>
                        <ProgressBar value={product.stock} type="warning" />
                      </td> */}

                      <td scope="col" className="px-6 py-2">
                        <div className="flex items-center gap-1">
                          <Button
                            className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]"
                            onClick={() => {
                              setEditProductData(product);
                              const cleanImageNames = product.images?.map(
                                (img) => img.replace("/images/", "")
                              );
                              setImageNames(cleanImageNames);
                              setOpenEditDialog(true);
                            }}
                          >
                            <AiOutlineEdit className="text-[rgba(0,0,0,0.8)] text-[20px]" />
                          </Button>
                          {/* <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                            <IoEyeOutline className="text-[rgba(0,0,0,0.8)] text-[18px]" />
                          </Button> */}
                          <Button
                            className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]"
                            onClick={() => handleOpenDialog(product._id)}
                          >
                            <GoTrash className="text-[rgba(0,0,0,0.8)] text-[18px]" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableEnforceFocus
                disableRestoreFocus
              >
                <DialogTitle id="alert-dialog-title">
                  {"Confirm Delete"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this product?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Cancel</Button>
                  <Button onClick={handleConfirmDelete} autoFocus color="error">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                fullWidth
                maxWidth="sm"
                disableEnforceFocus
                disableRestoreFocus
              >
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent dividers>
                  {editProductData && (
                    <div className="flex flex-col gap-4">
                      <h3 className="text-[14px] font-[500] mb-1 text-black">
                        Product Name
                      </h3>
                      <input
                        type="text"
                        name="name"
                        value={editProductData.name}
                        onChange={handleEditInputChange}
                        placeholder="Product Name"
                        className="border p-2 rounded"
                        required
                      />
                      <h3 className="text-[14px] font-[500] mb-1 text-black">
                        Product Description
                      </h3>
                      <textarea
                        type="text"
                        required
                        name="description"
                        value={editProductData.description}
                        onChange={handleEditInputChange}
                        placeholder="Product Descripation"
                        className="border p-2 rounded"
                      />
                      <h3 className="text-[14px] font-[500] mb-1 text-black">
                        Product Price
                      </h3>
                      <input
                        type="number"
                        required
                        name="price"
                        value={editProductData.price}
                        onChange={handleEditInputChange}
                        placeholder="Price"
                        className="border p-2 rounded"
                      />
                      <h3 className="text-[14px] font-[500] mb-1 text-black">
                        Product Category
                      </h3>
                      <Select
                        labelId="demo-simple-select-label"
                        id="productCatDrop"
                        className="w-full bg-[#fafafa]"
                        size="small"
                        name="category"
                        value={editProductData.category}
                        label="Category"
                        onChange={handleEditInputChange}
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

                      <h3 className="text-[14px] font-[500] mb-1 text-black">
                        Product Brand
                      </h3>
                      <Select
                        labelId="demo-simple-select-label"
                        id="productCatDrop"
                        name="brand"
                        className="w-full bg-[#fafafa]"
                        size="small"
                        value={editProductData.brand}
                        label="Brand"
                        onChange={handleEditInputChange}
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

                      <h3 className="text-[14px] font-[500] mb-1 text-black">
                        Product Stock
                      </h3>
                      <input
                        type="number"
                        required
                        name="stock"
                        value={editProductData.stock}
                        onChange={handleEditInputChange}
                        placeholder="Stock"
                        className="border p-2 rounded"
                      />
                      <h3 className="text-[14px] font-[500] mb-2 text-black">
                        Product Rating
                      </h3>
                      <Rating
                        name="rating"
                        value={editProductData.rating}
                        onChange={handleEditInputChange}
                        precision={0.1}
                      />
                      <div className="col w-full p-5 px-0">
                        <h3 className="font-[700] text-[17px] mb-3">
                          Media & Images
                        </h3>
                        <div className="grid grid-cols-7 gap-4">
                          {imageNames.map((image, index) => (
                            <div
                              key={index}
                              className="uploadBoxWrapper relative"
                            >
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
                          <UploadBox
                            multiple={true}
                            onFilesSelected={handleFilesSelected}
                          />
                        </div>
                        <h1 className="text-red-400">
                          Note : Please Upload Images from images folder only.
                        </h1>
                        <h1 className="text-red-400">
                          Path : Client/public/images
                        </h1>
                      </div>
                    </div>
                  )}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenEditDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdateProduct}
                    variant="contained"
                    color="primary"
                  >
                    Update
                  </Button>
                </DialogActions>
              </Dialog>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end pt-5 pb-5 px-4">
          <Pagination
            count={Math.ceil(filteredProducts.length / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      </div>
    </>
  );
};

export default Products;
