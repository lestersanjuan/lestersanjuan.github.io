<template>
  <div class="pt-6">
    <div class="relative max-w-7xl border-r border-l border-dashed border-gray-700 py-6 mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <h1 class="text-2xl tracking-tight font-extrabold text-gray-200">games</h1>

          <div class="mt-6 space-y-6">
            <div class="p-4 border border-dashed border-gray-700 rounded">
              <h2 class="text-lg font-bold mb-2 text-gray-200">bouncy balls</h2>
              <p class="text-sm text-gray-400 mb-3">click on canvas to add more balls.</p>
              <div class="w-full" style="min-height: 320px;">
                <CanvasPlayground />
              </div>
            </div>
          </div>
        </div>
        <aside class="lg:col-span-1 lg:sticky lg:top-20 h-max">
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import CanvasPlayground from '@/components/games/CanvasPlayground.vue'

export default {
  components: { CanvasPlayground },
  head() {
    return { title: 'games - canvas playground' }
  }
}
</script>

<style>
</style>


