"""VectorShift assessment backend.

Exposes a single meaningful endpoint, /pipelines/parse, which accepts the
nodes and edges of a pipeline built in the frontend and reports:
  - how many nodes it has
  - how many edges it has
  - whether it forms a Directed Acyclic Graph (DAG)
"""

import os
from collections import defaultdict, deque
from typing import Dict, List, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="PipelineForge API", version="1.0.0")

# Setup CORS origins.
# Allow specifying origins via environment variable (comma-separated).
# If ALLOWED_ORIGINS is not set, we default to allowing all origins ("*") for ease of deployment,
# since this is a public assessment without cookies/session credentials.
allowed_origins_env = os.getenv("ALLOWED_ORIGINS", "")
if allowed_origins_env:
    origins = [o.strip() for o in allowed_origins_env.split(",") if o.strip()]
    allow_credentials = True
else:
    origins = ["*"]
    allow_credentials = False

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=allow_credentials,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Schemas
# ---------------------------------------------------------------------------

class PipelineNode(BaseModel):
    id: str
    type: Optional[str] = None
    # Allow anything else (position, data, etc.) to pass through without
    # forcing the frontend to match a rigid schema.
    model_config = {"extra": "allow"}


class PipelineEdge(BaseModel):
    id: Optional[str] = None
    source: str
    target: str
    model_config = {"extra": "allow"}


class Pipeline(BaseModel):
    nodes: List[PipelineNode] = Field(default_factory=list)
    edges: List[PipelineEdge] = Field(default_factory=list)


class PipelineParseResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


# ---------------------------------------------------------------------------
# DAG check (Kahn's algorithm — topological sort via in-degree)
# ---------------------------------------------------------------------------

def is_directed_acyclic_graph(node_ids: List[str], edges: List[PipelineEdge]) -> bool:
    """Returns True if the graph described by node_ids/edges has no cycles.

    Uses Kahn's algorithm: repeatedly remove nodes with in-degree 0. If every
    node can eventually be removed, there's no cycle. If nodes remain stuck
    with in-degree > 0, a cycle exists among them.
    """
    node_id_set = set(node_ids)
    adjacency: Dict[str, List[str]] = defaultdict(list)
    in_degree: Dict[str, int] = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        # Ignore edges that reference nodes we don't know about (defensive;
        # shouldn't normally happen with well-formed input from the canvas).
        if edge.source not in node_id_set or edge.target not in node_id_set:
            continue
        adjacency[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    queue = deque([node_id for node_id in node_ids if in_degree[node_id] == 0])
    visited_count = 0

    while queue:
        current = queue.popleft()
        visited_count += 1
        for neighbor in adjacency[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # If we visited every node, there was no cycle. A single, unconnected
    # node (or an empty graph) is trivially a DAG.
    return visited_count == len(node_ids)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/debug/cors")
def debug_cors() -> Dict:
    return {
        "ALLOWED_ORIGINS_env": os.getenv("ALLOWED_ORIGINS"),
        "origins": origins,
        "allow_credentials": allow_credentials
    }


@app.get("/")
def read_root() -> Dict[str, str]:
    return {"Ping": "Pong"}


@app.post("/pipelines/parse", response_model=PipelineParseResponse)
def parse_pipeline(pipeline: Pipeline) -> PipelineParseResponse:
    node_ids = [node.id for node in pipeline.nodes]
    dag = is_directed_acyclic_graph(node_ids, pipeline.edges)

    return PipelineParseResponse(
        num_nodes=len(pipeline.nodes),
        num_edges=len(pipeline.edges),
        is_dag=dag,
    )
