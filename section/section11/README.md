## Section 11 : 데이터 동기화를 위한 kafka 활용 - 1

목차

- Kafka란?
- Kafka 설치
- Kafka Producer/Consumer
- Kafka Connect

## Kafka란?

**Apache Software Foundation 의 Scalar 언어로 된 오픈 소스 메시지 브로커 프로젝트**

- Open Source Message Broker Project

**링크드인(Linked-in) 에서 개발, 2011 년 오픈 소스화**

- 2014년 11월 링크드인에서 Kafka를 개발하던 엔지니어들이 Kafka 개발에 집중하기 위해 Confluent라는 회사 창립

**실시간 데이터 피드를 관리하기 위해 통일된 높은 처리량, 낮은 지연 시간을 지닌 플랫폼 제공**

### 특징

- Producer / Consumer 분리
- 메시지를 여러 Consumer 에게 허용
- 높은 처리량을 위한 메시지 최적화
- Scale-out 가능
- Eco-System

### Kafka Broker

- 실행 된 Kafka 애플리케이션 서버
- 3대 이상의 Broker Cluster 구성 (권장)
- Zookeeper 연동
    - 역할 : 메타데이터 (Broker ID, Controller ID 등) 저장
    - Controller 정보 저장
- n 개 Broker 중 1대는 Controller 기능 수행
    - Controller 역할
        - 각 Broker 에게 담당 파티션 할당 수행
        - Broker 정상 동작 모니터링 관리

```
Kafka 홈페이지
- http://kafka.apache.org

Kafka와 데이터를 주고받기 위해 사용하는 Java Library
- https://mvnrepository.com/artifact/org.apache.kafka/kafka-clients

Zookeeper 및 Kafka 서버 기동
$KAFKA_HOME/bin/zookeeper-server-start.sh  $KAFKA_HOME/config/zookeeper.properties
$KAFKA_HOME/bin/kafka-server-start.sh  $KAFKA_HOME/config/server.properties

Topic 생성
$KAFKA_HOME/bin/kafka-topics.sh --create --topic quickstart-events --bootstrap-server localhost:9092 --partitions 1

Topic 목록 확인
$KAFKA_HOME/bin/kafka-topics.sh --bootstrap-server localhost:9092 --list

Topic 정보 확인
$KAFKA_HOME/bin/kafka-topics.sh --describe --topic quickstart-events --bootstrap-server localhost:9092

Windows에서 기동
- 모든 명령어는 $KAFKA_HOME\bin\windows 폴더에 저장
- .\bin\windows\zookeeper-server-start.bat  .\config\zookeeper.properties

메시지 생산
$KAFKA_HOME/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic quickstart-events

메시지 소비
$KAFKA_HOME/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic quickstart-events --from-beginning
```

## Kafka Connect

- Data 를 Import / Export 가능
- 코드 없이 Configuration 으로 데이터를 이동
- Standalone mode, Distribution mode 지원
    - RESTful API 통해 지원
    - Stream 또는 Batch 형태로 데이터 전송 가능
    - 커스텀 Connector 를 통한 다양한 Plugin 제공 (file, S3, Hive, Mysql, etc.. )

<img src="/img/16.png" width="500px;">

```
**Kafka Connect 설치**
curl -O http://packages.confluent.io/archive/5.5/confluent-community-5.5.2-2.12.tar.gz
curl -O http://packages.confluent.io/archive/6.1/confluent-community-6.1.0.tar.gz
tar xvf confluent-community-6.1.0.tar.gz
cd  $KAFKA_CONNECT_HOME

**Kafka Connect 실행**
./bin/connect-distributed ./etc/kafka/connect-distributed.properties

**JDBC Connector 설치**
- https://docs.confluent.io/5.5.1/connect/kafka-connect-jdbc/index.html
- confluentinc-kafka-connect-jdbc-10.0.1.zip 

**etc/kafka/connect-distributed.properties 파일 마지막에 아래 plugin 정보 추가**
- plugin.path=[confluentinc-kafka-connect-jdbc-10.0.1 폴더]

**JdbcSourceConnector에서 MariaDB 사용하기 위해 mariadb 드라이버 복사**
./share/java/kafka/ 폴더에 mariadb-java-client-2.7.2.jar  파일 복사

**JDBC Connector (Source and Sink) 설치**
https://www.confluent.io/hub/confluentinc/kafka-connect-jdbc

```

추가수정</br>
./kafka_utils/confluent-6.1.0/etc/kafka/connect-distributed.properties // plugin 수정</br>
cp /Users/bigpenguin/.m2/repository/org/mariadb/jdbc/mariadb-java-client/2.7.2/mariadb-java-client-2.7.2.jar /Users/bigpenguin/project/Inflearn-Spring-Cloud-MSA/kafka_utils/confluent-6.1.0/share/java/kafka // 파일 추가

```
**Kafka Source Connect 추가 (MariaDB)**

echo '
{
"name" : "my-source-connect",
"config" : {
"connector.class" : "io.confluent.connect.jdbc.JdbcSourceConnector",
"connection.url":"jdbc:mysql://localhost:3306/mydb",
"connection.user":"root",
"connection.password":"test1357",
"mode": "incrementing",
"incrementing.column.name" : "id",
"table.whitelist":"users",
"topic.prefix" : "my_topic_",
"tasks.max" : "1"
}
}
' | curl -X POST -d @- http://localhost:8083/connectors --header "content-Type:application/json"
Kafka Source Connect 관련해서 최낙원님이 공유해 주신 내용도 참고해 주시기 바랍니다. 감사합니다. 
https://www.inflearn.com/questions/199173
```

```
**Kafka Sink Connect 추가 (MariaDB)**

echo '
{
"name":"my-sink-connect",
"config":{
"connector.class":"io.confluent.connect.jdbc.JdbcSinkConnector",
"connection.url":"jdbc:mysql://localhost:3306/mydb",
"connection.user":"root",
"connection.password":"test1357",
"auto.create":"true",
"auto.evolve":"true",
"delete.enabled":"false",
"tasks.max":"1",
"topics":"my_topic_users"
}
}
'| curl -X POST -d @- http://localhost:8083/connectors --header "content-Type:application/json"
```
