<template>
  <div class="fixed bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-transparent pb-8 pt-10 px-4">
    <div class="max-w-3xl mx-auto relative">
      <textarea
        v-model="text"
        @keydown.enter.prevent="handleSend"
        placeholder="Escreva algo incrível..."
        rows="1"
        class="w-full p-4 pr-14 rounded-2xl border border-slate-200 shadow-xl focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none bg-white transition-all"
      ></textarea>
      
      <button 
        @click="handleSend"
        :disabled="chatStore.isLoading || !text.trim()"
        class="absolute right-3 bottom-3 p-2.5 rounded-xl bg-indigo-600 text-white disabled:bg-slate-200 transition-all shadow-md active:scale-95"
      >
        <Loader2 v-if="chatStore.isLoading" :size="20" class="animate-spin" />
        <SendHorizontal v-else :size="20" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SendHorizontal, Loader2 } from 'lucide-vue-next';
import { useChatStore } from '@/stores/chat';

const chatStore = useChatStore();
const text = ref('');

const handleSend = () => {
  if (text.value.trim() && !chatStore.isLoading) {
    chatStore.sendMessage(text.value);
    text.value = '';
  }
};
</script>