export function selectText (dom:HTMLElement) {
  const selection = window.getSelection()
  const range = document.createRange()
  range.selectNodeContents(dom)
  selection?.removeAllRanges()
  selection?.addRange(range)
}