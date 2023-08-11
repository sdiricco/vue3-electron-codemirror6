import { defineStore } from "pinia";

/*********************************************************************************/
/* THEMES IMPORTS */
/*********************************************************************************/
import { oneDark } from "@codemirror/theme-one-dark";
import { basicLight, basicLightHighlightStyle } from "cm6-theme-basic-light";
import { basicDark } from "cm6-theme-basic-dark";
import { solarizedDark } from "cm6-theme-solarized-dark";
import { solarizedLight } from "cm6-theme-solarized-light";
import { materialDark } from "cm6-theme-material-dark";
import { nord } from "cm6-theme-nord";
import { gruvboxLight } from "cm6-theme-gruvbox-light";
import { gruvboxDark } from "cm6-theme-gruvbox-dark";

import {languagesMap} from "@/constants/languages"

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    languages: languagesMap,
    selectedLanguage: languagesMap.find(l => l.value === 'javascript'),

    themes: [
      { label: "oneDark", icon: "pi pi-fw pi-plus", value: oneDark },
      { label: "basicLight", icon: "pi pi-fw pi-plus", value: basicLight },
      { label: "basicDark", icon: "pi pi-fw pi-trash", value: basicDark },
      { label: "solarizedDark", icon: "pi pi-fw pi-trash", value: solarizedDark },
      { label: "solarizedLight", icon: "pi pi-fw pi-trash", value: solarizedLight },
      { label: "materialDark", icon: "pi pi-fw pi-trash", value: materialDark },
      { label: "nord", icon: "pi pi-fw pi-trash", value: nord },
      { label: "gruvboxLight ", icon: "pi pi-fw pi-trash", value: gruvboxLight },
      { label: "gruvboxDark ", icon: "pi pi-fw pi-trash", value: gruvboxDark },
    ],
    selectedTheme: { label: "oneDark", icon: "pi pi-fw pi-plus", value: oneDark },
  }),
});
