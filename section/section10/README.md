## Section 10 : 마이크로서비스간 통신 
목차

- Communication Types
- RestTemplate
- Feign Client - Log, Exception
- ErrorDecoder
- Multiple Orders service

## Communication Types

- Synchronous HTTP communication
- Asynchronous communication over AMQP

## Feign Client - Log, Exception

**FeignClient → HTTP Client**

- REST Call 을 추상화 한 Spring Cloud Netflix 라이브러리

**사용방법**

- 호출하려는 HTTP Endpoint 에 대한 Interface 를 생성
- @FeignClient 선언

**Load balanced 지원**

> @`EnableDiscoveryClient` 을 사용하고 있어야 한다.
