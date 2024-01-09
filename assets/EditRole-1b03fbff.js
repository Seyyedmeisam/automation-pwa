import{r as a,j as e}from"./index-b92ad479.js";import{a as v}from"./axios-f13eed09.js";import{T}from"./Tree-00376234.js";import{u as L,a as P,c as D,M as B,F as h}from"./Form-39720e29.js";import{S as s}from"./sweetalert2.all-58ecf48c.js";import"./DefaultLayout-dca0b3b8.js";import"./index.es-f1a080d1.js";import"./cil-user-5af1b2f2.js";const M=a.forwardRef(({as:g,bsPrefix:u,variant:m="primary",size:p,active:n=!1,disabled:l=!1,className:i,...o},j)=>{const d=L(u,"btn"),[N,{tagName:f}]=P({tagName:g,disabled:l,...o}),x=f;return e.jsx(x,{...N,...o,ref:j,disabled:l,className:D(i,d,n&&"active",m&&`${d}-${m}`,p&&`${d}-${p}`,o.href&&l&&"disabled")})});M.displayName="Button";const k=M,W=({data:g,roleData:u,expandedNodes:m,setExpandedNodes:p,parentSelectedNode:n,setParentSelectedNode:l,showModal:i,closeModal:o,handleDelete:j,handleUpdate:d,formData:N,setFormData:f})=>{a.useEffect(()=>{f(b=>({title:u.title,description:u.description??""}))},[u,f]);const x=b=>{const{name:C,value:y}=b.target;f(S=>({...S,[C]:y}))};return e.jsx("div",{children:e.jsxs(B,{show:i,onHide:o,size:"lg",children:[e.jsx(B.Header,{closeButton:!0}),e.jsxs(B.Body,{children:[e.jsxs(h,{children:[e.jsxs(h.Group,{className:"mb-3",controlId:"exampleForm.ControlInput1",children:[e.jsx(h.Label,{children:"عنوان"}),e.jsx(h.Control,{type:"text",name:"title",value:N.title,onChange:x,autoFocus:!0})]}),e.jsxs(h.Group,{className:"mb-3",controlId:"exampleForm.ControlTextarea1",children:[e.jsx(h.Label,{children:" توضیحات"}),e.jsx(h.Control,{as:"textarea",name:"description",rows:3,value:N.description,onChange:x})]})]}),"نقش پدر را انتخاب کنید",e.jsx(T,{data:g,expandedNodes:m,setExpandedNodes:p,selectedNode:n,setSelectedNode:l})]}),e.jsxs(B.Footer,{children:[e.jsx(k,{variant:"danger",onClick:j,className:" mt-1 d-block mx-auto",children:"حذف"}),e.jsx(k,{variant:"success",onClick:d,className:" mt-1 d-block mx-auto",children:"تایید"}),e.jsx(k,{variant:"secondary",onClick:o,className:" mt-1 d-block mx-auto",children:"بستن"})]})]})})},q=W;function A(){const[g,u]=a.useState([]),[m,p]=a.useState([]),[n,l]=a.useState(null),[i,o]=a.useState(null),[j,d]=a.useState(!1),[N,f]=a.useState([]),[x,b]=a.useState(!0),[C,y]=a.useState({title:"",description:""}),S=()=>{v.get("role").then(c=>{u(c.data),b(!1)}).catch(c=>{console.log(c.response)})};a.useEffect(()=>{S()},[]);const R=()=>{if(n){const c="role/"+n;v.get(c).then(t=>{f(t.data),o(t.data.parent_id),d(!0)}).catch(t=>{t.response.status==422&&s.fire({icon:"warning",title:"Warning",text:t.response.data.message||"There was an error processing your request."})})}};a.useEffect(()=>{x?s.fire({title:"درحال پردازش ... ",allowOutsideClick:!1,allowEscapeKey:!1,showConfirmButton:!1,didOpen:()=>{s.showLoading()}}):s.close()},[x]);const F=()=>{s.fire({text:"آیا از حذف این نقش مطمئن هستید؟",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"بله",cancelButtonText:"خیر"}).then(c=>{if(c.isConfirmed){const t="role/"+n;v.delete(t).then(r=>{s.fire({icon:"success",title:"Success",text:r.data.msg}),r.status==200&&(l(null),S(),E())}).catch(r=>{console.log(r.response),r.response.status==422&&s.fire({icon:"warning",title:"Warning",text:r.response.data.message||"There was an error processing your request."}),r.response.status==500&&s.fire({icon:"warning",title:"Warning",text:"نمیتوانید نقشی که کاربر دارد را حذف کنید"})})}})},E=()=>{d(!1)};function $(c){if(c.preventDefault(),i==n)s.fire("نقش نمی تواند زیرمجموعه خودش باشد");else if(i){const t=new URLSearchParams;t.append("title",C.title),t.append("description",C.description),t.append("parent_id",i);const r="role/"+n;v.put(r,t).then(w=>{s.fire({icon:"success",title:"Success",text:w.data.msg}),w.status==200&&(o(null),S(),E())}).catch(w=>{w.response.status==422&&s.fire({icon:"warning",title:"Warning",text:w.response.data.message||"There was an error processing your request."}),console.log(w.response)})}else s.fire("نقش پدر را انتخاب کنید")}return e.jsx(e.Fragment,{children:e.jsx("div",{className:"container mt-5",children:e.jsx("div",{className:"row justify-content-center",children:e.jsx("div",{className:"col-md-6",children:e.jsxs("div",{className:"card",children:[e.jsx("div",{className:"card-header text-center",children:e.jsx("h4",{className:"mb-0",children:"ویرایش نقش"})}),e.jsxs("div",{className:"card-body",children:[e.jsx(T,{data:g,expandedNodes:m,setExpandedNodes:p,selectedNode:n,setSelectedNode:l}),e.jsx("button",{type:"submit",className:"btn btn-success mt-1 d-block mx-auto",onClick:R,children:"ویرایش"}),j&&e.jsx(q,{data:g,roleData:N,expandedNodes:m,setExpandedNodes:p,parentSelectedNode:i,setParentSelectedNode:o,showModal:j,closeModal:E,handleDelete:F,handleUpdate:$,formData:C,setFormData:y})]})]})})})})})}export{A as default};
