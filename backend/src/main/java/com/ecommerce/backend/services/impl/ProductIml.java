package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.*;
import com.ecommerce.backend.domain.payload.request.*;
import com.ecommerce.backend.domain.payload.response.InventoryResponse;
import com.ecommerce.backend.domain.payload.response.NotificationRs;
import com.ecommerce.backend.domain.payload.response.ProductResponse;
import com.ecommerce.backend.domain.payload.response.StoreResponse;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.exception.MyFileNotFoundException;
import com.ecommerce.backend.exception.NotEnoughProductsException;
import com.ecommerce.backend.repository.*;
import com.ecommerce.backend.services.FileStorageService;
import com.ecommerce.backend.services.ProductService;
import com.ecommerce.backend.utils.MapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

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
    @Autowired
    MapperUtils mapperUtils;
    @Autowired
    UserRepository userRepository;

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
        } else {
            throw new BadRequestException("Không tìm thấy loại sản phẩm");
        }
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
        ProductMedia productMedia = productMediaRepository.findMediaById(id).get();
        if (productMedia == null && productMedia.getImage() == null) {
            return ResponseEntity.notFound().build();
        }
        String imgUrl = productMedia.getImage();
        Resource resource = fileStorageService.loadFileAsResource(imgUrl);
        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"");
        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.IMAGE_JPEG)
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
                if (inventoryList == null) {
                    Inventory inventory = new Inventory();
                    inventory.setQuantity(quantity);
                    inventory.setProduct(product);
                    inventory.setStore(store);
                    inventory.setTimeToStart(LocalDate.now());// ngày nhập
                    inventory.setTimeToEnd(LocalDate.now().plusDays(2)); // thời gian nhập hàng kết thúc
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
                    inventory.setTimeToStart(LocalDate.now());
                    inventory.setTimeToEnd(LocalDate.now().plusDays(2));
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

    @Override
    public Page<InventoryResponse> getAllInventory(Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Inventory> inventoryPage = inventoryRepository.findAll(pageable);
        Page<InventoryResponse> inventoryResponses = mapperUtils.convertToResponsePage(inventoryPage, InventoryResponse.class, pageable);
        inventoryResponses.getContent().forEach(inventoryResponse -> {
            Inventory inventory = inventoryRepository.findById(inventoryResponse.getId()).get();
            Product product = productRepository.findById(inventory.getProduct().getId()).get();
            Store store = storeRepository.findById(inventory.getStore().getId()).get();
            inventoryResponse.setProductName(product.getName());
            inventoryResponse.setStoreName(store.getName());
        });
        return inventoryResponses;
    }

    @Override
    public ResponseEntity<ProductRequest> findProductByName(String name) {
        Product product = productRepository.findByName(name);
        if (product == null) {
            throw new BadRequestException("không tìm thấy sản phẩm");
        }
        return new ResponseEntity<>(mapperUtils.convertToResponse(product, ProductRequest.class), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<BestSeller> findBestSellerProduct() {
        Object object = orderItemRepository.bestSellerProduct();
        if (object instanceof Object[]) {
            Object[] obj = (Object[]) object;
            Integer[] result = new Integer[obj.length];
            for (int i = 0; i < obj.length; i++) {
                result[i] = Integer.parseInt(obj[i].toString());
            }
            BestSeller bestSeller = new BestSeller();
            bestSeller.setQuantity(result[0]);
            Product product = productRepository.findById(result[1]).get();
            if (product == null) {
                throw new BadRequestException("Error");
            }
            bestSeller.setName(product.getName());

            return new ResponseEntity<>(bestSeller, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @Override
    public ResponseEntity<CountEmployee> countEmployee() {
        int count = 0;
        List<User> userList = userRepository.findAll();
        for (User user : userList) {
            if (user.getStore() != null) {
                count++;
            }
        }
        CountEmployee countEmployee = new CountEmployee();
        countEmployee.setCount(count);
        return new ResponseEntity<>(countEmployee, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CountEmployee> countProduct() {
        List<Product> products = productRepository.findAll();
        int total = products.size();
        CountEmployee countEmployee = new CountEmployee();
        countEmployee.setCount(total);
        return new ResponseEntity<>(countEmployee, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<ProductRequest> getById(Integer id) {
        Product product = productRepository.findById(id).get();
        if (product != null ) {
            ProductRequest productRequest = mapperUtils.convertToEntity(product, ProductRequest.class);
            return new ResponseEntity<>(productRequest, HttpStatus.OK);
        }
        throw new BadRequestException("Error");
    }

    @Override
    public Page<ProductResponse> getAll(Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Product> productPage = productRepository.findAll(pageable);
        Page<ProductResponse> productResponses = mapperUtils.convertToResponsePage(productPage, ProductResponse.class, pageable);
        productResponses.getContent().forEach(productResponse -> {
            productResponse.setStoreResponses(storeResponseList(productResponse));
        });
        return productResponses;
    }

    @Override
    public ResponseEntity<NotificationRs> transferProduct(Integer productId, Integer quantity, Integer sourceStoreId, Integer destinationStoreId) {

        Product product = productRepository.findById(productId).orElseThrow(() ->
            new MyFileNotFoundException("Khong tim thay san phẩm")
        );
        Store sourceStore = storeRepository.findById(sourceStoreId).orElseThrow(() ->
                new MyFileNotFoundException("Khong tim thay cua hang source"));
        Store destinationStore = storeRepository.findById(destinationStoreId).orElseThrow(() ->
                new MyFileNotFoundException("khong tim thay cua hang destination"));

        Inventory sourceInventory = inventoryRepository.findByProductAndStore(product, sourceStore);
        Inventory destinationInventory = inventoryRepository.findByProductAndStore(product, destinationStore);
        NotificationRs notificationRs= new NotificationRs();

        if (sourceInventory.getQuantity() < quantity) {
            throw new NotEnoughProductsException("Không đủ sản phẩm trong kho");
        }

        sourceInventory.setQuantity(sourceInventory.getQuantity() - quantity);
        destinationInventory.setQuantity(sourceInventory.getQuantity() + quantity);

        inventoryRepository.save(sourceInventory);
        inventoryRepository.save(destinationInventory);

        notificationRs.setNotification("chuyển sản phẩm thành công");
        notificationRs.setDateTransfer(LocalDate.now());
        return new ResponseEntity<>(notificationRs, HttpStatus.OK);

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
    public List<StoreResponse> storeResponseList(ProductResponse productResponse) {
        List<StoreResponse> storeResponses = new ArrayList<>();
        Product product = productRepository.findById(productResponse.getId()).get();
        if (product == null) {
            throw new BadRequestException("Error");
        }
        List<Inventory> inventoryList = product.getInventory();
        for (Inventory inventory : inventoryList) {
            StoreResponse storeDTO = new StoreResponse();
            Store store = inventory.getStore();
            storeDTO.setId(store.getId());
            storeDTO.setName(store.getName());
            storeResponses.add(storeDTO);
        }
        return storeResponses;
    }
    public Inventory getInventory(Integer productId, Integer storeId) {
        Product product = productRepository.findById(productId).get();
        Store store = storeRepository.findById(storeId).get();
        return inventoryRepository.findByProductAndStore(product, store);
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
