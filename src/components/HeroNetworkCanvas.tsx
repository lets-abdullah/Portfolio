import React, { useRef, useEffect } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isHub: boolean;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  highlight: number;
  flareSize: number;
}

interface BokehOrb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulsePhase: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const HeroNetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use alpha: true so canvas seamlessly blends with existing theme
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const speedMultiplier = prefersReducedMotion ? 0.12 : 1;

    const pointer = {
      x: -2000,
      y: -2000,
      isHovering: false
    };

    const ripples: Ripple[] = [];
    let nodes: Node[] = [];
    let bokehOrbs: BokehOrb[] = [];

    const initSimulation = (w: number, h: number) => {
      const isMobile = w < 600;
      // Increased node density to match Image 2
      const nodeCount = isMobile ? 42 : 72;
      const hubCount = isMobile ? 5 : 9;
      const bokehCount = isMobile ? 8 : 15;

      const newNodes: Node[] = [];
      const newBokeh: BokehOrb[] = [];

      // 1. Soft out-of-focus background bokeh orbs (depth of field)
      for (let i = 0; i < bokehCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (0.18 + Math.random() * 0.25) * speedMultiplier;
        newBokeh.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 14 + Math.random() * 26,
          alpha: 0.06 + Math.random() * 0.12,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }

      // 2. Constellation nodes with increased speed
      for (let i = 0; i < nodeCount; i++) {
        const isHub = i < hubCount;
        const angle = Math.random() * Math.PI * 2;
        // Increased moving speed (lively, smooth motion)
        const speed = (isHub ? 0.45 + Math.random() * 0.4 : 0.65 + Math.random() * 0.65) * speedMultiplier;

        newNodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: isHub ? 4.2 + Math.random() * 1.8 : 2.0 + Math.random() * 1.6,
          isHub,
          baseAlpha: isHub ? 0.98 : 0.7 + Math.random() * 0.3,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 1.5 + Math.random() * 1.6,
          highlight: 0,
          flareSize: isHub ? 22 + Math.random() * 16 : 0
        });
      }

      return { nodes: newNodes, bokehOrbs: newBokeh };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const sim = initSimulation(width, height);
      nodes = sim.nodes;
      bokehOrbs = sim.bokehOrbs;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(canvas);
    resize();

    // Desktop pointer interaction
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.isHovering = true;
    };

    const handlePointerLeave = () => {
      pointer.isHovering = false;
      pointer.x = -2000;
      pointer.y = -2000;
    };

    // Mobile touch interaction
    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const tapX = e.clientX - rect.left;
      const tapY = e.clientY - rect.top;

      ripples.push({
        x: tapX,
        y: tapY,
        radius: 6,
        maxRadius: Math.min(width, height) * 0.55,
        alpha: 0.95
      });

      nodes.forEach((node) => {
        const dx = node.x - tapX;
        const dy = node.y - tapY;
        const distSq = dx * dx + dy * dy;
        if (distSq < 150 * 150) {
          node.highlight = 1;
        }
      });
    };

    canvas.addEventListener('pointermove', handlePointerMove, { passive: true });
    canvas.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    canvas.addEventListener('pointerdown', handlePointerDown, { passive: true });

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const isMobile = width < 600;
      // Generous distance threshold for interconnected mesh
      const maxConnectDist = isMobile ? 120 : 175;
      const maxConnectDistSq = maxConnectDist * maxConnectDist;
      const mouseDist = isMobile ? 110 : 160;
      const mouseDistSq = mouseDist * mouseDist;

      // Clear with transparency so existing theme shines through
      ctx.clearRect(0, 0, width, height);

      // Warm ambient radial glow centered on constellation
      const ambientGlow = ctx.createRadialGradient(
        width * 0.6,
        height * 0.5,
        20,
        width * 0.6,
        height * 0.5,
        Math.max(width, height) * 0.65
      );
      ambientGlow.addColorStop(0, 'rgba(229, 184, 59, 0.09)');
      ambientGlow.addColorStop(0.5, 'rgba(201, 147, 39, 0.03)');
      ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Bokeh Orbs
      for (let i = 0; i < bokehOrbs.length; i++) {
        const orb = bokehOrbs[i];
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        orb.pulsePhase += 1.0 * dt;
        const currentAlpha = orb.alpha * (0.8 + Math.sin(orb.pulsePhase) * 0.2);

        const bokehGrad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        bokehGrad.addColorStop(0, `rgba(245, 197, 66, ${currentAlpha * 0.85})`);
        bokehGrad.addColorStop(0.5, `rgba(201, 147, 39, ${currentAlpha * 0.38})`);
        bokehGrad.addColorStop(1, 'rgba(201, 147, 39, 0)');

        ctx.fillStyle = bokehGrad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Update and draw ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += 180 * dt;
        rip.alpha -= 1.1 * dt;

        if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(r, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 235, 150, ${rip.alpha * 0.5})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const dx = n.x - rip.x;
          const dy = n.y - rip.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (Math.abs(d - rip.radius) < 32) {
            n.highlight = Math.max(n.highlight, rip.alpha * 0.95);
          }
        }
      }

      // 3. Update nodes position & mouse dynamics
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (node.highlight > 0) {
          node.highlight = Math.max(0, node.highlight - 1.2 * dt);
        }

        if (pointer.isHovering) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseDistSq && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / mouseDist;
            const push = factor * 42 * dt;
            node.vx -= (dx / dist) * push;
            node.vy -= (dy / dist) * push;
            node.highlight = Math.max(node.highlight, factor * 0.85);
          }
        }

        node.vx *= 0.99;
        node.vy *= 0.99;

        // Keep motion dynamic and lively
        const currentSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        const minSpeed = (node.isHub ? 0.4 : 0.6) * speedMultiplier;
        if (currentSpeed < minSpeed && currentSpeed > 0) {
          const scale = minSpeed / currentSpeed;
          node.vx *= scale;
          node.vy *= scale;
        }

        node.x += node.vx;
        node.y += node.vy;

        // Wrap around smoothly across the canvas boundaries
        const pad = 15;
        if (node.x < -pad) node.x = width + pad;
        if (node.x > width + pad) node.x = -pad;
        if (node.y < -pad) node.y = height + pad;
        if (node.y > height + pad) node.y = -pad;

        node.pulsePhase += node.pulseSpeed * dt;
      }

      // 4. GUARANTEE ALL PARTICLES ARE CONNECTED (Image 2 style)
      // Track connections to avoid drawing duplicates
      const drawnConnections = new Set<string>();

      const drawLine = (
        a: Node,
        b: Node,
        dist: number,
        maxD: number,
        isForceNeighbor = false
      ) => {
        const proximity = Math.max(0, 1 - dist / maxD);
        const extra = Math.max(a.highlight, b.highlight);
        const isHubConn = a.isHub && b.isHub;

        let baseAlpha = isForceNeighbor
          ? 0.35 + proximity * 0.35
          : proximity * (isHubConn ? 0.65 : 0.45);
        const lineAlpha = Math.min(0.9, baseAlpha + extra * 0.45);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);

        if (isHubConn || extra > 0.25) {
          ctx.strokeStyle = `rgba(255, 235, 160, ${lineAlpha})`;
          ctx.lineWidth = 1.4;
        } else {
          ctx.strokeStyle = `rgba(229, 184, 59, ${lineAlpha})`;
          ctx.lineWidth = 1.0;
        }
        ctx.stroke();
      };

      // Step A: Connect every node to at least its 2 nearest neighbors unconditionally
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        let closest1 = -1;
        let d1 = Infinity;
        let closest2 = -1;
        let d2 = Infinity;

        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dSq = dx * dx + dy * dy;

          if (dSq < d1) {
            d2 = d1;
            closest2 = closest1;
            d1 = dSq;
            closest1 = j;
          } else if (dSq < d2) {
            d2 = dSq;
            closest2 = j;
          }
        }

        if (closest1 !== -1) {
          const key1 = i < closest1 ? `${i}_${closest1}` : `${closest1}_${i}`;
          if (!drawnConnections.has(key1)) {
            drawnConnections.add(key1);
            drawLine(a, nodes[closest1], Math.sqrt(d1), maxConnectDist, true);
          }
        }

        if (closest2 !== -1) {
          const key2 = i < closest2 ? `${i}_${closest2}` : `${closest2}_${i}`;
          if (!drawnConnections.has(key2)) {
            drawnConnections.add(key2);
            drawLine(a, nodes[closest2], Math.sqrt(d2), maxConnectDist, true);
          }
        }
      }

      // Step B: Connect all nodes within maxConnectDist (dense polygon web)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const key = `${i}_${j}`;
          if (drawnConnections.has(key)) continue;

          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnectDistSq) {
            drawnConnections.add(key);
            drawLine(a, b, Math.sqrt(distSq), maxConnectDist, false);
          }
        }

        // Draw connections to mouse cursor (desktop)
        if (pointer.isHovering) {
          const mdx = pointer.x - a.x;
          const mdy = pointer.y - a.y;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < mouseDistSq) {
            const mDist = Math.sqrt(mDistSq);
            const mFactor = 1 - mDist / mouseDist;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.strokeStyle = `rgba(255, 235, 160, ${mFactor * 0.8})`;
            ctx.lineWidth = 1.3;
            ctx.stroke();
          }
        }
      }

      // 5. Draw mouse cursor glowing focal beacon (desktop)
      if (pointer.isHovering) {
        ctx.save();
        const cursorGlow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          30
        );
        cursorGlow.addColorStop(0, 'rgba(255, 245, 200, 0.95)');
        cursorGlow.addColorStop(0.35, 'rgba(229, 184, 59, 0.55)');
        cursorGlow.addColorStop(1, 'rgba(201, 147, 39, 0)');
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 30, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.restore();
      }

      // 6. Draw Nodes with Radiant Halos & Starburst Flares (Image 2 style)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const pulse = 0.82 + Math.sin(node.pulsePhase) * 0.18;
        const currentAlpha = Math.min(1, (node.baseAlpha * pulse) + node.highlight * 0.5);
        const radius = node.radius + (node.highlight * 1.5);

        ctx.save();

        if (node.isHub) {
          // Major Hub: Radiant circular aura
          const haloRadius = (node.radius * 7) + (node.highlight * 14);
          const haloGrad = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            haloRadius
          );
          haloGrad.addColorStop(0, `rgba(255, 240, 180, ${currentAlpha * 0.95})`);
          haloGrad.addColorStop(0.28, `rgba(229, 184, 59, ${currentAlpha * 0.58})`);
          haloGrad.addColorStop(0.65, `rgba(201, 147, 39, ${currentAlpha * 0.2})`);
          haloGrad.addColorStop(1, 'rgba(201, 147, 39, 0)');

          ctx.fillStyle = haloGrad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, haloRadius, 0, Math.PI * 2);
          ctx.fill();

          // 4-Point Optical Starburst Flare rays (matching Image 2)
          const fSize = (node.flareSize + node.highlight * 14) * (0.85 + Math.sin(node.pulsePhase) * 0.15);

          // Horizontal Ray
          const gradH = ctx.createLinearGradient(node.x - fSize, node.y, node.x + fSize, node.y);
          gradH.addColorStop(0, 'rgba(255, 230, 140, 0)');
          gradH.addColorStop(0.5, `rgba(255, 255, 235, ${currentAlpha * 0.95})`);
          gradH.addColorStop(1, 'rgba(255, 230, 140, 0)');
          ctx.strokeStyle = gradH;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(node.x - fSize, node.y);
          ctx.lineTo(node.x + fSize, node.y);
          ctx.stroke();

          // Vertical Ray
          const gradV = ctx.createLinearGradient(node.x, node.y - fSize, node.x, node.y + fSize);
          gradV.addColorStop(0, 'rgba(255, 230, 140, 0)');
          gradV.addColorStop(0.5, `rgba(255, 255, 235, ${currentAlpha * 0.95})`);
          gradV.addColorStop(1, 'rgba(255, 230, 140, 0)');
          ctx.strokeStyle = gradV;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y - fSize);
          ctx.lineTo(node.x, node.y + fSize);
          ctx.stroke();

          // Intense Golden Core
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFEEA';
          ctx.fill();
        } else {
          // Standard Node: Golden aura halo
          const auraRadius = (node.radius * 4) + (node.highlight * 6);
          const auraGrad = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            auraRadius
          );
          auraGrad.addColorStop(0, `rgba(255, 235, 150, ${currentAlpha * 0.85})`);
          auraGrad.addColorStop(0.4, `rgba(229, 184, 59, ${currentAlpha * 0.45})`);
          auraGrad.addColorStop(1, 'rgba(201, 147, 39, 0)');

          ctx.fillStyle = auraGrad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, auraRadius, 0, Math.PI * 2);
          ctx.fill();

          // Node body
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = node.highlight > 0.3 ? '#FFFFFF' : `rgba(255, 230, 130, ${currentAlpha})`;
          ctx.fill();

          // Bright pinpoint center
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-network-canvas"
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        touchAction: 'pan-y',
        cursor: 'crosshair',
        pointerEvents: 'auto'
      }}
      aria-label="Real-time interactive golden neural network constellation"
      role="img"
    />
  );
};
