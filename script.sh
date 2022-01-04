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
