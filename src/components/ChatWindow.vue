<script setup>
import { ref, onUpdated, watch } from 'vue';
import { useChatStore } from '../stores/chat';
import ChatMessage from './ChatMessage.vue';

const chatStore = useChatStore();
const scrollContainer = ref(null);

// Função para rolar o chat para baixo automaticamente quando chegar mensagem nova
const scrollToBottom = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
  }
};

// Observa mudanças nas mensagens para rolar a tela
watch(() => chatStore.messages.length, () => {
  setTimeout(scrollToBottom, 100);
});
</script>

<template>
  <div 
    ref="scrollContainer"
    class="flex-1 overflow-y-auto p-4 md:p-6 space-y-2 scroll-smooth"
  >
    <div v-if="chatStore.messages.length === 0" class="h-full flex flex-col items-center justify-center text-center p-8">
      <div class="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <h2 class="text-xl font-bold text-slate-800">Como posso ajudar?</h2>
      <p class="text-sm text-slate-500 mt-2 max-w-xs">
        Digite sua pergunta abaixo. Se for sua primeira vez, configure sua <b>API Key</b> no ícone de engrenagem acima.
      </p>
    </div>

    <ChatMessage 
      v-for="msg in chatStore.messages" 
      :key="msg.id" 
      :message="msg" 
    />

    <div class="h-4"></div>
  </div>
</template>