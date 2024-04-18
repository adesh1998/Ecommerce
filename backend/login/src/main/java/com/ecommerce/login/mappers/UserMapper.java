package com.ecommerce.login.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.ecommerce.login.dto.SignUpDto;
import com.ecommerce.login.dto.UserDTO;
import com.ecommerce.login.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    User signUpToUser(SignUpDto signUpDto);

}