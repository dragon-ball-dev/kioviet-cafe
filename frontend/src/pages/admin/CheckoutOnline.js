import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import Nav from './Nav';
import { addOrder, addOrderItem, getAllCategory, getAllOrderItem, getAllProduct } from '../../services/fetch/ApiUtils';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';


function CheckoutOn(props) {
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
        const orderRequest = { totalPrice: totalAmount, storeId: 1 };
        addOrder(orderRequest).then((response) => {
            console.log(response.data);
        })
            .catch((error) => {
                console.log(error.error);
            });
        // history('/checkout');
    };

    const handleRedirectCheckoutOn = () => {
        const orderRequest = { totalPrice: totalAmount, storeId: 1 };
        addOrder(orderRequest).then((response) => {
            console.log(response.data);
        })
            .catch((error) => {
                console.log(error.error);
            });
        // history('/checkout');
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
                            <h5 className="card-title">Thanh toán chuyển khoản</h5>
                        </div>
                        <div className="card-body">
                            <div
                                id="datatables-buttons_wrapper"
                                className="dataTables_wrapper dt-bootstrap5 no-footer"
                                style={{textAlign :"center"}}
                            >

                                <br></br>


                            <img src='https://jeju.com.vn/wp-content/uploads/2020/05/VNPAYQR-JEJU-COSMETICS-5.jpg' style={{width : "50%"}}></img>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckoutOn;