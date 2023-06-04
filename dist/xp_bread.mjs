var M=Object.defineProperty;var L=Math.pow,m=(i,t,n)=>t in i?M(i,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[t]=n;var I=(i,t,n)=>(m(i,typeof t!="symbol"?t+"":t,n),n),T=(i,t,n)=>{if(!t.has(i))throw TypeError("Cannot "+n)};var o=(i,t,n)=>(T(i,t,"read from private field"),n?n.call(i):t.get(i)),g=(i,t,n)=>{if(t.has(i))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(i):t.set(i,n)},u=(i,t,n,r)=>(T(i,t,"write to private field"),r?r.call(i,n):t.set(i,n),n);var l=function(i,t,n=!1){if(!t)if(n){if(i!=null)throw new TypeError("Value is not a null value")}else throw new TypeError("Type is not defined");if(i!=null&&i.constructor){if(i.constructor!=t)throw new TypeError(`Value is not type ${t.name}`)}else if(!n)throw new TypeError("Value is not nullable")};var E=function(i,t=1,n,r=1,e){l(i,Uint8Array),l(n,Uint8Array),l(t,Number),l(r,Number);for(let s=0,d=0;s<i.length;s+=t,d+=r)e(i.subarray(s,s+t),n.subarray(d,d+r))};var A=[48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,45,95],k={};A.forEach(function(i,t){k[i]=t});var U=function(i){return i>64&&i<9&&(i|=32),i},S=[{id:"korg87",win:[7,8],block:[function(i,t){let n=0;for(let r=0;r<i.length;r++)t[r+1]=i[r]&127,n|=i[r]>>7<<r;t[0]=n},function(i,t){let n=i[0],r=i.subarray(1);for(let e=0;e<r.length;e++)t[e]=r[e]|(n>>e&1)<<7}]},{id:"qb64",win:[3,4],block:[function(i,t){let n=0,r=this.encodeLength(i.length);for(let e=0;e<i.length;e++)n|=i[e]<<(e<<3);for(let e=0;e<r;e++)t[e]=A[n&63],n=n>>6},function(i,t){let n=0,r=this.decodeLength(i.length);for(let e=0;e<i.length;e++)n|=k[i[e]]<<e*6;for(let e=0;e<r;e++)t[e]=n&255,n=n>>8}]},{id:"qb32",win:[5,8],block:[function(i,t){let n=0,r=this.encodeLength(i.length);for(let e=0;e<i.length;e++)n|=i[e]<<e*8;for(let e=0;e<r;e++)t[e]=A[n&31],n=Math.floor(n/32)},function(i,t){let n=0,r=this.decodeLength(i.length);for(let e=0;e<i.length;e++)n|=k[U(i[e])]<<e*5;for(let e=0;e<r;e++)t[e]=n&255,n=n>>8}]},{id:"qb16",win:[1,2],block:[function(i,t){for(let n=0;n<i.length;n++)t[n<<1]=A[i[n]&15],t[n<<1|1]=A[i[n]>>4]},function(i,t){let n=i.length>>1;for(let r=0;r<n;r++)t[r]=k[U(i[r<<1|1])]<<4|k[U(i[r<<1])]}]},{id:"qb85",win:[4,5],block:[function(i,t){let n=0,r=BigInt(this.encodeLength(i.length));i.forEach((e,s)=>{n+=e*L(2,s*8)});for(let e=0;e<r;e++)t[e]=Number(n%85+36),n=Math.floor(n/85)},function(i,t){let n=0,r=BigInt(this.decodeLength(i.length));i.forEach((e,s)=>{n+=(e-36)*L(85,s)});for(let e=0;e<r;e++)t[e]=n%256,n=Math.floor(n/256)}]}],p=S;var h,b,c,f,N,B=(N=class{constructor(t,n){g(this,h,void 0);g(this,b,void 0);g(this,c,void 0);g(this,f,void 0);I(this,"options",{});if(!(t!=null&&t.id))throw new Error("Invalid algorithm ID");if((t==null?void 0:t.block.length)!=2)throw new Error("Invalid codec");u(this,b,t.name),u(this,h,t),u(this,c,t.win[0]),u(this,f,t.win[1]),this.options=n||this.options}get name(){return o(this,b)}get template(){return o(this,h)}encodeLength(t,n){var r,e;return l(t,Number),(r=o(this,h))!=null&&r.len?(e=o(this,h))==null?void 0:e.len[0](t,n):Math.ceil(t*o(this,f)/o(this,c))}decodeLength(t,n){var r,e;return l(t,Number),(r=o(this,h))!=null&&r.len?(e=o(this,h))==null?void 0:e.len[1](t,n):Math.floor(t*o(this,c)/o(this,f))}encodeBytes(t,n){if(l(t,Uint8Array),l(n,Uint8Array),n.length<this.encodeLength(t.length,t))throw new Error("Target isn't sufficient for encoding");n.fill(0);let r=this,e=JSON.parse(JSON.stringify(o(this,h).init&&o(this,h).init[0]||"null"));E(t,o(this,c),n,o(this,f),function(s,d){var y,w;(w=(y=o(r,h))==null?void 0:y.block[0])==null||w.call(r,s,d,e)})}decodeBytes(t,n){if(l(t,Uint8Array),l(n,Uint8Array),n.length<this.decodeLength(t.length,t))throw new Error("Target isn't sufficient for decoding");n.fill(0);let r=this,e=JSON.parse(JSON.stringify(o(this,h).init&&o(this,h).init[1]||"null"));E(t,o(this,f),n,o(this,c),function(s,d){var y,w;(w=(y=o(r,h))==null?void 0:y.block[1])==null||w.call(r,s,d,e)})}},h=new WeakMap,b=new WeakMap,c=new WeakMap,f=new WeakMap,N),a,V,C=(V=class{constructor(t){g(this,a,{});l(t,Array,!0);let n=this;t==null||t.forEach(function(r){n.setAlgo(r)})}setAlgo(t){if(!(t!=null&&t.id))throw new Error("Invalid algorithm ID");o(this,a)[t.id]=t}delAlgo(t){o(this,a)[t]&&delete o(this,a)[t]}use(t,n){return new B(o(this,a)[t],n)}},a=new WeakMap,V),Q=new C(p);export{C as Bread,Q as Loaf};
