'use strict';
function showToast(msg) {
 document.getElementById('toastMsg').textContent = msg;
 bootstrap.Toast.getOrCreateInstance('#toast', {delay: 4000}).show();
}
// Replace sendForm() to integrate EmailJS or a custom backend.
// For Formspree: put your endpoint URL in the form's data-endpoint attribute.
async function sendForm(form) {
 const endpoint = form.dataset.endpoint;
 if (!endpoint) return {ok: true, demo: true};
 const res = await fetch(endpoint, {method: 'POST', body: new FormData(form), headers: {Accept: 'application/json'}});
 return {ok: res.ok};
}
document.addEventListener('DOMContentLoaded', () => {
 const form = document.getElementById('contactForm');
 form.addEventListener('submit', async e => {
  e.preventDefault();
  form.message.setCustomValidity(form.message.value.trim().length < 20 ? 'Too short' : '');
  form.email.setCustomValidity(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.value) ? '' : 'Invalid');
  form.classList.add('was-validated');
  if (!form.checkValidity()) { form.querySelector(':invalid').focus(); return; }
  try {
   const r = await sendForm(form);
   if (!r.ok) throw new Error();
   showToast(r.demo ? 'Form validated. Connect an endpoint to send messages.' : 'Message sent. Thank you!');
   form.reset(); form.classList.remove('was-validated');
  } catch { showToast('Could not send your message. Please try again later.'); }
 });
});
