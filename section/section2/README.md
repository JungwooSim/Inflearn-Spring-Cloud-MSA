## Section 2 : API Gateway Service
목차</br>
- API Gateway Service
- Netflix Ribbon 과 Zuul
- Spring Cloud Gateway - 기본

## API Gateway Service
사용자가 설정한 라우팅 설정에 따라서 각각 엔드포인트로 클라이언트 대신 요청하고 다시 클라이언트에게 응답할 수 있다.</br>
시스템의 내부 구조는 숨기고 외부 요청에대해서 적절한 형태로 가공하여 응답할수 있는 장점을 가진다.

### **특징**
- 인증 및 권한 부여
- 서비스 검색 통합
- 응답 캐싱
- 정책, 회로 차단기 및 QoS 다시 시도
- 속도 제한
- 부하 분산
- 로깅, 추적, 상관 관계
- 헤더, 쿼리 문자열 및 청구 변환
- IP 허용 목록에 추가

### Netflix Ribbon : Client Side Load Balancer
- 서비스 이름으로 호출
- Health Check

### Netfilx Zuul : Gateway 역할

<img src="/img/3.png" width="500px;">

**구성**</br>
- First Service
- Second Service
- Netfilx Zuul

## Netflix Ribbon 과 Zuul

## Spring Cloud Gateway - 기본

Spring Cloud Gateway 와 Zuul 와의 가장 큰 차이점은 Spring Cloud Gateway 에서 비동기 방식을 사용한다는 점이다.</br>
(Zuul 도 최근 버전부터는 비동기를 제공하지만, Spring 라이브러리와의 호환성 문제로 인인해 Spring Cloud Gateway 가 Zuul 을 대신한다)

## Spring Cloud Gateway - Filter

**Gateway** **Filter 적용 방법**

- `@Configuration` 로 등록하여 `RouteLocator` 타입을 반환하는 Bean  등록
- yml 파일
- `AbstractGatewayFilterFactory` 를 상속 후 구현

> filter 는 `default-filters` 와 `routes 의 filter` 2가지가 있는데, `default-filters` 가 먼저 실행 후 `routes 의 filter` 가 실행된다.
`AbstractGatewayFilterFactory` 를 이용하여 구현할 때 `OrderedGatewayFilter` 를 이용하여 구현하면 우선순위를 설정할 수 있다.
>

### YML

```yaml
server:
  port: 8000

eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
    service-url:
      defaultZone: http://localhost:8761/eureka

spring:
  application:
    name: apigateway-service
  cloud:
    gateway:
      default-filters:
        - name: GlobalFilter
          args:
            baseMessage: Spring Cloud Gateway Global Filter
            preLogger: true
            postLogger: true
      routes:
        - id: first-service
          uri: http://localhost:8081/
          predicates:
            - Path=/first-service/**
          filters:
#            - AddRequestHeader=first-request, first-request-header2
#            - AddResponseHeader=first-response, first-response-header2
            - name: CustomFilter
        - id: second-service
          uri: http://localhost:8082/
          predicates:
              - Path=/second-service/**
          filters:
#            - AddRequestHeader=second-request, second-request-header2
#            - AddResponseHeader=second-response, second-response-header2
            - name: CustomFilter
            - name: LoggingFilter
              args:
                baseMessage: Spring Cloud Gateway Global Filter
                preLogger: true
                postLogger: true
```

## Spring Cloud Gateway - Eureka 연동

<img src="/img/4.png" width="500px;">
