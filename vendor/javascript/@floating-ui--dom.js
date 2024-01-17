import{rectToClientRect as t,autoPlacement as e,shift as n,flip as o,size as i,hide as s,arrow as c,inline as r,limitShift as l,computePosition as f}from"@floating-ui/core";export{detectOverflow,offset}from"@floating-ui/core";import{round as a,createCoords as u,max as g,min as h,floor as d}from"@floating-ui/utils";import{getComputedStyle as p,isHTMLElement as m,isElement as x,getWindow as R,isWebKit as w,getDocumentElement as y,getNodeName as v,isOverflowElement as C,getNodeScroll as b,getParentNode as O,isLastTraversableNode as T,getOverflowAncestors as L,isContainingBlock as P,isTableElement as B,getContainingBlock as E}from"@floating-ui/utils/dom";export{getOverflowAncestors}from"@floating-ui/utils/dom";function getCssDimensions(t){const e=p(t);let n=parseFloat(e.width)||0;let o=parseFloat(e.height)||0;const i=m(t);const s=i?t.offsetWidth:n;const c=i?t.offsetHeight:o;const r=a(n)!==s||a(o)!==c;if(r){n=s;o=c}return{width:n,height:o,$:r}}function unwrapElement(t){return x(t)?t:t.contextElement}function getScale(t){const e=unwrapElement(t);if(!m(e))return u(1);const n=e.getBoundingClientRect();const{width:o,height:i,$:s}=getCssDimensions(e);let c=(s?a(n.width):n.width)/o;let r=(s?a(n.height):n.height)/i;c&&Number.isFinite(c)||(c=1);r&&Number.isFinite(r)||(r=1);return{x:c,y:r}}const A=u(0);function getVisualOffsets(t){const e=R(t);return w()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:A}function shouldAddVisualOffsets(t,e,n){e===void 0&&(e=false);return!(!n||e&&n!==R(t))&&e}function getBoundingClientRect(e,n,o,i){n===void 0&&(n=false);o===void 0&&(o=false);const s=e.getBoundingClientRect();const c=unwrapElement(e);let r=u(1);n&&(i?x(i)&&(r=getScale(i)):r=getScale(e));const l=shouldAddVisualOffsets(c,o,i)?getVisualOffsets(c):u(0);let f=(s.left+l.x)/r.x;let a=(s.top+l.y)/r.y;let g=s.width/r.x;let h=s.height/r.y;if(c){const t=R(c);const e=i&&x(i)?R(i):i;let n=t.frameElement;while(n&&i&&e!==t){const t=getScale(n);const e=n.getBoundingClientRect();const o=p(n);const i=e.left+(n.clientLeft+parseFloat(o.paddingLeft))*t.x;const s=e.top+(n.clientTop+parseFloat(o.paddingTop))*t.y;f*=t.x;a*=t.y;g*=t.x;h*=t.y;f+=i;a+=s;n=R(n).frameElement}}return t({width:g,height:h,x:f,y:a})}function convertOffsetParentRelativeRectToViewportRelativeRect(t){let{rect:e,offsetParent:n,strategy:o}=t;const i=m(n);const s=y(n);if(n===s)return e;let c={scrollLeft:0,scrollTop:0};let r=u(1);const l=u(0);if(i||!i&&o!=="fixed"){(v(n)!=="body"||C(s))&&(c=b(n));if(m(n)){const t=getBoundingClientRect(n);r=getScale(n);l.x=t.x+n.clientLeft;l.y=t.y+n.clientTop}}return{width:e.width*r.x,height:e.height*r.y,x:e.x*r.x-c.scrollLeft*r.x+l.x,y:e.y*r.y-c.scrollTop*r.y+l.y}}function getClientRects(t){return Array.from(t.getClientRects())}function getWindowScrollBarX(t){return getBoundingClientRect(y(t)).left+b(t).scrollLeft}function getDocumentRect(t){const e=y(t);const n=b(t);const o=t.ownerDocument.body;const i=g(e.scrollWidth,e.clientWidth,o.scrollWidth,o.clientWidth);const s=g(e.scrollHeight,e.clientHeight,o.scrollHeight,o.clientHeight);let c=-n.scrollLeft+getWindowScrollBarX(t);const r=-n.scrollTop;p(o).direction==="rtl"&&(c+=g(e.clientWidth,o.clientWidth)-i);return{width:i,height:s,x:c,y:r}}function getViewportRect(t,e){const n=R(t);const o=y(t);const i=n.visualViewport;let s=o.clientWidth;let c=o.clientHeight;let r=0;let l=0;if(i){s=i.width;c=i.height;const t=w();if(!t||t&&e==="fixed"){r=i.offsetLeft;l=i.offsetTop}}return{width:s,height:c,x:r,y:l}}function getInnerBoundingClientRect(t,e){const n=getBoundingClientRect(t,true,e==="fixed");const o=n.top+t.clientTop;const i=n.left+t.clientLeft;const s=m(t)?getScale(t):u(1);const c=t.clientWidth*s.x;const r=t.clientHeight*s.y;const l=i*s.x;const f=o*s.y;return{width:c,height:r,x:l,y:f}}function getClientRectFromClippingAncestor(e,n,o){let i;if(n==="viewport")i=getViewportRect(e,o);else if(n==="document")i=getDocumentRect(y(e));else if(x(n))i=getInnerBoundingClientRect(n,o);else{const t=getVisualOffsets(e);i={...n,x:n.x-t.x,y:n.y-t.y}}return t(i)}function hasFixedPositionAncestor(t,e){const n=O(t);return!(n===e||!x(n)||T(n))&&(p(n).position==="fixed"||hasFixedPositionAncestor(n,e))}function getClippingElementAncestors(t,e){const n=e.get(t);if(n)return n;let o=L(t,[],false).filter((t=>x(t)&&v(t)!=="body"));let i=null;const s=p(t).position==="fixed";let c=s?O(t):t;while(x(c)&&!T(c)){const e=p(c);const n=P(c);n||e.position!=="fixed"||(i=null);const r=s?!n&&!i:!n&&e.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||C(c)&&!n&&hasFixedPositionAncestor(t,c);r?o=o.filter((t=>t!==c)):i=e;c=O(c)}e.set(t,o);return o}function getClippingRect(t){let{element:e,boundary:n,rootBoundary:o,strategy:i}=t;const s=n==="clippingAncestors"?getClippingElementAncestors(e,this._c):[].concat(n);const c=[...s,o];const r=c[0];const l=c.reduce(((t,n)=>{const o=getClientRectFromClippingAncestor(e,n,i);t.top=g(o.top,t.top);t.right=h(o.right,t.right);t.bottom=h(o.bottom,t.bottom);t.left=g(o.left,t.left);return t}),getClientRectFromClippingAncestor(e,r,i));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function getDimensions(t){const{width:e,height:n}=getCssDimensions(t);return{width:e,height:n}}function getRectRelativeToOffsetParent(t,e,n){const o=m(e);const i=y(e);const s=n==="fixed";const c=getBoundingClientRect(t,true,s,e);let r={scrollLeft:0,scrollTop:0};const l=u(0);if(o||!o&&!s){(v(e)!=="body"||C(i))&&(r=b(e));if(o){const t=getBoundingClientRect(e,true,s,e);l.x=t.x+e.clientLeft;l.y=t.y+e.clientTop}else i&&(l.x=getWindowScrollBarX(i))}return{x:c.left+r.scrollLeft-l.x,y:c.top+r.scrollTop-l.y,width:c.width,height:c.height}}function getTrueOffsetParent(t,e){return m(t)&&p(t).position!=="fixed"?e?e(t):t.offsetParent:null}function getOffsetParent(t,e){const n=R(t);if(!m(t))return n;let o=getTrueOffsetParent(t,e);while(o&&B(o)&&p(o).position==="static")o=getTrueOffsetParent(o,e);return o&&(v(o)==="html"||v(o)==="body"&&p(o).position==="static"&&!P(o))?n:o||E(t)||n}const getElementRects=async function(t){let{reference:e,floating:n,strategy:o}=t;const i=this.getOffsetParent||getOffsetParent;const s=this.getDimensions;return{reference:getRectRelativeToOffsetParent(e,await i(n),o),floating:{x:0,y:0,...await s(n)}}};function isRTL(t){return p(t).direction==="rtl"}const F={convertOffsetParentRelativeRectToViewportRelativeRect:convertOffsetParentRelativeRectToViewportRelativeRect,getDocumentElement:y,getClippingRect:getClippingRect,getOffsetParent:getOffsetParent,getElementRects:getElementRects,getClientRects:getClientRects,getDimensions:getDimensions,getScale:getScale,isElement:x,isRTL:isRTL};function observeMove(t,e){let n=null;let o;const i=y(t);function cleanup(){clearTimeout(o);n&&n.disconnect();n=null}function refresh(s,c){s===void 0&&(s=false);c===void 0&&(c=1);cleanup();const{left:r,top:l,width:f,height:a}=t.getBoundingClientRect();s||e();if(!f||!a)return;const u=d(l);const p=d(i.clientWidth-(r+f));const m=d(i.clientHeight-(l+a));const x=d(r);const R=-u+"px "+-p+"px "+-m+"px "+-x+"px";const w={rootMargin:R,threshold:g(0,h(1,c))||1};let y=true;function handleObserve(t){const e=t[0].intersectionRatio;if(e!==c){if(!y)return refresh();e?refresh(false,e):o=setTimeout((()=>{refresh(false,1e-7)}),100)}y=false}try{n=new IntersectionObserver(handleObserve,{...w,root:i.ownerDocument})}catch(t){n=new IntersectionObserver(handleObserve,w)}n.observe(t)}refresh(true);return cleanup}
/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */function autoUpdate(t,e,n,o){o===void 0&&(o={});const{ancestorScroll:i=true,ancestorResize:s=true,elementResize:c=typeof ResizeObserver==="function",layoutShift:r=typeof IntersectionObserver==="function",animationFrame:l=false}=o;const f=unwrapElement(t);const a=i||s?[...f?L(f):[],...L(e)]:[];a.forEach((t=>{i&&t.addEventListener("scroll",n,{passive:true});s&&t.addEventListener("resize",n)}));const u=f&&r?observeMove(f,n):null;let g=-1;let h=null;if(c){h=new ResizeObserver((t=>{let[o]=t;if(o&&o.target===f&&h){h.unobserve(e);cancelAnimationFrame(g);g=requestAnimationFrame((()=>{h&&h.observe(e)}))}n()}));f&&!l&&h.observe(f);h.observe(e)}let d;let p=l?getBoundingClientRect(t):null;l&&frameLoop();function frameLoop(){const e=getBoundingClientRect(t);!p||e.x===p.x&&e.y===p.y&&e.width===p.width&&e.height===p.height||n();p=e;d=requestAnimationFrame(frameLoop)}n();return()=>{a.forEach((t=>{i&&t.removeEventListener("scroll",n);s&&t.removeEventListener("resize",n)}));u&&u();h&&h.disconnect();h=null;l&&cancelAnimationFrame(d)}}const S=e;const V=n;const W=o;const D=i;const H=s;const z=c;const I=r;const M=l;const computePosition=(t,e,n)=>{const o=new Map;const i={platform:F,...n};const s={...i.platform,_c:o};return f(t,e,{...i,platform:s})};export{z as arrow,S as autoPlacement,autoUpdate,computePosition,W as flip,H as hide,I as inline,M as limitShift,F as platform,V as shift,D as size};

