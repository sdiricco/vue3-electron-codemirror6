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

/*********************************************************************************/
/* LANGUAGES IMPORTS */
/*********************************************************************************/
import { markdown } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
// import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { html } from "@codemirror/lang-html";
// import { json } from "@codemirror/lang-json"

/*********************************************************************************/
/* LANGUAGES LEGACY IMPORTS */
/*********************************************************************************/
import { StreamLanguage } from "@codemirror/language";

import { apl } from "@codemirror/legacy-modes/mode/apl";
import { asciiArmor } from "@codemirror/legacy-modes/mode/asciiarmor";
import { asn1 } from "@codemirror/legacy-modes/mode/asn1";
import { asterisk } from "@codemirror/legacy-modes/mode/asterisk";
import { brainfuck } from "@codemirror/legacy-modes/mode/brainfuck";
import { c, ceylon, clike, cpp, csharp } from "@codemirror/legacy-modes/mode/clike";
import { clojure } from "@codemirror/legacy-modes/mode/clojure";
import { cmake } from "@codemirror/legacy-modes/mode/cmake";
import { cobol } from "@codemirror/legacy-modes/mode/cobol";
import { coffeeScript } from "@codemirror/legacy-modes/mode/coffeescript";
import { commonLisp } from "@codemirror/legacy-modes/mode/commonlisp";
import { crystal } from "@codemirror/legacy-modes/mode/crystal";
import { css, gss, less, sCSS } from "@codemirror/legacy-modes/mode/css";
import { json, javascript, typescript } from "@codemirror/legacy-modes/mode/javascript";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    languages: [
      { label: "APL", iconPath: "assets/icons/file_type_apl.svg", value: StreamLanguage.define(apl) },
      { label: "ASCII Armor", iconPath: "assets/icons/default_file.svg", value: StreamLanguage.define(asciiArmor) },
      { label: "ASN.1", iconPath: "assets/icons/default_file.svg", value: StreamLanguage.define(asn1({})) },
      { label: "Asteriks", iconPath: "assets/icons/default_file.svg", value: StreamLanguage.define(asterisk) },
      { label: "Brainfuck", iconPath: "assets/icons/default_file.svg", value: StreamLanguage.define(brainfuck) },
      { label: "C", iconPath: "assets/icons/file_type_c3.svg", value: StreamLanguage.define(c) },
      { label: "Ceylon", iconPath: "assets/icons/file_type_ceylon.svg", value: StreamLanguage.define(ceylon) },
      { label: "C++", iconPath: "assets/icons/file_type_cpp3.svg", value: StreamLanguage.define(cpp) },
      { label: "C#", iconPath: "assets/icons/file_type_csharp2.svg", value: StreamLanguage.define(csharp) },
      { label: "Clojure", iconPath: "assets/icons/file_type_clojure.svg", value: StreamLanguage.define(clojure) },
      { label: "CMake", iconPath: "assets/icons/file_type_cmake.svg", value: StreamLanguage.define(cmake) },
      { label: "Cobol", iconPath: "assets/icons/file_type_cobol.svg", value: StreamLanguage.define(cobol) },
      { label: "CoffeeScript", iconPath: "assets/icons/file_type_coffeescript.svg", value: StreamLanguage.define(coffeeScript) },
      { label: "Common LISP", iconPath: "assets/icons/file_type_lisp.svg", value: StreamLanguage.define(commonLisp) },
      { label: "Crystal", iconPath: "assets/icons/default_file.svg", value: StreamLanguage.define(crystal) },
      { label: "CSS", iconPath: "assets/icons/file_type_css.svg", value: StreamLanguage.define(css) },
      { label: "GSS", iconPath: "assets/icons/default_file.svg", value: StreamLanguage.define(gss) },
      { label: "Less", iconPath: "assets/icons/file_type_less.svg", value: StreamLanguage.define(less) },
      { label: "Sass", iconPath: "assets/icons/file_type_scss.svg", value: StreamLanguage.define(sCSS) },

      { label: "JavaScript", iconPath: "assets/icons/file_type_js.svg", value: StreamLanguage.define(javascript) },
      { label: "TypeScript", iconPath: "assets/icons/file_type_typescript.svg", value: StreamLanguage.define(typescript) },
      { label: "Python", iconPath: "assets/icons/file_type_python.svg", value: python() },
      { label: "Html", iconPath: "assets/icons/file_type_html.svg", value: html({ autoCloseTags: true, selfClosingTags: true, matchClosingTags: true }) },
      { label: "Json", iconPath: "assets/icons/file_type_json.svg", value: StreamLanguage.define(json) },
      { label: "Markdown", iconPath: "assets/icons/file_type_markdown.svg", value: markdown({ codeLanguages: languages }) },
    ],
    selectedLanguage: { label: "JavaScript", iconPath: "assets/icons/file_type_js.svg", value: StreamLanguage.define(javascript) },

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
