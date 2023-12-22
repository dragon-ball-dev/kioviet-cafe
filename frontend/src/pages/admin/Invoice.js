import React, { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom'
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import '../../assets/css/app.css';
import { useReactToPrint } from 'react-to-print';
import { getAllOrder, getAllOrderIsPrinter, updateStatusPrinter } from '../../services/fetch/ApiUtils';
import { toast } from 'react-toastify';
import useScript from '../../components/useScripts';

const Invoice = (props) => {
    const { authenticated, roleName, location, currentUser, onLogout } = props;

    const componentRef = useRef();

    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    useScript("../../assets/js/app.js");

    // Fetch data from the API
    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = () => {
        getAllOrderIsPrinter(currentPage - 1, itemsPerPage, 1, false).then(response => {
            setTableData(response.data.content);
            setTotalItems(response.data.totalElements);
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Invoice', // optional, sets the title of the printed document
        onAfterPrint: () => {
          updateStatusPrinter()
            .then((response) => {
              // Handle the response if needed
              console.log('Printer status updated successfully');
            })
            .catch((error) => {
              // Handle the error if the API request fails
              console.log('Failed to update printer status:', error);
            });
        },
      });

    return (
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
                <main style={{ margin: "20px 20px 20px 20px" }}>

                    <div className="container-fluid p-0">
                        <h1 className="h3 mb-3">Hóa đơn</h1>
                        <div className="row">
                            <div className="col-12">
                                <div className="card" ref={componentRef}>
                                    {tableData.map((item) => (
                                        <div className="card-body m-sm-3 m-md-5">
                                            <div className="mb-4">
                                                Xin chào <strong>{item.customer?.name}</strong>,
                                                <br />
                                                Tiền bạn đã thanh toán cho nhân viên là <strong>{item.totalPrice && item.totalPrice.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}</strong> . Cảm ơn quý khách hàng.
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="text-muted">Mã hóa đơn.</div>
                                                    <strong>741037024</strong>
                                                </div>
                                                <div className="col-md-6 text-md-end">
                                                    <div className="text-muted">Ngày thanh toán</div>
                                                    <strong>{item.customer?.orderDate}</strong>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <div className="row mb-4">
                                                <div className="col-md-6">
                                                    <div className="text-muted">Khách hàng</div>
                                                    <strong>{item.customer?.name}</strong>
                                                    <p>
                                                        {item.customer?.address} <br></br>
                                                        <a href="#">{item.customer?.phone}</a>
                                                    </p>
                                                </div>

                                                <div className="col-md-6 text-md-end">
                                                    <div className="text-muted">Nhân viên</div>
                                                    <strong>{item.user?.name}</strong>
                                                    <p>

                                                        {item.user?.address} <br />
                                                        <a href="#">{item.user?.email}</a>
                                                    </p>
                                                </div>
                                            </div>
                                            <table className="table table-sm">
                                                <thead>
                                                    <tr>
                                                        <th>Mô tả</th>
                                                        <th>Số lượng</th>
                                                        <th className="text-end">Giá</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {item.orderItem.map((i) => (
                                                        <tr>
                                                            <td>{i.product.name}</td>
                                                            <td>{i.quantity}</td>
                                                            <td className="text-end">{i?.product?.price.toLocaleString('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            })}</td>
                                                        </tr>
                                                    ))}

                                                    <tr>
                                                        <th>&nbsp;</th>
                                                        <th>Tổng tiến</th>
                                                        <th className="text-end">{item.totalPrice && item.totalPrice.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}</th>
                                                    </tr>
                                                    <tr>
                                                        <th>&nbsp;</th>
                                                        <th>Giảm giá</th>
                                                        <th className="text-end">0%</th>
                                                    </tr>
                                                    <tr>
                                                        <th>&nbsp;</th>
                                                        <th>Thành tiền</th>
                                                        <th className="text-end">{item.totalPrice && item.totalPrice.toLocaleString('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        })}</th>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center">
                                    <p className="text-sm">
                                        <strong>Lưu ý:</strong>
                                        Kiểm tra hóa đơn thật kĩ trước khi in để đưa cho khách hàng
                                    </p>
                                    <div className="text-center">
                                        <button className="btn btn-primary" onClick={handlePrint}>
                                            In hóa đơn
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>

    )
}

export default Invoice;