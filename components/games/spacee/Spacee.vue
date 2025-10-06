<template>
  <div class="w-full h-full">
    <div class="mb-2 flex items-center space-x-2">
      <button @click="toggle" class="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded">{{ running ? 'pause' : 'play' }}</button>
      <button @click="reset" class="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded">reset</button>
      <span class="text-xs text-gray-400">wasd/arrow keys to move, placeholder ship only</span>
    </div>
    <canvas ref="canvasEl" class="w-full h-full border border-dashed border-gray-600 rounded"></canvas>
  </div>
</template>

<script>
import { GameEngine, SpaceeScene, Vector2 } from './Engine'

export default {
  name: 'Spacee',
  data() {
    return {
      engine: null,
      running: false
    }
  },
  mounted() {
    const canvas = this.$refs.canvasEl
    // Initialize scene and engine
    const scene = new SpaceeScene()
    this.engine = new GameEngine({ canvas, scene })

    // Example: center player on initial mount; scene will be resized by engine
    scene.player.position = new Vector2(scene.width / 2, scene.height / 2)

    this.running = true
    this.engine.start()
  },
  beforeDestroy() {
    if (this.engine) this.engine.destroy()
  },
  methods: {
    toggle() {
      if (!this.engine) return
      this.engine.toggle()
      this.running = !this.running
    },
    reset() {
      if (!this.engine) return
      // Recreate a fresh scene; this is a convenient hook to re-seed your world
      const canvas = this.$refs.canvasEl
      const newScene = new SpaceeScene({ width: canvas.clientWidth, height: canvas.clientHeight })
      this.engine.scene = newScene
      this.running = true
      this.engine.start()
    }
  }
}
</script>

<style scoped>
</style>


