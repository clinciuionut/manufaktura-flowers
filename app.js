// ══ SUPABASE CONFIG ══
const SUPABASE_URL = 'https://mqidgmicrinvytqwodie.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xaWRnbWljcmludnl0cXdvZGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3ODA4NjMsImV4cCI6MjA5MjM1Njg2M30.8-3geqfxS4LEP8S25PDTt1KljfCHpn9dhiaOBo2_zEk';
async function initSupabase(){
  if(SUPABASE_URL.includes('PUNE')) return null;
  try{
    const {createClient} = await import('https://esm.sh/@supabase/supabase-js@2');
    supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    return supabase;
  }catch(e){return null;}
}

// ══ PRODUSE ══
const PRODUCTS = [
  {id:'trandafiri-rosii-pene',name:'Trandafiri Roșii & Pene de Păun',category:'Romantic',price:180,oldPrice:null,img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85',img2:'https://images.unsplash.com/photo-1490750967868-88df5691cc9e?w=700&q=85',desc:'Un buchet dramatic de trandafiri roșii petalaţi, îmbogățit cu pene de păun aurii și ramuri de eucalipt. O declarație de dragoste elegantă.',tags:['Romantic','Cadou','Aniversare'],available:true},
  {id:'buchet-primavara-roz',name:'Primăvara în Roz',category:'Sezonier',price:140,oldPrice:160,img:'https://images.unsplash.com/photo-1490750967868-88df5691cc9e?w=700&q=85',img2:'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=700&q=85',desc:'Lalele roz pudrate, ghiocei și ramuri în floare — prospețimea primăverii într-un singur gest.',tags:['Sezonier','Primăvară','Proaspăt'],available:true},
  {id:'buchet-nunta-boho',name:'Buchet Nuntă Boho',category:'Nuntă',price:350,oldPrice:null,img:'https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=700&q=85',img2:'https://images.unsplash.com/photo-1487530811015-780c4fbc6fbb?w=700&q=85',desc:'Hortensia roz, trandafiri ivory, pampas și iarbă decorativă. Buchetul perfect pentru mireasa modernă cu suflet boem.',tags:['Nuntă','Boho','Mireasa'],available:true},
  {id:'aranjament-pastel',name:'Aranjament Pastel Spring',category:'Aranjament',price:220,oldPrice:null,img:'https://images.unsplash.com/photo-1487530811015-780c4fbc6fbb?w=700&q=85',img2:'https://images.unsplash.com/photo-1490750967868-88df5691cc9e?w=700&q=85',desc:'Trandafiri garden, bujori, lisiante și verdeață luxuriantă într-un aranjament pentru birou sau eveniment.',tags:['Aranjament','Pastel','Birou'],available:true},
  {id:'little-princess',name:'Little Princess Box',category:'Cadou',price:160,oldPrice:180,img:'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=700&q=85',img2:'https://images.unsplash.com/photo-1490750967868-88df5691cc9e?w=700&q=85',desc:'Cutie albastră cu garoafe roz, antirrhinum și decoraţiuni personalizate. Cadoul perfect pentru fetiţa ta.',tags:['Cadou','Copii','Roz'],available:true},
  {id:'rainbow-box',name:'Rainbow Box',category:'Aranjament',price:280,oldPrice:null,img:'https://images.unsplash.com/photo-1487530811015-780c4fbc6fbb?w=700&q=85',img2:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85',desc:'Hortensia albă, trandafiri mov și roz, anthurium și iarbă roz vibrantă. O explozie de culoare și textură.',tags:['Colorat','Aranjament','Special'],available:true},
  {id:'aranjament-rosu-dramatic',name:'Eleganță în Roșu',category:'Romantic',price:320,oldPrice:null,img:'https://images.unsplash.com/photo-1490750967868-88df5691cc9e?w=700&q=85',img2:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85',desc:'Aranjament dramatic cu anthurium roșu, trandafiri și elemente ornamentale în cupă aurie. Opulență pură.',tags:['Romantic','Dramatic','Lux'],available:true},
  {id:'trandafiri-rosii-clasici',name:'Trandafiri Roșii Clasici',category:'Romantic',price:150,oldPrice:null,img:'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=700&q=85',img2:'https://images.unsplash.com/photo-1487530811015-780c4fbc6fbb?w=700&q=85',desc:'21 de trandafiri roșii mari, ținuți în mâini — cel mai clasic și iubit gest de dragoste.',tags:['Clasic','Romantic','Dragoste'],available:true},
  {id:'aranjament-paste',name:'Aranjament Paște',category:'Sezonier',price:190,oldPrice:210,img:'https://images.unsplash.com/photo-1487530811015-780c4fbc6fbb?w=700&q=85',img2:'https://images.unsplash.com/photo-1490750967868-88df5691cc9e?w=700&q=85',desc:'Lalele galbene și roz, gerbere și ramuri de salcie — un aranjament plin de prospețimea primăverii.',tags:['Sezonier','Paște','Primăvară'],available:true},
];

// ══ CART ══
let cart = JSON.parse(localStorage.getItem('mf_cart')||'[]');
function saveCart(){localStorage.setItem('mf_cart',JSON.stringify(cart));}
function getCartCount(){return cart.reduce((s,i)=>s+i.qty,0);}
function getCartTotal(){return cart.reduce((s,i)=>s+(i.price*i.qty),0);}
function addToCart(id,qty=1){
  const p = PRODUCTS.find(p=>p.id===id);
  if(!p) return;
  const existing = cart.find(i=>i.id===id);
  if(existing) existing.qty+=qty;
  else cart.push({id,name:p.name,price:p.price,img:p.img,qty});
  saveCart(); updateCartUI();
  showToast('🌸 '+p.name+' adăugat în coș!','success');
}
function removeFromCart(id){cart=cart.filter(i=>i.id!==id);saveCart();updateCartUI();renderCartItems();}
function updateQty(id,delta){
  const item=cart.find(i=>i.id===id);
  if(!item) return;
  item.qty+=delta;
  if(item.qty<=0) removeFromCart(id);
  else{saveCart();updateCartUI();renderCartItems();}
}
function updateCartUI(){
  document.querySelectorAll('.cart-count').forEach(el=>el.textContent=getCartCount());
  document.querySelectorAll('.cart-total-val').forEach(el=>el.textContent=getCartTotal()+' lei');
}
function renderCartItems(){
  const el=document.getElementById('cartItems');
  if(!el) return;
  if(!cart.length){el.innerHTML='<div class="cart-empty"><p>Coșul tău e gol</p><span>Adaugă buchete frumoase 🌸</span></div>';return;}
  el.innerHTML=cart.map(i=>`
  <div class="cart-item">
    <img class="cart-item-img" src="${i.img}" alt="${i.name}">
    <div class="cart-item-info">
      <div class="cart-item-name">${i.name}</div>
      <div class="cart-item-price">${i.price} lei / buc</div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="updateQty('${i.id}',-1)">−</button>
        <span class="qty-val">${i.qty}</span>
        <button class="qty-btn" onclick="updateQty('${i.id}',1)">+</button>
        <button class="cart-remove" onclick="removeFromCart('${i.id}')">✕ Șterge</button>
      </div>
    </div>
  </div>`).join('');
}
function openCart(){
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  renderCartItems(); updateCartUI();
}
function closeCart(){
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
}

// ══ TOAST ══
function showToast(msg,type='info'){
  let t=document.querySelector('.toast');
  if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t);}
  t.textContent=msg; t.className=`toast ${type} show`;
  setTimeout(()=>t.classList.remove('show'),3000);
}

// ══ REVEAL ══
function setupReveal(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el=e.target;
      setTimeout(()=>el.classList.add('visible'),parseInt(el.dataset.delay||0));
      obs.unobserve(el);
    });
  },{threshold:.1});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}

// ══ NAV ══
function setupNav(){
  const nav=document.querySelector('.nav');
  if(!nav) return;
  const update=()=>nav.classList.toggle('solid',window.scrollY>60);
  window.addEventListener('scroll',update,{passive:true});
  update();
}

// ══ NAV HTML ══
function renderNav(active=''){
  const el=document.getElementById('nav');
  if(!el) return;
  el.innerHTML=`
  <nav class="nav" id="navBar">
    <a class="nav-brand" href="index.html">Manufaktura Flowers<small>Florărie · Constanța</small></a>
    <div class="nav-links">
      <a href="shop.html" class="${active==='shop'?'active':''}">Magazin</a>
      <a href="index.html#despre">Despre Noi</a>
      <a href="index.html#contact">Contact</a>
      <a href="orders.html">Comenzile Mele</a>
    </div>
    <div class="nav-right">
      <button class="cart-btn" onclick="openCart()">🛒<span class="cart-count">0</span></button>
      <a href="shop.html" class="nav-cta">Comandă Acum</a>
    </div>
  </nav>`;
  setupNav();
  updateCartUI();
}

// ══ CART SIDEBAR HTML ══
function renderCartSidebar(){
  const existing=document.getElementById('cartSidebar');
  if(existing) return;
  document.body.insertAdjacentHTML('beforeend',`
  <div class="cart-overlay" id="cartOverlay" onclick="closeCart()"></div>
  <div class="cart-sidebar" id="cartSidebar">
    <div class="cart-header">
      <h3>Coșul Meu 🛒</h3>
      <button class="cart-close" onclick="closeCart()">✕</button>
    </div>
    <div class="cart-items" id="cartItems"></div>
    <div class="cart-footer">
      <div class="cart-total">
        <span>Total</span>
        <strong class="cart-total-val">0 lei</strong>
      </div>
      <a href="checkout.html" class="btn-rose" style="width:100%;" onclick="closeCart()">Finalizează Comanda →</a>
    </div>
  </div>`);
}

// ══ FOOTER HTML ══
function renderFooter(){
  const el=document.getElementById('footer');
  if(!el) return;
  el.innerHTML=`
  <footer>
    <div class="foot-grid">
      <div>
        <a href="index.html" class="foot-brand">Manufaktura Flowers</a>
        <div class="foot-tagline">Florărie online · Constanța</div>
        <div style="margin-top:1.5rem;">
          <p style="color:rgba(255,255,255,.55);font-size:.82rem;line-height:1.7;">Str. Eliberarii, nr. 48<br>Constanța, România<br><a href="tel:+40733804144" style="color:var(--rose2);">0733 804 144</a><br><a href="mailto:manufakturaflowers@gmail.com" style="color:var(--rose2);">manufakturaflowers@gmail.com</a></p>
        </div>
      </div>
      <div class="foot-col"><h5>Magazin</h5>
        <a href="shop.html">Toate Buchetele</a>
        <a href="shop.html?cat=Romantic">Romantic</a>
        <a href="shop.html?cat=Nuntă">Nuntă</a>
        <a href="shop.html?cat=Cadou">Cadouri</a>
        <a href="shop.html?cat=Sezonier">Sezonier</a>
      </div>
      <div class="foot-col"><h5>Informații</h5>
        <a href="index.html#despre">Despre Noi</a>
        <a href="orders.html">Comenzile Mele</a>
        <a href="index.html#contact">Contact</a>
        <p>Program: Luni–Sâmbătă<br>09:00 – 20:00</p>
      </div>
      <div class="foot-col"><h5>Livrare</h5>
        <p>Constanța, Ovidiu,<br>Năvodari, Valu lui Traian</p>
        <p style="margin-top:.8rem;">Livrare rapidă în<br>2–4 ore</p>
        <a href="shop.html" style="margin-top:.8rem;">Comandă Acum →</a>
      </div>
    </div>
    <div class="foot-bottom">
      <p>© 2025 Manufaktura Flowers · Constanța · Toate drepturile rezervate</p>
      <div class="foot-social">
        <a href="https://www.instagram.com/manufakturaflowers" target="_blank">📷</a>
        <a href="tel:+40733804144">📞</a>
        <a href="mailto:manufakturaflowers@gmail.com">✉️</a>
      </div>
    </div>
  </footer>`;
}
