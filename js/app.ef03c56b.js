(function(e){function t(t){for(var r,o,c=t[0],u=t[1],l=t[2],s=0,h=[];s<c.length;s++)o=c[s],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&h.push(a[o][0]),a[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);d&&d(t);while(h.length)h.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,c=1;c<n.length;c++){var u=n[c];0!==a[u]&&(r=!1)}r&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},a={app:0},i=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var d=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"2bb7":function(e,t,n){},"57c6":function(e,t,n){"use strict";var r=n("2bb7"),a=n.n(r);a.a},"905b":function(e,t,n){"use strict";var r=n("ac13"),a=n.n(r);a.a},ac13:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("vue-backpropagation-exercise",{attrs:{data:e.example.netTree,func:e.example.netFuncTex,height:600,width:700,expectedOut:5,errorPrecisionDigits:5,errorFunc:e.example.errFuncTex,netErrorHandler:e.example.errorHandler,debug:!1,submissionValidator:e.handleSubmit,editable:"w_1",lang:"en"}})],1)},i=[],o=n("d4ec"),c=n("bee2"),u=n("99de"),l=n("7e84"),d=n("262e"),s=n("9ab4"),h=n("60a3"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"backpropexercise"},[n("div",{staticClass:"top-controls controls"},[n("p",{staticClass:"important"},[e._v(" "+e._s(e.tl("tip"))+" ")]),n("table",{staticClass:"net-functions"},[n("tr",[n("td",[e._v(e._s(e.tl("netFunction")))]),n("td",[e._v(e._s(e.tl("errFunction")))])]),e._m(0)]),n("ul",{staticClass:"legend",on:{click:function(t){return e.toggleStep(e.currentStep)}}},[n("li",{class:{"inactive-step":"BP"==this.currentStep}},[n("span",{staticClass:"ff bubble"}),e._v(" Feedforward "+e._s(e.tl("step"))+" ")]),n("li",{class:{"inactive-step":"BP"!=this.currentStep}},[n("span",{staticClass:"bp bubble"}),e._v(" Backpropagation "+e._s(e.tl("step"))+" ")])])]),n("div",{staticClass:"computation-graph"}),n("div",{staticClass:"bottom-controls controls"},[1==e.debug?n("div",[n("span",{staticClass:"debug-button",on:{click:function(t){return e.feedforward(e.root)}}},[e._v("Debug: Add FF")]),n("span",{staticClass:"debug-button",on:{click:function(t){return e.backpropagation()}}},[e._v("Debug: Add BP")])]):e._e(),n("div",[n("div",{directives:[{name:"show",rawName:"v-show",value:"WOW"===this.currentStep,expression:"this.currentStep === 'WOW'"}],staticClass:"weight-slider-controls"},[n("p",{domProps:{innerHTML:e._s(e.wowInstructions)}}),n("p",[n("label",{attrs:{for:"points"}},[e._v(e._s(e.tl("change"))+" "),n("span",{staticClass:"editable-weight"}),e._v(": ")]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.weightSliderValue,expression:"weightSliderValue"}],attrs:{type:"range",id:"weight-slider-input",name:"weight",min:"-100",max:"100"},domProps:{value:e.weightSliderValue},on:{__r:function(t){e.weightSliderValue=t.target.value}}}),n("span",{staticClass:"weight-change",class:[e.weightChange.value>=0?"positive":"negative"]},[e._v(" "+e._s(e.weightChange.formatted)+" ")])]),n("p",[e._v(" "+e._s(e.tl("change"))+" "),n("span",{staticClass:"editable-weight"}),e._v(" "+e._s(e.tl("to"))+" "+e._s(e.newEditableWeightValue.toFixed(2))+" ("),n("span",{staticClass:"weight-change",class:[e.weightChange.value>=0?"positive":"negative"]},[e._v(e._s(e.weightChange.formatted))]),e._v(") "+e._s(e.tl("yieldsError"))+" "+e._s(e.totalNetError.toFixed(e.errorPrecisionDigits))+" ("),n("span",{staticClass:"weight-change",class:[e.costChange.value>=0?"positive":"negative"]},[e._v(e._s(e.costChange.formatted))]),e._v(") ")])])]),"WOW"!=this.currentStep?n("span",{staticClass:"proceed-button",class:{disabled:e.submitted,submit:"BP"===e.currentStep&&!e.submitted},on:{click:e.proceed}},[e._v(" "+e._s(e.proceedButtonText)+" ")]):e._e()])])},p=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("tr",[n("td",[n("div",{staticClass:"net-function",attrs:{id:"net-function"}})]),n("td",[n("div",{staticClass:"net-function",attrs:{id:"err-function"}})])])}],v=(n("99af"),n("4de4"),n("4160"),n("a15b"),n("d81d"),n("13d5"),n("fb6a"),n("b680"),n("d3b7"),n("ac1f"),n("25f0"),n("3ca3"),n("5319"),n("159b"),n("ddb0"),n("2b3d"),n("2909")),g=n("5698"),b=n("3b2f"),w=n.n(b);function m(e,t,n,r,a){function i(e){return e*e*e}function o(e){return 3*e*e*(1-e)}function c(e){return 3*e*(1-e)*(1-e)}function u(e){return(1-e)*(1-e)*(1-e)}var l={x:0,y:0};return l.x=t.x*i(e)+n.x*o(e)+r.x*c(e)+a.x*u(e),l.y=t.y*i(e)+n.y*o(e)+r.y*c(e)+a.y*u(e),l}function y(e,t,n){var r=(e.y+t.y)/2,a={x:e.y,y:e.x},i={x:t.y,y:t.x};return m(n,a,{x:r,y:e.x},{x:r,y:t.x},i)}function x(e,t){var n="M ".concat(e.y," ").concat(e.x,"\n                C ").concat((e.y+t.y)/2," ").concat(e.x,",\n                  ").concat((e.y+t.y)/2," ").concat(t.x,",\n                  ").concat(t.y," ").concat(t.x);return n}n("a9e3"),n("38cf");function _(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return e.replace(/{(\d+)}/g,(function(e,t){return"undefined"!=typeof n[t]?n[t]:e}))}function O(e,t){return Math.round(e*Math.pow(10,t))/Math.pow(10,t)}function E(e){return O(e,2)}function k(e,t,n){return("0".repeat(t)+O(e,n).toFixed(n)).slice(-t-n)}function F(e){return/^(-|\+)?([0-9]+(\.[0-9]+)?)$/.test(e)?Number(e):NaN}var j,I;n("4ec9");(function(e){e["FF"]="FF",e["BP"]="BP",e["WOW"]="WOW"})(j||(j={})),function(e){e["DE"]="de",e["EN"]="en"}(I||(I={}));var S={submit:new Map([[I.DE,"Lösung einreichen"],[I.EN,"Submit solution"]]),netFunction:new Map([[I.DE,"Dieses Netz berechnet die folgende Funktion:"],[I.EN,"This network calculates the following function:"]]),errFunction:new Map([[I.DE,"Dieses Netz nutzt die folgende Fehlerfunktion:"],[I.EN,"This network uses the following cost function:"]]),tip:new Map([[I.DE,"Tipp: Benutze Stift und Papier für diese Übung! Das Formular dient nur zur Abgabe!"],[I.EN,"Tip: Use pen and paper to solve this exercise! This form is only for the submission!"]]),invalidNumber:new Map([[I.DE,'Der eingegebene Wert "{0}" ist keine gültige Zahl!'],[I.EN,"The number {0} you entered is not a valid number!"]]),missingValues:new Map([[I.DE,"Es fehlen {0} Eingabewert(e)!"],[I.EN,"{0} value(s) are missing!"]]),wrongFFValue:new Map([[I.DE,"Bist du dir sicher? Wir haben {0} andere(n) Wert(e) heraus! Tip: {1} sieht falsch aus. Alle Werte davor stimmen, also versuche doch nochmal diesen Wert zu berechnen ;)"],[I.EN,"Are you sure? We have {0} value(s) different! Hint: {1} seems wrong. All values before are correct, so try to recalculate this number ;)"]]),change:new Map([[I.DE,"Änderung von"],[I.EN,"Changing"]]),to:new Map([[I.DE,"zu"],[I.EN,"to"]]),submitted:new Map([[I.DE,"Abgegeben"],[I.EN,"Submitted"]]),yieldsError:new Map([[I.DE,"ergibt einen Fehler von"],[I.EN,"yields error"]]),step:new Map([[I.DE,"Schritt"],[I.EN,"Step"]]),expected:new Map([[I.DE,"Soll-Wert"],[I.EN,"Expected"]]),nextStep:new Map([[I.DE,"Weiter zum Backpropagation Schritt"],[I.EN,"Move on to the backpropagation step"]]),thanks:new Map([[I.DE,"Danke dass du dir Zeit für diese Übung genommen hast! Deine Ergebnisse wurden an den Server übermittelt und du wirst gleich eine Antwort erhalten!"],[I.EN,"Thank you for taking the time for this exercise! Your results were successfully transmitted to the server and you will receive an answer shortly!"]]),resultSuccess:new Map([[I.DE,"Deine Werte sind alle korrekt! Sehr gut gemacht!"],[I.EN,"All your values are correct! Good job!"]]),resultError:new Map([[I.DE,"Die Werte sind leider nicht alle korrekt. Versuche es doch noch einmal, du hast so viele Versuche wie du brauchst."],[I.EN,"Not all your values are correct. Try again and take your time!"]]),whywow:new Map([[I.DE,"Du hast erfolreich den Backpropagation Schritt durchgeführt! Nun kannst du deine berechneten Gradienten einmal selbst nutzen um den Fehler dieses Netzes zu verringern! Du errinnerst dich bestimmt daran, dass der Gradient eines Gewichtes/Bias uns sagt mit welcher Intensität das Gewicht/Bias vergrößert oder verkleinert werden sollte. Probiere doch einmal das Netz mit dem Schieberegler unten auf dieser Seite zu verbessern :)"],[I.EN,"You have successfully performed the backpropagation step! You can now use your calculated gradients to decrease the network's error! You might remember that the gradient of a weight/bias tells us how much this weight/bias needs to be increased or decreased to minimize the error. Go ahead and try to improve this network with the slider at the bottom of the page :)"]]),wowinstructions:new Map([[I.DE,"Hier kannst du den Wert von {0} anpassen und sehen, wie sich die Änderung auf den Fehler des Netzes auswirkt. Du wirst sehen, dass sich der Fehler bei Änderung in Richtung des negativen Gradienten verringern wird. Nichts anderes passiert im Gradient Descent Verfahren beim Trainieren von künstlichen neuronalen Netzen..."],[I.EN,"Here you can change the value of {0} and see how the changes will affect the networks error. You will see that the error decreases when {0} is changed in the direction of the negative gradient. This is what is done with Gradient Descent during training of artificial neural networks..."]])},V="\n\\begin{aligned}\n    &C(w_0, x_0, w_1, x_1, b, e) \\\\\n  = &(n(w_0, x_0, w_1, x_1, b) - e)^2\n\\end{aligned}",N=function(e,t){return E(Math.pow(E(e)-E(t),2))},B=function(e){function t(){var e;Object(o["a"])(this,t),e=Object(u["a"])(this,Object(l["a"])(t).call(this)),e.weightSliderValue=0,e.newEditableWeightValue=.5,e.ffOverrides={},e.netErrorCausedValue=.5,e.totalNetError=0,e.initialNetError=0,e.submitted=!1,e.currentStep=j.FF,e.treeData={func:"",nodeId:-1,accumulate:function(e){return e.reduce((function(e,t){return e+t}),0)},bpValue:1,children:[e.data]},e.tree=g["c"]().size([e.height,e.width]);var n=g["a"](e.treeData,(function(e){return e.children}));return e.svg=g["b"]("div.computation-graph"),e.treeMap=e.tree(n),e.nodes=e.treeMap.descendants(),e.root=e.nodes[0],e.links=e.treeMap.descendants().slice(1),e.links.forEach((function(t){var n,r;void 0!=(null===(n=t.data)||void 0===n?void 0:n.ffValue)&&(e.ffOverrides[e.inputId(t,j.FF)]=null===(r=t.data)||void 0===r?void 0:r.ffValue)})),e.initialNetError=O(e.netErrorHandler(O(e.feedforward(e.root,void 0,!0).out,e.errorPrecisionDigits),O(e.expectedOut,e.errorPrecisionDigits)),e.errorPrecisionDigits),e}return Object(d["a"])(t,e),Object(c["a"])(t,[{key:"onWeightSliderValue",value:function(e){var t=this,n=this.links.filter((function(e){return e.data.func===t.editable})).map((function(n){var r=document.getElementById(t.inputId(n,j.FF));if(null!=r&&void 0!=r){var a=F(e.replace(",","."));if(!isNaN(a)){var i,o;r.disabled=!0;var c=E(E(null!==(i=n.data.ffValue)&&void 0!==i?i:0)+t.weightSliderRelativeRange*E(null!==(o=n.data.ffValue)&&void 0!==o?o:0)*(E(a)/100));r.value=c.toString(),n.data.currentFFValue=c;var u=t.feedforward(t.root).out;return t.updateError(u,t.expectedOut),c}}return NaN}));this.newEditableWeightValue=n[0]}},{key:"tl",value:function(e){var t,n;return null!==(t=S[e].get(null!==(n=this.lang)&&void 0!==n?n:I.EN))&&void 0!==t?t:"<missing translation>"}},{key:"inputId",value:function(e,t){var n,r,a;return"".concat(t===j.FF?"ff":"bp","_").concat(e.data.nodeId,"_to_").concat(null!==(n=null===(r=e.parent)||void 0===r||null===(a=r.data)||void 0===a?void 0:a.nodeId)&&void 0!==n?n:"undefined")}},{key:"validFFInputValues",value:function(){var e=this,t=this.feedforward(this.root,void 0,!0).acc,n=[],r=[],a=0;return this.links.forEach((function(i){var o=e.inputId(i,j.FF),c=document.getElementById(o);void 0===i.data.ffValue&&null!=c&&void 0!=c&&(c.value.length<1?n.push(o):Math.abs(F(c.value)-t[o])>a&&r.push({id:o,value:c.value}))})),n.length>0?(alert(_(this.tl("missingValues"),n.length.toString())),!1):!(r.length>0)||(alert(_(this.tl("wrongFFValue"),r.length.toString(),r[r.length-1].value.toString())),!1)}},{key:"validBPInputValues",value:function(){var e=this,t=[];return this.links.forEach((function(n){var r=e.inputId(n,j.BP),a=document.getElementById(r);void 0===n.data.bpValue&&null!=a&&void 0!=a&&a.value.length<1&&t.push(r)})),!(t.length>0)||(alert(_(this.tl("missingValues"),t.length.toString())),!1)}},{key:"collectBPInputValues",value:function(){var e=this,t={};return this.links.forEach((function(n){var r=e.inputId(n,j.BP),a=document.getElementById(r);void 0===n.data.bpValue&&null!=a&&void 0!=a&&(t[r]=F(a.value))})),t}},{key:"proceed",value:function(){if(!this.submitted)if(this.currentStep==j.FF){if(!this.validFFInputValues())return;this.toggleStep(j.BP),this.currentStep=j.BP;var e=this.feedforward(this.root).out;this.updateError(e,this.expectedOut)}else if(this.currentStep==j.BP){if(!this.validBPInputValues())return;var t,n=this.collectBPInputValues(),r=this.backpropagation(!0);n.length==r.length&&(t=JSON.stringify(n)===JSON.stringify(r));var a,i=this.submissionValidator(n,r,t);if(alert(this.tl("thanks")),i.valid)alert("".concat(this.tl("resultSuccess"),"\n").concat(null!==(a=i.message)&&void 0!==a?a:"")),this.submitted=!0,alert(this.tl("whywow")),this.toggleStep(j.WOW),this.currentStep=j.WOW;else alert(this.tl("resultError"))}}},{key:"mounted",value:function(){var e=this,t=document.getElementById("net-function");null!=t&&w.a.render(this.func,t,{throwOnError:!1});var n=document.getElementById("err-function");null!=n&&w.a.render(this.errorFunc,n,{throwOnError:!1}),window.checkUserNumberInput=function(t){var n=t.value;if(void 0!=n&&null!=n&&n.length>0){var r=F(n.replace(",","."));if(isNaN(r))return alert(_(e.tl("invalidNumber"),n)),void(t.value="");var a=E(r);t.value=a.toFixed(2)}},this.svg=g["b"]("div.computation-graph").append("svg").attr("viewBox","-".concat(this.padding," 0 ").concat(this.width+1.5*this.padding," ").concat(this.height)).style("font-size","0.5rem"),this.svg.append("defs").selectAll("marker").data(["resolved"]).join("marker").attr("id",(function(e){return"arrow-".concat(e)})).attr("viewBox","0 -5 10 10").attr("refX","".concat(this.arrowSize+Math.round(this.circleRadius/2)+1)).attr("refY","0px").attr("markerWidth","".concat(this.arrowSize)).attr("markerHeight","".concat(this.arrowSize)).append("path").attr("fill",this.arrowColor).attr("d","M0,-5L10,0L0,5"),this.build(this.root)}},{key:"toggleInputsForStep",value:function(e){var t=this;this.links.forEach((function(n){var r=document.getElementById(t.inputId(n,j.FF)),a=document.getElementById(t.inputId(n,j.BP));void 0===n.data.ffValue&&null!=r&&void 0!=r&&(r.style["border"]=e!=j.FF?"none":"1px solid ".concat(t.greenColor),r.disabled=e!=j.FF),null!=a&&void 0!=a&&(void 0===n.data.bpValue&&(a.disabled=e!=j.BP,a.style["border"]=e!=j.BP?"none":"1px solid ".concat(t.redColor)),a.hidden=e!=j.BP)}))}},{key:"orientForStep",value:function(e){return e===j.BP?180:0}},{key:"toggleArrowsForStep",value:function(e){this.svg.selectAll("defs marker").attr("orient",this.orientForStep(e)),e==j.FF&&this.svg.selectAll("path.link").attr("marker-end","url(".concat(new URL("#arrow-resolved",window.location.href),")")).attr("marker-start","none"),e==j.BP&&this.svg.selectAll("path.link").attr("marker-end","none").attr("marker-start","url(".concat(new URL("#arrow-resolved",window.location.href),")"))}},{key:"feedforward",value:function(e,t,n){var r,a=this;void 0==t&&(t={});var i=(null!==(r=null===e||void 0===e?void 0:e.children)&&void 0!==r?r:[]).map((function(e){var r,i,o,c;return void 0!=(null===(r=e.data)||void 0===r?void 0:r.currentFFValue)?E(null===(i=e.data)||void 0===i?void 0:i.currentFFValue):void 0!=(null===(o=e.data)||void 0===o?void 0:o.ffValue)?E(null===(c=e.data)||void 0===c?void 0:c.ffValue):a.feedforward(e,t,n).out})),o=E(e.data.accumulate(i));if(e.parent){var c=this.inputId(e,j.FF);if(t[c]=o,!0!==n){var u=document.getElementById(c);null!=u&&void 0!=u&&(u.style.setProperty("font-weight",F(u.value)!==o?"bold":"normal"),u.value=o.toString())}}return{out:o,acc:t}}},{key:"backpropagation",value:function(e){var t=this,n={};return this.links.forEach((function(r){var a=t.inputId(r,j.BP),i=t.inputId(r,j.FF),o=document.getElementById(i),c=document.getElementById(a),u=1;if(r.parent&&(void 0!=n[t.inputId(r.parent,j.BP)]||void 0!=r.parent.data.bpValue)){var l,d,s=t.inputId(r.parent,j.BP),h=document.getElementById(s);d=null!=h?+h.value:1,null===(l=r.parent.children)||void 0===l||l.forEach((function(e){if(e.data.nodeId!=r.data.nodeId){var t,n=document.getElementById("ff_".concat(e.data.nodeId,"_to_").concat(null===(t=e.parent)||void 0===t?void 0:t.data.nodeId));u=+n.value}}));var f={ff:+o.value,parentBp:d,siblingFf:u};if(r.parent.data.derivative){var p=r.parent.data.derivative(f);!0!==e&&(c.value=p.toString()),n[a]=p}}})),n}},{key:"updateError",value:function(e,t){var n=E(e),r=E(t);this.totalNetError=O(this.netErrorHandler(O(n,this.errorPrecisionDigits),O(r,this.errorPrecisionDigits)),this.errorPrecisionDigits);var a=document.getElementById("net_error");if(void 0!=a&&null!=a){var i="\n\\text{".concat(this.tl("expected")," ").concat(r,"} \\\\ \\\\\n\\begin{aligned}\nE &= {(").concat(n," - ").concat(r,")}^2 \\\\\n  &= ").concat(this.totalNetError," \\\\\n\\end{aligned}");w.a.render(i,a,{throwOnError:!1})}}},{key:"toggleStep",value:function(e){this.toggleInputsForStep(e),this.toggleArrowsForStep(e);for(var t=document.getElementsByClassName("editable-weight"),n=0;n<t.length;n++)w.a.render(this.editable,t[n],{throwOnError:!1})}},{key:"centeredChildPoint",value:function(e){var t=function(e){return Math.max.apply(Math,Object(v["a"])(e.map((function(e){return e.y}))))},n=e.children&&e.children.length>0?{y:t(e.children),x:(e.children[0].x+e.children[e.children.length-1].x)/2}:e;return n}},{key:"build",value:function(e){var t=this;this.nodes.forEach((function(n){var r=t.width/(e.height+1);n.y=(e.height-n.depth)*r})),this.svg.selectAll("g.node").data(this.nodes);var n=this.svg.selectAll("g.node").data(this.nodes.filter((function(e){return e.depth>0}))),r=this.svg.selectAll("g.node").data(this.nodes.filter((function(e){return 0==e.depth}))),a=50,i=50;r.enter().append("g").attr("class","node").attr("transform",(function(){return"translate("+e.y+","+e.x+")"})).append("foreignObject").attr("class","externalObject").attr("y","-".concat(a/2,"px")).attr("width","".concat(i,"px")).attr("height","".concat(a,"px")).style("color","black").attr("overflow","visible").html((function(){return"<text style='height: ".concat(a,"px; width: ").concat(i,";' id='net_error'></text>")}));var o=n.enter().append("g").attr("class","node").attr("transform",(function(e){var n=t.centeredChildPoint(e);return"translate("+n.y+","+n.x+")"}));o.append("circle").attr("class","node").style("stroke",this.circleOutlineColor).style("stroke-width","2px").attr("r",1e-6).style("fill","white"),o.append("foreignObject").attr("class","externalObject").attr("x","-".concat(this.circleRadius/2,"px")).attr("y","-".concat(this.circleRadius/2,"px")).attr("width","".concat(this.circleRadius,"px")).attr("height","".concat(this.circleRadius,"px")).style("color","white").style("font-size","".concat(.75*this.circleRadius,"px")).attr("overflow","visible").html((function(e){var n=w.a.renderToString(e.data.func,{throwOnError:!1});return"<div style='height: ".concat(t.circleRadius/2,"; width: ").concat(t.circleRadius,";' id='func_").concat(e.data.nodeId,"'>").concat(n,"</div>")}));var c=function(n){return(e.height-n.depth)*t.animationDuration*t.animationPreshootFactor};o.transition().delay((function(e){return c(e)})).duration(this.animationDuration).attr("transform",(function(e){return"translate("+e.y+","+e.x+")"})).select("circle.node").attr("r",this.circleRadius).style("fill",this.circleColor);var u=this.svg.selectAll("path.link").data(this.links),l=u.enter().insert("path","g").attr("class","link").style("fill","none").style("stroke","#ccc").style("stroke-width","2px").style("opacity",0).attr("d",(function(e){var n=t.centeredChildPoint(e);return x(n,n)}));l.transition().delay((function(e){return c(e)})).duration(this.animationDuration).style("opacity",1).attr("marker-".concat(this.currentStep==j.FF?"end":"start"),(function(){return"url(".concat(new URL("#arrow-resolved",window.location.href),")")})).attr("d",(function(e){var t;return x(e,null!==(t=e.parent)&&void 0!==t?t:e)})).attr("marker-orient",(function(){return 10}));var d="2rem",s=15,h="?",f=5,p=u.enter().insert("foreignObject","g").attr("class","externalObject").attr("transform",(function(e){var n=t.centeredChildPoint(e);return"translate("+n.y+","+n.x+")"})).attr("width",d).attr("overflow","visible").attr("height","".concat(s,"px")).style("opacity",0);p.append("xhtml:div").html((function(e){var n=void 0===e.data.ffValue,r="background: transparent; font-size: 0.5rem; height: ".concat(s,"px; width: ").concat(d,"; border: none; padding: 0;");return"<input type='text' onchange=window.checkUserNumberInput(this) ".concat(n?"":"disabled value="+e.data.ffValue," style='").concat(r,"' id='").concat(t.inputId(e,j.FF),"' placeholder='").concat(h,"'></input>")})),p.transition().delay((function(e){return c(e)})).duration(this.animationDuration).attr("transform",(function(e){var t,n,r=y(e,null!==(t=e.parent)&&void 0!==t?t:e,.75).y-s-f,a=y(e,null!==(n=e.parent)&&void 0!==n?n:e,.75).x;return"translate("+a+","+r+")"})).style("opacity",1),u.enter().insert("foreignObject","g").attr("class","externalObject").attr("width",d).attr("transform",(function(e){var t,n,r=y(e,null!==(t=e.parent)&&void 0!==t?t:e,.75).y+f,a=y(e,null!==(n=e.parent)&&void 0!==n?n:e,.75).x;return"translate("+a+","+r+")"})).attr("hidden",!0).attr("overflow","visible").attr("height","".concat(s,"px")).append("xhtml:div").html((function(e){var n=void 0===e.data.bpValue,r="background: transparent; font-size: 0.5rem; height: ".concat(s,"px; width: ").concat(d,"; border: none; padding: 0;");return"<input type='text' onchange=window.checkUserNumberInput(this) disabled ".concat(n?"":"value="+e.data.bpValue," hidden style='").concat(r,"' id='").concat(t.inputId(e,j.BP),"' placeholder='").concat(h,"'></input>")})),this.toggleStep(this.currentStep)}},{key:"wowInstructions",get:function(){var e=w.a.renderToString(this.editable,{throwOnError:!1});return _(this.tl("wowinstructions"),e)}},{key:"weightChange",get:function(){return{value:this.weightSliderValue*this.weightSliderRelativeRange,formatted:"".concat(this.weightSliderValue>=0?"+":"-").concat(k(Math.abs(this.weightSliderValue*this.weightSliderRelativeRange),2,0),"%")}}},{key:"costChange",get:function(){var e=100*(1-this.initialNetError/Math.max(this.totalNetError,1/Math.pow(10,this.errorPrecisionDigits)));return{value:e,formatted:"".concat(e>=0?"+":"").concat(E(e).toFixed(0),"%")}}},{key:"proceedButtonText",get:function(){return this.submitted?this.tl("submitted"):this.currentStep===j.FF?this.tl("nextStep"):this.tl("submit")}}]),t}(h["c"]);Object(s["a"])([Object(h["b"])()],B.prototype,"data",void 0),Object(s["a"])([Object(h["b"])()],B.prototype,"func",void 0),Object(s["a"])([Object(h["b"])()],B.prototype,"editable",void 0),Object(s["a"])([Object(h["b"])()],B.prototype,"debug",void 0),Object(s["a"])([Object(h["b"])({default:I.EN})],B.prototype,"lang",void 0),Object(s["a"])([Object(h["b"])()],B.prototype,"submissionValidator",void 0),Object(s["a"])([Object(h["b"])({default:function(){return N}})],B.prototype,"netErrorHandler",void 0),Object(s["a"])([Object(h["b"])({default:5})],B.prototype,"errorPrecisionDigits",void 0),Object(s["a"])([Object(h["b"])({default:500})],B.prototype,"width",void 0),Object(s["a"])([Object(h["b"])({default:300})],B.prototype,"height",void 0),Object(s["a"])([Object(h["b"])({default:600})],B.prototype,"animationDuration",void 0),Object(s["a"])([Object(h["b"])({default:.4})],B.prototype,"animationPreshootFactor",void 0),Object(s["a"])([Object(h["b"])({default:100})],B.prototype,"padding",void 0),Object(s["a"])([Object(h["b"])({default:.5})],B.prototype,"weightSliderRelativeRange",void 0),Object(s["a"])([Object(h["b"])({default:50})],B.prototype,"expectedOut",void 0),Object(s["a"])([Object(h["b"])({default:V})],B.prototype,"errorFunc",void 0),Object(s["a"])([Object(h["b"])({default:15})],B.prototype,"circleRadius",void 0),Object(s["a"])([Object(h["b"])({default:"#4a47a3"})],B.prototype,"circleColor",void 0),Object(s["a"])([Object(h["b"])({default:"#413c69"})],B.prototype,"circleOutlineColor",void 0),Object(s["a"])([Object(h["b"])({default:"#c9485b"})],B.prototype,"redColor",void 0),Object(s["a"])([Object(h["b"])({default:"#8cba51"})],B.prototype,"greenColor",void 0),Object(s["a"])([Object(h["b"])({default:"#ccc"})],B.prototype,"arrowColor",void 0),Object(s["a"])([Object(h["b"])({default:7})],B.prototype,"arrowSize",void 0),Object(s["a"])([Object(h["d"])("weightSliderValue")],B.prototype,"onWeightSliderValue",null),B=Object(s["a"])([h["a"]],B);var P=B,D=P,C=(n("905b"),n("57c6"),n("2877")),M=Object(C["a"])(D,f,p,!1,null,"1b712b5a",null),W=M.exports,T=function(e,t){return Math.pow(e-t,2)},z=function(e){return e.reduce((function(e,t){return e+t}),0)},R=function(e){return e.reduce((function(e,t){return e*t}),1)},A=function(){return NaN},H=function(e){return e.parentBp},G=function(e){var t=e.siblingFf*e.parentBp;return+t.toFixed(2)},L=function(e){if(1!=e.length)throw new TypeError("Pow can only handle exactly one input (not ".concat(e.length,")"));return Math.pow(e[0],.75)},U=function(e){var t=3/(4*Math.pow(e.ff,.25))*e.parentBp;return+t.toFixed(2)},Y={errorHandler:T,netFuncTex:"\n      \\begin{aligned}\n         &n(w_0, w_1, w_2, w_3, w_4, w_5, x_0, x_1, b_0, b_1, b_2) \\\\\n      = (&(w_0\\cdot x_0 + w_1\\cdot x_1 + b_0)^{3/4} \\cdot w_4 + \\\\\n        &(w_2\\cdot x_0 + w_3\\cdot x_1 + b_1)^{3/4} \\cdot w_5 + b_2)^{3/4}\n      \\end{aligned}",errFuncTex:"\n    \\begin{aligned}\n        &C(w_0, w_1, w_2, w_3, w_4, w_5, x_0, x_1, b_0, b_1, b_2, e) \\\\\n      = &(n(w_0, w_1, w_2, w_3, w_4, w_5, x_0, x_1, b_0, b_1, b_2) - e)^2\n    \\end{aligned}",netTree:{func:"x^{3/4}",nodeId:0,bpValue:1,accumulate:L,derivative:U,children:[{func:"+",nodeId:1,accumulate:z,derivative:H,children:[{func:"+",nodeId:2,accumulate:z,derivative:H,children:[{func:"\\cdot",nodeId:3,accumulate:R,derivative:G,children:[{func:"w_4",nodeId:4,ffValue:1.4,accumulate:A},{func:"x^{3/4}",nodeId:5,accumulate:L,derivative:U,children:[{func:"+",nodeId:6,accumulate:z,derivative:H,children:[{func:"+",nodeId:7,accumulate:z,derivative:H,children:[{func:"\\cdot",nodeId:8,accumulate:R,derivative:G,children:[{func:"w_0",nodeId:9,ffValue:.4,accumulate:A},{func:"x_0",nodeId:10,ffValue:5,accumulate:A}]},{func:"\\cdot",nodeId:11,accumulate:R,derivative:G,children:[{func:"w_1",nodeId:12,ffValue:.6,accumulate:A},{func:"x_1",nodeId:13,ffValue:3,accumulate:A}]}]},{func:"b_0",nodeId:14,ffValue:.5,accumulate:A}]}]}]},{func:"\\cdot",nodeId:15,accumulate:R,derivative:G,children:[{func:"w_5",nodeId:16,ffValue:.7,accumulate:A},{func:"x^{3/4}",nodeId:17,accumulate:L,derivative:U,children:[{func:"+",nodeId:18,accumulate:z,derivative:H,children:[{func:"+",nodeId:19,accumulate:z,derivative:H,children:[{func:"\\cdot",nodeId:20,accumulate:R,derivative:G,children:[{func:"w_2",nodeId:21,ffValue:1.2,accumulate:A},{func:"x_0",nodeId:22,ffValue:5,accumulate:A}]},{func:"\\cdot",nodeId:23,accumulate:R,derivative:G,children:[{func:"w_3",nodeId:24,ffValue:.65,accumulate:A},{func:"x_1",nodeId:25,ffValue:3,accumulate:A}]}]},{func:"b_1",nodeId:26,ffValue:.5,accumulate:A}]}]}]}]},{func:"b_2",nodeId:27,ffValue:.5,accumulate:A}]}]}},$=Y,J=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(u["a"])(this,Object(l["a"])(t).apply(this,arguments)),e.example=$,e}return Object(d["a"])(t,e),Object(c["a"])(t,[{key:"handleSubmit",value:function(e,t,n){return void 0!=n?{valid:n}:{valid:!1,message:"Cannot auto validate. Connect your own backend!"}}}]),t}(h["c"]);J=Object(s["a"])([Object(h["a"])({components:{VueBackpropagationExercise:W}})],J);var Z=J,X=Z,q=(n("cf25"),Object(C["a"])(X,a,i,!1,null,null,null)),K=q.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(K)}}).$mount("#app")},cf25:function(e,t,n){"use strict";var r=n("fea6"),a=n.n(r);a.a},fea6:function(e,t,n){}});
//# sourceMappingURL=app.ef03c56b.js.map