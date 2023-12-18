import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllAccountOfAdmin, getAllCategory, getAllStore, lockedAccount } from "../../services/fetch/ApiUtils";
import SidebarNav from "./SidebarNav";
import Nav from "./Nav";
import Pagination from "./Pagnation";
import useScript from "../../components/useScripts";

function EmployeeManager(props) {
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
        getAllAccountOfAdmin(currentPage, itemsPerPage, searchQuery).then(response => {
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
        history('/add-employee')
    }

    const handleEditCategory = (id) => {
        history('/edit-employee/' + id)
    }


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleLockedAccount = (userId) => {
        lockedAccount(userId).then(response => {
            toast.success(response.message)
            fetchData();
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )

    };

    const handleDeleteCategory = (id) => {
        // deleteMaintenance(id).then(response => {
        //     console.log(response.message)
        //     toast.success("Xóa thể loại thành công")
        //     fetchData();
        // }).catch(
        //     error => {
        //         toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
        //     }
        // )
    }

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
                            <h5 className="card-title">Quản lý nhân viên</h5>
                            <h6 className="card-subtitle text-muted"> Quản lý nhân viên của các chuỗi cửa hàng.</h6>
                        </div>
                        <div className="card-body">
                            <div id="datatables-buttons_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer"><div className="row"><div className="col-sm-12 col-md-6"><div className="dt-buttons btn-group flex-wrap">
                                <button className="btn btn-secondary buttons-copy buttons-html5" tabindex="0" aria-controls="datatables-buttons" type="button"><a onClick={handleRedirectAddCategory}>Thêm Nhân Viên</a></button>
                            </div></div>
                                <div className="col-sm-12 col-md-6"><div id="datatables-buttons_filter" className="dataTables_filter">
                                    <label>Search:<input type="search" className="form-control form-control-sm" placeholder=""
                                        aria-controls="datatables-buttons"
                                        value={searchQuery}
                                        onChange={handleSearch} /></label>
                                </div></div></div><div className="row dt-row"><div className="col-sm-12"><table id="datatables-buttons" className="table table-striped dataTable no-footer dtr-inline" style={{ width: "100%" }} aria-describedby="datatables-buttons_info">
                                    <thead>
                                        <tr>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Tên nhân viên</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1"  >Địa chỉ</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1"  >Số điện thoại</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1"  >Email</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1"  >Cửa hàng quản lý</th>
                                            <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "75px" }} >Chế độ</th></tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((item) => (
                                            <tr className="odd">
                                                <td className="dtr-control sorting_1" tabindex="0">{item.name}</td>
                                                <td className="dtr-control sorting_1" tabindex="0">{item.address}</td>
                                                <td className="dtr-control sorting_1" tabindex="0">{item.phone}</td>
                                                <td className="dtr-control sorting_1" tabindex="0">{item.email}</td>
                                                <td className="dtr-control sorting_1" tabindex="0">{item.store?.name}</td>
                                                <td>
                                                    <button type="button" class="btn btn-outline-success" onClick={() => handleLockedAccount(item.id)}>
                                                        {item.isLocked === true ? "Mở" : "Khóa"}
                                                    </button>
                                                </td>

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

export default EmployeeManager;