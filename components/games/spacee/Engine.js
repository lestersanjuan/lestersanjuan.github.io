// Engine.js
// Lightweight OOD-friendly game loop and scene system for Spacee.
// You only need to implement your domain objects (Player, Enemy, Bullet, etc.)
// and register them in a Scene. The engine handles input, timing, update, and draw plumbing.

export class Vector2 {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }
  add(v) { this.x += v.x; this.y += v.y; return this }
  scale(s) { this.x *= s; this.y *= s; return this }
  clone() { return new Vector2(this.x, this.y) }
}

export class Input {
  constructor(target = window) {
    this.keysDown = new Set()
    this.pointer = { x: 0, y: 0, down: false }
    this._onKeyDown = (e) => this.keysDown.add(e.key)
    this._onKeyUp = (e) => this.keysDown.delete(e.key)
    this._onPointerDown = () => this.pointer.down = true
    this._onPointerUp = () => this.pointer.down = false
    this._onPointerMove = (e) => {
      const rect = this.canvas?.getBoundingClientRect?.() || { left: 0, top: 0 }
      this.pointer.x = e.clientX - rect.left
      this.pointer.y = e.clientY - rect.top
    }
    target.addEventListener('keydown', this._onKeyDown)
    target.addEventListener('keyup', this._onKeyUp)
    target.addEventListener('pointerdown', this._onPointerDown)
    target.addEventListener('pointerup', this._onPointerUp)
    target.addEventListener('pointermove', this._onPointerMove)
  }
  attachCanvas(canvas) {
    // store canvas to map pointer coordinates properly
    this.canvas = canvas
  }
  isDown(key) { return this.keysDown.has(key) }
  destroy(target = window) {
    target.removeEventListener('keydown', this._onKeyDown)
    target.removeEventListener('keyup', this._onKeyUp)
    target.removeEventListener('pointerdown', this._onPointerDown)
    target.removeEventListener('pointerup', this._onPointerUp)
    target.removeEventListener('pointermove', this._onPointerMove)
  }
}

export class Entity {
  // Base class for all game objects. Extend this and override update/draw.
  constructor({ position = new Vector2(), rotation = 0, radius = 10 } = {}) {
    this.position = position
    this.rotation = rotation
    this.radius = radius // for simple collisions
    this.alive = true
  }
  update(dt, ctx, input, world) {}
  draw(ctx) {
    // Example: draw a placeholder circle. Replace in subclasses.
    ctx.save()
    ctx.translate(this.position.x, this.position.y)
    ctx.rotate(this.rotation)
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'
    ctx.beginPath()
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }
}

export class Scene {
  // Holds and updates entities; add systems here (spawners, collisions, etc.)
  constructor({ width = 800, height = 600 } = {}) {
    this.width = width
    this.height = height
    this.entities = []
    this.background = '#0b0d10'
  }
  add(entity) { this.entities.push(entity); return entity }
  remove(entity) { this.entities = this.entities.filter(e => e !== entity) }
  update(dt, ctx, input) {
    // Example global logic: cull dead entities
    for (const e of this.entities) {
      if (e.alive) e.update(dt, ctx, input, this)
    }
    this.entities = this.entities.filter(e => e.alive)
  }
  draw(ctx) {
    ctx.fillStyle = this.background
    ctx.fillRect(0, 0, this.width, this.height)
    for (const e of this.entities) e.draw(ctx)
  }
}

export class GameEngine {
  // Orchestrates the loop and delegates to a Scene. Keep it tiny and focused.
  constructor({ canvas, scene }) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.scene = scene
    this.lastTime = 0
    this.running = false
    this.input = new Input(window)
    this.input.attachCanvas(canvas)
    this._loop = this._loop.bind(this)
    // Observe size changes; fallback to window resize if ResizeObserver unavailable
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this._resizeToCanvasClient())
      this.resizeObserver.observe(this.canvas)
    } else {
      this._onResize = () => this._resizeToCanvasClient()
      window.addEventListener('resize', this._onResize)
    }
    this._resizeToCanvasClient()
  }
  _resizeToCanvasClient() {
    const ratio = window.devicePixelRatio || 1
    const w = Math.max(300, Math.floor(this.canvas.clientWidth))
    const h = Math.max(240, Math.floor(this.canvas.clientHeight))
    this.canvas.width = w * ratio
    this.canvas.height = h * ratio
    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    if (this.scene) { this.scene.width = w; this.scene.height = h }
  }
  start() {
    if (this.running) return
    this.running = true
    this.lastTime = performance.now()
    requestAnimationFrame(this._loop)
  }
  pause() { this.running = false }
  toggle() { this.running = !this.running; if (this.running) this.start() }
  _loop(t) {
    if (!this.running) return
    const dt = Math.min(0.033, (t - this.lastTime) / 1000) // clamp delta
    this.lastTime = t
    this.scene.update(dt, this.ctx, this.input)
    this.scene.draw(this.ctx)
    requestAnimationFrame(this._loop)
  }
  destroy() {
    this.pause()
    this.input.destroy(window)
    if (this.resizeObserver) this.resizeObserver.disconnect()
    if (this._onResize) window.removeEventListener('resize', this._onResize)
  }
}

// Simple example entities to copy-paste from:
export class Ship extends Entity {
  // Represents the player ship; handle thrust/rotation and bullets externally.
  constructor(opts = {}) {
    super({ radius: 14, ...opts })
    this.velocity = new Vector2()
    this.thrust = 180 // px/s^2
    this.turnSpeed = 3.2 // rad/s
    this.friction = 0.98
  }
  update(dt, ctx, input, world) {
    // rotation
    if (input.isDown('ArrowLeft') || input.isDown('a')) this.rotation -= this.turnSpeed * dt
    if (input.isDown('ArrowRight') || input.isDown('d')) this.rotation += this.turnSpeed * dt
    // thrust
    if (input.isDown('ArrowUp') || input.isDown('w')) {
      const ax = Math.cos(this.rotation) * this.thrust
      const ay = Math.sin(this.rotation) * this.thrust
      this.velocity.x += ax * dt
      this.velocity.y += ay * dt
    }
    // integrate
    this.position.x += this.velocity.x * dt
    this.position.y += this.velocity.y * dt
    this.velocity.scale(this.friction)
    // screen wrap
    if (this.position.x < 0) this.position.x += world.width
    if (this.position.x > world.width) this.position.x -= world.width
    if (this.position.y < 0) this.position.y += world.height
    if (this.position.y > world.height) this.position.y -= world.height
  }
  draw(ctx) {
    ctx.save()
    ctx.translate(this.position.x, this.position.y)
    ctx.rotate(this.rotation)
    ctx.strokeStyle = '#7dd3fc' // tailwind sky-300
    ctx.lineWidth = 2
    // triangle ship
    ctx.beginPath()
    ctx.moveTo(18, 0)
    ctx.lineTo(-12, -10)
    ctx.lineTo(-12, 10)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }
}

export class SpaceeScene extends Scene {
  // Place your OOD composition here: add Ship, Asteroids, Bullets, etc.
  constructor(opts = {}) {
    super(opts)
    // Example setup: one ship centered
    this.player = this.add(new Ship({ position: new Vector2(this.width/2, this.height/2) }))
    // TODO: add spawners/managers here when you implement game logic
  }
  update(dt, ctx, input) {
    // demo mode: if no movement keys pressed, slowly rotate to show the loop is alive
    const moving = input.isDown('ArrowLeft') || input.isDown('ArrowRight') || input.isDown('ArrowUp') || input.isDown('a') || input.isDown('d') || input.isDown('w')
    if (!moving && this.player) {
      this.player.rotation += 0.6 * dt
    }
    super.update(dt, ctx, input)
  }
  draw(ctx) {
    super.draw(ctx)
    // HUD/instructions (kept minimal; adjust styling as desired)
    ctx.save()
    ctx.fillStyle = 'rgba(255,255,255,0.6)'
    ctx.font = '12px Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial'
    ctx.fillText('spacee: arrow keys / wasd to steer. demo rotates if idle.', 12, 20)
    ctx.restore()
  }
}


