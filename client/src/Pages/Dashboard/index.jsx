import React, { useContext, useState, PureComponent, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DashboardBoxes from "../../Components/DashboardBoxes";
import { FaHandSparkles } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa";
import Badge from "../../Components/Badge";
import { FaAngleUp } from "react-icons/fa6";
import Checkbox from "@mui/material/Checkbox";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import Select from "@mui/material/Select";
import { Menu, InputLabel, FormControl } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { PiExportBold } from "react-icons/pi";
import Pagination from "@mui/material/Pagination";
import ProgressBar from "../../Components/ProgressBar";
import { MyContext } from "../../App";
import { useAuth } from "../../store/auth";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import { useOrder } from "../../store/order-context";

const Dashboard = () => {
  const [isOpenOrderProduct, setIsOpenOrderProudct] = useState(null);
  const { getAllOrders, updatePaymentStatus, updateOrderStatus } = useOrder();
  //  const [isOpenOrderProduct, setIsOpenOrderProduct] = useState(null);
  const [orders, setOrders] = useState([]);
  const [chart1Data, setChart1Data] = useState([]);
  const isShowOrderProduct = (index) => {
    if (isOpenOrderProduct === index) {
      setIsOpenOrderProudct(null);
    } else {
      setIsOpenOrderProudct(index);
    }
  };
  const toggleOrderProducts = (orderId) => {
    setIsOpenOrderProudct((prev) => (prev === orderId ? null : orderId));
  };
  const { user } = useAuth();
  useEffect(() => {
    const getallUserOrders = async () => {
      try {
        const response = await getAllOrders();
        if (response.success) {
          setOrders(response.orders);
          const newChartData = calculateChartData(response.orders);
          setChart1Data(newChartData); // Set the chart data dynamically
        } else {
          toast.error("Failed to fetch Orders");
        }
      } catch (error) {
        console.log(`products frontend error ${error}`);
      }
    };
    getallUserOrders();
  }, []);
  const context = useContext(MyContext);
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
  const [categoryFilterVal, setCategoryFilterVal] = React.useState("");
  const calculateChartData = (orders) => {
    const chartData = [];

    // Group orders by month
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    months.forEach((month, index) => {
      const totalSales = orders
        .filter((order) => new Date(order.createdAt).getMonth() === index)
        .reduce((acc, order) => acc + order.finalPrice, 0);

      const totalUsers = new Set(
        orders
          .filter((order) => new Date(order.createdAt).getMonth() === index)
          .map((order) => order.user._id)
      ).size;

      chartData.push({
        name: month,
        TotalSales: totalSales,
        TotalUsers: totalUsers,
        amt: 2400, // Optional: Can add an amount or any other metric
      });
    });

    return chartData;
  };

  // const [chart1Data, setChart1Data] = useState([
  //   {
  //     name: "JAN",
  //     TotalSales: 4000,
  //     TotalUsers: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "FEB",
  //     TotalSales: 3000,
  //     TotalUsers: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "MARCH",
  //     TotalSales: 2000,
  //     TotalUsers: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "APRTIL",
  //     TotalSales: 2780,
  //     TotalUsers: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "MAY",
  //     TotalSales: 1890,
  //     TotalUsers: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "JUNE",
  //     TotalSales: 2390,
  //     TotalUsers: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "JULY",
  //     TotalSales: 3490,
  //     TotalUsers: 4300,
  //     amt: 2100,
  //   },
  //   {
  //     name: "AUG",
  //     TotalSales: 3490,
  //     TotalUsers: 4300,
  //     amt: 2100,
  //   },
  //   {
  //     name: "SEPT",
  //     TotalSales: 3490,
  //     TotalUsers: 4300,
  //     amt: 2100,
  //   },
  //   {
  //     name: "OCT",
  //     TotalSales: 3490,
  //     TotalUsers: 4300,
  //     amt: 2100,
  //   },
  //   {
  //     name: "NOV",
  //     TotalSales: 3490,
  //     TotalUsers: 4300,
  //     amt: 2100,
  //   },
  //   {
  //     name: "DEC",
  //     TotalSales: 3490,
  //     TotalUsers: 4300,
  //     amt: 2100,
  //   },
  // ]);

  const handleChangecatFil = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  return (
    <>
      <div className="w-full p-5 py-4 px-5 bg-[#f1f1ff] border border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5 justify-between rounded-md">
        <div className="info">
          <h1 className="text-[30px] font-bold leading-10 mb-3">
            Hello,
            <br /> {user.username}
            <FaHandSparkles className="text-[35px] inline-block text-yellow-500" />
          </h1>
          <p>
            Here's what happening on your store today. See the Information at
            once.
          </p>
          <br />
          <Button
            className="btn-blue !capitalize"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }
          >
            <IoMdAdd /> Add Product
          </Button>
        </div>
        <img src="/images/admin.jpg " className="w-[260px] mix-blend-darken" />
      </div>
      <DashboardBoxes />
      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[15px] font-bold font[600]">Recent Orders</h2>
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
                  name
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  Phone number
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  address
                </th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                  pincode
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
            <tbody>
              {[...orders]
                .slice(-5)
                .reverse()
                .map((order, index) => (
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
                        {order.razorpayOrderId
                          ? order.razorpayOrderId
                          : order._id}
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
                        <span className="block w-[300px]">
                          {order.user._id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {order.orderStatus !== "Delivered" ? (
                          <FormControl variant="outlined">
                            <InputLabel>Order Status</InputLabel>
                            <Select
                              value={order.orderStatus}
                              onChange={(e) =>
                                handleOrderStatusChange(
                                  order._id,
                                  e.target.value
                                )
                              }
                              label="Order Status"
                            >
                              <MenuItem value="Processing">Processing</MenuItem>
                              <MenuItem value="Shipped">Shipped</MenuItem>
                              <MenuItem value="Delivered">Delivered</MenuItem>
                              {/* <MenuItem value="Cancelled">Cancelled</MenuItem> */}
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
                                handlePaymentStatusChange(
                                  order._id,
                                  e.target.value
                                )
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
                                    <td className="px-6 py-4">
                                      {prod.quantity}
                                    </td>
                                    <td className="px-6 py-4">
                                      {prod.product.price}
                                    </td>
                                    <td className="px-6 py-4">
                                      {prod.totalPrice}
                                    </td>
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

      <div className="card my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5">
          <h2 className="text-[18px] font-[600]">Total Users & Total Sales</h2>
        </div>
        <div className="flex items-center gap-5 px-5 py-5 pt-1">
          <span className="flex items-center gap-1 font-[15px]">
            <span className="block w-[8px] h-[8px] rounded-full bg-green-600"></span>
            Total Users
          </span>
          <span className="flex items-center gap-1 font-[15px]">
            <span className="block w-[8px] h-[8px] rounded-full bg-purple-700"></span>
            Total Sales
          </span>
        </div>
        {/* <LineChart
          width={1000}
          height={500}
          data={chart1Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="none" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="TotalSales"
            stroke="#8884d8"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="TotalUsers"
            stroke="#82ca9d"
            strokeWidth={3}
          />
        </LineChart> */}
        <LineChart
          width={1000}
          height={500}
          data={chart1Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="none" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="TotalSales"
            stroke="#8884d8"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="TotalUsers"
            stroke="#82ca9d"
            strokeWidth={3}
          />
        </LineChart>
      </div>
    </>
  );
};

export default Dashboard;
