import React, { useContext, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import SearchBox from "../../components/SearchBox";
import { MdLocalPhone } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material"; 

import { MyContext } from "../../App";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
   const [openDialog, setOpenDialog] = useState(false);

  const getAllReviews = async () => {
    try {
      const response = await fetch(
        "https://electroera.onrender.com/api/review/getAllReviews",
        {
          method: "GET",
        }
      );

      const data = await response.json();

      setReviews(data.message);

      if (reviews.length <= 0) {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenDialog = (reviewId) => {
    setSelectedReviewId(reviewId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReviewId(null);
  };

const handleConfirmDelete = async () => {
    // Implement the delete logic here
    //console.log("Deleting product with ID:", selectedProductId);
    try {
      const response = await fetch(
        "https://electroera.onrender.com/api/review/deleteReview",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: selectedReviewId }),
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
  useEffect(() => {
    getAllReviews();
  }, []);
  // console.log(reviews)

  const context = useContext(MyContext);
  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3"></div>

      <div className="card my-4 shadow-md pt-5 sm:rounded-lg bg-white">
        <div className="flex items-center w-full px-5 justify-between">
          <div className="col w-[20%]">
            <h2 className="text-[18px] font-bold font[600]">Reviews List </h2>
            <h2 className="text-[18px] font-bold font[600]">
              Total Reviews : {reviews.length}{" "}
            </h2>
          </div>

          {/* <div className="col w-[40%] ml-auto">
            <SearchBox />
          </div> */}
        </div>
        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-5">
              <tr className="p-5">
                {/* <th scope="col" className="px-1 pr-0 py-3" width="10%">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </th> */}
                <th scope="col" className="px-5 py-3 whitespace-nowrap ml-20">
                  User ID
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  User Email
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  User Name
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Product ID
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Rating
                </th>
                 <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Comment
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="p-5">
              {reviews.map((review) => (
                <tr
                  key={review._id}
                  className="odd:bg-white text-black odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  {/* <td scope="col" className="px-1 pr-2 py-2">
                    <div className="w-[60px]">
                      <Checkbox {...label} size="small" />
                    </div>
                  </td> */}

                  <td className="px-5 py-2 ml-5">
                    <span className="flex items-center gap-2">
                      {review.user._id}
                    </span>
                  </td>

                  {/* <td className="px-6 py-2">{review.user.username}</td> */}

                  <td scope="col" className="px-6 py-2">
                    <span className="flex items-center gap-2">
                      <MdOutlineMarkEmailRead />
                      {review.user.email}
                    </span>
                  </td>

                  <td scope="col" className="px-6 ml-1 py-2">
                    <span className="flex items-center gap-1">
                      {review.user.username}
                    </span>
                  </td>

                  <td scope="col" className="px-6 py-2">
                    <span className="flex items-center gap-2">
                      {review.product._id}
                    </span>
                  </td>
                  <td scope="col" className="px-6 py-2">
                    <span className="flex items-center gap-2">
                      {review.product.name}
                    </span>
                  </td>
                  <td scope="col" className="px-6 py-2">
                    <span className="flex items-center gap-2">
                      {review.rating}
                    </span>
                  </td>
                  <td scope="col" className="px-6 py-2">
                    <span className="flex items-center gap-2">
                      {review.comment}
                    </span>
                  </td>
                  <td scope="col" className="px-6 py-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      onClick={() => handleOpenDialog(review._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
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
                    Are you sure you want to delete this Review?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Cancel</Button>
                  <Button onClick={handleConfirmDelete} autoFocus color="error">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </tbody>
          </table>
        </div>
        {/* <div className="flex items-center justify-end pt-5 pb-5 px-4">
          <Pagination count={10} color="primary" />
        </div> */}
      </div>
    </>
  );
};

export default Reviews;
