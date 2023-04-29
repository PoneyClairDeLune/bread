var N=Object.defineProperty;var V=(r,t,n)=>t in r?N(r,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):r[t]=n;var L=(r,t,n)=>(V(r,typeof t!="symbol"?t+"":t,n),n),U=(r,t,n)=>{if(!t.has(r))throw TypeError("Cannot "+n)};var e=(r,t,n)=>(U(r,t,"read from private field"),n?n.call(r):t.get(r)),y=(r,t,n)=>{if(t.has(r))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(r):t.set(r,n)},A=(r,t,n,o)=>(U(r,t,"write to private field"),o?o.call(r,n):t.set(r,n),n);var h=function(r,t,n=!1){if(!t)if(n){if(r!=null)throw new TypeError("Value is not a null value")}else throw new TypeError("Type is not defined");if(r!=null&&r.constructor){if(r.constructor!=t)throw new TypeError(`Value is not type ${t.name}`)}else if(!n)throw new TypeError("Value is not nullable")};var b=function(r,t=1,n,o=1,i){h(r,Uint8Array),h(n,Uint8Array),h(t,Number),h(o,Number);for(let c=0,d=0;c<r.length;c+=t,d+=o)i(r.subarray(c,c+t),n.subarray(d,d+o))};var g=[48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,45,95],k={};g.forEach(function(r,t){k[r]=t});var S=[{id:"korg87",win:[7,8],block:[function(r,t){let n=0;r.forEach(function(o,i){t[i+1]=o&127,n|=o>>7<<i}),t[0]=n},function(r,t){let n=r[0];r.subarray(1).forEach((o,i)=>{t[i]=o|(n>>i&1)<<7})}]},{id:"qb64",win:[3,4],block:[function(r,t){let n=0,o=this.encodeLength(r.length);r.forEach(function(i,c){n|=i<<(c<<3)});for(let i=0;i<o;i++)t[i]=g[n&63],n=n>>6},function(r,t){let n=0,o=this.decodeLength(r.length);r.forEach(function(i,c){n|=k[i]<<c*6});for(let i=0;i<o;i++)t[i]=n&255,n=n>>8}]},{id:"qb32",win:[3,4],block:[function(r,t){let n=0,o=this.encodeLength(r.length);r.forEach(function(i,c){n|=i<<c*5});for(let i=0;i<o;i++)t[i]=g[n&31],n=n>>5},function(r,t){let n=0,o=this.decodeLength(r.length);r.forEach(function(i,c){i>64&&i<96&&(i|=32),n+=k[i]<<c*5});for(let i=0;i<o;i++)t[i]=n&255,n=n>>8}]},{id:"qb16",win:[1,2],block:[function(r,t){r.forEach(function(n,o){let i=o<<1;t[i]=g[n&15],t[i|1]=g[n>>4]})},function(r,t){r.forEach(function(n,o){n>64&&n<96&&(n|=32),t[o>>1]|=k[n]<<4*(o&1)})}]}],T=S;var s,E,l,f,p,m=(p=class{constructor(t,n){y(this,s,void 0);y(this,E,void 0);y(this,l,void 0);y(this,f,void 0);L(this,"options",{});if(!(t!=null&&t.id))throw new Error("Invalid algorithm ID");if((t==null?void 0:t.block.length)!=2)throw new Error("Invalid codec");A(this,E,t.name),A(this,s,t),A(this,l,t.win[0]),A(this,f,t.win[1]),this.options=n||this.options}get name(){return e(this,E)}get template(){return e(this,s)}encodeLength(t,n){var o,i;return h(t,Number),(o=e(this,s))!=null&&o.len?(i=e(this,s))==null?void 0:i.len[0](t,n):Math.ceil(t*e(this,f)/e(this,l))}decodeLength(t,n){var o,i;return h(t,Number),(o=e(this,s))!=null&&o.len?(i=e(this,s))==null?void 0:i.len[1](t,n):Math.floor(t*e(this,l)/e(this,f))}encodeBytes(t,n){if(h(t,Uint8Array),h(n,Uint8Array),n.length<this.encodeLength(t.length,t))throw new Error("Target isn't sufficient for encoding");n.fill(0);let o=this,i=JSON.parse(JSON.stringify(e(this,s).init&&e(this,s).init[0]||"null"));b(t,e(this,l),n,e(this,f),function(c,d){var u,w;(w=(u=e(o,s))==null?void 0:u.block[0])==null||w.call(o,c,d,i)})}decodeBytes(t,n){if(h(t,Uint8Array),h(n,Uint8Array),n.length<this.decodeLength(t.length,t))throw new Error("Target isn't sufficient for decoding");n.fill(0);let o=this,i=JSON.parse(JSON.stringify(e(this,s).init&&e(this,s).init[1]||"null"));b(t,e(this,f),n,e(this,l),function(c,d){var u,w;(w=(u=e(o,s))==null?void 0:u.block[1])==null||w.call(o,c,d,i)})}},s=new WeakMap,E=new WeakMap,l=new WeakMap,f=new WeakMap,p),a,I,x=(I=class{constructor(t){y(this,a,{});h(t,Array,!0);let n=this;t==null||t.forEach(function(o){n.setAlgo(o)})}setAlgo(t){if(!(t!=null&&t.id))throw new Error("Invalid algorithm ID");e(this,a)[t.id]=t}delAlgo(t){e(this,a)[t]&&delete e(this,a)[t]}use(t,n){return new m(e(this,a)[t],n)}},a=new WeakMap,I),G=new x(T);export{x as Bread,G as Loaf};
