import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addOrderItem, addToCart, getAllCategory, getAllCustomer, getAllProduct, getAllStockByStoreName, getAllStore } from "../../services/fetch/ApiUtils";
import SidebarNav from "./SidebarNav";
import Nav from "./Nav";
import Pagination from "./Pagnation";
import useScript from "../../components/useScripts";

function MoveStock(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const history = useNavigate();

    const [productData, setProductData] = useState({
        name: '',
        productId: 0,
        storeId: '',
        storeReceiverId: '',
        supplyId: 0,
        quantity: 1,
        address: '',
        customerId: null
    });

    const [tableData, setTableData] = useState([]);
    const [tableData2, setTableData2] = useState([]);
    const [tableData3, setTableData3] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [searchQuery, setSearchQuery] = useState(null);


    useScript("../../assets/js/app.js");

    // Fetch data from the API
    // Fetch data from the API
    useEffect(() => {
        fetchData();
        fetchData2();
        fetchData3();
    }, [currentPage, productData.storeId]);

    const fetchData = () => {
        getAllStockByStoreName(currentPage - 1, itemsPerPage, productData.storeId).then(response => {
            setTableData(response?.data.content);
            setTotalItems(response?.data.totalElements);
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const fetchData2 = () => {
        getAllStore(0, 10, "").then(response => {
            setTableData2(response.content);
            setTotalItems(response.totalElements);
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const fetchData3 = () => {
        getAllCustomer(0, 10, "").then(response => {
            setTableData3(response.data.content);
            setTotalItems(response.data.totalElements);
        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleAddToCart = (productId, productName,supplyName, storeId, supplyId, customerId, quantity) => {
        // Kiểm tra xem sản phẩm đã được chọn trước đó chưa
        const existingProduct = selectedProducts.find(product => product.productId === productId && product.supplyId === supplyId);

        if (existingProduct) {
            // Nếu sản phẩm đã tồn tại trong danh sách, cập nhật số lượng
            const updatedProducts = selectedProducts.map(product => {
                if (product.productId === productId) {
                    return {
                        ...product,
                        quantity: product.quantity + quantity,
                    };
                }
                return product;
            });

            setSelectedProducts(updatedProducts);
        } else {
            // Nếu sản phẩm chưa tồn tại trong danh sách, thêm mới
            const newProduct = {
                productId,
                productName,
                supplyName,
                storeId,
                supplyId,
                customerId,
                quantity,
            };

            setSelectedProducts([...selectedProducts, newProduct]);
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
        const updatedProducts = selectedProducts.map(product => {
            if (product.productId === productId) {
                return {
                    ...product,
                    quantity: newQuantity,
                };
            }
            return product;
        });

        setSelectedProducts(updatedProducts);
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    // if (!props.authenticated) {
    //     return <Navigate
    //         to={{
    //             pathname: "/",
    //             state: { from: location }
    //         }} />;
    // }

    const { storeId, customerId, quantity, storeReceiverId } = productData;

    return (
        <>
            <div className="wrapper">
                <nav id="sidebar" className="sidebar js-sidebar">
                    <div className="sidebar-content js-simplebar">
                        <a className="sidebar-brand" href="index.html">
                            <span className="align-middle">Kioviet Cafe</span>
                        </a>
                        <SidebarNav role={role} />
                    </div>
                </nav>

                <div className="main">
                    <Nav onLogout={onLogout} currentUser={currentUser} />

                    <br />
                    <div class="row" style={{ margin: "20px 20px 0px 20px" }}>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div className="mb-6">
                                <label className="form-label" htmlFor="locationId">Kho hàng gửi</label>
                                <select
                                    className="form-select"
                                    name="storeId"
                                    value={storeId}
                                    onChange={handleInputChange}
                                >
                                    <option value={0}>Chọn...</option>
                                    {tableData2.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                                <br></br>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-6">
                            <div className="mb-6">
                                <label className="form-label" htmlFor="locationId">Kho hàng nhận</label>
                                <select
                                    className="form-select"
                                    name="storeReceiverId"
                                    value={storeReceiverId}
                                    onChange={handleInputChange}
                                >
                                    <option value={0}>Chọn...</option>
                                    {tableData2.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{ margin: "0px 20px 20px 20px" }}>
                        <div id="datatables-buttons_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer"><div className="row"><div className="col-sm-12 col-md-6"><div className="dt-buttons btn-group flex-wrap">
                        </div></div>
                            <div className="col-sm-12 col-md-6">
                                <div id="datatables-buttons_filter" className="dataTables_filter">
                                    <label>Search:<input type="search" className="form-control form-control-sm" placeholder=""
                                        aria-controls="datatables-buttons"
                                        value={searchQuery}
                                        onChange={handleSearch} /></label>
                                </div>
                            </div>
                        </div>
                            <div className="row dt-row">
                                <div className="col-sm-12">
                                    <table id="datatables-buttons" className="table table-striped dataTable no-footer dtr-inline" style={{ width: "100%" }} aria-describedby="datatables-buttons_info">
                                        <thead>
                                            <tr>
                                                <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Tên sản phẩm</th>
                                                <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Hình Ảnh</th>
                                                <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Mô Tả</th>
                                                <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Giá</th>
                                                <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Số lượng cảnh báo</th>
                                                <th className="sorting sorting_asc" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "224px" }}  >Nhà cung cấp</th>
                                                <th className="sorting" tabindex="0" aria-controls="datatables-buttons" rowspan="1" colspan="1" style={{ width: "115px" }} >Chế độ</th></tr>
                                        </thead>
                                        <tbody>
                                            {tableData.map((item) => (
                                                <tr className="odd">
                                                    <td className="dtr-control sorting_1" tabindex="0">{item?.product.name}</td>
                                                    <td className="dtr-control sorting_1" tabindex="0" ><img src={`http://localhost:8080/product/get-img?id=` + item?.product.id} alt="Charles Hall" style={{ width: "50%" }} /></td>
                                                    <td className="dtr-control sorting_1" tabindex="0">{item?.product.description}</td>
                                                    <td className="dtr-control sorting_1" tabindex="0">{item?.product.price && item?.product.price.toLocaleString('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND',
                                                    })}</td>
                                                    <td className="dtr-control sorting_1" tabindex="0">{item?.product.totalQuantity}</td>
                                                    <td className="dtr-control sorting_1" tabindex="0">{item?.supply.name}</td>
                                                    <td>
                                                        <a href="#" class="btn btn-primary" onClick={() => handleAddToCart(item?.product?.id,item?.product.name,item?.supply.name, storeId, item?.supply.id, customerId, quantity)}>Chọn sản phẩm +</a>
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

                    {/* Hiển thị danh sách sản phẩm đã chọn */}
                    <h5 style={{ marginLeft: "20px"}}><b>Sản phẩm đã chọn:</b></h5>
                    <table id="datatables-buttons" className="table table-striped dataTable no-footer dtr-inline" style={{ margin: "20px 20px 20px 20px"}} aria-describedby="datatables-buttons_info">
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>Nhà cung cấp</th>
                                <th>Số lượng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProducts.map(product => (
                                <tr key={product.productId}>
                                    <td>{product?.productName}</td>
                                    <td>{product?.supplyName}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={product.quantity}
                                            onChange={event => handleQuantityChange(product.productId, event.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button class="btn btn-primary" style={{ margin: "20px 20px 20px 20px"}} onClick={""}>Xác nhận chuyển kho</button>
                    
                </div>
            </div>
        </>
    )
}

export default MoveStock;