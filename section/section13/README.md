## Section 13 : 장애 처리와 Microservice 분산 추적
목차

- CircuitBreaker
- Resilience4j
- Distributed Tracing
- TraceId and Span ID
- Zipkin server 활용

## Circuit Breaker

Microservice 통신시 오류 발생시 준비해놓은 response 를 응답주기 위해서 사용

### 특징

- 장애가 발생하는 서비스에  반복적인 호출이 되지 못하도록 차단
- 특정 서비스가 정상적으로 동작하지 않을 경우 다른 기능으로 대체 수행 → 장애 회피

<img src="/img/18.png" width="500px;"></br>
<img src="/img/19.png" width="500px;">

Closed 와 Open 두가지 상태가 있다.</br>
Closed 는 MS 를 정상적으로 사용가능한 경우이고, Open 은 그 반대이다.

## Resilience4j

Spring Cloud Netflix Hystrix 는 Spring 에서 더이상 지원을 하지 않으므로 이를 대체하기 위한 프로젝트이다.

<img src="/img/20.png" width="500px;">

- resilience4j - circuitbreaker: Circuit breaking
- resilience4j - ratelimiter : Rate limiting
- resilience4j - bulkhead : Bulkheading
- resilience4j - retry : Automatic retrying (sync and async)
- resilience4j - timelimiter : Timeout handling
- resilience4j - cache : Result caching
- [https://resilience4j.readme.io/docs](https://resilience4j.readme.io/docs)/getting-started
- https://github.com/resilience4j/resilience4j

## Zipkin

- hptts://zipkin.io
- Twitter 에서 사용하는 분산 환경의 Timing 데이터 수집, 추적 시스템(오픈소스)
- Google Drapper 에서 발전하였으며, 분산환경에서의 시스템 병목 현상 파악
- Collector, Query Service, Database WebUI 로 구성
- span
    - 하나의 요청에 사용되는 작업의 단위
- Trace
    - 트리 구조로 이뤄진 Span 셋
    - 하나의 요청에 대한 같은 Trace ID 발급

<img src="/img/21.png" width="500px;">

### Spring Cloud Sleuth

- Spring boot 애플리케이션을 Zipkin 과 연동
- 요청 값에 따른 Trace Id, Span Id 부여
- Trace 와 Span Ids 를 로그에 추가 가능
    - servlet filter
    - rest template
    - scheduled actions
    - message channels
    - feign client

<img src="/img/22.png" width="500px;">
