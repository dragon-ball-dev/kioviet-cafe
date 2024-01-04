import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import Nav from './Nav';
import { addOrder, addOrderItem, createPayment, deleteCartItem, getAllCartByUser, getAllCategory, getAllOrderItem, getAllProduct, updateCartItemQuantity } from '../../services/fetch/ApiUtils';
import { toast } from 'react-toastify';



function Cart(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const history = useNavigate();
    const [customerName, setCustomerName] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [employeeName, setEmployeeName] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);
    const [storeName, setStoreName] = useState("");
    const [storeId, setStoreId] = useState("");
    const [supplyId, setSupplyId] = useState("");
    const [tableData, setTableData] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {

        calculateTotalPrice();
    }, [tableData]);

    const fetchData = () => {
        // Gọi API để lấy dữ liệu cho giỏ hàng, ví dụ: getCartItems()
        // Thay thế đoạn mã dưới đây với cuộc gọi API của bạn
        getAllCartByUser(1, 10)
            .then((response) => {
                console.log(response);
                setEmployeeName(response.data.content[0].user.name);
                setCustomerName(response.data.content[0].customer.name)
                setCustomerId(response.data.content[0].customer.id)
                setStoreName(response.data.content[0].store.name)
                setStoreId(response.data.content[0].store.id)
                setSupplyId(response.data.content[0].supply.id)
                setTableData(response.data.content);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const calculateTotalPrice = () => {
        let total = 0;
        tableData.forEach((item) => {
            total += item.product.price * item.quantity;
        });
        setTotalAmount(total);
    };

    const handleUpdateQuantity = (itemId, newQuantity) => {
        updateCartItemQuantity({ idCart: itemId, quantity: newQuantity })
        const updatedTableData = tableData.map((item) => {
            if (item.id === itemId) {
                return {
                    ...item,
                    quantity: newQuantity,
                };
            }
            return item;
        });
        setTableData(updatedTableData);
    };

    const handleDeleteItem = (itemId) => {
        // Xóa sản phẩm khỏi giỏ hàng
        const updatedTableData = tableData.filter((item) => item.id !== itemId);
        setTableData(updatedTableData);
    };

    const handleRedirectCheckout = () => {
        // Chuyển hướng đến trang thanh toán
        const orderRequest = { customerId, totalPrice: totalAmount, storeId, supplyId, paymentId: paymentMethod, cartResponses: tableData, userId: 1 };

        if(paymentMethod === "" ) {
            toast.error("Vui lòng chọn phương thức thanh toán")
        }
        if (paymentMethod === 1 || paymentMethod === 3) {
            addOrder(orderRequest)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error.error);
                });
                window.open('/invoice', '_blank');
        } else {
            createPayment(orderRequest)
                .then((response) => {
                    console.log(response.data);
                    window.location.href = response.url; // Chuyển hướng đến URL nhận được từ phản hồi
                })
                .catch((error) => {
                    console.log(error.error);
            });
        }
    };

    return (
        <>
            <div className="wrapper">
                <nav id="sidebar" className="sidebar js-sidebar">
                    <div className="sidebar-content js-simplebar">
                        <a className="sidebar-brand" href="index.html">
                            <span className="align-middle">Kioviet Cafe</span>
                        </a>
                        <SidebarNav role={role} />
                    </div>
                </nav>

                <div className="main">
                    <Nav onLogout={onLogout} currentUser={currentUser} />

                    <br />
                    <div className="container-fluid p-0"></div>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Giỏ hàng khách mua</h5>
                        </div>
                        <div className="card-body">
                            <div
                                id="datatables-buttons_wrapper"
                                className="dataTables_wrapper dt-bootstrap5 no-footer"
                            >
                                <div className="row">
                                    <div className="col-sm-12 col-md-4">
                                        Khách hàng: <b>{customerName}</b>
                                        <br></br>
                                        Nhân viên: <b>{employeeName}</b>
                                        <br></br>
                                        Cửa hàng: <b>{storeName}</b>
                                    </div>
                                </div>
                                <br></br>
                                <div className="row dt-row">
                                    <div className="col-sm-12">
                                        <table
                                            id="datatables-buttons"
                                            className="table table-striped dataTable no-footer dtr-inline"
                                            style={{ width: "100%" }}
                                            aria-describedby="datatables-buttons_info"
                                        >
                                            <thead>
                                                <tr>
                                                    <th className="sorting sorting_asc" tabIndex="0" style={{ width: "224px" }}>
                                                        Tên sản phẩm
                                                    </th>
                                                    <th className="sorting sorting_asc" tabIndex="0" style={{ width: "224px" }}>
                                                        Giá
                                                    </th>
                                                    <th className="sorting sorting_asc" tabIndex="0" style={{ width: "224px" }}>
                                                        Số Lượng
                                                    </th>
                                                    <th className="sorting sorting_asc" tabIndex="0" style={{ width: "224px" }}>
                                                        Nhà cung cấp
                                                    </th>
                                                    <th className="sorting" tabIndex="0" style={{ width: "175px" }}>
                                                        Thành Tiền
                                                    </th>
                                                    <th className="sorting" tabIndex="0" style={{ width: "75px" }}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableData?.map((item) => (
                                                    <tr className="odd" key={item.id}>
                                                        <td className="dtr-control sorting_1" tabIndex="0">
                                                            {item?.product?.name}
                                                        </td>
                                                        <td className="dtr-control sorting_1" tabIndex="0">
                                                            {item?.product?.price?.toLocaleString("en-US", {
                                                                style: "currency",
                                                                currency: "USD",
                                                            })}
                                                        </td>
                                                        <td className="dtr-control sorting_1" tabIndex="0">
                                                            <input
                                                                type="number"
                                                                min="1"
                                                                value={item.quantity}
                                                                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                                                            />
                                                        </td>
                                                        <td className="dtr-control sorting_1" tabIndex="0">
                                                            {item?.supply.name}
                                                        </td>
                                                        <td className="dtr-control" tabIndex="0">
                                                            {(item.product.price * item.quantity).toLocaleString("en-US", {
                                                                style: "currency",
                                                                currency: "USD",
                                                            })}
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteItem(item.id)}>
                                                                Xóa
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <select
                                            className="form-select form-select-sm"
                                            aria-label=".form-select-sm example"
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        >
                                            <option value="">--Chọn phương thanh toán--</option>
                                            <option value="1">Tiền mặt</option>
                                            <option value="2">Thanh toán Vnpay</option>
                                            <option value="3">Quẹt thẻ</option>
                                        </select>
                                    </div>
                                </div>
                                <br></br>
                                <div className="row">
                                    <div className="col-sm-12 col-md-8">
                                        <button type="button" class="btn btn-success" onClick={handleRedirectCheckout}>Thanh toán</button>
                                    </div>
                                    <div className="col-sm-12 col-md-4" style={{ textAlign: 'right' }}>
                                        <h3>
                                            Tổng Tiền :{" "}
                                            {totalAmount.toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;