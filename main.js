let sheetUrl = 'content.csv'
sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRRUv6PC5hC4-VXzQy75DBeywJaiQjU7MPGOoZBat9iJCmQo9Pf0nc2nvAFDfRJmP06WHJEls4RgUw6/pub?gid=1535062603&single=true&output=csv'

d3.csv(sheetUrl).then(function(data) {

    delete data['columns'];
    console.table(data);

    data.map(function(d) {d.x = parseFloat(d.x); d.y = parseFloat(d.y)});

    const X = d3.map(data, d=>d.x);
    const Y = d3.map(data, d=>d.y);
    const xDomain = d3.extent(X);
    const yDomain = d3.extent(Y);
    const xScale = d3.scaleLinear(xDomain, [5,80]);
    const yScale = d3.scaleLinear(yDomain, [10,90]);

    const sections = new Set(d3.map(data, d=>d.section));

    let divs = d3.select("#map")
        .selectAll('a')
        .data(data)
        .enter()
        .append('div')
        .classed('map-item', true)

    let anchors = divs
        .append('a')
            .attr('href', d => d.Link)
            .attr('target', '_blank')

    anchors
        .append('div')
        .classed('logo-div', true)
        .append('img')
        .attr('src', d => d.logo);

    anchors
        .append('div')
        .classed('logo-title-divider', true);

    anchors
        .append('div')
        .classed('short-name', true)
        .html(d => d.Label);

    anchors
        .append('div')
        .classed('long-name', true)
        .style('display', 'none')
        .html(d => d.Label);


    let sectionAnchors;
    for (let section of sections) {
        sectionDivs = divs.filter(d => d.section === section);
        $( sectionDivs.nodes() ).appendTo( $(`#${section}`) );
    }


});
