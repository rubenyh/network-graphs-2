export default function findShortestPath(data, startId, endId) {
  const nodes = data.nodes;
  const links = data.links;

  const adj = new Map();
  nodes.forEach(n => adj.set(n.id, new Set()));
  links.forEach(l => {
    adj.get(l.source)?.add(l.target);
    adj.get(l.target)?.add(l.source);
  });
  const queue = [startId];
  const visited = new Set([startId]);
  const parent = new Map([[startId, null]]);

  while (queue.length) {
    const cur = queue.shift();
    if (cur === endId) break;
    for (const nb of adj.get(cur) || []) {
      if (!visited.has(nb)) {
        visited.add(nb);
        parent.set(nb, cur); 
        queue.push(nb);
      }
    }
  }
  if (!parent.has(endId)) return [];
  const path = [];
  let cur = endId;
  while (cur != null) {
    path.push(cur);
    cur = parent.get(cur);
  }
  return path.reverse();
}
