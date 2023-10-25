import{h as p}from"./howler-3645baa3.js";import{d as w,r as P,o as _,c as x,a as A}from"./index-2b120759.js";const o=e=>{const a=document.getElementById(e);return{show:()=>a.style="opacity: 1",hide:()=>a.style="opacity: 0.1"}};let n={};function E(){n={BALLS:{"ball-11":o("ball-11"),"ball-13":o("ball-12"),"ball-21":o("ball-21"),"ball-22":o("ball-22"),"ball-23":o("ball-23"),"ball-32":o("ball-32"),"ball-31":o("ball-31"),"ball-33":o("ball-33"),"ball-41":o("ball-41"),"ball-42":o("ball-42"),"ball-43":o("ball-43")},AMY:{"tennis-1":o("tennis-1"),"tennis-2":o("tennis-2"),"tennis-3":o("tennis-3"),"amy-1":o("amy-1"),"amy-3":o("amy-3"),"amy-2":o("amy-2")},ROUGE:{"rouge-2":o("rouge-2"),"rouge-1":o("rouge-1")},HUD:{miss:o("miss"),"score-a1":o("score-a1"),"score-a2":o("score-a2"),"score-a3":o("score-a3"),"score-center":o("score-center"),"score-r1":o("score-r1"),"score-r2":o("score-r2"),"score-r3":o("score-r3")}}}function V(e){const{HUD:a}=n;if(e<-3||e>3)throw new Error("Score can only be in [-3 ... 3]");if(a["score-center"].show(),e<0)for(let t=1;t<=Math.abs(e);t++)a[`score-a${t}`].show();else if(e>0)for(let t=1;t<=Math.abs(e);t++)a[`score-r${t}`].show()}function R({x:e,y:a}){m();const t=n.BALLS[`ball-${a}${e}`];if(!t)throw new Error(`Ball: ${e},${a} does not exist`);t.show()}function b(){Object.keys(n.AMY).forEach(e=>n.AMY[e].hide())}function g(){Object.keys(n.ROUGE).forEach(e=>n.ROUGE[e].hide())}function m(){Object.keys(n.BALLS).forEach(e=>n.BALLS[e].hide())}function k(){m(),b(),g(),Object.keys(n.HUD).forEach(e=>n.HUD[e].hide())}function S(e,a){b(),n.AMY[`amy-${e}`].show(),a&&n.AMY[`tennis-${e}`].show()}function U(e){g(),e<3?n.ROUGE[`rouge-${e}`].show():n.ROUGE["rouge-2"].show()}function v(e){k(),R(e.ballPos),S(e.amyPos,e.amyHandsUp),U(e.rougePos),V(e.score)}function r(e,a,t){return e<a?a:e>t?t:e}function i(e){const a=Math.floor(Math.random()*e.length);return e[a]}const s={left:!1,right:!1,hands:0};function B(e,a){(e.key==="ArrowLeft"||e.key==="A")&&(s.left=a,s.right=!a),e.key===" "&&(s.hands+=2,s.hands+=r(s.hands,0,2)),(e.key==="ArrowRight"||e.key==="D")&&(s.right=a,s.left=!a)}function H(){addEventListener("keydown",e=>B(e,!0))}function M(){s.left=!1,s.right=!1,s.hands=r(s.hands-1,0,2)}const O="arvolleyball/";function c(e){return new p.Howl({src:[`${O}/${e}`]})}const y={hit:c("hit.ogg"),gameOver:c("game_over.ogg"),gameStart:c("game_start.ogg"),miss:c("miss.ogg"),score:c("score.ogg")},l={rougePos:1,amyPos:2,amyHandsUp:0,ballPos:{x:2,y:4},ballVelocity:{y:0,x:0},gameOver:!1,score:0,gameDifficulty:.7};function L(){if(l.score<=-3||l.score>=3){l.gameOver=!0,l.score=0,y.gameOver.play();return}let e=0,a=!1;l.amyHandsUp=r(s.hands-1,0,3);const{ballPos:t}=l;if(t.y===4?l.amyHandsUp&&l.amyPos===t.x?(a=!0,l.ballVelocity.x=i([-1,0,1]),l.amyHandsUp=1):e=-1:t.y===1&&(Math.random()>l.gameDifficulty&&(l.rougePos=t.x),l.rougePos===t.x?(a=!0,l.rougePos===1?l.ballVelocity.x=i([0,1]):l.ballVelocity.x=i([0,-1])):e=1),a&&(y.hit.play(),l.ballVelocity.y=l.ballVelocity.y?l.ballVelocity.y*=-1:-1),l.ballVelocity.y!==0){s.left&&l.amyPos>=2&&l.amyPos--,s.right&&l.amyPos<=3&&l.amyPos++,l.amyPos=r(l.amyPos,1,3);const f=t.x===2&&t.y===2;l.ballVelocity.y===1&&f&&(l.ballVelocity.x=i([0,l.ballVelocity.x])),e!==0&&(l.score+=e,l.ballPos={x:2,y:4},l.amyPos=2,l.ballVelocity.x=0,l.ballVelocity.y=0,e>0?y.score.play():y.miss.play()),l.ballPos.y=r(l.ballPos.y+l.ballVelocity.y,1,4),l.ballPos.x=r(l.ballPos.x+l.ballVelocity.x,1,3)}l.ballPos.x===2&&l.ballPos.y===1&&(l.ballPos.x+=i([-1,1]))}async function u(e,a){const t=document.createElement("img");return t.className=a,t.src=e,t}async function I(){const e=document.createElement("svg");return e.className="lcd-screen",e.innerHTML=await fetch("artennis/artennis.svg").then(a=>a.text()).then(a=>a),e}const $=2;async function d(e){e.appendChild(await u("artennis/artennis_front.jpg","lcd-game")),e.appendChild(await u("artennis/artennis_bg.jpg","lcd-background")),e.appendChild(await I()),E(),H(),setInterval(()=>{L(),v(l),M()},1e3/$)}d();const T=w({__name:"ArtennisView",setup(e){const a=P();return _(()=>{d(a.value)}),(t,h)=>(A(),x("div",{class:"wrapper",ref_key:"element",ref:a},null,512))}});export{T as default};
