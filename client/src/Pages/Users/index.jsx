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

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSeelectedUserId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const { authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      const data = await response.json();
      //console.log(data)
      setUsers(data.message);

      if (users.length <= 0) {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  const context = useContext(MyContext);

  const handleOpenDialog = (userId) => {
    setSeelectedUserId(userId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSeelectedUserId(null);
  };

  const handleConfirmDelete = async () => {
    // Implement the delete logic here
    //console.log("Deleting product with ID:", selectedProductId);
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/makeUserAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: selectedUserId }),
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

  return (
    <>
      <div className="flex items-center justify-between px-2 py-0 mt-3"></div>

      <div className="card my-4 shadow-md pt-5 sm:rounded-lg bg-white">
        <div className="flex items-center w-full px-5 justify-between">
          <div className="col w-[20%]">
            <h2 className="text-[18px] font-bold font[600]">Users List </h2>
            <h2 className="text-[18px] font-bold font[600]">
              Total Users : {users.length}{" "}
            </h2>
          </div>

          {/* <div className="col w-[40%] ml-auto">
            <SearchBox />
          </div> */}
        </div>
        <div className="relative overflow-x-auto mt-5 pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {/* <th scope="col" className="px-1 pr-0 py-3" width="10%">
                  <div className="w-[60px]">
                    <Checkbox {...label} size="small" />
                  </div>
                </th> */}
                {/* <th scope="col" className="px-2 py-3 whitespace-nowrap">
                  User Image
                </th> */}
                <th scope="col" className="px-6 py-7 whitespace-nowrap ml-7">
                  User Name
                </th>
                <th scope="col" className="px-6 py-7 whitespace-nowrap">
                  User Email
                </th>
                <th scope="col" className="px-6 py-7 whitespace-nowrap">
                  User Phone No.
                </th>
                {/* <th scope="col" className="px-6 py-7 whitespace-nowrap">
                  Created
                </th> */}
                <th scope="col" className="px-6 py-7 whitespace-nowrap">
                  isAdmin
                </th>
                <th scope="col" className="px-6 py-7 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="odd:bg-white text-black odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  {/* <td scope="col" className="px-1 pr-2 py-2">
                    <div className="w-[60px]">
                      <Checkbox {...label} size="small" />
                    </div>
                  </td> */}

                  {/* <td className="px-0 py-2">
                    <div className="flex items-center gap-4 w-[100px]">
                      <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                        <img
                          src={user.image}
                          alt={user.username}
                          className="w-full group-hover:scale-105 transition-all"
                        />
                      </div>
                    </div>
                  </td> */}

                  <td className="px-6 py-7 ml-7">{user.username}</td>

                  <td scope="col" className="px-6 py-7">
                    <span className="flex items-center gap-2">
                      <MdOutlineMarkEmailRead />
                      {user.email}
                    </span>
                  </td>

                  <td scope="col" className="px-6 ml-1 py-2">
                    <span className="flex items-center gap-1">
                      <MdLocalPhone />
                      {user.phone}
                    </span>
                  </td>

                  {/* <td scope="col" className="px-6 py-7">
                    <span className="flex items-center gap-2">
                      <SlCalender />
                      {user.date}
                    </span>
                  </td> */}
                  <td scope="col" className="px-6 py-7">
                    <span className="flex items-center gap-2">
                      {user.isAdmin === true ? "true" : "false"}
                    </span>
                  </td>

                  <td scope="col" className="px-6 py-7">
                    {user.isAdmin === false ? (
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-3 rounded text-sm cursor-pointer"
                        onClick={() => handleOpenDialog(user._id)}
                      >
                        Make Admin
                      </button>
                    ) : (
                      <span className="flex items-center gap-2">
                      
                      Already Admin
                    </span>
                    )}
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
                  {"Confirm Make Admin"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to Make this User An Admin?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Cancel</Button>
                  <Button onClick={handleConfirmDelete} autoFocus color="error">
                    Make Admin
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

export default Users;
