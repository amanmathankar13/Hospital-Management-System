package com.hms.user.config;

import org.springframework.context.annotation.Configuration;

import feign.RequestInterceptor;
import feign.RequestTemplate;


@Configuration
public class FeignClientInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate arg0) {
        arg0.header("X-Secret-Key", "SECRET");
    }

}
