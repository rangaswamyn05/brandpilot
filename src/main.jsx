import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const starter = [
  { kicker: 'INTRODUCING', title: 'A little something\nnew.', body: 'Thoughtfully made, beautifully presented, ready when you are.' },
  { kicker: 'MADE WITH CARE', title: 'The details\nmake it.', body: 'A fresh experience, created with care in every detail.' },
  { kicker: 'YOUR NEW FAVORITE', title: 'Worth making\nplans for.', body: 'Come by and discover something worth sharing.' },
  { kicker: 'HERE FOR YOU', title: 'Make room\nfor good things.', body: 'Bring a little more joy to the everyday.' },
  { kicker: 'COME SAY HELLO', title: 'We’ll save\nyou a spot.', body: 'Visit us and discover what is new.' }
];

function App() {
  const [business, setBusiness] = useState('The Sunday Table');
  const [type, setType] = useState('Restaurant');
  const [goal, setGoal] = useState('Promote a new menu item');
  const [brief, setBrief] = useState('A fresh seasonal special, made with local ingredients. Available this week.');
  const [photo, setPhoto] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [caption, setCaption] = useState('A fresh reason to make plans. Meet your new seasonal favorite — thoughtfully made with local ingredients and here for a limited time. Come by this week and try it for yourself. ✨');
  const [tags, setTags] = useState('#TheSundayTable #SeasonalMenu #MadeFresh #LocalEats #FoodWorthSharing');
  const [slides, setSlides] = useState(starter);
  const [active, setActive] = useState(0);
  const [view, setView] = useState('caption');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [notice, setNotice] = useState('Your workspace is ready');
  const filter = 'brightness(' + brightness + '%) contrast(' + contrast + '%) saturate(' + saturation + '%)';
  const current = slides[active];

  function upload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (photo) URL.revokeObjectURL(photo);
    setPhoto(URL.createObjectURL(file));
    setPhotoName(file.name);
    setNotice('Original photo added');
  }

  function generate() {
    const name = business.trim() || 'Your business';
    const detail = brief.trim() || 'Something new to share';
    setCaption('A little something worth sharing from ' + name + '. ' + detail + ' Come by and experience it for yourself — we can’t wait to see you. ✨');
    setTags('#' + name.replace(/[^a-z0-9]/gi, '') + ' #SmallBusiness #ShopLocal #MadeWithCare #DiscoverSomethingNew');
    setSlides([
      { kicker: 'MEET THE NEW', title: 'A little something\nnew.', body: detail },
      { kicker: 'MADE WITH CARE', title: 'The details\nmake it.', body: 'Thoughtfully created by ' + name + ', with care in every detail.' },
      { kicker: 'YOUR NEW FAVORITE', title: 'Worth making\nplans for.', body: 'A fresh experience, ready when you are.' },
      { kicker: 'HERE FOR YOU', title: 'Make room\nfor good things.', body: 'Come by and let us make your day a little better.' },
      { kicker: 'COME SAY HELLO', title: 'We’ll save\nyou a spot.', body: 'Visit ' + name + ' and discover what is new.' }
    ]);
    setActive(0);
    setView('carousel');
    setNotice('Draft created — edit every detail');
  }

  function downloadText() {
    const blob = new Blob([caption + '\n\n' + tags + '\n'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'brandpilot-caption.txt'; a.click();
    URL.revokeObjectURL(url);
    setNotice('Caption export downloaded');
  }

  function downloadSlide() {
    const canvas = document.createElement('canvas');
    canvas.width = 1080; canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    const draw = () => {
      ctx.fillStyle = '#34483a'; ctx.fillRect(0, 0, 1080, 1350);
      ctx.fillStyle = 'rgba(20,35,25,.48)'; ctx.fillRect(0, 0, 1080, 1350);
      ctx.textAlign = 'center'; ctx.fillStyle = '#fffaf0';
      ctx.font = '600 27px Arial'; ctx.fillText(current.kicker, 540, 310);
      ctx.font = 'bold 92px Georgia';
      current.title.split('\n').forEach((line, i) => ctx.fillText(line, 540, 570 + i * 112, 920));
      ctx.font = '32px Arial';
      const words = current.body.split(' '); let line = ''; let y = 900;
      words.forEach(word => {
        const test = line + word + ' ';
        if (ctx.measureText(test).width > 820 && line) { ctx.fillText(line, 540, y); line = word + ' '; y += 48; }
        else line = test;
      });
      ctx.fillText(line, 540, y);
      ctx.font = '600 24px Arial'; ctx.fillText(business.toUpperCase(), 540, 1230);
      const a = document.createElement('a');
      a.download = 'brandpilot-slide-' + (active + 1) + '.png';
      a.href = canvas.toDataURL('image/png'); a.click();
      setNotice('Slide PNG downloaded');
    };
    if (!photo) { draw(); return; }
    const img = new Image();
    img.onload = () => {
      const scale = Math.max(1080 / img.width, 1350 / img.height);
      const w = img.width * scale, h = img.height * scale;
      ctx.save(); ctx.filter = filter;
      ctx.drawImage(img, (1080 - w) / 2, (1350 - h) / 2, w, h);
      ctx.restore(); drawOverlay();
    };
    img.onerror = draw;
    img.src = photo;
    function drawOverlay() {
      ctx.fillStyle = 'rgba(20,35,25,.56)'; ctx.fillRect(0, 0, 1080, 1350);
      ctx.textAlign = 'center'; ctx.fillStyle = '#fffaf0';
      ctx.font = '600 27px Arial'; ctx.fillText(current.kicker, 540, 310);
      ctx.font = 'bold 92px Georgia';
      current.title.split('\n').forEach((line, i) => ctx.fillText(line, 540, 570 + i * 112, 920));
      ctx.font = '32px Arial'; ctx.fillText(current.body, 540, 900, 850);
      ctx.font = '600 24px Arial'; ctx.fillText(business.toUpperCase(), 540, 1230);
      const a = document.createElement('a'); a.download = 'brandpilot-slide-' + (active + 1) + '.png'; a.href = canvas.toDataURL('image/png'); a.click();
      setNotice('Slide PNG downloaded');
    }
  }

  return <div className="app">
    <aside className="sidebar">
      <div className="logo"><span className="logo-icon">✦</span> brandpilot<span className="ai">.ai</span></div>
      <div className="side-label">WORKSPACE</div>
      <div className="workspace"><span className="workspace-mark">S</span><span><b>Studio workspace</b><small>Build your brand</small></span><span>⌄</span></div>
      <div className="side-label nav-label">CREATE</div>
      <div className="nav active">✧ &nbsp; Content studio</div>
      <div className="nav">▧ &nbsp; Design editor</div>
      <div className="side-note"><b>Keep it authentic.</b><p>Start with your real photo. Your products should always look like your products.</p></div>
      <div className="user"><span className="user-mark">R</span><span><b>Your account</b><small>Business owner</small></span></div>
    </aside>
    <main className="main">
      <header className="topbar"><span>Workspace <i>/</i> Content studio</span><span className="status"><b></b>{notice}<span className="user-mark small">R</span></span></header>
      <div className="content">
        <section className="hero"><div><div className="eyebrow">✦ &nbsp; YOUR BUSINESS, READY TO BE SEEN</div><h1>Make your next post<br/><em>your best one.</em></h1><p>Thoughtful social content, built around what makes your business you.</p></div><div className="hero-seal"><b>01</b><small>CONTENT<br/>STUDIO</small></div></section>
        <div className="columns">
          <section className="builder">
            <div className="section-title"><span className="number">01</span><h2>Set the scene</h2><small>YOUR BUSINESS</small></div>
            <div className="two">
              <label>Business name<input value={business} onChange={e=>setBusiness(e.target.value)}/></label>
              <label>Business type<select value={type} onChange={e=>setType(e.target.value)}>{['Restaurant','Cafe','Salon','Real estate','Retail','Fitness','Professional services','Other'].map(x=><option key={x}>{x}</option>)}</select></label>
            </div>
            <div className="section-title spaced"><span className="number">02</span><h2>What are we sharing?</h2><small>CAMPAIGN BRIEF</small></div>
            <label className="field">Your goal<select value={goal} onChange={e=>setGoal(e.target.value)}>{['Promote a new menu item','Announce an offer','Build brand awareness','Showcase a product','Drive bookings or visits','Share a customer story'].map(x=><option key={x}>{x}</option>)}</select></label>
            <label className="field">A few details<textarea rows="3" value={brief} onChange={e=>setBrief(e.target.value)}/></label>
            <div className="section-title spaced"><span className="number">03</span><h2>Bring your photo</h2><small>YOUR ORIGINAL IMAGE</small></div>
            <label className="upload">
              {photo ? <img src={photo} alt="Uploaded original" style={{filter}}/> : <span className="upload-inner"><b className="upload-symbol">＋</b><strong>Drop your photo here</strong><small>or browse files · JPG, PNG, WEBP</small></span>}
              <input type="file" accept="image/*" onChange={upload}/>
            </label>
            {photo && <div className="file-name">✓ &nbsp;{photoName}<span>Original preserved</span></div>}
            <div className="authentic">✓ &nbsp; Your photo stays yours. We use restrained, non-generative adjustments — no replacing or reinventing your product.</div>
            {photo && <div className="adjust">
              <div className="adjust-head">PHOTO ADJUSTMENTS <button onClick={()=>{setBrightness(100);setContrast(100);setSaturation(100)}}>Reset</button></div>
              {[['Brightness',brightness,setBrightness],['Contrast',contrast,setContrast],['Color',saturation,setSaturation]].map(([label,value,setter])=><label className="range" key={label}><span>{label}</span><input type="range" min="70" max="130" value={value} onChange={e=>setter(Number(e.target.value))}/><small>{value}%</small></label>)}
            </div>}
            <button className="create" onClick={generate}>✦ &nbsp; Create my content <span>→</span></button>
            <div className="fine">A first draft in seconds. Edit every word and every slide.</div>
          </section>
          <section className="preview">
            <div className="preview-heading"><div><small>LIVE PREVIEW</small><h2>Your content canvas</h2></div><span className="ready"><b></b> {notice.toUpperCase()}</span></div>
            <div className="tabs"><button className={view==='caption'?'chosen':''} onClick={()=>setView('caption')}>Caption</button><button className={view==='carousel'?'chosen':''} onClick={()=>setView('carousel')}>Carousel <i>5</i></button></div>
            {view==='caption' ? <div className="social-card">
              <div className="social-top"><span className="insta">◎</span><span><b>{business || 'Your business'}</b><small>Instagram post preview</small></span><span className="more">···</span></div>
              {photo ? <div className="social-image"><img src={photo} alt="Your uploaded original" style={{filter}}/></div> : <div className="empty-image"><span>▧</span><small>Your photo will appear here</small></div>}
              <div className="copy-area"><div className="micro">YOUR CAPTION <i>EDITABLE</i></div><textarea rows="5" value={caption} onChange={e=>setCaption(e.target.value)}/><div className="micro">HASHTAGS</div><textarea className="tags" rows="2" value={tags} onChange={e=>setTags(e.target.value)}/></div>
              <button className="export" onClick={downloadText}>↓ &nbsp; Export caption & hashtags</button>
            </div> : <div className="carousel-editor">
              <div className="slide-nav">{slides.map((s,i)=><button key={i} className={active===i?'selected':''} onClick={()=>setActive(i)}>{String(i+1).padStart(2,'0')}</button>)}</div>
              <div className="art" style={photo?{backgroundImage:'linear-gradient(#1b2d2370,#1b2d2390),url('+photo+')'}:{}}><small>{current.kicker}</small><h3>{current.title.split('\n').map((line,i)=><React.Fragment key={i}>{line}<br/></React.Fragment>)}</h3><p>{current.body}</p><footer>{business}</footer></div>
              <label className="field">Slide headline<textarea rows="2" value={current.title} onChange={e=>setSlides(slides.map((s,i)=>i===active?{...s,title:e.target.value}:s))}/></label>
              <label className="field">Supporting text<textarea rows="2" value={current.body} onChange={e=>setSlides(slides.map((s,i)=>i===active?{...s,body:e.target.value}:s))}/></label>
              <button className="export" onClick={downloadSlide}>↓ &nbsp; Export this slide as PNG</button>
            </div>}
            <div className="preview-foot"><span>DESIGNED FOR THE FEED</span><span>4:5 FORMAT · 1080 × 1350</span></div>
          </section>
        </div>
        <footer className="page-foot"><span>BRANDPILOT AI &nbsp;·&nbsp; YOUR BUSINESS, IN THE SPOTLIGHT.</span><span>MADE FOR THE PEOPLE WHO MAKE IT HAPPEN.</span></footer>
      </div>
    </main>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
