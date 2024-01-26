package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.Product;
import com.ecommerce.backend.domain.models.Stock;
import com.ecommerce.backend.domain.payload.request.ConvertStockRequest;
import com.ecommerce.backend.domain.payload.request.ProductSentRequest;
import com.ecommerce.backend.domain.payload.request.StockRequest;
import com.ecommerce.backend.domain.payload.response.StockResponse;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.StockRepository;
import com.ecommerce.backend.repository.StoreRepository;
import com.ecommerce.backend.repository.SupplyRepository;
import com.ecommerce.backend.services.StockService;
import com.ecommerce.backend.utils.MapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static com.ecommerce.backend.services.impl.AuthServiceImpl.readFileConfirmed;

@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {
    private final StockRepository stockRepository;
    private final MapperUtils mapperUtils;
    @Autowired
    private JavaMailSender mailSender;
    private final SupplyRepository supplyRepository;
    private final StoreRepository storeRepository;
    private final ProductRepository productRepository;

    @Override
    public StockRequest addProductInStore(StockRequest stockRequest) {
        if(stockRepository.findByProduct(productRepository.findById(stockRequest.getProductId()).orElseThrow()) != null){
            Stock stock = stockRepository.findByProduct(productRepository.findById(stockRequest.getProductId()).orElseThrow());
            if(Objects.equals(stock.getStore().getId(), stockRequest.getStoreId()) && Objects.equals(stock.getSupply().getId(), stockRequest.getSupplyId())) {
                stock.setQuantity(stock.getQuantity() + stockRequest.getQuantity());
                stockRepository.save(stock);
                return stockRequest;
            }
        }
        Stock stock = new Stock(stockRequest.getName(), supplyRepository.findById(stockRequest.getSupplyId()).orElseThrow(() -> new BadRequestException("")),storeRepository.findById(stockRequest.getStoreId()).orElseThrow(), stockRequest.getAddress(), productRepository.findById(stockRequest.getProductId()).orElseThrow(),  stockRequest.getQuantity() );
        stockRepository.save(stock);
        return stockRequest;
    }

    @Override
    public StockRequest editStock(Long id, StockRequest stockRequest) {
        Stock stock = stockRepository.findById(id).orElseThrow(() -> new BadRequestException("Kho hàng không tồn tại"));
        stock.setStore(storeRepository.findById(stockRequest.getStoreId()).orElseThrow());
        stock.setName(stockRequest.getName());
        stock.setAddress(stockRequest.getAddress());
        stock.setQuantity(stockRequest.getQuantity());
        stock.setSupply(supplyRepository.findById(stockRequest.getSupplyId()).orElseThrow(() -> new BadRequestException("")));
        stock.setProduct(productRepository.findById(stockRequest.getProductId()).orElseThrow());
        stockRepository.save(stock);
        return stockRequest;
    }

    @Override
    public String deleteStock(Long id) {
        stockRepository.deleteById(id);
        return "Xóa kho hàng có id là " + id;
    }

    @Override
    public Page<StockResponse> getAllStock(Integer pageNo, Integer pageSize, String keyword) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapperUtils.convertToResponsePage(stockRepository.searchingStock(keyword, pageable), StockResponse.class, pageable);
    }

    @Override
    public Page<StockResponse> getAllStockByStore(Integer pageNo, Integer pageSize, Long storeId) {
        int page = pageNo == 0 ? pageNo : pageNo - 1;
        Pageable pageable = PageRequest.of(page, pageSize);
        return mapperUtils.convertToResponsePage(stockRepository.searchingStockByStoreId(storeId, pageable), StockResponse.class, pageable);
    }

    @Override
    public String convertToStock(ConvertStockRequest convertStockRequest) throws MessagingException, IOException {
        if (convertStockRequest.getStoreSentId().equals(convertStockRequest.getStoreReceiverId())) {
            throw new BadRequestException("Vui lòng chọn kho của cửa hàng bạn muốn chuyển!");
        }
        List<Stock> stockSent = stockRepository.findAllByStore(storeRepository.findById(convertStockRequest.getStoreSentId()).get());
        List<Stock> stockReceiver = stockRepository.findAllByStore(storeRepository.findById(convertStockRequest.getStoreReceiverId()).get());

        List<ProductSentRequest> productSent = convertStockRequest.getProductSent();

        // Tạo Map chứa thông tin Stock với khóa là productId
        Map<Integer, Stock> stockSentMap = new HashMap<>();
        for (Stock stock : stockSent) {
            stockSentMap.put(stock.getProduct().getId(), stock);
        }

        Map<Integer, Stock> stockReceiverMap = new HashMap<>();
        for (Stock stock : stockReceiver) {
            stockReceiverMap.put(stock.getProduct().getId(), stock);
        }

        // Trừ số lượng trong stockSent và cộng số lượng trong stockReceiver dựa trên danh sách productSent
        for (ProductSentRequest product : productSent) {
            int productId = product.getProductId();
            double quantity = product.getQuantity();

            // Trừ số lượng trong stockSent
            Stock sentStock = stockSentMap.get(productId);
            if (sentStock != null) {
                double currentQuantity = sentStock.getQuantity();
                sentStock.setQuantity(currentQuantity - quantity); // Trừ đi quantity
            }

            // Cộng số lượng trong stockReceiver
            Stock receiverStock = stockReceiverMap.get(productId);
            if (receiverStock != null) {
                double currentQuantity = receiverStock.getQuantity();
                receiverStock.setQuantity(currentQuantity + quantity); // Cộng thêm quantity
            }
        }

        // Lưu các thay đổi vào cơ sở dữ liệu (nếu cần)
        stockRepository.saveAll(stockSentMap.values());
        stockRepository.saveAll(stockReceiverMap.values());

        sendEmailConfirmed("", "Kiên Bui");

        return "Xác nhận chuyển hàng thành công, bên kho sẽ nhận được email.";
    }


    public void sendEmailConfirmed(String email, String name) throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();
        message.setFrom(new InternetAddress("khanhhn.hoang@gmail.com"));
        message.setRecipients(MimeMessage.RecipientType.TO, "kienb1230@gmail.com");
        message.setSubject("Chú ý sản phẩm sẽ được chuyển đến kho hàng.");

        // Read the HTML template into a String variable
        String htmlTemplate = readFileConfirmed("confirm-email.html");

        htmlTemplate = htmlTemplate.replace("NAME", name);
        htmlTemplate = htmlTemplate.replace("EMAIL", "kienb1230@gmail.com");

        // Set the email's content to be the HTML template
        message.setContent(htmlTemplate, "text/html; charset=utf-8");

        mailSender.send(message);
    }


}
