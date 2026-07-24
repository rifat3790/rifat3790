/* =========================================================
   INTERACTIVE PARTICLES & TERMINAL EMULATOR
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // Canvas Setup
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.floor(width / 18);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.8 + 0.8;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.4 ? '#00f2fe' : (Math.random() > 0.5 ? '#d4af37' : '#7000ff');
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Draw particles & links
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#00f2fe';
            ctx.globalAlpha = (1 - dist / 110) * 0.15;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  // Terminal Emulator
  const termInput = document.getElementById('term-input');
  const termOutput = document.getElementById('term-output');

  if (termInput && termOutput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = termInput.value.trim().toLowerCase();
        termInput.value = '';

        const line = document.createElement('div');
        line.innerHTML = `<span style="color: #96bf48;">visitor@refayet-portfolio:~$</span> ${cmd}`;
        termOutput.appendChild(line);

        let response = '';
        if (cmd === 'help') {
          response = `Available commands: <br>
          • <b>skills</b> - View Full-Stack & Shopify skills<br>
          • <b>shopify</b> - Learn about Shopify & Headless solutions<br>
          • <b>contact</b> - Get email & social profiles<br>
          • <b>clear</b> - Clear terminal`;
        } else if (cmd === 'skills') {
          response = '🚀 React, Next.js 15, TypeScript, Node.js, Express, MongoDB, MySQL, Tailwind CSS, Shopify Liquid';
        } else if (cmd === 'shopify') {
          response = '🛒 Custom Liquid Theme Engineering, Headless Commerce (Next.js + Storefront GraphQL), Conversion Speed Tuning 95+';
        } else if (cmd === 'contact') {
          response = '📧 Email: mdrifayethossen@gmail.com | 💼 LinkedIn: md-refayet-hossen-62b796236';
        } else if (cmd === 'clear') {
          termOutput.innerHTML = '';
          return;
        } else {
          response = `Command not recognized: "${cmd}". Type <b style="color:#00f2fe">help</b> for options.`;
        }

        const respLine = document.createElement('div');
        respLine.style.color = '#94a3b8';
        respLine.style.margin = '4px 0 12px 0';
        respLine.innerHTML = response;
        termOutput.appendChild(respLine);

        termOutput.scrollTop = termOutput.scrollHeight;
      }
    });
  }
});
