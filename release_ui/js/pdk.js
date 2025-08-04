import {postForm, toast} from './common.js';
const file = document.getElementById('file');
const bar  = document.getElementById('bar');
const msg  = document.getElementById('msg');
file.addEventListener('change', async()=>{
  if(!file.files.length) return;
  const f = file.files[0];
  const sync = document.getElementById('sync').checked ? 1 : 0;
  const fd = new FormData();
  fd.append('file', f);
  bar.value = 0; msg.textContent='上傳中...';
  try{
    await postForm(`/pdk_upload?name=${encodeURIComponent(f.name)}&sync=${sync}`, fd, p=>bar.value=p*100);
    toast('PDK 上傳完成'); msg.textContent='完成';
  }catch(e){ toast('失敗:'+e); msg.textContent='失敗:'+e; }
});