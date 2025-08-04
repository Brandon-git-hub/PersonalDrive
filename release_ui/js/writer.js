import {getJSON, postForm, toast} from './common.js';
const opSel=document.getElementById('op');
const form=document.getElementById('form');
const out=document.getElementById('out');

function render(){
  const v=opSel.value; form.innerHTML=''; out.textContent='';
  if(v==='housing'){
    form.innerHTML='<button id="do">Read Housing</button>';
  }else if(v==='reboot'){
    form.innerHTML='<label>Version <input id="ver" value="1"></label> <button id="do">Reboot</button>';
  }else{
    form.innerHTML='<label>Addr <input id="addr" value="0x8008000"></label> <label>Size <input id="size" value="16"></label> <button id="do">Do</button>';
    if(v==='mem_write') form.innerHTML+='<br><input type="file" id="bin" accept=".bin">';
  }
}

opSel.onchange=render; render();

form.addEventListener('click', async e=>{
  if(e.target.id!=='do') return;
  const op=opSel.value;
  const addr=document.getElementById('addr')?.value;
  const size=document.getElementById('size')?.value;
  try{
    if(op==='housing'){
      const j=await getJSON('/writer/housing?sync=1'); out.textContent=JSON.stringify(j,null,2);
    }else if(op==='reboot'){
      const ver=document.getElementById('ver').value;
      await fetch('/writer/reboot?version='+ver+'&sync=1',{method:'POST'});
      toast('Reboot 發送完成');
    }else if(op==='mem_write'){
      const file=document.getElementById('bin').files[0]; if(!file) return toast('選檔');
      const fd=new FormData(); fd.append('file',file);
      await postForm(`/writer/mem_write?addr=${addr}&size=${size}&sync=1`,fd);
      toast('Write OK');
    }else{
      const j=await getJSON(`/writer/${op}?addr=${addr}&size=${size}&sync=1`);
      out.textContent=JSON.stringify(j,null,2);
    }
  }catch(e){ toast('失敗:'+e); }
});
