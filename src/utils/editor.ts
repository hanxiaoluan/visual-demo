let editor: HTMLElement

export function setEditor() {
  return editor = document.querySelector('#editor')!
}

export function getEditor() {
  return editor || setEditor()
}

