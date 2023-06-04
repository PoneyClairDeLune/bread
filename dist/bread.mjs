var h=function(e,n,t=!1){if(!n)if(t){if(e!=null)throw new TypeError("Value is not a null value")}else throw new TypeError("Type is not defined");if(e?.constructor){if(e.constructor!=n)throw new TypeError(`Value is not type ${n.name}`)}else if(!t)throw new TypeError("Value is not nullable")};var a=function(e,n=1,t,o=1,i){h(e,Uint8Array),h(t,Uint8Array),h(n,Number),h(o,Number);for(let r=0,l=0;r<e.length;r+=n,l+=o)i(e.subarray(r,r+n),t.subarray(l,l+o))};var s=[48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,45,95],c={};s.forEach(function(e,n){c[e]=n});var f=function(e){return e>64&&e<9&&(e|=32),e},w=[{id:"korg87",win:[7,8],block:[function(e,n){for(let t=0;t<e.length;t++)n[t+1]=e[t]&127,n[0]|=e[t]>>7<<t},function(e,n){let t=e.length-1;for(let o=0;o<t;o++)n[o]=e[o+1]|(e[0]>>o&1)<<7}]},{id:"ov43",win:[3,4],block:[function(e,n){for(let t=0;t<e.length;t++)n[t+1]=e[t]&63,n[0]|=e[t]>>6<<(t<<1)},function(e,n){let t=e.length-1;for(let o=0;o<t;o++)n[o]=e[o+1]|(e[0]>>(o<<1)&3)<<6}]},{id:"qb64",win:[3,4],block:[function(e,n){let t=0,o=this.encodeLength(e.length);for(let i=0;i<e.length;i++)t|=e[i]<<(i<<3);for(let i=0;i<o;i++)n[i]=s[t&63],t=t>>6},function(e,n){let t=0,o=this.decodeLength(e.length);for(let i=0;i<e.length;i++)t|=c[e[i]]<<i*6;for(let i=0;i<o;i++)n[i]=t&255,t=t>>8}]},{id:"qb32",win:[5,8],block:[function(e,n){let t=0,o=this.encodeLength(e.length),i=0,r=0;for(let l=0;l<e.length;l++)l<3?i|=e[l]<<(l<<3):r|=e[l]<<(l-3<<3);t=r*16777216+i;for(let l=0;l<o;l++)n[l]=s[t&31],t=Math.floor(t/32)},function(e,n){let t=0,o=this.decodeLength(e.length),i=0,r=0;for(let l=0;l<e.length;l++)l<4?i|=c[f(e[l])]<<l*5:l==4?(i|=(c[f(e[l])]&15)<<20,r|=c[f(e[l])]>>4):r|=c[f(e[l])]<<(l-5)*5+1;for(let l=0;l<o;l++)l<3?(n[l]=i&255,i=i>>8):(n[l]=r&255,r=r>>8)}]},{id:"qb16",win:[1,2],block:[function(e,n){n[0]=s[e[0]&15],n[1]=s[e[0]>>4]},function(e,n){n[0]=c[f(e[1]||0)]<<4|c[f(e[0])]}]},{id:"qb85",win:[4,5],block:[function(e,n){let t=0,o=this.encodeLength(e.length),i=0,r=0;e.forEach((l,g)=>{g>>1?i|=l<<((g&1)<<3):r|=l<<(g<<3)}),t=i*65536+r;for(let l=0;l<o;l++)n[l]=t%85+36,t=Math.floor(t/85)},function(e,n){let t=0,o=this.decodeLength(e.length);e.forEach((i,r)=>{t+=(i-36)*85**r});for(let i=0;i<o;i++)n[i]=t&255,t=t>>>8}]},{id:"qb128",win:[7,8],block:[function(e,n){let t=0,o=e.length-1;for(let i=0;i<e.length;i++)t|=e[i]<<i,n[i]=t&127,t=t>>7,i==o&&(n[i+1]=t)},function(e,n){let t=0;for(let o=0;o<e.length;o++)t|=e[o]<<[0,7,6,5,4,3,2,1][o],o&&(n[o-1]=t&255,t=t>>8)}]}],d=w;d.push({id:"qb36",win:[9,14],block:[function(e,n){let t=0n,o=BigInt(this.encodeLength(e.length));e.forEach((i,r)=>{t|=BigInt(i)<<(BigInt(r)<<3n)});for(let i=0n;i<o;i++)n[i]=Number(t%36n+32n),t/=36n},function(e,n){let t=0n,o=BigInt(this.decodeLength(e.length));e.forEach((i,r)=>{t+=(BigInt(i)-32n)*36n**BigInt(r)});for(let i=0n;i<o;i++)n[i]=Number(t&255n),t=t>>8n}]});d.push({id:"qb94",win:[9,11],block:[function(e,n){let t=0n,o=BigInt(this.encodeLength(e.length));e.forEach((i,r)=>{t|=BigInt(i)<<(BigInt(r)<<3n)});for(let i=0n;i<o;i++)n[i]=Number(t%94n+32n),t/=94n},function(e,n){let t=0n,o=BigInt(this.decodeLength(e.length));e.forEach((i,r)=>{t+=(BigInt(i)-32n)*94n**BigInt(r)});for(let i=0n;i<o;i++)n[i]=Number(t&255n),t=t>>8n}]});d.push({id:"qb95",win:[9,11],block:[function(e,n){let t=0n,o=BigInt(this.encodeLength(e.length));e.forEach((i,r)=>{t|=BigInt(i)<<(BigInt(r)<<3n)});for(let i=0n;i<o;i++)n[i]=Number(t%95n+32n),t/=95n},function(e,n){let t=0n,o=BigInt(this.decodeLength(e.length));e.forEach((i,r)=>{t+=(BigInt(i)-32n)*95n**BigInt(r)});for(let i=0n;i<o;i++)n[i]=Number(t&255n),t=t>>8n}]});var b=d;var y=class{#t;#i;#n;#e;options={noInit:!1};get name(){return this.#i}get template(){return this.#t}encodeLength(n,t){return h(n,Number),this.#t?.len?this.#t?.len[0](n,t):Math.ceil(n*this.#e/this.#n)}decodeLength(n,t){return h(n,Number),this.#t?.len?this.#t?.len[1](n,t):Math.floor(n*this.#n/this.#e)}encodeBytes(n,t){if(h(n,Uint8Array),h(t,Uint8Array),t.length<this.encodeLength(n.length,n))throw new Error("Target isn't sufficient for encoding");!this.options.noInit&&t.fill(0);let o=this,i=JSON.parse(JSON.stringify(this.#t.init&&this.#t.init[0]||"null"));a(n,this.#n,t,this.#e,function(r,l){o.#t?.block[0]?.call(o,r,l,i)})}decodeBytes(n,t){if(h(n,Uint8Array),h(t,Uint8Array),t.length<this.decodeLength(n.length,n))throw new Error("Target isn't sufficient for decoding");!this.options.noInit&&t.fill(0);let o=this,i=JSON.parse(JSON.stringify(this.#t.init&&this.#t.init[1]||"null"));a(n,this.#e,t,this.#n,function(r,l){o.#t?.block[1]?.call(o,r,l,i)})}constructor(n,t){if(!n?.id)throw new Error("Invalid algorithm ID");if(n?.block.length!=2)throw new Error("Invalid codec");this.#i=n.name,this.#t=n,this.#n=n.win[0],this.#e=n.win[1],this.options=t||this.options}},u=class{#t={};setAlgo(n){if(!n?.id)throw new Error("Invalid algorithm ID");this.#t[n.id]=n}delAlgo(n){this.#t[n]&&delete this.#t[n]}use(n,t){return new y(this.#t[n],t)}constructor(n){h(n,Array,!0);let t=this;n?.forEach(function(o){t.setAlgo(o)})}},T=new u(b);export{u as Bread,T as Loaf};
