package com.hms.user.service;

import com.hms.user.dto.UserDTO;
import com.hms.user.exception.HMSException;

public interface UserService {

    public void registerUser(UserDTO userDTO) throws HMSException;
    public UserDTO loginUser(UserDTO userDTO) throws HMSException;
    public UserDTO getUserById(Long id);
    public void updateUser(UserDTO userDTO);
    public UserDTO getUserByEmail(String email) throws HMSException;
}
