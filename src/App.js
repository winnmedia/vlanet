import React, { useState } from 'react';

// 옵션 리스트 (각 10개 이상, 확장 가능)
const cameraOptions = [
  'Arri Alexa Mini', 'RED Komodo 6K', 'Sony FX3', 'Blackmagic URSA Mini', 'Canon C300 Mark III',
  'Panasonic EVA1', 'Sony Venice', 'RED V-Raptor', 'Arri Amira', 'Canon R5C', 'Z CAM E2-F6'
];
const lensOptions = [
  '35mm f1.4', '50mm f1.2', '85mm f1.8', '24-70mm f2.8', '18-35mm', '16mm Fisheye', '135mm',
  '70-200mm', '14mm', '100mm Macro', '12mm Ultra Wide'
];
const movementOptions = [
  'Handheld', 'Steadicam', 'Dolly In', 'Dolly Out', 'Crane Up', 'Crane Down', 'Slider Left', 'Slider Right',
  'Drone Shot', 'Static Tripod', 'Gimbal Orbit', 'POV Shot'
];
const compositionOptions = [
  'Rule of Thirds', 'Center Composition', 'Symmetry', 'Leading Lines', 'Low Angle', 'High Angle',
  'Over-the-Shoulder', 'Wide Shot', 'Close-up', 'Dutch Angle', 'Negative Space'
];
const lightingOptions = [
  'Natural Light', 'Low Key', 'High Key', 'Rembrandt', 'Backlight', 'Silhouette', 'Color Gel',
  'Softbox', 'Hard Light', 'Practical Light', 'Golden Hour'
];
const colorOptions = [
  'Warm', 'Cool', 'Neutral', 'Muted', 'Vivid', 'Black & White', 'Analog Film', 'Sepia', 'Monochrome', 'Cinematic Teal-Orange', 'Retro'
];
const toneOptions = [
  'Cinematic', 'Dramatic', 'Comedic', 'Romantic', 'Moody', 'Bright', 'Noir', 'Surreal', 'Realistic', 'Epic', 'Dreamlike'
];
const timeOptions = [
  'Day', 'Night', 'Golden Hour', 'Sunset', 'Sunrise', 'Blue Hour', 'Rainy', 'Foggy', 'Midday', 'Twilight', 'Afternoon'
];
const eraOptions = [
  'Modern', '1980s', '1990s', '2000s', 'Victorian', 'Medieval', 'Futuristic', 'Ancient Greece', 'Joseon Dynasty', 'Cyberpunk', 'Retro 70s'
];

function App() {
  const [mainPrompt, setMainPrompt] = useState('');
  const [selections, setSelections] = useState({});

  const handleSelection = (key, value) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    alert(
      JSON.stringify(
        {
          prompt: mainPrompt,
          settings: selections
        },
        null,
        2
      )
    );
    // 실제로는 여기서 API 요청(veo2 등)으로 연결하면 됩니다!
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#aee1f9 0%,#f8ffae 100%)',
        padding: '60px 0'
      }}
    >
      {/* 상단 중앙 로고 */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
        {/* logo.svg 또는 logo.png로 파일명 맞춰서 public 폴더에 넣으세요 */}
        <img src="/logo.svg" alt="브이래닛 로고" style={{ width: 120, marginBottom: 0 }} />
      </div>
      {/* 입력 폼 카드 */}
      <div
        style={{
          maxWidth: 600,
          margin: '0 auto',
          background: '#fff',
          borderRadius: 24,
          boxShadow: '0 8px 32px #0001',
          padding: 32,
        }}
      >
        <h2
          style={{
            fontWeight: 900,
            fontSize: 28,
            marginBottom: 24,
            textAlign: 'center',
            color: '#222'
          }}
        >
          🎬 브이래닛 영상 프롬프트 생성기
        </h2>
        <input
          style={{
            width: '100%',
            marginBottom: 22,
            padding: 14,
            borderRadius: 10,
            border: '1.5px solid #a0c4ff',
            fontSize: 17,
            outline: 'none'
          }}
          placeholder="영상의 주요 장면을 설명해주세요"
          value={mainPrompt}
          onChange={e => setMainPrompt(e.target.value)}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            marginBottom: 24
          }}
        >
          <select onChange={e => handleSelection('camera', e.target.value)} style={{ padding: 9, borderRadius: 7, border: '1px solid #ced6e0' }}>
            <option value="">카메라 선택</option>
            {cameraOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select onChange={e => handleSelection('lens', e.target.value)} style={{ padding: 9, borderRadius: 7, border: '1px solid #ced6e0' }}>
            <option value="">렌즈 선택</option>
            {lensOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select onChange={e => handleSelection('movement', e.target.value)} style={{ padding: 9, borderRadius: 7, border: '1px solid #ced6e0' }}>
            <option value="">카메라 워킹</option>
            {movementOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select onChange={e => handleSelection('composition', e.target.value)} style={{ padding: 9, borderRadius: 7, border: '1px solid #ced6e0' }}>
            <option value="">구도</option>
            {compositionOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select onChange={e => handleSelection('lighting', e.target.value)} style={{ padding: 9, borderRadius: 7, border: '1px solid #ced6e0' }}>
            <option value="">조명</option>
            {lightingOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select onChange={e => handleSelection('color', e.target.value)} style={{ padding: 9, borderRadius: 7, border: '1px solid #ced6e0' }}>
            <option value="">색감</option>
            {colorOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select onChange={e => handleSelection('tone', e.target.value)} style={{ padding: 9, borderRadius: 7, border: '1px solid #ced6e0' }}>
            <option value="">톤/매너</option>
            {toneOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select onChange={e => handleSelection('time', e.target.value)} style={{ padding: 9, borderRadius: 7, border: '1px solid #ced6e0' }}>
            <option value="">시간</option>
            {timeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select onChange={e => handleSelection('era', e.target.value)} style={{ padding: 9, borderRadius: 7, border: '1px solid #ced6e0' }}>
            <option value="">시대</option>
            {eraOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <button
          style={{
            width: '100%',
            padding: 16,
            borderRadius: 10,
            background: 'linear-gradient(90deg, #23a6d5, #23d5ab)',
            color: '#fff',
            fontWeight: 900,
            fontSize: 20,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: 2
          }}
          onClick={handleSubmit}
        >
          생성하기
        </button>
      </div>
    </div>
  );
}

export default App;
