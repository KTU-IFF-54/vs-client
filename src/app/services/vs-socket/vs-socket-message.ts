export interface IVSSocketMessage {
    readonly SenderId: string;
    readonly SenderName: string;
    readonly Action: string;
    readonly Params: {[key: string]: any}
}

export class Actions {
    public static readonly Connected = 'connected';
    public static readonly Join = 'joined';
    public static readonly Left = 'left';

    public static readonly Play = 'play';
    public static readonly Pause = 'pause';
    public static readonly Rewind = 'rewind';
}