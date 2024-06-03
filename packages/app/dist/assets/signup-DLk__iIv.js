import{d as s,r as o,s as u,x as l,e as n,a as c}from"./main-C-rYVU5A.js";s({"restful-form":o.FormElement});class i extends u{render(){return l`
      <restful-form new src="/auth/register">
        <slot></slot>
      </restful-form>
    `}get next(){return new URLSearchParams(document.location.search).get("next")}constructor(){super(),this.addEventListener("mu-rest-form:created",e=>{const t=e.detail,{token:a}=t.created,r=this.next||"/";console.log("Signup successful",t,r),n.relay(e,"auth:message",["auth/signin",{token:a,redirect:r}])})}}s({"mu-auth":c.Provider,"signup-form":i});window.relayEvent=n.relay;
