import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addOrderItem, addToCart, getAllCategory, getAllCustomer, getAllProduct, getAllStockByStoreName, getAllStore } from "../../services/fetch/ApiUtils";
import SidebarNav from "./SidebarNav";
import Nav from "./Nav";
import Pagination from "./Pagnation";
import useScript from "../../components/useScripts";

function SellProduct(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const history = useNavigate();

    const [productData, setProductData] = useState({
        name: '',
        productId: 0,
        storeId: '',
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

    const handleOnClickAddCustomer = () => {
        history('/add-customer')
    }

    const handleEditCategory = (id) => {
        history('/edit-category/' + id)
    }


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddCart = (productId, storeId, supplyId, customerId, quantity) => {
        const cartRequest = { productId, storeId, supplyId, customerId, quantity };
        if(storeId === ''){
            toast.error("Vui lòng chọn cửa hàng bản đang quản lý")
            return;
        }

        if(customerId === null){
            toast.error("Vui lòng chọn khách hàng.")
            return;
        }

        addToCart(cartRequest).then((response) => {
            console.log(response.data);
            toast.success("Thêm sản phẩm vào giỏ thành công")

        })
            .catch((error) => {
                console.log(error.message);
            });

    }


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

    const { storeId, customerId, quantity } = productData;

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
                    <div class="row" style={{ margin: "20px 20px 20px 20px" }}>
                        <div class="col-12 col-md-6 col-lg-4">
                            <div className="mb-6">
                                <label className="form-label" htmlFor="locationId">Khách hàng</label>
                                <select
                                    className="form-select"
                                    name="customerId"
                                    value={customerId}
                                    onChange={handleInputChange}
                                >
                                    <option value={0}>Chọn...</option>
                                    {tableData3?.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                                <br></br>
                                <button type="button" onClick={handleOnClickAddCustomer} className="btn btn-primary">
                                    + Thêm khách hàng
                                </button>
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
                                    <option value={0}>Chọn...</option>
                                    {tableData2.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div style={{ margin: "20px 20px 20px 20px" }} >
                        <div class="row">
                            {tableData?.map((item) => (
                                <div class="col-12 col-md-6 col-lg-4">
                                    <div class="card">
                                        <img class="card-img-top" style={{ height: "400px" }} src={`http://localhost:8080/product/get-img?id=` + item?.product.id} alt="Unsplash" />
                                        <div class="card-header">
                                            <h5 class="card-title mb-0">{item?.product.name}</h5>
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text">{item?.product.description}</p>
                                            <p class="card-text">Giá : {item?.product.price && item?.product.price.toLocaleString('vi-VN', {
                                                style: 'currency',
                                                currency: 'VND',
                                            })}</p>
                                            <p>Nhà cung cấp: {item?.supply.name}</p>
                                            <br></br>
                                            <a href="#" class="btn btn-primary" onClick={() => handleAddCart(item?.product?.id, storeId, item?.supply.id, customerId, quantity)}>Thêm vào giỏ +</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SellProduct;