import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useChatStore = defineStore('chat', {
  state: () => ({
    // Mantém o histórico salvo no navegador
    messages: JSON.parse(localStorage.getItem('chat_history')) || [],
    isLoading: false,
  }),
  actions: {
    async sendMessage(content) {
      if (!content.trim()) return;

      const userMsg = { 
        id: uuidv4(), 
        role: 'user', 
        content: content, 
        timestamp: new Date() 
      };
      this.messages.push(userMsg);
      this.saveToLocal();

      this.isLoading = true;

      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        
        // Usando o modelo 2.0 Flash com a URL v1beta que funcionou nos seus testes
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { 
                parts: [{ 
                  text: `Instrução: Você é o assistente do portfólio de Thiago Canali. Responda de forma breve: ${content}` 
                }] 
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1000,
            }
          })
        });

        // Tratamento elegante para o limite de cota
        if (response.status === 429) {
          throw new Error("LIMITE_EXCEDIDO");
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0]) {
          const aiResponse = data.candidates[0].content.parts[0].text;
          
          this.messages.push({
            id: uuidv4(),
            role: 'assistant',
            content: aiResponse,
            timestamp: new Date()
          });
        } else {
          throw new Error("ERRO_RESPOSTA");
        }

      } catch (error) {
        console.error("Erro na integração:", error);
        
        let msgErro = "Desculpe, ocorreu um erro na conexão.";
        if (error.message === "LIMITE_EXCEDIDO") {
          msgErro = "⚠️ **Limite atingido:** O Google limita o uso gratuito. Aguarde 30 segundos e tente novamente!";
        }

        this.messages.push({
          id: uuidv4(),
          role: 'assistant',
          content: msgErro,
          timestamp: new Date()
        });
      } finally {
        this.saveToLocal();
        this.isLoading = false;
      }
    },

    saveToLocal() {
      localStorage.setItem('chat_history', JSON.stringify(this.messages));
    },

    clearChat() {
      if (confirm("Deseja apagar o histórico de mensagens?")) {
        this.messages = [];
        localStorage.removeItem('chat_history');
      }
    }
  }
});