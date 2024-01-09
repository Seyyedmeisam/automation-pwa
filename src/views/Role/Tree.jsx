import React, { useState } from "react";


const Tree = ({ 
  data, 
  expandedNodes, 
  setExpandedNodes, 
  selectedNode, 
  setSelectedNode,
}) => {
  const toggleNode = (id) => {
    if (expandedNodes.includes(id)) {
      setExpandedNodes(expandedNodes.filter((nodeId) => nodeId !== id));
    } else {
      setExpandedNodes([...expandedNodes, id]);
    }
  };
  const handleCheckboxChange = (id) => {
    
    if (selectedNode === id) {
      setSelectedNode(null);
    } else {
      setSelectedNode(id);
    }
  };

  return (
    <>
      <ul>
        {data.map((node) => (
          <li key={node.id} >
            <input
                type="checkbox"
                checked={node.id === selectedNode}
                onChange={() => handleCheckboxChange(node.id)}
                style={{ marginLeft: "5px" }}
                
              />
            <span
              onClick={() => toggleNode(node.id)}
              style={{ cursor: "pointer", fontWeight: "bold" }}
              className="text-nowrap"
            >
              {node.title}
            </span>

            {node.sub_child && expandedNodes.includes(node.id) && (
              <Tree
                data={node.sub_child}
                expandedNodes={expandedNodes}
                setExpandedNodes={setExpandedNodes}
                selectedNode={selectedNode}
                setSelectedNode={setSelectedNode}
              />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tree;
