import React, { useState, useEffect } from 'react';
import './App.css';

// 다국어 지원
const translations = {
  ko: {
    title: "AI 영상 프롬프트 생성기",
    subtitle: "핵심 아이디어만 입력하세요. 나머지는 브이래닛이 도와드립니다.",
    mainPromptLabel: "핵심 프롬프트",
    mainPromptPlaceholder: "영상의 주요 장면을 설명해주세요 (예: 해변에서 석양을 바라보는 사람)",
    required: "필수",
    preview: "프롬프트 미리보기",
    generate: "생성하기",
    reset: "초기화",
    templates: "프롬프트 템플릿",
    recent: "최근 사용한 설정",
    generating: "생성 중...",
    success: "프롬프트가 성공적으로 생성되었습니다!",
    error: "영상의 주요 장면을 설명해주세요!",
    selectionCount: "선택된 옵션",
    emptyPreview: "옵션을 선택하면 여기에 생성될 프롬프트가 표시됩니다."
  },
  en: {
    title: "AI Video Prompt Generator",
    subtitle: "Just enter your core idea. V-Ranit will help with the rest.",
    mainPromptLabel: "Core Prompt",
    mainPromptPlaceholder: "Describe the main scene (e.g., A person watching sunset at the beach)",
    required: "Required",
    preview: "Prompt Preview",
    generate: "Generate",
    reset: "Reset",
    templates: "Prompt Templates",
    recent: "Recently Used",
    generating: "Generating...",
    success: "Video prompt generated successfully!",
    error: "Please describe the main scene!",
    selectionCount: "Selected options",
    emptyPreview: "Prompt will be previewed here as you select options."
  }
};

// 옵션/카테고리 정의 (툴팁 포함)
const optionCategories = [
  { 
    id: "camera", 
    label: { ko: "카메라", en: "Camera" }, 
    tooltip: { ko: "전문 영화 제작에 사용되는 카메라를 선택하세요", en: "Select professional cameras used in film production" },
    options: [
      'Arri Alexa Mini', 'RED Komodo 6K', 'Sony FX3', 'Blackmagic URSA Mini', 'Canon C300 Mark III',
      'Panasonic EVA1', 'Sony Venice', 'RED V-Raptor', 'Arri Amira', 'Canon R5C', 'Z CAM E2-F6'
    ]
  },
  { 
    id: "lens", 
    label: { ko: "렌즈", en: "Lens" }, 
    tooltip: { ko: "원하는 화각과 깊이감을 위한 렌즈를 선택하세요", en: "Select lens for desired field of view and depth" },
    options: [
      '35mm f1.4', '50mm f1.2', '85mm f1.8', '24-70mm f2.8', '18-35mm', '16mm Fisheye', '135mm',
      '70-200mm', '14mm', '100mm Macro', '12mm Ultra Wide'
    ]
  },
  { 
    id: "movement", 
    label: { ko: "카메라 워킹", en: "Camera Movement" }, 
    tooltip: { ko: "카메라의 움직임을 선택하세요", en: "Select camera movement style" },
    options: [
      'Handheld', 'Steadicam', 'Dolly In', 'Dolly Out', 'Crane Up', 'Crane Down', 'Slider Left', 'Slider Right',
      'Drone Shot', 'Static Tripod', 'Gimbal Orbit', 'POV Shot'
    ]
  },
  { 
    id: "composition", 
    label: { ko: "구도", en: "Composition" }, 
    tooltip: { ko: "화면 구성 방식을 선택하세요", en: "Select composition technique" },
    options: [
      'Rule of Thirds', 'Center Composition', 'Symmetry', 'Leading Lines', 'Low Angle', 'High Angle',
      'Over-the-Shoulder', 'Wide Shot', 'Close-up', 'Dutch Angle', 'Negative Space'
    ]
  },
  { 
    id: "lighting", 
    label: { ko: "조명", en: "Lighting" }, 
    tooltip: { ko: "조명 스타일을 선택하세요", en: "Select lighting style" },
    options: [
      'Natural Light', 'Low Key', 'High Key', 'Rembrandt', 'Backlight', 'Silhouette', 'Color Gel',
      'Softbox', 'Hard Light', 'Practical Light', 'Golden Hour'
    ]
  },
  { 
    id: "color", 
    label: { ko: "색감", en: "Color" }, 
    tooltip: { ko: "색감 스타일을 선택하세요", en: "Select color grading style" },
    options: [
      'Warm', 'Cool', 'Neutral', 'Muted', 'Vivid', 'Black & White', 'Analog Film', 'Sepia', 'Monochrome', 'Cinematic Teal-Orange', 'Retro'
    ]
  },
  { 
    id: "tone", 
    label: { ko: "톤/매너", en: "Tone/Mood" }, 
    tooltip: { ko: "영상의 분위기를 선택하세요", en: "Select video mood and tone" },
    options: [
      'Cinematic', 'Dramatic', 'Comedic', 'Romantic', 'Moody', 'Bright', 'Noir', 'Surreal', 'Realistic', 'Epic', 'Dreamlike'
    ]
  },
  { 
    id: "time", 
    label: { ko: "시간", en: "Time" }, 
    tooltip: { ko: "시간대를 선택하세요", en: "Select time of day" },
    options: [
      'Day', 'Night', 'Golden Hour', 'Sunset', 'Sunrise', 'Blue Hour', 'Rainy', 'Foggy', 'Midday', 'Twilight', 'Afternoon'
    ]
  },
  { 
    id: "era", 
    label: { ko: "시대", en: "Era" }, 
    tooltip: { ko: "시대 배경을 선택하세요", en: "Select time period setting" },
    options: [
      'Modern', '1980s', '1990s', '2000s', 'Victorian', 'Medieval', 'Futuristic', 'Ancient Greece', 'Joseon Dynasty', 'Cyberpunk', 'Retro 70s'
    ]
  },
];

// 템플릿 예시
const templates = [
  {
    name: { ko: "시네마틱", en: "Cinematic" },
    settings: {
      camera: "Arri Alexa Mini", lens: "35mm f1.4", movement: "Dolly In",
      composition: "Rule of Thirds", lighting: "Golden Hour", color: "Cinematic Teal-Orange",
      tone: "Cinematic", time: "Golden Hour", era: "Modern"
    }
  },
  {
    name: { ko: "다큐멘터리", en: "Documentary" },
    settings: {
      camera: "Sony FX3", lens: "24-70mm f2.8", movement: "Handheld",
      composition: "Center Composition", lighting: "Natural Light", color: "Neutral",
      tone: "Realistic", time: "Day", era: "Modern"
    }
  },
  {
    name: { ko: "뮤직비디오", en: "Music Video" },
    settings: {
      camera: "RED Komodo 6K", lens: "50mm f1.2", movement: "Gimbal Orbit",
      composition: "Dutch Angle", lighting: "Color Gel", color: "Vivid",
      tone: "Surreal", time: "Night", era: "Modern"
    }
  },
  {
    name: { ko: "광고", en: "Commercial" },
    settings: {
      camera: "Canon C300 Mark III", lens: "85mm f1.8", movement: "Slider Left",
      composition: "Center Composition", lighting: "High Key", color: "Warm",
      tone: "Bright", time: "Day", era: "Modern"
    }
  }
];

// 상태 초기화
const initialSelections = optionCategories.reduce((acc, cat) => { 
  acc[cat.id] = ""; 
  return acc; 
}, {});

function App() {
  const [mainPrompt, setMainPrompt] = useState("");
  const [selections, setSelections] = useState(initialSelections);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [lang, setLang] = useState("ko");
  const [recentSettings, setRecentSettings] = useState([]);

  const t = translations[lang];

  // 선택 카운트
  const selectedCount = Object.values(selections).filter(Boolean).length;

  // 템플릿 적용
  const applyTemplate = (template) => setSelections({ ...template.settings });

  // 최근 설정 적용
  const applyRecent = (recent) => {
    setMainPrompt(recent.mainPrompt);
    setSelections(recent.selections);
  };

  // 초기화
  const handleReset = () => {
    setMainPrompt("");
    setSelections(initialSelections);
    setFeedback("");
    setPreview("");
  };

  // 미리보기 프롬프트 생성 (더 정교한 로직)
  useEffect(() => {
    if (!mainPrompt) return setPreview("");
    
    let prompt = mainPrompt;
    
    // 자연스러운 문장으로 옵션 추가
    if (selections.camera || selections.lens) {
      const camera = selections.camera ? selections.camera : '';
      const lens = selections.lens ? ` with ${selections.lens} lens` : '';
      if (camera) {
        prompt += `, shot on ${camera}${lens}`;
      } else if (lens) {
        prompt += `, shot${lens}`;
      }
    }
    
    if (selections.movement) {
      prompt += `, ${selections.movement.toLowerCase()} camera movement`;
    }
    
    if (selections.composition) {
      prompt += `, ${selections.composition} composition`;
    }
    
    if (selections.lighting) {
      prompt += `, ${selections.lighting.toLowerCase()} lighting`;
    }
    
    if (selections.color) {
      prompt += `, ${selections.color.toLowerCase()} color grading`;
    }
    
    if (selections.tone) {
      prompt += `, ${selections.tone.toLowerCase()} mood`;
    }
    
    if (selections.time) {
      prompt += `, during ${selections.time.toLowerCase()}`;
    }
    
    if (selections.era) {
      prompt += `, ${selections.era} era setting`;
    }
    
    setPreview(prompt);
  }, [mainPrompt, selections]);

  // 생성하기
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mainPrompt.trim()) {
      setFeedback(t.error);
      return;
    }
    
    setIsLoading(true);
    setFeedback(t.generating);
    
    // 최근 설정 저장
    const newRecent = {
      id: Date.now(),
      mainPrompt,
      selections,
      timestamp: new Date().toISOString()
    };
    const updated = [newRecent, ...recentSettings.slice(0, 4)];
    setRecentSettings(updated);
    
    setTimeout(() => {
      setFeedback(`🎬 ${t.success}`);
      setIsLoading(false);
      setTimeout(() => setFeedback(""), 5000);
    }, 2000);
  };

  return (
    <div className="app-bg">
      <div className="main-card">
        {/* 로고 & 언어 토글 */}
        <div className="top-bar">
          <div className="logo-wrap">
            <img src="/logo.svg" alt="브이래닛 로고" className="main-logo" />
          </div>
          <div className="lang-toggle">
            <button
              className={`lang-btn ${lang === "ko" ? "active" : ""}`}
              onClick={() => setLang("ko")}
            >
              한국어
            </button>
            <button
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
            >
              English
            </button>
          </div>
        </div>

        <h1 className="title">🎬 {t.title}</h1>
        <p className="subtitle">{t.subtitle}</p>

        {/* 템플릿 */}
        <div className="template-box">
          <span className="template-title">⚡ {t.templates}</span>
          <div className="template-btns">
            {templates.map((tpl, idx) => (
              <button
                key={idx}
                className="tpl-btn"
                onClick={() => applyTemplate(tpl)}
              >
                {tpl.name[lang]}
              </button>
            ))}
          </div>
        </div>

        {/* 최근 사용한 설정 */}
        {recentSettings.length > 0 && (
          <div className="recent-section">
            <div className="recent-title">🕐 {t.recent}</div>
            {recentSettings.map(recent => (
              <div 
                key={recent.id}
                className="recent-item"
                onClick={() => applyRecent(recent)}
              >
                <span>{recent.mainPrompt.substring(0, 30)}...</span>
                <span className="recent-time">
                  {new Date(recent.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* 프롬프트 입력 */}
        <form onSubmit={handleSubmit}>
          <div className="label-group">
            <label className="main-label">
              {t.mainPromptLabel} <span className="required">*{t.required}</span>
            </label>
            <input
              className="main-input"
              value={mainPrompt}
              onChange={e => setMainPrompt(e.target.value)}
              placeholder={t.mainPromptPlaceholder}
            />
          </div>

          {/* 옵션 선택 그리드 */}
          <div className="opt-counter">
            {t.selectionCount}: {selectedCount} / {optionCategories.length}
          </div>
          <div className="opt-grid">
            {optionCategories.map(cat => (
              <div key={cat.id} className="opt-item">
                <select
                  className={selections[cat.id] ? 'selected' : ''}
                  value={selections[cat.id]}
                  onChange={e => setSelections(s => ({ ...s, [cat.id]: e.target.value }))}
                >
                  <option value="">{cat.label[lang]}</option>
                  {cat.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className="tooltip">
                  ?
                  <div className="tooltip-content">{cat.tooltip[lang]}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 프롬프트 미리보기 */}
          <div className="preview-box">
            <span className="preview-title">👁️ {t.preview}</span>
            <div className="preview-content">
              {preview || t.emptyPreview}
            </div>
          </div>

          {/* 버튼들 */}
          <div className="btn-group">
            <button
              type="submit"
              className="gen-btn"
              disabled={isLoading}
            >
              {isLoading && <span className="loading-spinner"></span>}
              {isLoading ? t.generating : `🎬 ${t.generate}`}
            </button>
            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
              disabled={isLoading}
            >
              🔄 {t.reset}
            </button>
          </div>
          
          {feedback && (
            <div className={`feedback ${
              feedback.includes("성공") || feedback.includes("successfully") ? "success" : 
              feedback.includes("중") || feedback.includes("Generating") ? "loading" : "error"
            }`}>
              {feedback}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;