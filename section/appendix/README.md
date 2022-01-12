## Appendix : Microservice 패턴

목차

- Event Sourcing
- CQRS pattern
- Saga Pattern

## Event Sourcing Architecture

### Monolithic & Microservice

Monolithic

- 단일 데이터베이스
- 트랜잭션 처리 → ACID
    - Atomicity
    - Consistency
    - Isolation
    - Durable

Microservice

- 각 서비스마다 독립적인 DB (Polyglot)
- API 를 통해 접근
- Atomicity, Consistency
-

### Event Sourcing

- 데이터의 마지막 상태만 저장하는 것이 아닌, 해당 데이터에 수행된 전체 이력을 기록
- 데이터 구조 단순
- 데이터의 일관성과 트랜잭션 처리 가능
- 데이터 저장소의 개체를 직접 업데이트 하지 않기 때문에, 동시성에 대한 충돌 문제 해결

  <img src="/img/26.png" width="500px;">

- 도메인 주도 설계 (Domain-Driven Design)
    - Aggregate
    - Projection
- 메시지 중심의 비동기 작업 처리
- 단점
    - 모든 이벤트에 대한 복원에 시간이 오래 걸린다. → 스냅샷 으로 해결
    - 다양한 데이터 조회 → CQRS 로 해결

## CQRS Pattern

- CQRS (Command and Query Responsibility Segregation)
- 명령과 조회의 책임 분리
    - 상태를 변경하는 Command
    - 조회를 담당하는 Query

  <img src="/img/27.png" width="500px;">


### E-commerce application 적용

<img src="/img/28.png" width="500px;">

## Saga Pattern

- Application 에서 Transaction 처리
    - Choreography, Orchestration
- Application 이 분리된 경우에는 각각의 Local Transaction 만 처리
- 각 App 에 대한 연속적인 Transaction 에서 실패할 경우
    - Rollback 처리 구현 → 보상 Transaction (이라고 부름)
- 데이터의 원자성을 보장하지는 않지만, 일관성을 보장
- 마이크로 서비스에서 트랜잭션을 유지하기 위해 적합한 패턴

<img src="/img/29.png" width="500px;">

### Choreography - based saga

<img src="/img/30.png" width="500px;">

1) 주문 서비스에서 주문 요청(post) 을 수신하고 panding 상태의 주문 생성
2) 주문 생성 이벤트 전달
3) 고객 서비스의 Event handler 가 Credit  예약 시도
4) 결과 이벤트 전달
5) 주문 서비스의 Event handler 를 통해 주문 승인 or 거부

### Orchestration-based saga

<img src="/img/31.png" width="500px;">

1) 주문 서비스 주문 요청(POST) 을 수신하고 Create Order saga orchestrator 생성
2) Order saga orchestrator 가 pending 상태의 주문 생성
3) Credit 예약 명령을 고객 서비스에 전달
4) 고객 서비스가 Credit 예약 처리
5) 결과 메시지 전달
6) Order saga orchestrator 에서 주문의 승인 or 거부
