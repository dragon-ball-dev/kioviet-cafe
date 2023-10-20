import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import Nav from './Nav';
import { getAllCategory, getAllProduct } from '../../services/fetch/ApiUtils';


function Cart(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const history = useNavigate();

    const [tableData, setTableData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        // Call your API to fetch data for the cart, e.g., getCartItems()
        // Replace the following code with your API call
        getAllProduct(0, 1000, '')
          .then(response => {
            setTableData(response.content);
            calculateTotalAmount(response.content);
          })
          .catch(error => {
            console.log(error);
          });
    };

    const calculateTotalAmount = (data) => {
        let total = 0;
        data.forEach((item) => {
            total += item.price * item.totalQuantity;
        });
        setTotalAmount(total);
    };

    const handleUpdateQuantity = (itemId, quantity) => {
        // Call your API to update the quantity of an item in the cart, e.g., updateCartItemQuantity(itemId, quantity)
        // Replace the following code with your API call
        // updateCartItemQuantity(itemId, quantity)
        //   .then(response => {
        //     console.log(response.message);
        //     fetchData();
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
    };

    const handleDeleteItem = (itemId) => {
        // Call your API to delete an item from the cart, e.g., deleteCartItem(itemId)
        // Replace the following code with your API call
        // deleteCartItem(itemId)
        //   .then(response => {
        //     console.log(response.message);
        //     fetchData();
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
    };

    const handleRedirectCheckout = () => {
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
                                                Thành Toán Tiền Mặt
                                            </button>
                                            &nbsp;
                                            <button
                                                className="btn btn-secondary buttons-copy buttons-html5"
                                                tabIndex="0"
                                                aria-controls="datatables-buttons"
                                                type="button"
                                                onClick={handleRedirectCheckout}
                                            >
                                                Chuyển Khoản
                                            </button>
                                            &nbsp;
                                            <button
                                                className="btn btn-secondary buttons-copy buttons-html5"
                                                tabIndex="0"
                                                aria-controls="datatables-buttons"
                                                type="button"
                                                onClick={handleRedirectCheckout}
                                            >
                                                In Hóa Đơn
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
                                                        Hình Ảnh
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
                                                        style={{ width: "175px" }}
                                                    >
                                                        
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tableData?.map((item) => (
                                                    <tr className="odd">
                                                        <td className="dtr-control sorting_1" tabIndex="0">
                                                            {item.name}
                                                        </td>
                                                        <td className="dtr-control sorting_1" tabIndex="0">
                                                            <img
                                                                src="../../assets/img/photos/unsplash-2.jpg"
                                                                alt="Charles Hall"
                                                                style={{ width: "50%" }}
                                                            />
                                                        </td>
                                                        <td className="dtr-control sorting_1" tabIndex="0">
                                                            {item.price.toLocaleString("en-US", {
                                                                style: "currency",
                                                                currency: "VND",
                                                            })}
                                                        </td>
                                                        <td className="dtr-control sorting_1" tabIndex="0">
                                                            <input
                                                                type="number"
                                                                className="form-control rounded shadow-sm"
                                                                value={item.totalQuantity}
                                                                onChange={(e) =>
                                                                    handleUpdateQuantity(
                                                                        item.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td className="dtr-control sorting_1" tabIndex="0">
                                                        {(item.totalQuantity * item.price).toLocaleString("en-US", {
                                                                    style: "currency",
                                                                    currency: "VND",
                                                                })}
                                                        </td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="btn btn-primary"
                                                                onClick={() =>
                                                                    handleUpdateQuantity(item.id, item.quantity)
                                                                }
                                                            >
                                                                Cập nhật
                                                            </button>{" "}
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