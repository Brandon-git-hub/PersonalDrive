import {toast} from './common.js';
const token=document.getElementById('token');
const msg = document.getElementById('msg');

document.getElementById('reset').onclick=async ()=>{
  if(!confirm('確定恢復出廠並重啟?')) return;
  try{
    const r=await fetch('/factory_reset',{method:'POST',headers:{'Auth':token.value}});
    msg.textContent = r.ok?'已送出，系統將重啟':'失敗 '+r.status;
  }catch(e){ msg.textContent='失敗:'+e; }
};