import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarNav from './SidebarNav';
import { addCategory, addCustomer, addStore } from '../../services/fetch/ApiUtils';
import Nav from './Nav';

const AddCustomer = (props) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [discount, setDiscount] = useState('');
    const { authenticated, currentUser, onLogout } = props;

    const handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        if (inputName === 'name') {
            setName(inputValue);
        } else if (inputName === 'address') {
            setAddress(inputValue);
        } else if (inputName === 'phone') {
            setPhone(inputValue);
        } else if (inputName === 'discount') {
            setDiscount(inputValue);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const customerRequest = { name, address, phone, discount };

        addCustomer(customerRequest)
            .then((response) => {
                console.log(response.data);
                toast.success('Thêm khách hàng thành công!!');
                setName('');
                setAddress('');
                setPhone('');
                setDiscount('');
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message)
            });
    };

    if (!authenticated) {
        return <Navigate to={{ pathname: '/', state: { from: props.location } }} />;
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

                <main style={{ margin: '20px' }}>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="card-title">Thêm khách hàng</h5>
                            <h6 className="card-subtitle text-muted"> Thêm khách hàng của các chuỗi cửa hàng.</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Tên Khách Hàng</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên khách hàng"
                                        name="name"
                                        value={name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Địa Chỉ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: Hoan Kiem Street"
                                        name="address"
                                        value={address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Số Điện Thoại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: 0987654321"
                                        name="phone"
                                        value={phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mã giảm giá (Nếu có)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: 10, 20,..."
                                        name="discount"
                                        value={discount}
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

export default AddCustomer;