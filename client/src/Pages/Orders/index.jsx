import React, { useContext, useState, PureComponent, useEffect } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";
import Badge from "../../Components/Badge";
import SearchBox from "../../Components/SearchBox";
import { useOrder } from "../../store/order-context";
import { toast } from "react-toastify";

const Orders = () => {
  const { getAllOrders, updatePaymentStatus, updateOrderStatus } = useOrder();
  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("Pending");
  // const isShowOrderProduct = (index) => {
  //   if (isOpenOrderProduct === index) {
  //     setIsOpenOrderProudct(null);
  //   } else {
  //     setIsOpenOrderProudct(index);
  //   }
  // };
  const toggleOrderProducts = (orderId) => {
    setIsOpenOrderProduct((prev) => (prev === orderId ? null : orderId));
  };

  useEffect(() => {
    const getallUserOrders = async () => {
      try {
        const response = await getAllOrders();
        if (response.success) {
          setOrders(response.orders);
        } else {
          toast.error("Failed to fetch Orders");
        }
      } catch (error) {
        console.log(`products frontend error ${error}`);
      }
    };
    getallUserOrders();
  }, []);
  //console.log(orders)

  const handlePaymentStatusChange = async (orderId, status) => {
    try {
      const response = await updatePaymentStatus(orderId, status);
      if (response.success) {
        toast.success(response.message);
        // Update the order status in the state to reflect the change
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, paymentStatus: status } : order
          )
        );
      } else {
        toast.error("Failed to update payment status.");
      }
    } catch (error) {
      console.log(`Error updating payment status: ${error}`);
      toast.error("An error occurred while updating payment status.");
    }
  };
  const handleOrderStatusChange = async (orderId, status) => {
    try {
      const response = await updateOrderStatus(orderId, status);
      if (response.success) {
        toast.success(response.message);
        // Update the order status in the state to reflect the change
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: status } : order
          )
        );
      } else {
        toast.error("Failed to update order status.");
      }
    } catch (error) {
      console.log(`Error updating order status: ${error}`);
      toast.error("An error occurred while updating order status.");
    }
  };
  return (
    <div className="card my-4 shadow-md sm:rounded-lg bg-white">
      <div className="flex items-center justify-between px-5 py-5">
        <h2 className="text-[25px] font-bold font[600]">All Orders</h2>
        {/* <div className="w-[40%]">
          <SearchBox />
        </div> */}
      </div>
      <div className="relative overflow-x-auto mt-5 pb-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                &nbsp;
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Payment Id
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Username
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Phone number
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Address
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Pincode
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Total amount
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                E-mail
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                User Id
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Order Status
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Payment Status
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>
          {/* <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
              <td className="px-6 py-4 font-[500]">
                <Button
                  className="!w-[35px] !h-[35px] !min-w-[35px] rounded-full !bg-[#f1f1f1] "
                  onClick={() => isShowOrderProduct(0)}
                >
                  {isOpenOrderProduct === 0 ? (
                    <FaAngleUp className=" text-black" />
                  ) : (
                    <FaAngleDown className=" text-black" />
                  )}
                </Button>
              </td>
              <td className="px-6 py-4 font-[500]">
                <span className="text-primary font-[600]">
                  {" "}
                  1234557uhrygv345
                </span>
              </td>
              <td className="px-6 py-4 font-[500]">
                <span className="text-primary font-[600]">
                  {" "}
                  1234557uhrygv345
                </span>
              </td>
              <td className="px-6 py-4 font-[500]">Anjali Prajapati</td>
              <td className="px-6 py-4 font-[500]">93437587678</td>
              <td className="px-6 py-4 font-[500]">
                <span className="block w-[400px]">
                  30,Prajapati socitey rajendra park road,odhav, ahmedabad
                </span>
              </td>
              <td className="px-6 py-4 font-[500]">382415</td>
              <td className="px-6 py-4 font-[500]">3000</td>
              <td className="px-6 py-4 font-[500]">anjali@gmail.com</td>
              <td className="px-6 py-4 font-[500]">
                <span className="block w-[300px]">13svg456djfm</span>
              </td>
              <td className="px-6 py-4 font-[500]">
                <Badge status="Pending" />
              </td>
              <td className="px-6 py-4 font-[500]"> 23/03/2025</td>
            </tr>
            <tr>
            <td className="bg-[#ccc]" colSpan="12"></td>
             </tr>
            {isOpenOrderProduct === 0 && (
              <tr>
                <td className="pl-20" colSpan="6">
                  <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Product Id
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Product Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Image
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Sub Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                          <td className="px-6 py-4 font-[500]">
                            <span className="text-primary">
                              {" "}
                              1234557uhrygv345
                            </span>
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <span className="text-primary"> AC</span>
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <img
                              src="/AC_1.png"
                              className="w-[50px] h-[50px] object-cover rounded-md"
                            />
                          </td>
                          <td className="px-6 py-4 font-[500]">2</td>
                          <td className="px-6 py-4 font-[500]">50000</td>
                          <td className="px-6 py-4 font-[500]">45000</td>
                        </tr>
                        <tr>
                          <td className="bg-[#ccc]" colSpan="12"></td>
                        </tr>
                        <tr>
                          <td className="bg-[#f1f1f1]" colSpan="12"></td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                          <td className="px-6 py-4 font-[500]">
                            <span className="text-primary">
                              {" "}
                              1234557uhrygv345
                            </span>
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <span className="text-primary"> AC</span>
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <img
                              src="/AC_1.png"
                              className="w-[50px] h-[50px] object-cover rounded-md"
                            />
                          </td>
                          <td className="px-6 py-4 font-[500]">2</td>
                          <td className="px-6 py-4 font-[500]">50000</td>
                          <td className="px-6 py-4 font-[500]">45000</td>
                        </tr>
                        <tr>
                          <td className="bg-[#ccc]" colSpan="12"></td>
                        </tr>
                        <tr>
                          <td className="bg-[#f1f1f1]" colSpan="12"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            )}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
              <td className="px-6 py-4 font-[500]">
                <Button
                  className="!w-[35px] !h-[35px] !min-w-[35px] rounded-full !bg[#f1f1f1] "
                  onClick={() => isShowOrderProduct(1)}
                >
                  {isOpenOrderProduct === 0 ? (
                    <FaAngleUp className=" text-black" />
                  ) : (
                    <FaAngleDown className=" text-black" />
                  )}
                </Button>
              </td>
              <td className="px-6 py-4 font-[500]">
                <span className="text-primary font-[600]">
                  {" "}
                  1234557uhrygv345
                </span>
              </td>
              <td className="px-6 py-4 font-[500]">
                <span className="text-primary font-[600]">
                  {" "}
                  1234557uhrygv345
                </span>
              </td>
              <td className="px-6 py-4 font-[500]">Anjali Prajapati</td>
              <td className="px-6 py-4 font-[500]">93437587678</td>
              <td className="px-6 py-4 font-[500]">
                <span className="block w-[400px]">
                  30,Prajapati socitey rajendra park road,odhav, ahmedabad
                </span>
              </td>
              <td className="px-6 py-4 font-[500]">382415</td>
              <td className="px-6 py-4 font-[500]">3000</td>
              <td className="px-6 py-4 font-[500]">anjali@gmail.com</td>
              <td className="px-6 py-4 font-[500]">
                <span className="block w-[300px]">13svg456djfm</span>
              </td>
              <td className="px-6 py-4 font-[500]">
                <Badge status="Pending" />
              </td>
              <td className="px-6 py-4 font-[500]"> 23/03/2025</td>
            </tr>
            {isOpenOrderProduct === 1 && (
              <tr>
                <td className="pl-20" colSpan="6">
                  <div className="relative overflow-x-auto mt-5">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Product Id
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Product Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Image
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Quantity
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 whitespace-nowrap"
                          >
                            Sub Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                          <td className="px-6 py-4 font-[500]">
                            <span className="text-primary">
                              {" "}
                              1234557uhrygv345
                            </span>
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <span className="text-primary"> AC</span>
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <img
                              src="/AC_1.png"
                              className="w-[50px] h-[50px] object-cover rounded-md"
                            />
                          </td>
                          <td className="px-6 py-4 font-[500]">2</td>
                          <td className="px-6 py-4 font-[500]">50000</td>
                          <td className="px-6 py-4 font-[500]">45000</td>
                        </tr>
                        <tr>
                          <td className="bg-[#ccc]" colSpan="12"></td>
                        </tr>
                        <tr>
                          <td className="bg-[#f1f1f1]" colSpan="12"></td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                          <td className="px-6 py-4 font-[500]">
                            <span className="text-primary">
                              {" "}
                              1234557uhrygv345
                            </span>
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <span className="text-primary"> AC</span>
                          </td>
                          <td className="px-6 py-4 font-[500]">
                            <img
                              src="/AC_1.png"
                              className="w-[50px] h-[50px] object-cover rounded-md"
                            />
                          </td>
                          <td className="px-6 py-4 font-[500]">2</td>
                          <td className="px-6 py-4 font-[500]">50000</td>
                          <td className="px-6 py-4 font-[500]">45000</td>
                        </tr>
                        <tr>
                          <td className="bg-[#ccc]" colSpan="12"></td>
                        </tr>
                        <tr>
                          <td className="bg-[#f1f1f1]" colSpan="12"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            )}
          </tbody> */}
          <tbody>
            {orders.map((order, index) => (
              <React.Fragment key={order._id}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">
                    <Button
                      className="!w-[35px] !h-[35px] !min-w-[35px] rounded-full !bg-[#f1f1f1]"
                      onClick={() => toggleOrderProducts(order._id)}
                    >
                      {isOpenOrderProduct === order._id ? (
                        <FaAngleUp className="text-black" />
                      ) : (
                        <FaAngleDown className="text-black" />
                      )}
                    </Button>
                  </td>
                  <td className="px-6 py-4">{order._id}</td>
                  <td className="px-6 py-4">
                    {order.razorpayOrderId ? order.razorpayOrderId : order._id}
                  </td>
                  <td className="px-6 py-4">{order.user.username}</td>
                  <td className="px-6 py-4">{order.user.phone}</td>
                  <td className="px-6 py-4">
                    <span className="block w-[400px]">
                      {order.address.houseNo}, {order.address.street},{" "}
                      {order.address.landmark}, {order.address.city},{" "}
                      {order.address.state}
                    </span>
                  </td>
                  <td className="px-6 py-4">{order.address.pincode}</td>
                  <td className="px-6 py-4">{order.finalPrice}</td>
                  <td className="px-6 py-4">{order.user.email}</td>
                  <td className="px-6 py-4">
                    <span className="block w-[300px]">{order.user._id}</span>
                  </td>
                  <td className="px-6 py-4">
                    {order.orderStatus !== "Delivered" ? (
                      <FormControl variant="outlined">
                        <InputLabel>Order Status</InputLabel>
                        <Select
                          value={order.orderStatus}
                          onChange={(e) =>
                            handleOrderStatusChange(order._id, e.target.value)
                          }
                          label="Order Status"
                        >
                          <MenuItem value="Processing">Processing</MenuItem>
                          <MenuItem value="Shipped">Shipped</MenuItem>
                          <MenuItem value="Delivered">Delivered</MenuItem>
                          
                        </Select>
                      </FormControl>
                    ) : (
                      <Badge status={order.orderStatus} />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {order.paymentStatus === "Pending" ? (
                      <FormControl variant="outlined">
                        <InputLabel>Payment Status</InputLabel>
                        <Select
                          value={order.paymentStatus}
                          onChange={(e) =>
                            handlePaymentStatusChange(order._id, e.target.value)
                          }
                          label="Payment Status"
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Paid">Paid</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      <Badge status={order.paymentStatus} />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                    })}
                  </td>
                </tr>

                {isOpenOrderProduct === order._id && (
                  <tr>
                    <td className="pl-20" colSpan="12">
                      <div className="relative overflow-x-auto mt-5">
                        <table className="w-full text-sm text-left text-gray-500">
                          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                              <th className="px-6 py-3">Product Id</th>
                              <th className="px-6 py-3">Title</th>
                              <th className="px-6 py-3">Image</th>
                              <th className="px-6 py-3">Qty</th>
                              <th className="px-6 py-3">Price</th>
                              <th className="px-6 py-3">Sub Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.products?.map((prod) => (
                              <tr
                                key={prod._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                              >
                                <td className="px-6 py-4">
                                  {prod.product._id}
                                </td>
                                <td className="px-6 py-4">
                                  {prod.product.name}
                                </td>
                                <td className="px-6 py-4">
                                  <img
                                    src={prod.product.images[0]}
                                    alt={prod.product.name}
                                    className="w-[50px] h-[50px] object-cover rounded-md"
                                  />
                                </td>
                                <td className="px-6 py-4">{prod.quantity}</td>
                                <td className="px-6 py-4">
                                  {prod.product.price}
                                </td>
                                <td className="px-6 py-4">{prod.totalPrice}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
