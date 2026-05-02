import { Channel, Guild } from "./discord";

export interface CommandAPI {
    Types: {
        OptionTypes: typeof OptionTypes;
        CommandTypes: typeof CommandTypes;
        InputTypes: typeof InputTypes;
        MessageEmbedTypes: typeof MessageEmbedTypes;
    };
    getCommandsByCaller(caller: string): Command[];
    register(caller: string, command: Command): () => void | undefined;
    unregister(caller: string, id: string): void;
    unregisterAll(caller: string): void;
}

export interface BoundCommandAPI extends Omit<
    CommandAPI,
    "getCommandsByCaller" | "register" | "unregister" | "unregisterAll"
> {
    getCommandsByCaller(): Command[];
    register(command: Command): () => void | undefined;
    unregister(id: string): void;
    unregisterAll(): void;
}

export interface Command {
    name: string;
    description?: string;
    id: string;
    options?: Option[];
    execute(
        options: any[],
        { channel, guild }: { channel: Channel; guild?: Guild },
    ): void;
    predicate?(): boolean;
}

export const enum OptionType {
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
    ATTACHMENT = 11,
}

export interface Choice {
    name: string;
    value: string | number;
}

export interface Option {
    description?: string;
    name: string;
    required?: boolean;
    type: OptionType;
    maxLength?: number;
    minLength?: number;
    maxValue?: number;
    minValue?: number;
    choices?: Choice[];
}

export const enum CommandTypes {
    CHAT_INPUT = 1,
    USER = 2,
    MESSAGE = 3,
}

export const enum InputTypes {
    BUILT_IN = 0,
    TEXT = 1,
    SEARCH = 2,
    BOT = 3,
    PLACEHOLDER = 4,
}

export const enum OptionTypes {
    SUB_COMMAND = 1,
    SUB_COMMAND_GROUP = 2,
    STRING = 3,
    INTEGER = 4,
    BOOLEAN = 5,
    USER = 6,
    CHANNEL = 7,
    ROLE = 8,
    MENTIONABLE = 9,
    NUMBER = 10,
    ATTACHMENT = 11,
}

export const enum MessageEmbedTypes {
    IMAGE = "image",
    VIDEO = "video",
    LINK = "link",
    ARTICLE = "article",
    TWEET = "tweet",
    RICH = "rich",
    GIFV = "gifv",
    APPLICATION_NEWS = "application_news",
    AUTO_MODERATION_MESSAGE = "auto_moderation_message",
    AUTO_MODERATION_NOTIFICATION = "auto_moderation_notification",
    TEXT = "text",
    POST_PREVIEW = "post_preview",
    GIFT = "gift",
    SAFETY_POLICY_NOTICE = "safety_policy_notice",
    SAFETY_SYSTEM_NOTIFICATION = "safety_system_notification",
    VOICE_CHANNEL = "voice_channel",
    GAMING_PROFILE = "gaming_profile",
}
