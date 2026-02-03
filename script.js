const DEFAULT_GRAPH_STYLE = {
      layout: { hierarchical: false },
      nodes: {
        font: { color: '#222', size: 20, face: 'Segoe UI, Arial, sans-serif', strokeWidth: 0 },
        borderWidth: 2,
        borderWidthSelected: 4,
        color: {
          border: '#28a745',
          background: '#b2ecc0',
          highlight: {
            border: '#218838',
            background: '#d9fce1'
          },
          hover: {
            border: '#218838',
            background: '#d9fce1'
          }
        },
        shape: 'dot',
        size: 32,
        shadow: {
          enabled: true,
          color: 'rgba(40,167,69,0.35)',
          size: 18,
          x: 0,
          y: 4
        }
      },
      edges: {
        color: {
          color: '#28a745',
          highlight: '#218838',
          hover: '#218838',
          inherit: false
        },
        width: 2,
        smooth: {
          enabled: true,
          type: 'dynamic'
        },
        length: 60,
        shadow: {
          enabled: true,
          color: 'rgba(40,167,69,0.18)',
          size: 12,
          x: 0,
          y: 2
        },
        selectionWidth: 4,
        hoverWidth: 3
      },
      physics: {
        enabled: true,
        barnesHut: {
          gravitationalConstant: -2000,
          centralGravity: 0.1,
          springLength: 20,
          springConstant: 0.03,
          damping: 0.18, 
          avoidOverlap: 0.5
        }
      },
      interaction: { hover: true, tooltipDelay: 100 }
    };

class LinksGraph {
  constructor(options = {}) {
    this.graphStyle = options.graphStyle ?? DEFAULT_GRAPH_STYLE;
    this.data = null;
    this.startLevel = 0;
    this.levelInput = document.getElementById('levelInput');
    this.graphContainer = document.getElementById('graph');
    this.init();
  }

  init() {
    this.fetchData();
  }

  fetchData() {
    fetch('links.json')
      .then(response => {
        if (!response.ok) throw new Error('Network error');
        return response.json();
      })
      .then(data => {
        this.data = data;
        this.startLevel = this.getStartLevel();
        this.setupLevelInput();
        this.renderGraph();
      })
      .catch(error => {
        if (this.graphContainer) this.graphContainer.textContent = 'Failed to load links.';
        console.error('Error loading links.json:', error);
      });
  }

  setupLevelInput() {
    if (!this.levelInput) return;
    this.levelInput.value = this.startLevel;
    this.levelInput.addEventListener('change', () => {
      const val = Math.max(0, parseInt(this.levelInput.value, 10) || 0);
      this.setStartLevel(val);
      this.startLevel = val;
      this.renderGraph();
    });
  }

  getStartLevel() {
    const stored = localStorage.getItem('startLevel');
    return stored !== null ? parseInt(stored, 10) : 0;
  }

  setStartLevel(val) {
    localStorage.setItem('startLevel', val);
  }

  treeSearch(data, level, nodes, edges, parent = null, prefix = '') {
    if (level < this.startLevel) {
      Object.entries(data).forEach(([key, value], idx) => {
        if (typeof value === 'object' && value !== null) {
          this.treeSearch(value, level + 1, nodes, edges, null, prefix + key + '_');
        }
      });
      return;
    }
      if (typeof data === 'object' && data !== null && data.url) {
        const edgeId = (parent || prefix || 'edge') + '_edge_' + Math.random().toString(36).substr(2, 5);
        nodes.push({
          id: edgeId,
          label: data.title || data.url,
          shape: 'box',
          color: '#b2ecc0',
          url: data.url,
          hover: data.hover || data.url,
          size: 32
        });
        if (parent) {
          edges.push({ from: parent, to: edgeId });
        }
        return;
      }
    Object.entries(data).forEach(([key, value], idx) => {
      const thisId = prefix + 'c' + idx + '_' + Math.random().toString(36).substr(2, 5);
      nodes.push({
        id: thisId,
        label: key,
        shape: 'ellipse',
        color: '#28a745',
        size: Math.max(12, 48 - level * 12)
      });
      if (parent) {
        edges.push({ from: parent, to: thisId });
      }
      if (Array.isArray(value) && value.length > 0 && value.every(item => typeof item === 'object' && item !== null && item.url)) {
        value.forEach((item, idx2) => {
          const leafId = thisId + '_l' + idx2 + '_' + Math.random().toString(36).substr(2, 5);
          nodes.push({
            id: leafId,
            label: item.title || item.url,
            shape: 'box',
            color: '#b2ecc0',
            url: item.url,
            hover: item.hover || item.url,
            size: Math.max(12, 36 - (level + 1) * 8)
          });
          edges.push({ from: thisId, to: leafId });
        });
      } else if (Array.isArray(value)) {
        value.forEach((item, idx2) => {
          if (typeof item === 'object' && item !== null) {
            this.treeSearch(item, level + 1, nodes, edges, thisId, thisId + '_');
          } else {
            const leafId = thisId + '_l' + idx2 + '_' + Math.random().toString(36).substr(2, 5);
            nodes.push({
              id: leafId,
              label: String(item),
              shape: 'box',
              color: '#b2ecc0',
              size: Math.max(12, 36 - (level + 1) * 8)
            });
            edges.push({ from: thisId, to: leafId });
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        this.treeSearch(value, level + 1, nodes, edges, thisId, thisId + '_');
      }
    });
  }


  buildGraphData(data, startLevel = 0) {
    const nodes = [];
    const edges = [];
    if (this.startLevel === 0) {
      const entries = Object.entries(data);
      if (entries.length > 0) {
        const [mainKey, mainValue] = entries[0];
        if (typeof mainValue === 'object' && mainValue !== null && mainValue.url) {
          nodes.push({
            id: 'edge_' + Math.random().toString(36).substr(2, 5),
            label: mainValue.title || mainValue.url,
            shape: 'box',
            color: '#b2ecc0',
            url: mainValue.url,
            hover: mainValue.hover || mainValue.url,
            size: 32
          });
        } else if (Array.isArray(mainValue) && mainValue.length > 0 && mainValue.every(item => typeof item === 'object' && item !== null && item.url)) {
        
          mainValue.forEach((item, idx) => {
            nodes.push({
              id: 'edge_' + idx + '_' + Math.random().toString(36).substr(2, 5),
              label: item.title || item.url,
              shape: 'box',
              color: '#b2ecc0',
              url: item.url,
              hover: item.hover || item.url,
              size: 32
            });
          });
        } else {
          const rootId = 'root_' + Math.random().toString(36).substr(2, 5);
          nodes.push({ id: rootId, label: mainKey, shape: 'circle', color: '#218838', font: { color: '#fff', size: 32 }, size: 60 });
          
          if (Array.isArray(mainValue)) {
            mainValue.forEach((item, idx) => {
              if (typeof item === 'object' && item !== null && item.url) {
                
                const edgeId = rootId + '_edge_' + idx + '_' + Math.random().toString(36).substr(2, 5);
                nodes.push({
                  id: edgeId,
                  label: item.title || item.url,
                  shape: 'box',
                  color: '#b2ecc0',
                  url: item.url,
                  hover: item.hover || item.url,
                  size: 28
                });
                edges.push({ from: rootId, to: edgeId });
              } else if (typeof item === 'object' && item !== null) {
                
                this.treeSearch(item, 1, nodes, edges, rootId, mainKey + '_');
              }
            });
          } else if (typeof mainValue === 'object' && mainValue !== null) {
            Object.entries(mainValue).forEach(([key, value], idx) => {
              if (typeof value === 'object' && value !== null && value.url) {
                
                const edgeId = rootId + '_edge_' + idx + '_' + Math.random().toString(36).substr(2, 5);
                nodes.push({
                  id: edgeId,
                  label: value.title || value.url,
                  shape: 'box',
                  color: '#b2ecc0',
                  url: value.url,
                  hover: value.hover || value.url,
                  size: 28
                });
                edges.push({ from: rootId, to: edgeId });
              } else {
                this.treeSearch({ [key]: value }, 1, nodes, edges, rootId, mainKey + '_');
              }
            });
          }
        }
      }
    } else {
      const collectLevelNodes = (obj, level, prefix = '') => {
        if (level < this.startLevel) {
          let result = [];
          Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
              result = result.concat(collectLevelNodes(value, level + 1, prefix + key + '_'));
            }
          });
          return result;
        } else if (level === this.startLevel) {
          return Object.entries(obj).map(([key, value], idx) => ({ key, value, prefix: prefix + key + '_' }));
        } else {
          return [];
        }
      };
      const levelNodes = collectLevelNodes(data, 0);
      levelNodes.forEach(({ key, value, prefix }, idx) => {
        const branchRootId = prefix + 'root_' + Math.random().toString(36).substr(2, 5);
        nodes.push({
          id: branchRootId,
          label: key,
          shape: 'circle',
          color: '#218838',
          font: { color: '#fff', size: 32 },
          size: 48
        });
        if (Array.isArray(value)) {
          value.forEach((item, idx2) => {
            if (typeof item === 'object' && item !== null && item.url) {
              const edgeId = branchRootId + '_edge_' + idx2 + '_' + Math.random().toString(36).substr(2, 5);
              nodes.push({
                id: edgeId,
                label: item.title || item.url,
                shape: 'box',
                color: '#b2ecc0',
                url: item.url,
                hover: item.hover || item.url,
                size: 28
              });
              edges.push({ from: branchRootId, to: edgeId });
            } else if (typeof item === 'object' && item !== null) {
              this.treeSearch(item, this.startLevel + 1, nodes, edges, branchRootId, prefix);
            }
          });
        } else if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([k, v], idx2) => {
            if (typeof v === 'object' && v !== null && v.url) {
              const edgeId = branchRootId + '_edge_' + idx2 + '_' + Math.random().toString(36).substr(2, 5);
              nodes.push({
                id: edgeId,
                label: v.title || v.url,
                shape: 'box',
                color: '#b2ecc0',
                url: v.url,
                hover: v.hover || v.url,
                size: 28
              });
              edges.push({ from: branchRootId, to: edgeId });
            } else {
              this.treeSearch({ [k]: v }, this.startLevel + 1, nodes, edges, branchRootId, prefix);
            }
          });
        }
      });
    }
    return { nodes, edges };
  }

  renderGraph() {
    if (!this.graphContainer || !this.data) return;
    const graphData = this.buildGraphData(this.data, this.startLevel);
    const nodes = new vis.DataSet(graphData.nodes);
    const edges = new vis.DataSet(graphData.edges);
    const network = new vis.Network(this.graphContainer, { nodes, edges }, this.graphStyle);
    network.on('click', function (params) {
      if (params.nodes.length > 0) {
        const node = nodes.get(params.nodes[0]);
        if (node.url) {
          window.open(node.url, '_blank');
        }
      }
    });
    network.on('hoverNode', function(params) {
      const node = nodes.get(params.node);
      if (node && (node.hover || node.url)) {
        network.body.container.title = node.hover || node.url;
      }
    });
    network.on('blurNode', function(params) {
      network.body.container.title = '';
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new LinksGraph();
});