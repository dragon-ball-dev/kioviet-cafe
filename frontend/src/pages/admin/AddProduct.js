import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarNav from './SidebarNav';
import { addCategory } from '../../services/fetch/ApiUtils';
import Nav from './Nav';

const AddProduct = (props) => {
    const [name, setName] = useState('');
    const { authenticated, role, currentUser, location, onLogout } = props;
    const [roleName, setRoleName] = useState(props.roleName);

    const handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        if (inputName === 'name') {
            setName(inputValue);
        } else if (inputName === 'image') {
            // Handle image input if needed
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const categoryRequest = { name };

        addCategory(categoryRequest)
            .then((response) => {
                console.log(response.data);
                toast.success('Thêm danh mục thành công!!');
                setName('');
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

    console.log(name);

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
                            <h5 className="card-title">Thêm sản phẩm</h5>
                            <h6 className="card-subtitle text-muted"> Thêm sản phẩm của các chuỗi cửa hàng.</h6>
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
                                    <label className="form-label" htmlFor="locationId">Danh Mục</label>
                                    <select className="form-select" id="locationId" name="categoryId"  onChange={handleInputChange}>
                                        <option value={0}>Chọn...</option>
                                        <option value={1}>Hà Nội</option>
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
                                        placeholder="Tên danh mục"
                                        name="totalQuantity"
                                        value={totalQuantity}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                            <label className="form-label">Tải Hình Ảnh</label>
                                            <input className="form-control" type="file" name="files" multiple  />
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

export default AddProduct;