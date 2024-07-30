/*
 * User: CHT
 * Date: 2024/7/30
 * Time: 下午6:30
**/
type Coordinate = [number, number]

interface NodeOptions {
  width: number
  height: number
  coordinate: Coordinate
  info?: Record<string, any>
}

interface LineOptions {
}
