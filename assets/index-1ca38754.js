var v=Object.defineProperty;var m=(e,s,o)=>s in e?v(e,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[s]=o;var r=(e,s,o)=>(m(e,typeof s!="symbol"?s+"":s,o),o);(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(t){if(t.ep)return;t.ep=!0;const i=o(t);fetch(t.href,i)}})();const u=6674e-14,w=45e11,g=5520,p=86400;class y{constructor({x:s,y:o,vx:n,vy:t,mass:i}){r(this,"x");r(this,"y");r(this,"vx");r(this,"vy");r(this,"mass");r(this,"radius");r(this,"nextX",0);r(this,"nextY",0);r(this,"nextVx",0);r(this,"nextVy",0);this.x=s,this.y=o,this.vx=n,this.vy=t,this.mass=i,this.radius=(3*this.mass/(4*Math.PI*g))**(1/3)}move(){this.x=this.nextX,this.y=this.nextY,this.vx=this.nextVx,this.vy=this.nextVy}}const a=[new y({x:0,y:0,vx:0,vy:0,mass:1989e27}),new y({x:57909e6,y:0,vx:0,vy:47360,mass:33011e19}),new y({x:108209e6,y:0,vx:0,vy:35020,mass:48675e20}),new y({x:149596e6,y:0,vx:0,vy:29780,mass:59724e20}),new y({x:227923e6,y:0,vx:0,vy:24070,mass:64171e19}),new y({x:77857e7,y:0,vx:0,vy:13e3,mass:189819e22}),new y({x:1433529e6,y:0,vx:0,vy:9680,mass:56834e22}),new y({x:2872463e6,y:0,vx:0,vy:6800,mass:86813e21}),new y({x:449506e7,y:0,vx:0,vy:5430,mass:102413e21})];function O(){for(let e=0,s=10;e<p;e+=s){for(let o=0;o<a.length;o++){const n=a[o],t=[0,0];for(let d=0;d<a.length;d++){if(o===d)continue;const f=a[d],l=u*n.mass*f.mass/((f.x-n.x)**2+(f.y-n.y)**2)**(3/2);t[0]+=l*(f.x-n.x),t[1]+=l*(f.y-n.y)}const i=t[0]/n.mass,c=t[1]/n.mass;n.nextX=n.x+n.vx*s+.5*i*s**2,n.nextY=n.y+n.vy*s+.5*c*s**2,n.nextVx=n.vx+i*s,n.nextVy=n.vy+c*s}for(let o=0;o<a.length;o++)a[o].move()}}function x(e){O();const s=Math.min(e.canvas.width,e.canvas.height)/(2*w),o=e.canvas.width/2,n=e.canvas.height/2;e.fillStyle="white",e.beginPath();for(let t=0;t<a.length;t++){const i=a[t].x*s+o,c=a[t].y*s+n,d=Math.max(a[t].radius*s,.5);e.moveTo(i+d,c),e.arc(i,c,d,0,2*Math.PI,!1)}e.fill(),window.requestAnimationFrame(()=>x(e))}function h(e){e.width=window.innerWidth,e.height=window.innerHeight}function b(){const e=document.getElementById("canvas"),s=e.getContext("2d");h(e),window.addEventListener("resize",()=>h(e)),x(s)}window.addEventListener("load",b);
