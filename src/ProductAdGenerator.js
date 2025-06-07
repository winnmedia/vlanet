import React, { useState } from 'react';

function ProductAdGenerator() {
  const faces = ['Celebrity A', 'Influencer B', 'Model C'];
  const styles = ['Luxury', 'Casual', 'Emotional'];
  const backgrounds = ['Indoor', 'Outdoor', 'Cafe', 'Street'];
  const lengths = ['Short (15~30s)', 'Long (1m+)'];

  const [productImage, setProductImage] = useState(null);
  const [face, setFace] = useState('');
  const [style, setStyle] = useState('');
  const [background, setBackground] = useState('');
  const [length, setLength] = useState('');
  const [preview, setPreview] = useState(false);

  const handleGenerate = () => {
    setPreview(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h2>AI 광고 영상 생성</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label>제품 사진 업로드</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>모델 얼굴 선택</label>
        <select value={face} onChange={(e) => setFace(e.target.value)}>
          <option value="">선택...</option>
          {faces.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>광고 스타일</label>
        <select value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="">선택...</option>
          {styles.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>배경</label>
        <select value={background} onChange={(e) => setBackground(e.target.value)}>
          <option value="">선택...</option>
          {backgrounds.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>영상 길이</label>
        <select value={length} onChange={(e) => setLength(e.target.value)}>
          <option value="">선택...</option>
          {lengths.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
      </div>
      <button onClick={handleGenerate}>광고 만들기</button>

      {preview && (
        <div style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
          <h3>미리보기</h3>
          {productImage && (
            <img src={productImage} alt="product" style={{ maxWidth: '100%', marginBottom: '1rem' }} />
          )}
          <p>모델: {face || '선택 없음'}</p>
          <p>스타일: {style || '선택 없음'}</p>
          <p>배경: {background || '선택 없음'}</p>
          <p>영상 길이: {length || '선택 없음'}</p>
          <p>※ 실제 AI 합성 기능은 구현되어 있지 않습니다.</p>
        </div>
      )}
    </div>
  );
}

export default ProductAdGenerator;
