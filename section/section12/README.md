## Section 12 : 데이터 동기화를 위한 kafka 활용 - 2
## 데이터 동기화

### 1. Orders → Catalogs

- Orders Service 에 요청된 주문의 수량 정보를 Catalogs Service 에 반영
- Orders Service 에서 Kafka Topic 으로 메시지 전송 → Producer
- Catalogs Service 에서 Kafka Topic 에 전송된 메시지 취득 → Consumer

<img src="/img/17.png" width="500px;">
