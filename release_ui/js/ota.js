import {postForm, toast} from './common.js';
const file = document.getElementById('file');
const bar  = document.getElementById('bar');
const msg  = document.getElementById('msg');
document.getElementById('async').checked = true;

file.addEventListener('change', async ()=>{
  if(!file.files.length) return;
  const f = file.files[0];
  const async = document.getElementById('async').checked ? 1 : 0;
  const fd = new FormData();
  fd.append('file', f);
  // 進度
  bar.value = 0; msg.textContent = '上傳中...';
  try{
    await postForm(`/ota_upload?sync=${async}`, fd, p=>bar.value = p*100);
    toast('上傳完成！');
    msg.textContent = 'Queued，稍候自動重啟更新';
  }catch(e){
    toast('失敗: '+e); msg.textContent = '失敗: '+e;
  }
});
