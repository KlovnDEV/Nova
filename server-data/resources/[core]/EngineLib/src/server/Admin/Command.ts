import { Players } from '../Game';
import { Player } from '../Game/Player';

export type AccessGroup = 'user' | 'admin';
type CommandCallback = { (player: Player, args: any[], rawCommand: string): void };
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
  groups: string[];
  cb: CommandCallback;
  suggestion: CommandSuggestion;
  static RegisteredCommands: Record<string, Command> = {};

  constructor(name: string, groups = ['admin'], cb: CommandCallback) {
    this.name = name;
    this.groups = groups;
    this.cb = cb;
  }

  setSuggestion(suggestion: CommandSuggestion): Command {
    this.suggestion = suggestion;

    return this;
  }

  register(): boolean {
    const alreadyRegistered = Command.RegisteredCommands[this.name] !== undefined;

    Command.RegisteredCommands[this.name] = this;

    RegisterCommand(this.name, (handle: number, args: any[], rawCommand: string) => {
      const player = Players.ByHandle(handle);
      this.cb(player, args, rawCommand);
    }, true);

    this.groups.forEach(group => {
      ExecuteCommand(`add_ace group.${group} command.${this.name} allow`)
    })

    return !alreadyRegistered;
  }
}
