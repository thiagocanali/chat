<template>
  <div class="min-h-screen bg-white">
    <header class="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 p-4">
      <div class="max-w-3xl mx-auto flex justify-between items-center">
        <span class="font-bold text-slate-800 text-lg">Thiago Canali <span class="text-indigo-600">AI</span></span>
        <button @click="chatStore.clearChat" class="text-xs text-slate-400 hover:text-red-500 transition-colors uppercase font-bold tracking-widest">
          Limpar Chat
        </button>
      </div>
    </header>

    <main class="pb-40" ref="scrollContainer">
      <div v-if="chatStore.messages.length > 0">
        <ChatMessage 
          v-for="msg in chatStore.messages" 
          :key="msg.id"
          :role="msg.role"
          :content="msg.content"
        />
      </div>
      <div v-else class="h-[70vh] flex flex-col items-center justify-center text-center px-4 animate-fade-in">
        <div class="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-6">
          <BotIcon :size="32" />
        </div>
        <h1 class="text-3xl font-bold text-slate-900 mb-2">Interface Inteligente</h1>
        <p class="text-slate-500 max-w-sm">Explore o poder do chat. Envie uma mensagem para testar a renderização em Markdown. <br> Nota: Por ser uma versão de demonstração gratuita, pode haver um breve intervalo entre as respostas.</p>
      </div>
    </main>

    <ChatInput />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import { useChatStore } from '@/stores/chat';
import { Bot as BotIcon } from 'lucide-vue-next';
import ChatMessage from '@/components/ChatMessage.vue';
import ChatInput from '@/components/ChatInput.vue';

const chatStore = useChatStore();
const scrollContainer = ref(null);

// Auto-scroll sempre que houver mensagem nova
watch(() => chatStore.messages.length, async () => {
  await nextTick();
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});
</script>