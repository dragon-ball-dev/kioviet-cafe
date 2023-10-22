import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import Nav from './Nav';
import { addOrder, addOrderItem, changeOrderItem, getAllCategory, getAllOrderItem, getAllProduct, payment } from '../../services/fetch/ApiUtils';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { toast } from 'react-toastify';


function Checkout(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const history = useNavigate();

    const [tableData, setTableData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [store, setStore] = useState(0);
    const invoicePrintRef = useRef();

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

    const handleUpdateQuantity = (itemId, quantity) => {
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

    const handleRedirectCheckoutOff = () => {
        tableData?.map((item) => (
            changeOrderItem(item.id).then((response) => {
                console.log(response.data);
            })
                .catch((error) => {
                    console.log(error.error);
                })
        ))

        const paymentRequest = { date: "2023-09-09", method: "Thanh toan tien mat", orderId: 1, amount: totalAmount, isLock : true }

        payment(paymentRequest).then((response) => {
            toast.success("Thanh toán tiền mặt thành công")
            console.log(response)
        })




    };

    const handleRedirectCheckoutOn = () => {
        // const orderRequest = { totalPrice: totalAmount, storeId: 1 };


        const paymentRequest = { date: "2023-09-09", method: "Thanh toan Onl", orderId: 1, amount: totalAmount, isLock : true }

        payment(paymentRequest);

        tableData?.map((item) => (
            changeOrderItem(item.id).then((response) => {
                console.log(response.data);
            })
                .catch((error) => {
                    console.log(error.error);
                })
        ))
        history('/checkout-on');
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
                            <h5 className="card-title">Hóa đơn</h5>
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
                                                onClick={handleRedirectCheckoutOff}
                                            >
                                                Thanh Toán Tiền Mặt
                                            </button>
                                            &nbsp;
                                            <button
                                                className="btn btn-secondary buttons-copy buttons-html5"
                                                tabIndex="0"
                                                aria-controls="datatables-buttons"
                                                type="button"
                                                onClick={handleRedirectCheckoutOn}
                                            >
                                                Thanh Toán Chuyển Khoản
                                            </button>
                                            &nbsp;
                                            <ReactToPrint
                                                trigger={() => (
                                                    <button
                                                        className="btn btn-secondary buttons-copy buttons-html5"
                                                        tabIndex="0"
                                                        aria-controls="datatables-buttons"
                                                        type="button"
                                                    >
                                                        In Hóa Đơn
                                                    </button>
                                                )}
                                                content={() => invoicePrintRef.current}
                                                documentTitle="Hóa đơn"
                                                pageStyle="print"
                                            />

                                        </div>
                                    </div>
                                </div>
                                <br></br>


                                <InvoicePrint ref={invoicePrintRef} tableData={tableData} totalAmount={totalAmount} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;


const InvoicePrint = ({ tableData, totalAmount }) => {
    return (
        <>
            <div>
                <div className="row dt-row">
                    <div className="col-sm-12" >
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
                                                value={item.quantity}
                                                disabled
                                            />
                                        </td>
                                        <td className="dtr-control sorting_1" tabIndex="0">
                                            {(item.quantity * item.product.price).toLocaleString("en-US", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
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
        </>
    );
};