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

import { c, cpp, csharp } from "@codemirror/legacy-modes/mode/clike";
import { clojure } from "@codemirror/legacy-modes/mode/clojure";
import { cmake } from "@codemirror/legacy-modes/mode/cmake";
import { cobol } from "@codemirror/legacy-modes/mode/cobol";
import { coffeeScript } from "@codemirror/legacy-modes/mode/coffeescript";
import { commonLisp } from "@codemirror/legacy-modes/mode/commonlisp";
import { crystal } from "@codemirror/legacy-modes/mode/crystal";
import { css, gss, less, sCSS } from "@codemirror/legacy-modes/mode/css";
import { json, javascript, typescript } from "@codemirror/legacy-modes/mode/javascript";
import { vue } from "@codemirror/lang-vue";
import { indentOnInput } from "@codemirror/language";

export const languagesMap = [
  { label: "CMake", value: "cmake", iconPath: "assets/icons/file_type_cmake.svg", codemirror: StreamLanguage.define(cmake) },
  { label: "Cobol", value: "cobol", iconPath: "assets/icons/file_type_cobol.svg", codemirror: StreamLanguage.define(cobol) },
  { label: "CoffeeScript", value: "coffeescript", iconPath: "assets/icons/file_type_coffeescript.svg", codemirror: StreamLanguage.define(coffeeScript) },
  { label: "Common LISP", value: "commonLisp", iconPath: "assets/icons/file_type_lisp.svg", codemirror: StreamLanguage.define(commonLisp) },
  { label: "Crystal", value: "crystal", iconPath: "assets/icons/default_file.svg", codemirror: StreamLanguage.define(crystal) },
  { label: "CSS", value: "css", iconPath: "assets/icons/file_type_css.svg", codemirror: StreamLanguage.define(css) },
  { label: "GSS", value: "gss", iconPath: "assets/icons/default_file.svg", codemirror: StreamLanguage.define(gss) },
  { label: "Less", value: "less", iconPath: "assets/icons/file_type_less.svg", codemirror: StreamLanguage.define(less) },
  { label: "Sass", value: "sass", iconPath: "assets/icons/file_type_scss.svg", codemirror: StreamLanguage.define(sCSS) },
];

export enum Language {
  c = "c",
  csharp = "csharp",
  cpp = "c++",
  css = "css",
  clojure = "clojure",
  javascript = "javascript",
  json = "json",
  html = "html",
  markdown = "markdown",
  python = "python",
  typescript = "typescript",
  vue = "vue",
  textPlain = "text/plain",
}

export const list: Array<Language> = [
  Language.c,
  Language.csharp,
  Language.cpp,
  Language.css,
  Language.clojure,
  Language.javascript,
  Language.json,
  Language.html,
  Language.markdown,
  Language.python,
  Language.typescript,
  Language.vue,
  Language.textPlain
];

export const labelMap = {
  [Language.c]: "C",
  [Language.csharp]: "C#",
  [Language.cpp]: "C++",
  [Language.css]: "CSS",
  [Language.clojure]: "Clojure",
  [Language.javascript]: "JavaScript",
  [Language.json]: "JSON",
  [Language.html]: "HTML",
  [Language.markdown]: "Markdown",
  [Language.python]: "Python",
  [Language.typescript]: "Typescript",
  [Language.vue]: "Vue",
  [Language.textPlain]: "Text plain",
};

export const toLabel = (language: Language) => labelMap[language] || null;

export const iconMap = {
  [Language.c]: "assets/icons/file_type_c3.svg",
  [Language.csharp]: "assets/icons/file_type_csharp.svg",
  [Language.cpp]: "assets/icons/file_type_cpp3.svg",
  [Language.css]: "assets/icons/file_type_css.svg",
  [Language.clojure]: "assets/icons/file_type_clojure.svg",
  [Language.javascript]: "assets/icons/file_type_js.svg",
  [Language.json]: "assets/icons/file_type_json.svg",
  [Language.html]: "assets/icons/file_type_html.svg",
  [Language.markdown]: "assets/icons/file_type_markdown.svg",
  [Language.python]: "assets/icons/file_type_python.svg",
  [Language.typescript]: "assets/icons/file_type_typescript.svg",
  [Language.vue]: "assets/icons/file_type_vue.svg",
  [Language.textPlain]: "assets/icons/default_file.svg"
};

export const toIcon = (language: Language) => iconMap[language] || null;

export const codemirrorMap = {
  [Language.c]: StreamLanguage.define(c),
  [Language.csharp]: StreamLanguage.define(csharp),
  [Language.cpp]: StreamLanguage.define(cpp),
  [Language.css]: StreamLanguage.define(css),
  [Language.clojure]: StreamLanguage.define(clojure),
  [Language.javascript]: StreamLanguage.define(javascript),
  [Language.json]: StreamLanguage.define(json),
  [Language.html]: html({ autoCloseTags: true, selfClosingTags: true, matchClosingTags: true }),
  [Language.markdown]: markdown({ codeLanguages: languages }),
  [Language.python]: python(),
  [Language.typescript]: StreamLanguage.define(typescript),
  [Language.vue]: vue(),
  [Language.textPlain]: indentOnInput()
};

export const toCodeMirror = (language: Language) => codemirrorMap[language] || null;
