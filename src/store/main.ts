import { defineStore } from "pinia";
import { showMessageBox, onMenuAction, openDialog } from "@/electronRenderer";
import {readFile} from "@/services/nodeApi"
import {Menu} from "../types"

export const useMainStore = defineStore("main", {
  state: () => ({ 
    file: {},
  }),
  actions: {
    async openFile() {
      try {
        const response = await openDialog({})
        if (response.canceled) {
          return
        }
        const filePath = response.filePaths && response.filePaths.length && response.filePaths[0];
        if (!filePath) {
          return;
        }
        this.file = await readFile(filePath)
      } catch (error) {
        console.log(error)
      }
    },
  },
});
