/* Floating Chat Widget: injects a toggle button and an iframe containing index.html */
(function () {
  const WIDGET_ID = 'lost-found-chat-widget';
  const BTN_ID = 'lost-found-chat-toggle';
  const IFRAME_SRC = 'index.html'; // Adjust path if hosting elsewhere

  const style = document.createElement('style');
  style.textContent = `
    #${BTN_ID} {
      position: fixed; right: 20px; bottom: 20px;
      background: #3b82f6; color: #fff; border: none;
      border-radius: 999px; padding: 12px 16px; font-weight: 700;
      box-shadow: 0 10px 24px rgba(17,24,39,0.15); cursor: pointer; z-index: 99998;
    }
    #${WIDGET_ID} {
      position: fixed; right: 20px; bottom: 70px; z-index: 99999;
      width: 380px; max-width: calc(100vw - 40px); height: 540px;
      border-radius: 18px; overflow: hidden; box-shadow: 0 16px 40px rgba(17,24,39,0.18);
      border: 1px solid #eef2f7; background: #fff; display: none;
    }
    #${WIDGET_ID} iframe { width: 100%; height: 100%; border: 0; }
    @media (max-width: 460px) { #${WIDGET_ID} { height: 80vh; } }
  `;
  document.head.appendChild(style);

  const btn = document.createElement('button');
  btn.id = BTN_ID;
  btn.type = 'button';
  btn.setAttribute('aria-expanded', 'false');
  btn.textContent = 'Chat with TraceBack';

  const container = document.createElement('div');
  container.id = WIDGET_ID;
  const frame = document.createElement('iframe');
  frame.src = IFRAME_SRC;
  frame.title = 'TraceBack — Lost & Found';
  container.appendChild(frame);

  document.body.appendChild(btn);
  document.body.appendChild(container);

  btn.addEventListener('click', () => {
    const isOpen = container.style.display === 'block';
    container.style.display = isOpen ? 'none' : 'block';
    btn.setAttribute('aria-expanded', String(!isOpen));
  });
})();