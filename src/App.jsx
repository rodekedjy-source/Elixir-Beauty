import { useState, useEffect, useCallback } from "react"
import { supabase } from "./supabase.js"

const FONT = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');`

const CSS = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --ink:#1C0F2E;--plum:#2D1B3D;--gold:#C8973A;--gold-lt:#E0B05A;
  --gold-pale:#C8973A18;--cream:#FDF8F2;--warm:#F5EDE0;--card:#FFFFFF;
  --border:#EAE0D5;--muted:#9688A4;--green:#2E7D5A;--green-lt:#2E7D5A14;
  --red:#B83232;--red-lt:#B8323214;--pending-c:#8B6200;--pending-lt:#8B620014;
}
body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--ink);min-height:100vh;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:var(--gold-pale);border-radius:4px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes shimmer{0%,100%{opacity:.5}50%{opacity:1}}
@keyframes dot{0%,80%,100%{transform:scale(.55);opacity:.35}40%{transform:scale(1);opacity:1}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 #C8973A40}70%{box-shadow:0 0 0 8px transparent}}
.a1{animation:fadeUp .55s .00s both}.a2{animation:fadeUp .55s .10s both}
.a3{animation:fadeUp .55s .20s both}.a4{animation:fadeUp .55s .30s both}
.hero{background:var(--plum);padding:70px 24px 100px;text-align:center;position:relative;overflow:hidden;}
.hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 70% 50% at 50% 110%,#C8973A28,transparent 65%),radial-gradient(ellipse 40% 30% at 80% 20%,#9B5DE522,transparent 60%);}
.hero-spark{position:absolute;font-size:11px;color:#C8973A55;animation:float 4s ease-in-out infinite;}
.hero-eyebrow{font-size:10px;letter-spacing:4px;text-transform:uppercase;color:var(--gold-lt);margin-bottom:16px;position:relative;}
.hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(44px,8vw,76px);font-weight:700;line-height:1.05;color:#FDF8F2;margin-bottom:12px;position:relative;}
.hero-title em{font-style:italic;color:var(--gold-lt);}
.hero-line{width:40px;height:1px;background:var(--gold);margin:18px auto;position:relative;}
.hero-sub{font-size:14px;font-weight:300;color:#C8B4D8;max-width:380px;margin:0 auto;line-height:1.7;position:relative;}
.bk-body{max-width:740px;margin:-40px auto 0;padding:0 20px 80px;}
.steps-bar{display:flex;align-items:center;justify-content:center;background:var(--card);border-radius:60px;border:1px solid var(--border);padding:6px;width:fit-content;margin:0 auto 36px;box-shadow:0 2px 16px #1C0F2E0A;}
.step-node{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;transition:all .3s;}
.step-node.active{background:var(--ink);color:var(--cream);}.step-node.done{background:var(--gold);color:#fff;}
.step-node.idle{background:transparent;color:var(--muted);}.step-line{width:32px;height:1px;background:var(--border);}
.bk-card{background:var(--card);border-radius:22px;border:1px solid var(--border);box-shadow:0 4px 28px #1C0F2E08;padding:32px;margin-bottom:16px;}
.card-hl{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600;color:var(--ink);margin-bottom:5px;}
.card-sub{font-size:13px;color:var(--muted);margin-bottom:26px;}
.svc-grid{display:grid;grid-template-columns:1fr 1fr;gap:11px;}
.svc-btn{border:1.5px solid var(--border);border-radius:16px;padding:18px 16px;cursor:pointer;background:transparent;text-align:left;width:100%;transition:all .2s;display:flex;flex-direction:column;gap:4px;}
.svc-btn:hover{border-color:var(--gold);background:var(--gold-pale);}
.svc-btn.sel{border-color:var(--gold);background:var(--gold-pale);box-shadow:0 0 0 3px #C8973A18;}
.svc-icon{font-size:24px;margin-bottom:6px;}.svc-name{font-size:14px;font-weight:600;color:var(--ink);}
.svc-dur{font-size:11px;color:var(--muted);}.svc-price{font-size:15px;font-weight:600;color:var(--gold);margin-top:4px;}
.cal-nav-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
.cal-month{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;}
.cal-arrow{background:none;border:1px solid var(--border);border-radius:9px;width:34px;height:34px;cursor:pointer;font-size:15px;color:var(--ink);transition:all .18s;}
.cal-arrow:hover{border-color:var(--gold);color:var(--gold);}
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:22px;}
.cal-dl{font-size:9px;color:var(--muted);text-align:center;padding:4px 0;letter-spacing:1.2px;text-transform:uppercase;}
.cal-d{aspect-ratio:1;border-radius:10px;border:none;background:transparent;cursor:pointer;font-size:13px;color:var(--ink);transition:all .18s;font-family:'DM Sans',sans-serif;display:flex;align-items:center;justify-content:center;}
.cal-d:disabled{color:#CEC0B8;cursor:not-allowed;}
.cal-d:not(:disabled):hover{background:var(--gold-pale);color:var(--gold);}
.cal-d.sel{background:var(--ink);color:var(--cream);font-weight:600;}
.cal-d.tod:not(.sel){color:var(--gold);font-weight:700;}
.time-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;}
.time-btn{padding:11px 8px;border-radius:11px;border:1.5px solid var(--border);background:none;cursor:pointer;font-size:13px;font-family:'DM Sans',sans-serif;transition:all .18s;color:var(--ink);text-align:center;}
.time-btn:hover{border-color:var(--gold);background:var(--gold-pale);}
.time-btn.sel{border-color:var(--gold);background:var(--gold);color:#fff;font-weight:600;}
.time-btn.booked{opacity:.3;cursor:not-allowed;text-decoration:line-through;}
.time-btn.unavail{opacity:.3;cursor:not-allowed;background:#f5f5f5;}
.f-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px;}
.f-group{display:flex;flex-direction:column;gap:7px;}
.f-label{font-size:10px;text-transform:uppercase;letter-spacing:1.4px;color:var(--muted);font-weight:600;}
.f-input,.f-textarea{border:1.5px solid var(--border);border-radius:11px;padding:12px 14px;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--ink);background:var(--cream);outline:none;transition:border-color .2s;width:100%;}
.f-input:focus,.f-textarea:focus{border-color:var(--gold);background:#fff;}
.f-textarea{min-height:88px;resize:vertical;}
.btn{padding:13px 28px;border-radius:13px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;border:none;transition:all .22s;letter-spacing:.2px;display:inline-flex;align-items:center;gap:8px;}
.btn-ink{background:var(--ink);color:var(--cream);}.btn-ink:hover{background:#2D1B3D;transform:translateY(-1px);}
.btn-ink:disabled{opacity:.35;cursor:not-allowed;transform:none;}
.btn-gold{background:var(--gold);color:#fff;}.btn-gold:hover{background:var(--gold-lt);transform:translateY(-1px);}
.btn-gold:disabled{opacity:.35;cursor:not-allowed;transform:none;}
.btn-out{background:transparent;border:1.5px solid var(--border);color:var(--ink);}.btn-out:hover{border-color:var(--ink);}
.btn-green{background:var(--green);color:#fff;}.btn-green:hover{background:#236145;}
.btn-green:disabled{opacity:.35;cursor:not-allowed;}
.btn-red{background:var(--red);color:#fff;}.btn-red:hover{background:#962828;}
.btn-red:disabled{opacity:.35;cursor:not-allowed;}
.btn-sm{padding:9px 18px;font-size:13px;border-radius:10px;}
.sum-row{display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid var(--border);font-size:14px;}
.sum-row:last-child{border-bottom:none;}.sum-label{color:var(--muted);}.sum-val{font-weight:500;}
.success{text-align:center;padding:44px 20px;}
.suc-icon{font-size:60px;margin-bottom:20px;animation:fadeIn .5s ease;}
.suc-title{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;margin-bottom:10px;}
.suc-sub{font-size:14px;color:var(--muted);max-width:380px;margin:0 auto;line-height:1.65;}
.o-shell{min-height:100vh;background:#F0EAE2;}
.o-header{background:var(--plum);padding:20px 24px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;}
.o-header-title{font-family:'Cormorant Garamond',serif;font-size:22px;color:#FDF8F2;}
.o-header-email{font-size:11px;color:#9688A4;}
.o-main{padding:24px 20px;max-width:800px;margin:0 auto;}
.o-stats-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;margin-bottom:28px;}
.o-stat{background:var(--card);border-radius:16px;padding:20px;border:1px solid var(--border);cursor:pointer;transition:all .2s;}
.o-stat:hover{border-color:var(--gold);transform:translateY(-2px);box-shadow:0 6px 20px #1C0F2E10;}
.o-stat-lbl{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:1.3px;}
.o-stat-val{font-family:'Cormorant Garamond',serif;font-size:40px;color:var(--ink);margin-top:2px;}
.o-stat-val.gold{color:var(--gold);}
.o-nav-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:28px;}
.o-nav-btn{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:18px;cursor:pointer;text-align:left;transition:all .2s;font-family:'DM Sans',sans-serif;}
.o-nav-btn:hover{border-color:var(--gold);background:var(--gold-pale);}
.o-nav-icon{font-size:24px;margin-bottom:8px;display:block;}
.o-nav-label{font-size:13px;font-weight:600;color:var(--ink);}
.detail-header{display:flex;align-items:center;gap:14px;padding:16px 20px;background:var(--card);border-bottom:1px solid var(--border);position:sticky;top:64px;z-index:90;}
.detail-back{background:none;border:1px solid var(--border);border-radius:9px;padding:8px 14px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--ink);}
.detail-back:hover{border-color:var(--gold);color:var(--gold);}
.detail-title{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--ink);}
.res-card{background:var(--card);border-radius:18px;border:1px solid var(--border);padding:22px 24px;margin-bottom:13px;box-shadow:0 2px 10px #1C0F2E07;}
.res-top{display:flex;align-items:flex-start;gap:15px;}
.res-av{width:44px;height:44px;border-radius:50%;flex-shrink:0;background:var(--gold-pale);border:1.5px solid var(--gold);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:18px;color:var(--gold);}
.res-info{flex:1;}.res-name{font-size:15px;font-weight:600;color:var(--ink);}
.res-meta{font-size:12px;color:var(--muted);margin-top:4px;line-height:1.7;}
.res-right{display:flex;flex-direction:column;align-items:flex-end;gap:7px;}
.chip{font-size:9px;font-weight:700;padding:3px 11px;border-radius:20px;letter-spacing:.9px;text-transform:uppercase;}
.chip-pending{background:var(--pending-lt);color:var(--pending-c);border:1px solid #8B620020;}
.chip-confirmed{background:var(--green-lt);color:var(--green);border:1px solid #2E7D5A20;}
.chip-declined{background:var(--red-lt);color:var(--red);border:1px solid #B8323220;}
.res-actions{display:flex;gap:9px;margin-top:16px;padding-top:16px;border-top:1px solid var(--border);flex-wrap:wrap;}
.ai-box{background:linear-gradient(135deg,#2E7D5A06,#C8973A06);border:1px solid var(--border);border-radius:14px;padding:18px;margin-top:14px;}
.ai-lbl{font-size:9px;color:var(--gold);text-transform:uppercase;letter-spacing:1.8px;margin-bottom:10px;display:flex;align-items:center;gap:7px;}
.ai-dot{width:6px;height:6px;background:var(--gold);border-radius:50%;animation:shimmer 1.8s infinite;}
.ai-text{font-size:13px;color:var(--ink);line-height:1.7;}
.send-btns{display:flex;gap:9px;margin-top:12px;flex-wrap:wrap;}
.btn-wa{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:700;color:#fff;background:#25D366;border:none;border-radius:9px;padding:8px 16px;cursor:pointer;text-decoration:none;font-family:'DM Sans',sans-serif;}
.btn-wa:hover{background:#1da851;}
.btn-em{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:700;color:var(--ink);background:var(--warm);border:1.5px solid var(--border);border-radius:9px;padding:8px 16px;cursor:pointer;text-decoration:none;font-family:'DM Sans',sans-serif;}
.btn-copy{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:600;color:var(--gold);background:none;border:1px solid var(--gold);border-radius:8px;padding:5px 13px;cursor:pointer;font-family:'DM Sans',sans-serif;}
.toast{position:fixed;top:20px;right:20px;z-index:999;background:var(--plum);color:var(--cream);border-radius:14px;padding:14px 20px;font-size:13px;box-shadow:0 8px 32px #1C0F2E40;animation:fadeUp .4s ease;}
.dots span{display:inline-block;width:7px;height:7px;background:var(--gold);border-radius:50%;margin:0 2px;animation:dot 1.2s infinite;}
.dots span:nth-child(2){animation-delay:.2s}.dots span:nth-child(3){animation-delay:.4s}
.avail-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px;margin-bottom:20px;}
.avail-day{padding:10px 4px;border-radius:10px;border:1.5px solid var(--border);cursor:pointer;text-align:center;font-size:11px;font-weight:600;transition:all .18s;background:none;font-family:'DM Sans',sans-serif;color:var(--muted);}
.avail-day.on{background:var(--green-lt);border-color:var(--green);color:var(--green);}
.time-avail-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}
.time-avail-btn{padding:9px 6px;border-radius:10px;border:1.5px solid var(--border);cursor:pointer;text-align:center;font-size:12px;transition:all .18s;background:none;font-family:'DM Sans',sans-serif;color:var(--muted);}
.time-avail-btn.on{background:var(--green-lt);border-color:var(--green);color:var(--green);font-weight:600;}
.gallery-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
.gallery-img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:14px;border:1px solid var(--border);}
.upload-box{border:2px dashed var(--border);border-radius:14px;padding:32px;text-align:center;cursor:pointer;transition:all .2s;}
.upload-box:hover{border-color:var(--gold);background:var(--gold-pale);}
.login-shell{min-height:100vh;display:flex;align-items:center;justify-content:center;background:var(--plum);}
.login-card{background:var(--cream);border-radius:20px;padding:44px 36px;width:360px;text-align:center;box-shadow:0 20px 60px #1C0F2E50;}
.login-title{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:700;color:var(--ink);margin-bottom:4px;}
.login-sub{font-size:11px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:32px;}
.login-err{color:var(--red);font-size:12px;margin-bottom:12px;}
.empty-state{text-align:center;padding:40px 20px;}
.empty-icon{font-size:40px;margin-bottom:12px;}
.empty-title{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--ink);margin-bottom:6px;}
.empty-sub{font-size:13px;color:var(--muted);}
@media(max-width:600px){
  .svc-grid{grid-template-columns:1fr;}.f-grid{grid-template-columns:1fr;}
  .time-grid{grid-template-columns:repeat(3,1fr);}
}
`
const DAYS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
const DAYS_SHORT=["Su","Mo","Tu","We","Th","Fr","Sa"]
const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"]
const ALL_TIMES=["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"]
const SERVICES=[
  {id:"box",icon:"🫧",name:"Box Braids",dur:"4-6 hrs",price:"Starting $150"},
  {id:"knotless",icon:"✨",name:"Knotless Braids",dur:"5-7 hrs",price:"Starting $180"},
  {id:"twist",icon:"🌀",name:"Senegalese Twist",dur:"4-5 hrs",price:"Starting $140"},
  {id:"locs",icon:"🌿",name:"Locs / Faux Locs",dur:"5-8 hrs",price:"Starting $200"},
  {id:"cornrows",icon:"〰️",name:"Cornrows",dur:"1-3 hrs",price:"Starting $80"},
  {id:"wig",icon:"👑",name:"Wig Install",dur:"1-2 hrs",price:"Starting $90"},
  {id:"natural",icon:"🌸",name:"Natural Hair Styling",dur:"1-3 hrs",price:"Starting $75"},
  {id:"custom",icon:"💫",name:"Custom Style",dur:"Varies",price:"On quote"},
]
const toISO=(y,m,d)=>`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`
const todayISO=()=>{const t=new Date();return toISO(t.getFullYear(),t.getMonth(),t.getDate())}
const showDate=iso=>{if(!iso)return"";const[y,m,d]=iso.split("-");return`${MONTHS[+m-1]} ${+d}, ${y}`}
const buildMsg=(dec,name,service,date,time)=>dec==="confirm"
  ?`Hi ${name}! Your booking for ${service} on ${showDate(date)} at ${time} has been confirmed. We look forward to seeing you at Elixir Beauty. Please arrive with clean, dry hair. See you soon!`
  :`Hi ${name}, unfortunately the time slot you requested on ${showDate(date)} at ${time} is not available. We apologize for the inconvenience. Please visit our booking page to choose another time. Elixir Beauty`

const DEFAULT_AVAIL={days:[1,2,3,4,5,6],times:[...ALL_TIMES]}

export default function App(){
  const [bookings,setBookings]=useState([])
  const [avail,setAvail]=useState(DEFAULT_AVAIL)
  const [gallery,setGallery]=useState([])
  const [ready,setReady]=useState(false)
  const [toast,setToast]=useState(null)
  const [user,setUser]=useState(null)
  const [authReady,setAuthReady]=useState(false)
  const [loginEmail,setLoginEmail]=useState("")
  const [loginPass,setLoginPass]=useState("")
  const [loginErr,setLoginErr]=useState("")
  const [loginBusy,setLoginBusy]=useState(false)
  const [showLogin,setShowLogin]=useState(false)

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{
      setUser(session?.user||null);setAuthReady(true)
    })
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{setUser(session?.user||null)})
    return()=>subscription.unsubscribe()
  },[])

  const fetchAll=useCallback(async()=>{
    const[{data:b},{data:s},{data:g}]=await Promise.all([
      supabase.from("bookings").select("*").order("created_at",{ascending:false}),
      supabase.from("app_settings").select("*").eq("key","availability").single(),
      supabase.from("gallery").select("*").order("created_at",{ascending:false})
    ])
    if(b) setBookings(b)
    if(s?.value) setAvail(s.value)
    if(g) setGallery(g)
    setReady(true)
  },[])

  useEffect(()=>{fetchAll()},[fetchAll])

  useEffect(()=>{
    const channel=supabase.channel("bookings-live")
      .on("postgres_changes",{event:"*",schema:"public",table:"bookings"},()=>{
        fetchAll()
        if(user) setToast("New booking received!")
        setTimeout(()=>setToast(null),4000)
      }).subscribe()
    return()=>supabase.removeChannel(channel)
  },[fetchAll,user])

  const login=async()=>{
    setLoginBusy(true);setLoginErr("")
    const{error}=await supabase.auth.signInWithPassword({email:loginEmail,password:loginPass})
    if(error){setLoginErr("Wrong email or password");setLoginBusy(false)}
    else{setShowLogin(false);setLoginBusy(false)}
  }

  const logout=async()=>await supabase.auth.signOut()

  const addBooking=async(b)=>{
    const{error}=await supabase.from("bookings").insert([{
      name:b.name,phone:b.phone,email:b.email,notes:b.notes,
      service:b.service,service_id:b.serviceId,
      date:b.date,time:b.time,status:"pending",ai_message:""
    }])
    if(!error){
      fetchAll()
      try{
        await fetch("/api/notify",{method:"POST",headers:{"Content-Type":"application/json"},
          body:JSON.stringify({name:b.name,phone:b.phone,email:b.email,notes:b.notes,service:b.service,date:b.date,time:b.time})})
      }catch(_){}
    }
    return!error
  }

  const respond=(id,dec)=>{
    const booking=bookings.find(b=>b.id===id)
    if(!booking) return
    const msg=buildMsg(dec,booking.name,booking.service,booking.date,booking.time)
    let phone=booking.phone?.replace(/\D/g,"")
    if(phone&&phone.length===10) phone="1"+phone
    const email=booking.email
    supabase.from("bookings").update({status:dec==="confirm"?"confirmed":"declined",ai_message:msg}).eq("id",id).then(()=>fetchAll())
    if(phone) window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`,"_blank")
    else if(email) window.open(`mailto:${email}?subject=${encodeURIComponent("Your Elixir Beauty Appointment")}&body=${encodeURIComponent(msg)}`,"_blank")
  }

  const saveAvail=async(newAvail)=>{
    setAvail(newAvail)
    await supabase.from("app_settings").upsert({key:"availability",value:newAvail})
  }

  const addGalleryImg=async(file)=>{
    const reader=new FileReader()
    reader.onload=async(e)=>{
      const{error}=await supabase.from("gallery").insert([{image_data:e.target.result,caption:""}])
      if(!error) fetchAll()
    }
    reader.readAsDataURL(file)
  }

  const deleteGalleryImg=async(id)=>{
    await supabase.from("gallery").delete().eq("id",id)
    fetchAll()
  }

  if(!authReady||!ready)return(<div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}><div className="dots"><span/><span/><span/></div></div>)

  if(user){
    return(
      <>
        <style>{FONT+CSS}</style>
        {toast&&<div className="toast">🔔 {toast}</div>}
        <OwnerView bookings={bookings} onRespond={respond} onLogout={logout} userEmail={user.email} avail={avail} onSaveAvail={saveAvail} gallery={gallery} onAddImg={addGalleryImg} onDeleteImg={deleteGalleryImg}/>
      </>
    )
  }

  return(
    <>
      <style>{FONT+CSS}</style>
      {showLogin&&(
        <div style={{position:"fixed",inset:0,background:"#1C0F2ECC",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(6px)"}}>
          <div className="login-card">
            <div className="login-title">Elixir Beauty</div>
            <div className="login-sub">Owner Access</div>
            {loginErr&&<div className="login-err">{loginErr}</div>}
            <div className="f-group" style={{marginBottom:14,textAlign:"left"}}>
              <label className="f-label">Email</label>
              <input className="f-input" type="email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} placeholder="owner@email.com"/>
            </div>
            <div className="f-group" style={{marginBottom:20,textAlign:"left"}}>
              <label className="f-label">Password</label>
              <input className="f-input" type="password" value={loginPass} onChange={e=>setLoginPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="••••••••"/>
            </div>
            <button className="btn btn-ink" style={{width:"100%",justifyContent:"center"}} onClick={login} disabled={loginBusy}>
              {loginBusy?<span className="dots"><span/><span/><span/></span>:"Sign In"}
            </button>
            <button onClick={()=>{setShowLogin(false);setLoginErr("")}} style={{marginTop:12,background:"none",border:"none",color:"var(--muted)",cursor:"pointer",fontSize:13,fontFamily:"DM Sans,sans-serif"}}>Cancel</button>
          </div>
        </div>
      )}
      <CustomerView onBook={addBooking} bookings={bookings} avail={avail} gallery={gallery} onOwnerClick={()=>setShowLogin(true)}/>
    </>
  )
}
function CustomerView({onBook,bookings,avail,gallery,onOwnerClick}){
  const [step,setStep]=useState(1)
  const [svc,setSvc]=useState(null)
  const [cal,setCal]=useState(()=>{const t=new Date();return{y:t.getFullYear(),m:t.getMonth()}})
  const [date,setDate]=useState("")
  const [time,setTime]=useState("")
  const [form,setForm]=useState({name:"",phone:"",email:"",notes:"",photo:null})
  const [busy,setBusy]=useState(false)
  const [showGallery,setShowGallery]=useState(false)

  const bookedTimes=bookings.filter(b=>b.date===date&&b.status!=="declined").map(b=>b.time)
  const dayOfWeek=date?new Date(date+"T00:00:00").getDay():-1
  const dayAvail=date?avail.days.includes(dayOfWeek):true
  const availTimes=avail.times||ALL_TIMES

  const daysInMonth=new Date(cal.y,cal.m+1,0).getDate()
  const firstDay=new Date(cal.y,cal.m,1).getDay()
  const todISO=todayISO()
  const prevMo=()=>setCal(c=>c.m===0?{y:c.y-1,m:11}:{...c,m:c.m-1})
  const nextMo=()=>setCal(c=>c.m===11?{y:c.y+1,m:0}:{...c,m:c.m+1})

  const setPhone=(val)=>{
    const digits=val.replace(/\D/g,"").slice(0,10)
    setForm(p=>({...p,phone:digits}))
  }

  const submit=async()=>{
    setBusy(true)
    const phoneToSend=form.phone?"+1"+form.phone:""
    const ok=await onBook({...form,phone:phoneToSend,service:svc.name,serviceId:svc.id,date,time})
    setBusy(false)
    if(ok)setStep(5)
  }
  const reset=()=>{setStep(1);setSvc(null);setDate("");setTime("");setForm({name:"",phone:"",email:"",notes:"",photo:null})}

  if(showGallery){
    return(
      <div style={{minHeight:"100vh",background:"var(--cream)"}}>
        <div style={{background:var(--plum),padding:"16px 20px",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setShowGallery(false)} style={{background:"none",border:"1px solid #FFFFFF40",borderRadius:9,padding:"7px 14px",color:"#FDF8F2",cursor:"pointer",fontFamily:"DM Sans,sans-serif",fontSize:13}}>← Back</button>
          <span style={{fontFamily:"Cormorant Garamond,serif",fontSize:20,color:"#FDF8F2"}}>Our Work</span>
        </div>
        <div style={{padding:"24px 20px",maxWidth:740,margin:"0 auto"}}>
          {gallery.length===0?(<div className="empty-state"><div className="empty-icon">🌿</div><div className="empty-title">Coming soon</div><div className="empty-sub">Gallery will be updated soon</div></div>):(
            <div className="gallery-grid">
              {gallery.map(g=>(<img key={g.id} src={g.image_data} alt="Elixir Beauty work" className="gallery-img"/>))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return(
    <div style={{minHeight:"100vh",background:"var(--cream)"}}>
      <div className="hero">
        <span className="hero-spark" style={{top:"18%",left:"12%",animationDelay:"0s"}}>✦</span>
        <span className="hero-spark" style={{top:"30%",right:"10%",animationDelay:"1.5s"}}>✧</span>
        <span className="hero-spark" style={{bottom:"20%",left:"22%",animationDelay:"0.8s"}}>✦</span>
        <div className="hero-eyebrow a1">Reservation en ligne</div>
        <div className="hero-title a2">Elixir <em>Beauty</em></div>
        <div className="hero-line a3"/>
        <div className="hero-sub a3">Braids, twists, locs and more — book your appointment in minutes.</div>
        <button onClick={()=>setShowGallery(true)} style={{marginTop:20,background:"#FFFFFF18",border:"1px solid #FFFFFF30",borderRadius:20,padding:"8px 20px",color:"#FDF8F2",cursor:"pointer",fontFamily:"DM Sans,sans-serif",fontSize:12,letterSpacing:1,position:"relative"}}>View Our Work ✨</button>
      </div>
      <div className="bk-body">
        {step<5&&(<div className="steps-bar a4">{[1,2,3,4].map((s,i)=>(<span key={s} style={{display:"contents"}}><div className={`step-node ${step===s?"active":step>s?"done":"idle"}`}>{step>s?"✓":s}</div>{i<3&&<div className="step-line"/>}</span>))}</div>)}
        {step===1&&(
          <div className="a4">
            <div className="bk-card">
              <div className="card-hl">Choose your style</div>
              <div className="card-sub">What are you coming in for?</div>
              <div className="svc-grid">
                {SERVICES.map(s=>(<button key={s.id} className={`svc-btn ${svc?.id===s.id?"sel":""}`} onClick={()=>setSvc(s)}><span className="svc-icon">{s.icon}</span><span className="svc-name">{s.name}</span><span className="svc-dur">{s.dur}</span><span className="svc-price">{s.price}</span></button>))}
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"flex-end"}}><button className="btn btn-ink" disabled={!svc} onClick={()=>setStep(2)}>Continue</button></div>
          </div>
        )}
        {step===2&&(
          <div className="a4">
            <div className="bk-card">
              <div className="card-hl">Pick a date and time</div>
              <div className="card-sub">Sundays closed</div>
              <div className="cal-nav-row">
                <div className="cal-month">{MONTHS[cal.m]} {cal.y}</div>
                <div style={{display:"flex",gap:8}}><button className="cal-arrow" onClick={prevMo}>&#8249;</button><button className="cal-arrow" onClick={nextMo}>&#8250;</button></div>
              </div>
              <div className="cal-grid">
                {DAYS.map(d=><div key={d} className="cal-dl">{d[0]}</div>)}
                {Array(firstDay).fill(null).map((_,i)=><div key={`e${i}`}/>)}
                {Array(daysInMonth).fill(null).map((_,i)=>{
                  const iso=toISO(cal.y,cal.m,i+1)
                  const past=iso<todISO
                  const dow=new Date(cal.y,cal.m,i+1).getDay()
                  const unavail=!avail.days.includes(dow)
                  return(<button key={i} className={`cal-d ${date===iso?"sel":""} ${iso===todISO?"tod":""}`} disabled={past||unavail} onClick={()=>{setDate(iso);setTime("")}}>{i+1}</button>)
                })}
              </div>
              {date&&dayAvail&&(
                <>
                  <div style={{fontSize:13,color:"var(--muted)",marginBottom:12}}>Available times for <strong style={{color:"var(--ink)"}}>{showDate(date)}</strong></div>
                  <div className="time-grid">
                    {ALL_TIMES.map(t=>{
                      const booked=bookedTimes.includes(t)
                      const unavailTime=!availTimes.includes(t)
                      return(<button key={t} className={`time-btn ${time===t?"sel":""} ${booked?"booked":""} ${unavailTime?"unavail":""}`} disabled={booked||unavailTime} onClick={()=>setTime(t)}>{t}</button>)
                    })}
                  </div>
                </>
              )}
              {date&&!dayAvail&&<div style={{textAlign:"center",padding:"20px",color:"var(--muted)",fontSize:13}}>Not available this day — please choose another date</div>}
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}><button className="btn btn-out" onClick={()=>setStep(1)}>Back</button><button className="btn btn-ink" disabled={!date||!time} onClick={()=>setStep(3)}>Continue</button></div>
          </div>
        )}
        {step===3&&(
          <div className="a4">
            <div className="bk-card">
              <div className="card-hl">Your information</div>
              <div className="card-sub">So we can reach you with your confirmation</div>
              <div className="f-grid">
                <div className="f-group"><label className="f-label">Full Name *</label><input className="f-input" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Jane Doe"/></div>
                <div className="f-group">
                  <label className="f-label">Phone / WhatsApp *</label>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <div style={{background:"var(--cream)",border:"1.5px solid var(--border)",borderRadius:11,padding:"12px 14px",fontSize:14,color:"var(--ink)",whiteSpace:"nowrap",fontWeight:600}}>+1</div>
                    <input className="f-input" value={form.phone} onChange={e=>setPhone(e.target.value)} placeholder="5141234567" maxLength={10}/>
                  </div>
                </div>
              </div>
              <div className="f-grid">
                <div className="f-group"><label className="f-label">Email (optional)</label><input className="f-input" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="jane@email.com"/></div>
              </div>
              <div className="f-grid" style={{gridTemplateColumns:"1fr"}}>
                <div className="f-group"><label className="f-label">Hair notes / Special requests</label><textarea className="f-textarea" value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} placeholder="Hair length, allergies, inspiration..."/></div>
              </div>
              <div className="f-group" style={{marginTop:4}}>
                <label className="f-label">Inspiration photo (optional)</label>
                <div className="upload-box" onClick={()=>document.getElementById("photo-upload").click()}>
                  {form.photo?<img src={URL.createObjectURL(form.photo)} style={{width:"100%",maxHeight:160,objectFit:"cover",borderRadius:10}} alt="inspiration"/>:<><div style={{fontSize:32,marginBottom:8}}>📸</div><div style={{fontSize:13,color:"var(--muted)"}}>Tap to upload an inspiration photo</div></>}
                </div>
                <input id="photo-upload" type="file" accept="image/*" style={{display:"none"}} onChange={e=>setForm(p=>({...p,photo:e.target.files[0]||null}))}/>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}><button className="btn btn-out" onClick={()=>setStep(2)}>Back</button><button className="btn btn-ink" disabled={!form.name.trim()||!form.phone.trim()} onClick={()=>setStep(4)}>Review</button></div>
          </div>
        )}
        {step===4&&(
          <div className="a4">
            <div className="bk-card">
              <div className="card-hl">Confirm your booking</div>
              <div className="card-sub">Everything look good?</div>
              {[{l:"Service",v:svc?.name},{l:"Estimate",v:svc?.price},{l:"Duration",v:svc?.dur},{l:"Date",v:showDate(date)},{l:"Time",v:time},{l:"Name",v:form.name},{l:"Phone",v:"+1"+form.phone},form.email&&{l:"Email",v:form.email},form.notes&&{l:"Notes",v:form.notes}].filter(Boolean).map(r=>(<div className="sum-row" key={r.l}><span className="sum-label">{r.l}</span><span className="sum-val">{r.v}</span></div>))}
              {form.photo&&<div style={{marginTop:12}}><img src={URL.createObjectURL(form.photo)} style={{width:"100%",maxHeight:160,objectFit:"cover",borderRadius:12}} alt="inspiration"/></div>}
              <div style={{marginTop:20,padding:"14px",background:"#FBF6EE",borderRadius:12,border:"1px solid var(--border)",fontSize:13,color:"var(--muted)",lineHeight:1.65}}>Your request will be sent to Elixir Beauty. You will receive a WhatsApp confirmation once approved.</div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}><button className="btn btn-out" onClick={()=>setStep(3)}>Back</button><button className="btn btn-gold" disabled={busy} onClick={submit}>{busy?<span className="dots"><span/><span/><span/></span>:"Send Request"}</button></div>
          </div>
        )}
        {step===5&&(
          <div className="bk-card a4">
            <div className="success">
              <div className="suc-icon">🌿</div>
              <div className="suc-title">Request received!</div>
              <div className="suc-sub">Thank you <strong>{form.name}</strong>! Your request for <strong>{svc?.name}</strong> on <strong>{showDate(date)} at {time}</strong> has been sent. You will receive a WhatsApp message once confirmed.</div>
              <button className="btn btn-ink" style={{marginTop:28}} onClick={reset}>Book another appointment</button>
            </div>
          </div>
        )}
        <div style={{textAlign:"center",marginTop:40,paddingBottom:20}}>
          <button onClick={onOwnerClick} style={{background:"none",border:"none",color:"var(--border)",fontSize:11,cursor:"pointer",fontFamily:"DM Sans,sans-serif",letterSpacing:1}}>owner access</button>
        </div>
      </div>
    </div>
  )
}
function OwnerView({bookings,onRespond,onLogout,userEmail,avail,onSaveAvail,gallery,onAddImg,onDeleteImg}){
  const [view,setView]=useState("home")

  const pending=bookings.filter(b=>b.status==="pending")
  const confirmed=bookings.filter(b=>b.status==="confirmed")
  const declined=bookings.filter(b=>b.status==="declined")

  const getList=()=>{
    if(view==="pending") return pending
    if(view==="confirmed") return confirmed
    if(view==="declined") return declined
    if(view==="all") return bookings
    return []
  }

  const getTitle=()=>{
    if(view==="pending") return "Pending Requests"
    if(view==="confirmed") return "Confirmed"
    if(view==="declined") return "Declined"
    if(view==="all") return "All Reservations"
    if(view==="availability") return "My Availability"
    if(view==="gallery") return "My Gallery"
    return "Dashboard"
  }

  return(
    <div className="o-shell">
      <div className="o-header">
        <div>
          <div className="o-header-title">Elixir Beauty</div>
          <div className="o-header-email">{userEmail}</div>
        </div>
        <button onClick={onLogout} style={{background:"#FFFFFF18",border:"none",color:"#FDF8F2",padding:"8px 16px",borderRadius:9,cursor:"pointer",fontFamily:"DM Sans,sans-serif",fontSize:12}}>Sign out</button>
      </div>

      {view!=="home"&&(
        <div className="detail-header">
          <button className="detail-back" onClick={()=>setView("home")}>← Home</button>
          <div className="detail-title">{getTitle()}</div>
        </div>
      )}

      <div className="o-main">
        {view==="home"&&(
          <>
            <div className="o-stats-grid">
              {[
                {l:"Pending",v:pending.length,cls:"gold",id:"pending"},
                {l:"Confirmed",v:confirmed.length,cls:"",id:"confirmed"},
                {l:"Declined",v:declined.length,cls:"",id:"declined"},
                {l:"All",v:bookings.length,cls:"",id:"all"},
              ].map(s=>(
                <div key={s.l} className="o-stat" onClick={()=>setView(s.id)}>
                  <div className="o-stat-lbl">{s.l}</div>
                  <div className={`o-stat-val ${s.cls}`}>{s.v}</div>
                </div>
              ))}
            </div>
            <div className="o-nav-grid">
              <button className="o-nav-btn" onClick={()=>setView("availability")}>
                <span className="o-nav-icon">📅</span>
                <div className="o-nav-label">My Availability</div>
              </button>
              <button className="o-nav-btn" onClick={()=>setView("gallery")}>
                <span className="o-nav-icon">🖼️</span>
                <div className="o-nav-label">My Gallery</div>
              </button>
            </div>
            {pending.length>0&&(
              <div>
                <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:20,color:"var(--ink)",marginBottom:14}}>Pending Requests</div>
                <BookingList bookings={pending} onRespond={onRespond} allBookings={bookings}/>
              </div>
            )}
          </>
        )}

        {["pending","confirmed","declined","all"].includes(view)&&(
          <BookingList bookings={getList()} onRespond={onRespond} allBookings={bookings}/>
        )}

        {view==="availability"&&(
          <AvailView avail={avail} onSave={onSaveAvail}/>
        )}

        {view==="gallery"&&(
          <GalleryView gallery={gallery} onAdd={onAddImg} onDelete={onDeleteImg}/>
        )}
      </div>
    </div>
  )
}

function BookingList({bookings,onRespond,allBookings}){
  if(!bookings.length)return(<div className="empty-state"><div className="empty-icon">📭</div><div className="empty-title">Nothing here</div><div className="empty-sub">No reservations in this category</div></div>)
  return(
    <div>
      {bookings.map(b=>(
        <div className="res-card" key={b.id}>
          <div className="res-top">
            <div className="res-av">{b.name?.[0]?.toUpperCase()||"?"}</div>
            <div className="res-info">
              <div className="res-name">{b.name}</div>
              <div className="res-meta">
                {b.service}<br/>
                {showDate(b.date)} at {b.time}<br/>
                {b.phone&&`Phone: ${b.phone}`}{b.email&&`  Email: ${b.email}`}
                {b.notes&&<><br/>Notes: {b.notes}</>}
              </div>
            </div>
            <div className="res-right">
              <span className={`chip chip-${b.status}`}>{b.status}</span>
              <span style={{fontSize:10,color:"var(--muted)"}}>{new Date(b.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          {b.status==="pending"&&(
            <div className="res-actions">
              <button className="btn btn-green btn-sm" onClick={()=>onRespond(b.id,"confirm")}>✓ Confirm & WhatsApp</button>
              <button className="btn btn-red btn-sm" onClick={()=>onRespond(b.id,"decline")}>✕ Decline</button>
            </div>
          )}
          {b.ai_message&&b.ai_message!=="generating"&&(
            <div className="ai-box">
              <div className="ai-lbl"><span className="ai-dot"/> Message sent</div>
              <div className="ai-text">{b.ai_message}</div>
              <div className="send-btns">
                {b.phone&&(<a className="btn-wa" href={`https://api.whatsapp.com/send?phone=${b.phone.replace(/\D/g,"")}&text=${encodeURIComponent(b.ai_message)}`} target="_blank" rel="noreferrer">Resend WhatsApp</a>)}
                {b.email&&(<a className="btn-em" href={`mailto:${b.email}?subject=${encodeURIComponent("Your Elixir Beauty Appointment")}&body=${encodeURIComponent(b.ai_message)}`}>Resend Email</a>)}
                <button className="btn-copy" onClick={()=>navigator.clipboard?.writeText(b.ai_message)}>Copy</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function AvailView({avail,onSave}){
  const [days,setDays]=useState(avail.days||[1,2,3,4,5,6])
  const [times,setTimes]=useState(avail.times||[...ALL_TIMES])
  const [saved,setSaved]=useState(false)

  const toggleDay=d=>{
    setDays(prev=>prev.includes(d)?prev.filter(x=>x!==d):[...prev,d].sort())
  }
  const toggleTime=t=>{
    setTimes(prev=>prev.includes(t)?prev.filter(x=>x!==t):[...prev,t].sort())
  }
  const save=async()=>{
    await onSave({days,times})
    setSaved(true)
    setTimeout(()=>setSaved(false),2000)
  }

  return(
    <div>
      <div className="bk-card" style={{marginBottom:16}}>
        <div className="card-hl">Working Days</div>
        <div className="card-sub">Select the days you are available</div>
        <div className="avail-grid">
          {DAYS_SHORT.map((d,i)=>(
            <button key={i} className={`avail-day ${days.includes(i)?"on":""}`} onClick={()=>toggleDay(i)}>
              {d}
            </button>
          ))}
        </div>
      </div>
      <div className="bk-card" style={{marginBottom:16}}>
        <div className="card-hl">Working Hours</div>
        <div className="card-sub">Select the time slots you offer</div>
        <div className="time-avail-grid">
          {ALL_TIMES.map(t=>(
            <button key={t} className={`time-avail-btn ${times.includes(t)?"on":""}`} onClick={()=>toggleTime(t)}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <button className="btn btn-ink" onClick={save} style={{width:"100%",justifyContent:"center"}}>
        {saved?"✓ Saved!":"Save Availability"}
      </button>
    </div>
  )
}

function GalleryView({gallery,onAdd,onDelete}){
  return(
    <div>
      <div className="bk-card" style={{marginBottom:16}}>
        <div className="card-hl">Add Photos</div>
        <div className="card-sub">Show your work to clients</div>
        <div className="upload-box" onClick={()=>document.getElementById("gallery-upload").click()}>
          <div style={{fontSize:32,marginBottom:8}}>📸</div>
          <div style={{fontSize:13,color:"var(--muted)"}}>Tap to add a photo</div>
        </div>
        <input id="gallery-upload" type="file" accept="image/*" style={{display:"none"}} onChange={e=>{if(e.target.files[0])onAdd(e.target.files[0])}}/>
      </div>
      {gallery.length>0&&(
        <div className="bk-card">
          <div className="card-hl">Your Gallery</div>
          <div className="gallery-grid">
            {gallery.map(g=>(
              <div key={g.id} style={{position:"relative"}}>
                <img src={g.image_data} alt="work" className="gallery-img"/>
                <button onClick={()=>onDelete(g.id)} style={{position:"absolute",top:8,right:8,background:"#B83232CC",border:"none",color:"#fff",borderRadius:"50%",width:28,height:28,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
