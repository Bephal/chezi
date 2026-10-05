const $=id=>document.getElementById(id);
const viewer=$('viewer'),play=$('play'),rotate=$('rotate'),scrub=$('scrub');
let ready=false,paused=false,scrubbing=false;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduced)viewer.removeAttribute('autoplay');
function clock(t){t=Math.max(0,Math.floor(t||0));return `${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}`;}
function updatePlay(){play.setAttribute('aria-label',paused?'Включить танец':'Приостановить танец');$('play-icon').textContent=paused?'▶':'Ⅱ';$('state').textContent=paused?'На паузе':'В движении';$('track-caption').textContent=paused?'Продолжите, когда захотите':'Танец по кругу';}
viewer.addEventListener('load',()=>{ready=true;$('loader').style.display='none';$('progress-fill').parentElement.style.display='none';['play','speed','rotate','reset','scrub'].forEach(id=>$(id).disabled=false);const animations=viewer.availableAnimations;if(!animations.length){$('state').textContent='Модель без анимации';play.disabled=true;scrub.disabled=true;$('speed').disabled=true;$('track-caption').textContent='Доступен 3D-обзор';return;}viewer.animationName=animations[0];paused=reduced;if(paused)viewer.pause();else viewer.play();scrub.max=viewer.duration||1;$('duration').textContent=clock(viewer.duration);updatePlay();$('announcement').textContent='3D-модель загружена. Можно вращать, приближать и управлять танцем.';});
viewer.addEventListener('progress',e=>{$('progress-fill').style.width=`${e.detail.totalProgress*100}%`;$('load-detail').textContent=`Загружаем 3D-модель… ${Math.round(e.detail.totalProgress*100)}%`;});
viewer.addEventListener('error',()=>{$('loader').style.display='flex';$('load-title').textContent='Не удалось загрузить 3D';$('load-detail').textContent='Обновите страницу или скачайте модель ниже.';$('state').textContent='Ошибка загрузки';$('loader').querySelector('.loader-ring').style.display='none';});
play.addEventListener('click',()=>{paused=!paused;paused?viewer.pause():viewer.play();updatePlay();});
$('speed').addEventListener('change',e=>viewer.timeScale=Number(e.target.value));
rotate.addEventListener('click',()=>{viewer.autoRotate=!viewer.autoRotate;rotate.setAttribute('aria-pressed',String(viewer.autoRotate));});
$('reset').addEventListener('click',()=>{viewer.autoRotate=false;rotate.setAttribute('aria-pressed','false');viewer.resetTurntableRotation(0);viewer.cameraOrbit='0deg 80deg 110%';viewer.cameraTarget='auto auto auto';viewer.fieldOfView='30deg';});
scrub.addEventListener('input',()=>{scrubbing=true;viewer.currentTime=Number(scrub.value);$('elapsed').textContent=clock(viewer.currentTime);});
scrub.addEventListener('change',()=>scrubbing=false);
$('fullscreen').addEventListener('click',async()=>{const stage=$('stage');try{if(document.fullscreenElement)await document.exitFullscreen();else if(stage.requestFullscreen)await stage.requestFullscreen();else stage.classList.toggle('expanded');}catch{stage.classList.toggle('expanded');}const expanded=!!document.fullscreenElement||stage.classList.contains('expanded');$('fullscreen').setAttribute('aria-label',expanded?'Выйти из полного экрана':'Полный экран');});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('stage').classList.remove('expanded');});
function tick(){if(ready&&!scrubbing){scrub.value=viewer.currentTime||0;$('elapsed').textContent=clock(viewer.currentTime);if(viewer.duration&&Number(scrub.max)!==viewer.duration){scrub.max=viewer.duration;$('duration').textContent=clock(viewer.duration);}}requestAnimationFrame(tick);}tick();
