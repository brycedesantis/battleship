(()=>{"use strict";const t=function(t,e){const n={id:t,length:e,hits:[],sunk:!1,direction:"horizontal"};function r(){if(n.hits.length===n.length)return n.sunk=!0,n.sunk}return{stats:n,hit:function(t){n.hits.push(t),r()},getHits:function(){return n.hits},isSunk:r,getDirection:function(){return n.direction},changeDirection:function(){"horizontal"===n.direction?n.direction="vertical":n.direction="horizontal"}}},e=function(e="computer"){return{name:e,fleet:{Carrier:t("carrier",5),Battleship:t("battleship",4),Destroyer:t("destroyer",3),Submarine:t("submarine",3),Patrol:t("patrol",2)},attack:function(t,e,n){n.receiveAttack(t,e)},randomAttack:function t(e){let n=Math.floor(10*Math.random()),r=Math.floor(10*Math.random());const a=e.getOcean()[n][r];"miss"===a||"hit"===a?t(e):e.receiveAttack(n,r)}}},n=()=>{let t=Array(10).fill("ocean").map((()=>Array(10).fill("ocean"))),n=[];function r(t,e,n,r){let a=t,o=e+n;return"vertical"===r&&(a=t+n,o=e),[a,o]}function a(e,a,o){const c=t,i=e.getDirection(),l=function(e,n,a,o){const c=[];for(let i=0;i<a;i++){const[a,l]=r(e,n,i,o);if(!(a<10&&l<10))return!1;c.push(t[a][l])}return c.every((t=>"ocean"===t))}(a,o,e.stats.length,i);if(l){for(let t=0;t<e.stats.length;t++){const[n,l]=r(a,o,t,i);c[n][l]={ship:e,index:t}}return n.push(e),l}return l}function o(t){let e=Math.floor(10*Math.random()),n=Math.floor(10*Math.random());Math.random()>.5&&t.changeDirection(),a(t,e,n)||o(t)}return{getOcean:function(){return t},atPosition:function(e,n){return t[e][n]},placeShip:a,receiveAttack:function(e,n){return"ocean"===t[e][n]?(t[e][n]="miss",n):(t[e][n].ship&&(t[e][n].ship.hit(t[e][n].index),t[e][n]="hit"),t[e][n])},allSunk:function(){return n.every((t=>t.isSunk()))},allPlaced:function(){return n.length===Object.keys(e().fleet).length},autoPlaceFleet:function(t){for(const e in t)o(t[e])},resetOcean:function(){t=Array(10).fill("ocean").map((()=>Array(10).fill("ocean"))),n=[]}}},r=function(){const t=(t,e,n)=>`<div class='gamesquare ${n}' data-y=${t} data-x=${e}></div>`;return{makeBoard:function(e,n,r){e.textContent="";const a=n.getOcean(),o=a.length;let c="";for(let e=0;e<o;e++)for(let n=0;n<o;n++){let o=a[e][n];"ocean"===o?o="ocean":o.ship&&(o="computer"!==r.name?o.ship.stats.id:"ocean"),c+=t(e,n,o)}e.insertAdjacentHTML("afterbegin",c)}}},a=function(){const t=e("player 1"),a=e(),o=n(),c=n(),i=document.querySelector(".player-grid"),l=document.querySelector(".computer-grid");function u(){r().makeBoard(i,o,t.fleet),r().makeBoard(l,c,a.fleet)}function s(e){let n=e.target;if(n.classList.contains("gamesquare")){const e=n.dataset.y,r=n.dataset.x,i=c.getOcean()[e][r];if("miss"!==i&&"hit"!==i&&(t.attack(e,r,c),a.randomAttack(o),u()),c.allSunk()||o.allSunk()){let e=c.allSunk()?t.name:a.name;const n=document.querySelector(".game-over-screen"),r=document.querySelector(".end-screen");document.querySelector(".main").classList.add("blur"),n.style.display="flex",r.innerHTML=`\n\t\t\t\t<h1>GAME OVER</h1>\n\t\t\t\t<h3>${e} WINS!</h3>\n\t\t\t\t`}}}return{player1:t,player2:a,player1Board:o,player2Board:c,renderBoard:u,autoPlace:function(){o.resetOcean(),c.resetOcean(),o.autoPlaceFleet(t.fleet),c.autoPlaceFleet(a.fleet),u()},clickEvents:function(){l.addEventListener("click",s)}}}();a.autoPlace(),a.clickEvents()})();