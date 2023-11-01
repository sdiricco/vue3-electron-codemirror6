import prettier from "prettier-standalone";

export async function formatFile(text: string) {
    return await prettier.format(text, {
      parser: 'babel',
    });
}
