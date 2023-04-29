var l=function(i,e,n=!1){if(!e)if(n){if(i!=null)throw new TypeError("Value is not a null value")}else throw new TypeError("Type is not defined");if(i?.constructor){if(i.constructor!=e)throw new TypeError(`Value is not type ${e.name}`)}else if(!n)throw new TypeError("Value is not nullable")};var a=function(i,e=1,n,o=1,t){l(i,Uint8Array),l(n,Uint8Array),l(e,Number),l(o,Number);for(let r=0,h=0;r<i.length;r+=e,h+=o)t(i.subarray(r,r+e),n.subarray(h,h+o))};var s=[48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,45,95],f={};s.forEach(function(i,e){f[i]=e});var g=function(i){return i>64&&i<9&&(i|=32),i},b=[{id:"korg87",win:[7,8],block:[function(i,e){let n=0;for(let o=0;o<i.length;o++)e[o+1]=i[o]&127,n|=i[o]>>7<<o;e[0]=n},function(i,e){let n=i[0],o=i.subarray(1);for(let t=0;t<o.length;t++)e[t]=o[t]|(n>>t&1)<<7}]},{id:"qb64",win:[3,4],block:[function(i,e){let n=0,o=this.encodeLength(i.length);for(let t=0;t<i.length;t++)n|=i[t]<<(t<<3);for(let t=0;t<o;t++)e[t]=s[n&63],n=n>>6},function(i,e){let n=0,o=this.decodeLength(i.length);for(let t=0;t<i.length;t++)n|=f[i[t]]<<t*6;for(let t=0;t<o;t++)e[t]=n&255,n=n>>8}]},{id:"qb32",win:[5,8],block:[function(i,e){let n=0,o=this.encodeLength(i.length);for(let t=0;t<i.length;t++)n+=i[t]*256**t;for(let t=0;t<o;t++)e[t]=s[n%32],n=Math.floor(n/32)},function(i,e){let n=0,o=this.decodeLength(i.length);for(let t=0;t<i.length;t++)n+=f[g(i[t])]*32**t;for(let t=0;t<o;t++)e[t]=n%256,n=Math.floor(n/256)}]},{id:"qb16",win:[1,2],block:[function(i,e){for(let n=0,o=0;n<i.length;n++,o+=2)e[o]=s[i[n]&15],e[o|1]=s[i[n]>>4]},function(i,e){let n=i.length>>1;for(let o=0,t=0;o<n;o++,t+=2)e[o]=f[g(i[t+1])]<<4|f[g(i[t])]}]}],c=b;c.push({id:"qb36",win:[9,14],block:[function(i,e){let n=0n,o=BigInt(this.encodeLength(i.length));i.forEach((t,r)=>{n|=BigInt(t)<<(BigInt(r)<<3n)});for(let t=0n;t<o;t++)e[t]=Number(n%36n+32n),n/=36n},function(i,e){let n=0n,o=BigInt(this.decodeLength(i.length));i.forEach((t,r)=>{n+=(BigInt(t)-32n)*36n**BigInt(r)});for(let t=0n;t<o;t++)e[t]=Number(n&255n),n=n>>8n}]});c.push({id:"qb85",win:[4,5],block:[function(i,e){let n=0n,o=BigInt(this.encodeLength(i.length));i.forEach((t,r)=>{n|=BigInt(t)<<(BigInt(r)<<3n)});for(let t=0n;t<o;t++)e[t]=Number(n%85n+36n),n/=85n},function(i,e){let n=0n,o=BigInt(this.decodeLength(i.length));i.forEach((t,r)=>{n+=(BigInt(t)-36n)*85n**BigInt(r)});for(let t=0n;t<o;t++)e[t]=Number(n&255n),n=n>>8n}]});c.push({id:"qb94",win:[9,11],block:[function(i,e){let n=0n,o=BigInt(this.encodeLength(i.length));i.forEach((t,r)=>{n|=BigInt(t)<<(BigInt(r)<<3n)});for(let t=0n;t<o;t++)e[t]=Number(n%94n+32n),n/=94n},function(i,e){let n=0n,o=BigInt(this.decodeLength(i.length));i.forEach((t,r)=>{n+=(BigInt(t)-32n)*94n**BigInt(r)});for(let t=0n;t<o;t++)e[t]=Number(n&255n),n=n>>8n}]});c.push({id:"qb95",win:[9,11],block:[function(i,e){let n=0n,o=BigInt(this.encodeLength(i.length));i.forEach((t,r)=>{n|=BigInt(t)<<(BigInt(r)<<3n)});for(let t=0n;t<o;t++)e[t]=Number(n%95n+32n),n/=95n},function(i,e){let n=0n,o=BigInt(this.decodeLength(i.length));i.forEach((t,r)=>{n+=(BigInt(t)-32n)*95n**BigInt(r)});for(let t=0n;t<o;t++)e[t]=Number(n&255n),n=n>>8n}]});var d=c;var u=class{#t;#i;#n;#e;options={noInit:!1};get name(){return this.#i}get template(){return this.#t}encodeLength(e,n){return l(e,Number),this.#t?.len?this.#t?.len[0](e,n):Math.ceil(e*this.#e/this.#n)}decodeLength(e,n){return l(e,Number),this.#t?.len?this.#t?.len[1](e,n):Math.floor(e*this.#n/this.#e)}encodeBytes(e,n){if(l(e,Uint8Array),l(n,Uint8Array),n.length<this.encodeLength(e.length,e))throw new Error("Target isn't sufficient for encoding");!this.options.noInit&&n.fill(0);let o=this,t=JSON.parse(JSON.stringify(this.#t.init&&this.#t.init[0]||"null"));a(e,this.#n,n,this.#e,function(r,h){o.#t?.block[0]?.call(o,r,h,t)})}decodeBytes(e,n){if(l(e,Uint8Array),l(n,Uint8Array),n.length<this.decodeLength(e.length,e))throw new Error("Target isn't sufficient for decoding");!this.options.noInit&&n.fill(0);let o=this,t=JSON.parse(JSON.stringify(this.#t.init&&this.#t.init[1]||"null"));a(e,this.#e,n,this.#n,function(r,h){o.#t?.block[1]?.call(o,r,h,t)})}constructor(e,n){if(!e?.id)throw new Error("Invalid algorithm ID");if(e?.block.length!=2)throw new Error("Invalid codec");this.#i=e.name,this.#t=e,this.#n=e.win[0],this.#e=e.win[1],this.options=n||this.options}},y=class{#t={};setAlgo(e){if(!e?.id)throw new Error("Invalid algorithm ID");this.#t[e.id]=e}delAlgo(e){this.#t[e]&&delete this.#t[e]}use(e,n){return new u(this.#t[e],n)}constructor(e){l(e,Array,!0);let n=this;e?.forEach(function(o){n.setAlgo(o)})}},T=new y(d);export{y as Bread,T as Loaf};
