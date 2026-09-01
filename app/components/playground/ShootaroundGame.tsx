"use client";

import { useEffect, useRef, useState } from "react";
import { usePlaygroundState } from "@/app/components/playground/PlaygroundState";

const WIDTH = 260;
const HEIGHT = 180;
const BALL_RADIUS = 9;
const START = { x: 40, y: HEIGHT - 30 };
const RIM = { x: 205, y: 46, halfWidth: 16 };
const GRAVITY = 0.42;
const PULL_POWER = 0.16;
const MAX_PULL = 65;

type Phase = "idle" | "dragging" | "flight";

type GameState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: Phase;
  dragX: number;
  dragY: number;
  prevY: number;
  scoredThisFlight: boolean;
  settleFrames: number;
};

function freshState(): GameState {
  return {
    x: START.x,
    y: START.y,
    vx: 0,
    vy: 0,
    phase: "idle",
    dragX: START.x,
    dragY: START.y,
    prevY: START.y,
    scoredThisFlight: false,
    settleFrames: 0,
  };
}

export default function ShootaroundGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef<GameState>(freshState());
  const [status, setStatus] = useState("ready");
  const { registerCleanShot } = usePlaygroundState();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let resetTimeout: ReturnType<typeof setTimeout> | null = null;

    function toCanvasPoint(clientX: number, clientY: number) {
      const rect = canvas!.getBoundingClientRect();
      return {
        x: ((clientX - rect.left) / rect.width) * WIDTH,
        y: ((clientY - rect.top) / rect.height) * HEIGHT,
      };
    }

    function scheduleReset() {
      if (resetTimeout) return;
      resetTimeout = setTimeout(() => {
        stateRef.current = freshState();
        setStatus("ready");
        resetTimeout = null;
      }, 700);
    }

    function onPointerDown(e: PointerEvent) {
      const s = stateRef.current;
      if (s.phase !== "idle") return;
      const p = toCanvasPoint(e.clientX, e.clientY);
      const dist = Math.hypot(p.x - s.x, p.y - s.y);
      if (dist > BALL_RADIUS + 14) return;
      s.phase = "dragging";
      canvas!.setPointerCapture(e.pointerId);
      setStatus("drag");
    }

    function onPointerMove(e: PointerEvent) {
      const s = stateRef.current;
      if (s.phase !== "dragging") return;
      const p = toCanvasPoint(e.clientX, e.clientY);
      const dx = p.x - START.x;
      const dy = p.y - START.y;
      const dist = Math.min(Math.hypot(dx, dy), MAX_PULL);
      const angle = Math.atan2(dy, dx);
      s.dragX = START.x + Math.cos(angle) * dist;
      s.dragY = START.y + Math.sin(angle) * dist;
      s.x = s.dragX;
      s.y = s.dragY;
    }

    function onPointerUp() {
      const s = stateRef.current;
      if (s.phase !== "dragging") return;
      const pullX = START.x - s.dragX;
      const pullY = START.y - s.dragY;
      s.vx = pullX * PULL_POWER;
      s.vy = pullY * PULL_POWER;
      s.phase = "flight";
      s.scoredThisFlight = false;
      s.settleFrames = 0;
      setStatus("in the air");
    }

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    function drawDotGrid() {
      ctx!.fillStyle = "rgba(244, 242, 237, 0.08)";
      for (let x = 8; x < WIDTH; x += 14) {
        for (let y = 8; y < HEIGHT; y += 14) {
          ctx!.fillRect(x, y, 1, 1);
        }
      }
    }

    function drawHoop() {
      ctx!.strokeStyle = "rgba(244, 242, 237, 0.6)";
      ctx!.lineWidth = 2;
      ctx!.beginPath();
      ctx!.moveTo(RIM.x - RIM.halfWidth, RIM.y);
      ctx!.lineTo(RIM.x + RIM.halfWidth, RIM.y);
      ctx!.stroke();
      ctx!.beginPath();
      ctx!.moveTo(RIM.x + RIM.halfWidth + 4, RIM.y - 20);
      ctx!.lineTo(RIM.x + RIM.halfWidth + 4, RIM.y + 4);
      ctx!.stroke();
    }

    function tick() {
      const s = stateRef.current;

      if (s.phase === "flight") {
        s.prevY = s.y;
        s.vy += GRAVITY;
        s.x += s.vx;
        s.y += s.vy;

        if (s.x - BALL_RADIUS < 0) {
          s.x = BALL_RADIUS;
          s.vx *= -0.5;
        }
        if (s.x + BALL_RADIUS > WIDTH) {
          s.x = WIDTH - BALL_RADIUS;
          s.vx *= -0.5;
        }

        const crossingRim =
          s.prevY < RIM.y &&
          s.y >= RIM.y &&
          s.vy > 0 &&
          Math.abs(s.x - RIM.x) < RIM.halfWidth - 2;
        if (crossingRim && !s.scoredThisFlight) {
          s.scoredThisFlight = true;
          registerCleanShot();
          setStatus("nice shot!");
        }

        const floorY = HEIGHT - 12;
        if (s.y + BALL_RADIUS > floorY) {
          s.y = floorY - BALL_RADIUS;
          s.vy *= -0.35;
          s.vx *= 0.8;
        }

        const speed = Math.hypot(s.vx, s.vy);
        const offscreen = s.x < -30 || s.x > WIDTH + 30 || s.y > HEIGHT + 30;
        if (offscreen) {
          scheduleReset();
        } else if (
          speed < 0.6 &&
          Math.abs(s.y + BALL_RADIUS - floorY) < 1.5
        ) {
          s.settleFrames += 1;
          if (s.settleFrames > 20) scheduleReset();
        }
      }

      ctx!.clearRect(0, 0, WIDTH, HEIGHT);
      drawDotGrid();
      drawHoop();

      ctx!.fillStyle = "#F4F2ED";
      ctx!.beginPath();
      ctx!.arc(s.x, s.y, BALL_RADIUS, 0, Math.PI * 2);
      ctx!.fill();

      if (s.phase === "dragging") {
        ctx!.strokeStyle = "rgba(244, 242, 237, 0.35)";
        ctx!.lineWidth = 1.5;
        ctx!.setLineDash([3, 3]);
        ctx!.beginPath();
        ctx!.moveTo(s.x, s.y);
        ctx!.lineTo(START.x, START.y);
        ctx!.stroke();
        ctx!.setLineDash([]);
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      if (resetTimeout) clearTimeout(resetTimeout);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, [registerCleanShot]);

  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between text-xs text-dim">
        <span>{status}</span>
        <span>drag / release</span>
      </div>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        className="w-full touch-none rounded"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      />
    </div>
  );
}
