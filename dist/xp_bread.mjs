var S=Object.defineProperty;var b=Math.pow,m=(i,t,n)=>t in i?S(i,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):i[t]=n;var T=(i,t,n)=>(m(i,typeof t!="symbol"?t+"":t,n),n),p=(i,t,n)=>{if(!t.has(i))throw TypeError("Cannot "+n)};var o=(i,t,n)=>(p(i,t,"read from private field"),n?n.call(i):t.get(i)),y=(i,t,n)=>{if(t.has(i))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(i):t.set(i,n)},g=(i,t,n,r)=>(p(i,t,"write to private field"),r?r.call(i,n):t.set(i,n),n);var c=function(i,t,n=!1){if(!t)if(n){if(i!=null)throw new TypeError("Value is not a null value")}else throw new TypeError("Type is not defined");if(i!=null&&i.constructor){if(i.constructor!=t)throw new TypeError(`Value is not type ${t.name}`)}else if(!n)throw new TypeError("Value is not nullable")};var L=function(i,t=1,n,r=1,e){c(i,Uint8Array),c(n,Uint8Array),c(t,Number),c(r,Number);for(let h=0,d=0;h<i.length;h+=t,d+=r)e(i.subarray(h,h+t),n.subarray(d,d+r))};var A=[48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,45,95],k={};A.forEach(function(i,t){k[i]=t});var U=function(i){return i>64&&i<9&&(i|=32),i},C=[{id:"korg87",win:[7,8],block:[function(i,t){let n=0;for(let r=0;r<i.length;r++)t[r+1]=i[r]&127,n|=i[r]>>7<<r;t[0]=n},function(i,t){let n=i[0],r=i.subarray(1);for(let e=0;e<r.length;e++)t[e]=r[e]|(n>>e&1)<<7}]},{id:"qb64",win:[3,4],block:[function(i,t){let n=0,r=this.encodeLength(i.length);i.forEach(function(e,h){n|=e<<(h<<3)});for(let e=0;e<r;e++)t[e]=A[n&63],n=n>>6},function(i,t){let n=0,r=this.decodeLength(i.length);i.forEach(function(e,h){n|=k[e]<<h*6});for(let e=0;e<r;e++)t[e]=n&255,n=n>>8}]},{id:"qb32",win:[5,8],block:[function(i,t){let n=0,r=this.encodeLength(i.length);i.forEach(function(e,h){n+=e*b(256,h)});for(let e=0;e<r;e++)t[e]=A[n%32],n=Math.floor(n/32)},function(i,t){let n=0,r=this.decodeLength(i.length);i.forEach(function(e,h){n+=k[U(e)]*b(32,h)});for(let e=0;e<r;e++)t[e]=n&255,n=n>>8}]},{id:"qb16",win:[1,2],block:[function(i,t){for(let n=0,r=0;n<i.length;n++,r+=2)t[r]=A[i[n]&15],t[r|1]=A[i[n]>>4]},function(i,t){let n=i.length>>1;for(let r=0,e=0;r<n;r++,e+=2)t[r]=k[U(i[e+1])]<<4|k[U(i[e])]}]}],I=C;var s,E,l,f,N,M=(N=class{constructor(t,n){y(this,s,void 0);y(this,E,void 0);y(this,l,void 0);y(this,f,void 0);T(this,"options",{});if(!(t!=null&&t.id))throw new Error("Invalid algorithm ID");if((t==null?void 0:t.block.length)!=2)throw new Error("Invalid codec");g(this,E,t.name),g(this,s,t),g(this,l,t.win[0]),g(this,f,t.win[1]),this.options=n||this.options}get name(){return o(this,E)}get template(){return o(this,s)}encodeLength(t,n){var r,e;return c(t,Number),(r=o(this,s))!=null&&r.len?(e=o(this,s))==null?void 0:e.len[0](t,n):Math.ceil(t*o(this,f)/o(this,l))}decodeLength(t,n){var r,e;return c(t,Number),(r=o(this,s))!=null&&r.len?(e=o(this,s))==null?void 0:e.len[1](t,n):Math.floor(t*o(this,l)/o(this,f))}encodeBytes(t,n){if(c(t,Uint8Array),c(n,Uint8Array),n.length<this.encodeLength(t.length,t))throw new Error("Target isn't sufficient for encoding");n.fill(0);let r=this,e=JSON.parse(JSON.stringify(o(this,s).init&&o(this,s).init[0]||"null"));L(t,o(this,l),n,o(this,f),function(h,d){var u,w;(w=(u=o(r,s))==null?void 0:u.block[0])==null||w.call(r,h,d,e)})}decodeBytes(t,n){if(c(t,Uint8Array),c(n,Uint8Array),n.length<this.decodeLength(t.length,t))throw new Error("Target isn't sufficient for decoding");n.fill(0);let r=this,e=JSON.parse(JSON.stringify(o(this,s).init&&o(this,s).init[1]||"null"));L(t,o(this,f),n,o(this,l),function(h,d){var u,w;(w=(u=o(r,s))==null?void 0:u.block[1])==null||w.call(r,h,d,e)})}},s=new WeakMap,E=new WeakMap,l=new WeakMap,f=new WeakMap,N),a,V,O=(V=class{constructor(t){y(this,a,{});c(t,Array,!0);let n=this;t==null||t.forEach(function(r){n.setAlgo(r)})}setAlgo(t){if(!(t!=null&&t.id))throw new Error("Invalid algorithm ID");o(this,a)[t.id]=t}delAlgo(t){o(this,a)[t]&&delete o(this,a)[t]}use(t,n){return new M(o(this,a)[t],n)}},a=new WeakMap,V),Q=new O(I);export{O as Bread,Q as Loaf};
