package com.hms.gateway.filter;


import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

@Component
public class TokenFilter extends AbstractGatewayFilterFactory<TokenFilter.Config> {

    private static final String SECRET_KEY = "33c4f9eebc05c3b6803d091f8d61e1ca70eeaccf822592808fa78e2ad6efc93ecc2ef312ff8922b63dc213ec966dc8cc584d038a6a33e1e39ad3c19f5ea32909";

    public TokenFilter(){
        super(Config.class);
    }

    public static class Config{

    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain)-> {
            String path = exchange.getRequest().getPath().toString();
            if(path.equals("/user/login")||path.equals("/user/register")){
                return chain.filter(exchange.mutate().request(r->r.header("X-Secret-Key", "SECRET")).build());
            }
            HttpHeaders headers = exchange.getRequest().getHeaders();
            if(!headers.containsKey(HttpHeaders.AUTHORIZATION)){
                throw new RuntimeException("Authorization header is missing");
            }
            String authHeader = headers.getFirst(HttpHeaders.AUTHORIZATION);
            if(authHeader==null || !authHeader.startsWith("Bearer")){
                throw new RuntimeException("Invalid Authorization header");
            }
            String token = authHeader.substring(7);
            try{
                Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
                exchange = exchange.mutate().request(r->r.header("X-Secret-Key", "SECRET")).build();
            }
            catch (Exception e) {
                throw new RuntimeException("Invalid token");
            }
            return chain.filter(exchange);
        };
    }
}
