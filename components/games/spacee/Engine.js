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
    this._loop = this._loop.abind(this)
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
    this.friction = 0.98
    this.shootCooldown = 0
    this.shootRate = 0.15 // seconds between shots
  }
  update(dt, ctx, input, world) {
    // Auto-rotate toward mouse
    const dx = input.pointer.x - this.position.x
    const dy = input.pointer.y - this.position.y
    this.rotation = Math.atan2(dy, dx)
    
    // WASD movement
    const moveSpeed = this.thrust
    if (input.isDown('w') || input.isDown('W')) {
      this.velocity.y -= moveSpeed * dt
    }
    if (input.isDown('s') || input.isDown('S')) {
      this.velocity.y += moveSpeed * dt
    }
    if (input.isDown('a') || input.isDown('A')) {
      this.velocity.x -= moveSpeed * dt
    }
    if (input.isDown('d') || input.isDown('D')) {
      this.velocity.x += moveSpeed * dt
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
    
    // Shooting
    this.shootCooldown = Math.max(0, this.shootCooldown - dt)
    if (input.pointer.down && this.shootCooldown <= 0) {
      this.shoot(world)
      this.shootCooldown = this.shootRate
    }
  }
  shoot(world) {
    const bulletSpeed = 400
    const bullet = new Bullet({
      position: this.position.clone(),
      velocity: new Vector2(
        Math.cos(this.rotation) * bulletSpeed,
        Math.sin(this.rotation) * bulletSpeed
      )
    })
    world.add(bullet)
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

export class Bullet extends Entity {
  constructor({ position, velocity }) {
    super({ position, radius: 3 })
    this.velocity = velocity
    this.lifetime = 2 // seconds
  }
  update(dt, ctx, input, world) {
    this.position.x += this.velocity.x * dt
    this.position.y += this.velocity.y * dt
    this.lifetime -= dt
    if (this.lifetime <= 0) this.alive = false
    
    // screen wrap
    if (this.position.x < 0) this.position.x += world.width
    if (this.position.x > world.width) this.position.x -= world.width
    if (this.position.y < 0) this.position.y += world.height
    if (this.position.y > world.height) this.position.y -= world.height
  }
  draw(ctx) {
    ctx.save()
    ctx.fillStyle = '#fbbf24' // tailwind amber-400
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

export class Enemy extends Entity {
  constructor(opts = {}) {
    super({ radius: 16, ...opts })
    this.velocity = new Vector2()
    this.speed = 60 + Math.random() * 40
    this.health = 1
  }
  update(dt, ctx, input, world) {
    // Move toward player
    if (world.player && world.player.alive) {
      const dx = world.player.position.x - this.position.x
      const dy = world.player.position.y - this.position.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist > 0) {
        this.velocity.x = (dx / dist) * this.speed
        this.velocity.y = (dy / dist) * this.speed
      }
    }
    
    this.position.x += this.velocity.x * dt
    this.position.y += this.velocity.y * dt
    
    // screen wrap
    if (this.position.x < 0) this.position.x += world.width
    if (this.position.x > world.width) this.position.x -= world.width
    if (this.position.y < 0) this.position.y += world.height
    if (this.position.y > world.height) this.position.y -= world.height
  }
  draw(ctx) {
    ctx.save()
    ctx.translate(this.position.x, this.position.y)
    ctx.fillStyle = '#ef4444' // tailwind red-500
    ctx.strokeStyle = '#dc2626' // tailwind red-600
    ctx.lineWidth = 2
    // hexagon enemy
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i
      const x = Math.cos(angle) * this.radius
      const y = Math.sin(angle) * this.radius
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fill()
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
    this.score = 0
    this.enemySpawnTimer = 0
    this.enemySpawnRate = 2 // seconds between spawns
  }
  
  spawnEnemy() {
    // Spawn at random edge
    const edge = Math.floor(Math.random() * 4)
    let x, y
    const margin = 20
    switch(edge) {
      case 0: // top
        x = Math.random() * this.width
        y = -margin
        break
      case 1: // right
        x = this.width + margin
        y = Math.random() * this.height
        break
      case 2: // bottom
        x = Math.random() * this.width
        y = this.height + margin
        break
      case 3: // left
        x = -margin
        y = Math.random() * this.height
        break
    }
    this.add(new Enemy({ position: new Vector2(x, y) }))
  }
  
  checkCollisions() {
    const bullets = this.entities.filter(e => e instanceof Bullet && e.alive)
    const enemies = this.entities.filter(e => e instanceof Enemy && e.alive)
    
    // Bullet vs Enemy
    for (const bullet of bullets) {
      for (const enemy of enemies) {
        const dx = bullet.position.x - enemy.position.x
        const dy = bullet.position.y - enemy.position.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < bullet.radius + enemy.radius) {
          bullet.alive = false
          enemy.alive = false
          this.score += 10
        }
      }
    }
    
    // Enemy vs Player
    if (this.player && this.player.alive) {
      for (const enemy of enemies) {
        const dx = this.player.position.x - enemy.position.x
        const dy = this.player.position.y - enemy.position.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < this.player.radius + enemy.radius) {
          enemy.alive = false
          this.score = Math.max(0, this.score - 5) // lose points
        }
      }
    }
  }
  
  update(dt, ctx, input) {
    super.update(dt, ctx, input)
    
    // Spawn enemies
    this.enemySpawnTimer += dt
    if (this.enemySpawnTimer >= this.enemySpawnRate) {
      this.spawnEnemy()
      this.enemySpawnTimer = 0
      // Gradually increase spawn rate
      this.enemySpawnRate = Math.max(0.8, this.enemySpawnRate * 0.98)
    }
    
    // Check collisions
    this.checkCollisions()
  }
  
  draw(ctx) {
    super.draw(ctx)
    // HUD/instructions (kept minimal; adjust styling as desired)
    ctx.save()
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.font = '16px Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial'
    ctx.fillText(`Score: ${this.score}`, 12, 24)
    ctx.font = '12px Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial'
    ctx.fillStyle = 'rgba(255,255,255,0.6)'
    ctx.fillText('WASD to move • Left click to shoot', 12, 46)
    ctx.restore()
  }
}


