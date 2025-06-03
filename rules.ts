import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, window, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "CapsLock -> Ctrl",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "left_control",
          },
        ],
        to_if_alone: [{ key_code: "caps_lock" }],
        type: "basic",
      },
      {
        description: "Tab -> Hyper Key",
        from: {
          key_code: "tab",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "tab",
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    e: {
      j: app("Ghostty"),
      k: app("Zen Browser"),
      h: app("Finder"),
      l: app("Slack"),
      n: app("YouTube Music"),
      comma: app("Visual Studio Code"),
      period: app("DBEaver"),
    },

    // w = "Window"
    w: {
      h: open("-g raycast://extensions/raycast/window-management/left-half"),
      l: open("-g raycast://extensions/raycast/window-management/right-half"),
      j: open("-g raycast://extensions/raycast/window-management/center-half"),
      k: open(
        "-g raycast://extensions/raycast/window-management/almost-maximize"
      ),
      return_or_enter: open(
        "-g raycast://extensions/raycast/window-management/maximize"
      ),
      n: open(
        "-g raycast://extensions/raycast/window-management/first-three-fourths"
      ),
      m: open(
        "-g raycast://extensions/raycast/window-management/last-three-fourths"
      ),
      comma: open(
        "-g raycast://extensions/raycast/window-management/first-fourth"
      ),
      period: open(
        "-g raycast://extensions/raycast/window-management/last-fourth"
      ),
      hyphen: open(
        "-g raycast://extensions/raycast/window-management/make-smaller"
      ),
      equal_sign: open(
        "-g raycast://extensions/raycast/window-management/make-larger"
      ),
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      // Magicmove via homerow.app
      m: {
        to: [{ key_code: "f", modifiers: ["right_control"] }],
        // TODO: Trigger Vim Easymotion when VSCode is focused
      },
      // Scroll mode via homerow.app
      s: {
        to: [{ key_code: "j", modifiers: ["right_control"] }],
      },
      d: {
        to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
      },
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);

