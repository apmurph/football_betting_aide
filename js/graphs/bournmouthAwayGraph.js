queue()
    .defer(d3.csv, "/data/results-bornmouth-away.csv")
    .await(makeGraphs);
    
function makeGraphs(error, resultsData) {
    var ndx = crossfilter(resultsData);
    
    show_away_form(ndx);
    show_goals_scored(ndx);
    show_goals_conceded(ndx);
    
    dc.renderAll();
}

function show_away_form(ndx) {
    var dim = ndx.dimension(dc.pluck('result'));
    var group = dim.group();
    
    dc.barChart("#bournmouth-away-form")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Away Form")
        .yAxis().ticks(20);
}


function show_goals_scored(ndx) {
    var dim = ndx.dimension(dc.pluck('away_goals'));
    var group = dim.group();
    
    dc.barChart("#bournmouth-away-goals-scored")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Goals Scored")
        .yAxis().ticks(20);
}

function show_goals_conceded(ndx) {
    var dim = ndx.dimension(dc.pluck('home_goals'));
    var group = dim.group();
    
    dc.barChart("#bournmouth-away-goals-conceded")
        .width(400)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Goals Conceded")
        .yAxis().ticks(20);
}