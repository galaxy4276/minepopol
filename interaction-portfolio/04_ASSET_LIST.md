# Asset List (Filename + Description)

> 원활한 제작을 위해 **“필수(Must)” / “선택(Nice)”**로 구분.

---

## A) Branding
1) `logo-mark.svg` (Must)
- 개인 로고 마크(없으면 이니셜 모노그램)

2) `wordmark.svg` (Nice)
- 이름 워드마크(EN/JP 중 택1 또는 둘 다)

3) `favicon.ico` (Must)
- 파비콘

4) `og-image.png` (Must)
- 링크 공유용 OG 이미지(1200x630)

---

## B) Hero Media
### 옵션 1: 3D (선택됨)
1) `hero-orb.glb` (Must)
- **Frosted Glass 반투명 유리 구체(Orb) + 얇은 라이트 링** 1개 모델

2) `hero-orb-poster.jpg` (Must)
- 3D 로드 실패/리듀스 모션용 스틸 이미지(링은 white/ice-blue, 글로우 거의 없음)

3) `hero-noise.png` (Nice)
- 배경 노이즈 텍스처(반복 가능)

### 옵션 2: Video
1) `hero-loop.webm` (Must if video)
- 5~8초 루프, 무음, 저용량

2) `hero-loop.mp4` (Must if video)
- Safari 호환용

3) `hero-loop-poster.jpg` (Must)
- 비디오 포스터

---

## C) Project Assets (프로젝트: SOMETIME, Letter U)
각 프로젝트마다 동일 규격으로 준비

1) `work-01-cover.jpg` (Must)
- 카드 썸네일(가로형)

2) `work-01-gallery-01.jpg` (Nice)
3) `work-01-gallery-02.jpg` (Nice)
- 상세 이미지(없으면 cover만 사용)

4) `work-01-micro-demo.webm` (Nice)
- 3~5초 짧은 데모 루프(스크롤 구간에서 재질처럼 사용)

5) `work-01-metrics.json` (Nice)
- 수치가 있으면 키-값으로 정리(예: latency, DAU 등)

---

## D) About / Contact
1) `profile-photo.jpg` (Nice)
- 프로필 사진(없으면 아바타/이니셜)

2) `signature.svg` (Nice)
- 서명 스타일 그래픽

---

## E) Icons
1) `icon-git.svg` (Must)
2) `icon-linkedin.svg` (Must)
3) `icon-mail.svg` (Must)
4) `icon-location.svg` (Nice)

---

## F) Copy Deck (콘텐츠 원본 파일)
1) `copydeck.md` (Must)
- Hero/Works/About/CTA 원문을 한 파일에 모아 관리

2) `works-data.json` (Nice)
- Works 카드 데이터(프로젝트명/설명/스택/링크)

---

## G) Motion Spec (선택 문서)
1) `motion-spec.md` (Nice)
- 섹션별 애니메이션 타이밍/강도/트리거 정리
