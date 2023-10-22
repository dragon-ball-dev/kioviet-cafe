import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addOrderItem, getAllCategory, getAllProduct } from "../../services/fetch/ApiUtils";
import SidebarNav from "./SidebarNav";
import Nav from "./Nav";
import Pagination from "./Pagnation";
import useScript from "../../components/useScripts";

function SellProduct(props) {
    const { authenticated, role, currentUser, location, onLogout } = props;
    const history = useNavigate();

    const [productData, setProductData] = useState({
        storeId: 0,
    });

    const [tableData, setTableData] = useState([]);
    const [tableData2, setTableData2] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    useScript("../../assets/js/app.js");

    // Fetch data from the API
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
        history('/edit-category/' + id)
    }


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddCart = (item) => {
        const orderItemRequest = { quatity: 1, productId: item.id, storeId: productData.storeId };
        addOrderItem(orderItemRequest).then((response) => {
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

    const { storeId } = productData;

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
                    <div style={{ margin: "20px 20px 20px 20px" }} >
                            <div class="row">
                                {tableData.map((item) => (
                                    <div class="col-12 col-md-6 col-lg-4">
                                        <div class="card">
                                            <img class="card-img-top" src="../../assets/img/photos/unsplash-2.jpg" alt="Unsplash" />
                                            <div class="card-header">
                                                <h5 class="card-title mb-0">{item.name}</h5>
                                            </div>
                                            <div class="card-body">
                                                <p class="card-text">{item.description}</p>
                                                <p class="card-text">Giá : {item.price && item.price.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}</p>
                                                <select
                                                    className="form-select"
                                                    name="storeId"
                                                    value={storeId}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value={0}>Chọn Cửa Hàng</option>
                                                    {item?.storeResponses?.map((item) => (
                                                        <option value={item.id}>{item.name}</option>
                                                    ))}
                                                </select>
                                                <br></br>
                                                <a href="#" class="btn btn-primary" onClick={() => handleAddCart(item)}>Thêm vào giỏ +</a>
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