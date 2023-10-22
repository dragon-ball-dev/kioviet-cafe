import axios from "axios"
import { ACCESS_TOKEN } from "../../constants/Connect";

const BASE_URL = "http://localhost:8080/"

class ProductService {

  addNeưProduct(formData) {
    return axios.post(BASE_URL + 'product/create-product', formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      }
    );

  }

  editProduct(id,formData) {
    return axios.patch(BASE_URL + 'product/change-product?id='+ id, formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
        }
      }
    );

  }
}

export default new ProductService();