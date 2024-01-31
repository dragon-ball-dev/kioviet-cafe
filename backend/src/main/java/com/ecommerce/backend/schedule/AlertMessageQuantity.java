package com.ecommerce.backend.schedule;

import com.ecommerce.backend.domain.models.Product;
import com.ecommerce.backend.domain.models.Stock;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

import static com.ecommerce.backend.services.impl.AuthServiceImpl.readFileConfirmed;

@RequiredArgsConstructor
@Component
public class AlertMessageQuantity {
    @Autowired
    private JavaMailSender mailSender;

    private final StockRepository stockRepository;

    private final ProductRepository productRepository;

    @Scheduled(cron = "0 */2 * * * *")
    private void updateRequestTicketWhenGarageNoAction() throws MessagingException, IOException {
        List<Stock> stocks = stockRepository.findAll();
        List<Product> products = productRepository.findAll();
        for (Product product : products) {
            Double warningCount = product.getTotalQuantity().doubleValue(); // Assuming there's a method to retrieve the warning count of a product
            double stockQuantity = 0; // Initialize stock quantity to 0

            // Find the stock for the current product in the stocks list
            for (Stock stock : stocks) {
                if (Objects.equals(stock.getProduct().getId(), product.getId())) { // Assuming there's a method to retrieve the product ID of a stock
                    stockQuantity = stock.getQuantity(); // Assuming there's a method to retrieve the quantity of a stock
                    break; // Break the loop once the stock for the current product is found
                }
            }

            if (warningCount > stockQuantity) {
                String message = "Warning: Product " + product.getName() + " has more warnings than available stock. Warning count: " + warningCount + ", Stock quantity: " + stockQuantity;
                // Send the message using your preferred method, such as sending an email, logging, or displaying it on the UI
                sendEmailConfirmed(message, "Admin");
            }
        }

    }

    public void sendEmailConfirmed(String content, String name) throws MessagingException, IOException {
        MimeMessage message = mailSender.createMimeMessage();
        message.setFrom(new InternetAddress("khanhhn.hoang@gmail.com"));
        message.setRecipients(MimeMessage.RecipientType.TO, "kienb1230@gmail.com");
        message.setSubject("Cảnh báo sản phẩm đã hết hàng.");

        // Read the HTML template into a String variable
        String htmlTemplate = readFileConfirmed("confirm-email.html");

        htmlTemplate = htmlTemplate.replace("NAME", name);
        htmlTemplate = htmlTemplate.replace("Chúng tôi rất vui khi bạn bắt đầu. Trước tiên, bạn cần xác nhận tài khoản của mình. Chỉ cần nhấn nút bên dưới", content);

        // Set the email's content to be the HTML template
        message.setContent(htmlTemplate, "text/html; charset=utf-8");

        mailSender.send(message);
    }

}
