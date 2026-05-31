/* ============================================================
   AI CHATBOT WIDGET HTML — injected into every page
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. KNOWLEDGE BASE ─────────────────────────────────── */
  const KB = {
    name: 'Muhammad Abdullah',
    role: 'Web Developer & Store Theme Designer',
    location: 'Pakistan',
    experience: '1+ years',
    status: 'Available for hire',
    email: 'letsmailabdullahcoder@gmail.com',
    skills: {
      'HTML & CSS': '92%',
      'JavaScript': '80%',
      'Shopify Liquid & Themes': '88%',
      'WordPress & WooCommerce': '82%',
      'UI/UX & Store Design': '85%',
      'Figma & Prototyping': '75%',
    },
    tools: {
      Frontend: 'HTML, CSS, JavaScript, responsive layouts, animations',
      'E-commerce': 'Shopify themes, Liquid basics, WooCommerce, product pages',
      CMS: 'WordPress pages, custom sections, content-friendly structure',
      Design: 'Figma, typography, spacing, visual hierarchy, UI polish',
    },
    services: [
      'Custom Websites – responsive HTML/CSS/JS builds for personal brands, service businesses, and landing pages',
      'Shopify Themes – theme customisation, product sections, cart improvements, and storefront layouts',
      'WordPress Sites – business websites, WooCommerce layouts, custom pages, and content structures',
    ],
    projects: [
      'Fashion Brand Store (Shopify)',
      'Service Agency Site (WordPress)',
      'Real Estate Landing Page (Web Dev)',
      'WooCommerce Electronics Shop (Store)',
      '10+ additional practice and personal projects',
    ],
    experience_timeline: [
      { period: '2026 – Present', role: 'Freelance Web Developer', company: 'Self-Employed – Remote', desc: 'Building custom websites, Shopify stores, and landing pages for clients across various industries.' },
      { period: '2025', role: 'Junior Web Developer', company: 'Learning & Personal Projects', desc: 'Built 10+ practice sites, studied modern CSS, JavaScript fundamentals, and responsive design.' },
    ],
    process: [
      'Discover – clarify goals, audience, pages, and references',
      'Design – shape structure, visual direction, spacing, and responsive layout',
      'Build – clean code, careful styling, mobile checks, and platform-specific setup',
      'Polish – final fixes: performance, forms, copy tweaks, and navigation details',
    ],
    focus_areas: ['Responsive UI', 'Store Design', 'Performance', 'Maintainability'],
    stats: { projects: '15+', satisfaction: '100%', experience: '1+ year' },
  };

  /* ── 2. INTENT DETECTION ─────────────────────────────── */
  function detectIntent(msg) {
    const m = msg.toLowerCase().trim();

    if (/^(hi|hello|hey|hiya|howdy|sup|good\s*(morning|afternoon|evening)|greet)/i.test(m))
      return 'greeting';

    if (/who\s*(is|are)\s*(abdullah|muhammad|you|he)|about\s*(you|him|abdullah)|introduce|tell me about/i.test(m))
      return 'about';

    if (/skill|proficien|good at|know|tech|stack|language|can\s*(you|he)\s*(do|build)/i.test(m))
      return 'skills';

    if (/service|offer|provide|what do you do|what.*build|type.*work/i.test(m))
      return 'services';

    if (/project|portfolio|work|built|made|example|showcase/i.test(m))
      return 'projects';

    if (/experience|history|background|past|career|job|freelanc/i.test(m))
      return 'experience';

    if (/process|workflow|how.*work|approach|step|method/i.test(m))
      return 'process';

    if (/shopify|liquid|store|ecommerce|e-commerce|shop/i.test(m))
      return 'shopify';

    if (/wordpress|wp|woocommerce|cms/i.test(m))
      return 'wordpress';

    if (/contact|email|reach|hire|message|talk|available|rate|cost|price|quote/i.test(m))
      return 'contact';

    if (/locat|based|where|country|pakistan/i.test(m))
      return 'location';

    if (/cv|resume|download/i.test(m))
      return 'cv';

    if (/figma|design|ui|ux/i.test(m))
      return 'design';

    if (/tool|software|program|use/i.test(m))
      return 'tools';

    if (/thank|thanks|cheers|appreciate|great|awesome|cool|nice/i.test(m))
      return 'thanks';

    if (/bye|goodbye|see you|later|ciao/i.test(m))
      return 'bye';

    return 'fallback';
  }

  /* ── 3. RESPONSE GENERATOR ───────────────────────────── */
  function getResponse(intent) {
    switch (intent) {
      case 'greeting':
        return {
          text: `Hey there! 👋 I'm <strong>Zara</strong>, Abdullah's AI assistant.\n\nI can tell you all about Muhammad Abdullah — his skills, projects, services, and how to get in touch. What would you like to know?`,
          quick: ['About him', 'His skills', 'Services', 'Contact'],
        };

      case 'about':
        return {
          text: `<strong>Muhammad Abdullah</strong> is a Web Developer & Store Theme Designer based in <strong>Pakistan</strong> with <strong>1+ years</strong> of professional experience.\n\nHe specialises in pixel-perfect, conversion-focused web experiences — from custom Shopify themes to WordPress sites and bespoke landing pages. He's currently <strong style="color:var(--gold)">available for hire</strong>! 🚀`,
          quick: ['Skills', 'Projects', 'Experience', 'Contact'],
        };

      case 'skills': {
        const lines = Object.entries(KB.skills)
          .map(([k, v]) => `• <strong>${k}</strong> — ${v}`)
          .join('\n');
        return {
          text: `Here are Abdullah's core skill proficiencies:\n\n${lines}\n\nHe's strongest in HTML/CSS and Shopify Liquid, with solid JavaScript and WordPress expertise too.`,
          quick: ['Shopify work', 'WordPress work', 'Tools he uses', 'Contact'],
        };
      }

      case 'services':
        return {
          text: `Abdullah offers three main services:\n\n📌 <strong>Custom Websites</strong> – responsive HTML/CSS/JS builds for brands, businesses & landing pages.\n\n🛒 <strong>Shopify Themes</strong> – theme customisation, product sections, cart improvements & storefront layouts.\n\n📝 <strong>WordPress Sites</strong> – business websites, WooCommerce layouts & maintainable content structures.\n\nAll projects include client communication, post-launch support & 100% client satisfaction guaranteed.`,
          quick: ['See projects', 'How he works', 'Get a quote'],
        };

      case 'projects':
        return {
          text: `Abdullah has completed <strong>15+ projects</strong>. Here's a taste of recent work:\n\n${KB.projects.map(p => `• ${p}`).join('\n')}\n\nHead over to the <a href="${resolveLink('projects')}">Projects page</a> to explore everything with filters by platform.`,
          quick: ['Shopify projects', 'WordPress projects', 'Services', 'Contact'],
        };

      case 'experience':
        return {
          text: `Abdullah's professional journey:\n\n${KB.experience_timeline.map(e => `📅 <strong>${e.period}</strong> — ${e.role} at ${e.company}\n${e.desc}`).join('\n\n')}\n\nCheck the full <a href="${resolveLink('experience')}">Experience page</a> for more detail.`,
          quick: ['Skills', 'Projects', 'Contact'],
        };

      case 'process':
        return {
          text: `Abdullah follows a clear 4-step process:\n\n${KB.process.map((p, i) => `<strong>Step ${i + 1}.</strong> ${p}`).join('\n\n')}\n\nThis ensures every project is well-understood before a single line of code is written.`,
          quick: ['Services', 'Projects', 'Contact'],
        };

      case 'shopify':
        return {
          text: `Shopify is one of Abdullah's strongest areas (88% proficiency).\n\nHe handles:\n• Theme customisation using <strong>Liquid</strong>\n• Product & collection section builds\n• Cart & checkout improvements\n• Storefront layouts for better conversions\n• Mobile-first responsive storefronts\n\nHe's built multiple Shopify stores and understands what makes them convert. 🛒`,
          quick: ['See all skills', 'View projects', 'Hire him'],
        };

      case 'wordpress':
        return {
          text: `Abdullah is very comfortable with WordPress (82% proficiency) and WooCommerce.\n\nHe builds:\n• Business & agency websites\n• WooCommerce product layouts\n• Custom pages with clear content structures\n• Sites that are easy to maintain & update post-launch\n\nIf you need a WordPress site, he's a solid choice.`,
          quick: ['See all skills', 'View projects', 'Hire him'],
        };

      case 'contact':
        return {
          text: `Ready to work together? Here's how to reach Abdullah:\n\n📧 <strong>Email:</strong> <a href="mailto:letsmailabdullahcoder@gmail.com">letsmailabdullahcoder@gmail.com</a>\n\n📝 Or fill in the <a href="${resolveLink('contact')}">Contact form</a> and he'll get back to you promptly.\n\nHe's currently <strong style="color:var(--gold)">available for new projects</strong> — don't hesitate to reach out! 🤝`,
          quick: ['About him', 'Services', 'View projects'],
        };

      case 'location':
        return {
          text: `Abdullah is based in <strong>Pakistan</strong> and works fully <strong>remote</strong> with clients worldwide. 🌍\n\nDistance is never a barrier — he handles everything online from discovery to launch and post-launch support.`,
          quick: ['Contact', 'Services', 'About him'],
        };

      case 'cv':
        return {
          text: `You can download Abdullah's CV directly from his portfolio:\n\n📄 <a href="${resolveCv()}">Download CV (PDF)</a>\n\nOr visit the <a href="${resolveLink('about')}">About page</a> to learn more about his background and skills.`,
          quick: ['Skills', 'Experience', 'Contact'],
        };

      case 'design':
        return {
          text: `Abdullah uses <strong>Figma</strong> for prototyping and UI design (75% proficiency).\n\nHis design philosophy:\n• Clean layouts with strong visual hierarchy\n• Responsive and mobile-first thinking\n• Attention to typography, spacing & animation\n• Conversion-focused store designs\n\nEvery project starts with design intent before coding begins.`,
          quick: ['Skills', 'Services', 'Contact'],
        };

      case 'tools':
        return {
          text: `Abdullah's full toolkit:\n\n${Object.entries(KB.tools).map(([cat, tools]) => `🔧 <strong>${cat}:</strong> ${tools}`).join('\n\n')}`,
          quick: ['Skills breakdown', 'Services', 'Contact'],
        };

      case 'thanks':
        return {
          text: `You're welcome! 😊 If you have more questions or want to start a project with Abdullah, just ask — I'm here!\n\nOr go ahead and <a href="${resolveLink('contact')}">get in touch</a> directly.`,
          quick: ['Start a project', 'View projects', 'About him'],
        };

      case 'bye':
        return {
          text: `Goodbye! 👋 It was great chatting. Feel free to come back anytime.\n\nYou can also reach Abdullah directly at <a href="mailto:letsmailabdullahcoder@gmail.com">letsmailabdullahcoder@gmail.com</a> — he's always happy to talk projects!`,
          quick: [],
        };

      default:
        return {
          text: `Hmm, I didn't quite catch that. 🤔 I'm best at answering questions about Abdullah's skills, projects, services, and how to hire him.\n\nTry asking something like:`,
          quick: ['Who is Abdullah?', 'His skills', 'Services offered', 'How to contact'],
        };
    }
  }

  /* ── 4. PATH RESOLVER ────────────────────────────────── */
  function isInPages() {
    return window.location.pathname.includes('/pages/');
  }

  function resolveLink(page) {
    const map = {
      contact:    isInPages() ? 'contact.html'    : 'pages/contact.html',
      about:      isInPages() ? 'about.html'      : 'pages/about.html',
      projects:   isInPages() ? 'projects.html'   : 'pages/projects.html',
      experience: isInPages() ? 'experience.html' : 'pages/experience.html',
    };
    return map[page] || '#';
  }

  function resolveCv() {
    return isInPages() ? '../My_Resume.pdf' : 'My_Resume.pdf';
  }

  /* Handle shorthand quick replies that contain page links */
  function resolveQuickReply(label) {
    const map = {
      'Start a project':  resolveLink('contact'),
      'View projects':    resolveLink('projects'),
      'See projects':     resolveLink('projects'),
      'Hire him':         resolveLink('contact'),
      'Get a quote':      resolveLink('contact'),
    };
    return map[label] || null;
  }

  /* ── 5. DOM BUILDER ──────────────────────────────────── */
  const botAvatarSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z"/></svg>`;
  const userAvatarSVG = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>`;

  function buildWidget() {
    // Toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'chatbot-toggle';
    toggleBtn.setAttribute('aria-label', 'Open AI assistant');
    toggleBtn.innerHTML = `
      <svg class="icon-chat"  viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6V10h12v2zm0-3H6V7h12v2z"/></svg>
      <svg class="icon-close" viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      <span class="notif-dot" id="cb-notif-dot"></span>`;

    // Panel
    const panel = document.createElement('div');
    panel.id = 'chatbot-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'AI Chat Assistant');
    panel.innerHTML = `
      <div class="cb-header">
        <div class="cb-avatar">${botAvatarSVG}</div>
        <div class="cb-header-info">
          <div class="cb-name">Zara — AI Assistant</div>
          <div class="cb-status">Online · Abdullah's portfolio</div>
        </div>
        <button class="cb-header-btn" id="cb-clear-btn" title="Clear chat" aria-label="Clear chat">
          <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
      </div>
      <div class="cb-messages" id="cb-messages" aria-live="polite"></div>
      <div class="cb-quick-replies" id="cb-quick-replies"></div>
      <div class="cb-input-row">
        <input type="text" id="cb-input" placeholder="Ask me anything…" autocomplete="off" aria-label="Chat input" maxlength="300" />
        <button id="cb-send" aria-label="Send message">
          <svg viewBox="0 0 24 24"><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
      <div class="cb-footer-label">Powered by <span>AI</span> · Knows everything about Abdullah</div>`;

    document.body.appendChild(toggleBtn);
    document.body.appendChild(panel);
    return { toggleBtn, panel };
  }

  /* ── 6. CHAT ENGINE ──────────────────────────────────── */
  function appendMessage(role, html) {
    const msgs = document.getElementById('cb-messages');
    if (!msgs) return;

    const wrapper = document.createElement('div');
    wrapper.className = `cb-msg ${role}`;

    const avatarEl = document.createElement('div');
    avatarEl.className = 'cb-msg-avatar';
    avatarEl.innerHTML = role === 'bot' ? botAvatarSVG : userAvatarSVG;

    const bubble = document.createElement('div');
    bubble.className = 'cb-bubble';
    bubble.innerHTML = html.replace(/\n/g, '<br>');

    wrapper.appendChild(avatarEl);
    wrapper.appendChild(bubble);
    msgs.appendChild(wrapper);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const msgs = document.getElementById('cb-messages');
    const el = document.createElement('div');
    el.className = 'cb-typing';
    el.id = 'cb-typing';
    el.innerHTML = `
      <div class="cb-msg-avatar">${botAvatarSVG}</div>
      <div class="cb-typing-dots"><span></span><span></span><span></span></div>`;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById('cb-typing');
    if (el) el.remove();
  }

  function renderQuickReplies(items) {
    const container = document.getElementById('cb-quick-replies');
    if (!container) return;
    container.innerHTML = '';
    items.forEach(label => {
      const btn = document.createElement('button');
      btn.className = 'cb-qr';
      btn.textContent = label;
      btn.addEventListener('click', () => handleUserMessage(label));
      container.appendChild(btn);
    });
  }

  function handleUserMessage(text) {
    if (!text.trim()) return;

    // Hide notif dot
    const dot = document.getElementById('cb-notif-dot');
    if (dot) dot.style.display = 'none';

    // Clear input & quick replies
    const input = document.getElementById('cb-input');
    if (input) input.value = '';
    renderQuickReplies([]);

    appendMessage('user', text);

    const intent = detectIntent(text);

    // Slight delay to feel natural
    showTyping();
    const delay = 600 + Math.random() * 700;

    setTimeout(() => {
      hideTyping();
      const { text: reply, quick } = getResponse(intent);
      appendMessage('bot', reply);

      // Map quick replies — if it's a navigation item, open as link
      const filteredQuick = quick.filter(q => {
        const link = resolveQuickReply(q);
        if (link) {
          window.location.href = link;
          return false;
        }
        return true;
      });

      // Re-render quick after response
      renderQuickReplies(quick);
    }, delay);
  }

  /* ── 7. INIT ─────────────────────────────────────────── */
  function init() {
    const { toggleBtn, panel } = buildWidget();

    let open = false;
    let greeted = false;

    function openChat() {
      open = true;
      panel.classList.add('open');
      toggleBtn.classList.add('open');
      toggleBtn.setAttribute('aria-label', 'Close AI assistant');
      if (!greeted) {
        greeted = true;
        setTimeout(() => {
          const { text, quick } = getResponse('greeting');
          appendMessage('bot', text);
          renderQuickReplies(quick);
        }, 350);
      }
      document.getElementById('cb-input')?.focus();
    }

    function closeChat() {
      open = false;
      panel.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-label', 'Open AI assistant');
    }

    toggleBtn.addEventListener('click', () => (open ? closeChat() : openChat()));

    // Send on button click
    document.getElementById('cb-send')?.addEventListener('click', () => {
      const input = document.getElementById('cb-input');
      if (input) handleUserMessage(input.value);
    });

    // Send on Enter
    document.getElementById('cb-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const input = document.getElementById('cb-input');
        if (input) handleUserMessage(input.value);
      }
    });

    // Clear chat
    document.getElementById('cb-clear-btn')?.addEventListener('click', () => {
      const msgs = document.getElementById('cb-messages');
      if (msgs) msgs.innerHTML = '';
      renderQuickReplies([]);
      greeted = false;
      setTimeout(() => {
        const { text, quick } = getResponse('greeting');
        appendMessage('bot', text);
        renderQuickReplies(quick);
      }, 250);
    });

    // Auto-open with greeting after 4 s (first visit feel)
    setTimeout(() => {
      if (!open) {
        const dot = document.getElementById('cb-notif-dot');
        if (dot) dot.style.display = 'block';
      }
    }, 4000);

    // Register chatbot elements with cursor hover effect (if cursor JS exists)
    if (typeof document.querySelectorAll === 'function') {
      const observer = new MutationObserver(() => {
        document.querySelectorAll('#chatbot-toggle, #chatbot-panel, .cb-qr, #cb-send, .cb-header-btn').forEach(el => {
          if (!el.dataset.cursorBound) {
            el.dataset.cursorBound = '1';
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
          }
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
