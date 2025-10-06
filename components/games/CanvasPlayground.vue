<template>
  <div class="w-full h-full">
    <canvas ref="canvasEl" class="w-full h-full border border-dashed border-gray-600 rounded"></canvas>
    <div class="mt-2 flex items-center space-x-2">
      <button @click="reset" class="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded">reset</button>
      <button @click="toggle" class="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded">{{ running ? 'pause' : 'play' }}</button>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'CanvasPlayground',
  data() {
    return {
      ctx: null,
      canvas: null,
      animationHandle: null,
      running: true,
      balls: []
    }
  },
  mounted() {
    this.canvas = this.$refs.canvasEl
    this.resizeCanvas()
    this.ctx = this.canvas.getContext('2d')
    window.addEventListener('resize', this.resizeCanvas)
    this.init()
    this.loop()
    this.canvas.addEventListener('click', this.addBallAtMouse)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeCanvas)
    this.canvas && this.canvas.removeEventListener('click', this.addBallAtMouse)
    cancelAnimationFrame(this.animationHandle)
  },
  methods: {
    resizeCanvas() {
      const rect = this.$el.getBoundingClientRect()
      const ratio = window.devicePixelRatio || 1
      this.canvas.width = Math.max(300, Math.floor(rect.width)) * ratio
      this.canvas.height = Math.max(240, Math.floor(rect.height - 40)) * ratio
      this.canvas.style.width = '100%'
      this.canvas.style.height = `${Math.floor(rect.height - 40)}px`
      if (this.ctx) {
        this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      }
    },
    init() {
      this.balls = []
      for (let i = 0; i < 8; i++) {
        this.balls.push(this.createBall())
      }
    },
    createBall(x, y) {
      const cw = this.canvas.clientWidth
      const ch = this.canvas.clientHeight
      const radius = 8 + Math.random() * 12
      return {
        x: x !== undefined ? x : Math.random() * cw,
        y: y !== undefined ? y : Math.random() * ch,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        r: radius,
        color: `hsl(${Math.floor(Math.random()*360)}, 70%, 60%)`
      }
    },
    addBallAtMouse(e) {
      const rect = this.canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      this.balls.push(this.createBall(x, y))
    },
    loop() {
      if (!this.running) {
        this.animationHandle = requestAnimationFrame(this.loop)
        return
      }
      this.step()
      this.draw()
      this.animationHandle = requestAnimationFrame(this.loop)
    },
    step() {
      const cw = this.canvas.clientWidth
      const ch = this.canvas.clientHeight
      for (const b of this.balls) {
        b.x += b.vx
        b.y += b.vy
        if (b.x - b.r < 0 || b.x + b.r > cw) b.vx *= -1
        if (b.y - b.r < 0 || b.y + b.r > ch) b.vy *= -1
      }
    },
    draw() {
      const ctx = this.ctx
      const cw = this.canvas.clientWidth
      const ch = this.canvas.clientHeight
      ctx.clearRect(0, 0, cw, ch)
      // background grid
      ctx.strokeStyle = 'rgba(255,255,255,0.06)'
      ctx.lineWidth = 1
      for (let x = 0; x < cw; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke()
      }
      for (let y = 0; y < ch; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke()
      }
      // balls
      for (const b of this.balls) {
        ctx.beginPath()
        ctx.fillStyle = b.color
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      }
    },
    reset() {
      this.init()
    },
    toggle() {
      this.running = !this.running
    }
  }
}
</script>

<style scoped>
</style>


