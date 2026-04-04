import { useState, useEffect, useCallback } from "react"
import { supabase } from "./supabase.js"

const FR = {
  eyebrow: "Réservation en ligne",
  heroSub: "Tresses, twists, locs et plus — réservez votre rendez-vous en quelques minutes.",
  bookNow: "Réserver maintenant",
  viewWork: "Voir nos créations ✨",
  chooseStyle: "Choisissez votre style",
  chooseStyleSub: "Pour quoi venez-vous ?",
  pickDate: "Choisissez une date et heure",
  pickDateSub: "Fermé le dimanche",
  availTimes: "Heures disponibles pour",
  notAvail: "Pas disponible ce jour — choisissez une autre date",
  yourInfo: "Vos informations",
  yourInfoSub: "Pour vous contacter avec votre confirmation",
  fullName: "Nom complet *",
  phone: "Téléphone / WhatsApp *",
  email: "Courriel (optionnel)",
  notes: "Notes / Demandes spéciales",
  notesPlaceholder: "Longueur des cheveux, allergies, inspiration...",
  photoLabel: "Photo d'inspiration (optionnel)",
  photoTap: "Appuyez pour ajouter une photo",
  confirm: "Confirmez votre réservation",
  confirmSub: "Tout est correct ?",
  service: "Service",
  estimate: "Estimation",
  duration: "Durée",
  date: "Date",
  time: "Heure",
  name: "Nom",
  emailLabel: "Courriel",
  notesLabel: "Notes",
  requestNote: "Votre demande sera envoyée à Elixir Beauty. Vous recevrez une confirmation WhatsApp une fois approuvée.",
  sendRequest: "Envoyer la demande",
  back: "Retour",
  continue: "Continuer",
  review: "Vérifier",
  received: "Demande reçue !",
  receivedSub: "Vous recevrez un message WhatsApp une fois confirmé.",
  bookAnother: "Réserver un autre rendez-vous",
  ownerAccess: "accès propriétaire",
  followUs: "Suivez-nous",
  contactUs: "Contactez-nous",
  services: [
    {id:"box",icon:"🫧",name:"Box Braids",dur:"4-6 hrs",price:"À partir de 150$"},
    {id:"knotless",icon:"✨",name:"Knotless Braids",dur:"5-7 hrs",price:"À partir de 180$"},
    {id:"twist",icon:"🌀",name:"Senegalese Twist",dur:"4-5 hrs",price:"À partir de 140$"},
    {id:"locs",icon:"🌿",name:"Locs / Faux Locs",dur:"5-8 hrs",price:"À partir de 200$"},
    {id:"cornrows",icon:"〰️",name:"Cornrows",dur:"1-3 hrs",price:"À partir de 80$"},
    {id:"wig",icon:"👑",name:"Wig Install",dur:"1-2 hrs",price:"À partir de 90$"},
    {id:"natural",icon:"🌸",name:"Coiffure Naturelle",dur:"1-3 hrs",price:"À partir de 75$"},
    {id:"custom",icon:"💫",name:"Style Personnalisé",dur:"Variable",price:"Sur devis"},
  ]
}

const EN = {
  eyebrow: "Book online",
  heroSub: "Braids, twists, locs and more — book your appointment in minutes.",
  bookNow: "Book Now",
  viewWork: "View Our Work ✨",
  chooseStyle: "Choose your style",
  chooseStyleSub: "What are you coming in for?",
  pickDate: "Pick a date and time",
  pickDateSub: "Sundays closed",
  availTimes: "Available times for",
  notAvail: "Not available this day — please choose another date",
  yourInfo: "Your information",
  yourInfoSub: "So we can reach you with your confirmation",
  fullName: "Full Name *",
  phone: "Phone / WhatsApp *",
  email: "Email (optional)",
  notes: "Hair notes / Special requests",
  notesPlaceholder: "Hair length, allergies, inspiration...",
  photoLabel: "Inspiration photo (optional)",
  photoTap: "Tap to upload an inspiration photo",
  confirm: "Confirm your booking",
  confirmSub: "Everything look good?",
  service: "Service",
  estimate: "Estimate",
  duration: "Duration",
  date: "Date",
  time: "Time",
  name: "Name",
  emailLabel: "Email",
  notesLabel: "Notes",
  requestNote: "Your request will be sent to Elixir Beauty. You will receive a WhatsApp confirmation once approved.",
  sendRequest: "Send Request",
  back: "Back",
  continue: "Continue",
  review: "Review",
  received: "Request received!",
  receivedSub: "You will receive a WhatsApp message once confirmed.",
  bookAnother: "Book another appointment",
  ownerAccess: "owner access",
  followUs: "Follow us",
  contactUs: "Contact us",
  services: [
    {id:"box",icon:"🫧",name:"Box Braids",dur:"4-6 hrs",price:"Starting $150"},
    {id:"knotless",icon:"✨",name:"Knotless Braids",dur:"5-7 hrs",price:"Starting $180"},
    {id:"twist",icon:"🌀",name:"Senegalese Twist",dur:"4-5 hrs",price:"Starting $140"},
    {id:"locs",icon:"🌿",name:"Locs / Faux Locs",dur:"5-8 hrs",price:"Starting $200"},
    {id:"cornrows",icon:"〰️",name:"Cornrows",dur:"1-3 hrs",price:"Starting $80"},
    {id:"wig",icon:"👑",name:"Wig Install",dur:"1-2 hrs",price:"Starting $90"},
    {id:"natural",icon:"🌸",name:"Natural Hair Styling",dur:"1-3 hrs",price:"Starting $75"},
    {id:"custom",icon:"💫",name:"Custom Style",dur:"Varies",price:"On quote"},
  ]
}

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
@keyframes glow{0%,100%{box-shadow:0 0 12px #C8973A60,0 0 24px #C8973A30}50%{box-shadow:0 0 24px #C8973A90,0 0 48px #C8973A50,0 0 72px #C8973A20}}
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
.book-now-btn{
  display:inline-flex;align-items:center;gap:10px;
  background:var(--gold);color:#fff;border:none;
  padding:16px 36px;border-radius:100px;
  font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700;
  cursor:pointer;position:relative;margin-top:28px;
  letter-spacing:.5px;
  animation:glow 2.5s ease-in-out infinite;
  transition:transform .2s;
}
.book-now-btn:hover{transform:translateY(-2px) scale(1.03);}
.lang-toggle{position:absolute;top:20px;right:20px;display:flex;gap:4px;z-index:10;}
.lang-btn{background:#FFFFFF18;border:1px solid #FFFFFF30;border-radius:20px;padding:5px 12px;color:#FDF8F2;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:600;letter-spacing:1px;transition:all .18s;}
.lang-btn.active{background:var(--gold);border-color:var(--gold);}
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
.footer{background:var(--plum);padding:40px 24px;text-align:center;margin-top:40px;}
.footer-name{font-family:'Cormorant Garamond',serif;font-size:24px;color:#FDF8F2;margin-bottom:8px;}
.footer-bio{font-size:13px;color:#C8B4D8;max-width:320px;margin:0 auto 24px;line-height:1.6;}
.footer-social{display:flex;justify-content:center;gap:16px;margin-bottom:20px;flex-wrap:wrap;}
.footer-link{display:inline-flex;align-items:center;gap:7px;padding:9px 18px;border-radius:20px;background:#FFFFFF14;border:1px solid #FFFFFF20;color:#FDF8F2;text-decoration:none;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;transition:all .2s;cursor:pointer;}
.footer-link:hover{background:#FFFFFF24;border-color:#C8973A;color:var(--gold-lt);}
.footer-copy{font-size:10px;color:#9688A4;margin-top:16px;letter-spacing:1px;}
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
.profile-form{display:flex;flex-direction:column;gap:14px;}
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
const MONTHS_EN=["January","February","March","April","May","June","July","August","September","October","November","December"]
const MONTHS_FR=["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
const ALL_TIMES=["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"]

const toISO=(y,m,d)=>`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`
const todayISO=()=>{const t=new Date();return toISO(t.getFullYear(),t.getMonth(),t.getDate())}
const showDate=(iso,lang)=>{
  if(!iso)return""
  const[y,m,d]=iso.split("-")
  const months=lang==="fr"?MONTHS_FR:MONTHS_EN
  return`${months[+m-1]} ${+d}, ${y}`
}
const buildMsg=(dec,name,service,date,time)=>{
  const d=showDate(date,"en")
  return dec==="confirm"
    ?`Hi ${name}! Your booking for ${service} on ${d} at ${time} has been confirmed. We look forward to seeing you at Elixir Beauty. See you soon!`
    :`Hi ${name}, unfortunately the time slot on ${d} at ${time} is not available. We apologize. Please visit our booking page to choose another time. Elixir Beauty`
}

const DEFAULT_AVAIL={days:[1,2,3,4,5,6],times:[...ALL_TIMES]}
const DEFAULT_PROFILE={business_name:"Elixir Beauty",bio:"",phone:"",whatsapp:"",instagram:"",tiktok:"",email:""}

export default function App(){
  const [lang,setLang]=useState("en")
  const t=lang==="fr"?FR:EN
  const [bookings,setBookings]=useState([])
  const [avail,setAvail]=useState(DEFAULT_AVAIL)
  const [gallery,setGallery]=useState([])
  const [profile,setProfile]=useState(DEFAULT_PROFILE)
  const [ready,setReady]=useState(false)
  const [toast,setToast]=useState(null)
  const [user,setUser]=useState(null)
  const [authReady,setAuthReady]=useState(false)
  const [loginEmail,setLoginEmail]=useState("")
  const [loginPass,setLoginPass]=useState("")
  const [loginErr,setLoginErr]=useState("")
  const [loginBusy,setLoginBusy]=useState(false)
  const [showLogin,setShowLogin]=useState(false)
  const [booking,setBooking]=useState(false)

  useEffect(()=>{
    supabase.auth.getSession().then(({data:{session}})=>{setUser(session?.user||null);setAuthReady(true)})
    const{data:{subscription}}=supabase.auth.onAuthStateChange((_,session)=>{setUser(session?.user||null)})
    return()=>subscription.unsubscribe()
  },[])

  const fetchAll=useCallback(async()=>{
    const[{data:b},{data:s},{data:g},{data:p}]=await Promise.all([
      supabase.from("bookings").select("*").order("created_at",{ascending:false}),
      supabase.from("app_settings").select("*").eq("key","availability").single(),
      supabase.from("gallery").select("*").order("created_at",{ascending:false}),
      supabase.from("profile").select("*").eq("id",1).single()
    ])
    if(b)setBookings(b)
    if(s?.value)setAvail(s.value)
    if(g)setGallery(g)
    if(p)setProfile(p)
    setReady(true)
  },[])

  useEffect(()=>{fetchAll()},[fetchAll])

  useEffect(()=>{
    const channel=supabase.channel("bookings-live")
      .on("postgres_changes",{event:"*",schema:"public",table:"bookings"},()=>{
        fetchAll()
        if(user){setToast("🔔 New booking received!");setTimeout(()=>setToast(null),4000)}
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
    const bk=bookings.find(b=>b.id===id)
    if(!bk)return
    const msg=buildMsg(dec,bk.name,bk.service,bk.date,bk.time)
    let phone=bk.phone?.replace(/\D/g,"")
    if(phone&&phone.length===10)phone="1"+phone
    const email=bk.email
    supabase.from("bookings").update({status:dec==="confirm"?"confirmed":"declined",ai_message:msg}).eq("id",id).then(()=>fetchAll())
    if(phone)window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(msg)}`,"_blank")
    else if(email)window.open(`mailto:${email}?subject=${encodeURIComponent("Your Elixir Beauty Appointment")}&body=${encodeURIComponent(msg)}`,"_blank")
  }

  const saveAvail=async(newAvail)=>{
    setAvail(newAvail)
    await supabase.from("app_settings").upsert({key:"availability",value:newAvail})
  }

  const saveProfile=async(newProfile)=>{
    setProfile(newProfile)
    await supabase.from("profile").upsert({id:1,...newProfile})
  }

  const addGalleryImg=async(file)=>{
    const reader=new FileReader()
    reader.onload=async(e)=>{
      await supabase.from("gallery").insert([{image_data:e.target.result,caption:""}])
      fetchAll()
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
        {toast&&<div className="toast">{toast}</div>}
        <OwnerView bookings={bookings} onRespond={respond} onLogout={logout} userEmail={user.email} avail={avail} onSaveAvail={saveAvail} gallery={gallery} onAddImg={addGalleryImg} onDeleteImg={deleteGalleryImg} profile={profile} onSaveProfile={saveProfile}/>
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
      <CustomerView lang={lang} setLang={setLang} t={t} onBook={addBooking} bookings={bookings} avail={avail} gallery={gallery} profile={profile} onOwnerClick={()=>setShowLogin(true)} booking={booking} setBooking={setBooking}/>
    </>
  )
}
function CustomerView({lang,setLang,t,onBook,bookings,avail,gallery,profile,onOwnerClick,booking,setBooking}){
  const [step,setStep]=useState(1)
  const [svc,setSvc]=useState(null)
  const [cal,setCal]=useState(()=>{const d=new Date();return{y:d.getFullYear(),m:d.getMonth()}})
  const [date,setDate]=useState("")
  const [time,setTime]=useState("")
  const [form,setForm]=useState({name:"",phone:"",email:"",notes:"",photo:null})
  const [busy,setBusy]=useState(false)
  const [showGallery,setShowGallery]=useState(false)

  const MONTHS=lang==="fr"?MONTHS_FR:MONTHS_EN
  const bookedTimes=bookings.filter(b=>b.date===date&&b.status!=="declined").map(b=>b.time)
  const dayOfWeek=date?new Date(date+"T00:00:00").getDay():-1
  const safeAvail={days:avail?.days||[1,2,3,4,5,6],times:avail?.times||ALL_TIMES}
  const dayAvail=date?safeAvail.days.map(Number).includes(dayOfWeek):true
  const availTimes=safeAvail.times
  const daysInMonth=new Date(cal.y,cal.m+1,0).getDate()
  const firstDay=new Date(cal.y,cal.m,1).getDay()
  const todISO=todayISO()
  const prevMo=()=>setCal(c=>c.m===0?{y:c.y-1,m:11}:{...c,m:c.m-1})
  const nextMo=()=>setCal(c=>c.m===11?{y:c.y+1,m:0}:{...c,m:c.m+1})
  const setPhone=(val)=>{const digits=val.replace(/\D/g,"").slice(0,10);setForm(p=>({...p,phone:digits}))}
  const submit=async()=>{
    setBusy(true)
    const ok=await onBook({...form,phone:form.phone?"+1"+form.phone:"",service:svc.name,serviceId:svc.id,date,time})
    setBusy(false)
    if(ok)setStep(5)
  }
  const reset=()=>{setStep(1);setSvc(null);setDate("");setTime("");setForm({name:"",phone:"",email:"",notes:"",photo:null});setBooking(false)}
  const startBooking=()=>{setBooking(true);setStep(1)}

  if(showGallery){
    return(
      <div style={{minHeight:"100vh",background:"var(--cream)"}}>
        <div style={{background:"var(--plum)",padding:"16px 20px",display:"flex",alignItems:"center",gap:12}}>
          <button onClick={()=>setShowGallery(false)} style={{background:"none",border:"1px solid #FFFFFF40",borderRadius:9,padding:"7px 14px",color:"#FDF8F2",cursor:"pointer",fontFamily:"DM Sans,sans-serif",fontSize:13}}>← {t.back}</button>
          <span style={{fontFamily:"Cormorant Garamond,serif",fontSize:20,color:"#FDF8F2"}}>{lang==="fr"?"Nos Créations":"Our Work"}</span>
        </div>
        <div style={{padding:"24px 20px",maxWidth:740,margin:"0 auto"}}>
          {gallery.length===0
            ?(<div className="empty-state"><div className="empty-icon">🌿</div><div className="empty-title">{lang==="fr"?"Bientôt disponible":"Coming soon"}</div></div>)
            :(<div className="gallery-grid">{gallery.map(g=>(<img key={g.id} src={g.image_data} alt="work" className="gallery-img"/>))}</div>)
          }
        </div>
      </div>
    )
  }

  if(!booking){
    return(
      <div style={{minHeight:"100vh",background:"var(--cream)",display:"flex",flexDirection:"column"}}>
        <div className="hero" style={{paddingBottom:120}}>
          <div className="lang-toggle">
            <button className={`lang-btn ${lang==="en"?"active":""}`} onClick={()=>setLang("en")}>EN</button>
            <button className={`lang-btn ${lang==="fr"?"active":""}`} onClick={()=>setLang("fr")}>FR</button>
          </div>
          <span className="hero-spark" style={{top:"18%",left:"12%",animationDelay:"0s"}}>✦</span>
          <span className="hero-spark" style={{top:"30%",right:"10%",animationDelay:"1.5s"}}>✧</span>
          <span className="hero-spark" style={{bottom:"20%",left:"22%",animationDelay:"0.8s"}}>✦</span>
          <div className="hero-eyebrow a1">{t.eyebrow}</div>
          <div className="hero-title a2">Elixir <em>Beauty</em></div>
          <div className="hero-line a3"/>
          {profile.bio&&<div className="hero-sub a3">{profile.bio}</div>}
          {!profile.bio&&<div className="hero-sub a3">{t.heroSub}</div>}
          <div style={{marginTop:20,position:"relative"}}>
            <button onClick={()=>setShowGallery(true)} style={{background:"#FFFFFF14",border:"1px solid #FFFFFF25",borderRadius:20,padding:"8px 20px",color:"#C8B4D8",cursor:"pointer",fontFamily:"DM Sans,sans-serif",fontSize:12,letterSpacing:1}}>
              {t.viewWork}
            </button>
          </div>
         
        </div>

        {(profile.instagram||profile.tiktok||profile.phone||profile.whatsapp||profile.email)&&(
          <div className="footer">
            <div className="footer-name">{profile.business_name||"Elixir Beauty"}</div>
            {profile.bio&&<div className="footer-bio">{profile.bio}</div>}
            <div className="footer-social">
              {profile.instagram&&(
                <a className="footer-link" href={`https://instagram.com/${profile.instagram.replace("@","")}`} target="_blank" rel="noreferrer">
                  <span>📸</span> {profile.instagram.startsWith("@")?profile.instagram:"@"+profile.instagram}
                </a>
              )}
              {profile.tiktok&&(
                <a className="footer-link" href={`https://tiktok.com/@${profile.tiktok.replace("@","")}`} target="_blank" rel="noreferrer">
                  <span>🎵</span> {profile.tiktok.startsWith("@")?profile.tiktok:"@"+profile.tiktok}
                </a>
              )}
              {profile.phone&&(
                <a className="footer-link" href={`tel:${profile.phone}`}>
                  <span>📞</span> {profile.phone}
                </a>
              )}
              {profile.whatsapp&&(
                <a className="footer-link" href={`https://wa.me/${profile.whatsapp.replace(/\D/g,"")}`} target="_blank" rel="noreferrer">
                  <span>💬</span> WhatsApp
                </a>
              )}
              {profile.email&&(
                <a className="footer-link" href={`mailto:${profile.email}`}>
                  <span>✉️</span> {profile.email}
                </a>
              )}
            </div>
          <div style={{textAlign:"center",padding:"60px 20px 40px",display:"flex",flexDirection:"column",alignItems:"center",gap:20}}>
  <button onClick={startBooking} style={{background:"#1C0F2E",color:"#C8973A",border:"2.5px solid #C8973A",padding:"18px 48px",borderRadius:100,fontFamily:"DM Sans,sans-serif",fontSize:17,fontWeight:700,cursor:"pointer",letterSpacing:1,animation:"glow 2.5s ease-in-out infinite",boxShadow:"0 8px 32px rgba(200,151,58,0.3)"}}>✨ {t.bookNow}</button>
  <button onClick={onOwnerClick} style={{background:"none",border:"none",color:"#D0C4B8",fontSize:11,cursor:"pointer",fontFamily:"DM Sans,sans-serif",letterSpacing:1}}>{t.ownerAccess}</button>
</div>

  <button onClick={startBooking} style={{display:"block",margin:"0 auto 32px",background:"#2D1B3D",color:"#C8973A",border:"2px solid #C8973A",padding:"16px 44px",borderRadius:100,fontFamily:"DM Sans,sans-serif",fontSize:16,fontWeight:700,cursor:"pointer",letterSpacing:1,animation:"glow 2.5s ease-in-out infinite",boxShadow:"0 4px 24px #2D1B3D40"}}>✨ {t.bookNow}</button>
              <button onClick={onOwnerClick} style={{background:"none",border:"none",color:"#FFFFFF18",fontSize:10,cursor:"pointer",fontFamily:"DM Sans,sans-serif",letterSpacing:1}}>{t.ownerAccess}</button>
            </div>
            <div className="footer-copy">© {new Date().getFullYear()} {profile.business_name||"Elixir Beauty"}</div>
          </div>
        )}

        {!(profile.instagram||profile.tiktok||profile.phone||profile.whatsapp||profile.email)&&(
          <div style={{textAlign:"center",padding:"40px 20px"}}>
            <button onClick={onOwnerClick} style={{background:"none",border:"none",color:"var(--border)",fontSize:11,cursor:"pointer",fontFamily:"DM Sans,sans-serif",letterSpacing:1}}>{t.ownerAccess}</button>
          </div>
        )}
      </div>
    )
  }

  return(
    <div style={{minHeight:"100vh",background:"var(--cream)"}}>
      <div style={{background:"var(--plum)",padding:"16px 20px",display:"flex",alignItems:"center",gap:12}}>
        <button onClick={()=>setBooking(false)} style={{background:"none",border:"1px solid #FFFFFF40",borderRadius:9,padding:"7px 14px",color:"#FDF8F2",cursor:"pointer",fontFamily:"DM Sans,sans-serif",fontSize:13}}>← {t.back}</button>
        <span style={{fontFamily:"Cormorant Garamond,serif",fontSize:20,color:"#FDF8F2"}}>{profile.business_name||"Elixir Beauty"}</span>
        <div style={{marginLeft:"auto",display:"flex",gap:4}}>
          <button className={`lang-btn ${lang==="en"?"active":""}`} onClick={()=>setLang("en")}>EN</button>
          <button className={`lang-btn ${lang==="fr"?"active":""}`} onClick={()=>setLang("fr")}>FR</button>
        </div>
      </div>
      <div className="bk-body">
        {step<5&&(<div className="steps-bar a4">{[1,2,3,4].map((s,i)=>(<span key={s} style={{display:"contents"}}><div className={`step-node ${step===s?"active":step>s?"done":"idle"}`}>{step>s?"✓":s}</div>{i<3&&<div className="step-line"/>}</span>))}</div>)}

        {step===1&&(
          <div className="a4">
            <div className="bk-card">
              <div className="card-hl">{t.chooseStyle}</div>
              <div className="card-sub">{t.chooseStyleSub}</div>
              <div className="svc-grid">
                {t.services.map(s=>(<button key={s.id} className={`svc-btn ${svc?.id===s.id?"sel":""}`} onClick={()=>setSvc(s)}><span className="svc-icon">{s.icon}</span><span className="svc-name">{s.name}</span><span className="svc-dur">{s.dur}</span><span className="svc-price">{s.price}</span></button>))}
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"flex-end"}}><button className="btn btn-ink" disabled={!svc} onClick={()=>setStep(2)}>{t.continue}</button></div>
          </div>
        )}

        {step===2&&(
          <div className="a4">
            <div className="bk-card">
              <div className="card-hl">{t.pickDate}</div>
              <div className="card-sub">{t.pickDateSub}</div>
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
                  const unavail=!safeAvail.days.map(Number).includes(dow)
                  return(<button key={i} className={`cal-d ${date===iso?"sel":""} ${iso===todISO?"tod":""}`} disabled={past||unavail} onClick={()=>{setDate(iso);setTime("")}}>{i+1}</button>)
                })}
              </div>
              {date&&dayAvail&&(
                <>
                  <div style={{fontSize:13,color:"var(--muted)",marginBottom:12}}>{t.availTimes} <strong style={{color:"var(--ink)"}}>{showDate(date,lang)}</strong></div>
                  <div className="time-grid">
                    {ALL_TIMES.map(t2=>{
                      const booked=bookedTimes.includes(t2)
                      const unavailTime=!availTimes.includes(t2)
                      return(<button key={t2} className={`time-btn ${time===t2?"sel":""} ${booked?"booked":""} ${unavailTime?"unavail":""}`} disabled={booked||unavailTime} onClick={()=>setTime(t2)}>{t2}</button>)
                    })}
                  </div>
                </>
              )}
              {date&&!dayAvail&&<div style={{textAlign:"center",padding:"20px",color:"var(--muted)",fontSize:13}}>{t.notAvail}</div>}
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}><button className="btn btn-out" onClick={()=>setStep(1)}>{t.back}</button><button className="btn btn-ink" disabled={!date||!time} onClick={()=>setStep(3)}>{t.continue}</button></div>
          </div>
        )}

        {step===3&&(
          <div className="a4">
            <div className="bk-card">
              <div className="card-hl">{t.yourInfo}</div>
              <div className="card-sub">{t.yourInfoSub}</div>
              <div className="f-grid">
                <div className="f-group"><label className="f-label">{t.fullName}</label><input className="f-input" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Jane Doe"/></div>
                <div className="f-group">
                  <label className="f-label">{t.phone}</label>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <div style={{background:"var(--cream)",border:"1.5px solid var(--border)",borderRadius:11,padding:"12px 14px",fontSize:14,color:"var(--ink)",whiteSpace:"nowrap",fontWeight:600}}>+1</div>
                    <input className="f-input" value={form.phone} onChange={e=>setPhone(e.target.value)} placeholder="5141234567" maxLength={10}/>
                  </div>
                </div>
              </div>
              <div className="f-grid">
                <div className="f-group"><label className="f-label">{t.email}</label><input className="f-input" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="jane@email.com"/></div>
              </div>
              <div className="f-grid" style={{gridTemplateColumns:"1fr"}}>
                <div className="f-group"><label className="f-label">{t.notes}</label><textarea className="f-textarea" value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} placeholder={t.notesPlaceholder}/></div>
              </div>
              <div className="f-group" style={{marginTop:4}}>
                <label className="f-label">{t.photoLabel}</label>
                <div className="upload-box" onClick={()=>document.getElementById("photo-upload").click()}>
                  {form.photo?<img src={URL.createObjectURL(form.photo)} style={{width:"100%",maxHeight:160,objectFit:"cover",borderRadius:10}} alt="inspiration"/>:<><div style={{fontSize:32,marginBottom:8}}>📸</div><div style={{fontSize:13,color:"var(--muted)"}}>{t.photoTap}</div></>}
                </div>
                <input id="photo-upload" type="file" accept="image/*" style={{display:"none"}} onChange={e=>setForm(p=>({...p,photo:e.target.files[0]||null}))}/>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}><button className="btn btn-out" onClick={()=>setStep(2)}>{t.back}</button><button className="btn btn-ink" disabled={!form.name.trim()||!form.phone.trim()} onClick={()=>setStep(4)}>{t.review}</button></div>
          </div>
        )}

        {step===4&&(
          <div className="a4">
            <div className="bk-card">
              <div className="card-hl">{t.confirm}</div>
              <div className="card-sub">{t.confirmSub}</div>
              {[{l:t.service,v:svc?.name},{l:t.estimate,v:svc?.price},{l:t.duration,v:svc?.dur},{l:t.date,v:showDate(date,lang)},{l:t.time,v:time},{l:t.name,v:form.name},{l:t.phone,v:"+1"+form.phone},form.email&&{l:t.emailLabel,v:form.email},form.notes&&{l:t.notesLabel,v:form.notes}].filter(Boolean).map(r=>(<div className="sum-row" key={r.l}><span className="sum-label">{r.l}</span><span className="sum-val">{r.v}</span></div>))}
              {form.photo&&<div style={{marginTop:12}}><img src={URL.createObjectURL(form.photo)} style={{width:"100%",maxHeight:160,objectFit:"cover",borderRadius:12}} alt="inspiration"/></div>}
              <div style={{marginTop:20,padding:"14px",background:"#FBF6EE",borderRadius:12,border:"1px solid var(--border)",fontSize:13,color:"var(--muted)",lineHeight:1.65}}>{t.requestNote}</div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between"}}><button className="btn btn-out" onClick={()=>setStep(3)}>{t.back}</button><button className="btn btn-gold" disabled={busy} onClick={submit}>{busy?<span className="dots"><span/><span/><span/></span>:t.sendRequest}</button></div>
          </div>
        )}

        {step===5&&(
          <div className="bk-card a4">
            <div className="success">
              <div className="suc-icon">🌿</div>
              <div className="suc-title">{t.received}</div>
              <div className="suc-sub">{lang==="fr"?`Merci ${form.name}! Votre demande pour ${svc?.name} le ${showDate(date,lang)} à ${time} a été envoyée.`:`Thank you ${form.name}! Your request for ${svc?.name} on ${showDate(date,lang)} at ${time} has been sent.`} {t.receivedSub}</div>
              <button className="btn btn-ink" style={{marginTop:28}} onClick={reset}>{t.bookAnother}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
function OwnerView({bookings,onRespond,onLogout,userEmail,avail,onSaveAvail,gallery,onAddImg,onDeleteImg,profile,onSaveProfile}){
  const [view,setView]=useState("home")
  const [menuOpen,setMenuOpen]=useState(false)
  const [oLang,setOLang]=useState("en")

  const pending=bookings.filter(b=>b.status==="pending")
  const confirmed=bookings.filter(b=>b.status==="confirmed")
  const declined=bookings.filter(b=>b.status==="declined")

  const getList=()=>{
    if(view==="pending")return pending
    if(view==="confirmed")return confirmed
    if(view==="declined")return declined
    if(view==="all")return bookings
    return[]
  }

  const getTitle=()=>{
    if(view==="pending")return oLang==="fr"?"En attente":"Pending Requests"
    if(view==="confirmed")return oLang==="fr"?"Confirmés":"Confirmed"
    if(view==="declined")return oLang==="fr"?"Déclinés":"Declined"
    if(view==="all")return oLang==="fr"?"Toutes les réservations":"All Reservations"
    if(view==="availability")return oLang==="fr"?"Disponibilité":"My Availability"
    if(view==="gallery")return oLang==="fr"?"Galerie":"My Gallery"
    if(view==="profile")return oLang==="fr"?"Mon Profil":"My Profile"
    return"Dashboard"
  }

  return(
    <div className="o-shell">
      <div className="o-header">
        <div>
          <div className="o-header-title">Elixir Beauty</div>
          <div className="o-header-email">{userEmail}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{display:"flex",gap:4}}>
            <button onClick={()=>setOLang("en")} style={{background:oLang==="en"?"var(--gold)":"#FFFFFF18",border:"none",borderRadius:20,padding:"5px 12px",color:"#FDF8F2",cursor:"pointer",fontFamily:"DM Sans,sans-serif",fontSize:11,fontWeight:600}}>EN</button>
            <button onClick={()=>setOLang("fr")} style={{background:oLang==="fr"?"var(--gold)":"#FFFFFF18",border:"none",borderRadius:20,padding:"5px 12px",color:"#FDF8F2",cursor:"pointer",fontFamily:"DM Sans,sans-serif",fontSize:11,fontWeight:600}}>FR</button>
          </div>
          <button onClick={()=>setMenuOpen(m=>!m)} style={{background:"#FFFFFF18",border:"none",color:"#FDF8F2",padding:"8px 14px",borderRadius:9,cursor:"pointer",fontSize:18,lineHeight:1}}>☰</button>
        </div>
      </div>

      {menuOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:200}} onClick={()=>setMenuOpen(false)}>
          <div style={{position:"absolute",top:64,right:0,background:"var(--plum)",width:240,borderRadius:"0 0 0 16px",padding:"12px 0",boxShadow:"0 8px 32px #1C0F2E40"}} onClick={e=>e.stopPropagation()}>
            {[
              {id:"pending",icon:"🔔",labelEn:"Pending",labelFr:"En attente"},
              {id:"confirmed",icon:"✅",labelEn:"Confirmed",labelFr:"Confirmés"},
              {id:"declined",icon:"✕",labelEn:"Declined",labelFr:"Déclinés"},
              {id:"all",icon:"📋",labelEn:"All",labelFr:"Tous"},
              {id:"availability",icon:"📅",labelEn:"Availability",labelFr:"Disponibilité"},
              {id:"gallery",icon:"🖼️",labelEn:"Gallery",labelFr:"Galerie"},
              {id:"profile",icon:"👤",labelEn:"My Profile",labelFr:"Mon Profil"},
            ].map(n=>(
              <button key={n.id} onClick={()=>{setView(n.id);setMenuOpen(false)}} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"12px 20px",background:"none",border:"none",color:view===n.id?"var(--gold-lt)":"#C8B4D8",cursor:"pointer",fontFamily:"DM Sans,sans-serif",fontSize:13,textAlign:"left"}}>
                <span>{n.icon}</span>{oLang==="fr"?n.labelFr:n.labelEn}
                {n.id==="pending"&&pending.length>0&&<span style={{marginLeft:"auto",background:"var(--gold)",color:"#fff",borderRadius:20,padding:"1px 8px",fontSize:10,fontWeight:700}}>{pending.length}</span>}
              </button>
            ))}
            <div style={{borderTop:"1px solid #FFFFFF12",margin:"8px 0"}}/>
            <button onClick={onLogout} style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"12px 20px",background:"none",border:"none",color:"#E8584A",cursor:"pointer",fontFamily:"DM Sans,sans-serif",fontSize:13,textAlign:"left"}}>
              <span>🚪</span>{oLang==="fr"?"Se déconnecter":"Sign out"}
            </button>
          </div>
        </div>
      )}

      {view!=="home"&&(
        <div className="detail-header">
          <button className="detail-back" onClick={()=>setView("home")}>← {oLang==="fr"?"Accueil":"Home"}</button>
          <div className="detail-title">{getTitle()}</div>
        </div>
      )}

      <div className="o-main">
        {view==="home"&&(
          <>
            <div className="o-stats-grid">
              {[
                {l:oLang==="fr"?"En attente":"Pending",v:pending.length,cls:"gold",id:"pending"},
                {l:oLang==="fr"?"Confirmés":"Confirmed",v:confirmed.length,cls:"",id:"confirmed"},
                {l:oLang==="fr"?"Déclinés":"Declined",v:declined.length,cls:"",id:"declined"},
                {l:oLang==="fr"?"Tous":"All",v:bookings.length,cls:"",id:"all"},
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
                <div className="o-nav-label">{oLang==="fr"?"Disponibilité":"My Availability"}</div>
              </button>
              <button className="o-nav-btn" onClick={()=>setView("gallery")}>
                <span className="o-nav-icon">🖼️</span>
                <div className="o-nav-label">{oLang==="fr"?"Galerie":"My Gallery"}</div>
              </button>
              <button className="o-nav-btn" onClick={()=>setView("profile")}>
                <span className="o-nav-icon">👤</span>
                <div className="o-nav-label">{oLang==="fr"?"Mon Profil":"My Profile"}</div>
              </button>
            </div>
            {pending.length>0&&(
              <div>
                <div style={{fontFamily:"Cormorant Garamond,serif",fontSize:20,color:"var(--ink)",marginBottom:14}}>
                  {oLang==="fr"?"Demandes en attente":"Pending Requests"}
                </div>
                <BookingList bookings={pending} onRespond={onRespond}/>
              </div>
            )}
            {pending.length===0&&(
              <div className="empty-state">
                <div className="empty-icon">✅</div>
                <div className="empty-title">{oLang==="fr"?"Tout est à jour!":"All clear!"}</div>
                <div className="empty-sub">{oLang==="fr"?"Aucune demande en attente":"No pending requests right now"}</div>
              </div>
            )}
          </>
        )}

        {["pending","confirmed","declined","all"].includes(view)&&(
          <BookingList bookings={getList()} onRespond={onRespond}/>
        )}

        {view==="availability"&&<AvailView avail={avail} onSave={onSaveAvail} lang={oLang}/>}
        {view==="gallery"&&<GalleryView gallery={gallery} onAdd={onAddImg} onDelete={onDeleteImg} lang={oLang}/>}
        {view==="profile"&&<ProfileView profile={profile} onSave={onSaveProfile} lang={oLang}/>}
      </div>
    </div>
  )
}

function BookingList({bookings,onRespond}){
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
                {b.date} at {b.time}<br/>
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

function AvailView({avail,onSave,lang}){
  const [days,setDays]=useState(avail.days||[1,2,3,4,5,6])
  const [times,setTimes]=useState(avail.times||[...ALL_TIMES])
  const [saved,setSaved]=useState(false)
  const toggleDay=d=>setDays(prev=>prev.includes(d)?prev.filter(x=>x!==d):[...prev,d].sort())
  const toggleTime=t=>setTimes(prev=>prev.includes(t)?prev.filter(x=>x!==t):[...prev,t].sort())
  const save=async()=>{await onSave({days,times});setSaved(true);setTimeout(()=>setSaved(false),2000)}
  return(
    <div>
      <div className="bk-card" style={{marginBottom:16}}>
        <div className="card-hl">{lang==="fr"?"Jours de travail":"Working Days"}</div>
        <div className="card-sub">{lang==="fr"?"Sélectionnez vos jours disponibles":"Select the days you are available"}</div>
        <div className="avail-grid">
          {DAYS_SHORT.map((d,i)=>(<button key={i} className={`avail-day ${days.map(Number).includes(i)?"on":""}`} onClick={()=>toggleDay(i)}>{d}</button>))}
        </div>
      </div>
      <div className="bk-card" style={{marginBottom:16}}>
        <div className="card-hl">{lang==="fr"?"Heures de travail":"Working Hours"}</div>
        <div className="card-sub">{lang==="fr"?"Sélectionnez vos créneaux horaires":"Select the time slots you offer"}</div>
        <div className="time-avail-grid">
          {ALL_TIMES.map(t=>(<button key={t} className={`time-avail-btn ${times.includes(t)?"on":""}`} onClick={()=>toggleTime(t)}>{t}</button>))}
        </div>
      </div>
      <button className="btn btn-ink" onClick={save} style={{width:"100%",justifyContent:"center"}}>
        {saved?"✓ Saved!":lang==="fr"?"Sauvegarder":"Save Availability"}
      </button>
    </div>
  )
}

function GalleryView({gallery,onAdd,onDelete,lang}){
  return(
    <div>
      <div className="bk-card" style={{marginBottom:16}}>
        <div className="card-hl">{lang==="fr"?"Ajouter des photos":"Add Photos"}</div>
        <div className="card-sub">{lang==="fr"?"Montrez votre travail aux clients":"Show your work to clients"}</div>
        <div className="upload-box" onClick={()=>document.getElementById("gallery-upload").click()}>
          <div style={{fontSize:32,marginBottom:8}}>📸</div>
          <div style={{fontSize:13,color:"var(--muted)"}}>{lang==="fr"?"Appuyez pour ajouter une photo":"Tap to add a photo"}</div>
        </div>
        <input id="gallery-upload" type="file" accept="image/*" style={{display:"none"}} onChange={e=>{if(e.target.files[0])onAdd(e.target.files[0])}}/>
      </div>
      {gallery.length>0&&(
        <div className="bk-card">
          <div className="card-hl">{lang==="fr"?"Ma Galerie":"Your Gallery"}</div>
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

function ProfileView({profile,onSave,lang}){
  const [form,setForm]=useState({
    business_name:profile.business_name||"",
    bio:profile.bio||"",
    phone:profile.phone||"",
    whatsapp:profile.whatsapp||"",
    instagram:profile.instagram||"",
    tiktok:profile.tiktok||"",
    email:profile.email||""
  })
  const [saved,setSaved]=useState(false)
  const ff=k=>e=>setForm(p=>({...p,[k]:e.target.value}))
  const save=async()=>{await onSave(form);setSaved(true);setTimeout(()=>setSaved(false),2000)}
  return(
    <div className="bk-card">
      <div className="card-hl">{lang==="fr"?"Mon Profil":"My Profile"}</div>
      <div className="card-sub">{lang==="fr"?"Ces infos apparaîtront sur votre site":"This info will appear on your website"}</div>
      <div className="profile-form">
        <div className="f-group"><label className="f-label">{lang==="fr"?"Nom du salon":"Business Name"}</label><input className="f-input" value={form.business_name} onChange={ff("business_name")} placeholder="Elixir Beauty"/></div>
        <div className="f-group"><label className="f-label">Bio</label><textarea className="f-textarea" value={form.bio} onChange={ff("bio")} placeholder={lang==="fr"?"Décrivez votre salon...":"Describe your salon..."} style={{minHeight:72}}/></div>
        <div className="f-group"><label className="f-label">Instagram</label><input className="f-input" value={form.instagram} onChange={ff("instagram")} placeholder="@elixirbeauty"/></div>
        <div className="f-group"><label className="f-label">TikTok</label><input className="f-input" value={form.tiktok} onChange={ff("tiktok")} placeholder="@elixirbeauty"/></div>
        <div className="f-group"><label className="f-label">{lang==="fr"?"Téléphone":"Phone"}</label><input className="f-input" value={form.phone} onChange={ff("phone")} placeholder="+1 514 000 0000"/></div>
        <div className="f-group"><label className="f-label">WhatsApp</label><input className="f-input" value={form.whatsapp} onChange={ff("whatsapp")} placeholder="+1 514 000 0000"/></div>
        <div className="f-group"><label className="f-label">Email</label><input className="f-input" value={form.email} onChange={ff("email")} placeholder="elixir@email.com"/></div>
        <button className="btn btn-ink" onClick={save} style={{width:"100%",justifyContent:"center"}}>
          {saved?"✓ Saved!":lang==="fr"?"Sauvegarder":"Save Profile"}
        </button>
      </div>
    </div>
  )
}
