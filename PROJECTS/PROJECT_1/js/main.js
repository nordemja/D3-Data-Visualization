const iceCreamFlavors = ['vanilla', 'chocolate', 'strawberry', 'cookies and cream', 'cookie dough'];
const p = d3.select('body').selectAll('p')
    .data(iceCreamFlavors)
    .enter()
    .append('p')
    .text(d => d);