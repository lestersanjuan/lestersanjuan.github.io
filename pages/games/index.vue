<template>
  <div class="pt-6">
    <div class="relative max-w-7xl border-r border-l border-dashed border-gray-700 py-6 mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <h1 class="text-2xl tracking-tight font-extrabold text-gray-200">games</h1>
          <p class="mt-2 max-w-2xl text-sm leading-7 text-gray-400">
            quick canvas playground. edit files under <code class="px-1 bg-gray-800 rounded">components/games</code> to make something fun.
          </p>

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
          <div class="p-4 border border-dashed border-gray-700 rounded">
            <h3 class="text-gray-200 font-bold">how to use</h3>
            <ul class="mt-2 list-disc list-inside text-sm text-gray-400 space-y-1">
              <li>put new experiments in <code class="px-1 bg-gray-800 rounded">components/games/</code></li>
              <li>import and place them on this page</li>
              <li>canvas auto-resizes; keep sidebar sticky for quick play</li>
            </ul>
          </div>
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


