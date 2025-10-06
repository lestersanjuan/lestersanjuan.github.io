 <template>
   <div class="pt-6">
     <div class="relative max-w-7xl border-r border-l border-dashed border-gray-700 py-6 mx-auto px-4">
       <div class="grid grid-cols-1">
         <div>
           <h1 class="text-2xl tracking-tight font-extrabold text-gray-200">games</h1>

           <div class="mt-6">
             <div class="p-4 border border-dashed border-gray-700 rounded">
               <h2 class="text-lg font-bold mb-2 text-gray-200">spacee</h2>
               <p class="text-sm text-gray-400 mb-3">arrow keys / wasd to move the placeholder ship. You build the rest.</p>
               <div class="w-full" style="height: calc(100vh - 8rem); min-height: calc(100vh - 8rem);">
                 <Spacee />
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </template>

<script>
 import Spacee from '@/components/games/spacee/Spacee.vue'

export default {
   components: { Spacee },
  head() {
     return { title: 'games - spacee' }
  }
}
</script>

<style>
</style>


