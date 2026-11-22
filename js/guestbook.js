// 留言墙前端：填昵称 -> 写留言 -> 立刻上墙；自己的留言带删除按钮。
// 身份就是浏览器 localStorage 里的一串随机令牌，认浏览器不认人。
const GB_API = 'https://zonal-lamprey-d6gin3mx4b96a1a58-1342671552.ap-shanghai.app.tcloudbase.com/guestbook'; // 部署后替换成真实地址

const gbToken = (() => {
  let t = localStorage.getItem('gb_token');
  if (!t) { t = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('gb_token', t); }
  return t;
})();

async function gbCall(payload) {
  const res = await fetch(GB_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: gbToken, ...payload }),
  });
  return res.json();
}

function gbEscape(s) {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

async function gbRender() {
  const list = document.querySelector('[data-gb-list]');
  let out;
  try { out = await gbCall({ action: 'list' }); }
  catch { list.innerHTML = '<p class="gb-empty">留言加载失败，检查网络后刷新</p>'; return; }
  if (!out.ok) { list.innerHTML = '<p class="gb-empty">留言加载失败，刷新试试</p>'; return; }
  if (!out.items.length) { list.innerHTML = '<p class="gb-empty">还没有留言，来写第一条</p>'; return; }
  list.innerHTML = out.items.map(it => `
    <article class="gb-item">
      <header><strong>${gbEscape(it.name)}</strong><time>${new Date(it.createdAt).toLocaleString('zh-CN', { hour12: false })}</time></header>
      <p>${gbEscape(it.content)}</p>
      ${it.mine ? `<button class="gb-del" data-gb-del="${it.id}">删除</button>` : ''}
    </article>`).join('');
  list.querySelectorAll('[data-gb-del]').forEach(btn => btn.addEventListener('click', async () => {
    if (!confirm('删掉这条留言？')) return;
    const r = await gbCall({ action: 'remove', id: btn.dataset.gbDel });
    if (r.ok) gbRender(); else alert(r.error || '删除失败');
  }));
}

document.querySelector('[data-gb-form]')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nameEl = document.querySelector('[data-gb-name]');
  const contentEl = document.querySelector('[data-gb-content]');
  localStorage.setItem('gb_name', nameEl.value.trim());
  let r;
  try { r = await gbCall({ action: 'add', name: nameEl.value, content: contentEl.value }); }
  catch { alert('发送失败，检查网络后重试'); return; }
  if (r.ok) { contentEl.value = ''; gbRender(); } else alert(r.error || '发送失败');
});

const savedName = localStorage.getItem('gb_name');
if (savedName) document.querySelector('[data-gb-name]').value = savedName;
gbRender();
