import{d as s,r as a,s as l,x as u,e as n,a as c}from"./main-C-rYVU5A.js";s({"restful-form":a.FormElement});class i extends l{render(){return u`
      <restful-form new src="/auth/login">
        <slot></slot>
      </restful-form>
    `}get next(){return new URLSearchParams(document.location.search).get("next")}constructor(){super(),this.addEventListener("mu-rest-form:created",e=>{const t=e.detail,{token:o}=t.created,r=this.next||"/";console.log("Login successful",t,r),n.relay(e,"auth:message",["auth/signin",{token:o,redirect:r}])})}}s({"mu-auth":c.Provider,"login-form":i});window.relayEvent=n.relay;
