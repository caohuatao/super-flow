/*
 * User: CHT
 * Date: 2024/7/30
 * Time: 下午6:03
 **/

export default class SuperNode {
  public width: number
  public height: number
  public coordinate: Coordinate
  public info: Record<string, any>

  constructor(opts: NodeOptions) {
    this.width = opts.width
    this.height = opts.height
    this.coordinate = opts.coordinate
    this.info = opts.info || {}
  }
}
