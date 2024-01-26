import React, { useState } from 'react';
import { Navigate } from 'react-router-dom'
import Nav from './Nav';
import SidebarNav from './SidebarNav';
import '../../assets/css/app.css';
import useScript from '../../components/useScripts';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import { getAllCategory, getCountProduct, getPriceMonth } from '../../services/fetch/ApiUtils';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Report = (props) => {
  const { authenticated, role, location, currentUser, onLogout } = props;


  const [number, setNumber] = useState();
  const [price, setPrice] = useState();

  //   useEffect(() => {
  //     fetchData();
  //     priceMonth();
  // }, []);

  const fetchData = () => {
    getCountProduct().then(response => {
      setNumber(response.count)

    }).catch(
      error => {
        toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
      }
    )

  }

  const priceMonth = () => {
    getPriceMonth().then(response => {
      setPrice(response)

    }).catch(
      error => {
        toast.error((error && error.message) || 'Oops! Có điều gì đó xảy ra. Vui lòng thử lại!');
      }
    )
  }

  useScript("../../assets/js/app.js");
  if (!authenticated) {
    return <Navigate
      to={{
        pathname: "/",
        state: { from: location }
      }} />;
  }

  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 1890, 2390, 3490];
  const xLabels = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];
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
        <main style={{margin: "20px 20px 20px 20px"}}>
				<div class="container-fluid p-0">

					<h1 class="h3 mb-3">Báo cáo</h1>

					<div class="row">

						<div class="col-12 col-xl-6">
							<div class="card">
								<div class="card-header">
									<h5 class="card-title">Báo cáo doanh thu các của hàng</h5>								
                                    </div>
								<table class="table table-bordered">
									<thead>
										<tr>
											<th style={{width:"40%"}}>Tên</th>
											<th style={{width:"25%"}}>Số điện thoại</th>
											<th class="d-none d-md-table-cell" style={{width:"25%"}}>Doanh thu</th>
											
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Cửa hàng khu vực Cầu Giấy</td>
											<td>864-348-0485</td>
											<td class="d-none d-md-table-cell">200,000 đ</td>

										</tr>
										<tr>
											<td>Cửa hàng khu vực Hoàn Kiếm</td>
											<td>914-939-2458</td>
											<td class="d-none d-md-table-cell">0 đ</td>

										</tr>
										<tr>
											<td>Cửa hàng khu vực Phùng Khoang</td>
											<td>914-939-2458</td>
											<td class="d-none d-md-table-cell">200,000 đ</td>

										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div class="col-12 col-xl-6">
							<div class="card">
								<div class="card-header">
									<h5 class="card-title">Tổng cung của các nhà cung cấp</h5>
								</div>
								<table class="table">
									<thead>
										<tr>
											<th style={{width:"40%"}}>Tên</th>
											<th style={{width:"25%"}}>Số điện thoại</th>
											<th class="d-none d-md-table-cell" style={{width:"25%"}}>Số lượng</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Công ty cổ phẩn Netles</td>
											<td>19001890</td>
											<td class="d-none d-md-table-cell">500 (SP)</td>
										</tr>
										<tr class="table-primary">
											<td>Công ty cổ phẩn Cao Nguyên</td>
											<td>19001891</td>
											<td class="d-none d-md-table-cell">350 (SP)</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						<div class="col-12">
							<div class="card">
								<div class="card-header">
									<h5 class="card-title">Nhân viên</h5>
									<h6 class="card-subtitle text-muted">Tổng quan về nhân viên (Nhân viên mặc định số tiền lương: 5tr)</h6>
								</div>
								<div class="table-responsive">
									<table class="table mb-0">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Tên Nhân Viên</th>
												<th scope="col">Số Điện Thoại</th>
												<th scope="col">Số giờ làm</th>
												<th scope="col">Doanh thu của cửa hàng</th>
												<th scope="col">Số công</th>
												<th scope="col">Tổng lương</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<th scope="row">1</th>
												<td>Hoàng Thùy Linh</td>
												<td>0987654321</td>
												<td>8 (h)</td>
												<td>200.000 (VND)</td>
												<td>1</td>
												<td>{1*200000} (VND)</td>
											</tr>
											<tr>
												<th scope="row">1</th>
												<td>Đỗ Mạnh Tùng</td>
												<td>0987654321</td>
												<td>8 (h)</td>
												<td>0 (VND)</td>
												<td>1</td>
												<td>{1*200000} (VND)</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

				</div>
			</main>
      </div>
    </div>
    
  )
}

export default Report;