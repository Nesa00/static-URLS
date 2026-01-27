
class LinksGraph {
  constructor(options = {}) {
    this.graphStyle = {
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
        this.data = data.savedUrls;
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

  buildGraphData(data, startLevel = 0) {
    const nodes = [];
    const edges = [];
    const rootId = 'root_links';

    if (startLevel === 0) {
      nodes.push({ id: rootId, label: 'Links', shape: 'circle', color: '#218838', font: { color: '#fff', size: 32 }, size: 60 });
      traverse(data, null, '', 1);
    } else {
      Object.entries(data).forEach(([key, value], idx) => {
        traverse(value, null, key + '_', 1);
      });
    }

    function traverse(obj, parent, prefix, level) {
      if (Array.isArray(obj)) {
        obj.forEach((item, idx) => {
          const thisId = prefix + 'l' + idx + '_' + Math.random().toString(36).substr(2, 5);
          nodes.push({
            id: thisId,
            label: item.title || item.url,
            shape: 'box',
            color: '#b2ecc0',
            url: item.url,
            hover: item.hover || item.url,
            size: Math.max(12, 36 - level * 8)
          });
          if (parent) edges.push({ from: parent, to: thisId });
        });
      } else if (typeof obj === 'object' && obj !== null) {
        Object.entries(obj).forEach(([key, value], idx) => {
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
          } else if (startLevel === 0) {
            edges.push({ from: rootId, to: thisId });
          }
          traverse(value, thisId, thisId + '_', level + 1);
        });
      }
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

// Initialize the class on page load
window.addEventListener('DOMContentLoaded', () => {
  new LinksGraph();
});

