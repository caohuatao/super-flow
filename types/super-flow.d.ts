import { GraphOptions, NodeItem, LinkItem, Coordinate, GraphEvent, GraphNode, GraphLinkOptions, GraphLink } from './index';
export declare class SuperFlow extends GraphEvent {
    nodeList: GraphNode[];
    linkList: GraphLink[];
    origin: Coordinate;
    mouseOnLink: GraphLink | null;
    mouseOnNode: GraphNode | null;
    graphSelected: boolean;
    maskBoundingClientRect: Record<'top' | 'right' | 'bottom' | 'left', number>;
    relationMark: string;
    startMark: string;
    endMark: string;
    constructor(options: GraphOptions);
    pointMap(): Record<string, GraphNode>;
    initNode(nodeList: NodeItem[]): GraphNode[];
    initLink(linkList: LinkItem[]): GraphLink[];
    createNode(options: Partial<NodeItem>): GraphNode;
    createLink(options: GraphLinkOptions): GraphLink;
    addNode(options: NodeItem): GraphNode;
    addLink(options: GraphLinkOptions): GraphLink;
    removeNode(node: GraphNode): GraphNode;
    removeLink(link: GraphLink): GraphLink;
    toLastNode(idx: number): void;
    toLastLink(idx: number): void;
    selectAll(): void;
    toJSON(): {
        origin: Coordinate;
        nodeList: {
            [x: string]: any;
            width: number;
            height: number;
            coordinate: Coordinate;
            meta: any;
        }[];
        linkList: {
            [x: string]: any;
            startAt: Coordinate;
            endAt: Coordinate;
            meta: any;
        }[];
    };
}
