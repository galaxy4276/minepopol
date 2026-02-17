# Style & Color Guide (Draft)

## 1) 디자인 방향
- 레퍼런스 톤: **미니멀, 타이포 중심, 넓은 여백, 낮은 채도의 재질감(그레인/노이즈), ‘고급스럽게 조용한’ 인터랙션**
- 핵심: 컨텐츠(문장/프로젝트)가 1순위, 인터랙션은 2순위

## 2) 컬러 팔레트(안)
### Palette A (차분/테크)
- Base / Background: #0B0D10 (near-black)
- Surface: #121621
- Text Primary: #F2F4F8
- Text Secondary: rgba(242,244,248,0.70)
- Accent (Neo-mint): #3DFFB6
- Accent (Soft blue): #7AA7FF
- Border: rgba(242,244,248,0.12)

### Palette B (오프화이트 + 잉크)
- Background: #F6F3EE
- Surface: #FFFFFF
- Text Primary: #101114
- Text Secondary: rgba(16,17,20,0.70)
- Accent (Ink): #2B59FF
- Accent (Warm gray): #B7AEA3
- Border: rgba(16,17,20,0.12)

권장: **Palette A** (3D/영상 재질과 잘 맞고, Motto-xx 느낌에 가까움)

## 3) 타이포그래피
- Display (Hero / Section Title): 굵고 큰 산세리프(자간 타이트)
- Body: 가독성 높은 산세리프(라인하이트 1.5~1.7)
- 숫자/메트릭: Tabular numbers 지원 권장

### JP With EN 레이어 규칙(확정)
- Layer A (Primary / JP): 의미 전달 1순위
  - opacity: 100%
  - weight: 600~800
  - tracking: -1% ~ 0% (타이트)
- Layer B (Secondary / EN): 보조 맥락/리듬
  - opacity: 35~55%
  - weight: 300~500
  - tracking: +2% ~ +6% (약간 넓게)
  - placement: JP와 동일 라인에 오버레이(또는 4~8px 오프셋)

원칙: 스크롤 중 **JP만 읽어도 완결**, EN은 “잔상”처럼 보조.

타이포 룰
- Hero: 2~3줄 이내
- 섹션 타이틀: 1줄 + 서브카피 1줄
- 카드 설명: 2~4줄 제한

## 4) 그리드/레이아웃
- 1 page, 12-column(데스크톱), 모바일 4-column
- 최대 폭: 1080~1200px 범위
- 여백은 크게(섹션 패딩: 96~140px, 모바일 64~96px)

## 5) 모션/인터랙션 톤
- Fast-in, slow-out (가속/감속 확실)
- Hover는 ‘튀지 않게’: 1) 밝기 2) 미세한 이동 3) 얕은 블러/노이즈
- 스크롤 기반 모션은 3개 규칙:
  1) 텍스트는 흔들지 않기
  2) 큰 움직임은 구간 1~2번만
  3) 반복/진동 효과 금지

## 6) 3D/비디오 가이드
- 3D 오브젝트는 1개만: **Frosted Glass Orb + 아주 얇은 white/ice-blue 링(글로우 거의 없음)**
- 영상은 5~8초 루프, 사운드 없음, 자동재생은 조건부(네트워크/저전력 고려)
- fallback: Poster 이미지 필수

## 7) UI 컴포넌트 룰
- Button: Primary(Accent 배경), Secondary(Outline), Ghost(텍스트)
- Link: 밑줄 대신 hover underline + 색 변화
- Card: Border + subtle noise + hover lift(2~4px)

## 8) 접근성
- 대비: WCAG AA 근접 목표
- 키보드 포커스 링 명확
- Reduce motion: 애니메이션 70~100% 축소, 3D off 가능
