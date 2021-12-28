mvn spring-boot:run

mvn spring-boot:run -Dspring-boot.run.jvmArguments='-Dserver.port=9003'

# 빌드된 파일 삭제
mvn clean

# 빌드 후 잡파일 생성
mvn compile pakcage

java -jar -Dserver.port=9004 ./target/user-service-0.0.1-SNAPSHOT.jar
