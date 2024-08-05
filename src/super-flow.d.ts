/*
 * User: CHT
 * Date: 2024/7/30
 * Time: 下午6:30
**/

type Coordinate = [ number, number ]

interface FlowConfig {
  NODE_ID_KEY: string
}

interface FlowOptions {
  nodeList?: NodeItem[]
  lineList?: LineItem<string>[]
  origin?: Coordinate
}

interface LineItem<T> {
  start: T
  end: T
  startAt: Coordinate
  endAt: Coordinate

  [ key: string ]: any
}

interface NodeItem {
  id: string
  width: number
  height: number
  coordinate: Coordinate

  [ key: string ]: any
}
