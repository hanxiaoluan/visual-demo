let editor: HTMLElement
let isInEditor = false
let isClickComponent = false

export function setEditor() {
  return editor = document.querySelector('#editor')!
}

export function getEditor() {
  return editor || setEditor()
}

export function setInEditorStatus (status: boolean) {
  isInEditor = status
}

export function getInEditorStatus ():boolean {
  return isInEditor
}

export function setIsClickComponent (status: boolean) {
  isClickComponent = status
}

export function getIsClickComponent() {
  return isClickComponent
}