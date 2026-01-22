import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: JSON.parse(localStorage.getItem('chat_history')) || [],
    apiKey: localStorage.getItem('user_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '',
    isLoading: false,
  }),
  actions: {
    setApiKey(key) {
      this.apiKey = key;
      localStorage.setItem('user_api_key', key);
    },
    async sendMessage(content) {
      if (!content.trim()) return;
      
      if (!this.apiKey) {
        this.addAssistantMessage("⚠️ **Configuração necessária:** Insira sua API Key na engrenagem.");
        return;
      }

      this.messages.push({ id: uuidv4(), role: 'user', content, timestamp: new Date() });
      this.saveToLocal();
      this.isLoading = true;

      try {
        // Chamada direta via FETCH para a rota estável V1
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: content }] }]
          })
        });

        const data = await response.json();

        if (response.status === 429) throw new Error("LIMITE_EXCEDIDO");
        if (response.status === 403) throw new Error("CHAVE_INVALIDA");
        if (!response.ok) throw new Error(data.error?.message || "ERRO_DESCONHECIDO");

        if (data.candidates && data.candidates[0]) {
          const text = data.candidates[0].content.parts[0].text;
          this.addAssistantMessage(text);
        }

      } catch (error) {
        console.error("Erro na integração:", error);
        this.handleError(error);
      } finally {
        this.saveToLocal();
        this.isLoading = false;
      }
    },
    addAssistantMessage(content) {
      this.messages.push({ id: uuidv4(), role: 'assistant', content, timestamp: new Date() });
    },
    handleError(error) {
      let msg = "Erro na IA. Verifique sua chave.";
      if (error.message === "LIMITE_EXCEDIDO") msg = "⚠️ **Cota atingida:** Aguarde 60 segundos.";
      if (error.message === "CHAVE_INVALIDA") msg = "⚠️ **Chave Inválida:** Gere uma nova chave no AI Studio.";
      
      this.addAssistantMessage(msg);
    },
    saveToLocal() {
      localStorage.setItem('chat_history', JSON.stringify(this.messages));
    },
    clearChat() {
      if (confirm("Limpar histórico?")) {
        this.messages = [];
        localStorage.removeItem('chat_history');
      }
    }
  }
});