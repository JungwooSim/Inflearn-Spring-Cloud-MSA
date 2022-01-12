## Section 8 : Spring Cloud Bus
목차

- Spring Cloud Bus
- RabbitMQ 설치
- 프로젝트 수정 - Actuator 추가
- 테스트

## Spring Cloud Bus

### 역할

- 분산 시스템의 노드(Micro Service)를 경량 메시지 브로커와 연결
- 상태 및 구성에 대한 변경 사항을 연결된 노드에게 전달(Broadcast)

AMQP(Advanced Messages Queuing Protocal) 로 연결되어있고, Spring Cloud Config Server 에서 변경된 부분을 MS(Micro Service)에 알려주게 된다.</br>
특정 MS 에서 변경된 것을 확인하면 Spring Cloud Bus 를 통해 다른 MS 에도 변경된 Config 를 적용하게 된다.

**AMQP (Advanced Message Queuuing Protocal)**

- 메시지 지향, 큐잉, 라우팅 (P2P, Publisher-Subcriber), 신뢰성, 보안
- Erlang, RabbitMQ에서 사용

**Kafka 프로젝트**

- Apache software Foundation 이 Scalar 언어로 개발한 오픈 소스 메시지 브로커 프로젝트
- 분산형 스트리밍 플랫폼
- 대용량의 데이터를 처리 가능한 메시징 시스템

**RabbitMQ vs. Kafka**

RabitMQ

- 메시지 브로커
- 초당 20+ 메시지를 소비자에게 전달
- 메시지 전달 보장, 시스템 간 메시지 전달
- 브로커, 소비자 중심

Kafka

- 초당 100k+ 이상의 이벤트 처리
- Pub/Sub, Topic 에 메시지 전달
- Ack 를 기다리지 않고 전달 가능
- 생산자 중심

```yaml
RabitMQ 정보 (Home Brew Install)
dashboard : http://localhost:15672
Username : guest
Password : guest
server post : 5672
```
