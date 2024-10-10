/*
 * User: CHT
 * Date: 2024/10/8
 * Time: 17:51
**/
export type Coordinate = [ number, number ]
export type EventCallback = (event: DispatchEvent<any>) => boolean | void

export interface DispatchEvent<K extends keyof DocumentEventMap> {
  type: string
  evt: DocumentEventMap[K]
  target?: any
}

export interface LinkItem {
  startAt: Coordinate
  endAt: Coordinate
  meta?: any

  [ key: string ]: any
}

export interface LinkPointList {
  pointList: Coordinate[]
  xList: number[]
  yList: number[]
  minX: number
  maxX: number
  minY: number
  maxY: number
}

export interface NodeItem {
  width: number
  height: number
  coordinate: Coordinate
  meta?: any

  [ key: string ]: any
}

export interface GraphOptions {
  relationMark?: string
  startMark?: string
  endMark?: string
  nodeList: NodeItem[]
  linkList: LinkItem[]
  origin: Coordinate
}

export { vector } from './vector'
export { GraphEvent } from './graph-event'
export { GraphLinkOptions, GraphLink } from './graph-link'
export { GraphNode } from './graph-node'
export { SuperFlow, SuperFlow as default } from './super-flow'
