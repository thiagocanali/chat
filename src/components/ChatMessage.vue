<script setup>
import { computed } from 'vue';

const props = defineProps({
  message: {
    type: Object,
    required: true
  }
});

// Define se a mensagem é do usuário ou da IA para mudar a cor e posição
const isUser = computed(() => props.message.role === 'user');
</script>

<template>
  <div 
    class="flex w-full mb-4 animate-fade-in"
    :class="isUser ? 'justify-end' : 'justify-start'"
  >
    <div 
      class="max-w-[80%] p-4 rounded-2xl shadow-sm transition-all"
      :class="isUser 
        ? 'bg-blue-600 text-white rounded-tr-none' 
        : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'"
    >
      <div class="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70">
        {{ isUser ? 'Você' : 'Thiago AI' }}
      </div>
      
      <div class="text-sm leading-relaxed whitespace-pre-wrap">
        {{ message.content }}
      </div>

      <div class="text-[9px] mt-2 opacity-50 text-right italic">
        {{ new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}
</style>