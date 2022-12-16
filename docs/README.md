## 애플리케이션 Flow

1. 다리 건너기 게임 시작 문구 띄우기

```
다리 건너기 게임을 시작합니다.
```

2. 사용자로부터 다리 길이를 입력받는다.

```
다리의 길이를 입력해주세요.
3
```

3. 입력 받은 다리 길이만큼 무작위 값을 생성해 다리를 생성한다.
   다리는 위 칸과 아래 칸 중 건널 수 있는 칸은 0과 1 중 무작위 값을 이용해서 생성한다.
   이 때 0(위 칸)은 U, 1(아래 칸)은 D로 변경한다.

```
// EX. 1 0 1
-> D U D
```

4. 사용자로부터 이동할 칸을 입력받는다.
   위는 U, 아래는 D이다.

   ```
   이동할 칸을 선택해주세요. (위: U, 아래: D)
   U
   [ O ]
   [   ]
   ```

4.1. 이번에 입력한 U, D가 사다리의 칸의 값과 다를 때 게임 종료 후 재시작 여부를 묻는다.
즉 이번에 들어온 값과 사용자의 position에 해당되는 사다리의 칸이 다를 경우 게임이 종료된다.

```
이동할 칸을 선택해주세요. (위: U, 아래: D)
U
[ O | X ]
[   |   ]

게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)
R
```

4.2. 게임을 재시작할 시 총 시도 횟수를 +1 한다.

5. 성공적으로 다리 길이만큼 이동을 했다면 게임은 성공한다.

- 다리 출력
- 게임 성공 여부: 성공 / 총 시도 횟수 출력

# 모듈

## BridgeView

게임 입출력 담당 (InputView, OutputView 로직 위임)

### 1. InputView

- [x] 다리 길이 입력 readBridgeSize
- [x] 이동할 칸 입력 readMoving
- [x] 게임 재시작 여부 입력 readGameCommand

### 2. OutputView

- [x] 게임 시작 메세지
- [x] 현재까지 이동한 다리의 상태 출력 printMap
- [x] 게임의 최종 결과를 정해진 형식에 맞춰 출력 printResult

## BridgeMaker

다리 생성 모듈

- 사용자로부터 입력받은 다리 길이만큼 다리 생성
- 무작위로 0과 1을 입력받으면 이를 U, D로 변경해 다리 배열 생성

## BridgeGame

게임 프로세스 담당

- [x] 게임 시작 start
- [x] 가리 길이 입력받고 다리 생성 gameProcess
- [x] 사용자로부터 이동할 칸 입력받기 getUserCommand
- [x] 다리 건너기 move
- [x] 게임 재시작 여부 묻기 quitOrRetryByCommand
- [x] 게임 재시작 retry
- [x] 게임 종료 exit
- [x] 최종 결과 출력 하기 end

## BridgeModel

게임 모델

- 필드

  - 시도 횟수 tryCount
  - 정답 다리 answerBridge
    - ex. [U, D, U, D]
  - 사용자가 현재까지 건넌 다리 상태 userBridge
    - ex. [U, D, U]
  - 사용자의 position

- [x] 다리 생성 makeBridge
- [x] 사용자로부터 입력받은 command를 다리에 추가하기 addCommandToUserBridge
- [x] 게임 결과 만들기 makeMovedResult
- [x] 게임 성공 여부 판별 checkIsSuccess
- [x] 게임 최종 결과 만들기 makeFinalResult
- [x] 게임 재시작 시 상태 변경 setStatusForNextGame
  - 1. tryCount + 1
  - 2. position = 0
  - 3. userBridge = []
- [x] 유저 position 변경 setUserPosition
  - 1. position + 1
  - 2. userBridge.push(현재 칸)

## BridgeMap

- [x] 현재 유저의 다리 상태 생성
  - input: position / answerBridge / userBridge
  - output: 현재 유저 다리 상태

## Validator

유효성 검사

### 1. SizeValidator

다리 길이 유효성 검사

- [x] 숫자 여부
- [x] 3과 20 사이 여부

### 2. CommandValidator

사용자로부터 칸 입력 받기 (U or D)

- [x] U or D를 입력받았는지 여부

### 3. ReplayValidator

- [x] 재시작 여부를 물을 시 R or Q 입력 여부

<br />

# 소감문 (우테코에 붙이기)

안녕하세요. 이번 우아한테크코스 프론트엔드 전형에 지원한 홍승연입니다.

감사하게도 1차 합격을 하게되어 최종 테스트를 보게 되었네요. <br />
스스로 많이 부족하다고 생각해 정말 아직도 얼떨결한 마음이네요.

최종 코딩 테스트를 보게 해주신 우아한테크코스 분들께 감사의 말을 올립니다.

<br />

[프로젝트 구조]

1. MVC 패턴을 이용해 비즈니스 로직과 UI 로직 분리
2. 게임에 대한 인터페이스와 추상클래스를 구현해 다형성 구현
3. App은 실행부를, 컨트롤러는 진행부를 담당하여 추후 게임 변경 시에 유연하게 대응(ex. 다리 건너기 게임에서 로또 게임으로 변경할 시, App에서 컨트롤러를 변경하면 된다)
4. 컨트롤러에 뷰와 모델을 DI하여 추후 스펙 변경에 용이하게 구현
5. 입출력을 담당하는 InputView, OutputView 객체들의 로직을 뷰 클래스에 위임하여 추후 입출력 채널 변경 시 컨트롤러를 수정하지 않게끔 구현
6. View 클래스에서 에러 바운더리 util 정의하여 로직과 에러 처리를 분리
