import React from "react";
import { Link, NavLink } from 'react-router-dom';

const SidebarNav = () => {
  return (
    <ul className="sidebar-nav">
      <li className="sidebar-header">
        Quản lí chức năng
      </li>
      <li className="sidebar-item">
        <NavLink to="/dashboard" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Thống kê</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/dashboard" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Báo cáo</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/order" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý đơn bán</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/employee" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý nhân viên</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/product" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý sản phẩm</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/stock" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Chuyển kho</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/stock" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý kho hàng</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/category" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý thể loại</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/supply" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý nhà cung cấp</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/store" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý cửa hàng</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/customer" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý khách hàng</span>
        </NavLink>
      </li>
    </ul>
  )
}

export default SidebarNav;