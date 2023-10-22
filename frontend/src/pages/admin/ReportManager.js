import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCategory } from "../../services/fetch/ApiUtils";
import SidebarNav from "./SidebarNav";
import Nav from "./Nav";
import Pagination from "./Pagnation";
import useScript from "../../components/useScripts";

function ReportManager(props) {
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
                 
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Báo cáo các đơn hàng </h5>
                            <h6 className="card-subtitle text-muted"> Báo cáo về các đơn hàng mua.</h6>
                        </div>
                        <div className="card-body">
                            <div id="datatables-buttons_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer"><div className="row"><div className="col-sm-12 col-md-6"><div className="dt-buttons btn-group flex-wrap">
                            </div></div>
                                <div className="col-sm-12 col-md-6"><div id="datatables-buttons_filter" className="dataTables_filter">
                                    <label>Search:<input type="search" className="form-control form-control-sm" placeholder=""
                                        aria-controls="datatables-buttons"
                                        value={searchQuery}
                                        onChange={handleSearch} /></label>
                                </div></div></div><div className="row dt-row"><div className="col-sm-12"><table id="datatables-buttons" className="table table-striped dataTable no-footer dtr-inline" style={{ width: "100%" }} aria-describedby="datatables-buttons_info">
                                    <thead>
                                        <tr>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Tên sản phẩm</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Mô Tả</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Giá</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Số Lượng</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Danh Mục</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((item) => (
                                            <tr className="odd">
                                                <td className="dtr-control sorting_1" tabindex="0">{item.name}</td>
                                                <td className="dtr-control sorting_1" tabindex="0">{item.name}</td>
                                                <td className="dtr-control sorting_1" tabindex="0">{item.name}</td>
                                                <td className="dtr-control sorting_1" tabindex="0">{item.name}</td>
                                                <td className="dtr-control sorting_1" tabindex="0">{item.name}</td>


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

export default ReportManager;