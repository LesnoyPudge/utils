import { T } from '@lesnoypudge/types-utils-base/namespace';



export type KEY = T.ValueOf<typeof KEY>;

/**
 * Commonly used keyboard keys.
 */
export const KEY = {
    Space: ' ',
    Num0: '0',
    Num1: '1',
    Num2: '2',
    Num3: '3',
    Num4: '4',
    Num5: '5',
    Num6: '6',
    Num7: '7',
    Num8: '8',
    Num9: '9',
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    E: 'E',
    F: 'F',
    G: 'G',
    H: 'H',
    I: 'I',
    J: 'J',
    K: 'K',
    L: 'L',
    M: 'M',
    N: 'M',
    O: 'O',
    P: 'P',
    Q: 'Q',
    R: 'R',
    S: 'S',
    T: 'T',
    U: 'U',
    V: 'V',
    W: 'W',
    X: 'X',
    Y: 'Y',
    Z: 'Z',
    Plus: '+',
    Minus: '-',
    Equal: '=',
    Comma: ',',
    Period: '.',
    Question: '?',
    Slash: '/',

    // non-printable keys
    // https://gitlab.com/nfriend/ts-key-enum

    /**
     * The user agent wasn't able to map the event's virtual keycode to a
     * specific key value.
     * This can happen due to hardware or software constraints, or because of
     * constraints around the platform on which the user agent is running.
     */
    Unidentified: 'Unidentified',

    /** The Alt (Alternative) key. */
    Alt: 'Alt',

    /**
     * The Caps Lock key. Toggles the capital character lock on and
     * off for subsequent input.
     */
    CapsLock: 'CapsLock',

    /**
     * The Control, Ctrl, or Ctl key. Allows
     * typing control characters.
     */
    Control: 'Control',

    /**
     * The Fn (Function modifier) key. Used to allow generating
     * function key (F1–F15, for instance) characters on
     * keyboards without a dedicated function key area. Often handled in
     * hardware so that events aren't generated for this key.
     */
    Fn: 'Fn',

    /**
     * The Meta key. Allows issuing special command inputs. This is
     * the Windows logo key, or the Command or
     * ⌘ key on Mac keyboards.
     */
    Meta: 'Meta',

    /**
     * The NumLock (Number Lock) key. Toggles the numeric keypad
     * between number entry some other mode (often directional arrows).
     */
    NumLock: 'NumLock',

    /**
     * The Scroll Lock key. Toggles between scrolling and cursor
     * movement modes.
     */
    ScrollLock: 'ScrollLock',

    /**
     * The Shift key. Modifies keystrokes to allow typing upper (or
     * other) case letters, and to support typing punctuation and other special
     * characters.
     */
    Shift: 'Shift',

    /**
     * The Enter or ↵ key (sometimes labeled
     * Return).
     */
    Enter: 'Enter',

    /** The Horizontal Tab key, Tab. */
    Tab: 'Tab',

    /** The down arrow key. */
    ArrowDown: 'ArrowDown',

    /** The left arrow key. */
    ArrowLeft: 'ArrowLeft',

    /** The right arrow key. */
    ArrowRight: 'ArrowRight',

    /** The up arrow key. */
    ArrowUp: 'ArrowUp',

    /** The End key. Moves to the end of content. */
    End: 'End',

    /** The Home key. Moves to the start of content. */
    Home: 'Home',

    /**
     * The Page Down (or PgDn) key. Scrolls down or
     * displays the next page of content.
     */
    PageDown: 'PageDown',

    /**
     * The Page Up (or PgUp) key. Scrolls up or displays
     * the previous page of content.
     */
    PageUp: 'PageUp',

    /**
     * The Backspace key. This key is labeled Delete on
     * Mac keyboards.
     */
    Backspace: 'Backspace',

    /** The Delete key, Del. */
    Delete: 'Delete',

    /**
     * The Insert key, Ins. Toggles between inserting and
     * overwriting text.
     */
    Insert: 'Insert',

    /**
     * The Esc (Escape) key. Typically used as an exit, cancel, or
     * "escape this operation" button. Historically, the Escape character was
     * used to signal the start of a special control sequence of characters
     * called an "escape sequence."
     */
    Escape: 'Escape',

    /**
     * The PrintScreen or PrtScr key. Sometimes
     * SnapShot. Captures the screen and prints it or saves it to
     * disk.
     */
    PrintScreen: 'PrintScreen',

    /** The first general-purpose function key, F1. */
    F1: 'F1',

    /** The F2 key. */
    F2: 'F2',

    /** The F3 key. */
    F3: 'F3',

    /** The F4 key. */
    F4: 'F4',

    /** The F5 key. */
    F5: 'F5',

    /** The F6 key. */
    F6: 'F6',

    /** The F7 key. */
    F7: 'F7',

    /** The F8 key. */
    F8: 'F8',

    /** The F9 key. */
    F9: 'F9',

    /** The F10 key. */
    F10: 'F10',

    /** The F11 key. */
    F11: 'F11',

    /** The F12 key. */
    F12: 'F12',

    /** The F13 key. */
    F13: 'F13',

    /** The F14 key. */
    F14: 'F14',

    /** The F15 key. */
    F15: 'F15',

    /** The F16 key. */
    F16: 'F16',

    /** The F17 key. */
    F17: 'F17',

    /** The F18 key. */
    F18: 'F18',

    /** The F19 key. */
    F19: 'F19',

    /** The F20 key. */
    F20: 'F20',
} as const;