var default_colors = ['#fdbb84','#fee8c8','#e34a33', '#3182bd', '#000000']
//0-4 are greens, 5 is a grey
//var exp_colorscale = ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c', '#bdbdbd']

var cy = cytoscape();

// {name : position} dict
var preset_pos = {};

// {id : position} dict
var id_pos = {};

var scapes = {};

var indra_server_addr = "http://ec2-52-55-90-184.compute-1.amazonaws.com:8080"

// retrieve a JSON from a url
//***************************************
function grabJSON (url) {
  return $.ajax({
    url: url,
  })
}
//***************************************

//build bootstrap-select dropdown using json
//***************************************
function dropdownFromJSON (div_id, ajax_response) {
  $.each(ajax_response, function(name, file) {
       $(div_id).append($('<option/>').attr("value", file).text(name));
    });
  $('.selectpicker').selectpicker('refresh');
}
//***************************************

// get preset_pos for McCormick model
//***************************************
// function to set preset_pos for McCormick model
//***************************************
function setPresetPos () {
  grabJSON("static/preset_pos.json").then(function (ajax_response) {
    preset_pos = ajax_response;
  })
}
//***************************************


//drawCytoscape()
//***************************************

function drawCytoscape (div_id, model_response) {
    var model_dict = model_response;
    console.log(model_dict)
    var exp_colorscale = model_dict.exp_colorscale
    var mut_colorscale = model_dict.mut_colorscale
    var model_elements = model_dict.model_elements


    cy = cytoscape({
      container: document.getElementById(div_id),

      elements: model_elements,

      style: [
        {
          selector: 'node',
          style: {
            'label': 'data(name)',
            'width': '200px',
            'height': '200px',
            'border-width': 7,
            'border-color': default_colors[4],
            'background-color':default_colors[4],
            'background-color': function(node){
              current_colorscale = exp_colorscale;
              if (node.data('mutation') !== 0){
                current_colorscale = mut_colorscale;
              }
              bin_expression = (exp_colorscale.length -1);
              if (node.data('bin_expression') === parseInt(node.data('bin_expression'), 10)){
                bin_expression = node.data('bin_expression');
              }
              else {
                bin_expression = (exp_colorscale.length - 1)
              }
              return current_colorscale[bin_expression]},
            //'background-color': exp_colorscale[5],
            'background-opacity': 1,
            'font-size': '40px',
            'text-halign': 'above',
            'text-valign': 'center',
            'z-index': 2,
            'color': '#FFFFFF',
            'text-outline-color': '#000000',
            'text-outline-width': 5,
            'font-weight': 700,
            'text-wrap': 'wrap',
            'text-max-width': '200px'
          }
        },

        {
          selector: ':parent',
          style: {
            'label': '',
            'background-color': default_colors[1],
            'background-opacity': 1,
            'z-index': 1
          }
        },

        {
          selector: 'edge',
          style: {
          'line-color': default_colors[4],
          'target-arrow-color': default_colors[4],
          //'width': function(edge){ return edge.data('weight')*6},
          'width':13,
          'target-arrow-shape': 'triangle',
          'control-point-step-size': '140px',
          'z-index': 0,
          'curve-style':'bezier'
          },

        },

        {
          selector: '.complex',
          style: {
          'line-color': default_colors[3],
          'target-arrow-color': default_colors[3],
          'source-arrow-color': default_colors[3],
          //'width': '6px',
          'target-arrow-shape': 'circle',
          'source-arrow-shape': 'circle',
          'control-point-step-size': '140px',
          'z-index': 0
        }},

        {  selector: '.negative',
          style: {
          'line-color': default_colors[2],
          'target-arrow-color': default_colors[2],
          'source-arrow-color': default_colors[2],
          //'width': '6px',
          'target-arrow-shape': 'tee',
          'source-arrow-shape': 'none',
          'control-point-step-size': '140px',
          'z-index': 0
        }},

          {  selector: '.Attractor',
          style: {
            'display': 'none',
            //'visibility':'hidden',
            'z-index': 0,
            'curve-style':'bezier'

          }},

          {  selector: '.virtual',
          style: {
            'display': 'none',
            //'visibility':'hidden',
            'z-index': 0,
            'curve-style':'bezier'

          }},

          {  selector: '.nAttractor',
          style: {
            'label': null,
            'width': '1px',
            'height': '1px',
            'padding-left': '1px',
            'padding-right': '1px',
            'display': 'none',
            'z-index': 0

          }},

          {  selector: '.hasMembers',
          style: {
            'width': '200px',
            'height': '200px',
            'content': 'data(name)',
            'pie-size': '100%',
            'border-width': 7,
            'border-color': default_colors[4],
            'background-color':default_colors[4],
            'pie-1-background-size':function(node){
              return node.data().pie_sizes[0]},
            'pie-2-background-size':function(node){
              return node.data().pie_sizes[1]},
            'pie-3-background-size':function(node){
              return node.data().pie_sizes[2]},
            'pie-4-background-size':function(node){
              return node.data().pie_sizes[3]},
            'pie-5-background-size':function(node){
              return node.data().pie_sizes[4]},
            'pie-6-background-size':function(node){
              return node.data().pie_sizes[5]},
            'pie-7-background-size':function(node){
              return node.data().pie_sizes[6]},
            'pie-8-background-size':function(node){
              return node.data().pie_sizes[7]},
            'pie-9-background-size':function(node){
              return node.data().pie_sizes[8]},
            'pie-10-background-size':function(node){
              return node.data().pie_sizes[9]},
            'pie-11-background-size':function(node){
              return node.data().pie_sizes[10]},
            'pie-12-background-size':function(node){
              return node.data().pie_sizes[11]},
            'pie-13-background-size':function(node){
              return node.data().pie_sizes[12]},
            'pie-14-background-size':function(node){
              return node.data().pie_sizes[13]},
            'pie-15-background-size':function(node){
              return node.data().pie_sizes[14]},
            'pie-16-background-size':function(node){
              return node.data().pie_sizes[15]},
            // slice colors according to expression bin
            'pie-1-background-color': function(node){
              return node.data().pie_colors[0]},
            'pie-2-background-color': function(node){
              return node.data().pie_colors[1]},
            'pie-3-background-color': function(node){
              return node.data().pie_colors[2]},
            'pie-4-background-color': function(node){
              return node.data().pie_colors[3]},
            'pie-5-background-color': function(node){
              return node.data().pie_colors[4]},
            'pie-6-background-color': function(node){
              return node.data().pie_colors[5]},
            'pie-7-background-color': function(node){
              return node.data().pie_colors[6]},
            'pie-8-background-color': function(node){
              return node.data().pie_colors[7]},
            'pie-9-background-color': function(node){
              return node.data().pie_colors[8]},
            'pie-10-background-color': function(node){
              return node.data().pie_colors[9]},
            'pie-11-background-color': function(node){
              return node.data().pie_colors[10]},
            'pie-12-background-color': function(node){
              return node.data().pie_colors[11]},
            'pie-13-background-color': function(node){
              return node.data().pie_colors[12]},
            'pie-14-background-color': function(node){
              return node.data().pie_colors[13]},
            'pie-15-background-color': function(node){
              return node.data().pie_colors[14]},
            'pie-16-background-color': function(node){
              return node.data().pie_colors[15]},
          }}],

    });
    cy.startBatch();
    var params = {
      name: 'dagre',
      directed: 'true',
      fit: 'true',
      rankDir: 'TB',
      padding: 0,
      //nodeSep: 50,
      //rankSep: 100,
      //edgeSep: 50,
      //padding: 10,
      edgeWeight: function( edge ){ return edge.data('weight'); }
    };
    // if a prior model has been built, use its positions for layout
    if (Object.keys(preset_pos).length !== 0) {
      cy.nodes().forEach(function(n){
        id_pos[n.id()] = preset_pos[n.data().name]
        // if a node is added and not in preset_pos, set its avg position based
        // on the other nodes it's connected to
        if (id_pos[n.id()] === undefined) {
          var cedges = n.connectedEdges()
        	var cnode_ids = [];
        	cedges.forEach(function(e){
        		if (e.target().id() !== n.id()){
        			cnode_ids.push(e.target().id())
        		}
        		if (e.source().id() !== n.id()){
        			cnode_ids.push(e.source().id())
        		}
        	})
        	var posxs = []
        	var posys = []
        	cnode_ids.forEach(function(i) {
        		if (id_pos[i] !== undefined){
        			posxs.push(id_pos[i]['x'])
        			posys.push(id_pos[i]['y'])
        		}
        	})
        	function getAvgPos(posxs, posys) {
        		var x = posxs.reduce(function (p, c) {
            		return p + c;
          		}) / posxs.length;
        		var y = posys.reduce(function (p, c) {
            		return p + c;
          		}) / posys.length;
        		return ({'x': x, 'y' : y})
        	}
        	preset_pos[n.data().name] = getAvgPos(posxs, posys)
          id_pos[n.id()] = preset_pos[n.data().name]
        }

      })
      console.log(id_pos)
      params = {
        name: 'preset',
        positions: id_pos, // map of (node id) => (position obj); or function(node){ return somPos; }
        zoom: undefined, // the zoom level to set (prob want fit = false if set)
        fit: true, // whether to fit to viewport
        padding: 30, // padding on fit
        animate: false, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        ready: undefined, // callback on layoutready
        stop: undefined, // on layoutstop
      };
    }

    var layout = cy.makeLayout( params );
    layout.run();

    var params = {
      name: 'cola',
      nodeSpacing: 40,
      flow: { axis: 'y', },
      animate: true,
      randomize: false,
      maxSimulationTime: 2000,
      fit: false,
      infinite: false,
      ungrabifyWhileSimulating: false,
      edgeLength: function( edge ){ return edge.data('weight'); },
      // layout event callbacks
      ready: undefined, // on layoutready
      stop: undefined, // on layoutstop
    };
    var layout = cy.makeLayout( params );
    // if (Object.keys(preset_pos).length === 0) {
    //   layout.run();
    // }
    layout.run();


    cy.panzoom();

    cy.endBatch();

    var dragged = false;
    cy.on(('mousedown'),function(){
      //console.log( 'mousedown' );
      layout.stop();
      cy.nodes().on(('drag'), function(){
        dragged = true;
      })
      });
    cy.on(('mouseup'),function(){
      //console.log( 'mouseup' );
      if (dragged === true){
        layout.run();
        dragged = false;
      }
    });
    cy.on(('touchstart'),function(){
      //console.log( 'mousedown' );
      layout.stop();
      cy.nodes().on(('drag'), function(){
        dragged = true;
      })
      });
    cy.on(('touchend'),function(){
      //console.log( 'mouseup' );
      if (dragged === true){
        layout.run();
        dragged = false;
      }
    });

    cy.on(('layoutstop'),function(){
      nds = (cy.json()).elements.nodes
      nds.forEach( function(n) {
        preset_pos[n.data.name] = n.position;
      })
      //cy.center();
    });

    cy.startBatch();

    cy.edges().forEach(function(e){
      if (e.data('i') === 'Complex'){
        e.addClass('complex');
        //console.log(e.data('i'));
      }
      if (e.data('polarity') === 'negative'){
        e.addClass('negative');
        //console.log(e.data('polarity'));
      }
      if (e.data('i') === 'Attractor'){
        e.addClass('Attractor');
        //console.log(e.data('Attractor'));
      }
      if (e.data('i') === 'Virtual'){
        e.addClass('virtual');
        //console.log(e.data('i'));
      }
    });
    cy.nodes().forEach(function(n){
      data = n.data()
      // if the node has members, build pie chart background arrays, qtips
      if (data.hasOwnProperty("members")){
        members = data.members;
          if (Object.keys(members).length > 0){
            fam_length = Object.keys(members).length
            var pie_sizes = new Array(16).fill(0);
            var pie_colors = new Array(16).fill(exp_colorscale[exp_colorscale.length -1]);
            var pie_mutations = new Array(16).fill(0);
            var current_slice = 0;
            var content = []; // stores the
            for (var gene in members) {
              pie_sizes[current_slice] = (100*(1/fam_length));
              if ((members[gene].mutation) === 0){
                pie_colors[current_slice] = exp_colorscale[(members[gene].bin_expression)]
              }
              if ((members[gene].mutation) !== 0){
                pie_colors[current_slice] = mut_colorscale[(members[gene].bin_expression)]
              }
            //console.log(pie_colors);

              pie_mutations[current_slice] = (members[gene].mutation);
              var db_links = [];
              for (var namespace in members[gene]['db_refs']){
                if (namespace !== 'BE'){
                  db_links.push({
                    id: gene,
                    name: namespace,
                    url: members[gene]['db_refs'][namespace]
                  });
                }
              } // for (var namespace ...)


              content.push(db_links);
              current_slice += 1;
          }
          n.data('pie_sizes', pie_sizes);
          n.data('pie_colors', pie_colors);
          n.data('pie_mutations', pie_mutations);

          var list_lines = content.map(function( link ){
          var line = '<b style="font-size:13px">' + String(link[0].id) + '</b>' + ' ' +
                     '<a  style="font-size:11px" target="_blank" href=https://www.citeab.com/search?q="' + link[0].id + '">' +  "CiteAb"  + '</a>&nbsp;' +
                     '<a  style="font-size:11px" target="_blank" href="' + link[0].url + '">' + link[0].name + '</a>&nbsp;' +
                     '<a style="font-size:11px" target="_blank" href="' + link[1].url + '">' + link[1].name  + '</a>';
          return line;
          });

          //console.log(list_lines);


          var content_str = list_lines.map(function( line ){
            return '<li>' + line + '</li>';
          }).join('');
          content_str = '<ul>' + content_str + '</ul>';

          qtip_api_call = {
            content: {
              title: '<b style="font-size:14px">' + n.data().name + '</b>',
              text: content_str
            },
            position: {
              my: 'top center',
              at: 'bottom center'
            },
            style: {
              classes: 'qtip-light',
              tip: {
                width: 16,
                height: 8
              }
            }
          }

          n.data('qtip', qtip_api_call)

          n.addClass('hasMembers');
          //console.log(n.data().qtip);

      }}// member check

      // call out to qtip api if node is not parent
      if (n.isParent() == false){

        if (n.data().qtip){
          tip = n.data().qtip;
          n.qtip(tip);
        }
        else {
          var content_text = [];
          content_text.push(
              {name : "CiteAb", url: "https://www.citeab.com/search?q=" + n.data().name});
          if (data.hasOwnProperty("db_refs")){
            db_refs = data.db_refs;
            for (var namespace in db_refs) {
              content_text.push(
                {name : namespace, url: db_refs[namespace]});

            }

          }

          n.qtip({
            content: {title: '<b style="font-size:14px">' + n.data('name') + '</b>',
              text: content_text.map(function( link ){
                return '<a target="_blank" href="' + link.url + '">' + link.name + '</a>';
              }).join('<br />')
          },

            position: {
              my: 'top center',
              at: 'bottom center'
            },
            style: {
              classes: 'qtip-light',
              tip: {
                width: 16,
                height: 8
              }
            }
          });// n.qtip
        }
      }; // check if n.isParent()

      // if a node is an attractor, tag it with nAttractor class
      if (n.data('name') === 'Attractor'){
        n.addClass('nAttractor');
      }; // if Attractor

      cy.endBatch();
    });
    scapes[div_id] = cy;
}

//***************************************
//
//

//download a model
//***************************************
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
//***************************************

//send text to REACH, get back stmts
//***************************************
function txtReach(txt) {
  var input_txt = {'text':txt}
  console.log(input_txt)
  console.log("converting text to statements via REACH");
  return $.ajax({
                url: indra_server_addr + "/reach/process_text",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(input_txt),
                });
}

// send stmts to grounding mapper, get grounded stmts
//***************************************
function groundingMapper(res) {
  var stmts = res
  return $.ajax({
                url: indra_server_addr + "/preassembly/map_grounding",
                type: "POST",
                dataType: "json",
                data: JSON.stringify(stmts),
                });
}
//***************************************


function assembleCyJS(res) {
  var res_json = res
  res_json['line'] = $('#cellSelectDynamic').val().slice(6,-5)
  console.log(res_json)
  console.log("converting statements to cyjs");
  return $.ajax({
      url: indra_server_addr + "/assemblers/cyjs",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(res_json),
  });
}

function assemblePySB(res) {
  var res_json = res
  res_json['line'] = $('#cellSelectDynamic').val().slice(6,-5)
  console.log(res_json)
  console.log("converting statements to cyjs");
  return $.ajax({
      url: indra_server_addr + "/assemblers/pysb",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(res_json),
  });
}

function assembleLoopy(res) {
  var res_json = res
  res_json['line'] = $('#cellSelectDynamic').val().slice(6,-5)
  console.log(res_json)
  console.log("converting statements to cyjs");
  return $.ajax({
      url: indra_server_addr + "/assemblers/sif/loopy",
      type: "POST",
      dataType: "json",
      data: JSON.stringify(res_json),
  });
}

function loopyFromCyJS(scape) {
  // find all nodes that are not groups
  var ungrouped_nodes = [];
  scapes[scape].nodes().forEach(function(n){
  	if (n.isParent() == false) {
  		ungrouped_nodes.push(n);
  	}
  })
  // find all edges that are not pointing to/from groups
  var ungrouped_edges = [];
  scapes[scape].edges().forEach(function(e){
    var data = e.data();
    var source = data['source'];
    var target = data['target'];
    var ungrouped_node_ids = ungrouped_nodes.map(function(n){return n.id()})
  	if ((ungrouped_node_ids.includes(source)) &&
        (ungrouped_node_ids.includes(target)) &&
        (data['polarity'] !== "none")) {
  		ungrouped_edges.push(e);
  	}
  })
  // make a nodes string
  var nodes_str = ungrouped_nodes.map(function(n){
    // 0 - id
		// 1 - x
		// 2 - y
		// 3 - init value
		// 4 - label
		// 5 - hue
		var x = Math.round(n.position()['x'])
    var y = Math.round(n.position()['y'])
		var loopy_node = [n.id(), x, y, 1, n.data()['name'].replace(' ','%2520'), 1]
    loopy_node = JSON.stringify(loopy_node)
    return loopy_node;
  });
  nodes_str = nodes_str.join();
  nodes_str = '[' + nodes_str + ']'

  var edges_str = ungrouped_edges.map(function(e){
    // 0 - from
		// 1 - to
		// 2 - arc
		// 3 - strength
		// 4 - rotation (optional)
		// var data = e.data();
    var data = e.data();
    var source = data['source'];
    var target = data['target'];
    var strength = 1;
    if (data['polarity'] !== 'positive') {
      strength = -1;
    }

    var loopy_edge = [source, target, 35, strength, 1]
    loopy_edge = JSON.stringify(loopy_edge)
    return loopy_edge;
  });
  edges_str = edges_str.join();
  edges_str = '[' + edges_str + ']'

  var loopy_model_str = '[' + [nodes_str, edges_str].join() + ',[],2%5D';
  return loopy_model_str
}

$(function(){

  var win = $(window);

  // build the dropdown pickers
  grabJSON('static/cell_dict.json').then(
    function(ajax_response){

      var interesting_lines = {"A101D_SKIN":"model_A101D_SKIN.json", "LOXIMVI_SKIN":"model_LOXIMVI_SKIN.json"};
      for (d of ['#cellSelectStatic', '#cellSelectDynamic']) {
          dropdownFromJSON(d, interesting_lines)
          $(d).append($('<option data-divider="true"/>'))
        }

      for (d of ['#cellSelectStatic', '#cellSelectDynamic']) {
          dropdownFromJSON(d, ajax_response)
        }

      }
  )

  // set the preset_pos
  setPresetPos()




  $("#loadButtonDynamic").click(function(){
    var txt = $('#textArea')[0].value

    txtReach(txt).then(groundingMapper).then(assembleCyJS).then(function (model_response) {
      drawCytoscape ('cy_1', model_response)
    });
    // txtReach(txt).then(assembleCyJS).then(function (model_response) {
    //   drawCytoscape ('cy_1', model_response)
    // });
    $('.cyjs2loopy').prop('disabled', false);
    console.log($('#cellSelectDynamic').val().substring(6));
  });

  $("#downloadPySB").click(function(){
    var txt = $('#textArea')[0].value

    txtReach(txt).then(groundingMapper).then(assemblePySB).then(function (res) {
      download($('#cellSelectDynamic').val()+'_PySB.json', JSON.stringify(res, null, 2))
    });
    // txtReach(txt).then(assembleCyJS).then(function (model_response) {
    //   drawCytoscape ('cy_1', model_response)
    // });

    console.log($('#cellSelectDynamic').val().substring(6));
  });


  $("#downloadINDRA").click(function(){
    var txt = $('#textArea')[0].value

    txtReach(txt).then(groundingMapper).then(function (res) {
      download($('#cellSelectDynamic').val()+'_INDRA_stmts.json', JSON.stringify(res, null, 2))
    });
    // txtReach(txt).then(assembleCyJS).then(function (model_response) {
    //   drawCytoscape ('cy_1', model_response)
    // });

    console.log($('#cellSelectDynamic').val().substring(6));
  });

  $("#loopy").click(function(){
    var txt = $('#textArea')[0].value

    txtReach(txt).then(groundingMapper).then(assembleLoopy).then(function (res) {

        window.open(
          res['loopy_url'].toString(),
          "_blank"
        );

    });

    console.log($('#cellSelectDynamic').val().substring(6));
  });


$("#loadButtonStatic").click(function(){

  setPresetPos()

  function getModel() {
    return $.ajax({
      url: 'static/cyjs/' + $('#cellSelectStatic').val(),
    });
  }

  //txtReach(txt).then(groundingMapper).then(assembleCyJS).then(drawCytoscape);
  getModel().then(function (model_response) {
    drawCytoscape ('cy_1', model_response)
  });

  $('.cyjs2loopy').prop('disabled', false);
  console.log($('#cellSelectDynamic').val().substring(6));
});

$(".cyjs2loopy").click(function(){

  var model = loopyFromCyJS("cy_1");
  console.log(model)
  window.open(
    'http://ncase.me/loopy/v1/?data=' + model,
    "_blank"
  );

});

// destroy cy on tab change
// don't really want this
// $('a[data-toggle=tab]').click(function(){
//     cy.destroy();
//     console.log(this.href);
// });

// get all divs of class cy
// get their data-url location
// draw them!
// $('.cy').each(function(){
//     var div_id = $(this).attr('id')
//     console.log(div_id)
//     var data_model = $(this).attr('data-url')
//     console.log(data_model)
//     grabJSON(data_model).then(function (model_response){
//         drawCytoscape(div_id, model_response)
//     })
//     console.log($(this).attr('data-url'))
// })

  function resize() {
    //console.log(win.height(), win.innerHeight());
    $(".cy-container").height(win.innerHeight() - 0);
    //cy.fit();
    //cy.resize();
  }

  setTimeout(resize, 0);

  win.resize(function() {
    resize();
  });

// cy.edges().forEach(function(e){
//   var g = e.data('weight');
//   e.qtip({
//     content: [
//       {
//         name: g,
//         url:  g
//       }
//     ].map(function( link ){
//       return '<a target="_blank" href="' + link.url + '">' + link.name + '</a>';
//     }).join('<br />\n'),
//     position: {
//       my: 'top center',
//       at: 'top center'
//     },
//     style: {
//       classes: 'qtip-blue',
//       tip: {
//         width: 16,
//         height: 8
//       }
//     }
//   });
// });


});// dom ready
