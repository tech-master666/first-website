// 留言墙：写留言的表单是轮播的第 4 张卡；每条留言再变成后面的一张卡。
// 身份是浏览器 localStorage 里的一串随机令牌，认浏览器不认人；自己的卡有删除按钮。
const GB_API = 'https://zonal-lamprey-d6gin3mx4b96a1a58-1342671552.ap-shanghai.app.tcloudbase.com/guestbook';

const gbToken = (() => {
  let t = localStorage.getItem('gb_token');
  if (!t) { t = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('gb_token', t); }
  return t;
})();

const gbTrack = document.querySelector('[data-testimonial-track]');

async function gbCall(payload) {
  const res = await fetch(GB_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: gbToken, ...payload }),
  });
  return res.json();
}

function gbMakeSlide(it) {
  const card = document.createElement('article');
  card.className = 'testimonial-card gb-msg';
  const mark = document.createElement('div');
  mark.className = 'testimonial-mark';
  mark.textContent = '“';
  const quote = document.createElement('p');
  quote.className = 'testimonial-quote';
  quote.textContent = it.content;
  const person = document.createElement('div');
  person.className = 'testimonial-person';
  const meta = document.createElement('div');
  const name = document.createElement('strong');
  name.textContent = it.name;
  const when = document.createElement('span');
  when.textContent = new Date(it.createdAt).toLocaleString('zh-CN', { hour12: false });
  meta.append(name, when);
  person.append(meta);
  card.append(mark, quote, person);
  if (it.mine) {
    const del = document.createElement('button');
    del.className = 'gb-del';
    del.textContent = '删除';
    del.addEventListener('click', async () => {
      if (!confirm('删掉这条留言？')) return;
      let r;
      try { r = await gbCall({ action: 'remove', id: it.id }); } catch { alert('删除失败，检查网络后重试'); return; }
      if (r.ok) { await gbLoadSlides(); window.testimonialShow?.(3); }
      else alert(r.error || '删除失败');
    });
    card.append(del);
  }
  return card;
}

async function gbLoadSlides() {
  let out;
  try { out = await gbCall({ action: 'list' }); } catch { return; }
  if (!out.ok) return;
  gbTrack.querySelectorAll('.gb-msg').forEach(el => el.remove());
  out.items.forEach(it => gbTrack.append(gbMakeSlide(it)));
  window.testimonialShow?.(0);
}

document.querySelector('[data-gb-form]')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nameEl = document.querySelector('[data-gb-name]');
  const contentEl = document.querySelector('[data-gb-content]');
  localStorage.setItem('gb_name', nameEl.value.trim());
  let r;
  try { r = await gbCall({ action: 'add', name: nameEl.value, content: contentEl.value }); }
  catch { alert('发送失败，检查网络后重试'); return; }
  if (!r.ok) { alert(r.error || '发送失败'); return; }
  contentEl.value = '';
  await gbLoadSlides();
  // 跳到刚写的那张卡（留言按最新在前，第一张留言卡就是刚发的）
  const firstMsg = gbTrack.querySelector('.gb-msg');
  if (firstMsg) window.testimonialShow?.([...gbTrack.children].indexOf(firstMsg));
});

const gbSavedName = localStorage.getItem('gb_name');
if (gbSavedName) document.querySelector('[data-gb-name]').value = gbSavedName;
gbLoadSlides();
