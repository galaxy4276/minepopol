# 3D Interaction Spec (Hero)

## 목적
- Motto-xx 감성(미니멀+타이포+공간감)을 해치지 않으면서
- ‘조용한 고급스러움’으로 첫 인상을 만들고
- 콘텐츠(텍스트/프로젝트)가 주인공이 되게 한다.

---

## 1) 3D 오브젝트 컨셉
### 형태(확정)
- **Orb**: 반투명 유리 구체 + 얇은 라이트 링

### 재질(확정)
- **Frosted Glass(서리 낀 유리)** + 미세 노이즈
- 과한 반사/네온 금지

### 컬러(확정)
- 기본은 배경 톤에 묻히게
- 링: **아주 얇은 white/ice-blue, 글로우 거의 없음**
- Accent 색(#3DFFB6 등)은 스펙큘러/림라이트 정도로만(있어도 ‘티 안 나게’)

---

## 2) 인터랙션 동작(강도 낮게)
### 입력
- Desktop: mouse move (parallax)
- Mobile: device orientation(가능하면) + fallback
- Scroll: 아주 미세한 z-translate / rotation (구간 1번만)

### 강도(가이드)
- rotation: max 6~10°
- translate: max 12~24px
- easing: fast-in, slow-out

### 스크롤 구간
- Hero 0~40vh: 오브젝트가 ‘깨어남’(opacity/blur 감소)
- 40~80vh: 오브젝트가 서서히 뒤로 물러남(텍스트/Works가 주인공)

---

## 3) 성능/접근성 규칙
- prefers-reduced-motion: 3D off 또는 정지(Poster로 대체)
- 네트워크/저전력 모드: 품질 다운(해상도, 샘플링)
- 모바일 저사양: 3D 대신 `hero-orb-poster.jpg`로 교체

---

## 4) 로딩 전략
- Above-the-fold 텍스트 먼저
- 3D는 lazy-load + skeleton/poster
- 로딩 중에도 타이포가 흔들리면 안 됨

---

## 5) 필요한 애셋(확정)
- `hero-orb.glb`
- `hero-orb-poster.jpg`
- `hero-noise.png` (선택)

---

## 6) QA 체크리스트
- 첫 화면 10초 내: 텍스트 가독성 OK
- 마우스 움직임이 ‘장난감’처럼 보이지 않음
- 스크롤할 때 멀미/진동 없음
- 모바일에서 배터리/발열 과도하지 않음
- reduce-motion에서 완전히 안정적
