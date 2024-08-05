/*
 * User: CHT
 * Date: 2024/7/30
 * Time: 下午6:02
 **/

import SuperNode from './super-node'
import SuperLine from './super-line'

export default class SuperFlow {
  public nodeList: SuperNode[] = []
  public lineList: SuperLine[] = []
  public origin: Coordinate = [ 0, 0 ]
  public nodeMap: Map<string, SuperNode> = new Map()

  constructor(options: FlowOptions) {
    this.setOptions(options)
  }

  setOptions(options: FlowOptions) {
    const {nodeList = [], lineList = []} = options
    this.nodeMap.clear()
    this.origin = options.origin || [ 0, 0 ]
    this.nodeList = nodeList.map<SuperNode>(info => {
      const node = new SuperNode(info, this)
      this.nodeMap.set(node.id, node)
      return node
    })
    this.lineList = lineList.map<SuperLine>(info => new SuperLine(info, this))
  }
}
