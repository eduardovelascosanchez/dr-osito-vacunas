// PediBot Expert PWA – Dr. Osito (vacunación)
// Configura tu WhatsApp aquí (solo números, con lada). Ej: 5213312345678
const WHATSAPP_NUMBER = "5210000000000";

const agePills = document.getElementById('agePills');
const pills = Array.from(document.querySelectorAll('.pill'));
const blocks = Array.from(document.querySelectorAll('.ageblock'));

function activate(targetId){
  pills.forEach(p => p.classList.toggle('active', p.dataset.target === targetId));
  blocks.forEach(b => b.classList.toggle('active', b.id === targetId));
  const el = document.getElementById(targetId);
  if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
}

agePills?.addEventListener('click', (e) => {
  const pill = e.target.closest('.pill');
  if (!pill) return;
  activate(pill.dataset.target);
});

document.getElementById('year').textContent = new Date().getFullYear();

const message =
`Hola Dr/Consultorio 👋
Quisiera agendar cita para revisar y/o aplicar el esquema de vacunación.
Nombre del paciente:
Edad:
Fecha de nacimiento:
¿Tiene cartilla? Sí/No
Gracias.`;

document.getElementById('copyMsg')?.addEventListener('click', async () => {
  try{
    await navigator.clipboard.writeText(message);
    alert("✅ Mensaje copiado. Pégalo en WhatsApp para agendar.");
  }catch(e){
    const ta = document.createElement('textarea');
    ta.value = message;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    alert("✅ Mensaje copiado. Pégalo en WhatsApp para agendar.");
  }
});

const wa = document.getElementById('waLink');
const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
if (wa) wa.href = waUrl;

// Install prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const hint = document.getElementById('installHint');
  if (hint) hint.textContent = "📲 Instálame";
  hint?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  }, {once:true});
});
