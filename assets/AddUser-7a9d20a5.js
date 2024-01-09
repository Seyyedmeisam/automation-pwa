import{r as n,j as e}from"./index-b92ad479.js";import{a as m}from"./axios-f13eed09.js";import{T as y}from"./Tree-00376234.js";import{S as i}from"./sweetalert2.all-58ecf48c.js";import{h as x}from"./moment-fbc5633a.js";import"./jalali-moment-abb1df22.js";import{C as D,a as S,b as f,c as u}from"./DefaultLayout-dca0b3b8.js";import"./index.es-f1a080d1.js";import"./cil-user-5af1b2f2.js";function O(){const[a,d]=n.useState({username:"",password:"",password_confirmation:"",first_name:"",last_name:"",father_name:"",national_code:"",gender:"male",birth_date:"",certificate_number:"",certificate_serial:"",certificate_date:"",certificate_place:"",education_level:"",phone:"",email:"",telephone:"",telephone_extension:"",postal_codes:"",address:"",signature:"",profile_picture:""}),[j,g]=n.useState([]),[p,N]=n.useState(null),[h,v]=n.useState(x(new Date).format("YYYY/MM/DD")),[_,w]=n.useState([]);n.useEffect(()=>{console.log(a)},[a]);const b=()=>{m.get("role").then(l=>{w(l.data)}).catch(l=>{i.fire(l.response.data.message)})};n.useEffect(()=>{b()},[]);const F=function(l){l.preventDefault();const r=new FormData;r.append("birth_date",x(h).format("YYYY/MM/DD")),r.append("role_id",p),Object.entries(a).forEach(([t,o])=>{r.append(t,o)}),m.post("addUser",r).then(t=>{i.fire(t.data.msg),i.fire({icon:"success",title:"Success",text:t.data.msg})}).catch(t=>{console.log(t.response),t.response.status==422&&i.fire({icon:"warning",title:"Warning",text:t.response.data.message||"There was an error processing your request."})})},C=(l,r)=>{const t=new FormData;t.append("file",l),m.post("/uploadFile",t).then(o=>{d(c=>({...c,[r]:o.data}))}).catch(o=>{console.log(o),i.fire({icon:"error",title:"error",text:o.response.data.message})})},s=l=>{console.log("handleChange :: ",l);const{id:r,value:t,type:o}=l.target;if(o==="file"){const c=l.target.files[0];c&&C(c,r)}else d(c=>({...c,[r]:t}))};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"container-xl p-5 ml-1 rounded",children:e.jsxs("form",{onSubmit:F,className:"border p-4",children:[e.jsx("div",{className:"row text-center bg-light",children:e.jsx("h3",{children:"فرم ثبت نام کاربر"})}),e.jsx("br",{}),e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"form-group col-md-2 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"username",children:"نام کاربری : *"}),e.jsx("input",{value:a.username,onChange:s,type:"text",className:"form-control ",id:"username"})]}),e.jsxs("div",{className:"form-group col-md-2 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"password",children:"رمز عبور : *"}),e.jsx("input",{value:a.password,onChange:s,type:"password",className:"form-control",id:"password"})]}),e.jsxs("div",{className:"form-group col-md-2 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"password_confirmation",children:"تکرار رمز عبور : *"}),e.jsx("input",{value:a.password_confirmation,onChange:s,type:"password",className:"form-control ",id:"password_confirmation"})]})]}),e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"form-group col-md-2 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"name",children:"نام :"}),e.jsx("input",{value:a.first_name,onChange:s,type:"text",className:"form-control ",id:"first_name"})]}),e.jsxs("div",{className:"form-group col-md-2 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"last_name",children:"نام خانوادگی :"}),e.jsx("input",{value:a.last_name,onChange:s,type:"text",className:"form-control",id:"last_name"})]}),e.jsxs("div",{className:"form-group col-md-2 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"father_name",children:"نام پدر :"}),e.jsx("input",{value:a.father_name,onChange:s,type:"text",className:"form-control ",id:"father_name"})]}),e.jsxs("div",{className:"form-group col-md-2 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"national_code",children:" کد ملی :"}),e.jsx("input",{value:a.national_code,onChange:s,type:"text",className:"form-control ",id:"national_code"})]}),e.jsxs("div",{className:"form-group col-md-1 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"gender",children:"جنسیت :"}),e.jsxs("select",{onChange:s,className:"form-select form-select-sm",id:"gender",children:[e.jsx("option",{value:"male",children:"مرد"}),e.jsx("option",{value:"female",children:"زن"})]})]}),e.jsxs("div",{className:"form-group col-md-2 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"birth_day",children:"تاریخ تولد :"}),e.jsx(D,{firstDayOfWeek:6,date:h,placeholder:"",onStartDateChange:v,locale:"fa-IR",size:"sm"})]})]}),e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"form-group col-md-2 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"certificate_number",children:"شماره شناسنامه :"}),e.jsx("input",{value:a.certificate_number,onChange:s,type:"text",className:"form-control ",id:"certificate_number"})]}),e.jsxs("div",{className:"form-group col-md-2 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"certificate_serial",children:"سریال شناسنامه :"}),e.jsx("input",{value:a.certificate_serial,onChange:s,type:"text",className:"form-control ",id:"certificate_serial"})]}),e.jsxs("div",{className:"form-group col-md-2 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"education_level",children:"مدرک تحصیلی :"}),e.jsxs(S,{value:a.education_level,onChange:s,className:"mb-3",id:"education_level",children:[e.jsx("option",{value:"هیچکدام",children:"هیچکدام"}),e.jsx("option",{value:"سیکل",children:"سیکل"}),e.jsx("option",{value:"دیپلم",children:"دیپلم"}),e.jsx("option",{value:"لیسانس",children:"لیسانس"}),e.jsx("option",{value:"فوق لیسانس",children:"لیسانس"}),e.jsx("option",{value:"دکترا",children:"دکترا"})]})]})]}),e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"form-group col-md-2 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"mobile",children:"تلفن همراه :"}),e.jsx("input",{value:a.phone,onChange:s,type:"text",className:"form-control",id:"phone"})]}),e.jsxs("div",{className:"form-group col-md-2 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"email",children:"ایمیل : *"}),e.jsx("input",{value:a.email,onChange:s,type:"email",className:"form-control ",id:"email"})]}),e.jsxs("div",{className:"form-group col-md-2 mt-3 ml-0",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"telephone",children:"تلفن :"}),e.jsx("input",{value:a.telephone,onChange:s,type:"text",className:"form-control ",id:"telephone"})]}),e.jsx("div",{className:"form-group col-md-1 mt-5 text-center",children:"-"}),e.jsxs("div",{className:"form-group col-md-1 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"telephone_extension"}),e.jsx("input",{value:a.telephone_extension,onChange:s,type:"text",className:"form-control ",id:"telephone_extension"})]}),e.jsxs("div",{className:"form-group col-md-2 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"postal_codes",children:"کدپستی :"}),e.jsx("input",{value:a.postal_codes,onChange:s,type:"text",className:"form-control ",id:"postal_codes"})]})]}),e.jsxs("div",{className:"row",children:[e.jsxs("div",{className:"form-group col-md-12 mt-3",children:[e.jsx("label",{className:"text-nowrap",htmlFor:"address",children:"آدرس :"}),e.jsx("textarea",{value:a.address,onChange:s,rows:"3",className:"form-control row-3",id:"address"})]}),e.jsx("div",{className:"row",children:e.jsxs("div",{className:"form-group col-md-3 mt-3",children:[e.jsx(f,{htmlFor:"formFile",children:"امضا :"}),e.jsx(u,{type:"file",onChange:s,accept:".pdf, .jpg, .jpeg, .png",id:"signature"}),a.signature!=""&&e.jsx("a",{href:`http://localhost:8000/${a.signature}`,target:"_blank",rel:"noopener noreferrer",children:e.jsx("img",{className:"m-3 border border-dark",src:`http://localhost:8000/${a.signature}`,height:"100px",alt:"Preview"})})]})}),e.jsx("div",{className:"row",children:e.jsxs("div",{className:"form-group col-md-3 mt-3",children:[e.jsx(f,{htmlFor:"formFile",children:"عکس پروفایل :"}),e.jsx(u,{type:"file",onChange:s,accept:".pdf, .jpg, .jpeg, .png",id:"profile_picture"}),a.profile_picture!=""&&e.jsx("a",{href:`http://localhost:8000/${a.profile_picture}`,target:"_blank",rel:"noopener noreferrer",children:e.jsx("img",{className:"m-3 border border-dark",src:`http://localhost:8000/${a.profile_picture}`,height:"100px",alt:"Preview"})})]})})]}),e.jsxs("div",{className:"mt-4 pr-4",children:["نقش پدر را انتخاب کنید",e.jsx("div",{className:"mt-4 pr-4",children:e.jsx(y,{data:_,expandedNodes:j,setExpandedNodes:g,selectedNode:p,setSelectedNode:N})})]}),e.jsx("div",{className:"row justify-content-center",children:e.jsx("button",{type:"submit",className:"btn btn-success col-md-1 mt-3 center",children:"ثبت"})})]})})})}export{O as default};