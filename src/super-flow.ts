/*
 * User: CHT
 * Date: 2024/10/8
 * Time: 17:51
**/
import {
  GraphOptions,
  NodeItem,
  LinkItem,
  Coordinate,
  GraphEvent,
  GraphNode,
  GraphLinkOptions,
  GraphLink
} from './index'

import { arrayReplace } from './utils'

export class SuperFlow extends GraphEvent {
  nodeList: GraphNode[] = []
  linkList: GraphLink[] = []
  origin: Coordinate
  mouseOnLink: GraphLink | null = null
  mouseOnNode: GraphNode | null = null
  graphSelected: boolean = false
  maskBoundingClientRect: Record<'top' | 'right' | 'bottom' | 'left', number> = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
  relationMark: string = 'id'
  startMark: string = 'startId'
  endMark: string = 'endId'

  constructor(options: GraphOptions) {
    const {
      relationMark = 'id',
      startMark = 'startId',
      endMark = 'endId',
      nodeList = [],
      linkList = [],
      origin
    } = options

    super()
    this.relationMark = relationMark
    this.startMark = startMark
    this.endMark = endMark
    this.origin = origin
    this.initNode(nodeList)
    this.initLink(linkList)
  }

  pointMap(): Record<string, GraphNode> {
    const map: Record<string, GraphNode> = {}
    this.nodeList.forEach(point => {
      map[ point.id ] = point
    })
    return map
  }

  initNode(nodeList: NodeItem[]) {
    arrayReplace(this.nodeList, nodeList.map(node => this.createNode(node)))
    return this.nodeList
  }

  initLink(linkList: LinkItem[]) {

    const list: GraphLink[] = []

    linkList.forEach(link => {

      const {
        startAt = [ 0, 0 ],
        endAt = [ 0, 0 ],
        meta = null
      } = link

      const pointMap = this.pointMap()
      const startId = link[ this.startMark ] || ''
      const endId = link[ this.endMark ] || ''
      const start: GraphNode | undefined = pointMap[ startId ]
      const end: GraphNode | undefined = pointMap[ endId ]
      if (start && end) {
        list.push(
          this.createLink({
            id: link[ this.relationMark ],
            start,
            end,
            meta,
            startAt,
            endAt
          })
        )
      }
    })

    arrayReplace(this.linkList, list)

    return this.linkList
  }

  createNode(options: Partial<NodeItem>): GraphNode {
    return new GraphNode(options, this)
  }

  createLink(options: GraphLinkOptions): GraphLink {
    return new GraphLink(options, this)
  }

  addNode(options: NodeItem) {
    const node = options.constructor === GraphNode
      ? options
      : this.createNode(options)

    this.nodeList.push(node)
    return node
  }

  addLink(options: GraphLinkOptions) {
    const newLink = options.constructor === GraphLink
      ? options
      : this.createLink(options)

    let currentLink = null
    this.linkList.forEach(item => {
      if (item.start === newLink.start && item.end === newLink.end) {
        currentLink = item
      }
    })

    if (currentLink) {
      currentLink.startAt = newLink.startAt
      currentLink.endAt = newLink.endAt
    } else if (newLink.start && newLink.end) {
      this.linkList.push(newLink)
    }

    return newLink
  }

  removeNode(node: GraphNode) {
    const idx = this.nodeList.indexOf(node)
    this.linkList.filter(link => {
      return link.start === node || link.end === node
    }).forEach(link => {
      this.removeLink(link)
    })

    this.nodeList.splice(idx, 1)

    return node
  }

  removeLink(link: GraphLink) {
    const idx = this.linkList.indexOf(link)
    this.linkList.splice(idx, 1)
    if (this.mouseOnLink === link) {
      this.mouseOnLink = null
    }
    return link
  }

  toLastNode(idx: number) {
    const nodeList = this.nodeList
    nodeList.splice(nodeList.length - 1, 0, ...nodeList.splice(idx, 1))
  }

  toLastLink(idx: number) {
    const linkList = this.linkList
    linkList.splice(linkList.length - 1, 0, ...linkList.splice(idx, 1))
  }

  selectAll() {
    const nodeList = this.nodeList
    const margin = 20

    this.maskBoundingClientRect = {
      top: Math.min(...nodeList.map(node => node.center[ 1 ] - node.height / 2)) - margin,
      right: Math.max(...nodeList.map(node => node.center[ 0 ] + node.width / 2)) + margin,
      bottom: Math.max(...nodeList.map(node => node.center[ 1 ] + node.height / 2)) + margin,
      left: Math.min(...nodeList.map(node => node.center[ 0 ] - node.width / 2)) - margin
    }
    this.graphSelected = true
  }

  toJSON() {
    return {
      origin: this.origin,
      nodeList: this.nodeList.map(node => node.toJSON(this.relationMark)),
      linkList: this.linkList.map(link => link.toJSON(this.relationMark, this.startMark, this.endMark))
    }
  }
}
