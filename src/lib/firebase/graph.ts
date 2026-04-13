import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import type { Links, Node } from "@/types/Nodes";
import { getFirebaseDB } from "@/lib/firebase/config";

export type GraphData = { nodes: Node[]; links: Links[] };

const db = getFirebaseDB()
const graphDocRef = (uid: string) => doc(db, "users", uid);

export async function fetchGraph(uid: string): Promise<GraphData | null> {
  const snapshot = await getDoc(graphDocRef(uid));
  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();
  if (!data || !data.graph) {
    return null;
  }

  return data.graph as GraphData;
}

export async function saveGraph(uid: string, graph: GraphData): Promise<void> {
  await setDoc(
    graphDocRef(uid),
    { graph, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function ensureSeedGraph(
  uid: string,
  seedGraph: GraphData
): Promise<GraphData> {
  const existing = await fetchGraph(uid);
  if (existing) {
    return existing;
  }

  await saveGraph(uid, seedGraph);
  return seedGraph;
}
