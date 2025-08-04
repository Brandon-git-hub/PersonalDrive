export async function getJSON(url, opt={}){
  const r = await fetch(url, opt);
  if(!r.ok) throw new Error(r.status);
  return r.json();
}
export async function postForm(url, formData, onProgress){
  return new Promise((res,rej)=>{
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.upload.onprogress = e=>{
      if(onProgress && e.lengthComputable)
        onProgress(e.loaded/e.total);
    };
    xhr.onload = () => xhr.status===200 ? res(xhr.response) : rej(xhr.status);
    xhr.onerror = () => rej('network');
    xhr.send(formData);
  });
}
export function toast(msg){ alert(msg); }   // 先簡化，日後可換成自製 Toast
