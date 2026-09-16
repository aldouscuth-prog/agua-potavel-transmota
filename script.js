/* ===================== MENU MOBILE ===================== */
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const icon = menuToggle.querySelector('i');
  if (navMenu.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

/* Fechar menu ao clicar em um link */
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

/* ===================== BOTÃO VOLTAR AO TOPO ===================== */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/* ===================== ANIMAÇÃO DE ENTRADA (FADE UP) ===================== */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

/* Adicionar classe fade-up nos elementos que queremos animar */
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll(
    '.section-header, .sobre-text, .info-card, .servico-card, .frota-card, ' +
    '.calculadora-form, .calculadora-info, .monitoramento-text, .monitoramento-visual, ' +
    '.contato-card, .contato-cta'
  );

  elementsToAnimate.forEach((el, index) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    observer.observe(el);
  });
});

/* ===================== FORMULÁRIO DE ORÇAMENTO ===================== */
const formOrcamento = document.getElementById('formOrcamento');

formOrcamento.addEventListener('submit', (e) => {
  e.preventDefault();

  /* Coletar dados */
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const capacidade = document.getElementById('capacidade').value;
  const tipoAgua = document.getElementById('tipoAgua').value;
  const local = document.getElementById('local').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  /* Validação básica */
  if (!nome || !email || !telefone || !capacidade || !tipoAgua || !local) {
    showToast('Por favor, preencha todos os campos obrigatórios.', 'erro');
    return;
  }

  /* Validação de e-mail */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Por favor, insira um e-mail válido.', 'erro');
    return;
  }

  /* Simular envio (aqui você integraria com um backend ou API) */
  const btn = formOrcamento.querySelector('button[type="submit"]');
  const textoOriginal = btn.innerHTML;

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Orçamento Enviado!';
    btn.style.background = 'linear-gradient(135deg, #25d366, #1ebe5b)';

    showToast('Orçamento solicitado com sucesso! Entraremos em contato em breve.', 'sucesso');

    /* Resetar formulário após 3 segundos */
    setTimeout(() => {
      formOrcamento.reset();
      btn.innerHTML = textoOriginal;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1800);
});

/* ===================== TOAST (NOTIFICAÇÃO) ===================== */
function showToast(mensagem, tipo = 'sucesso') {
  /* Remover toast existente */
  const toastExistente = document.querySelector('.toast');
  if (toastExistente) toastExistente.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${tipo}`;

  const icone = tipo === 'sucesso'
    ? '<i class="fas fa-check-circle"></i>'
    : '<i class="fas fa-exclamation-circle"></i>';

  toast.innerHTML = `${icone} <span>${mensagem}</span>`;
  document.body.appendChild(toast);

  /* Estilos dinâmicos do toast */
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%) translateY(100px)',
    background: tipo === 'sucesso' ? '#25d366' : '#e53935',
    color: '#fff',
    padding: '16px 28px',
    borderRadius: '50px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontWeight: '600',
    fontSize: '0.95rem',
    zIndex: '9999',
    opacity: '0',
    transition: 'all 0.4s ease',
    maxWidth: '90%',
    textAlign: 'center'
  });

  /* Animar entrada */
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  }, 50);

  /* Remover após 4 segundos */
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ===================== SCROLL SUAVE PARA LINKS INTERNOS ===================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

/* ===================== ANIMAÇÃO DO NÍVEL DE ÁGUA ===================== */
window.addEventListener('load', () => {
  const nivelPreenchimento = document.querySelector('.nivel-preenchimento');
  if (nivelPreenchimento) {
    nivelPreenchimento.style.height = '0%';
    setTimeout(() => {
      nivelPreenchimento.style.height = '78%';
    }, 500);
  }
});

/* ===================== MÁSCARA DE TELEFONE ===================== */
const telefoneInput = document.getElementById('telefone');

if (telefoneInput) {
  telefoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 0) {
      if (value.length <= 10) {
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else {
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
      }
    }

    e.target.value = value;
  });
}

/* ===================== EFEITO DE HOVER NOS CARDS (MOUSE MOVE) ===================== */
document.querySelectorAll('.servico-card, .frota-card, .contato-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

console.log('%c🚛 Transmota - Transporte de Água Potável', 'color: #2196f3; font-size: 20px; font-weight: bold;');
console.log('%cDesde 2001 no Rio de Janeiro', 'color: #00b4d8; font-size: 14px;');
