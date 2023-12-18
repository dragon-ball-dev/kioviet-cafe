package com.ecommerce.backend.repository.impl;

import com.ecommerce.backend.domain.models.Stock;
import com.ecommerce.backend.repository.BaseRepository;
import com.ecommerce.backend.repository.StockRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Repository
public class StockRepositoryCustomImpl implements StockRepositoryCustom {
    @PersistenceContext
    private EntityManager em;

    @Override
    public Page<Stock> searchingStock(String keyword, Pageable pageable) {
        StringBuilder strQuery = new StringBuilder();
        strQuery.append( " from kiotviet.stock s where 1=1 ");

        Map<String, Object> params = new HashMap<>();
        if (Objects.nonNull(keyword) && !keyword.isEmpty()) {
            strQuery.append(" AND s.name LIKE :keyword  ");
            params.put("keyword", "%"+keyword+"%");
        }
        String selectQuery = "select * " + strQuery;
        String strCountQuery = "SELECT COUNT(DISTINCT s.id)" + strQuery;
        return  BaseRepository.getPagedNativeQuery(em,selectQuery, strCountQuery, params, pageable, Stock.class);
    }

    @Override
    public Page<Stock> searchingStockByStoreId(Long storeId, Pageable pageable) {
        StringBuilder strQuery = new StringBuilder();
        strQuery.append(" from kiotviet.stock s " +
                "inner join kiotviet.product p on s.product_id  = p.id " +
                "inner join kiotviet.store st on s.store_id = st.id " +
                "where 1=1 and s.quantity > p.total_quantity ");

        Map<String, Object> params = new HashMap<>();
        if (Objects.nonNull(storeId)) {
            strQuery.append(" AND st.id = :storeId  ");
            params.put("storeId", storeId);
        }

        String selectQuery = "select * " + strQuery;
        String strCountQuery = "SELECT COUNT(DISTINCT s.id)" + strQuery;

        return  BaseRepository.getPagedNativeQuery(em,selectQuery, strCountQuery, params, pageable, Stock.class);
    }
}
