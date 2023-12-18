
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarNav from './SidebarNav';
import { addStock, getAllCategory, getAllProduct, getAllStore, getAllSupply } from '../../services/fetch/ApiUtils';
import Nav from './Nav';

const AddStock = (props) => {
    const [tableData, setTableData] = useState([]);
    const [tableData2, setTableData2] = useState([]);
    const [tableData3, setTableData3] = useState([]);

    const [productData, setProductData] = useState({
        name: '',
        productId: 0,
        storeId: 0,
        supplyId: 0,
        quantity: 0,
        address: ''
    });

    useEffect(() => {
        fetchData();
        fetchData3();
        fetchData2();
    }, []);

    const fetchData = () => {
        getAllStore(0, 100, '').then(response => {
            setTableData(response.content);

        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const fetchData2 = () => {
        getAllSupply(0, 100, '').then(response => {
            setTableData2(response.content);

        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }

    const fetchData3 = () => {
        getAllProduct(0, 100, '').then(response => {
            setTableData3(response.content);

        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }


    const { authenticated, currentUser, location, onLogout } = props;

    const handleFileChange = (event) => {
        setProductData(prevState => ({
            ...prevState,
            files: [...prevState.files, ...event.target.files]
        }));
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProductData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        addStock(productData)
        .then((response) => {
            console.log(response.data);
            toast.success('Thêm số lượng sản phẩm vào kho hàng thành công');
            setProductData((prevData) => ({
                ...prevData,
                name: '' ,
                address:'',
                quantity: ''
            }));
        })
        .catch((error) => {
            console.log(error);
        });

    };

    if (!authenticated) {
        return (
            <Navigate
                to={{
                    pathname: '/',
                    state: { from: props.location },
                }}
            />
        );
    }

    const { name, storeId, quantity, address, supplyId, productId } = productData;

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
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Thêm số lượng vào kho hàng</h5>
                            <h6 className="card-subtitle text-muted"> Thêm sản phẩm vào kho hàng của các chuỗi cửa hàng.</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Tên kho hàng</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên kho hàng"
                                        name="name"
                                        value={name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="locationId">Sản phẩm</label>
                                    <select
                                        className="form-select"
                                        name="productId"
                                        value={productId}
                                        onChange={handleInputChange}
                                    >
                                        <option value={0}>Chọn...</option>
                                        {tableData3.map((item) => (
                                            <option  value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="locationId">Cửa hàng</label>
                                    <select
                                        className="form-select"
                                        name="storeId"
                                        value={storeId}
                                        onChange={handleInputChange}
                                    >
                                        <option value={0}>Chọn...</option>
                                        {tableData.map((item) => (
                                            <option  value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="locationId">Nhà cung cấp</label>
                                    <select
                                        className="form-select"
                                        name="supplyId"
                                        value={supplyId}
                                        onChange={handleInputChange}
                                    >
                                        <option value={0}>Chọn...</option>
                                        {tableData2.map((item) => (
                                            <option  value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Địa chỉ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: Cầu Giấy, Hà Nội"
                                        name="address"
                                        value={address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Số lượng </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: 10"
                                        name="quantity"
                                        value={quantity}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AddStock;