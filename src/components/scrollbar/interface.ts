export interface ThumbData {
  ratio: number
  thumbSize: number
  max: number
}
export const DIRECTIONS = ['horizontal', 'vertical'] as const
export type Direction = typeof DIRECTIONS[number]