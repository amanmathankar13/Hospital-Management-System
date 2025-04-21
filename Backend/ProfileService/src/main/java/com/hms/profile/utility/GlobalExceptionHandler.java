package com.hms.profile.utility;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.hms.profile.exception.HMSException;

import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @Autowired
    Environment environment;

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ErrorInfo> handleException(Exception e) {
        ErrorInfo errorInfo = new ErrorInfo("Some error occured",HttpStatus.INTERNAL_SERVER_ERROR.value(), LocalDateTime.now());
        return new ResponseEntity<>(errorInfo, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = HMSException.class)
    public ResponseEntity<ErrorInfo> handleHMSException(HMSException e) {
        ErrorInfo errorInfo = new ErrorInfo(environment.getProperty(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR.value(), LocalDateTime.now());
        return new ResponseEntity<>(errorInfo, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = {MethodArgumentNotValidException.class, ConstraintViolationException.class})
    public ResponseEntity<ErrorInfo> handleValidationException(Exception e) {
        String errorMessage = "";
        if (e instanceof MethodArgumentNotValidException manv) {
            errorMessage = manv.getBindingResult().getAllErrors().stream().map(ObjectError::getDefaultMessage).collect(Collectors.joining(", "));
        }
        else if (e instanceof ConstraintViolationException cv) {
            errorMessage = cv.getConstraintViolations().iterator().next().getMessage();
        }
        ErrorInfo errorInfo = new ErrorInfo(errorMessage, HttpStatus.BAD_REQUEST.value(), LocalDateTime.now());
        return new ResponseEntity<>(errorInfo, HttpStatus.BAD_REQUEST);
    }

}
