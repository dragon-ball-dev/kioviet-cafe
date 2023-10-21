import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllCategory, getAllProduct } from "../../services/fetch/ApiUtils";
import SidebarNav from "./SidebarNav";
import Nav from "./Nav";
import Pagination from "./Pagnation";
import useScript from "../../components/useScripts";

function ProductManager(props){
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
        getAllProduct(currentPage - 1, itemsPerPage, searchQuery).then(response => {
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
        history('/edit-product/' + id)
    }


    const handleAddInventory = (id) => {
        history('/add-inventory/' + id)
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
                    <div className="container-fluid p-0"></div>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Quản lý sản phẩm</h5>
                            <h6 className="card-subtitle text-muted"> Quản lý sản phẩm của các chuỗi cửa hàng.</h6>
                        </div>
                        <div className="card-body">
                            <div id="datatables-buttons_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer"><div className="row"><div className="col-sm-12 col-md-6"><div className="dt-buttons btn-group flex-wrap">
                                <button className="btn btn-secondary buttons-copy buttons-html5" tabindex="0" aria-controls="datatables-buttons" type="button"><a onClick={handleRedirectAddCategory}>Thêm Sản Phẩm</a></button>
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
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Hình Ảnh</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Mô Tả</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Giá</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Số Lượng</th>
                                            <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Danh Mục</th>
                                            <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "75px" }} >Chế độ</th></tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map((item) => (
                                            <tr className="odd">
                                                <td className="dtr-control sorting_1" tabindex="0">{item.name}</td>
                                                <td className="dtr-control sorting_1" tabindex="0" ><img src={`http://localhost:8080/product/get-img?id=`+item.id} alt="Charles Hall"  style={{ width : "50%"}}/></td>
                                                <td className="dtr-control sorting_1" tabindex="0">{item.description}</td>
                                                <td className="dtr-control sorting_1" tabindex="0">{item.price && item.price.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}</td>
                                                <td className="dtr-control sorting_1" tabindex="0">{item.totalQuantity}</td>
                                                <td className="dtr-control sorting_1" tabindex="0">{item?.category?.name}</td>
                                                <td>
                                                    <a href="#" onClick={() => handleEditCategory(item.id)} data-toggle="tooltip" tabindex="0" data-placement="bottom" title="Sửa"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 align-middle"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <a href="#" onClick={() => handleAddInventory(item.id)} data-toggle="tooltip" tabindex="0" data-placement="bottom" title="Kho Hàng">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z"/></svg>                                                    </a>
                                                    &nbsp;&nbsp;&nbsp;
                                                    <a href="#" onClick={() => handleDeleteCategory(item.id)} data-toggle="tooltip" tabindex="0" data-placement="bottom" title="Xóa"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash align-middle"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a>
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

export default ProductManager;