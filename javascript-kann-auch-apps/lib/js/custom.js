Reveal.addEventListener('app-downloads-chart', function() {
  var freeSeries = [57.331, 92.876, 127.704, 167.054, 211.313, 253.914],
    paidSeries = [6.654, 9.186, 11.105, 12.574, 13.488, 14.778];

  var chart = new Chartist.Bar('#app-downloads-chart', {
    labels: ['2012', '2013', '2014', '2015', '2016', '2017'],
    series: [freeSeries, paidSeries]
  }, {
    stackBars: true,
    axisX: {
      showGrid: false
    },
    axisY: {
      onlyInteger: false,
      scaleMinSpace: 50
    },
    chartPadding: {
      top: 50,
      right: 60,
      bottom: 50,
      left: 60
    }
  });
  chart.on('draw', function(data) {
    if (data.type === 'bar' && data.index === freeSeries.length - 1) {
      var seriesLabel = '', y = 0, lineX = 0, lineY = 0;
      if (data.seriesIndex === 0) {
        seriesLabel = 'Free';
        y = data.y2 + 50;
        lineX = data.x1 + 30;
        lineY = y - 10;
      } else if (data.seriesIndex === 1) {
        seriesLabel = 'Paid';
        y = data.y1 - 40;
        lineX = data.x1;
        lineY = y + 30;
      }

      data.group.elem('text', {
        x: data.x1 + 62,
        y: y
      }, 'ct-label').text(seriesLabel);

      data.group.elem('line', {
        x1: lineX,
        x2: data.x1 + 57,
        y1: lineY,
        y2: y - 10,
        style: 'stroke-width: 1px; stroke: rgba(0, 0, 0, 0.4);'
      }, 'ct-line');
    }
  });
});

Reveal.addEventListener('hybrid-app-chart', function() {
  createPieChart('hybrid-app-chart', [0.5, 0.5]);
});

Reveal.addEventListener('enterprise-app-store-chart', function() {
  createPieChart('enterprise-app-store-chart', [0.25, 0.75]);
});

Reveal.addEventListener('enterprise-on-the-road-chart', function() {
  createPieChart('enterprise-on-the-road-chart', [0.19, 0.81]);
});

function createPieChart(id, series) {
  var sum = function(a, b) { return a + b; };
  var selector = '#' + id;

  new Chartist.Pie(selector, {series: series}, {
    labelInterpolationFnc: function(value) {
      return Math.round(value / series.reduce(sum) * 100) + '%';
    }
  });
}

Reveal.addEventListener('hybrid-technologies', function() {
  console.log('hybrid-technologies');
  document.querySelector('#hybrid-technologies').classList.remove('extremes');
});
Reveal.addEventListener('fragmentshown', function(event) {
  var fragment = event.fragment;
  if (fragment.classList.contains('hybrid-technology')) {
    if (fragment.classList.contains('native') || fragment.classList.contains('webapp')) {
      document.querySelector('#hybrid-technologies').classList.add('extremes');
    } else {
      document.querySelector('#hybrid-technologies').classList.remove('extremes');
    }
  }
  console.log('fragmentshown', event.fragment, event);
});

var videoNodes = document.querySelectorAll('video');
for (var i = 0; i < videoNodes.length; i += 1) {
  videoNodes.item(i).addEventListener('ended', function(fn) {
    this.pause();
  });
}
