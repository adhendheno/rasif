const IDX={'DKI Jakarta':1.12,'Jawa Barat':1,'Jawa Tengah':.92,'Jawa Timur':.95,'Bali':1.08,'Banten':1.02,'Sumatera Utara':1.1,'Kalimantan Timur':1.25,'Sulawesi Selatan':1.15};
const BR=[['Pekerjaan Persiapan',.03,'Ls'],['Pondasi',.08,'m²'],['Struktur',.20,'m²'],['Beton',.10,'m²'],['Dinding',.10,'m²'],['Atap',.08,'m²'],['Plafon',.05,'m²'],['Lantai',.07,'m²'],['Pintu & Jendela',.06,'Ls'],['Plumbing',.05,'Ls'],['Listrik',.05,'Ls'],['Cat & Finishing',.09,'m²'],['Landscape',.04,'Ls']];
const SPN=v=>v<7.5e6?'Standar':v<9e6?'Premium':'Luxury';
const RATE=()=>(+$('br').value||8)/100;
const S={fl:2,st:1,sp:8500000},$=id=>document.getElementById(id);let fl=1,last='';
$('pv').innerHTML=Object.keys(IDX).map(k=>`<option${k==='Jawa Timur'?' selected':''}>${k}</option>`).join('');
const rp=n=>n>=1e9?'Rp '+(n/1e9).toFixed(2).replace('.',',')+' M':'Rp '+Math.round(n/1e6).toLocaleString('id-ID')+' jt';
const Z={1:[['Dapur & servis',0,0,.55,.25,1],['Pocket garden',.55,0,.45,.25,3],['Makan',0,.25,.55,.25,2],['Tangga & KM',.55,.25,.45,.25,1],['Ruang keluarga & tamu',0,.5,1,.28,2],['Carport',0,.78,.6,.22,1],['Teras',.6,.78,.4,.22,3]],
2:[['Kamar utama',0,0,.5,.4,2],['Kamar 2',.5,0,.5,.4,1],['Void & lounge',0,.4,1,.25,3],['Kamar 3 + KM',0,.65,.55,.35,1],['Balkon taman',.55,.65,.45,.35,3]],
3:[['Studio / kantor',0,0,.6,.5,2],['Rooftop garden',.6,0,.4,.5,3],['Panel surya & jemur',0,.5,1,.5,1]]};
const SN={1.03:'Minimalis',1:'Modern Tropis',1.06:'Japandi',1.12:'Classic',1.18:'Klasik Eropa'},SD={1.03:'Bentuk kotak bersih, atap datar dengan overhang tipis, bukaan kaca lebar, dan palet warna netral.',1:'Volume lantai atas menjorok, secondary skin kayu, kaca lebar, taman vertikal, dan atap datar berkebun.',1.06:'Atap pelana rendah beratap lebar, panel kayu hangat, jendela shoji bercahaya, dan pondasi batu.',1.12:'Fasad simetris, portico berkolom, balkon balustrade, atap limasan, dan list emas.',1.18:'Portico empat kolom dengan pediment, jendela lengkung, sudut quoin, list dentil, dan atap terakota.'};
function facade(bw){
 const m={1.06:['Japandi',JIMG,'kayu hangat, batu alam, taman bonsai, dan pencahayaan lembut'],1.03:['Minimalis',MIMG,'garis tegas, atap datar, kaca lebar, dan aksen kayu'],1:['Modern Tropis',TIMG,'kaca lebar, aksen kayu, batu alam, dan taman tropis'],1.12:['Classic',CIMG,'kolom bergaya klasik, list dan ornamen, jendela besar berbingkai hitam, dan pencahayaan hangat']}[S.st];
 if(m){const nm=m[0],im=m[1][S.fl];$('fc').innerHTML=`<image href="${im}" x="0" y="0" width="400" height="250" preserveAspectRatio="xMidYMid meet"/>`;$('fct').textContent='Tampak depan \u00b7 '+nm+' \u00b7 '+S.fl+' lantai';$('fcm').textContent='Desain '+nm+' '+S.fl+' lantai: '+m[2]+'. Render konsep, bukan gambar kerja.';return}
 const k=S.st,f=S.fl,hw=Math.min(300,150+bw*9),x=(400-hw)/2,g=205,fh=40,H=f*fh,t=g-H,K='#2B3440',wd='#B07A4A',cx=x+hw/2;
 const wc={1.03:'#F6F6F6',1:'#F0F1F3',1.06:'#EFEDE8',1.12:'#E9E6E0',1.18:'#EFE4CF'}[k],cr='#F8F1E0';
 const R=(a,b,c,d,q,e='')=>`<rect x="${a}" y="${b}" width="${c}" height="${d}" fill="${q}" ${e}/>`;
 const P=(p,q,e='')=>`<polygon points="${p}" fill="${q}" ${e}/>`;
 const gl=(a,b,c,d)=>`<rect x="${a}" y="${b}" width="${c}" height="${d}" fill="url(#gl)" stroke="${K}"/>`+P(`${a},${b+d} ${a+c*.5},${b} ${a+c*.75},${b} ${a+c*.25},${b+d}`,'#fff','opacity=".22"');
 const wm=(a,b,c,d)=>R(a,b,c,d,'url(#wm)',`stroke="${K}"`)+`<path d="M${a+c/2} ${b}V${b+d}M${a} ${b+d/2}H${a+c}" stroke="${K}" stroke-width=".6"/>`;
 const sl=(a,b,c,d)=>{let s=R(a,b,c,d,wd);for(let i=a+3;i<a+c;i+=5)s+=`<line x1="${i}" y1="${b}" x2="${i}" y2="${b+d}" stroke="#7A4E2A" stroke-width=".9"/>`;return s+R(a,b,c,d,'url(#sh)')};
 const ar=(a,b,c,d)=>`<path d="M${a} ${b+d}V${b+c/2}A${c/2} ${c/2} 0 0 1 ${a+c} ${b+c/2}V${b+d}Z" fill="url(#gl)" stroke="#8A7650"/>`;
 const tr=(c,r)=>`<circle cx="${c}" cy="${g-r*.7}" r="${r}" fill="#3F7A48"/><circle cx="${c-r*.3}" cy="${g-r*.95}" r="${r*.62}" fill="#66A262"/>`;
 const st=(i,o)=>`<stop offset="${i}" stop-color="${o}"/>`,lg=(id,a,b,c,d)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${c}" y2="${d}">${st(0,a)}${st(1,b)}</linearGradient>`;
 let h=`<defs>${lg('sk','#78AEDC','#E6F0F8',0,1)}${lg('lw','#7DB070','#47804C',0,1)}${lg('gl','#B4D8F0','#3D7099',1,1)}${lg('wm','#FCE7B0','#E5B363',0,1)}${lg('rf','#4A5565','#1E252E',0,1)}${lg('rt','#C0664A','#7E3A28',0,1)}<linearGradient id="sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-opacity="0"/><stop offset="1" stop-opacity=".16"/></linearGradient><radialGradient id="sn"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><filter id="bl"><feGaussianBlur stdDeviation="4"/></filter></defs>`;
 h+=R(0,0,400,250,'url(#sk)')+`<circle cx="335" cy="38" r="70" fill="url(#sn)"/><ellipse cx="80" cy="45" rx="38" ry="9" fill="#fff" opacity=".75"/><ellipse cx="105" cy="40" rx="26" ry="8" fill="#fff" opacity=".75"/><ellipse cx="250" cy="70" rx="30" ry="7" fill="#fff" opacity=".6"/>`+tr(30,34)+tr(372,38)+R(0,g-6,400,56,'url(#lw)')+P(`${x+6},${g} ${x+hw*.55},${g} ${x+hw*.7+40},250 ${x-40},250`,'#C5C9D0')+`<ellipse cx="200" cy="${g+1}" rx="${hw/2+20}" ry="7" fill="#000" opacity=".3" filter="url(#bl)"/>`+tr(x-34,26)+tr(x+hw+34,30);
 const body=R(x,t,hw,H,wc)+R(x,t,hw,H,'url(#sh)');
 if(k===1){
  if(f===1)h+=body;else{const ux=x+hw*.2,uw=hw*.8+14,uh=(f-1)*fh;h+=R(x,g-fh,hw,fh,wc)+R(x,g-fh,hw,fh,'url(#sh)')+R(ux,t,uw,uh,wc)+R(ux,t,uw,uh,'url(#sh)')+sl(ux+uw*.5,t,uw*.5,uh);for(let i=1;i<f;i++)h+=gl(ux+8,g-(i+1)*fh+8,uw*.4,fh-14);h+=R(x-8,g-fh-3,hw+16,3,K)}
  const sx=f===1?x:x+hw*.2,sw=f===1?hw:hw*.8+14;
  h+=R(sx-12,t-6,sw+24,6,K);for(let i=0;i<6;i++)h+=`<circle cx="${sx+8+i*(sw/6)}" cy="${t-9}" r="5" fill="#4F9A5B"/>`;
  h+=gl(x+hw*.34,g-fh+6,hw*.46,fh-6)+R(x+6,g-fh+4,hw*.2,fh-4,'#3F7A48')+R(x+hw*.86,g-fh+9,12,fh-9,wd);
  for(let i=0;i<9;i++)h+=`<circle cx="${x+10+(i%3)*10}" cy="${g-fh+10+Math.floor(i/3)*10}" r="3" fill="#7CBF76"/>`;
 }else if(k===1.03){
  h+=body;for(let i=0;i<f;i++){const y=g-(i+1)*fh;h+=gl(x+10,y+7,hw*.5,fh-12)+gl(x+hw*.68,y+7,hw*.24,fh-12);if(i>0)h+=R(x,y,hw,2,K)}
  h+=R(x,g-5,hw,5,'#8A8F98')+R(x-8,t-5,hw+16,5,K)+R(x+hw*.68-4,g-fh+9,hw*.24+8,fh-9,wd);
 }else if(k===1.06){
  h+=body;for(let i=0;i<f;i++){const y=g-(i+1)*fh;h+=wm(x+10,y+8,hw*.2,fh-14)+wm(x+hw*.7,y+8,hw*.22,fh-14);if(i>0)h+=sl(x+hw*.3,y+4,hw*.34,fh-8)}
  h+=sl(x+hw*.3,g-fh+4,hw*.34,fh-9)+R(x,g-5,hw,5,'#8A8F98')+P(`${x-16},${t} ${cx},${t-32} ${x+hw+16},${t}`,'url(#rf)')+R(x-16,t-2,hw+32,3,'#1E252E')+R(x+hw*.3-6,g-fh-1,hw*.34+12,4,wd);
 }else if(k===1.12){
  h+=body;const n=Math.max(1,Math.floor(hw/90));
  for(let i=0;i<f;i++){const y=g-(i+1)*fh;for(const d of[-1,1])for(let j=0;j<n;j++)h+=gl(cx+d*(52+j*36)-7,y+7,14,fh-12)}
  h+=R(x,g-5,hw,5,'#9AA0A8')+P(`${x-12},${t} ${x+28},${t-30} ${x+hw-28},${t-30} ${x+hw+12},${t}`,'url(#rf)')+R(x-6,t-3,hw+12,4,'#B8923A');
  h+=R(cx-26,g-fh,6,fh,'#F7F7F5')+R(cx+20,g-fh,6,fh,'#F7F7F5')+R(cx-32,g-fh-5,64,5,'#F7F7F5')+R(cx-8,g-fh+10,16,fh-10,wd);
  if(f>1)for(let i=cx-30;i<=cx+30;i+=6)h+=`<line x1="${i}" y1="${g-fh-14}" x2="${i}" y2="${g-fh-5}" stroke="#F7F7F5" stroke-width="2"/>`;
 }else{
  h+=body;for(let y=t+4;y<g-4;y+=9)h+=R(x,y,8,5,cr)+R(x+hw-8,y,8,5,cr);
  const pw=hw*.4,px=cx-pw/2,n=Math.max(1,Math.floor(hw/110));
  for(let i=0;i<f;i++){const y=g-(i+1)*fh;for(const d of[-1,1])for(let j=0;j<n;j++)h+=ar(cx+d*(pw/2+22+j*32)-7,y+6,14,fh-10)}
  h+=P(`${x-10},${t} ${x+22},${t-26} ${x+hw-22},${t-26} ${x+hw+10},${t}`,'url(#rt)')+R(x-6,t-4,hw+12,4,cr);
  for(let i=x-4;i<x+hw+4;i+=6)h+=R(i,t,3,3,'#E4D9BF');
  h+=R(px,t,pw,H,'#E7DCC2')+R(cx-8,g-fh+10,16,fh-10,wd);
  for(let i=0;i<4;i++){const c=px+4+i*(pw-8)/3;h+=R(c-3,t,6,H,cr)+R(c-3,t,6,H,'url(#sh)')+R(c-5,t,10,3,'#E4D9BF')+R(c-5,g-3,10,3,'#E4D9BF')}
  h+=P(`${px-8},${t} ${cx},${t-24} ${px+pw+8},${t}`,cr,'stroke="#D4C8AA"')+R(px-8,t-3,pw+16,3,cr)+`<circle cx="${cx}" cy="${t-8}" r="4" fill="#D4C8AA"/>`+R(px-10,g-3,pw+20,3,'#D8D2C4')+R(px-5,g-6,pw+10,3,'#E0DACB');
 }
 h+=`<ellipse cx="${x-6}" cy="${g+3}" rx="20" ry="9" fill="#4B8A52"/><ellipse cx="${x+hw+8}" cy="${g+3}" rx="22" ry="10" fill="#3F7A48"/>`;
 $('fc').innerHTML=h;$('fct').textContent='Tampak depan \u00b7 '+SN[k];$('fcm').textContent=SD[k]+' Render konsep, bukan gambar kerja.';
}
function calc(){
 const W=Math.min(+$('W').value||10,+$('D').value||20),D=Math.max(+$('W').value||10,+$('D').value||20);
 const bw=Math.max(W-3,4),bd=Math.min(D-7,Math.min(.55,+$('kdb').value)*W*D/bw),fp=bw*bd,gfa=fp*S.fl,idx=IDX[$('pv').value];
 const B=gfa*S.sp*S.st*idx;let X=0,sc=44,sol=0;
 document.querySelectorAll('[data-p]').forEach((c,i)=>{if(c.checked){X+=+c.dataset.p*idx;sc+=+c.dataset.s;if(i===0)sol=1}});
 const T=B+X,[p1,p2,p3]=stageCosts(B,idx),sd=stageDesc(),loan=T*(1-$('dp').value),n=$('tn').value*12,r=RATE()/12,m=loan*r/(1-Math.pow(1+r,-n));
 $('tot').textContent=rp(T);$('spn').textContent=S.sp<7.5e6?'Material standar berkualitas, finishing sederhana':S.sp>9e6?'Material kelas atas, finishing custom':'Material premium, finishing standar tinggi';
 $('meta').textContent=`Lahan ${W}×${D} m² (${W*D} m²) · bangunan ${Math.round(gfa)} m² · ${rp(S.sp*S.st*idx)}/m²`;
 $('ph').innerHTML=[['Tahap 1',p1,sd[0]],['Tahap 2',p2,sd[1]],['Tahap 3',p3,sd[2]]].map(a=>`<div><span class="mut">${a[0]}</span><b>${rp(a[1])}</b><span class="mut">${a[2]}</span></div>`).join('');
  $('cic').textContent=rp(m)+' / bulan';$('cim').textContent=`Pinjaman ${rp(loan)}, DP ${rp(T*$('dp').value)}. Penghasilan rumah tangga yang disarankan sekitar ${rp(m/.35)} / bulan (cicilan maks. 35%).`;
 sc=Math.min(100,sc);const sv=sol*5*4*30*1444.7;
 $('ssc').innerHTML=`<b style="font-size:20px">${sc}/100</b><div class="sc"><i style="width:${sc}%"></i></div><p class="mut">${sol?`Panel surya menghemat sekitar Rp ${Math.round(sv/1e3).toLocaleString('id-ID')} rb/bulan, balik modal ±${(75e6*idx/(sv*12)).toFixed(1)} tahun.`:'Aktifkan panel surya untuk melihat penghematan listrik.'}</p>`;
 fl=Math.min(fl,S.fl);$('ft').innerHTML=[...Array(S.fl)].map((_,i)=>`<button data-v="${i+1}" class="${fl===i+1?'on':''}">Lantai ${i+1}</button>`).join('');
 const s=Math.min(280/W,260/D),ox=(320-W*s)/2,oy=18,bx=ox+1.5*s,by=oy+3*s;
 let h=`<rect x="${ox}" y="${oy}" width="${W*s}" height="${D*s}" fill="none" stroke="var(--mut)" stroke-dasharray="4 3"/><rect x="${bx}" y="${by}" width="${bw*s}" height="${bd*s}" fill="var(--pn)" stroke="var(--ink)" stroke-width="1.5"/>`;
 Z[fl].forEach(([t,x,y,w,hh,c])=>{const rx=bx+x*bw*s,ry=by+y*bd*s,rw=w*bw*s,rh=hh*bd*s;h+=`<rect x="${rx}" y="${ry}" width="${rw}" height="${rh}" fill="var(--z${c})" stroke="var(--ink)" stroke-width=".6"/>`;
  const wrap=(fs)=>{const mc=Math.max(4,Math.floor((rw-8)/(fs*.62))),L=[];let cur='';t.split(' ').forEach(wd=>{if(wd==='&'||wd==='+'){cur+=(cur?' ':'')+wd;return}const n=cur?cur+' '+wd:wd;if(n.length>mc&&cur){L.push(cur);cur=wd}else cur=n});if(cur)L.push(cur);return L};
  let fs=8,L=wrap(fs);while((L.length*fs*1.25>rh-6||L.some(l=>l.length*fs*.62>rw-6))&&fs>5){fs-=.5;L=wrap(fs)}
  const ar=Math.round(rw/s*rh/s),sh=ar>0&&L.length*fs*1.25+fs*1.3<=rh-4,n=L.length+(sh?1:0),y0=ry+rh/2-(n*fs*1.25)/2+fs*.95;
  h+=`<text text-anchor="middle" style="font-size:${fs}px">`+L.map((l,i)=>`<tspan x="${rx+rw/2}" y="${y0+i*fs*1.25}">${l}</tspan>`).join('')+(sh?`<tspan x="${rx+rw/2}" y="${y0+L.length*fs*1.25}" style="fill:var(--mut);font-weight:500;font-size:${fs*.88}px">${ar} m²</tspan>`:'')+`</text>`});
 h+=`<text x="160" y="${oy+D*s+11}" text-anchor="middle" style="fill:var(--mut)">Jalan</text><text x="${ox+W*s/2}" y="${oy-5}" text-anchor="middle" style="fill:var(--gold)">${W} m</text><text transform="translate(${ox-4},${oy+D*s/2}) rotate(-90)" text-anchor="middle" style="fill:var(--gold)">${D} m</text>`;
 $('pl').setAttribute('viewBox',`0 0 320 ${D*s+oy+14}`);$('pl').innerHTML=h;
 facade(bw);$('plm').textContent=`Denah skematik lantai ${fl}, lahan ${W} × ${D} m, bangunan ${bw.toFixed(1)} × ${bd.toFixed(1)} m: ruang usaha atau kamar tambahan bisa ditukar saat tahap berikutnya dibangun.`;
 last=`RASIF CONSTRUCTION\nLahan ${W}x${D} m², ${S.fl} lantai, bangunan ${Math.round(gfa)} m²\nEstimasi total ${rp(T)} (T1 ${rp(p1)}, T2 ${rp(p2)}, T3 ${rp(p3)})\nCicilan ${rp(m)}/bulan, skor keberlanjutan ${sc}/100`;
const rows=BR.map(([n,pc,u])=>{const sub=B*pc,vol=u==='m²'?(n==='Pondasi'||n==='Atap'?fp:gfa):1;return{n,u,sub,vol,hs:sub/vol}});
 const extra=[];document.querySelectorAll('[data-p]').forEach((c,ci)=>{if(c.checked){const v=+c.dataset.p*idx;extra.push({i:ci,n:c.closest('label').querySelector('span').childNodes[0].textContent.trim(),u:'Ls',sub:v,vol:1,hs:v})}});
 Q={rows,extra,B,X,T,gfa,fp,bw,bd,W,D,p1,p2,p3,m,loan,sc,idx,dp:+$('dp').value,tn:+$('tn').value,prov:$('pv').value,gaya:SN[S.st],spek:SPN(S.sp),hm2:S.sp*S.st*idx};
 $('sbt').textContent=rp(T);$('sbc').textContent='Cicilan '+rp(m)+' / bulan';renderRab();renderChecks();renderTp();renderSched();renderRent();renderBiz();renderCmp();renderBoq();renderRange();renderMx();renderOut();renderClimate();
}
document.querySelectorAll('.seg[data-k]').forEach(g=>g.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;g.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');S[g.dataset.k]=+b.dataset.v;calc()}));
$('ft').addEventListener('click',e=>{const b=e.target.closest('button');if(b){fl=+b.dataset.v;calc()}});
$('in').addEventListener('input',calc);
$('cp').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(last);$('cp').textContent='Tersalin'}catch(e){$('cp').textContent='Salin manual dari layar'}setTimeout(()=>$('cp').textContent='Salin ringkasan untuk konsultasi',2000)});
let Q=null;
const rpf=n=>'Rp '+Math.round(n).toLocaleString('id-ID'),nf=v=>v.toLocaleString('id-ID',{maximumFractionDigits:1});
const COL=['#C9A24B','#E4CD8E','#8FA3C4','#5B7BA6','#3C5D8A','#274568','#0B1F3A','#B8863A','#D9B76A','#6C8CB0','#456A94','#A8925A','#7D8FA8','#2E7D5B','#9C6B3F','#4F9A5B','#6B5B95','#C0664A'];
function renderRab(){
 const q=Q,all=[...q.rows,...q.extra],pc=v=>(v/q.T*100).toFixed(1)+'%';
 const tr=r=>`<tr><td>${r.n}</td><td>${nf(r.vol)}</td><td>${r.u}</td><td>${rpf(r.hs)}</td><td>${rpf(r.sub)}</td><td>${pc(r.sub)}</td></tr>`;
 let h=q.rows.map(tr).join('')+`<tr class="st"><td colspan="4">Subtotal pekerjaan bangunan</td><td>${rpf(q.B)}</td><td>${pc(q.B)}</td></tr>`;
 if(q.extra.length)h+=`<tr class="gh"><td colspan="6">Penguat nilai</td></tr>`+q.extra.map(tr).join('')+`<tr class="st"><td colspan="4">Subtotal penguat nilai</td><td>${rpf(q.X)}</td><td>${pc(q.X)}</td></tr>`;
 h+=`<tr class="gt"><td colspan="4">GRAND TOTAL</td><td>${rpf(q.T)}</td><td>100%</td></tr>`;
 $('rabB').innerHTML=h;
 $('rabm').textContent=`${rpf(q.hm2)}/m² · bangunan ${nf(q.gfa)} m² · indeks wilayah ×${q.idx.toFixed(2)} (${q.prov})`;
 let c=0,g=all.map((r,i)=>{const a=c;c+=r.sub/q.T*100;return `${COL[i%COL.length]} ${a}% ${c}%`});
 $('donut').style.background=`conic-gradient(${g.join(',')})`;
 $('lg').innerHTML=all.map((r,i)=>`<li><i style="background:${COL[i%COL.length]}"></i>${r.n}<span>${pc(r.sub)}</span></li>`).join('');
 $('ks').innerHTML=`<h3>Ringkasan rencana Anda</h3><dl class="sm"><dt>Lahan</dt><dd>${q.W} × ${q.D} m</dd><dt>Bangunan</dt><dd>${S.fl} lantai · ${nf(q.gfa)} m²</dd><dt>Gaya</dt><dd>${q.gaya} · ${q.spek}</dd><dt>Estimasi total</dt><dd>${rpf(q.T)}</dd><dt>Cicilan</dt><dd>${rpf(q.m)} / bulan</dd></dl><ul class="ls"><li>Diskusi denah dan gaya yang paling cocok</li><li>Penyesuaian anggaran dan spesifikasi</li><li>Rencana pembangunan bertahap</li><li>Langkah dan jadwal berikutnya</li></ul>`;
}
$('kf').querySelector('[type=date]').min=new Date().toISOString().slice(0,10);
$('kf').addEventListener('submit',e=>{
 e.preventDefault();const d=new FormData(e.target),ok=$('kok');
 const tgl=new Date(d.get('tgl')+'T00:00').toLocaleDateString('id-ID',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
 const msg=['Halo RASIF Construction, saya ingin konsultasi rumah.','',`Nama: ${d.get('nama')}`,`WhatsApp: ${d.get('wa')}`,d.get('email')?`Email: ${d.get('email')}`:null,`Lokasi lahan: ${d.get('lokasi')}`,`Jadwal: ${tgl}, ${d.get('jam')}`,d.get('cat')?`Catatan: ${d.get('cat')}`:null,'',`Rencana saya:`,`- Lahan ${Q.W} x ${Q.D} m, ${S.fl} lantai (${nf(Q.gfa)} m2)`,`- Gaya ${Q.gaya}, spesifikasi ${Q.spek}`,`- Estimasi total ${rpf(Q.T)}`,`- Cicilan ${rpf(Q.m)}/bulan (DP ${Math.round(Q.dp*100)}%, ${Q.tn} tahun)`,`- Durasi bangun sekitar ${Q.sched.build} bulan`,/^https?:/.test(location.href)?`Link konfigurasi: ${cfgLink()}`:null].filter(l=>l!==null).join('\n');
 const kode=(()=>{try{const o={W:Q.W,D:Q.D,fl:S.fl,g:Q.gaya,s:Q.spek,b:Math.round(Q.gfa),T:Math.round(Q.T),m:Math.round(Q.m),d:Q.sched.build};const by=new TextEncoder().encode(JSON.stringify(o));let t='';by.forEach(x=>t+=String.fromCharCode(x));return 'RC1.'+btoa(t).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}catch(e){return ''}})();
 try{const ib=JSON.parse(localStorage.getItem('rc_inbox')||'[]');ib.push({id:'w'+Date.now().toString(36),nama:d.get('nama'),wa:d.get('wa'),lokasi:d.get('lokasi'),jadwal:tgl+', '+d.get('jam'),est:rpf(Q.T),cat:d.get('cat')||'',kode,status:'Baru',created:new Date().toISOString().slice(0,10)});localStorage.setItem('rc_inbox',JSON.stringify(ib))}catch(e){}
 const url='https://wa.me/6282230091014?text='+encodeURIComponent(msg+(kode?'\n\nKode RASIF: '+kode:''));
 ok.innerHTML='<h3>Menghubungkan ke WhatsApp</h3><p class="mut" style="font-size:13px;margin:6px 0 12px"></p><dl class="sm"></dl><div class="acts" style="margin-top:14px"><a class="btn" id="kwa" target="_blank" rel="noopener">Buka WhatsApp</a><button class="btn alt" type="button" id="kre">Ubah data</button></div>';
 ok.querySelector('p').textContent=`Terima kasih, ${d.get('nama')}. Pesan konsultasi Anda sudah siap di WhatsApp ke 0822-3009-1014. Tekan kirim di WhatsApp untuk mengonfirmasi. Jika WhatsApp tidak terbuka otomatis, tekan tombol di bawah.`;
 const dl=ok.querySelector('dl');[['Jadwal',`${tgl}, ${d.get('jam')}`],['Lokasi lahan',d.get('lokasi')],['Estimasi total',rpf(Q.T)]].forEach(([k,v])=>{const a=document.createElement('dt'),b=document.createElement('dd');a.textContent=k;b.textContent=v;dl.append(a,b)});
 $('kwa').href=url;
 $('kf').hidden=true;$('ks').hidden=true;ok.hidden=false;ok.scrollIntoView({behavior:'smooth',block:'center'});
 {const l=document.createElement('a');l.href=url;l.target='_blank';l.rel='noopener noreferrer';document.body.appendChild(l);l.click();l.remove()}
 $('kre').onclick=()=>{$('kf').hidden=false;$('ks').hidden=false;ok.hidden=true};
});
$('fn').addEventListener('click',e=>{const b=e.target.closest('[data-af]');if(!b)return;S.fl=+b.dataset.af;S.sp=+b.dataset.asp;document.querySelectorAll('.seg[data-k=fl] button').forEach(x=>x.classList.toggle('on',+x.dataset.v===S.fl));document.querySelectorAll('.seg[data-k=sp] button').forEach(x=>x.classList.toggle('on',+x.dataset.v===S.sp));calc()});
function renderChecks(){
 const q=Q,land=q.W*q.D,kdbL=+$('kdb').value,klbL=+$('klb').value,gKdb=q.fp/land,gKlb=q.gfa/land,hijau=1-gKdb,bw=Math.max(q.W-3,4);
 const ok=(t,d)=>`<li class="ck-ok"><i></i><div><b>${t}</b><span>${d}</span></div></li>`,wr=(t,d)=>`<li class="ck-w"><i></i><div><b>${t}</b><span>${d}</span></div></li>`;
 const pct=v=>(v*100).toFixed(0)+'%',fx=v=>v.toFixed(2).replace('.',',');
 const perFl=q.fp,maxFl=Math.max(1,Math.floor(klbL/gKdb+1e-9)),L=[];
 L.push(gKdb<=kdbL+1e-6?ok('KDB '+pct(gKdb)+' dari maks. '+pct(kdbL),'Bangunan menyesuaikan batas KDB. Tapak '+nf(q.fp)+' m² dari lahan '+land+' m².'):wr('KDB melebihi batas','Tapak '+pct(gKdb)+' > '+pct(kdbL)+'.'));
 L.push(gKlb<=klbL+1e-6?ok('KLB '+fx(gKlb)+' dari maks. '+fx(klbL),'Total luas lantai '+nf(q.gfa)+' m² masih dalam batas.'):wr('KLB melebihi batas ('+fx(gKlb)+' > '+fx(klbL)+')','Dengan KDB ini, maksimal '+maxFl+' lantai. Kurangi lantai atau perbesar lahan.'));
 L.push(hijau>=.2?ok('Ruang hijau '+pct(hijau),'Memenuhi acuan KDH minimal 20%.'):wr('Ruang hijau '+pct(hijau),'Di bawah acuan KDH 20%, turunkan KDB.'));
 L.push(perFl>=36?ok('Luas per lantai '+nf(perFl)+' m²','Cukup untuk ruang inti dan tangga.'):wr('Luas per lantai '+nf(perFl)+' m²','Sempit, kurang dari 36 m². Perbesar lahan atau naikkan KDB.'));
 if(S.fl===3)L.push(bw>=6&&land>=150?ok('Rumah 3 lantai','Lebar bangunan '+nf(bw)+' m cukup untuk tangga dan ruang.'):wr('Rumah 3 lantai kurang ideal','Disarankan lebar bangunan ≥ 6 m dan lahan ≥ 150 m².'));
 $('rlb').innerHTML='<ul class="cl">'+L.join('')+'</ul><p class="mut" style="margin-top:10px">Asumsi sempadan: depan 3 m, samping 1,5 m, belakang 4 m. Ini pengecekan awal, bukan pengganti RDTR/PBG.</p>';
 const inc=+$('inc').value||0,r=RATE()/12,n=q.tn*12,mMax=inc*.35,loanMax=mMax*(1-Math.pow(1+r,-n))/r,bud=loanMax/(1-q.dp),need=q.m/.35;
 let h='';
 if(!inc){h='<p class="mut">Isi penghasilan rumah tangga per bulan di panel pengaturan untuk melihat batas anggaran yang aman.</p><dl class="sm"><dt>Cicilan estimasi</dt><dd>'+rpf(q.m)+' / bulan</dd><dt>Penghasilan disarankan</dt><dd>'+rpf(need)+' / bulan</dd></dl>'}
 else{
  const aman=q.T<=bud,gap=q.T-bud,pr=Math.min(100,bud/q.T*100);
  h=`<div class="vd ${aman?'v-ok':'v-w'}"><b>${aman?'Anggaran aman':'Melebihi batas aman'}</b><span>${aman?'Estimasi total masih dalam kemampuan cicilan Anda.':'Estimasi melebihi batas aman sekitar '+rpf(gap)+'.'}</span></div>
  <dl class="sm"><dt>Cicilan maks. (35%)</dt><dd>${rpf(mMax)} / bulan</dd><dt>Pinjaman maks.</dt><dd>${rpf(loanMax)}</dd><dt>Anggaran aman total</dt><dd>${rpf(bud)}</dd><dt>Estimasi Anda</dt><dd>${rpf(q.T)}</dd></dl><div class="sc"><i style="width:${pr}%"></i></div>`;
  const alt=[];[1,2,3].forEach(f=>[6500000,8500000,11500000].forEach(sp=>{const T=q.fp*f*sp*S.st*q.idx+q.X;alt.push({f,sp,T,fit:T<=bud})}));
  h+='<p class="mut" style="margin:12px 0 6px;font-weight:600">Opsi yang sesuai dengan gaya dan penguat nilai Anda</p><div class="alts">'+alt.map(a=>`<button type="button" data-af="${a.f}" data-asp="${a.sp}" class="${a.fit?'fit':'nofit'}${a.f===S.fl&&a.sp===S.sp?' cur':''}"><b>${a.f} lt · ${SPN(a.sp)}</b>${rpf(a.T)}<em>${a.fit?'Sesuai':'Melebihi'}</em></button>`).join('')+'</div><p class="mut" style="margin-top:6px">Klik salah satu opsi untuk menerapkannya.</p>';
  if(!aman){const t=q.p1;h+=`<p class="mut" style="margin-top:12px">${bud>=q.p1?'Anggaran aman cukup untuk Tahap 1 ('+rpf(q.p1)+'). Bangun bertahap, Tahap 2 menyusul.':'Anggaran aman belum cukup untuk Tahap 1 ('+rpf(q.p1)+'). Pertimbangkan DP lebih besar, tenor lebih panjang, atau spesifikasi yang lebih ringan.'}</p>`}
 }
 $('fnb').innerHTML=h;
}
const MN=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
function planSched(){
 const q=Q,cu=$('cu').checked,M=Math.max(4,Math.round(q.gfa/25)),gap=+$('rj').value||0,rs=$('rs').value,ds=stageDesc(),cs=[q.p1,q.p2,q.p3];
 const lab=i=>{if(rs){const [y,m]=rs.split('-').map(Number),d=new Date(y,m-1+i,1);return MN[d.getMonth()]+' '+d.getFullYear()}return 'Bln '+(i+1)};
 let dur;
 if(!cu){const d1=Math.max(2,Math.round(M*.55)),d2=Math.max(2,M-d1),d3=q.extra.length?Math.min(3,Math.max(1,Math.ceil(q.extra.length*.8))):0;dur=[d1,d2,d3]}
 else{const tot=cs.reduce((x,y)=>x+y,0)||1;dur=cs.map(c=>c>0?Math.max(1,Math.round(M*c/tot)):0)}
 let t=0;const st=[];
 [0,1,2].forEach(i=>{if(!dur[i])return;if(i===1&&t>0)t+=gap;st.push({n:'Tahap '+(i+1),ds:ds[i],s:t,e:t+dur[i],cost:cs[i]});t+=dur[i]});
 st.forEach(x=>{x.dur=x.e-x.s;x.term=[.3,.4,.3].map(v=>x.cost*v)});
 return{st,total:st[st.length-1].e,gap,lab,build:dur.reduce((x,y)=>x+y,0)};
}
function renderSched(){
 const sc=Q.sched=planSched(),N=sc.total,step=N<=12?1:N<=24?2:N<=36?3:6;
 const ax=`<div class="gr"><div class="gl"></div><div class="gk gax" style="grid-template-columns:repeat(${N},1fr)">`+[...Array(N)].map((_,i)=>`<span>${i%step===0?sc.lab(i):''}</span>`).join('')+'</div></div>';
 const rows=sc.st.map(t=>`<div class="gr"><div class="gl"><b>${t.n}</b><small>${t.ds}</small></div><div class="gk" style="grid-template-columns:repeat(${N},1fr);--n:${N}"><i style="grid-column:${t.s+1}/${t.e+1}" title="${sc.lab(t.s)} - ${sc.lab(t.e-1)}">${t.dur} bln</i></div></div>`).join('');
 const tb=sc.st.map(t=>`<tr><td>${t.n}</td><td>${sc.lab(t.s)} – ${sc.lab(t.e-1)}</td><td>${t.dur} bln</td><td>${rp(t.term[0])}</td><td>${rp(t.term[1])}</td><td>${rp(t.term[2])}</td><td><b>${rp(t.cost)}</b></td></tr>`).join('');
 $('schb').innerHTML=`<p class="mut">Durasi membangun sekitar ${sc.build} bulan${sc.gap?`, dengan jeda ${sc.gap} bulan sebelum Tahap 2`:''}. Perkiraan selesai: <b>${sc.lab(sc.total-1)}</b>${$('rs').value?'':' (isi bulan mulai di panel pengaturan untuk tanggal)'}.</p><div class="gtt">${ax}${rows}</div>
 <div class="tw" style="margin-top:12px"><table class="rt" style="min-width:560px"><thead><tr><th>Tahap</th><th>Periode</th><th>Durasi</th><th>Termin 1 (30%)</th><th>Termin 2 (40%)</th><th>Termin 3 (30%)</th><th>Total</th></tr></thead><tbody>${tb}</tbody></table></div>
 <p class="mut" style="margin-top:8px">Termin usulan: 30% saat mulai, 40% saat progres sekitar 50%, 30% saat serah terima tiap tahap. Cicilan KPR berjalan sejak akad, terpisah dari termin. Durasi dan termin final mengikuti kontrak.</p>`;
}
function renderRent(){
 const q=Q,u=+$('ru').value,tr=+$('rt').value||0,oc=+$('ro').value,area=16,per=area*q.hm2,add=u*per,gross=u*tr*oc,net=gross*.9,r=RATE()/12,n=q.tn*12;
 const pm=v=>v*(1-q.dp)*r/(1-Math.pow(1+r,-n)),m2=pm(q.T+add),cov=m2?Math.min(100,net/m2*100):0,eff=Math.max(0,m2-net),yrs=net>0?add/net/12:0;
 Q.rent={u,tr,oc,add,net,m2,cov,eff,yrs};
 if(!u){$('rcb').innerHTML='<p class="mut">Pilih jumlah kamar kos untuk melihat berapa cicilan yang tertutup dari pendapatan sewa.</p>';return}
 const self=net>=m2-q.m;
 $('rcb').innerHTML=`<div class="vd ${self?'v-ok':'v-w'}"><b>Sewa menutup ${cov.toFixed(0)}% cicilan</b><span>${self?'Pendapatan sewa lebih besar dari tambahan cicilan unit ini, jadi unit menutup biayanya sendiri.':'Pendapatan sewa belum menutup tambahan cicilan unit. Naikkan tarif atau hunian, atau kurangi unit.'}</span></div>
 <dl class="sm"><dt>Kamar kos (±${area} m² per kamar)</dt><dd>${u} kamar</dd><dt>Tambahan biaya bangun</dt><dd>${rpf(add)}</dd><dt>Pendapatan bersih / bulan</dt><dd>${rpf(net)}</dd><dt>Cicilan setelah unit ditambah</dt><dd>${rpf(m2)} / bulan</dd><dt>Cicilan efektif setelah sewa</dt><dd>${rpf(eff)} / bulan</dd><dt>Balik modal unit</dt><dd>${net>0?yrs.toFixed(1).replace('.',',')+' tahun':'-'}</dd></dl><div class="sc"><i style="width:${cov}%"></i></div>
 <p class="mut" style="margin-top:8px">Asumsi: biaya pengelolaan 10% dari pendapatan, biaya per m² sama dengan rumah utama, suku bunga sesuai pilihan. Tarif pasar dan izin usaha atau kos berbeda tiap lokasi.</p>`;
}
function renderBiz(){
 const q=Q,a=+$('ua').value||0,tr=+$('ut').value||0,oc=+$('uo').value,add=a*q.hm2,net=a*tr*oc*.9,r=RATE()/12,n=q.tn*12;
 const pm=v=>v*(1-q.dp)*r/(1-Math.pow(1+r,-n)),m2=pm(q.T+add),cov=m2?Math.min(100,net/m2*100):0,eff=Math.max(0,m2-net),yrs=net>0?add/net/12:0;
 Q.biz={a,tr,oc,add,net,m2,cov,eff,yrs};
 if(!a){$('ucb').innerHTML='<p class="mut">Isi luas ruang usaha untuk melihat berapa cicilan yang tertutup dari pendapatan sewa.</p>';return}
 const self=net>=m2-q.m,k=q.rent||{u:0,add:0,net:0};let both='';
 if(k.u>0){const addB=add+k.add,netB=net+k.net,m3=pm(q.T+addB),c3=m3?Math.min(100,netB/m3*100):0;both=`<p class="mut" style="margin-top:10px"><b style="color:var(--ink)">Jika kos dan ruang usaha dibangun bersamaan:</b> tambahan biaya ${rpf(addB)}, pendapatan sewa bersih ${rpf(netB)} / bulan, menutup ${c3.toFixed(0)}% dari cicilan ${rpf(m3)} / bulan.</p>`}
 $('ucb').innerHTML=`<div class="vd ${self?'v-ok':'v-w'}"><b>Sewa menutup ${cov.toFixed(0)}% cicilan</b><span>${self?'Pendapatan sewa lebih besar dari tambahan cicilan ruang usaha ini, jadi menutup biayanya sendiri.':'Pendapatan sewa belum menutup tambahan cicilan ruang usaha. Naikkan tarif atau tingkat terisi, atau kecilkan luasnya.'}</span></div>
 <dl class="sm"><dt>Luas ruang usaha</dt><dd>${nf(a)} m\u00b2</dd><dt>Tambahan biaya bangun</dt><dd>${rpf(add)}</dd><dt>Pendapatan bersih / bulan</dt><dd>${rpf(net)}</dd><dt>Cicilan setelah ruang usaha ditambah</dt><dd>${rpf(m2)} / bulan</dd><dt>Cicilan efektif setelah sewa</dt><dd>${rpf(eff)} / bulan</dd><dt>Balik modal ruang usaha</dt><dd>${net>0?yrs.toFixed(1).replace('.',',')+' tahun':'-'}</dd></dl><div class="sc"><i style="width:${cov}%"></i></div>${both}
 <p class="mut" style="margin-top:8px">Asumsi: biaya pengelolaan 10% dari pendapatan, biaya per m\u00b2 sama dengan rumah utama. Tarif sewa dan izin usaha berbeda tiap lokasi.</p>`;
}
$('rc').addEventListener('input',()=>{if(Q){renderRent();renderBiz()}});
$('uc').addEventListener('input',()=>{if(Q)renderBiz()});

function renderRange(){
 const T=Q.T;
 $('rng').innerHTML=`<span>Rentang estimasi (±15%)</span> <b>${rpf(T*.85)} – ${rpf(T*1.15)}</b><div class="rbar"><i></i><u></u></div><span>Bisa bergeser karena kondisi tanah dan pondasi, harga material saat kontrak, dan perubahan desain.</span>`;
}
let TA=[1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3];
function stageCosts(B,idx){
 const ex=[...document.querySelectorAll('[data-p]')].map(c=>c.checked?+c.dataset.p*idx:0),X=ex.reduce((a,b)=>a+b,0);
 if(!$('cu').checked){const p1=B*(S.fl>1?.5:.7);return[p1,B-p1,X]}
 const cs=[0,0,0];BR.forEach(([n,pc],i)=>{cs[TA[i]-1]+=B*pc});ex.forEach((v,i)=>{if(v)cs[TA[BR.length+i]-1]+=v});return cs;
}
function stageDesc(){
 if(!$('cu').checked)return[S.fl>1?'Struktur & lantai dasar':'Struktur & cangkang',S.fl>1?'Lantai atas & finishing':'Finishing & interior','Energi, air, taman'];
 const nm=[[],[],[]];BR.forEach(([n],i)=>nm[TA[i]-1].push(n));
 document.querySelectorAll('[data-p]').forEach((c,i)=>{if(c.checked)nm[TA[BR.length+i]-1].push(c.closest('label').querySelector('span').childNodes[0].textContent.trim())});
 return nm.map(a=>a.length?a.slice(0,2).join(', ')+(a.length>2?', dst':''):'Tidak ada item');
}
function renderTp(){
 if(!$('cu').checked){$('tpb').innerHTML='';return}
 const q=Q,sel=(i)=>`<select data-ti="${i}" aria-label="Tahap">${[1,2,3].map(v=>`<option value="${v}"${TA[i]===v?' selected':''}>Tahap ${v}</option>`).join('')}</select>`;
 const tr=(n,sub,i)=>`<tr><td>${n}</td><td>${rpf(sub)}</td><td>${sel(i)}</td></tr>`;
 const body=q.rows.map((r,i)=>tr(r.n,r.sub,i)).join('')+q.extra.map(e=>tr(e.n,e.sub,BR.length+e.i)).join('');
 $('tpb').innerHTML=`<div class="tw" style="margin-top:10px"><table class="rt" style="min-width:420px"><thead><tr><th>Item pekerjaan</th><th>Subtotal</th><th>Masuk tahap</th></tr></thead><tbody>${body}</tbody></table></div><p class="mut" style="margin-top:8px">Total per tahap: Tahap 1 ${rpf(q.p1)}, Tahap 2 ${rpf(q.p2)}, Tahap 3 ${rpf(q.p3)}. Pastikan urutan masuk akal secara teknis (struktur dahulu), dan konfirmasikan saat konsultasi.</p>`;
}
$('tp').addEventListener('change',e=>{const el=e.target;if(el.id==='cu'){calc();return}if(el.dataset.ti!==undefined){TA[+el.dataset.ti]=+el.value;calc()}});
function renderMx(){
 const q=Q,r=RATE()/12;let h='<p class="mut" style="margin:14px 0 6px;font-weight:600">Pilih skema lain</p><div class="mx"><span></span>'+[10,15,20].map(t=>`<em>${t} tahun</em>`).join('');
 [.2,.3,.4].forEach(dp=>{h+=`<em>DP ${Math.round(dp*100)}%</em>`;[10,15,20].forEach(t=>{const n=t*12,m=q.T*(1-dp)*r/(1-Math.pow(1+r,-n)),cur=Math.abs(dp-q.dp)<1e-9&&t===q.tn;h+=`<button type="button" data-dp="${String(dp).replace('0.','.')}" data-tn="${t}" class="${cur?'on':''}">${(m/1e6).toFixed(1).replace('.',',')} jt</button>`})});
 $('mx').innerHTML=h+'</div>';
}
$('mx').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;$('dp').value=b.dataset.dp;$('tn').value=b.dataset.tn;calc()});

const OX=[['Desain dan gambar kerja','4% dari biaya konstruksi',q=>q.T*.04],['Perizinan PBG dan SLF','Rp 75.000/m² luas bangunan',q=>q.gfa*75000],['Pengawasan (manajemen konstruksi)','2,5% dari biaya konstruksi',q=>q.T*.025],['Dana cadangan (kontingensi)','5% dari biaya konstruksi',q=>q.T*.05],['Biaya KPR (provisi, asuransi, appraisal)','3% dari pinjaman',q=>q.loan*.03]];
let OXS=[1,1,1,1,1];
function renderOut(){
 const q=Q;q.out=OX.map((o,i)=>({n:o[0],b:o[1],on:!!OXS[i],v:OXS[i]?o[2](q):0}));
 const O=q.out.reduce((a,x)=>a+x.v,0),tot=q.T+O,cash=q.T*q.dp+[0,1,4].reduce((a,i)=>a+q.out[i].v,0);
 q.outT={O,tot,cash};
 $('oxb').innerHTML=`<div class="tw"><table class="rt" style="min-width:440px"><thead><tr><th>Item</th><th>Dasar hitung</th><th>Perkiraan</th><th>Ikut</th></tr></thead><tbody>${q.out.map((x,i)=>`<tr><td>${x.n}</td><td style="text-align:left;white-space:normal">${x.b}</td><td>${x.on?rpf(x.v):'-'}</td><td><input type="checkbox" data-o="${i}" aria-label="Ikutkan ${x.n}"${x.on?' checked':''}></td></tr>`).join('')}</tbody></table></div>
 <dl class="sm" style="margin-top:12px"><dt>Biaya konstruksi (estimasi)</dt><dd>${rpf(q.T)}</dd><dt>Biaya di luar RAB</dt><dd>${rpf(O)}</dd><dt><b>Total kebutuhan dana</b></dt><dd><b>${rpf(tot)}</b></dd><dt>Dana tunai awal (DP, desain, perizinan, biaya KPR)</dt><dd>${rpf(cash)}</dd></dl><p class="mut" style="margin-top:8px">Persentase adalah asumsi umum dan bisa berbeda tiap proyek dan kota.</p>`;
}
$('ox').addEventListener('change',e=>{const el=e.target;if(el.dataset.o!==undefined){OXS[+el.dataset.o]=el.checked?1:0;renderOut()}});

const DR=['Utara','Timur','Selatan','Barat'],OPP={Utara:'Selatan',Selatan:'Utara',Timur:'Barat',Barat:'Timur'},LR={Selatan:['Barat','Timur'],Utara:['Timur','Barat'],Timur:['Selatan','Utara'],Barat:['Utara','Selatan']};
const EXP={Barat:['Tinggi','Panas sore, paling terik','b'],Timur:['Sedang','Cahaya pagi, lembut','m'],Utara:['Rendah','Teduh sepanjang tahun','l'],Selatan:['Rendah','Teduh sepanjang tahun','l']};
const ADV={Barat:'Kurangi bukaan kaca, pakai secondary skin dan overhang dalam, tanam pohon peneduh. Cocok untuk dapur, garasi, tangga, dan kamar mandi.',Timur:'Cocok untuk kamar tidur dan ruang sarapan karena cahaya pagi. Tetap beri overhang agar tidak silau.',Utara:'Cahaya stabil, cocok untuk bukaan lebar pada ruang keluarga.',Selatan:'Teduh, cocok untuk bukaan lebar pada ruang keluarga dan ruang kerja.'};
function renderClimate(){
 const f=$('ah').value,[l,r]=LR[f],sides=[['Depan (sisi jalan)',f],['Belakang',OPP[f]],['Samping kiri',l],['Samping kanan',r]];
 const west=sides.find(x=>x[1]==='Barat'),ss=document.querySelectorAll('[data-p]')[2],has=ss&&ss.checked,cost=55e6*Q.idx;
 Q.clim={sides,west:west[0]};
 $('clb').innerHTML=`<p class="mut">Matahari bergerak dari timur ke barat, jadi sisi barat paling panas pada sore hari. Dengan lahan menghadap ${f.toLowerCase()}, sisi <b>${west[0].toLowerCase()}</b> menghadap barat.</p>
 <div class="tw" style="margin-top:10px"><table class="rt" style="min-width:520px"><thead><tr><th>Sisi bangunan</th><th>Arah</th><th>Paparan matahari</th><th>Saran</th></tr></thead><tbody>${sides.map(x=>`<tr><td>${x[0]}</td><td><b>${x[1]}</b></td><td><span class="chip ${EXP[x[1]][2]==='b'?'c-w':EXP[x[1]][2]==='m'?'c-b':'c-s'}">${EXP[x[1]][0]}</span><br><span class="mut">${EXP[x[1]][1]}</span></td><td style="text-align:left;white-space:normal">${ADV[x[1]]}</td></tr>`).join('')}</tbody></table></div>
 <div class="vd ${has?'v-ok':'v-w'}" style="margin-top:12px"><b>${has?'Secondary skin sudah dipilih':'Pertimbangkan secondary skin dan ventilasi silang'}</b><span>${has?'Sisi barat terlindungi dan udara bisa mengalir, sehingga rumah lebih sejuk dan hemat pendingin ruangan.':`Sisi ${west[0].toLowerCase()} menghadap barat dan menerima panas sore. Penguat nilai ini (sekitar ${rp(cost)}) membantu menekan panas dan menaikkan skor keberlanjutan.`}</span>${has?'':'<button class="btn alt" type="button" id="ads" style="margin-top:8px;padding:8px 14px">Tambahkan ke rencana</button>'}</div>
 <p class="mut" style="margin-top:8px">Saran umum untuk iklim tropis. Arah angin dominan dan bayangan bangunan sekitar perlu dicek langsung di lokasi.</p>`;
 const b=$('ads');if(b)b.onclick=()=>{ss.checked=true;calc()};
}

let SNAP=null;
function snapNow(){const q=Q;return{fl:S.fl,gaya:q.gaya,spek:q.spek,gfa:q.gfa,T:q.T,p1:q.p1,m:q.m,need:q.m/.35,sc:q.sc,build:q.sched.build,X:q.X}}
function renderCmp(){
 const c=snapNow(),a=SNAP;$('cc').hidden=!a;
 if(!a){$('cmb').innerHTML='<p class="mut">Atur konfigurasi, tekan simpan, lalu ubah pilihan (misalnya lantai atau spesifikasi) untuk melihat selisih biaya, cicilan, dan skor.</p>';return}
 const d=(x,y,f,mode)=>{const v=y-x;if(Math.abs(v)<1e-6)return '<td class="df dn">–</td>';const cls=mode==='neu'?'dn':((mode==='low'?v<0:v>0)?'dg':'db');return `<td class="df ${cls}">${v>0?'+':'−'}${f(Math.abs(v))}</td>`};
 const rows=[
  ['Konfigurasi',`${a.fl} lt, ${a.gaya}, ${a.spek}`,`${c.fl} lt, ${c.gaya}, ${c.spek}`,'<td class="df"></td>'],
  ['Luas bangunan',nf(a.gfa)+' m²',nf(c.gfa)+' m²',d(a.gfa,c.gfa,v=>nf(v)+' m²','neu')],
  ['Penguat nilai',rpf(a.X),rpf(c.X),d(a.X,c.X,rpf,'neu')],
  ['Estimasi total',rpf(a.T),rpf(c.T),d(a.T,c.T,rpf,'low')],
  ['Biaya Tahap 1',rpf(a.p1),rpf(c.p1),d(a.p1,c.p1,rpf,'low')],
  ['Cicilan / bulan',rpf(a.m),rpf(c.m),d(a.m,c.m,rpf,'low')],
  ['Penghasilan disarankan',rpf(a.need),rpf(c.need),d(a.need,c.need,rpf,'low')],
  ['Durasi bangun',a.build+' bln',c.build+' bln',d(a.build,c.build,v=>v+' bln','low')],
  ['Skor keberlanjutan',a.sc+'/100',c.sc+'/100',d(a.sc,c.sc,v=>v,'high')]];
 $('cmb').innerHTML=`<div class="tw"><table class="rt" style="min-width:560px"><thead><tr><th>Item</th><th>Skenario A (tersimpan)</th><th>Skenario sekarang</th><th>Selisih</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td>${r[3]}</tr>`).join('')}</tbody></table></div><p class="mut" style="margin-top:8px">Hijau berarti lebih baik bagi klien (biaya atau cicilan turun, skor naik).</p>`;
}
$('cs').addEventListener('click',()=>{SNAP=snapNow();renderCmp()});
$('cc').addEventListener('click',()=>{SNAP=null;renderCmp()});
function boqList(){
 const q=Q,g=q.gfa,f=S.fl,roof=q.fp*1.3;
 return[['Semen 50 kg',g*(2.6+.3*(f-1)),'zak','Struktur, dinding, plesteran'],['Pasir',g*.4,'m³','Beton dan adukan'],['Batu split / kerikil',g*.25,'m³','Beton struktur'],['Besi beton',g*(38+6*(f-1)),'kg','Pondasi, kolom, balok, pelat'],['Bata ringan',g*.12,'m³','Dinding'],['Keramik / granit lantai',g*.95,'m²','Lantai area dalam'],['Penutup atap dan rangka',roof,'m²','Baja ringan dan penutup'],['Cat dinding',g*.6,'liter','Dua lapis, dalam dan luar'],['Pintu',Math.ceil(g/20),'unit','Termasuk kamar mandi'],['Jendela / bukaan',Math.ceil(g/15),'unit','Kusen dan kaca'],['Kabel listrik',g*2.5,'m','Instalasi standar'],['Titik lampu dan stop kontak',Math.ceil(g/3),'titik','Perkiraan'],['Pipa air bersih dan kotor',g*1.2,'m','Instalasi plumbing']];
}
function renderBoq(){
 const L=boqList(),fm=v=>Math.round(v).toLocaleString('id-ID');
 $('boqb').innerHTML=`<p class="mut">Perkiraan kasar dari angka umum per m², untuk membantu klien mengecek kewajaran RAB. Bukan hitungan struktur.</p><details><summary>Lihat daftar material</summary><div class="tw" style="margin-top:10px"><table class="rt" style="min-width:560px"><thead><tr><th>Material</th><th>Perkiraan</th><th>Rentang ±15%</th><th>Satuan</th><th>Keterangan</th></tr></thead><tbody>${L.map(r=>`<tr><td>${r[0]}</td><td><b>${fm(r[1])}</b></td><td>${fm(r[1]*.85)} – ${fm(r[1]*1.15)}</td><td>${r[2]}</td><td style="text-align:left;white-space:normal">${r[3]}</td></tr>`).join('')}</tbody></table></div><p class="mut" style="margin-top:8px">Belum termasuk sisa material (waste) 5–10%. Kebutuhan final dihitung ulang dari gambar kerja.</p></details>`;
}

const ZC={1:[234,238,245],2:[243,235,214],3:[221,235,227]};
async function makePdf(){
 const q=Q,sc=q.sched,rn=q.rent,doc=new window.jspdf.jsPDF({unit:'mm',format:'a4'});
 const NV=[11,31,58],GD=[184,146,58],A=t=>String(t).replace(/²/g,'2').replace(/[–—·]/g,'-').replace(/≥/g,'>=').replace(/³/g,'3').replace(/±/g,'+/-');
 const T=(t,x,y,o)=>doc.text(A(t),x,y,o),R=(t,x,y)=>doc.text(A(t),x,y,{align:'right'});
 const td=new Date(),ds=td.toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}),no='RC-'+td.toISOString().slice(0,10).replace(/-/g,'')+'-'+String(Math.round(q.T/1e6)%1000).padStart(3,'0');
 const lg=$('logo'),lh=14,lw=lh*(lg.naturalWidth||282)/(lg.naturalHeight||260);
 const header=()=>{try{doc.addImage(lg.src,'PNG',14,8,lw,lh)}catch(e){}
  doc.setFont('helvetica','bold');doc.setFontSize(15);doc.setTextColor(...NV);T('RASIF CONSTRUCTION',14+lw+4,15.5);
  doc.setFontSize(7.5);doc.setTextColor(...GD);T('PENAWARAN ESTIMASI RUMAH TUMBUH',14+lw+4,21);
  doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(120);R('No. '+no,196,13);R(ds,196,18);R('Berlaku 30 hari',196,23);
  doc.setDrawColor(...GD);doc.setLineWidth(.6);doc.line(14,28,196,28);return 38};
 let y=header();
 const ensure=h=>{if(y+h>277){doc.addPage();y=header()}};
 const H2=t=>{ensure(14);doc.setFont('helvetica','bold');doc.setFontSize(12);doc.setTextColor(...NV);T(t,14,y);y+=3;doc.setDrawColor(220);doc.setLineWidth(.2);doc.line(14,y,196,y);y+=7};
 // page 1
 doc.setFont('helvetica','bold');doc.setFontSize(17);doc.setTextColor(...NV);T(`Rumah ${q.gaya}, ${S.fl} lantai`,14,y);y+=8;
 const FM={1.06:JIMG,1.03:MIMG,1:TIMG,1.12:CIMG}[S.st],uri=FM&&FM[S.fl];
 if(uri){const ratio=await new Promise(res=>{const im=new Image();im.onload=()=>res(im.naturalHeight/im.naturalWidth);im.onerror=()=>res(.5625);im.src=uri});
  let w=182,h=w*ratio;if(h>100){h=100;w=h/ratio}
  try{doc.addImage(uri,'JPEG',14+(182-w)/2,y,w,h)}catch(e){}y+=h+3;doc.setFont('helvetica','italic');doc.setFontSize(7.5);doc.setTextColor(130);T('Render konsep, bukan gambar kerja.',14,y+1);y+=8}
 doc.setFillColor(243,235,214);doc.roundedRect(14,y,182,29,2,2,'F');
 doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.setTextColor(90);T('Estimasi total biaya',20,y+8);T('Cicilan estimasi / bulan',120,y+8);
 doc.setFont('helvetica','bold');doc.setFontSize(17);doc.setTextColor(...NV);T(rpf(q.T),20,y+18);doc.setFontSize(13);T(rpf(q.m),120,y+18);doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(90);T('Rentang estimasi +/-15%: '+rpf(q.T*.85)+' - '+rpf(q.T*1.15),20,y+25);y+=39;
 doc.setFillColor(251,248,241);doc.setDrawColor(184,146,58);doc.setLineWidth(.4);doc.roundedRect(14,y,182,16,2,2,'FD');doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setTextColor(...NV);T('SEMUA ANGKA DALAM DOKUMEN INI ADALAH ESTIMASI, BUKAN RAB FINAL.',19,y+6.5);doc.setFont('helvetica','normal');doc.setFontSize(8.5);T('Untuk angka FIX, silakan konsultasi langsung: WhatsApp 0822-3009-1014.',19,y+12);y+=22;
 doc.setFontSize(10.5);
 [['Lahan',`${q.W} x ${q.D} m (${q.W*q.D} m2)`],['Bangunan',`${S.fl} lantai, ${nf(q.gfa)} m2 (tapak ${nf(q.fp)} m2)`],['Gaya desain',q.gaya],['Spesifikasi',`${q.spek} (${rpf(q.hm2)}/m2)`],['Provinsi',`${q.prov} (indeks x${q.idx.toFixed(2)})`],['Pembiayaan',`DP ${Math.round(q.dp*100)}% (${rpf(q.T*q.dp)}), tenor ${q.tn} tahun, bunga ${Math.round(RATE()*100)}%`],['Skor keberlanjutan',`${q.sc}/100`],['Perkiraan durasi',`${sc.build} bulan membangun`]]
 .forEach(([k,v])=>{doc.setFont('helvetica','bold');doc.setTextColor(...NV);T(k+':',14,y);doc.setFont('helvetica','normal');doc.setTextColor(30);T(v,62,y);y+=6.5});
 // page 2: RAB
 doc.addPage();y=header();H2('Rincian RAB');
 const head=()=>{doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setFillColor(243,235,214);doc.rect(14,y-4.5,182,7,'F');doc.setTextColor(...NV);T('Item pekerjaan',16,y);T('Vol',104,y);T('Sat',120,y);R('Harga satuan (Rp)',160,y);R('Subtotal (Rp)',194,y);y+=7;doc.setFont('helvetica','normal');doc.setTextColor(20)};
 const row=(r,bold)=>{if(y>272){doc.addPage();y=header();head()}doc.setFontSize(9.5);doc.setFont('helvetica',bold?'bold':'normal');doc.setTextColor(20);T(r.n,16,y);if(!bold){T(nf(r.vol),104,y);T(r.u,120,y);R(Math.round(r.hs).toLocaleString('id-ID'),160,y)}R(Math.round(r.sub).toLocaleString('id-ID'),194,y);y+=6;doc.setDrawColor(228,231,236);doc.setLineWidth(.2);doc.line(14,y-4,196,y-4)};
 head();q.rows.forEach(r=>row(r));row({n:'Subtotal pekerjaan bangunan',sub:q.B},1);
 if(q.extra.length){y+=2;doc.setFont('helvetica','bold');doc.setFontSize(9.5);doc.setTextColor(...GD);T('Penguat nilai',16,y);y+=6;q.extra.forEach(r=>row(r));row({n:'Subtotal penguat nilai',sub:q.X},1)}
 y+=3;ensure(30);doc.setDrawColor(...NV);doc.setLineWidth(.5);doc.line(14,y,196,y);y+=7;doc.setFont('helvetica','bold');doc.setFontSize(12.5);doc.setTextColor(...NV);T('GRAND TOTAL',16,y);R(rpf(q.T),194,y);y+=12;
 doc.setFontSize(10);T('Pembagian biaya per tahap',14,y);y+=6;doc.setFont('helvetica','normal');doc.setFontSize(9.5);doc.setTextColor(20);
 sc.st.forEach(t=>{T(t.n+' - '+t.ds,16,y);R(rpf(t.cost),194,y);y+=5.5});
 // page 3: denah + jadwal
 doc.addPage();y=header();H2('Denah skematik');
 const n=S.fl,gp=8,pwMax=(182-(n-1)*gp)/n,k=Math.min(pwMax/q.bw,78/q.bd),pw=q.bw*k,ph=q.bd*k,x0=14+(182-(n*pw+(n-1)*gp))/2;
 for(let f=1;f<=n;f++){const x=x0+(f-1)*(pw+gp),py=y+4;
  doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.setTextColor(...NV);T('Lantai '+f,x+pw/2,y,{align:'center'});
  Z[f].forEach(([t,rx,ry,rw,rh,c])=>{const X=x+rx*pw,Y=py+ry*ph,Wd=rw*pw,Hh=rh*ph;
   doc.setFillColor(...ZC[c]);doc.setDrawColor(...NV);doc.setLineWidth(.2);doc.rect(X,Y,Wd,Hh,'FD');
   doc.setFont('helvetica','bold');doc.setFontSize(5.5);doc.setTextColor(...NV);
   const ls=doc.splitTextToSize(A(t),Wd-2),ar=Math.round(rw*q.bw*rh*q.bd),sa=ls.length*2.4+3<=Hh,th=ls.length*2.4+(sa?2.6:0),ty=Y+Hh/2-th/2+2;
   ls.forEach((l,i)=>doc.text(l,X+Wd/2,ty+i*2.4,{align:'center'}));
   if(sa){doc.setFont('helvetica','normal');doc.setTextColor(110);doc.text(ar+' m2',X+Wd/2,ty+ls.length*2.4+.2,{align:'center'})}});
  doc.setDrawColor(...NV);doc.setLineWidth(.6);doc.rect(x,py,pw,ph)}
 y+=4+ph+5;doc.setFont('helvetica','italic');doc.setFontSize(7.5);doc.setTextColor(130);T(`Bangunan ${nf(q.bw)} x ${nf(q.bd)} m pada lahan ${q.W} x ${q.D} m. Denah skematik, ruang dapat disesuaikan saat tahap berikutnya.`,14,y);y+=10;
 H2('Jadwal dan termin pembayaran');
 doc.setFont('helvetica','bold');doc.setFontSize(8.5);doc.setFillColor(243,235,214);doc.rect(14,y-4.5,182,7,'F');doc.setTextColor(...NV);
 T('Tahap',16,y);T('Periode',44,y);T('Durasi',88,y);R('Termin 1 (30%)',122,y);R('Termin 2 (40%)',150,y);R('Termin 3 (30%)',176,y);R('Total',194,y);y+=7;
 doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.setTextColor(20);
 sc.st.forEach(t=>{T(t.n,16,y);T(sc.lab(t.s)+' - '+sc.lab(t.e-1),44,y);T(t.dur+' bln',88,y);R(rp(t.term[0]),122,y);R(rp(t.term[1]),150,y);R(rp(t.term[2]),176,y);doc.setFont('helvetica','bold');R(rp(t.cost),194,y);doc.setFont('helvetica','normal');y+=6;doc.setDrawColor(228,231,236);doc.line(14,y-4,196,y-4)});
 y+=3;doc.setFontSize(8.5);doc.setTextColor(90);
 doc.splitTextToSize(A(`Perkiraan selesai: ${sc.lab(sc.total-1)}${sc.gap?` (jeda ${sc.gap} bulan sebelum Tahap 2)`:''}. Termin usulan: 30% saat mulai, 40% saat progres sekitar 50%, 30% saat serah terima.`),182).forEach(l=>{doc.text(l,14,y);y+=4.5});y+=6;
 if($('rsw').checked&&rn&&rn.u>0){H2('Simulasi kos');doc.setFontSize(9.5);doc.setTextColor(20);
  [['Kamar kos',`${rn.u} kamar, tarif ${rpf(rn.tr)}/bulan, hunian ${Math.round(rn.oc*100)}%`],['Tambahan biaya bangun',rpf(rn.add)],['Pendapatan bersih / bulan',rpf(rn.net)],['Cicilan setelah unit ditambah',rpf(rn.m2)+' / bulan'],['Cicilan efektif setelah sewa',rpf(rn.eff)+' / bulan (sewa menutup '+rn.cov.toFixed(0)+'%)']]
  .forEach(([a,b])=>{ensure(7);doc.setFont('helvetica','bold');doc.setTextColor(...NV);T(a+':',16,y);doc.setFont('helvetica','normal');doc.setTextColor(30);T(b,76,y);y+=6});y+=6}
 const bz=q.biz;
 if($('rsw').checked&&bz&&bz.a>0){H2('Simulasi ruang usaha (disewakan)');doc.setFontSize(9.5);doc.setTextColor(20);
  [['Ruang usaha',`${nf(bz.a)} m2, tarif ${rpf(bz.tr)}/m2/bulan, terisi ${Math.round(bz.oc*100)}%`],['Tambahan biaya bangun',rpf(bz.add)],['Pendapatan bersih / bulan',rpf(bz.net)],['Cicilan setelah ruang usaha ditambah',rpf(bz.m2)+' / bulan'],['Cicilan efektif setelah sewa',rpf(bz.eff)+' / bulan (sewa menutup '+bz.cov.toFixed(0)+'%)']]
  .forEach(([a,b])=>{ensure(7);doc.setFont('helvetica','bold');doc.setTextColor(...NV);T(a+':',16,y);doc.setFont('helvetica','normal');doc.setTextColor(30);T(b,86,y);y+=6});y+=6}
 H2('Catatan');doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.setTextColor(90);
 ['SEMUA ANGKA ADALAH ESTIMASI. Untuk RAB FIX, konsultasi langsung via WhatsApp 0822-3009-1014.','Estimasi awal berbasis harga per m2 dan indeks wilayah, akurasi sekitar +/-15%.','RAB final menunggu konsultasi, gambar kerja, dan analisis harga satuan.','Suku bunga '+Math.round(RATE()*100)+'% per tahun dan tarif listrik Rp 1.444,70/kWh adalah asumsi.','Aturan KDB, KLB, dan sempadan perlu dicocokkan dengan RDTR dan PBG lokasi.']
 .forEach(t=>{ensure(6);T('- '+t,16,y);y+=5.5});
 doc.addPage();y=header();H2('Perkiraan kebutuhan material (BoQ)');
 doc.setFont('helvetica','bold');doc.setFontSize(9);doc.setFillColor(243,235,214);doc.rect(14,y-4.5,182,7,'F');doc.setTextColor(...NV);T('Material',16,y);R('Perkiraan',108,y);R('Rentang +/-15%',150,y);T('Satuan',156,y);y+=7;
 const fm=v=>Math.round(v).toLocaleString('id-ID');
 boqList().forEach(r=>{doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor(20);T(r[0],16,y);doc.setFont('helvetica','bold');R(fm(r[1]),108,y);doc.setFont('helvetica','normal');R(fm(r[1]*.85)+' - '+fm(r[1]*1.15),150,y);T(r[2],156,y);y+=6;doc.setDrawColor(228,231,236);doc.line(14,y-4,196,y-4)});
 y+=4;doc.setFontSize(8.5);doc.setTextColor(90);doc.splitTextToSize(A('Perkiraan kasar dari angka umum per m2 untuk mengecek kewajaran RAB, belum termasuk sisa material 5-10%. Kebutuhan final dihitung ulang dari gambar kerja.'),182).forEach(l=>{doc.text(l,14,y);y+=4.5});
 y+=10;H2('Kebutuhan dana di luar RAB (perkiraan)');doc.setFontSize(9.5);
 q.out.filter(x=>x.on).forEach(x=>{ensure(7);doc.setFont('helvetica','normal');doc.setTextColor(20);T(x.n,16,y);doc.setTextColor(120);doc.setFontSize(8);T(x.b,92,y);doc.setFontSize(9.5);doc.setTextColor(20);R(rpf(x.v),194,y);y+=5.5});
 y+=2;ensure(18);doc.setFont('helvetica','bold');doc.setTextColor(...NV);T('Total kebutuhan dana',16,y);R(rpf(q.outT.tot),194,y);y+=6;doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.setTextColor(90);T('Dana tunai awal (DP, desain, perizinan, biaya KPR): '+rpf(q.outT.cash),16,y);y+=6;
 y+=10;H2('Saran iklim dan orientasi');doc.setFontSize(9.5);
 q.clim.sides.forEach(x=>{ensure(7);doc.setFont('helvetica','bold');doc.setTextColor(...NV);T(x[0],16,y);doc.setFont('helvetica','normal');doc.setTextColor(20);T(x[1],70,y);T('Paparan '+EXP[x[1]][0].toLowerCase()+' - '+EXP[x[1]][1].toLowerCase(),96,y);y+=6});
 y+=2;ensure(16);doc.setFontSize(8.5);doc.setTextColor(90);doc.splitTextToSize(A('Sisi '+q.clim.west.toLowerCase()+' menghadap barat. Pertimbangkan secondary skin, overhang dalam, dan ventilasi silang untuk menekan panas sore. Cek arah angin dan bayangan bangunan sekitar langsung di lokasi.'),182).forEach(l=>{doc.text(l,14,y);y+=4.5});
 const pc=doc.getNumberOfPages();
 for(let i=1;i<=pc;i++){doc.setPage(i);doc.setDrawColor(228,231,236);doc.setLineWidth(.2);doc.line(14,284,196,284);doc.setFont('helvetica','normal');doc.setFontSize(7.5);doc.setTextColor(130);T('RASIF Construction | WhatsApp 0822-3009-1014 | Estimasi awal, bukan penawaran mengikat',14,289);R(`Hal ${i}/${pc}`,196,289)}
 doc.save('RASIF-CONSTRUCTION-RAB.pdf');
}
$('pdf').addEventListener('click',async()=>{
 const b=$('pdf'),o='Unduh PDF RAB';
 if(!window.jspdf){b.textContent='PDF belum termuat, cek koneksi';setTimeout(()=>b.textContent=o,2500);return}
 b.textContent='Menyiapkan PDF...';
 try{await makePdf();b.textContent=o}catch(e){console.error(e);b.textContent='Gagal membuat PDF';setTimeout(()=>b.textContent=o,2500)}
});

const KEYS=['W','D','inc','kdb','klb','dp','tn','br','pv','ah','rs','rj','ru','rt','ro','ua','ut','uo'];
function cfgLink(){
 const u=new URLSearchParams();KEYS.forEach(k=>{const v=$(k=== 'pv'?'pv':k).value;if(v!=='')u.set(k,v)});
 u.set('fl',S.fl);u.set('st',S.st);u.set('sp',S.sp);
 u.set('ex',[...document.querySelectorAll('[data-p]')].map(c=>c.checked?1:0).join(''));u.set('cu',$('cu').checked?1:0);u.set('rsw',$('rsw').checked?1:0);u.set('ox',OXS.join(''));u.set('ta',TA.join(''));
 return location.href.split('#')[0].split('?')[0]+'?'+u.toString();
}
function applyCfg(){
 let u;try{u=new URLSearchParams(location.search)}catch(e){return}
 if(![...u.keys()].length)return;
 KEYS.forEach(k=>{if(u.has(k)){const el=$(k);el.value=u.get(k)}});
 ['fl','st','sp'].forEach(k=>{if(u.has(k)){const v=+u.get(k);S[k]=v;document.querySelectorAll(`.seg[data-k=${k}] button`).forEach(b=>b.classList.toggle('on',+b.dataset.v===v))}});
 if(/^[01]{5,6}$/.test(u.get('ox')||''))OXS=u.get('ox').slice(0,5).split('').map(Number);
 if(u.get('cu')==='1')$('cu').checked=true;if(u.get('rsw')==='1')$('rsw').checked=true;if(/^[123]{18}$/.test(u.get('ta')||''))TA=u.get('ta').split('').map(Number);
 if(u.has('ex')){const ex=u.get('ex');document.querySelectorAll('[data-p]').forEach((c,i)=>c.checked=ex[i]==='1')}
}
$('lk').addEventListener('click',async()=>{
 const l=cfgLink(),b=$('lk');$('lkv').value=l;$('lkw').hidden=false;
 try{await navigator.clipboard.writeText(l);b.textContent='Link tersalin'}catch(e){$('lkv').select();b.textContent='Salin manual dari kolom'}
 setTimeout(()=>b.textContent='Salin link konfigurasi',2200);
});
try{new IntersectionObserver(en=>en.forEach(x=>$('sb').classList.toggle('off',x.isIntersecting)),{threshold:.15}).observe($('konsultasi'))}catch(e){}
try{const links=[...document.querySelectorAll('#snav a')],io=new IntersectionObserver(en=>{en.forEach(x=>{if(x.isIntersecting){links.forEach(l=>l.classList.toggle('on',l.getAttribute('href')==='#'+x.target.id));const a=document.querySelector('#snav a.on');if(a&&a.scrollIntoView)a.scrollIntoView({inline:'center',block:'nearest'})}})},{rootMargin:'-20% 0px -70% 0px'});document.querySelectorAll('.sec').forEach(e=>io.observe(e))}catch(e){}
const syncSw=()=>{const on=$('rsw').checked;$('rsg').hidden=!on;$('rsl').classList.toggle('on',on)};
$('rsw').addEventListener('change',syncSw);
applyCfg();syncSw();
calc();
