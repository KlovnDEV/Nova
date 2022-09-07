import API from 'API';
import { action, computed, observable, makeAutoObservable } from 'mobx';

type ChatSuggestion = {
  name: string;
  help: string;
  params?: ChatSuggestionParam[];
};

type ChatSuggestionParam = {
  name: string;
  help: string;
  type: 'string' | 'number' | 'player' | 'any';
};

type ChatMessage = {
  args: string[];
  color: [r: number, g: number, b: number];
};

type ChatShownType = false | 'input' | 'view' | 'force-hidden';

class ChatStoreProto {
  constructor() {
    makeAutoObservable(this);
  }

  @observable suggestions = (DEVELOPMENT
    ? {
        '/test': {
          help: 'Справка о команде',
          name: '/test',
          params: [
            { help: 'Справка об аргументе 1', name: 'a', type: 'any' },
            { help: 'Справка об аргументе 2', name: 'b', type: 'string' },
          ],
        },
      }
    : {}) as Record<string, ChatSuggestion>;

  @observable messages = [] as ChatMessage[];

  @observable history = [];

  @observable historyIndex;

  @observable command = '';

  @observable prevCommand = '';

  @observable chatShown: ChatShownType = false;

  @observable activeChat = '/me';

  textareaRef;

  showWindowTimer;

  @action setChatShown(value: ChatShownType): void {
    this.chatShown = value;
  }

  @computed get currentArg() {
    return this.command.split(' ').length - 2;
  }

  @action setCommands(data) {
    this.suggestions = data;
  }

  findCommand = (data: string) => {
    const target = data.split(' ')[0].toLowerCase();
    if (data && data.length > 0)
      return Object.entries(this.suggestions)
        .filter(([key]) => key.startsWith(target))
        .map(e => e[1]);
    return [];
  };

  updateWindowTimer = () => {
    if (this.showWindowTimer) clearTimeout(this.showWindowTimer);
    this.showWindowTimer = setTimeout(() => {
      this.close();
    }, 10000);
  };

  @action getMessageHistory = (counter: number) => {
    if (counter > 0) {
      if (this.historyIndex === undefined && this.history.length > 0) {
        this.prevCommand = this.textareaRef.current.value;
        this.historyIndex = 0;
      } else if (this.historyIndex + 1 < this.history.length) {
        this.historyIndex += 1;
      }
    }

    if (counter < 0) {
      if (this.historyIndex > 0) {
        this.historyIndex -= 1;
      } else if (this.historyIndex === 0) {
        this.historyIndex = undefined;
      }
    }

    this.textareaRef.current.value = this.history[this.historyIndex] || this.prevCommand;
  };

  @action clear = () => {
    this.messages = [];
  };

  @action close() {
    this.chatShown = false;
    API.query('chat/result', { canceled: true });
  }
}

const ChatStore = new ChatStoreProto();

export default ChatStore;
