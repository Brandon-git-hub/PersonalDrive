import {getJSON, postForm, toast} from './common.js';
const tbl = document.querySelector('#files tbody');
const msg = document.getElementById('msg');
async function load(){
  tbl.innerHTML='';
  try{
    const list = await getJSON('/spiffs/list?json=1');
    list.forEach(f=>{
      const tr=document.createElement('tr');
      tr.innerHTML=`<td>${f.name}</td><td>${f.size}</td><td>
        <button data-del="${f.name}">刪除</button>
      </td>`;
      tbl.appendChild(tr);
    });
  }catch(e){msg.textContent='載入失敗:'+e;}
}

document.getElementById('refresh').onclick=load;

tbl.addEventListener('click', async e=>{
  const name=e.target.dataset.del;
  if(name){
    if(!confirm('確定刪除 '+name+'?')) return;
    try{ await fetch('/spiffs/del?name='+encodeURIComponent(name),{method:'POST'});
      toast('已刪除'); load(); }
    catch(e){ toast('刪除失敗:'+e); }
  }
});

document.getElementById('upload').onchange=async ()=>{
  const files=[...document.getElementById('upload').files];
  for(const f of files){
    const fd=new FormData(); fd.append('file',f);
    try{ await postForm('/spiffs/write?name='+encodeURIComponent(f.name),fd);
      toast(f.name+' 上傳成功'); }
    catch(e){ toast(f.name+' 失敗'); }
  }
  load();
};

load();