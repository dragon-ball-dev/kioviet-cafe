import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import Nav from './Nav';
import { addOrder, addOrderItem, deleteCartItem, getAllCategory, getAllOrderItem, getAllProduct, updateCartItemQuantity } from '../../services/fetch/ApiUtils';
import { toast } from 'react-toastify';


function Cart(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const history = useNavigate();

    const [tableData, setTableData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [store, setStore] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        // Call your API to fetch data for the cart, e.g., getCartItems()
        // Replace the following code with your API call
        getAllOrderItem()
            .then(response => {
                console.log(response)
                setTableData(response.data);
                calculateTotalAmount(response.data);
                setStore(response.storeId)
            })
            .catch(error => {
                console.log(error);
            });
    };

    const calculateTotalAmount = (data) => {
        let total = 0;
        data.forEach((item) => {
            total += item?.product?.price * item?.quantity;
        });
        setTotalAmount(total);
    };

    const handleUpdateQuantity = (itemId, quantity, id) => {
        updateCartItemQuantity(itemId, quantity)
            .then(response => {
                console.log(response.message);
                fetchData();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleDeleteItem = (itemId) => {
        deleteCartItem(itemId)
            .then(response => {
                console.log(response.message);
                fetchData();
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleRedirectCheckout = () => {
        const orderRequest = { totalPrice: totalAmount, storeId: 1 };
        addOrder(orderRequest).then((response) => {
            console.log(response.data);
        })
            .catch((error) => {
                console.log(error.error);
            });
        history('/checkout');
    };

    return (
        <>
            <div className="wrapper">
                <nav id="sidebar" className="sidebar js-sidebar">
                    <div className="sidebar-content js-simplebar">
                        <a className="sidebar-brand" href="index.html">
                            <span className="align-middle">Kioviet Cafe</span>
                        </a>
                        <SidebarNav />
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
                                    <div className="col-sm-12 col-md-6">
                                        <div className="dt-buttons btn-group flex-wrap">
                                            <button
                                                className="btn btn-secondary buttons-copy buttons-html5"
                                                tabIndex="0"
                                                aria-controls="datatables-buttons"
                                                type="button"
                                                onClick={handleRedirectCheckout}
                                            >
                                                Tiếp Tục Thanh Toán
                                            </button>
                                        </div>
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
                                                    <th
                                                        className="sorting sorting_asc"
                                                        tabIndex="0"
                                                        aria-controls="datatables-buttons"
                                                        rowspan="1"
                                                        colspan="1"
                                                        style={{ width: "224px" }}
                                                    >
                                                        Tên sản phẩm
                                                    </th>
                                                    <th
                                                        className="sorting sorting_asc"
                                                        tabIndex="0"
                                                        aria-controls="datatables-buttons"
                                                        rowspan="1"
                                                        colspan="1"
                                                        style={{ width: "224px" }}
                                                    >
                                                        Giá
                                                    </th>
                                                    <th
                                                        className="sorting sorting_asc"
                                                        tabIndex="0"
                                                        aria-controls="datatables-buttons"
                                                        rowspan="1"
                                                        colspan="1"
                                                        style={{ width: "224px" }}
                                                    >
                                                        Số Lượng
                                                    </th>
                                                    <th
                                                        className="sorting"
                                                        tabIndex="0"
                                                        aria-controls="datatables-buttons"
                                                        rowspan="1"
                                                        colspan="1"
                                                        style={{ width: "175px" }}
                                                    >
                                                        Thành Tiền
                                                    </th>
                                                    <th
                                                        className="sorting"
                                                        tabIndex="0"
                                                        aria-controls="datatables-buttons"
                                                        rowspan="1"
                                                        colspan="1"
                                                        style={{ width: "75px" }}
                                                    >

                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableData?.map((item) => (
                                                    <tr className="odd">
                                                        <td className="dtr-control sorting_1" tabIndex="0">
                                                            {item?.product?.name}
                                                        </td>
                                                        <td className="dtr-control sorting_1" tabIndex="0">
                                                            {item?.product?.price.toLocaleString("en-US", {
                                                                style: "currency",
                                                                currency: "VND",
                                                            })}
                                                        </td>
                                                        <td className="dtr-control sorting_1" tabIndex="0">
                                                            <input
                                                                type="number"
                                                                className="form-control rounded shadow-sm"
                                                                name='quantity'
                                                                value={quantity}
                                                                onChange={(e) => {
                                                                    const newQuantity = e.target.value;
                                                                    setQuantity(newQuantity); // Cập nhật state quantity
                                                                    handleUpdateQuantity(item.id, newQuantity); // Gọi hàm handleUpdateQuantity
                                                                }}
                                                            />
                                                        </td>
                                                        <td className="dtr-control sorting_1" tabIndex="0">
                                                            {(item.quantity * item.product.price).toLocaleString("en-US", {
                                                                style: "currency",
                                                                currency: "VND",
                                                            })}
                                                        </td>
                                                        <td>
                                                            &nbsp;
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger"
                                                                onClick={() => handleDeleteItem(item.id)}
                                                            >
                                                                Xoá
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div style={{ textAlign: "right", paddingTop: "20px" }}>
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
        </>
    );
}

export default Cart;