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

export const languagesMap = [
  { label: "APL", value: "apl", iconPath: "assets/icons/file_type_apl.svg", codemirror: StreamLanguage.define(apl) },
  { label: "ASCII Armor", value: "asciiArmor", iconPath: "assets/icons/default_file.svg", codemirror: StreamLanguage.define(asciiArmor) },
  { label: "ASN.1", value: "asn1", iconPath: "assets/icons/default_file.svg", codemirror: StreamLanguage.define(asn1({})) },
  { label: "Asteriks", value: "asteriks", iconPath: "assets/icons/default_file.svg", codemirror: StreamLanguage.define(asterisk) },
  { label: "Brainfuck", value: "brainfuck", iconPath: "assets/icons/default_file.svg", codemirror: StreamLanguage.define(brainfuck) },
  { label: "C", value: "c", iconPath: "assets/icons/file_type_c3.svg", codemirror: StreamLanguage.define(c) },
  { label: "Ceylon", value: "ceylon", iconPath: "assets/icons/file_type_ceylon.svg", codemirror: StreamLanguage.define(ceylon) },
  { label: "C++", value: "c++", iconPath: "assets/icons/file_type_cpp3.svg", codemirror: StreamLanguage.define(cpp) },
  { label: "C#", value: "c#", iconPath: "assets/icons/file_type_csharp2.svg", codemirror: StreamLanguage.define(csharp) },
  { label: "Clojure", value: "clojure", iconPath: "assets/icons/file_type_clojure.svg", codemirror: StreamLanguage.define(clojure) },
  { label: "CMake", value: "cmake", iconPath: "assets/icons/file_type_cmake.svg", codemirror: StreamLanguage.define(cmake) },
  { label: "Cobol", value: "cobol", iconPath: "assets/icons/file_type_cobol.svg", codemirror: StreamLanguage.define(cobol) },
  { label: "CoffeeScript", value: "coffeescript", iconPath: "assets/icons/file_type_coffeescript.svg", codemirror: StreamLanguage.define(coffeeScript) },
  { label: "Common LISP", value: "commonLisp", iconPath: "assets/icons/file_type_lisp.svg", codemirror: StreamLanguage.define(commonLisp) },
  { label: "Crystal", value: "crystal", iconPath: "assets/icons/default_file.svg", codemirror: StreamLanguage.define(crystal) },
  { label: "CSS", value: "css", iconPath: "assets/icons/file_type_css.svg", codemirror: StreamLanguage.define(css) },
  { label: "GSS", value: "gss", iconPath: "assets/icons/default_file.svg", codemirror: StreamLanguage.define(gss) },
  { label: "Less", value: "less", iconPath: "assets/icons/file_type_less.svg", codemirror: StreamLanguage.define(less) },
  { label: "Sass", value: "sass", iconPath: "assets/icons/file_type_scss.svg", codemirror: StreamLanguage.define(sCSS) },

  { label: "JavaScript", value: "javascript", iconPath: "assets/icons/file_type_js.svg", codemirror: StreamLanguage.define(javascript) },
  { label: "TypeScript", value: "typescript", iconPath: "assets/icons/file_type_typescript.svg", codemirror: StreamLanguage.define(typescript) },
  { label: "Python", value: "python", iconPath: "assets/icons/file_type_python.svg", codemirror: python() },
  {
    label: "Html",
    value: "html",
    iconPath: "assets/icons/file_type_html.svg",
    codemirror: html({ autoCloseTags: true, selfClosingTags: true, matchClosingTags: true }),
  },
  { label: "Json", value: "json", iconPath: "assets/icons/file_type_json.svg", codemirror: StreamLanguage.define(json) },
  { label: "Markdown", value: "markdown", iconPath: "assets/icons/file_type_markdown.svg", codemirror: markdown({ codeLanguages: languages }) },
];

export enum Language {
  c = 'c',
  cpp = 'c++',
  css = 'css',
  javascript = 'javascript',
  json = 'json',
  html = 'html',
  markdown = 'markdown',
  typescript = 'typescript',
}


export const list: Array<Language> = [
  Language.c, Language.cpp, Language.css, Language.javascript, Language.json, Language.html, Language.markdown, Language.typescript
]

export const labelMap = {
  [Language.c]: 'C',
  [Language.cpp]: 'C++',
  [Language.css]: 'CSS',
  [Language.javascript]: 'JavaScript',
  [Language.json]: 'JSON',
  [Language.html]: 'HTML',
  [Language.markdown]: 'Markdown',
  [Language.typescript]: 'Typescript',
}

export const toLabel = (language: Language) => labelMap[language] || null


export const iconMap = {
  [Language.c]: 'assets/icons/file_type_c3.svg',
  [Language.cpp]: 'assets/icons/file_type_cpp3.svg',
  [Language.css]: 'assets/icons/file_type_css.svg',
  [Language.javascript]: 'assets/icons/file_type_js.svg',
  [Language.json]: 'assets/icons/file_type_json.svg',
  [Language.html]: 'assets/icons/file_type_html.svg',
  [Language.markdown]: 'assets/icons/file_type_markdown.svg',
  [Language.typescript]: 'assets/icons/file_type_typescript.svg',
}

export const toIcon = (language: Language) => iconMap[language] || null

export const codemirrorMap = {
  [Language.c]: StreamLanguage.define(c),
  [Language.cpp]: StreamLanguage.define(cpp),
  [Language.css]: StreamLanguage.define(css),
  [Language.javascript]: StreamLanguage.define(javascript),
  [Language.json]: StreamLanguage.define(json),
  [Language.html]: html({ autoCloseTags: true, selfClosingTags: true, matchClosingTags: true }),
  [Language.markdown]: markdown({ codeLanguages: languages }),
  [Language.typescript]: StreamLanguage.define(typescript),
}

export const toCodeMirror = (language: Language) => codemirrorMap[language] || null
