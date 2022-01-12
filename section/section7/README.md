## Section 7 : Configuration Service 

목차

- Spring Cloud Config
- Local Git Repository
- Microservice 에 적용
- Spring Boot Actuator
- Profile 적용
- Remote Git Repository
- Native File Repository

## Spring Cloud Config

### 특징

- 분산 시스템에서 서버 클라이언트 구성에 필요한 설정 정보(application.yml)를 외부 시스템에서 관리
- 하나의 중앙화 된 저장소에서 구성요소 관리 가능
- 각 서비스를 다시 빌드하지 않고 바로 적용 가능
- 애플리케이션 배포 파이프라인을 통해 DEV-UAT-PROD 환경에 맞는 구성 정보 사용

<img src="/img/14.png" width="500px;">

<img src="/img/15.png" width="500px;"></br>
(각 환경에 맞게 설정 정보 전달)

## Local Git Repository

### YML File 우선순위

1. application.yml
2. application-name.yml
3. application-name-<profile>.yml

### Srping Cloud Config 정보 갱신

- 서버 재기동 (수정 후 사용하는 서버)
- Actuator refresh
- Spring cloud bus 사용

### Spring Boot Actuator

- Application 상태, 모니터링
- Metirc 수집을 위한 Http End point 제공([https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html](https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html))
