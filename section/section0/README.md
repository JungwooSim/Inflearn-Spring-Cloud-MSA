## Section 0 : Microservice 와 Spring Cloud 소개

### 12 Factors
: Cloud Native Application 구축함에 있어 고려해야 할 12가지 요인

<img src="/img/1.png" width="500px;">

### SOA 와 MSA 와의 차이점

**서비스의 공유 지향점**</br>
SOA : 재사용을 통한 비용 절감</br>
MSA : 서비스 간의 결합성을 낮추어 변화에 능동적 대응

**기술 방식**</br>
SOA : 공통의 서비스를 ESB(Enterprise Service Bus) 에 모아 사업 측면에서 공통 서비스 형식으로 서비스 제공</br>
MSA : 각 독립된 서비스가 노출된 REST API 를 사용

### Spring Cloud 란?

**강의에서 사용하는 Spring Cloud**

- Centralized configuration management
    - Spring Cloud Config Server
- Location transparency
    - Naming Server (Eureka)
- Load Distribution (Load Balancing)
    - Ribbon (Client Side)
    - Spring Cloud Gateway
- Easier REST Clients
    - FeignClient
- Visibility and Monitoring
    - Zipkin Distributed Tracing
    - Netflix API gateway
- Fault Tolerance
    - Hystrix
