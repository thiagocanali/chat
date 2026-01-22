<template>
  <div class="fixed top-4 right-4 z-50">
    <button @click="isOpen = !isOpen" class="p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 shadow-lg transition-all border-2 border-white">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </button>

    <div v-if="isOpen" class="absolute right-0 mt-3 p-5 bg-white border border-slate-200 shadow-2xl rounded-2xl w-80 animate-fade-in">
      <h3 class="text-sm font-bold text-slate-800 mb-1">Configurações da API</h3>
      <p class="text-[11px] text-slate-500 mb-4">Insira sua chave do Google AI Studio para ativar o chat.</p>
      
      <div class="space-y-3">
        <div>
          <label class="text-[10px] font-bold text-slate-400 uppercase">Sua API Key</label>
          <input 
            v-model="tempKey" 
            type="password" 
            placeholder="AIzaSy..."
            class="w-full mt-1 p-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
        
        <button 
          @click="saveKey" 
          class="w-full bg-blue-600 text-white p-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 active:scale-95 transition-all"
        >
          Salvar Configurações
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useChatStore } from '../stores/chat';

const store = useChatStore();
const isOpen = ref(false);
const tempKey = ref(store.apiKey);

const saveKey = () => {
  if (tempKey.value.trim() === "") {
    alert("Por favor, insira uma chave válida.");
    return;
  }
  store.setApiKey(tempKey.value.trim()); // trim() remove espaços extras
  isOpen.value = false;
  alert("Chave salva com sucesso! Agora você já pode perguntar.");
};
</script>