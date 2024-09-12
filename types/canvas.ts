export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}

export type CanvasState =
  | { mode: CanvasMode.None }
  | { mode: CanvasMode.Pressing; origin: Point }
  | { mode: CanvasMode.SelectionNet; origin: Point; current: Point }
  | { mode: CanvasMode.Translating; current: Point }
  | { mode: CanvasMode.Inserting; layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Note | LayerType.Text }
  | { mode: CanvasMode.Resizing; initialBounds: XYWH; corner: Side }
  | { mode: CanvasMode.Pencil }

export type Color = {
  r: number
  b: number
  g: number
}

export type Camera = {
  x: number
  y: number
}

export enum LayerType {
  Rectangle,
  Ellipse,
  Text,
  Path,
  Note,
}

export type RectangleLayer = {
  type: LayerType.Rectangle
  x: number
  y: number
  fill: Color
  width: number
  height: number
  value?: string
}

export type EllipseLayer = {
  type: LayerType.Ellipse
  x: number
  y: number
  fill: Color
  width: number
  height: number
  value?: string
}

export type PathLayer = {
  type: LayerType.Path
  x: number
  y: number
  fill: Color
  width: number
  height: number
  points: number[][]
  value?: string
}

export type TextLayer = {
  type: LayerType.Text
  x: number
  y: number
  fill: Color
  width: number
  height: number
  points: number[][]
  value?: string
}

export type NoteLayer = {
  type: LayerType.Note
  x: number
  y: number
  fill: Color
  width: number
  height: number
  points: number[][]
  value?: string
}

export type Point = {
  x: number
  y: number
}

export type XYWH = {
  x: number
  y: number
  width: number
  height: number
}

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type Layer = RectangleLayer | EllipseLayer | PathLayer | TextLayer | NoteLayer
