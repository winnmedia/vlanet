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
  { id: "camera", label: { ko: "카메라", en: "Camera" }, tooltip: { ko: "전문 영화 제작에 사용되는 카메라를 선택하세요", en: "Select professional cameras used in film production" }, options: [ 'Arri Alexa Mini', 'RED Komodo 6K', 'Sony FX3', 'Canon C300 Mark III', 'Sony Venice', 'Blackmagic URSA Mini', 'RED V-Raptor', 'Canon R5C', 'Sony FX6', 'Panasonic EVA1', 'Z CAM E2-F6', 'Arri Amira' ] },
  { id: "lens", label: { ko: "렌즈", en: "Lens" }, tooltip: { ko: "원하는 화각과 깊이감을 위한 렌즈를 선택하세요", en: "Select lens for desired field of view and depth" }, options: [ '35mm f1.4', '50mm f1.2', '85mm f1.8', '24-70mm f2.8', '16mm Wide', '135mm Telephoto', '14mm Ultra Wide', '100mm Macro', '70-200mm f2.8', '24mm f1.4', '18-35mm Zoom', '200mm f2.8' ] },
  { id: "movement", label: { ko: "카메라 워킹", en: "Camera Movement" }, tooltip: { ko: "카메라의 움직임을 선택하세요", en: "Select camera movement style" }, options: [ 'Handheld', 'Steadicam', 'Dolly In', 'Dolly Out', 'Drone Shot', 'Static Shot', 'Gimbal Orbit', 'Crane Up', 'Crane Down', 'Slider Left', 'Slider Right', 'POV Shot', 'Tracking Shot', 'Jib Movement' ] },
  { id: "composition", label: { ko: "구도", en: "Composition" }, tooltip: { ko: "화면 구성 방식을 선택하세요", en: "Select composition technique" }, options: [ 'Rule of Thirds', 'Center Composition', 'Low Angle', 'High Angle', 'Close-up', 'Wide Shot', 'Medium Shot', 'Over-the-Shoulder', 'Dutch Angle', 'Symmetry', 'Leading Lines', 'Negative Space' ] },
  { id: "lighting", label: { ko: "조명", en: "Lighting" }, tooltip: { ko: "조명 스타일을 선택하세요", en: "Select lighting style" }, options: [ 'Natural Light', 'Golden Hour', 'Low Key', 'High Key', 'Backlight', 'Soft Light', 'Hard Light', 'Rembrandt Light', 'Color Gel', 'Practical Light', 'Ring Light', 'Studio Light', 'Candle Light', 'Neon Light' ] },
  { id: "color", label: { ko: "색감", en: "Color" }, tooltip: { ko: "색감 스타일을 선택하세요", en: "Select color grading style" }, options: [ 'Warm', 'Cool', 'Neutral', 'Vivid', 'Muted', 'Cinematic Teal-Orange', 'Black & White', 'Sepia', 'Analog Film', 'Retro', 'Desaturated', 'High Contrast', 'Pastel', 'Monochrome' ] },
  { id: "tone", label: { ko: "톤/매너", en: "Tone/Mood" }, tooltip: { ko: "영상의 분위기를 선택하세요", en: "Select video mood and tone" }, options: [ 'Cinematic', 'Dramatic', 'Bright', 'Moody', 'Romantic', 'Epic', 'Mysterious', 'Energetic', 'Peaceful', 'Nostalgic', 'Surreal', 'Realistic', 'Dreamy', 'Intense' ] },
  { id: "time", label: { ko: "시간/날씨", en: "Time/Weather" }, tooltip: { ko: "시간대와 날씨를 선택하세요", en: "Select time of day and weather" }, options: [ 'Golden Hour', 'Day', 'Night', 'Sunset', 'Sunrise', 'Blue Hour', 'Rainy', 'Foggy', 'Snowy', 'Stormy', 'Overcast', 'Clear Sky', 'Twilight', 'Dawn', 'Midday' ] },
  { id: "style", label: { ko: "아트 스타일", en: "Art Style" }, tooltip: { ko: "영상의 아트 스타일을 선택하세요", en: "Select the art style for your video" }, options: [ 'Photorealistic', 'Pixar 3D Animation', 'Disney 2D Animation', 'Anime Style', 'Studio Ghibli', 'Cartoon Style', 'Watercolor Painting', 'Oil Painting', 'Pencil Sketch', 'Digital Art', 'Pixel Art', 'Clay Animation', 'Paper Cutout', 'Comic Book Style', 'Minimalist Illustration' ] },
  { id: "resolution", label: { ko: "해상도/포맷", en: "Resolution/Format" }, tooltip: { ko: "영상 해상도와 용도를 선택하세요", en: "Select video resolution and purpose" }, options: [ '4K Cinematic', '1080p Standard', 'Instagram 9:16', 'YouTube 16:9', 'TikTok Square', '8K Ultra', 'Cinematic 2.35:1', 'Widescreen 21:9', 'Portrait 4:5', 'Classic 4:3', 'Ultra Wide 32:9', 'Mobile Vertical' ] }
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
      tone: "Bright", time: "Day", style: "Photorealistic", resolution: "1080p Standard"
    }
  },
  {
    name: { ko: "뮤직비디오", en: "Music Video" },
    settings: {
      camera: "RED Komodo 6K", lens: "50mm f1.2", movement: "Gimbal Orbit",
      composition: "Low Angle", lighting: "Backlight", color: "Vivid",
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
    name: { ko: "애니메이션", en: "Animation" },
    settings: {
      camera: "Sony FX3", lens: "50mm f1.2", movement: "Steadicam",
      composition: "Rule of Thirds", lighting: "Soft Light", color: "Vivid",
      tone: "Energetic", time: "Day", style: "Pixar 3D Animation", resolution: "4K Cinematic"
    }
  },
  {
    name: { ko: "아니메", en: "Anime" },
    settings: {
      camera: "Canon C300 Mark III", lens: "85mm f1.8", movement: "Static Shot",
      composition: "Center Composition", lighting: "Soft Light", color: "Vivid",
      tone: "Dramatic", time: "Sunset", style: "Anime Style", resolution: "YouTube 16:9"
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
                      <option key={opt} value={opt}>{opt}</option>
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