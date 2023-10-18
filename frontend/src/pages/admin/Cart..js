import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCategory, getAllProduct } from "../../services/fetch/ApiUtils";
import SidebarNav from "./SidebarNav";
import Nav from "./Nav";
import Pagination from "./Pagnation";
import useScript from "../../components/useScripts";

function Cart(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const history = useNavigate();

    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    useScript("../../assets/js/app.js");

    // Fetch data from the API
    useEffect(() => {
        fetchData();
    }, [currentPage, searchQuery]);

    const fetchData = () => {
        getAllCategory(currentPage - 1, itemsPerPage, searchQuery).then(response => {
            setTableData(response.content);
            setTotalItems(response.totalElements);
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleRedirectAddCategory = () => {
        history('/add-product')
    }

    const handleEditCategory = (id) => {
        history('/edit-category/' + id)
    }


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteCategory = (id) => {
        // deleteMaintenance(id).then(response => {
        //     console.log(response.message)
        //     toast.success("Xóa danh mục thành công")
        //     fetchData();
        // }).catch(
        //     error => {
        //         toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
        //     }
        // )
    }

    // if (!props.authenticated) {
    //     return <Navigate
    //         to={{
    //             pathname: "/",
    //             state: { from: location }
    //         }} />;
    // }

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
                            <div id="datatables-buttons_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer"><div className="row"><div className="col-sm-12 col-md-6"><div className="dt-buttons btn-group flex-wrap">
                                <button className="btn btn-secondary buttons-copy buttons-html5" tabindex="0" aria-controls="datatables-buttons" type="button"><a onClick={handleRedirectAddCategory}>Thành Toán Tiền Mặt</a></button> &nbsp;
                                <button className="btn btn-secondary buttons-copy buttons-html5" tabindex="0" aria-controls="datatables-buttons" type="button"><a onClick={handleRedirectAddCategory}>Chuyển Khoản</a></button>
                            </div></div>
                            </div><br></br><div className="row dt-row"><div className="col-sm-12"><table id="datatables-buttons" className="table table-striped dataTable no-footer dtr-inline" style={{ width: "100%" }} aria-describedby="datatables-buttons_info">
                                <thead>
                                    <tr>
                                        <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Tên sản phẩm</th>
                                        <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Hình Ảnh</th>
                                        <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Giá</th>
                                        <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Số Lượng</th>
                                        <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "175px" }} ></th></tr>
                                </thead>
                                <tbody>
                                    {tableData.map((item) => (
                                        <tr className="odd">
                                            <td className="dtr-control sorting_1" tabindex="0">{item.name}</td>
                                            <td className="dtr-control sorting_1" tabindex="0"><img src="../../assets/img/avatars/avatar-2.jpg" alt="Charles Hall" /></td>
                                            <td className="dtr-control sorting_1" tabindex="0">100.000 VND</td>
                                            <td className="dtr-control sorting_1" tabindex="0"><input type="number" value={3} /></td>
                                            <td>
                                                <button type="button" class="btn btn-primary">Cập nhật</button> &nbsp;
                                                <button type="button" class="btn btn-danger">Xoá</button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <h3>Thành tiền : 100.000.000 (VND)</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Cart;