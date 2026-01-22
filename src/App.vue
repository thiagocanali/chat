<script setup>
import { onMounted } from 'vue';
import { useChatStore } from './stores/chat';
import ChatWindow from './components/ChatWindow.vue';
import ChatInput from './components/ChatInput.vue';
import Settings from './components/Settings.vue';

const chatStore = useChatStore();

// Garante que o scroll comece no lugar certo ao carregar
onMounted(() => {
  console.log("App carregado. API Key configurada:", !!chatStore.apiKey);
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
    <Settings />

    <div class="max-w-5xl mx-auto h-screen flex flex-col p-4 md:p-6 lg:p-8">
      
      <header class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          
          <div>
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-bold tracking-tight">Thiago AI</h1>
              <span 
                class="w-2.5 h-2.5 rounded-full border border-white shadow-sm"
                :class="chatStore.apiKey ? 'bg-green-500 shadow-green-200 animate-pulse' : 'bg-red-500 shadow-red-200'"
                :title="chatStore.apiKey ? 'API Conectada' : 'Faltando API Key'"
              ></span>
            </div>
            <p class="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Gemini 1.5 Flash
            </p>
          </div>
        </div>

        <button 
          @click="chatStore.clearChat"
          class="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Limpar Chat
        </button>
      </header>

      <main class="flex-1 bg-white rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden flex flex-col relative">
        
        <ChatWindow class="flex-1" />
        
        <div v-if="chatStore.isLoading" class="absolute bottom-24 left-1/2 -translate-x-1/2 z-10">
          <div class="bg-slate-900 text-white text-[10px] px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl border border-slate-700">
            <span class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
            <span class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
            <span class="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            <span class="font-bold tracking-widest uppercase ml-1">Processando</span>
          </div>
        </div>

        <div class="p-4 md:p-6 bg-white border-t border-slate-50">
          <ChatInput />
        </div>
      </main>

      <footer class="mt-6 flex justify-between items-center px-2">
        <p class="text-[10px] text-slate-400 font-medium italic">
          v2.0 • Status: {{ chatStore.apiKey ? 'Pronto para uso' : 'Aguardando configuração' }}
        </p>
        <p class="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
          Thiago Canali &copy; 2026
        </p>
      </footer>
    </div>
  </div>
</template>

<style>
/* Reset básico e melhoria visual */
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* Evita scroll duplo com o chat */
}

/* Scrollbar personalizada para o chat */
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}

/* Animações suaves de entrada */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>