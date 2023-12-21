import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllAccountOfAdmin, getAllCategory, getAllCustomer, getAllOrder, getAllProduct, getAllStore, getAllSupply } from "../../services/fetch/ApiUtils";
import SidebarNav from "./SidebarNav";
import Nav from "./Nav";
import Pagination from "./Pagnation";
import useScript from "../../components/useScripts";

function OrderManager(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const history = useNavigate();

    const [productData, setProductData] = useState({
        name: '',
        productId: 0,
        storeId: '',
        supplyId: '',
        quantity: 1,
        address: '',
        customerId: ''
    });

    const [tableData, setTableData] = useState([]);
    const [tableData2, setTableData2] = useState([]);
    const [tableData3, setTableData3] = useState([]);
    const [tableData4, setTableData4] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    useScript("../../assets/js/app.js");

    // Fetch data from the API
    useEffect(() => {
        fetchData();
        fetchData2();
        fetchData3();
        fetchData4();
    }, [currentPage, productData.storeId, productData.supplyId, productData.customerId]);

    const fetchData = () => {
        getAllOrder(currentPage - 1, itemsPerPage, productData.customerId, productData.storeId, productData.supplyId).then(response => {
            setTableData(response.data.content);
            setTotalItems(response.data.totalElements);
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const fetchData2 = () => {
        getAllAccountOfAdmin(0, 10, "").then(response => {
            setTableData2(response.content);
            setTotalItems(response.totalElements);
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const fetchData3 = () => {
        getAllStore(0, 10, "").then(response => {
            setTableData3(response.content);
            setTotalItems(response.totalElements);
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }
    const fetchData4 = () => {
        getAllSupply(0, 10, "").then(response => {
            setTableData4(response.content);
            setTotalItems(response.totalElements);
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }





    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const { storeId, customerId, supplyId } = productData;




    if (!props.authenticated) {
        return <Navigate
            to={{
                pathname: "/",
                state: { from: location }
            }} />;
    }

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
                            <h5 className="card-title">Quản lý đơn bán</h5>
                            <h6 className="card-subtitle text-muted"> Quản lý đơn bán của các chuỗi cửa hàng.</h6>
                        </div>
                        <div className="card-body">
                            <div id="datatables-buttons_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                <div className="row">
                                    <div class="col-12 col-md-6 col-lg-4">
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="locationId">Khách hàng</label>
                                            <select
                                                className="form-select"
                                                name="customerId"
                                                value={customerId}
                                                onChange={handleInputChange}
                                            >
                                                <option value={''}>Chọn...</option>
                                                {tableData2?.map((item) => (
                                                    <option value={item.id}>{item.name}</option>
                                                ))}
                                            </select>
                                            <br></br>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-4">
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="locationId">Cửa hàng</label>
                                            <select
                                                className="form-select"
                                                name="storeId"
                                                value={storeId}
                                                onChange={handleInputChange}
                                            >
                                                <option value={''}>Chọn...</option>
                                                {tableData3.map((item) => (
                                                    <option value={item.id}>{item.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-4">
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="locationId">Nhà cung cấp</label>
                                            <select
                                                className="form-select"
                                                name="supplyId"
                                                value={supplyId}
                                                onChange={handleInputChange}
                                            >
                                                <option value={''}>Chọn...</option>
                                                {tableData4.map((item) => (
                                                    <option value={item.id}>{item.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <div className="row dt-row"><div className="col-sm-12"><table id="datatables-buttons" className="table table-striped dataTable no-footer dtr-inline" style={{ width: "100%" }} aria-describedby="datatables-buttons_info">
                                    <thead>
                                        <tr>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Thời gian</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "524px" }}  >Sản phẩm</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Cửa hàng</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Khách hàng</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Phương thức</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Tổng giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((item) => (
                                            <tr className="odd">
                                                <td className="dtr-control sorting_1" tabIndex="0">{item.orderDate}</td>
                                                <td className="dtr-control sorting_1" tabIndex="0">
                                                    <ul>
                                                        {item.orderItem.map((i) => (
                                                            <li>{i.product.name} - {i.supply.name} - Số lượng: {i.quantity}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td className="dtr-control sorting_1" tabIndex="0">{item.store?.name}</td>
                                                <td className="dtr-control sorting_1" tabIndex="0">{item.customer?.name}</td>
                                                <td className="dtr-control sorting_1" tabIndex="0">{item.paymentId === 1 ? "Tiền mặt" : "Thanh toán VNPay"}</td>
                                                <td className="dtr-control sorting_1" tabIndex="0">{item.totalPrice && item.totalPrice.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                </div>
                                </div>
                                <Pagination
                                    itemsPerPage={itemsPerPage}
                                    totalItems={totalItems}
                                    currentPage={currentPage}
                                    paginate={paginate}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderManager;