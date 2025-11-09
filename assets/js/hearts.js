(function(){
  const container = document.querySelector('.hearts-container');

  if(!container) return;

  // heart SVG 模板（可换成 emoji 或 png）
  const heartSVG = (color)=>`
    <svg viewBox="0 0 32 29" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <path d="M23.6 0c-2.9 0-4.6 1.9-6.1 3.7C15.9 1.9 14.2 0 11.3 0 7.3 0 4.7 2.6 4.7 6.5c0 7.1 11 12.5 13.6 14 2.6-1.5 13.6-6.9 13.6-14C29.9 2.6 27.3 0 23.6 0z" fill="${color}"/>
    </svg>`;

  // 生成单个心形
  function createHeart(){
    const el = document.createElement('div');
    el.className = 'heart';
    // 随机颜色（粉色系偏好）
    const colors = ['#ff6fa3','#ff8fb1','#ff4d94','#ff99c8','#ff5aa8'];
    const color = colors[Math.floor(Math.random()*colors.length)];

    // 随机参数
    const size = Math.random() * 28 + 20; // 20-48px
    const left = Math.random() * 100; // 百分比
    const duration = Math.random() * 6 + 6; // 6-12s
    const delay = Math.random() * 1.2; // 0-1.2s

    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = left + 'vw';
    el.style.animationDuration = duration + 's, ' + duration + 's';
    el.style.animationDelay = delay + 's, ' + delay + 's';
    el.innerHTML = heartSVG(color);

    // 鼠标点击也可生成一波
    el.addEventListener('animationend', ()=> el.remove());

    container.appendChild(el);
  }

  // 周期性生成，页面可感知活跃度，移动设备上频率稍减
  const interval = (('ontouchstart' in window) ? 900 : 550);
  let timer = setInterval(createHeart, interval);

  // 点击页面时快速喷发爱心
  document.addEventListener('click', (e)=>{
    for(let i=0;i<6;i++){
      setTimeout(createHeart, i*60);
    }
  });

  // 当 tab 不可见时暂停生成，节省资源
  document.addEventListener('visibilitychange', ()=>{
    if(document.hidden) clearInterval(timer);
    else timer = setInterval(createHeart, interval);
  });

  // 立即产生几颗欢迎心
  for(let i=0;i<8;i++) setTimeout(createHeart, i*120);
})();
