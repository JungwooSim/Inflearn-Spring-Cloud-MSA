## Section 6 : Users Microservice - 2

목차

- Users Microservice - Login
- JWT (Json Web Token)
- API Gateway service - AuthorizationHeaderFilter

## User Microservice - Login

<img src="/img/13.png" width="500px;">

### Spring Security

로그인 요청 발생시 작업을 처리해주는 custom filter 클래스</br>
UsernamePasswordAuthenticationFilter 상속

## JWT (Json Web Token)

세션과 쿠키는 모바일 애플리케이션에서 유효하게 사용할 수 없다. (공유 불가)</br>
이 같은 문제를 해결하기 위해 나온 것이 Token(JWT, 등) 기반 인증시스템이다.

**특징**

- 인증 헤더 내에서  사용되는 토큰 포맷
- 두 개의 시스템끼리 안전한 방법으로 통신 가능
- 클라이언트 독립적인 서비스 (stateless)
- CDN (각 서버마다 세션을 공유할 필요 없음)
- No Cookie-Session (No CSRF, 사이트간 요청 위조)
- 지속적인 토큰 저장

## API Gateway Service - AuthorizationHeaderFilter

### Bearer Authentication

- API 에 접속하기 위해서는 access token 을 API 서버에 제출해서 인증 처리
- OAuth 를 위해서 고안된 방법 ([RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750))
