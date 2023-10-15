package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.*;
import com.ecommerce.backend.domain.payload.request.InventoryRequest;
import com.ecommerce.backend.domain.payload.request.OrderItemRequest;
import com.ecommerce.backend.domain.payload.request.ProductRequest;
import com.ecommerce.backend.domain.payload.request.SupplyProductRequest;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.repository.*;
import com.ecommerce.backend.services.FileStorageService;
import com.ecommerce.backend.services.ProductService;
import org.apache.tomcat.jni.Proc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductIml implements ProductService {
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ProductMediaRepository productMediaRepository;
    @Autowired
    FileStorageService fileStorageService;
    @Autowired
    SupplyRepository supplyRepository;
    @Autowired
    SupplyProductRepository supplyProductRepository;
    @Autowired
    StoreRepository storeRepository;

    @Autowired
    InventoryRepository inventoryRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    OrderItemRepository orderItemRepository;
    @Override
    public void createProduct(String name, Integer price, String description,Integer categoryId,
                                           Integer totalQuantity, MultipartFile multipartFile) throws IOException {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);
        if (categoryOptional.isPresent()) {
            Product product1 = new Product();
            product1.setName(name);
            product1.setPrice(price);
            product1.setDescription(description);
            product1.setTotalQuantity(totalQuantity);
            product1.setCategory(categoryOptional.get());
            productRepository.save(product1);

            ProductMedia productMedia = new ProductMedia();
            productMedia.setProduct(product1);
            String image = fileStorageService.storeFile(multipartFile);
            productMedia.setImage(image);
            productMediaRepository.save(productMedia);
        }
        throw new BadRequestException("Không tìm thấy loại sản phẩm");
    }

    @Override
    public void createImgProduct(Integer id, MultipartFile file) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            ProductMedia productMedia = new ProductMedia();
            Product product1 = product.get();
            productMedia.setProduct(product1);
            String image = fileStorageService.storeFile(file);
            productMedia.setImage(image);
            productMediaRepository.save(productMedia);
        } else {
            throw new BadRequestException("Không tìm thấy sản phẩm");
        }
    }

    @Override
    public void changeProduct(Integer id, ProductRequest productRequest) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            Product product1 = product.get();
            product1.setName(productRequest.getName());
            product1.setPrice(productRequest.getPrice());
            product1.setDescription(productRequest.getDescription());
            product1.setTotalQuantity(productRequest.getTotalQuantity());
            productRepository.save(product1);
        } else {
            throw new BadRequestException("không tìm thấy sản phẩm");
        }
    }

    @Override
    public ResponseEntity<Resource> getImageProductMedia(Integer id) {
        ProductMedia productMedia = productMediaRepository.findById(id).get();
        if (productMedia == null && productMedia.getImage() == null) {
            return ResponseEntity.notFound().build();
        }
        String imgUrl = productMedia.getImage();
        Resource resource = fileStorageService.loadFileAsResource(imgUrl);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @Override
    public void importProduct(SupplyProductRequest supplyProductRequest) {
        Product product = productRepository.findById(supplyProductRequest.getProductId()).get();
        Supply supply = supplyRepository.findById(supplyProductRequest.getSupplyId()).get();
        if (product == null && supply == null) {
            throw new BadRequestException("không tìm thấy sản phẩm or nhà cung cấp");
        }
        SupplyProduct supplyProduct = new SupplyProduct();
        supplyProduct.setProduct(product);
        supplyProduct.setSupply(supply);
        supplyProduct.setQuantity(supplyProductRequest.getQuantity());

        product.setTotalQuantity(product.getTotalQuantity() + supplyProductRequest.getQuantity());

        supplyProductRepository.save(supplyProduct);
        productRepository.save(product);
    }

    @Override
    public void importInventory(InventoryRequest inventoryRequest) {
        Product product = productRepository.findById(inventoryRequest.getProductId()).get();
        Store store = storeRepository.findById(inventoryRequest.getStoreId()).get();
        if (product == null &&  store == null) {
            throw new BadRequestException("không tìm thấy product or store");
        }

    }

    @Override
    public void createInventory(Integer productId, Integer storeId, Integer quantity) {
        Product product = productRepository.findById(productId).get();
        Store store = storeRepository.findById(storeId).get();
        if (product != null && store != null) {
            int quantityInventory = totalQuantity(product);
            int total = quantityInventory + quantity;
            if (total <= product.getTotalQuantity()) {
                Inventory inventoryList = inventoryRepository.findByProductAndStore(product, store);
                if (inventoryList != null) {
                    Inventory inventory = new Inventory();
                    inventory.setQuantity(quantity);
                    inventory.setProduct(product);
                    inventory.setStore(store);
                    inventoryRepository.save(inventory);
                } else {
                    throw new BadRequestException("sản phẩm của cửa hàng đã tồn tại");
                }
            } else {
                throw new BadRequestException("số lượng không hợp lệ");
            }
        } else {
            throw new BadRequestException("không tìm thấy sản phẩm or cửa hàng");
        }
    }

    @Override
    public void importQuantityStore(InventoryRequest inventoryRequest) {
        Product product = productRepository.findById(inventoryRequest.getProductId()).get();
        Store store = storeRepository.findById(inventoryRequest.getStoreId()).get();
        if (product != null && store != null) {
            Inventory inventory = inventoryRepository.findByProductAndStore(product, store);
            if (inventory != null) {
                int totalQuantityProduct = totalQuantity(product);
                int total = totalQuantityProduct + inventoryRequest.getQuantity();
                if (total <= product.getTotalQuantity()) {
                    inventory.setQuantity(inventory.getQuantity() + inventoryRequest.getQuantity());
                    inventoryRepository.save(inventory);
                } else {
                    throw new BadRequestException("số lượng sản phẩm không đủ");
                }
            } else {
                throw new BadRequestException("sản phẩm không tồn tại");
            }
        } else {
            throw new BadRequestException("không tìm thấy sản phẩm or cửa hàng");
        }
    }


    //tổng số lượng product trong inventory.
    public  Integer totalQuantity(Product product) {
        List<Inventory> inventoryList = product.getInventory();
        int total = 0;
        for (Inventory inventory : inventoryList) {
            total+=inventory.getQuantity();
        }
        return total;
    }

//    @Override
//    public void deleteProduct(Integer id) {
//        Optional<Product> product = productRepository.findById(id);
//        if (product.isPresent()) {
//
//        } else {
//            throw new BadRequestException("không tìm thấy sản phẩm");
//        }
//    }

}
