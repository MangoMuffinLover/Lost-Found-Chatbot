import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

(() => {
  // Firebase config provided by you
  const firebaseConfig = {
    apiKey: "AIzaSyC85Fg3pg63fu4-hPP6gS7wy4P5Qqp2E2M",
    authDomain: "lostandfoundchatbotsystem.firebaseapp.com",
    projectId: "lostandfoundchatbotsystem",
    storageBucket: "lostandfoundchatbotsystem.firebasestorage.app",
    messagingSenderId: "351061689682",
    appId: "1:351061689682:web:759f89ee702e807053268b",
    measurementId: "G-HPXR76GLM2"
  };

  // Initialize Firebase and Firestore
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const chatWindow = document.getElementById('chat');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const statusEl = document.getElementById('conn-status');

  const flow = [
    { key: 'name', question: "What's your name?" },
    { key: 'item', question: 'What did you lose?' },
    { key: 'location', question: 'Where did you lose it?' },
    { key: 'contact', question: 'How can we contact you?' },
    { key: 'details', question: 'Any extra details?' }
  ];

  let step = 0;
  const answers = { name: '', item: '', location: '', contact: '', details: '' };

  function updateStatus(last = '—') {
    if (statusEl) {
      statusEl.textContent = `Connected to Firestore — Last result: ${last}`;
    }
  }

  function scrollToBottom() { chatWindow.scrollTop = chatWindow.scrollHeight; }

  function addMessage(content, type = 'bot') {
    const bubble = document.createElement('div');
    bubble.className = `message ${type}`;
    bubble.innerHTML = content;
    chatWindow.appendChild(bubble);
    scrollToBottom();
    return bubble;
  }

  function addTyping() {
    const el = document.createElement('div');
    el.className = 'message bot';
    el.innerHTML = '<span class="typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>';
    chatWindow.appendChild(el);
    scrollToBottom();
    return el;
  }

  function askNext() {
    const typing = addTyping();
    setTimeout(() => {
      typing.remove();
      const q = flow[step]?.question;
      if (q) addMessage(q, 'bot');
      scrollToBottom();
    }, 450);
  }

  async function saveToFirestore(payload) {
    const doc = {
      name: payload.name || '',
      item: payload.item || '',
      location: payload.location || '',
      contact: payload.contact || '',
      details: payload.details || '',
      timestamp: new Date().toISOString()
    };
    await addDoc(collection(db, 'lost_items'), doc);
  }

  async function submitData() {
    const payload = { ...answers };
    addMessage('Saving your response…', 'bot');
    try {
      await saveToFirestore(payload);
      updateStatus('ok');
      addMessage('✅ Thank you! Your lost item has been recorded.', 'bot');
      input.disabled = true; sendBtn.disabled = true; form.style.opacity = '0.9';
    } catch (err) {
      updateStatus('error');
      addMessage('⚠️ Could not save to Firestore. Please check your Firebase config and Firestore rules.', 'bot');
      console.error('Firestore error:', err);
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const value = (input.value || '').trim();
    if (!value) return;

    addMessage(value, 'user');
    const key = flow[step].key; answers[key] = value;
    input.value = ''; step++;

    if (step < flow.length) { askNext(); input.focus(); }
    else { input.disabled = true; sendBtn.disabled = true; await submitData(); }
  });

  // Initialize
  updateStatus('—');
  askNext();
})();