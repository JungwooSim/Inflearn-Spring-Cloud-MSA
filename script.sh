rabbitmq-server #rabbitmq 시작 (homebrew install)

# JDK 을 이용한 RSA private key file 발급
keytool -genkeypair -alias apiEncryptionKey -keyalg RSA \
-dname "CN=big, OU=API Development, O=joneconsulting.co.kr, L=Seoul, C=KR" \
-keypass "1q2w3e4r" -keystore apiEncryptionKey.jks -storepass "1q2w3e4r"

# RSA private key 정보
keytool -list -keystore apiEncryptionKey.jks -v

# RSA private key 를 이용하여 Public key 발급
keytool -export -alias apiEncryptionKey -keystore apiEncryptionKey.jks -rfc -file trustServer.cer

# RSA Public key 를 이용하여 private key 발급
keystore % keytool -import -alias trustServer -file trustServer.cer -keysotre publicKey.jks

# zookeeper server start
./bin/zookeeper-server-start.sh ./config/zookeeper.properties

# kafka server start
./bin/kafka-server-start.sh ./config/server.properties

# kafka topic list
./bin/kafka-topics.sh --bootstrap-server localhost:9092 --list

# kafka topic create
./bin/kafka-topics.sh --bootstrap-server localhost:9092 --create --topic quickstart-event --partitions 1 --replication-factor 1

# kafka topic describe
./bin/kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic quickstart-event

# kafka topic broker Start
./bin/kafka-console-producer.sh --broker-list localhost:9092 --topic quickstart-event

# kafka topic consumer Start
./bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic quickstart-event --from-beginning
