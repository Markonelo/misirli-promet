const sharp=require("sharp"),fs=require("fs"),path=require("path");
const ROOT="C:/Users/marko/misirli-promet/public/moto";
const OUT="C:/Users/marko/misirli-promet/scripts/_crops";fs.mkdirSync(OUT,{recursive:true});
const slugs=fs.readdirSync(ROOT).filter(d=>d!=="_raw"&&fs.existsSync(path.join(ROOT,d,"1.jpg"))).sort();
const COLS=4,CW=360,CH=270,LABEL=26,CELL_H=CH+LABEL;
(async()=>{const rows=Math.ceil(slugs.length/COLS),W=COLS*CW,H=rows*CELL_H,c=[];
for(let i=0;i<slugs.length;i++){const s=slugs[i],col=i%COLS,row=Math.floor(i/COLS),x=col*CW,y=row*CELL_H;
const buf=await sharp(path.join(ROOT,s,"1.jpg")).resize(CW,CH,{fit:"cover",position:"centre"}).toBuffer();
c.push({input:buf,left:x,top:y+LABEL});
c.push({input:Buffer.from(`<svg width="${CW}" height="${LABEL}"><rect width="100%" height="100%" fill="#000"/><text x="6" y="18" font-family="monospace" font-size="16" fill="#0f0">${s}</text></svg>`),left:x,top:y});}
await sharp({create:{width:W,height:H,channels:3,background:"#111"}}).composite(c).png().toFile(path.join(OUT,"card-crops.png"));
console.log("wrote card-crops.png",slugs.length,"imgs");})();
