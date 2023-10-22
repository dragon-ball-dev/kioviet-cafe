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
        <NavLink to="/category" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý danh mục</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/supply" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý nhà sản xuất</span>
        </NavLink>
      </li>
      <li className="sidebar-item">
        <NavLink to="/store" className="sidebar-link">
          <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Quản lý cửa hàng</span>
        </NavLink>
      </li>
    </ul>
  )
}

export default SidebarNav;