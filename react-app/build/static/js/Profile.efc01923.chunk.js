(window["webpackJsonpmy-meals-app"]=window["webpackJsonpmy-meals-app"]||[]).push([[1],{252:function(e,a,t){"use strict";var r=t(6),n=t(79),u=t(37),i=new(t(119).b.Entity)("users",{},{idAttribute:"_id"}),l={USERS:i,USERS_ARRAY:[i]},s=t(90);t.d(a,"a",function(){return o}),t.d(a,"c",function(){return c}),t.d(a,"d",function(){return m}),t.d(a,"b",function(){return d});var o=function(e){return Object(r.a)({},u.a,{types:[s.b,s.c,s.a],endpoint:"user",method:"POST",body:Object(n.a)(["userName","email","fullName","role","password"])(e||{}),meta:Object(n.a)(["onSuccess","onFailure"])(e||{})})},c=function(e){var a;return a={},Object(r.a)(a,u.a,{types:[s.h,s.i,s.g],endpoint:"users",body:Object(n.a)(["id"])(e||{}),meta:Object(n.a)(["onSuccess","onFailure"])(e||{}),schema:e.normalize?{data:l.USERS_ARRAY}:null}),Object(r.a)(a,"normalize",e.normalize),a},m=function(e){return Object(r.a)({},u.a,{types:[s.k,s.l,s.j],endpoint:"user",method:"PATCH",body:Object(n.a)(["id","userName","email","fullName","dailyCaloriesTarget","role","password"])(e||{}),meta:Object(n.a)(["onSuccess","onFailure"])(e||{})})},d=function(e){return Object(r.a)({},u.a,{types:[s.e,s.f,s.d],endpoint:"user",method:"DELETE",body:Object(n.a)(["id"])(e||{}),meta:Object(n.a)(["onSuccess","onFailure"])(e||{})})}},253:function(e,a,t){"use strict";a.a=function(e){return/^[a-zA-Z0-9]+$/.test(String(e))}},254:function(e,a,t){"use strict";a.a=function(e){return/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}},255:function(e,a,t){"use strict";var r=t(0),n=t.n(r),u=t(26),i=t(120),l=t.n(i),s=u.b.div.withConfig({componentId:"sc-7ap35w-0"})(["width:100px;height:100px;.shadow{display:flex;justify-content:center;align-items:center;width:100%;height:100%;border-radius:50%;background:rgba(0,0,0,0.05);> span{font-size:1.5rem;}}"]);a.a=function(e){var a=e.name,t=e.className;return n.a.createElement(s,{className:t||""},n.a.createElement("div",{className:"shadow"},a?n.a.createElement("span",null,(a||"").substring(0,1).toUpperCase()):n.a.createElement(l.a,null)))}},263:function(e,a,t){"use strict";t.r(a);var r=t(6),n=t(30),u=t(27),i=t(32),l=t(33),s=t(34),o=t(0),c=t.n(o),m=t(26),d=t(17),p=t(183),f=t(129),b=t.n(f),h=t(71),g=t(252),v=t(45),y=t(255),E=t(253),O=t(254),j=t(234),C=t(233),S=t(251),w=t(235),N=function(e){var a=e.value,t=e.onChange,r=e.error;return c.a.createElement(j.a,{fullWidth:!0,error:!!r},c.a.createElement(S.a,null,"Username"),c.a.createElement(C.a,{name:"userName",value:a,onChange:t}),!!r&&c.a.createElement(w.a,null,r))},x=function(e){var a=e.value,t=e.onChange;return c.a.createElement(j.a,{fullWidth:!0},c.a.createElement(S.a,null,"Full name"),c.a.createElement(C.a,{name:"fullName",value:a,onChange:t}))},T=function(e){var a=e.value,t=e.onChange,r=e.error;return c.a.createElement(j.a,{fullWidth:!0,error:!!r},c.a.createElement(S.a,null,"Email"),c.a.createElement(C.a,{type:"email",name:"email",value:a,onChange:t}),!!r&&c.a.createElement(w.a,null,r))},U=function(e){var a=e.value,t=e.onChange,r=e.error;return c.a.createElement(j.a,{fullWidth:!0,error:!!r},c.a.createElement(S.a,null,"Expected calories per day"),c.a.createElement(C.a,{type:"number",name:"dailyCaloriesTarget",value:a,onChange:t}),!!r&&c.a.createElement(w.a,null,r))};function A(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable})),t.push.apply(t,r)}return t}function P(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?A(t,!0).forEach(function(a){Object(r.a)(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):A(t).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}var k=m.b.div.withConfig({componentId:"sc-1yfgkuv-0"})(["max-width:400px;width:100%;margin:30px auto 0;.avatar{margin:0 auto 40px;}.form-field{margin:0 auto 35px;}.blur{filter:blur(2px);}.submit-container{margin:60px 0 0;button{width:100%;}}.MuiFormHelperText-root.Mui-error{position:absolute;bottom:-20px;}@media (max-width:500px){padding:0 20px;}"]),I=function(e){return function(a){return a&&a[e]||""}},z=function(e){function a(){var e,t;Object(n.a)(this,a);for(var u=arguments.length,s=new Array(u),o=0;o<u;o++)s[o]=arguments[o];return(t=Object(i.a)(this,(e=Object(l.a)(a)).call.apply(e,[this].concat(s)))).state={isBusy:!0,fullName:I("fullName")(t.props.user),userName:I("userName")(t.props.user),email:I("email")(t.props.user),dailyCaloriesTarget:I("dailyCaloriesTarget")(t.props.user)||1,errors:{}},t.fetchCurrentUser=function(){t.props.getUserInfo({onSuccess:function(){return t.setState({isBusy:!1})},onFailure:function(){t.setState({isBusy:!1},function(){t.props.setSnackbar("Error during fetching user. Please refresh the page")})}})},t.handleInputChange=function(e){var a=e.target,n=a.name,u=a.value;if("dailyCaloriesTarget"===n)return t.setState(function(e){var a;return a={},Object(r.a)(a,n,u&&u<0?1:u),Object(r.a)(a,"errors",P({},e.errors,Object(r.a)({},n,""))),a});t.setState(function(e){var a;return a={},Object(r.a)(a,n,u),Object(r.a)(a,"errors",P({},e.errors,Object(r.a)({},n,""))),a})},t.handleSubmit=function(e){e.preventDefault();var a=t.state,r=a.userName,n=a.email,u=a.dailyCaloriesTarget;if(!r)return t.setState({errors:{userName:r?"":"Required"}});var i=Object(E.a)(r),l=Object(O.a)(n);if(!i||n&&!l||u<1)return t.setState({errors:{userName:i?"":"Use only alphanumeric username [A, a, 0-9]",email:l?"":"Email is invalid",dailyCaloriesTarget:u<1?"Expected calories must be greater than zero":""}});t.setState({isBusy:!0},function(){t.props.updateUser({id:t.props.user._id,userName:r,fullName:t.state.fullName,email:n,dailyCaloriesTarget:+u,onSuccess:t.fetchCurrentUser,onFailure:function(e){t.setState({isBusy:!1},function(){t.props.setSnackbar(e.message||"Something went wrong")})}})})},t}return Object(s.a)(a,e),Object(u.a)(a,[{key:"componentDidMount",value:function(){this.fetchCurrentUser()}},{key:"render",value:function(){var e=this.state,a=e.isBusy,t=e.fullName,r=e.dailyCaloriesTarget,n=e.userName,u=e.email,i=e.errors;return c.a.createElement(k,null,c.a.createElement("div",{className:b()({blur:a})},c.a.createElement(y.a,{name:n,className:"avatar"})),c.a.createElement("form",{onSubmit:this.handleSubmit},c.a.createElement("div",{className:b()("form-field",{blur:a})},c.a.createElement(N,{value:n,error:i.userName,onChange:this.handleInputChange})),c.a.createElement("div",{className:b()("form-field",{blur:a})},c.a.createElement(x,{value:t,onChange:this.handleInputChange})),c.a.createElement("div",{className:b()("form-field",{blur:a})},c.a.createElement(T,{value:u,error:i.email,onChange:this.handleInputChange})),c.a.createElement("div",{className:b()("form-field",{blur:a})},c.a.createElement(U,{value:r,error:i.dailyCaloriesTarget,onChange:this.handleInputChange})),c.a.createElement("div",{className:b()("submit-container",{blur:a})},c.a.createElement(p.a,{color:"primary",type:"submit",variant:"contained",disabled:a},"SAVE"))))}}]),a}(c.a.PureComponent);a.default=Object(d.b)(function(e){return{user:e.auth.user}},{getUserInfo:h.a,updateUser:g.d,setSnackbar:v.b})(z)}}]);
//# sourceMappingURL=Profile.efc01923.chunk.js.map