import React, { useState, useEffect, useCallback } from "react";

// 번역/옵션/템플릿은 기존 코드와 동일 (여기선 필수 부분만 유지)
const translations = {
  ko: {
    title: "AI 영상 프롬프트 생성기",
    subtitle: "핵심 아이디어만 입력하세요. 나머지는 브이래닛이 도와드립니다. ✨ 아트 스타일 옵션 추가!",
    mainPromptLabel: "핵심 프롬프트",
    mainPromptPlaceholder: "영상의 주요 장면을 설명해주세요 (예: 해변에서 석양을 바라보는 사람)",
    required: "필수",
    preview: "프롬프트 미리보기",
    generate: "프롬프트 생성",
    reset: "초기화",
    templates: "프롬프트 템플릿",
    recent: "최근 사용한 설정",
    success: "프롬프트가 성공적으로 생성되었습니다!",
    error: "영상의 주요 장면을 설명해주세요!",
    selectionCount: "선택된 옵션",
    emptyPreview: "옵션을 선택하면 여기에 생성될 프롬프트가 표시됩니다.",
    copyPrompt: "프롬프트 복사",
    copiedSuccess: "복사 완료!",
    sdPreview: "이미지 미리보기 (무료)",
    translating: "번역 중...",
    translationNote: "한글 입력시 자동으로 영어로 번역됩니다",
    recentImages: "최근 생성한 이미지 미리보기",
    noImages: "아직 생성된 이미지가 없습니다",
    clickToView: "클릭하여 크게 보기",
    suggestions: "프롬프트 발전 제안",
    suggestionDesc: "입력한 아이디어를 3가지 스타일로 발전시켜보세요",
    romantic: "로맨틱하게",
    dramatic: "드라마틱하게", 
    documentary: "다큐멘터리로",
  },
  en: {
    title: "AI Video Prompt Generator",
    subtitle: "Just enter your core idea. V-Ranit will help with the rest. ✨ Art Style Options Added!",
    mainPromptLabel: "Core Prompt",
    mainPromptPlaceholder: "Describe the main scene (e.g., A person watching sunset at the beach)",
    required: "Required",
    preview: "Prompt Preview",
    generate: "Generate Prompt",
    reset: "Reset",
    templates: "Prompt Templates",
    recent: "Recently Used",
    success: "Video prompt generated successfully!",
    error: "Please describe the main scene!",
    selectionCount: "Selected options",
    emptyPreview: "Prompt will be previewed here as you select options.",
    copyPrompt: "Copy Prompt",
    copiedSuccess: "Copied!",
    sdPreview: "Image Preview (Free)",
    translating: "Translating...",
    translationNote: "Korean input will be automatically translated to English",
    recentImages: "Recently Generated Image Previews",
    noImages: "No images generated yet",
    clickToView: "Click to view larger",
    suggestions: "Prompt Development Suggestions",
    suggestionDesc: "Develop your idea into 3 different styles",
    romantic: "Romantic Style",
    dramatic: "Dramatic Style",
    documentary: "Documentary Style",
  }
};

// ⭐ 브이래닛 로고 Base64 (실제 logo.svg 파일)
const VLANET_LOGO = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMDgwIDEwODAiPgogIDwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyOS4zLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiAyLjEuMCBCdWlsZCAxNDYpICAtLT4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLnN0MCB7CiAgICAgICAgZmlsbDogIzAwNTlkYjsKICAgICAgfQoKICAgICAgLnN0MSB7CiAgICAgICAgZmlsbDogIzFhMWExYTsKICAgICAgfQoKICAgICAgLnN0MiB7CiAgICAgICAgZmlsbDogIzAwNGFjMTsKICAgICAgfQogICAgPC9zdHlsZT4KICA8L2RlZnM+CiAgPGc+CiAgICA8cGF0aCBjbGFzcz0ic3QyIiBkPSJNNDgzLjk0LDQ3My40MmgtMjAuMTJjLTEyLjMyLDAtMjEuMzItMTEuNjUtMTguMTktMjMuNTdsNzEuMi0yNjkuNDVjNy40MS0yOC4yNy0xMy45My01NS45MS00My4xNS01NS45MWgtMjA3LjEyYy0yOS44MiwwLTUxLjI0LDI4LjY5LTQyLjc3LDU3LjI4bDEyMS44Niw0MTEuMjhjNS42MSwxOC45NCwyMy4wMiwzMS45NCw0Mi43NywzMS45NGg1NS42N2wzOS44Ni0xNTEuNTZaIi8+CiAgICA8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNTY4LjcxLDE1Ny42bC0zNS41OSwxMzEuMzljLTMuMzQsMTIuNTQsMi43OSwyNS42NiwxNC41NSwzMS4xNGw2MS40MywyOC42YzE5LjM4LDkuMDIsMjAuODcsMzYuMDEsMi41OSw0Ny4xMWwtMTI3Ljc2LDc3LjU4LTM5Ljg2LDE1MS41NmgyNDguNDVjMTkuNzYsMCwzNy4xNi0xMi45OSw0Mi43Ny0zMS45NGwxMjEuODYtNDExLjI4YzguNDctMjguNTktMTIuOTUtNTcuMjgtNDIuNzctNTcuMjhoLTIwMi41N2MtMjAuMjEsMC0zNy45LDEzLjU5LTQzLjEsMzMuMTJaIi8+CiAgPC9nPgogIDxnPgogICAgPHBhdGggY2xhc3M9InN0MSIgZD0iTTIwNy4zLDkyNi4wM2w0MC42MS0xMTYuODdoMzEuNWwtNTQuNjYsMTQzLjQyaC0zNS40bC01NC40LTE0My40MmgzMS43Nmw0MC42MSwxMTYuODdaIi8+CiAgICA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzMxLjQ2LDc1OS45N3YxOTIuNjJoLTI5LjY3di0xOTIuNjJoMjkuNjdaIi8+CiAgICA8cGF0aCBjbGFzcz0ic3QxIiBkPSJNMzY5LjU5LDg0MS45NmM1Ljk5LTExLjEsMTQuMTQtMTkuNzQsMjQuNDctMjUuOSwxMC4zMi02LjE2LDIxLjczLTkuMjQsMzQuMjMtOS4yNCwxMS4yOCwwLDIxLjEyLDIuMjEsMjkuNTQsNi42NCw4LjQyLDQuNDMsMTUuMTQsOS45NCwyMC4xNywxNi41M3YtMjAuODJoMjkuOTN2MTQzLjQyaC0yOS45M3YtMjEuMzRjLTUuMDMsNi43Ny0xMS44OSwxMi40MS0yMC41NiwxNi45Mi04LjY4LDQuNTEtMTguNTcsNi43Ny0yOS42Nyw2Ljc3LTEyLjMyLDAtMjMuNi0zLjE2LTMzLjg0LTkuNS0xMC4yNC02LjMzLTE4LjM1LTE1LjE4LTI0LjM0LTI2LjU1LTUuOTktMTEuMzYtOC45OC0yNC4yNS04Ljk4LTM4LjY1czIuOTktMjcuMTYsOC45OC0zOC4yNlpNNDcxLjg4LDg1NC45N2MtNC4wOC03LjI5LTkuNDItMTIuODQtMTYuMDEtMTYuNjYtNi42LTMuODItMTMuNzEtNS43My0yMS4zNC01Ljczcy0xNC43NSwxLjg3LTIxLjM0LDUuNmMtNi42LDMuNzMtMTEuOTMsOS4yLTE2LjAxLDE2LjQtNC4wOCw3LjItNi4xMiwxNS43NS02LjEyLDI1LjY0czIuMDQsMTguNTcsNi4xMiwyNi4wM2M0LjA4LDcuNDYsOS40NiwxMy4xNCwxNi4xNCwxNy4wNWM2LjY4LDMuOSwxMy43NSw1Ljg2LDIxLjIxLDUuODZzMTQuNzUtMS45MSwyMS4zNC01LjczYzYuNTktMy44MSwxMS45My05LjQxLDE2LjAxLTE2Ljc5LDQuMDgtNy4zNyw2LjEyLTE2LjAxLDYuMTItMjUuOXMtMi4wNC0xOC40OC02LjEyLTI1Ljc3WiIvPgogICAgPHBhdGggY2xhc3M9InN0MSIgZD0iTTY0OS42Niw4MTMuODVjOC45Myw0LjY5LDE1LjkyLDExLjYzLDIwLjk1LDIwLjgyLDUuMDMsOS4yLDcuNTUsMjAuMyw3LjU1LDMzLjMydjg0LjU5aC0yOS40MXYtODAuMTdjMC0xMi44NC0zLjIxLTIyLjY5LTkuNjMtMjkuNTQtNi40Mi02Ljg1LTE1LjE5LTEwLjI4LTI2LjI5LTEwLjI4cy0xOS45MSwzLjQzLTI2LjQyLDEwLjI4Yy02LjUxLDYuODYtOS43NiwxNi43LTkuNzYsMjkuNTR2ODAuMTdoLTI5LjY3di0xNDMuNDJoMjkuNjd2MTYuNGM0Ljg2LTUuOSwxMS4wNi0xMC41LDE4LjYxLTEzLjgsNy41NS0zLjI5LDE1LjU3LTQuOTUsMjQuMDgtNC45NSwxMS4yOCwwLDIxLjM4LDIuMzQsMzAuMzIsNy4wM1oiLz4KICAgIDxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik04NDYuMzEsODkxLjkzaC0xMDkuNThjLjg3LDExLjQ1LDUuMTIsMjAuNjUsMTIuNzYsMjcuNTksNy42Myw2Ljk0LDE3LDEwLjQxLDI4LjExLDEwLjQxLDE1Ljk2LDAsMjcuMjQtNi42OCwzMy44NC0yMC4wNGgzMi4wMmMtNC4zNCwxMy4xOS0xMi4xOSwyMy45OS0yMy41NiwzMi40MS0xMS4zNyw4LjQyLTI1LjQ3LDEyLjYyLTQyLjMsMTIuNjItMTMuNzEsMC0yNS45OS0zLjA4LTM2LjgzLTkuMjQtMTAuODUtNi4xNi0xOS4zNS0xNC44NC0yNS41MS0yNi4wMy02LjE2LTExLjE5LTkuMjQtMjQuMTYtOS4yNC0zOC45MXMyLjk5LTI3LjcyLDguOTgtMzguOTFjNS45OS0xMS4xOSwxNC40LTE5LjgyLDI1LjI1LTI1LjksMTAuODQtNi4wNywyMy4zLTkuMTEsMzcuMzUtOS4xMXMyNS41OSwyLjk1LDM2LjE4LDguODVjMTAuNTgsNS45LDE4LjgzLDE0LjE5LDI0LjczLDI0Ljg2LDUuOSwxMC42Nyw4Ljg1LDIyLjk1LDguODUsMzYuODMsMCw1LjM4LS4zNSwxMC4yNC0xLjA0LDE0LjU4Wk04MTYuMzgsODY3Ljk5Yy0uMTgtMTAuOTMtNC4wOC0xOS42OS0xMS43MS0yNi4yOS03LjY0LTYuNTktMTcuMDktOS44OS0yOC4zNy05Ljg5LTEwLjI0LDAtMTksMy4yNS0yNi4yOSw9Ljc2LTcuMjksNi41MS0xMS42MywxNS4zMi0xMy4wMiwyNi40Mmg3OS4zOVoiLz4KICAgIDxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik05MTEuMTIsODMzLjM3djc5LjM5YzAsNS4zOCwxLjI2LDkuMjQsMy43OCwxMS41OCwyLjUxLDIuMzQsNi44MSwzLjUxLDEyLjg4LDMuNTFoMTguMjJ2MjQuNzNoLTIzLjQzYy0xMy4zNiwwLTIzLjYtMy4xMi0zMC43MS05LjM3LTcuMTItNi4yNS0xMC42Ny0xNi40LTEwLjY3LTMwLjQ1di03OS4zOWgtMTYuOTJ2LTI0LjIxaDE2Ljkydi0zNS42NmgyOS45M3YzNS42NmgzNC44OHYyNC4yMWgtMzQuODhaIi8+CiAgPC9nPgo8L3N2Zz4=";

const optionCategories = [
  { 
    id: "camera", 
    label: { ko: "카메라", en: "Camera" }, 
    tooltip: { ko: "전문 영화 제작에 사용되는 카메라를 선택하세요", en: "Select professional cameras used in film production" }, 
    options: [ 
      { value: 'Arri Alexa Mini', desc: { ko: '할리우드 영화에서 가장 많이 사용되는 프리미엄 카메라', en: 'Premium camera most used in Hollywood films' } },
      { value: 'RED Komodo 6K', desc: { ko: '6K 해상도로 세밀한 디테일을 캡처하는 고급 카메라', en: 'High-end camera capturing fine details in 6K resolution' } },
      { value: 'Sony FX3', desc: { ko: '콘텐츠 크리에이터에게 인기 있는 소형 풀프레임 카메라', en: 'Compact full-frame camera popular with content creators' } },
      { value: 'Canon C300 Mark III', desc: { ko: '방송과 영화 제작에 널리 사용되는 전문가용 카메라', en: 'Professional camera widely used in broadcasting and filmmaking' } },
      { value: 'Sony Venice', desc: { ko: '블록버스터 영화 촬영에 사용되는 최고급 시네마 카메라', en: 'Top-tier cinema camera used for blockbuster film production' } },
      { value: 'Blackmagic URSA Mini', desc: { ko: '합리적인 가격의 프로페셔널 4K 카메라', en: 'Affordable professional 4K camera' } },
      { value: 'RED V-Raptor', desc: { ko: '8K 촬영이 가능한 최신 고성능 카메라', en: 'Latest high-performance camera capable of 8K recording' } },
      { value: 'Canon R5C', desc: { ko: '사진과 영상을 모두 커버하는 하이브리드 카메라', en: 'Hybrid camera covering both photography and videography' } },
      { value: 'Sony FX6', desc: { ko: '다큐멘터리와 뉴스 촬영에 최적화된 카메라', en: 'Camera optimized for documentary and news shooting' } },
      { value: 'Panasonic EVA1', desc: { ko: '영화적 화질을 제공하는 컴팩트 시네마 카메라', en: 'Compact cinema camera providing cinematic image quality' } },
      { value: 'Z CAM E2-F6', desc: { ko: '넷플릭스 승인을 받은 6K 풀프레임 카메라', en: 'Netflix-approved 6K full-frame camera' } },
      { value: 'Arri Amira', desc: { ko: '다큐멘터리와 방송용으로 설계된 견고한 카메라', en: 'Robust camera designed for documentary and broadcast use' } }
    ]
  },
  { 
    id: "lens", 
    label: { ko: "렌즈", en: "Lens" }, 
    tooltip: { ko: "원하는 화각과 깊이감을 위한 렌즈를 선택하세요", en: "Select lens for desired field of view and depth" }, 
    options: [
      { value: '35mm f1.4', desc: { ko: '자연스러운 시야각과 아름다운 보케를 제공하는 표준 렌즈', en: 'Standard lens providing natural field of view and beautiful bokeh' } },
      { value: '50mm f1.2', desc: { ko: '인물 촬영에 최적화된 밝은 표준 렌즈', en: 'Bright standard lens optimized for portrait photography' } },
      { value: '85mm f1.8', desc: { ko: '배경 분리가 뛰어난 인물 전용 망원 렌즈', en: 'Portrait telephoto lens with excellent background separation' } },
      { value: '24-70mm f2.8', desc: { ko: '다양한 상황에 대응 가능한 만능 줌 렌즈', en: 'Versatile zoom lens capable of handling various situations' } },
      { value: '16mm Wide', desc: { ko: '넓은 공간과 풍경을 담는 초광각 렌즈', en: 'Ultra-wide lens for capturing vast spaces and landscapes' } },
      { value: '135mm Telephoto', desc: { ko: '원거리 피사체를 크게 담는 망원 렌즈', en: 'Telephoto lens for capturing distant subjects up close' } },
      { value: '14mm Ultra Wide', desc: { ko: '극도로 넓은 시야각을 제공하는 어안 렌즈', en: 'Fisheye lens providing extremely wide field of view' } },
      { value: '100mm Macro', desc: { ko: '미세한 디테일을 크게 확대하는 접사 렌즈', en: 'Macro lens for extreme close-up detail magnification' } },
      { value: '70-200mm f2.8', desc: { ko: '스포츠와 야생동물 촬영에 이상적인 망원 줌', en: 'Telephoto zoom ideal for sports and wildlife photography' } },
      { value: '24mm f1.4', desc: { ko: '풍경과 건축물 촬영에 적합한 광각 렌즈', en: 'Wide-angle lens suitable for landscape and architecture' } },
      { value: '18-35mm Zoom', desc: { ko: '광각부터 표준까지 커버하는 다용도 줌 렌즈', en: 'Versatile zoom lens covering wide to standard focal lengths' } },
      { value: '200mm f2.8', desc: { ko: '프로 스포츠 촬영용 고성능 망원 렌즈', en: 'High-performance telephoto lens for professional sports' } }
    ]
  },
  { 
    id: "movement", 
    label: { ko: "카메라 워킹", en: "Camera Movement" }, 
    tooltip: { ko: "카메라의 움직임을 선택하세요", en: "Select camera movement style" }, 
    options: [
      { value: 'Handheld', desc: { ko: '손으로 들고 촬영하여 자연스럽고 역동적인 느낌', en: 'Natural and dynamic feel from hand-held shooting' } },
      { value: 'Steadicam', desc: { ko: '부드럽고 안정적인 움직임을 제공하는 안정화 장비', en: 'Stabilization equipment providing smooth and stable movement' } },
      { value: 'Dolly In', desc: { ko: '피사체를 향해 카메라가 앞으로 이동하는 기법', en: 'Camera moving forward towards the subject' } },
      { value: 'Dolly Out', desc: { ko: '피사체에서 멀어지며 더 넓은 시야를 보여주는 기법', en: 'Camera moving away to reveal a wider view' } },
      { value: 'Drone Shot', desc: { ko: '드론을 이용한 공중 촬영으로 웅장한 스케일 연출', en: 'Aerial filming with drones for grand scale cinematography' } },
      { value: 'Static Shot', desc: { ko: '고정된 카메라로 안정적이고 집중적인 구도', en: 'Fixed camera for stable and focused composition' } },
      { value: 'Gimbal Orbit', desc: { ko: '피사체 주변을 원형으로 회전하는 짐벌 촬영', en: 'Gimbal shooting rotating in a circle around the subject' } },
      { value: 'Crane Up', desc: { ko: '카메라가 위로 올라가며 시야가 확장되는 효과', en: 'Camera rising upward with expanding field of view' } },
      { value: 'Crane Down', desc: { ko: '카메라가 아래로 내려가며 피사체에 집중하는 효과', en: 'Camera descending downward focusing on the subject' } },
      { value: 'Slider Left', desc: { ko: '좌측으로 수평 이동하는 부드러운 슬라이더 촬영', en: 'Smooth slider movement to the left' } },
      { value: 'Slider Right', desc: { ko: '우측으로 수평 이동하는 부드러운 슬라이더 촬영', en: 'Smooth slider movement to the right' } },
      { value: 'POV Shot', desc: { ko: '등장인물의 시점에서 촬영하는 주관적 시점', en: 'Subjective viewpoint from character\'s perspective' } },
      { value: 'Tracking Shot', desc: { ko: '움직이는 피사체를 따라가며 촬영하는 기법', en: 'Following a moving subject while filming' } },
      { value: 'Jib Movement', desc: { ko: '지브 암을 이용한 역동적인 상하 움직임', en: 'Dynamic vertical movement using jib arm' } }
    ]
  },
  { 
    id: "composition", 
    label: { ko: "구도", en: "Composition" }, 
    tooltip: { ko: "화면 구성 방식을 선택하세요", en: "Select composition technique" }, 
    options: [
      { value: 'Rule of Thirds', desc: { ko: '화면을 9등분하여 교차점에 주요 요소를 배치', en: 'Dividing frame into nine parts and placing key elements at intersections' } },
      { value: 'Center Composition', desc: { ko: '화면 중앙에 주요 피사체를 배치하는 안정적 구도', en: 'Stable composition placing main subject at center of frame' } },
      { value: 'Low Angle', desc: { ko: '낮은 위치에서 올려다보며 위엄과 파워를 표현', en: 'Shooting from low position looking up to express majesty and power' } },
      { value: 'High Angle', desc: { ko: '높은 위치에서 내려다보며 전체적인 상황을 조망', en: 'Shooting from high position looking down for overall perspective' } },
      { value: 'Close-up', desc: { ko: '피사체의 세부적인 디테일을 강조하는 근접 촬영', en: 'Close shooting emphasizing detailed features of subject' } },
      { value: 'Wide Shot', desc: { ko: '피사체와 주변 환경을 모두 포함하는 원경 촬영', en: 'Long shot including both subject and surrounding environment' } },
      { value: 'Medium Shot', desc: { ko: '피사체의 상반신을 중심으로 한 중간 거리 촬영', en: 'Medium distance shot focusing on subject\'s upper body' } },
      { value: 'Over-the-Shoulder', desc: { ko: '한 인물의 어깨 너머로 상대방을 바라보는 구도', en: 'Viewing another person over one character\'s shoulder' } },
      { value: 'Dutch Angle', desc: { ko: '카메라를 기울여 불안감이나 역동성을 표현', en: 'Tilting camera to express unease or dynamism' } },
      { value: 'Symmetry', desc: { ko: '좌우 대칭의 균형 잡힌 안정적인 구도', en: 'Balanced and stable composition with left-right symmetry' } },
      { value: 'Leading Lines', desc: { ko: '선을 이용해 시선을 주요 피사체로 유도하는 기법', en: 'Using lines to guide viewer\'s attention to main subject' } },
      { value: 'Negative Space', desc: { ko: '여백을 활용해 피사체를 더욱 돋보이게 하는 구도', en: 'Using empty space to make subject stand out more' } }
    ]
  },
  { 
    id: "lighting", 
    label: { ko: "조명", en: "Lighting" }, 
    tooltip: { ko: "조명 스타일을 선택하세요", en: "Select lighting style" }, 
    options: [
      { value: 'Natural Light', desc: { ko: '자연광을 활용한 부드럽고 현실적인 조명', en: 'Soft and realistic lighting using natural sunlight' } },
      { value: 'Golden Hour', desc: { ko: '해 뜨거나 질 때의 따뜻하고 로맨틱한 금빛 조명', en: 'Warm and romantic golden lighting during sunrise/sunset' } },
      { value: 'Low Key', desc: { ko: '어둠을 강조한 드라마틱하고 신비로운 조명', en: 'Dramatic and mysterious lighting emphasizing darkness' } },
      { value: 'High Key', desc: { ko: '밝고 깨끗한 조명으로 긍정적인 분위기 연출', en: 'Bright and clean lighting creating positive atmosphere' } },
      { value: 'Backlight', desc: { ko: '피사체 뒤에서 비추는 역광으로 실루엣 효과', en: 'Backlighting creating silhouette effect from behind subject' } },
      { value: 'Soft Light', desc: { ko: '부드럽게 확산된 조명으로 자연스러운 피부톤', en: 'Gently diffused lighting for natural skin tones' } },
      { value: 'Hard Light', desc: { ko: '강렬하고 명확한 그림자를 만드는 직접 조명', en: 'Direct lighting creating strong and clear shadows' } },
      { value: 'Rembrandt Light', desc: { ko: '한쪽 뺨에 삼각형 하이라이트를 만드는 클래식 조명', en: 'Classic lighting creating triangular highlight on one cheek' } },
      { value: 'Color Gel', desc: { ko: '컬러 필터를 사용한 창의적이고 감정적인 조명', en: 'Creative and emotional lighting using color filters' } },
      { value: 'Practical Light', desc: { ko: '촛불, 전등 등 화면 속 실제 광원을 활용', en: 'Using actual light sources in scene like candles, lamps' } },
      { value: 'Ring Light', desc: { ko: '고리 모양 조명으로 균등하고 부드러운 효과', en: 'Ring-shaped lighting for even and soft effect' } },
      { value: 'Studio Light', desc: { ko: '스튜디오 환경의 완벽하게 제어된 조명', en: 'Perfectly controlled lighting in studio environment' } },
      { value: 'Candle Light', desc: { ko: '촛불의 따뜻하고 로맨틱한 분위기 조명', en: 'Warm and romantic atmosphere from candlelight' } },
      { value: 'Neon Light', desc: { ko: '네온사인의 화려하고 미래적인 조명 효과', en: 'Colorful and futuristic lighting effect from neon signs' } }
    ]
  },
  { 
    id: "color", 
    label: { ko: "색감", en: "Color" }, 
    tooltip: { ko: "색감 스타일을 선택하세요", en: "Select color grading style" }, 
    options: [
      { value: 'Warm', desc: { ko: '주황과 노랑 계열의 따뜻하고 포근한 색감', en: 'Warm and cozy tones with orange and yellow hues' } },
      { value: 'Cool', desc: { ko: '파랑과 청록 계열의 차갑고 시원한 색감', en: 'Cool and refreshing tones with blue and cyan hues' } },
      { value: 'Neutral', desc: { ko: '자연스럽고 균형 잡힌 중성적인 색감', en: 'Natural and balanced neutral color palette' } },
      { value: 'Vivid', desc: { ko: '채도가 높은 생생하고 화려한 색감', en: 'Bright and vibrant colors with high saturation' } },
      { value: 'Muted', desc: { ko: '채도를 낮춘 차분하고 세련된 색감', en: 'Calm and sophisticated colors with reduced saturation' } },
      { value: 'Cinematic Teal-Orange', desc: { ko: '영화에서 자주 사용되는 청록-주황 대비 색감', en: 'Teal-orange contrast commonly used in cinema' } },
      { value: 'Black & White', desc: { ko: '클래식하고 시간을 초월한 흑백 톤', en: 'Classic and timeless black and white tones' } },
      { value: 'Sepia', desc: { ko: '갈색 톤의 빈티지하고 향수를 불러일으키는 색감', en: 'Brown-toned vintage and nostalgic color palette' } },
      { value: 'Analog Film', desc: { ko: '필름 카메라 특유의 따뜻한 아날로그 색감', en: 'Warm analog color characteristic of film cameras' } },
      { value: 'Retro', desc: { ko: '80-90년대 스타일의 복고풍 색감', en: 'Retro color style reminiscent of 80s-90s' } },
      { value: 'Desaturated', desc: { ko: '채도를 줄여 현실적이고 자연스러운 색감', en: 'Realistic and natural colors with reduced saturation' } },
      { value: 'High Contrast', desc: { ko: '명암 대비가 강한 임팩트 있는 색감', en: 'Impactful colors with strong contrast' } },
      { value: 'Pastel', desc: { ko: '부드럽고 연한 파스텔 톤의 색감', en: 'Soft and light pastel tone colors' } },
      { value: 'Monochrome', desc: { ko: '단일 색조로 통일된 미니멀한 색감', en: 'Minimal color palette unified in single tone' } }
    ]
  },
  { 
    id: "tone", 
    label: { ko: "톤/매너", en: "Tone/Mood" }, 
    tooltip: { ko: "영상의 분위기를 선택하세요", en: "Select video mood and tone" }, 
    options: [
      { value: 'Cinematic', desc: { ko: '영화 같은 웅장하고 감동적인 분위기', en: 'Grand and moving atmosphere like a movie' } },
      { value: 'Dramatic', desc: { ko: '강렬하고 감정적인 드라마틱한 분위기', en: 'Intense and emotional dramatic atmosphere' } },
      { value: 'Bright', desc: { ko: '밝고 활기찬 긍정적인 분위기', en: 'Bright and energetic positive atmosphere' } },
      { value: 'Moody', desc: { ko: '음울하고 사색적인 감성적 분위기', en: 'Dark and contemplative emotional atmosphere' } },
      { value: 'Romantic', desc: { ko: '로맨틱하고 달콤한 사랑스러운 분위기', en: 'Romantic and sweet loving atmosphere' } },
      { value: 'Epic', desc: { ko: '웅장하고 장엄한 서사적 분위기', en: 'Grand and majestic epic atmosphere' } },
      { value: 'Mysterious', desc: { ko: '신비롭고 궁금증을 자아내는 분위기', en: 'Mysterious and intriguing atmosphere' } },
      { value: 'Energetic', desc: { ko: '역동적이고 활력 넘치는 분위기', en: 'Dynamic and vibrant atmosphere' } },
      { value: 'Peaceful', desc: { ko: '평화롭고 고요한 힐링 분위기', en: 'Peaceful and serene healing atmosphere' } },
      { value: 'Nostalgic', desc: { ko: '향수를 불러일으키는 그리운 분위기', en: 'Nostalgic atmosphere evoking memories' } },
      { value: 'Surreal', desc: { ko: '초현실적이고 환상적인 분위기', en: 'Surreal and fantastical atmosphere' } },
      { value: 'Realistic', desc: { ko: '현실적이고 자연스러운 분위기', en: 'Realistic and natural atmosphere' } },
      { value: 'Dreamy', desc: { ko: '몽환적이고 꿈같은 분위기', en: 'Dreamy and ethereal atmosphere' } },
      { value: 'Intense', desc: { ko: '긴장감 넘치고 강렬한 분위기', en: 'Tense and intense atmosphere' } }
    ]
  },
  { 
    id: "time", 
    label: { ko: "시간/날씨", en: "Time/Weather" }, 
    tooltip: { ko: "시간대와 날씨를 선택하세요", en: "Select time of day and weather" }, 
    options: [
      { value: 'Golden Hour', desc: { ko: '해 뜨거나 질 때의 황금빛 마법 같은 시간', en: 'Magical golden time during sunrise or sunset' } },
      { value: 'Day', desc: { ko: '밝고 선명한 대낮의 자연광', en: 'Bright and clear natural light of midday' } },
      { value: 'Night', desc: { ko: '어둠 속에서 인공 조명이 돋보이는 밤', en: 'Night where artificial lighting stands out in darkness' } },
      { value: 'Sunset', desc: { ko: '하늘이 붉게 물드는 로맨틱한 일몰', en: 'Romantic sunset with sky painted red' } },
      { value: 'Sunrise', desc: { ko: '새로운 시작을 알리는 희망찬 일출', en: 'Hopeful sunrise announcing new beginnings' } },
      { value: 'Blue Hour', desc: { ko: '해가 진 직후 파란 하늘이 아름다운 시간', en: 'Beautiful time with blue sky right after sunset' } },
      { value: 'Rainy', desc: { ko: '비가 내리는 감성적이고 분위기 있는 날씨', en: 'Emotional and atmospheric rainy weather' } },
      { value: 'Foggy', desc: { ko: '안개가 자욱한 신비롭고 몽환적인 날씨', en: 'Mysterious and dreamy weather with thick fog' } },
      { value: 'Snowy', desc: { ko: '눈이 내리는 순수하고 아름다운 겨울 날씨', en: 'Pure and beautiful winter weather with falling snow' } },
      { value: 'Stormy', desc: { ko: '폭풍이 몰아치는 역동적이고 드라마틱한 날씨', en: 'Dynamic and dramatic weather with raging storms' } },
      { value: 'Overcast', desc: { ko: '구름이 낀 차분하고 편안한 흐린 날씨', en: 'Calm and comfortable cloudy weather' } },
      { value: 'Clear Sky', desc: { ko: '구름 한 점 없는 맑고 깨끗한 하늘', en: 'Clear and clean sky without a single cloud' } },
      { value: 'Twilight', desc: { ko: '해 질 무렵의 황혼이 아름다운 시간', en: 'Beautiful twilight time around sunset' } },
      { value: 'Dawn', desc: { ko: '새벽의 고요하고 평화로운 시간', en: 'Quiet and peaceful time of dawn' } },
      { value: 'Midday', desc: { ko: '태양이 가장 높이 떠 있는 정오', en: 'Noon when the sun is at its highest point' } }
    ]
  },
  { 
    id: "style", 
    label: { ko: "아트 스타일", en: "Art Style" }, 
    tooltip: { ko: "영상의 아트 스타일을 선택하세요", en: "Select the art style for your video" }, 
    options: [
      { value: 'Photorealistic', desc: { ko: '실제 사진처럼 사실적이고 현실적인 스타일', en: 'Realistic style that looks like actual photography' } },
      { value: 'Pixar 3D Animation', desc: { ko: '픽사 영화 같은 귀엽고 완성도 높은 3D 애니메이션', en: 'Cute and high-quality 3D animation like Pixar movies' } },
      { value: 'Disney 2D Animation', desc: { ko: '디즈니 클래식 같은 전통적인 2D 애니메이션', en: 'Traditional 2D animation like Disney classics' } },
      { value: 'Anime Style', desc: { ko: '일본 애니메이션 특유의 스타일과 감성', en: 'Unique style and emotion of Japanese animation' } },
      { value: 'Studio Ghibli', desc: { ko: '지브리 스튜디오의 따뜻하고 감성적인 스타일', en: 'Warm and emotional style of Studio Ghibli' } },
      { value: 'Cartoon Style', desc: { ko: '단순화되고 과장된 만화 스타일', en: 'Simplified and exaggerated cartoon style' } },
      { value: 'Watercolor Painting', desc: { ko: '수채화의 부드럽고 투명한 질감', en: 'Soft and transparent texture of watercolor painting' } },
      { value: 'Oil Painting', desc: { ko: '유화의 진하고 풍부한 색감과 질감', en: 'Rich colors and textures of oil painting' } },
      { value: 'Pencil Sketch', desc: { ko: '연필 스케치의 섬세하고 자연스러운 선', en: 'Delicate and natural lines of pencil sketch' } },
      { value: 'Digital Art', desc: { ko: '디지털로 제작된 현대적이고 세련된 아트', en: 'Modern and sophisticated art created digitally' } },
      { value: 'Pixel Art', desc: { ko: '8비트 게임 같은 픽셀 아트 스타일', en: 'Pixel art style like 8-bit games' } },
      { value: 'Clay Animation', desc: { ko: '클레이로 만든 입체적이고 독특한 애니메이션', en: 'Three-dimensional and unique animation made with clay' } },
      { value: 'Paper Cutout', desc: { ko: '종이를 오려 만든 독창적인 애니메이션', en: 'Creative animation made by cutting paper' } },
      { value: 'Comic Book Style', desc: { ko: '만화책의 대화창과 효과음이 있는 스타일', en: 'Style with speech bubbles and sound effects like comic books' } },
      { value: 'Minimalist Illustration', desc: { ko: '간결하고 단순한 미니멀리스트 일러스트', en: 'Clean and simple minimalist illustration' } }
    ]
  },
  { 
    id: "resolution", 
    label: { ko: "해상도/포맷", en: "Resolution/Format" }, 
    tooltip: { ko: "영상 해상도와 용도를 선택하세요", en: "Select video resolution and purpose" }, 
    options: [
      { value: '4K Cinematic', desc: { ko: '영화관 상영에 적합한 최고 화질의 4K 해상도', en: '4K resolution with highest quality suitable for cinema screening' } },
      { value: '1080p Standard', desc: { ko: '일반적인 온라인 콘텐츠에 적합한 풀HD 해상도', en: 'Full HD resolution suitable for general online content' } },
      { value: 'Instagram 9:16', desc: { ko: '인스타그램 스토리와 릴스에 최적화된 세로 형태', en: 'Vertical format optimized for Instagram stories and reels' } },
      { value: 'YouTube 16:9', desc: { ko: '유튜브 업로드에 최적화된 가로 형태', en: 'Horizontal format optimized for YouTube upload' } },
      { value: 'TikTok Square', desc: { ko: '틱톡과 SNS에 적합한 정사각형 형태', en: 'Square format suitable for TikTok and social media' } },
      { value: '8K Ultra', desc: { ko: '미래형 초고화질 8K 해상도', en: 'Futuristic ultra-high-definition 8K resolution' } },
      { value: 'Cinematic 2.35:1', desc: { ko: '영화관에서 사용되는 와이드스크린 시네마스코프 비율', en: 'Widescreen cinemascope ratio used in theaters' } },
      { value: 'Widescreen 21:9', desc: { ko: '울트라와이드 모니터에 최적화된 비율', en: 'Ratio optimized for ultra-wide monitors' } },
      { value: 'Portrait 4:5', desc: { ko: '인스타그램 피드에 적합한 세로 비율', en: 'Vertical ratio suitable for Instagram feed' } },
      { value: 'Classic 4:3', desc: { ko: '클래식 TV와 모니터의 전통적인 비율', en: 'Traditional ratio of classic TV and monitors' } },
      { value: 'Ultra Wide 32:9', desc: { ko: '극도로 넓은 파노라마 형태의 비율', en: 'Extremely wide panoramic format ratio' } },
      { value: 'Mobile Vertical', desc: { ko: '모바일 세로 화면에 최적화된 형태', en: 'Format optimized for mobile vertical screens' } }
    ]
  }
];

const templates = [
  {
    name: { ko: "시네마틱", en: "Cinematic" },
    settings: {
      camera: "Arri Alexa Mini", lens: "35mm f1.4", movement: "Dolly In",
      composition: "Rule of Thirds", lighting: "Golden Hour", color: "Cinematic Teal-Orange",
      tone: "Cinematic", time: "Golden Hour", style: "Photorealistic", resolution: "4K Cinematic"
    }
  },
  {
    name: { ko: "다큐멘터리", en: "Documentary" },
    settings: {
      camera: "Sony FX3", lens: "24-70mm f2.8", movement: "Handheld",
      composition: "Center Composition", lighting: "Natural Light", color: "Neutral",
      tone: "Realistic", time: "Day", style: "Photorealistic", resolution: "1080p Standard"
    }
  },
  {
    name: { ko: "뮤직비디오", en: "Music Video" },
    settings: {
      camera: "RED Komodo 6K", lens: "50mm f1.2", movement: "Gimbal Orbit",
      composition: "Low Angle", lighting: "Color Gel", color: "Vivid",
      tone: "Dramatic", time: "Night", style: "Digital Art", resolution: "4K Cinematic"
    }
  },
  {
    name: { ko: "소셜미디어", en: "Social Media" },
    settings: {
      camera: "Sony FX3", lens: "35mm f1.4", movement: "Static Shot",
      composition: "Center Composition", lighting: "Natural Light", color: "Warm",
      tone: "Bright", time: "Day", style: "Photorealistic", resolution: "Instagram 9:16"
    }
  },
  {
    name: { ko: "3D 애니메이션", en: "3D Animation" },
    settings: {
      camera: "Canon C300 Mark III", lens: "50mm f1.2", movement: "Steadicam",
      composition: "Rule of Thirds", lighting: "Soft Light", color: "Vivid",
      tone: "Energetic", time: "Day", style: "Pixar 3D Animation", resolution: "4K Cinematic"
    }
  },
  {
    name: { ko: "애니메이션", en: "Anime Animation" },
    settings: {
      camera: "Sony Venice", lens: "85mm f1.8", movement: "Static Shot",
      composition: "Center Composition", lighting: "Backlight", color: "Vivid",
      tone: "Dramatic", time: "Sunset", style: "Anime Style", resolution: "YouTube 16:9"
    }
  },
  {
    name: { ko: "광고/상업", en: "Commercial" },
    settings: {
      camera: "Canon C300 Mark III", lens: "24-70mm f2.8", movement: "Slider Right",
      composition: "Center Composition", lighting: "High Key", color: "Warm",
      tone: "Bright", time: "Day", style: "Photorealistic", resolution: "YouTube 16:9"
    }
  },
  {
    name: { ko: "아트/예술", en: "Artistic" },
    settings: {
      camera: "Sony FX6", lens: "135mm Telephoto", movement: "Static Shot",
      composition: "Symmetry", lighting: "Soft Light", color: "Pastel",
      tone: "Peaceful", time: "Blue Hour", style: "Watercolor Painting", resolution: "4K Cinematic"
    }
  },
  {
    name: { ko: "액션/스포츠", en: "Action/Sports" },
    settings: {
      camera: "RED V-Raptor", lens: "16mm Wide", movement: "Drone Shot",
      composition: "Low Angle", lighting: "Hard Light", color: "High Contrast",
      tone: "Epic", time: "Day", style: "Photorealistic", resolution: "4K Cinematic"
    }
  },
  {
    name: { ko: "로맨스/감성", en: "Romance/Emotional" },
    settings: {
      camera: "Arri Amira", lens: "85mm f1.8", movement: "Dolly Out",
      composition: "Close-up", lighting: "Golden Hour", color: "Warm",
      tone: "Romantic", time: "Sunset", style: "Oil Painting", resolution: "Cinematic 2.35:1"
    }
  }
];

const initialSelections = optionCategories.reduce((acc, cat) => { 
  acc[cat.id] = ""; 
  return acc; 
}, {});

function App() {
  const [mainPrompt, setMainPrompt] = useState("");
  const [selections, setSelections] = useState(initialSelections);
  const [preview, setPreview] = useState("");
  const [feedback, setFeedback] = useState("");
  const [copyFeedback, setCopyFeedback] = useState("");
  const [lang, setLang] = useState("ko");
  const [recentSettings, setRecentSettings] = useState([]);
  const [sdUrl, setSdUrl] = useState("");
  const [sdLoading, setSdLoading] = useState(false);
  const [sdError, setSdError] = useState("");
  const [translating, setTranslating] = useState(false);
  const [imageHistory, setImageHistory] = useState([]);
  const [promptSuggestions, setPromptSuggestions] = useState([]);

  const t = translations[lang];
  const selectedCount = Object.values(selections).filter(Boolean).length;

  // 무료 번역 함수 (MyMemory API)
  const translateText = async (text, fromLang = 'ko', toLang = 'en') => {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`
      );
      const data = await response.json();
      return data.responseData.translatedText;
    } catch (error) {
      console.error('Translation failed:', error);
      return text; // 번역 실패시 원본 텍스트 반환
    }
  };

  // 한글 포함 여부 확인
  const containsKorean = (text) => {
    return /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);
  };

  // 프롬프트 발전 제안 생성
  const generatePromptSuggestions = (basePrompt) => {
    if (!basePrompt.trim()) {
      setPromptSuggestions([]);
      return;
    }

    const suggestions = [
      {
        type: 'romantic',
        label: t.romantic,
        prompt: `${basePrompt}, romantic atmosphere, soft golden lighting, intimate close-up shots, gentle camera movements, warm color palette, emotional connection, dreamy bokeh background`
      },
      {
        type: 'dramatic', 
        label: t.dramatic,
        prompt: `${basePrompt}, dramatic tension, high contrast lighting, dynamic camera angles, intense close-ups, bold color grading, cinematic shadows, powerful composition`
      },
      {
        type: 'documentary',
        label: t.documentary, 
        prompt: `${basePrompt}, documentary style, natural lighting, handheld camera movement, realistic approach, authentic moments, neutral color grading, observational perspective`
      }
    ];

    setPromptSuggestions(suggestions);
  };

  // 템플릿 적용
  const applyTemplate = (template) => {
    setMainPrompt("");
    setSelections({ ...template.settings });
  };

  const applyRecent = (recent) => {
    setMainPrompt(recent.mainPrompt);
    setSelections(recent.selections);
  };

  const handleReset = () => {
    setMainPrompt("");
    setSelections(initialSelections);
    setFeedback("");
    setCopyFeedback("");
    setPreview("");
    setSdUrl("");
    setSdError("");
    setTranslating(false);
    setImageHistory([]);
    setPromptSuggestions([]);
  };

  // 프롬프트 제안 선택
  const selectSuggestion = (suggestion) => {
    setMainPrompt(suggestion.prompt);
    setPromptSuggestions([]); // 제안 목록 숨기기
  };

  // 프롬프트 미리보기 생성 (한글 자동 번역 포함)
  useEffect(() => {
    const generatePreview = async () => {
      if (!mainPrompt.trim() && Object.values(selections).every(val => !val)) {
        setPreview("");
        setPromptSuggestions([]);
        return;
      }
      
      let processedMainPrompt = mainPrompt.trim() || "";
      
      // 한글이 포함된 경우 번역
      if (processedMainPrompt && containsKorean(processedMainPrompt)) {
        setTranslating(true);
        try {
          processedMainPrompt = await translateText(processedMainPrompt);
        } catch (error) {
          console.error('Translation error:', error);
        }
        setTranslating(false);
      }

      // 프롬프트 제안 생성 (번역된 텍스트로)
      if (processedMainPrompt) {
        generatePromptSuggestions(processedMainPrompt);
      }
      
      let generatedPreview = processedMainPrompt;
      const cameraVal = selections.camera || "";
      const lensVal = selections.lens || "";
      if (cameraVal || lensVal) {
        if (generatedPreview) generatedPreview += ", ";
        if (cameraVal && lensVal) {
          generatedPreview += `shot on ${cameraVal} with ${lensVal} lens`;
        } else if (cameraVal) {
          generatedPreview += `shot on ${cameraVal}`;
        } else {
          generatedPreview += `shot with ${lensVal} lens`;
        }
      }
      const detailCategories = ["movement", "composition", "lighting", "color", "tone", "time", "style", "resolution"];
      detailCategories.forEach(catId => {
        if (selections[catId]) {
          if (generatedPreview) generatedPreview += ", ";
          let prefix = "with";
          let suffix = "";
          if (catId === "movement") suffix = " camera movement";
          else if (catId === "composition") suffix = " composition";
          else if (catId === "lighting") suffix = " lighting";
          else if (catId === "color") suffix = " color grading";
          else if (catId === "tone") suffix = " mood";
          else if (catId === "time") { prefix = "during"; }
          else if (catId === "style") { prefix = "in"; suffix = " style"; }
          else if (catId === "resolution") { prefix = "in"; suffix = " quality"; }
          generatedPreview += `${prefix} ${selections[catId].toLowerCase()}${suffix}`;
        }
      });
      setPreview(generatedPreview.startsWith(", ") ? generatedPreview.substring(2) : generatedPreview);
    };
    
    generatePreview();
  }, [mainPrompt, selections]);

  const handleSubmit = () => {
    if (!preview.trim()) { 
      setFeedback(t.error);
      return;
    }
    const newRecent = { 
      id: Date.now(), 
      mainPrompt, 
      selections, 
      timestamp: new Date().toISOString()
    };
    const updated = [newRecent, ...recentSettings.slice(0, 4)];
    setRecentSettings(updated);
    setFeedback(`🎬 ${t.success}`);
    setTimeout(() => setFeedback(""), 3000);
  };

  const handleCopyPrompt = useCallback(() => { 
    if (!preview) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(preview)
        .then(() => {
          setCopyFeedback(t.copiedSuccess);
          setTimeout(() => setCopyFeedback(""), 2000);
        })
        .catch(err => {
          console.error('Copy failed:', err);
          setCopyFeedback("복사 실패!");
          setTimeout(() => setCopyFeedback(""), 2000);
        });
    } else {
      // 폴백: 텍스트 선택
      const textArea = document.createElement('textarea');
      textArea.value = preview;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopyFeedback(t.copiedSuccess);
      } catch (err) {
        setCopyFeedback("복사 실패!");
      }
      document.body.removeChild(textArea);
      setTimeout(() => setCopyFeedback(""), 2000);
    }
  }, [preview, t]);

  // Pollinations AI 이미지 미리보기 (무료, API 키 불필요)
  const handleSdPreview = useCallback(async () => {
    if (!preview) return;
    
    setSdLoading(true);
    setSdError("");
    setSdUrl("");
    
    try {
      // Pollinations AI - 완전 무료, API 키 불필요
      const encodedPrompt = encodeURIComponent(preview);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&nologo=true&enhance=true&seed=${Date.now()}`;
      
      // 이미지 로드 확인
      const img = new Image();
      img.onload = () => {
        setSdUrl(imageUrl);
        setSdLoading(false);
        
        // 이미지 히스토리에 추가 (최대 5개까지)
        const newImage = {
          id: Date.now(),
          url: imageUrl,
          prompt: preview,
          timestamp: new Date().toISOString()
        };
        
        setImageHistory(prev => {
          const updated = [newImage, ...prev];
          return updated.slice(0, 5); // 최대 5개까지만 유지
        });
      };
      img.onerror = () => {
        setSdError("이미지 생성에 실패했습니다. 다시 시도해주세요.");
        setSdLoading(false);
      };
      img.src = imageUrl;
      
    } catch (e) {
      setSdError("이미지 생성 실패: " + e.message);
      setSdLoading(false);
    }
  }, [preview]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'row',
        minHeight: '80vh'
      }}>
        {/* 메인 컨텐츠 영역 */}
        <div style={{
          flex: '1',
          padding: '40px',
          paddingRight: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {/* 브이래닛 로고 */}
                <img 
                  src={VLANET_LOGO}
                  alt="브이래닛 로고"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '-0.5px',
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}>
                    브이래닛
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#888',
                    fontWeight: '500',
                    marginTop: '-2px',
                    letterSpacing: '0.5px'
                  }}>
                    VIDEO AI
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button 
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '20px',
                  background: lang === "ko" ? '#667eea' : '#f0f0f0',
                  color: lang === "ko" ? 'white' : '#666',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
                onClick={() => setLang("ko")}
              >
                한국어
              </button>
              <button 
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '20px',
                  background: lang === "en" ? '#667eea' : '#f0f0f0',
                  color: lang === "en" ? 'white' : '#666',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
                onClick={() => setLang("en")}
              >
                English
              </button>
            </div>
          </div>

          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            marginBottom: '10px',
            textAlign: 'center',
            color: '#333'
          }}>
            🎬 {t.title}
          </h1>
          <p style={{ 
            textAlign: 'center', 
            color: '#666', 
            marginBottom: '30px',
            fontSize: '16px'
          }}>
            {t.subtitle}
          </p>

          <div style={{
            background: '#f8f9ff',
            padding: '20px',
            borderRadius: '15px',
            marginBottom: '20px'
          }}>
            <span style={{ fontWeight: 'bold', color: '#333', marginBottom: '15px', display: 'block' }}>
              ⚡ {t.templates}
            </span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {templates.map((tpl, idx) => (
                <button 
                  key={idx} 
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '25px',
                    background: 'white',
                    color: '#667eea',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => applyTemplate(tpl)}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  {tpl.name[lang]}
                </button>
              ))}
            </div>
          </div>

          {recentSettings.length > 0 && (
            <div style={{
              background: '#fff9e6',
              padding: '20px',
              borderRadius: '15px',
              marginBottom: '20px'
            }}>
              <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>
                🕐 {t.recent}
              </div>
              {recentSettings.map(recent => (
                <div 
                  key={recent.id} 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px 15px',
                    background: 'white',
                    borderRadius: '10px',
                    marginBottom: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    border: '1px solid #eee'
                  }}
                  onClick={() => applyRecent(recent)}
                >
                  <span>{recent.mainPrompt.substring(0, 30)}{recent.mainPrompt.length > 30 ? "..." : ""}</span>
                  <span style={{ color: '#999', fontSize: '12px' }}>
                    {new Date(recent.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                marginBottom: '10px',
                color: '#333'
              }}>
                {t.mainPromptLabel} <span style={{ color: 'red' }}>*{t.required}</span>
              </label>
              <input
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '10px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box'
                }}
                value={mainPrompt}
                onChange={e => setMainPrompt(e.target.value)}
                placeholder={t.mainPromptPlaceholder}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
              <div style={{
                fontSize: '12px',
                color: '#888',
                marginTop: '5px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                🌐 {t.translationNote}
              </div>

              {/* 프롬프트 발전 제안 */}
              {promptSuggestions.length > 0 && (
                <div style={{
                  marginTop: '15px',
                  padding: '15px',
                  background: '#f0f8ff',
                  borderRadius: '10px',
                  border: '1px solid #e0e8f0'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#333',
                    marginBottom: '10px'
                  }}>
                    💡 {t.suggestions}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#666',
                    marginBottom: '12px'
                  }}>
                    {t.suggestionDesc}
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}>
                    {promptSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => selectSuggestion(suggestion)}
                        style={{
                          padding: '8px 16px',
                          border: 'none',
                          borderRadius: '20px',
                          background: suggestion.type === 'romantic' ? '#ff6b9d' : 
                                    suggestion.type === 'dramatic' ? '#c44569' : '#45aaf2',
                          color: 'white',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                        }}
                      >
                        {suggestion.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ 
              textAlign: 'center', 
              marginBottom: '20px', 
              color: '#666',
              fontSize: '14px'
            }}>
              {t.selectionCount}: {selectedCount} / {optionCategories.length}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              marginBottom: '20px'
            }}>
              {optionCategories.map(cat => (
                <div key={cat.id} style={{ position: 'relative' }}>
                  <select
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e0e0e0',
                      borderRadius: '10px',
                      fontSize: '14px',
                      background: selections[cat.id] ? '#f0f8ff' : 'white',
                      color: selections[cat.id] ? '#667eea' : '#333',
                      outline: 'none',
                      cursor: 'pointer',
                      boxSizing: 'border-box'
                    }}
                    value={selections[cat.id]}
                    onChange={e => setSelections(s => ({ ...s, [cat.id]: e.target.value }))}
                  >
                    <option value="">{cat.label[lang]}</option>
                    {cat.options.map(opt => (
                      <option 
                        key={opt.value} 
                        value={opt.value}
                        title={opt.desc[lang]}
                      >
                        {opt.value}
                      </option>
                    ))}
                  </select>
                  <div 
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#667eea',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      cursor: 'help'
                    }}
                    title={cat.tooltip[lang]}
                  >
                    ?
                  </div>
                  
                  {/* 선택된 옵션의 설명 표시 */}
                  {selections[cat.id] && (
                    <div style={{
                      marginTop: '5px',
                      padding: '8px 12px',
                      background: '#f0f8ff',
                      border: '1px solid #e0e8f0',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#555',
                      lineHeight: '1.4'
                    }}>
                      💡 {cat.options.find(opt => opt.value === selections[cat.id])?.desc[lang]}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 프롬프트 미리보기 + 이미지 미리보기 버튼 */}
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '15px',
              marginBottom: '20px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <span style={{ fontWeight: 'bold', color: '#333' }}>
                  👁️ {t.preview}
                </span>
                {preview && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      type="button" 
                      onClick={handleCopyPrompt} 
                      style={{
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '20px',
                        background: '#28a745',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      {t.copyPrompt}
                    </button>
                    <button 
                      type="button" 
                      onClick={handleSdPreview} 
                      style={{
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '20px',
                        background: '#17a2b8',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      {t.sdPreview}
                    </button>
                  </div>
                )}
              </div>
              <div style={{
                padding: '15px',
                background: 'white',
                borderRadius: '10px',
                border: '1px solid #e0e0e0',
                minHeight: '60px',
                fontSize: '14px',
                lineHeight: '1.5',
                color: preview ? '#333' : '#999'
              }}>
                {translating ? `🌐 ${t.translating}` : (preview || t.emptyPreview)}
              </div>
              {copyFeedback && (
                <div style={{
                  marginTop: '10px',
                  padding: '10px',
                  background: '#d4edda',
                  color: '#155724',
                  borderRadius: '5px',
                  fontSize: '14px'
                }}>
                  {copyFeedback}
                </div>
              )}
              {sdLoading && (
                <div style={{
                  marginTop: '10px',
                  padding: '10px',
                  background: '#cce5ff',
                  color: '#004085',
                  borderRadius: '5px',
                  fontSize: '14px'
                }}>
                  이미지 생성 중... (무료 서비스)
                </div>
              )}
              {sdUrl && (
                <div style={{ marginTop: '15px', textAlign: 'center' }}>
                  <img 
                    src={sdUrl} 
                    alt="Pollinations AI 프롬프트 미리보기" 
                    style={{ 
                      maxWidth: '350px', 
                      borderRadius: '12px', 
                      margin: '10px 0',
                      maxHeight: '350px',
                      objectFit: 'cover'
                    }} 
                  />
                  <div style={{ color: '#666', fontSize: '12px' }}>
                    ※ Pollinations AI로 생성된 참고용 이미지입니다. 실제 비디오와 다를 수 있습니다.
                  </div>
                </div>
              )}
              {sdError && (
                <div style={{
                  marginTop: '10px',
                  padding: '10px',
                  background: '#f8d7da',
                  color: '#721c24',
                  borderRadius: '5px',
                  fontSize: '14px'
                }}>
                  {sdError}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button 
                type="button" 
                onClick={handleSubmit}
                disabled={!preview.trim()}
                style={{
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '25px',
                  background: preview.trim() ? 'linear-gradient(45deg, #667eea, #764ba2)' : '#ccc',
                  color: 'white',
                  cursor: preview.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                🎬 {t.generate}
              </button>
              <button 
                type="button" 
                onClick={handleReset}
                style={{
                  padding: '15px 30px',
                  border: '2px solid #667eea',
                  borderRadius: '25px',
                  background: 'white',
                  color: '#667eea',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.2s'
                }}
              >
                🔄 {t.reset}
              </button>
            </div>
            
            {feedback && (
              <div style={{
                marginTop: '20px',
                padding: '15px',
                background: feedback.includes("성공") || feedback.includes("successfully") ? '#d4edda' : '#f8d7da',
                color: feedback.includes("성공") || feedback.includes("successfully") ? '#155724' : '#721c24',
                borderRadius: '10px',
                textAlign: 'center',
                fontSize: '14px'
              }}>
                {feedback}
              </div>
            )}
          </div>
        </div>
        
        {/* 이미지 히스토리 영역 */}
        <div style={{
          width: '350px',
          padding: '40px 20px',
          borderLeft: '1px solid #f0f0f0',
          background: '#fafbfc'
        }}>
          <div style={{
            position: 'sticky',
            top: '20px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🖼️ {t.recentImages}
            </h3>
            
            {imageHistory.length === 0 ? (
              <div style={{
                textAlign: 'center',
                color: '#999',
                fontSize: '14px',
                padding: '40px 20px',
                background: 'white',
                borderRadius: '10px',
                border: '1px dashed #ddd'
              }}>
                {t.noImages}
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {imageHistory.map((image, index) => (
                  <div 
                    key={image.id}
                    style={{
                      background: 'white',
                      borderRadius: '12px',
                      padding: '12px',
                      boxShadow: sdUrl === image.url ? '0 4px 20px rgba(102, 126, 234, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      border: sdUrl === image.url ? '2px solid #667eea' : '2px solid transparent'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = sdUrl === image.url ? '0 4px 20px rgba(102, 126, 234, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)';
                    }}
                    onClick={() => {
                      setSdUrl(image.url);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <img
                      src={image.url}
                      alt={`Generated image ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: '8px'
                      }}
                    />
                    <div style={{
                      fontSize: '12px',
                      color: '#666',
                      lineHeight: '1.4',
                      marginBottom: '6px'
                    }}>
                      {image.prompt.length > 60 ? 
                        `${image.prompt.substring(0, 60)}...` : 
                        image.prompt
                      }
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: '#999',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span>{new Date(image.timestamp).toLocaleTimeString('ko-KR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}</span>
                      <span style={{ fontSize: '10px' }}>{t.clickToView}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;