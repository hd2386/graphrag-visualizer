import { useEffect } from "react";
import { forceCollide } from "d3-force";
import { CustomGraphData, CustomNode } from "../models/custom-graph-data";

const NODE_R = 8;

export function useGraphForces(
  graphRef: React.MutableRefObject<any>,
  getNodeSize: (node: CustomNode) => number,
  graphData: CustomGraphData
) {
  useEffect(() => {
    if (!graphRef.current) return;

    graphRef.current.d3Force(
      "collide",
      forceCollide((node: any) => {
        const size = getNodeSize(node as CustomNode);
        return Math.sqrt(size) * NODE_R * 1.5 + 5;
      }).iterations(3)
    );
    graphRef.current.d3Force("charge")?.strength(-180);
    graphRef.current.d3ReheatSimulation();
  }, [graphRef, graphData, getNodeSize]);
}
