package com.ecommerce.backend.services.impl;

import com.ecommerce.backend.domain.models.Supply;
import com.ecommerce.backend.domain.payload.request.CountEmployee;
import com.ecommerce.backend.domain.payload.request.SupplyRequest;
import com.ecommerce.backend.exception.BadRequestException;
import com.ecommerce.backend.repository.SupplyRepository;
import com.ecommerce.backend.services.SupplyService;
import com.ecommerce.backend.utils.MapperUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplyIml implements SupplyService {
    @Autowired
    SupplyRepository supplyRepository;
    private final MapperUtils mapperUtils;

    public SupplyIml(MapperUtils mapperUtils) {
        this.mapperUtils = mapperUtils;
    }

    @Override
    public void createSupply(SupplyRequest supplyRequest) {
        List<Supply> supplyList = supplyRepository.findAll();
        for (Supply supply : supplyList) {
            if (supplyRequest.getName().equals(supply.getName())) {
                throw new BadRequestException("Trùng tên nhà cung cấp");
            }
        }
        Supply supply = new Supply();
        supply.setName(supplyRequest.getName());
        supply.setPhone(supplyRequest.getPhone());
        supply.setAddress(supplyRequest.getAddress());
        supply.setEmail(supplyRequest.getEmail());
        supplyRepository.save(supply);
    }

    @Override
    public Page<SupplyRequest> getAll(Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Supply> supplyPage = supplyRepository.findAll(pageable);
        return mapperUtils.convertToResponsePage(supplyPage, SupplyRequest.class, pageable);
    }

    @Override
    public void changeSupply(Integer id, SupplyRequest supplyRequest) {
        Optional<Supply> supplyOptional = supplyRepository.findById(id);
        if (supplyOptional.isPresent()) {
            Supply supply = supplyOptional.get();
            supply.setEmail(supplyRequest.getEmail());
            supply.setName(supplyRequest.getName());
            supply.setPhone(supplyRequest.getPhone());
            supply.setAddress(supplyRequest.getAddress());
            supplyRepository.save(supply);
        } else {
            throw new BadRequestException("Không tìm thấy nhà cung cấp");
        }
    }

    @Override
    public void deleteSupply(Integer id) {
        Optional<Supply> supplyOptional = supplyRepository.findById(id);
        if (supplyOptional.isPresent()) {
            Supply supply = supplyOptional.get();
            supplyRepository.delete(supply);
        } else {
            throw new BadRequestException("Không tìm thấy nh cung cấp");
        }
    }

    @Override
    public ResponseEntity<SupplyRequest> findByName(String name) {
        Supply supply = supplyRepository.findByName(name);
        if (supply == null) {
            throw new BadRequestException("không tìm thấy nhà cung cấp");
        }
        return new ResponseEntity<>(mapperUtils.convertToResponse(supply, SupplyRequest.class), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<SupplyRequest> getById(Integer id) {
        Supply supply = supplyRepository.findById(id).get();
        if (supply == null) {
            throw new BadRequestException("không tìm thấy nhà cung cấp");
        }
        SupplyRequest supplyRequest = mapperUtils.convertToEntity(supply, SupplyRequest.class);
        return new ResponseEntity<>(supplyRequest, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CountEmployee> countSupply() {
        List<Supply> supplyList = supplyRepository.findAll();
        int total = supplyList.size();
        CountEmployee countEmployee = new CountEmployee();
        countEmployee.setCount(total);
        return new ResponseEntity<>(countEmployee, HttpStatus.OK);
    }
}
