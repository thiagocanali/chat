<template>
  <div :class="['flex w-full py-8 justify-center border-b border-slate-100', 
                role === 'assistant' ? 'bg-slate-50/50' : 'bg-white']">
    <div class="flex gap-6 px-4 w-full max-w-3xl">
      <div :class="['w-9 h-9 rounded-lg flex items-center justify-center shrink-0 shadow-sm',
                    role === 'assistant' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-white']">
        <Bot v-if="role === 'assistant'" :size="20" />
        <User v-else :size="20" />
      </div>
      <div class="flex-1">
        <p class="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 font-mono">
          {{ role === 'assistant' ? 'AI Assistant' : 'Thiago Canali' }}
        </p>
        <div class="prose prose-slate max-w-none text-slate-700 text-sm md:text-base" v-html="renderMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Bot, User } from 'lucide-vue-next';
import { computed } from 'vue';
import { marked } from 'marked';

const props = defineProps(['role', 'content']);
const renderMarkdown = computed(() => marked(props.content));
</script>

<style scoped>
:deep(h3) { font-weight: bold; margin-bottom: 0.5rem; }
:deep(p) { margin-bottom: 0.5rem; }
:deep(strong) { color: #4f46e5; }
</style>