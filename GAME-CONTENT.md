# 게임 저장소와 PIBO 콘텐츠 운영

2026-11-14 갱신. 게임은 각각 독립 저장소로 관리하고, 소개·블로그·가이드는 `pibostudio`에 모은다.

## 어디에서 무엇을 고치나

| 대상 | 담당 저장소/폴더 | 내용 |
|---|---|---|
| 장독대 정원 | `myupyu/jangdokgarden` | 게임 코드·원본 그림/소리·기획·빌드 |
| 저승분식 | `myupyu/midnightbunsik` | 게임 코드·원본 그림/소리·기획·빌드 |
| StockPets | `myupyu/stockpets` | 기존 게임. 독립 웹사이트도 보존 |
| 서울 골목 1988 | 로컬 `../games/seoul-alley-1988` | dashboard에서 이력·최신 소스를 분리. GitHub 원격 저장소 미연결 |
| 모든 제품의 소개·블로그·가이드 | `myupyu/pibostudio` | 제품 데이터, 글, 웹용 이미지, 공통 화면 |
| 로컬 게임 찾기 | `../games/README.md`, `../games/catalog.json` | 모음 폴더. 다른 세 게임은 기존 위치로 가는 바로가기 |

`games/`는 로컬 정리 폴더이며 하나의 Git 저장소가 아니다. `pibostudio` 안에 게임 실행 프로젝트나 하위 Git 저장소를 넣지 않는다. 각 게임의 배포·이슈·의존성·비공개 설정은 해당 게임에서 관리한다.

## 사이트 구조

| 게임 | 소개 | 블로그 | 가이드 |
|---|---|---|---|
| 장독대 정원 | `/jangdokgarden/` | `/jangdokgarden/blog/` | `/jangdokgarden/guides/` |
| 저승분식 | `/midnightbunsik/` | `/midnightbunsik/blog/` | `/midnightbunsik/guides/` |
| 서울 골목 1988 | `/seoul-alley-1988/` | `/seoul-alley-1988/blog/` | `/seoul-alley-1988/guides/` |
| StockPets | `/stockpets/` | `/stockpets/blog/` | `/stockpets/guides/` |

한국어는 모든 경로 맨 앞에 `/ko`를 붙인다. `/games/`는 게임 모음, `/blog/`는 전체 글 모음이다. 소개와 글은 위의 제품별 경로를 정식 주소로 사용한다.

## 글과 이미지를 추가하는 위치

```text
src/content/
  products/{game}.json           소개·기능·FAQ·확인된 스토어 링크
  blog/ko/{game}-{article}.md    한국어 소개·제작기·업데이트
  blog/en/{game}-{article}.md    대응 영어 글
  guides/{ko,en}/...             플레이 방법·저장 안내
  policies/{ko,en}/...           검토된 개인정보·지원 문서
public/products/{game}/          웹에서 쓸 아이콘·원화·검수된 화면
```

새 글에는 `product: "게임슬러그"`를 넣는다. 대응 언어는 같은 `key`를 사용하고 URL용 `slug`는 글마다 고유하게 정한다. 이 정보로 제품별 목록·전체 블로그·언어 전환·RSS·사이트맵이 생성된다. 글 제목이나 디렉터리 순서로 게임을 구분하지 않는다.

소개 글은 스포일러 없는 플레이 경험, 제작기는 구현된 변경과 남은 일, 업데이트는 실제 배포한 버전의 변경점을 다룬다. 검수판 변경을 공개 출시 소식으로 표현하지 않는다. 작성 중에는 `draft: true`를 사용한다. 글 유형별로 별도 사이트나 새 템플릿을 만들 필요는 없다.

제품 데이터의 선택 항목 `artwork`에 `src`, `alt.ko/en`, `label.ko/en`을 넣으면 해당 게임 원화를 카드·소개·블로그 표지에서 쓴다. 다른 게임의 그림을 테마 색에 따라 재사용하지 않는다. 실제 스크린샷과 원화는 설명에서 구분한다. 원본은 해당 게임에 보존하고 웹용 복사본의 출처와 해시는 `docs/asset-provenance.json`에 기록한다.

## 새 게임 추가 순서

1. 독립 게임 저장소를 만들고 코드·원본 에셋·빌드 절차를 그곳에 둔다.
2. `ADD-GAME.md`에 따라 제품 JSON과 웹용 이미지를 추가한다.
3. `ADD-POST.md`에 따라 한국어/영어 첫 글을 추가한다. 가이드가 없으면 가이드 링크가 생성되지 않는다.
4. `npm run build`, `npm run check:site`를 실행하고 모바일/데스크톱·언어 전환·밝은/어두운 화면을 확인한다.
5. 가격·출시 여부·스토어 주소는 해당 시점의 소유 자료와 공개 스토어로 확인한다. 공개 배포는 완성된 변경을 검토한 뒤 기존 Git 배포 절차로 진행한다.
