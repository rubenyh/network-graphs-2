'use client'
import React, { useRef, useEffect } from "react"
import * as d3 from "d3"

export default function ForceGraph({ data, width, height, offset = { x: 0, y: 0 }, onNodeClick, showPath = [any], isActive}) {
  const ref = useRef(null)
  const nodeColors = useRef({})

  useEffect(() => {
    if (!ref.current) return
    const svg = d3.select(ref.current)
    svg.selectAll("*").remove()

    const gMain = svg.append("g")
      .attr("class", "pan-group")
      .attr("transform", `translate(${offset.x},${offset.y})`)

    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        gMain.attr("transform", event.transform)
      })

    svg.call(zoom)

    svg.transition()
      .duration(350)
      .call(
        zoom.transform,
        d3.zoomIdentity.translate(offset.x, offset.y)
      )

    const defs = svg.append("defs")
    const gridSize = 50
    const pattern = defs.append("pattern")
      .attr("id", "grid-pattern")
      .attr("width", gridSize)
      .attr("height", gridSize)
      .attr("patternUnits", "userSpaceOnUse")

    pattern.append("path")
      .attr("d", `M ${gridSize} 0 L 0 0 0 ${gridSize}`)
      .attr("fill", "none")
      .attr("stroke", "#A4A3A3")
      .attr("stroke-width", 1)
    const bigSize = Math.max(width, height) * 20
    gMain.append("rect")
      .attr("width", bigSize)
      .attr("height", bigSize)
      .attr("x", -bigSize / 2)
      .attr("y", -bigSize / 2)
      .attr("fill", "url(#grid-pattern)")
    const palette = [
      "#706666", "#998D8D", "#302828", "#845151", "#4C4B70",
      "#7D9277", "#92AC8A", "#774A6D", "#54818B", "#44406C",
      "#5C5A5A", "#A08C86", "#3C2F2F", "#915D5D", "#5A547A",
      "#6C8F6A", "#9DB39B", "#8B5A79", "#507C84", "#555079"
    ]
    const links = data.links.map(d => ({ ...d }))
    const linkCounts = {}
    data.links.forEach(({ source, target }) => {
      linkCounts[source] = (linkCounts[source] || 0) + 1
      linkCounts[target] = (linkCounts[target] || 0) + 1
    })
    const nodes = data.nodes.map(d => ({
      ...d,
      color: (() => {
        if (!nodeColors.current[d.id]) {
          nodeColors.current[d.id] = palette[Math.floor(Math.random() * palette.length)]
        }
        return nodeColors.current[d.id]
      })(),
      degree: linkCounts[d.id] || 0
    }))
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id)
        .distance(d => {
          const r1 = 20 + (linkCounts[d.source.id] || 0) * 8
          const r2 = 20 + (linkCounts[d.target.id] || 0) * 8
          return (r1 + r2) * 1.2
        })
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("collide", d3.forceCollide().radius(d => 25 + d.degree * 15))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
      
     const link = gMain.append("g")
      .attr("stroke", "#000000 ")
      .attr("stroke-opacity", 0.55)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value || 0.1))
      .attr("stroke", (d) => {if(isActive){
      for (let i = 0; i < showPath.length - 1; i++) {
        const a = showPath[i];
        const b = showPath[i + 1];
        if (
          (d.source.id === a && d.target.id === b) ||
          (d.source.id === b && d.target.id === a)
        ) {
          return "#FF0000"; 
        }
      }
      return "#000000";
    }});

      
    const node = gMain.append("g")
      .attr("stroke", "#FFFFFF")
      .attr("stroke-width", 2)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", d => (3.5 + d.degree) * 5)
      .attr("fill", (d) =>
        (showPath.includes(d.id) && isActive)  ? "orange" : d.color
      )
      .on("click", (event, d) => {
        if (typeof onNodeClick === "function" && isActive) {
          onNodeClick(d.id)
        }
      })
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      )
    node.append("title").text(d => d.id)
    const label = gMain.append("g")
      .attr("font-family", "Itim")
      .attr("font-size", 15)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text(d => d.id)
    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `${-width/2} ${-height/2} ${width} ${height}`)
      .style("max-width", "100%")
      .style("height", "100%")

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
      label
        .attr("x", d => d.x)
        .attr("y", d => d.y + (20 + d.degree * 5) + 10)
    })

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }
    function dragged(event) {
      event.subject.fx = event.x
      event.subject.fy = event.y
    }
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }

    return () => simulation.stop()
  }, [data, width, height, offset, showPath, onNodeClick])

  return <svg ref={ref} />
}
