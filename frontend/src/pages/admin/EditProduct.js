
import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarNav from './SidebarNav';
import { addCategory, getAllCategory, getProductById } from '../../services/fetch/ApiUtils';
import Nav from './Nav';
import ProductService from '../../services/axios/ProductService';

const EditProduct = (props) => {
    const { id } = useParams();
    const [tableData, setTableData] = useState([]);

    const [productData, setProductData] = useState({
        name: '',
        categoryId: 0,
        price: '',
        description: '',
        totalQuantity: '',
        files: []
    });

    useEffect(() => {
        fetchData();
        getByProductId();
    }, []);

    const fetchData = () => {
        getAllCategory(0, 100, '').then(response => {
            setTableData(response.content);

        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )

    }

    const getByProductId =  () => {
        getProductById(id).then(response => {
            setProductData(response)

        }).catch(
            error => {
                toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
            }
        )
    }


    const { authenticated, currentUser, role, onLogout } = props;

    const handleFileChange = (event) => {
        setProductData(prevState => ({
            ...prevState,
            files: [...prevState?.files, ...event.target.files]
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

        const formData = new FormData();

        formData.append('name', productData.name);
        formData.append('categoryId', productData.categoryId);
        formData.append('price', productData.price);
        formData.append('description', productData.description);
        formData.append('totalQuantity', productData.totalQuantity);

        productData.files.forEach((file, index) => {
            formData.append(`file`, file);
        });

        ProductService.editProduct(id,formData)
            .then((response) => {
                console.log(response.data);
                toast.success('Sửa sản phẩm thành công!!');
                setProductData((prevData) => ({
                    ...prevData,
                    name: '' 
                }));
            })
            .catch((error) => {
                toast.error(error.message);
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

    const { name, categoryId, price, description, totalQuantity } = productData;

    return (
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

                <main style={{ margin: "20px 20px 20px 20px" }}>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Sửa sản phẩm</h5>
                            <h6 className="card-subtitle text-muted"> Sửa sản phẩm của các chuỗi cửa hàng.</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Tên Sản Phẩm</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên sản phẩm"
                                        name="name"
                                        value={name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="locationId">thể loại</label>
                                    <select
                                        className="form-select"
                                        name="categoryId"
                                        value={categoryId}
                                        onChange={handleInputChange}
                                    >
                                        <option value={0}>Chọn...</option>
                                        {tableData.map((item) => (
                                            <option  value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Giá</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: 100.000 VND"
                                        name="price"
                                        value={price}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mô Tả</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: Sản phẩm chất lượng"
                                        name="description"
                                        value={description}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Số lượng</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: 10"
                                        name="totalQuantity"
                                        value={totalQuantity}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tải Hình Ảnh</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        name="files"
                                        multiple onChange={handleFileChange}
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

export default EditProduct;