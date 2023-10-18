import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SidebarNav from './SidebarNav';
import { signup } from '../../services/fetch/ApiUtils';
import Nav from './Nav';

const AddEmployee = (props) => {
    const { authenticated, currentUser, location, onLogout } = props;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role] = useState('ROLE_USER');

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Number", confirmPassword.length);
        if (password === confirmPassword) {
            const signUpRequest = { name, email, phone, address, password, confirmPassword, role };
            signup(signUpRequest)
                .then(response => {
                    toast.success("Thêm tài khoản nhân viên thành công.");
                  
                })
                .catch(error => {
                    toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
                });
        } else if (validatePhone(phone) === false) {
            toast.error("Số điện thoại không hợp lệ.")
        }

        else if (name === '' || email === '' || password === '' || phone === '' || address === '' || confirmPassword === '') {
            toast.error("Vui lòng điền đầy đủ thông tin.")
        }
        else if (password.length <= 8 || confirmPassword.length <= 8) {
            toast.error("Mật khẩu phải đủ 8 kí tự.")
        }
        else {
            toast.error("Mật khẩu không trùng khớp. Vui lòng nhập lại.")
        }
    }

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
                            <h5 className="card-title">Thêm nhân viên</h5>
                            <h6 className="card-subtitle text-muted"> Thêm nhân viên của các chuỗi cửa hàng.</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Họ và Tên Nhân Viên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: Hoàng Thùy Linh"
                                        name="name"
                                        value={name} onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Địa Chỉ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: Hoan Kiem Street"
                                        name="address"
                                        value={address} onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Số Điện Thoại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: 0987654321"
                                        name="phone"
                                        value={phone} onChange={(e) => setPhone(e.target.value)} required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ex: your-email@example.com"
                                        name="email"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="mb-3">
                                    <span>Mật khẩu</span>
                                    <input type="password" className="form-control" id="password"
                                        name="password"
                                        value={password} onChange={(e) => setPassword(e.target.value)} required />

                                </div>
                                <div className="mb-3">
                                    <span>Nhập lại mật khẩu</span>
                                    <input type="password" className="form-control" id="password"
                                        name="confirmPassword"
                                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

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

export default AddEmployee;