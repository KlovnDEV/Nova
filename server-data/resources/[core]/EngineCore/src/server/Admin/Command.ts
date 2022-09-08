import { Player } from '@nova/engine-lib/server/Game';

export type AccessGroup = 'user' | 'admin';
type CommandCallback = { (player: Player, ...args: any[]): void };
type CommandSuggestionArg = {
  name: string;
  help: string;
  type: 'any' | 'player' | 'number' | 'string';
  validate?: boolean;
};

export type CommandSuggestion = {
  help: string;
  arguments?: CommandSuggestionArg[];
};

export class Command {
  name: string;
  group: string;
  cb: CommandCallback;
  suggestion: CommandSuggestion;
  static RegisteredCommands: Record<string, Command> = {};

  constructor(name: string, cb: CommandCallback, group = 'admin') {
    this.name = name;
    this.group = group;
    this.cb = cb;
  }

  setSuggestion(suggestion: CommandSuggestion): Command {
    this.suggestion = suggestion;

    return this;
  }

  register(): boolean {
    const alreadyRegistered = Command.RegisteredCommands[this.name] !== undefined;

    Command.RegisteredCommands[this.name] = this;
    return !alreadyRegistered;
  }
}
