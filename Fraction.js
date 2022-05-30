/*
Fraction.js v4.2.0 05/03/2022
https://www.xarg.org/2014/03/rational-numbers-in-javascript/

Copyright (c) 2021, Robert Eisele (robert@xarg.org)
Dual licensed under the MIT or GPL Version 2 licenses.
*/
(function(z){function p(a,c){var b=0,d=1,f=1,l=0,k=0,t=0,x=1,u=1,g=0,h=1,v=1,q=1;if(void 0!==a&&null!==a)if(void 0!==c){if(b=a,d=c,f=b*d,0!==b%1||0!==d%1)throw m.NonIntegerParameter;}else switch(typeof a){case "object":if("d"in a&&"n"in a)b=a.n,d=a.d,"s"in a&&(b*=a.s);else if(0 in a)b=a[0],1 in a&&(d=a[1]);else throw m.InvalidParameter;f=b*d;break;case "number":0>a&&(f=a,a=-a);if(0===a%1)b=a;else if(0<a){1<=a&&(u=Math.pow(10,Math.floor(1+Math.log(a)/Math.LN10)),a/=u);for(;1E7>=h&&1E7>=q;)if(b=(g+
        v)/(h+q),a===b){1E7>=h+q?(b=g+v,d=h+q):q>h?(b=v,d=q):(b=g,d=h);break}else a>b?(g+=v,h+=q):(v+=g,q+=h),1E7<h?(b=v,d=q):(b=g,d=h);b*=u}else if(isNaN(a)||isNaN(c))d=b=NaN;break;case "string":h=a.match(/\d+|./g);if(null===h)throw m.InvalidParameter;"-"===h[g]?(f=-1,g++):"+"===h[g]&&g++;if(h.length===g+1)k=r(h[g++],f);else if("."===h[g+1]||"."===h[g]){"."!==h[g]&&(l=r(h[g++],f));g++;if(g+1===h.length||"("===h[g+1]&&")"===h[g+3]||"'"===h[g+1]&&"'"===h[g+3])k=r(h[g],f),x=Math.pow(10,h[g].length),g++;if("("===
        h[g]&&")"===h[g+2]||"'"===h[g]&&"'"===h[g+2])t=r(h[g+1],f),u=Math.pow(10,h[g+1].length)-1,g+=3}else"/"===h[g+1]||":"===h[g+1]?(k=r(h[g],f),x=r(h[g+2],1),g+=3):"/"===h[g+3]&&" "===h[g+1]&&(l=r(h[g],f),k=r(h[g+2],f),x=r(h[g+4],1),g+=5);if(h.length<=g){d=x*u;f=b=t+d*l+u*k;break}default:throw m.InvalidParameter;}if(0===d)throw m.DivisionByZero;e.s=0>f?-1:1;e.n=Math.abs(b);e.d=Math.abs(d)}function r(a,c){if(isNaN(a=parseInt(a,10)))throw m.InvalidParameter;return a*c}function n(a,c){if(0===c)throw m.DivisionByZero;
  var b=Object.create(m.prototype);b.s=0>a?-1:1;a=0>a?-a:a;var d=w(a,c);b.n=a/d;b.d=c/d;return b}function y(a){for(var c={},b=a,d=2,f=4;f<=b;){for(;0===b%d;)b/=d,c[d]=(c[d]||0)+1;f+=1+2*d++}b!==a?1<b&&(c[b]=(c[b]||0)+1):c[a]=(c[a]||0)+1;return c}function w(a,c){if(!a)return c;if(!c)return a;for(;;){a%=c;if(!a)return c;c%=a;if(!c)return a}}function m(a,c){p(a,c);if(this instanceof m)a=w(e.d,e.n),this.s=e.s,this.n=e.n/a,this.d=e.d/a;else return n(e.s*e.n,e.d)}var e={s:1,n:0,d:1};m.DivisionByZero=Error("Division by Zero");
  m.InvalidParameter=Error("Invalid argument");m.NonIntegerParameter=Error("Parameters must be integer");m.prototype={s:1,n:0,d:1,abs:function(){return n(this.n,this.d)},neg:function(){return n(-this.s*this.n,this.d)},add:function(a,c){p(a,c);return n(this.s*this.n*e.d+e.s*this.d*e.n,this.d*e.d)},sub:function(a,c){p(a,c);return n(this.s*this.n*e.d-e.s*this.d*e.n,this.d*e.d)},mul:function(a,c){p(a,c);return n(this.s*e.s*this.n*e.n,this.d*e.d)},div:function(a,c){p(a,c);return n(this.s*e.s*this.n*e.d,
            this.d*e.n)},clone:function(){return n(this.s*this.n,this.d)},mod:function(a,c){if(isNaN(this.n)||isNaN(this.d))return new m(NaN);if(void 0===a)return n(this.s*this.n%this.d,1);p(a,c);if(0===e.n&&0===this.d)throw m.DivisionByZero;return n(this.s*e.d*this.n%(e.n*this.d),e.d*this.d)},gcd:function(a,c){p(a,c);return n(w(e.n,this.n)*w(e.d,this.d),e.d*this.d)},lcm:function(a,c){p(a,c);return 0===e.n&&0===this.n?n(0,1):n(e.n*this.n,w(e.n,this.n)*w(e.d,this.d))},ceil:function(a){a=Math.pow(10,a||0);return isNaN(this.n)||
    isNaN(this.d)?new m(NaN):n(Math.ceil(a*this.s*this.n/this.d),a)},floor:function(a){a=Math.pow(10,a||0);return isNaN(this.n)||isNaN(this.d)?new m(NaN):n(Math.floor(a*this.s*this.n/this.d),a)},round:function(a){a=Math.pow(10,a||0);return isNaN(this.n)||isNaN(this.d)?new m(NaN):n(Math.round(a*this.s*this.n/this.d),a)},inverse:function(){return n(this.s*this.d,this.n)},pow:function(a,c){p(a,c);if(1===e.d)return 0>e.s?n(Math.pow(this.s*this.d,e.n),Math.pow(this.n,e.n)):n(Math.pow(this.s*this.n,e.n),Math.pow(this.d,
            e.n));if(0>this.s)return null;var b=y(this.n),d=y(this.d),f=1,l=1,k;for(k in b)if("1"!==k){if("0"===k){f=0;break}b[k]*=e.n;if(0===b[k]%e.d)b[k]/=e.d;else return null;f*=Math.pow(k,b[k])}for(k in d)if("1"!==k){d[k]*=e.n;if(0===d[k]%e.d)d[k]/=e.d;else return null;l*=Math.pow(k,d[k])}return 0>e.s?n(l,f):n(f,l)},equals:function(a,c){p(a,c);return this.s*this.n*e.d===e.s*e.n*this.d},compare:function(a,c){p(a,c);var b=this.s*this.n*e.d-e.s*e.n*this.d;return(0<b)-(0>b)},simplify:function(a){if(isNaN(this.n)||
            isNaN(this.d))return this;a=a||.001;for(var c=this.abs(),b=c.toContinued(),d=1;d<b.length;d++){for(var f=n(b[d-1],1),l=d-2;0<=l;l--)f=f.inverse().add(b[l]);if(f.sub(c).abs().valueOf()<a)return f.mul(this.s)}return this},divisible:function(a,c){p(a,c);return!(!(e.n*this.d)||this.n*e.d%(e.n*this.d))},valueOf:function(){return this.s*this.n/this.d},toFraction:function(a){var c,b="",d=this.n,f=this.d;0>this.s&&(b+="-");1===f?b+=d:(a&&0<(c=Math.floor(d/f))&&(b=b+c+" ",d%=f),b=b+d+"/",b+=f);return b},toLatex:function(a){var c,
            b="",d=this.n,f=this.d;0>this.s&&(b+="-");1===f?b+=d:(a&&0<(c=Math.floor(d/f))&&(b+=c,d%=f),b=b+"\\frac{"+d+"}{"+f,b+="}");return b},toContinued:function(){var a=this.n,c=this.d,b=[];if(isNaN(a)||isNaN(c))return b;do{b.push(Math.floor(a/c));var d=a%c;a=c;c=d}while(1!==a);return b},toString:function(a){var c=this.n,b=this.d;if(isNaN(c)||isNaN(b))return"NaN";var d;a:{for(d=b;0===d%2;d/=2);for(;0===d%5;d/=5);if(1===d)d=0;else{for(var f=10%d,l=1;1!==f;l++)if(f=10*f%d,2E3<l){d=0;break a}d=l}}a:{f=1;l=
            10;for(var k=d,t=1;0<k;l=l*l%b,k>>=1)k&1&&(t=t*l%b);l=t;for(k=0;300>k;k++){if(f===l){l=k;break a}f=10*f%b;l=10*l%b}l=0}f=0>this.s?"-":"";f+=c/b|0;(c=c%b*10)&&(f+=".");if(d){for(a=l;a--;)f+=c/b|0,c%=b,c*=10;f+="(";for(a=d;a--;)f+=c/b|0,c%=b,c*=10;f+=")"}else for(a=a||15;c&&a--;)f+=c/b|0,c%=b,c*=10;return f}};"function"===typeof define&&define.amd?define([],function(){return m}):"object"===typeof exports?(Object.defineProperty(m,"__esModule",{value:!0}),m["default"]=m,m.Fraction=m,module.exports=m):
          z.Fraction=m})(this);