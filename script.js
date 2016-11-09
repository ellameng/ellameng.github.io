function bmr_calculate (age,gender,weight,height) {
  var temp = gender==="male" ? 5 : -161;
  var BMR = (10 * weight)+(6.25 * height)-(5*age)+temp;
  return BMR;
}

function calorie_calculate (activity,bmr) {
  if (activity==1){
    var calorie = bmr*1.2;
  }
  if (activity==2){
    var calorie = bmr*1.375;
  }
  if (activity==3){
    var calorie = bmr*1.55;
  }
  if (activity==4){
    var calorie = bmr*1.725;
  }
  if (activity==5){
    var calorie = bmr*1.9;
  }
  return calorie;
}

function validateForm() {
  var isValid = true;
  $('input').each(function() {
    if ( $(this).val() === '' )
        isValid = false;
  });
  if (isValid){draweverything();}
  else {alert ("Please fill the form completely.");}

}






//$("#info").submit(function(event){
function draweverything(){
  //event.preventDefault();
  var age = $("#age").val();
  var gender = $("#gender").val();
  var c_weight = $("#c_weight").val();
  var g_weight = $("#g_weight").val();
  var height = $("#height").val();
  var activity = $("#activity").val();
  var c_bmr = bmr_calculate(age,gender,c_weight,height);
  var g_bmr = bmr_calculate(age,gender,g_weight,height);
  var c_calorie = calorie_calculate(activity,c_bmr);
  var g_calorie = calorie_calculate(activity,g_bmr);
  // var x1 = 100;
  // var x2 = 500;
  var y1 = Math.min(c_weight,g_weight)*0.95;
  var y2 = Math.max(c_weight,g_weight)*1.05;
  var calorie_gain= $("#foodtablefoot").find("tr").find("td:nth-child(4)").text();
  var calorie_lose=c_calorie;
  var days=calculateDays(c_weight, g_weight,calorie_gain, calorie_lose);

  if (days>0){
    drawlinegraph(c_weight,g_weight,calorie_gain,calorie_lose,days,y1,y2);
  }
  else{
    if (parseFloat(c_weight)>parseFloat(g_weight)) {
      alert ("Hello there! You have exceeded your recommended calories. Please re-choose your food combinations.");
    }else{
      alert ("Hello there! You will have to eat more food to achieve your goal weight.")
    }
  }

};
//});


function drawlinegraph(c_weight,g_weight,calorie_gain,calorie_lose,days,y1,y2){
  c_weight =parseInt(c_weight) ;
  g_weight =parseInt(g_weight) ;

  	//Better to construct options first and then pass it as a parameter
  	var options = {
  		title: {
  			text: "Weight  Control  Prediction"
  		},
                  animationEnabled: true,
      legend:{
        fontFamily:"Serif"
      },

      axisX:{
        title : "Day",
        minimum:0
      },

      axisY:{
        minimum:y1,
        maximum:y2,
        title : "Weight"
      },


  		data: [
  		{
  			type: "spline", //change it to line, area, column, pie, etc
        showInLegend: true,
        legendText: "Goal Weight",
        dataPoints: [
  				{ x: 0, y: g_weight },
  				{ x: days, y: g_weight },

  			]
  		},
  		{
  			type: "spline", //change it to line, area, column, pie, etc
        showInLegend: true,
        legendText: "Current Weight",
        dataPoints: [
  				{ x: 0, y: c_weight },
  				{ x: days, y: g_weight },

  			]
  		}
  		]
  	};

  	$("#chartContainer").CanvasJSChart(options);
    $(".canvasjs-chart-credit").remove();
    calculateDays(c_weight,g_weight,calorie_gain,calorie_lose);


    drawWordCloud();

};

//citation: code from https://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js--cms-22935

// function drawlinegraph1(x1,x2,y1,y2,c_weight,g_weight){
//
// var data = [{
//     "weight": g_weight,
//     "day":x1
//
// }, {
//     "weight": g_weight,
//     "day":x2
// }];
//
// var data2 = [{
//     "weight": c_weight,
//     "day":x1
//
// }, {
//     "weight": g_weight,
//     "day":x2
// }];
//
//
// var vis = d3.select("#visualisation"),
//     WIDTH = 500,
//     HEIGHT = 300,
//     MARGINS = {
//         top: 20,
//         right: 20,
//         bottom: 20,
//         left: 50
//     },
//
//
// xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([x1,x2]),
// yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([y1,y2]),
//
// xAxis = d3.svg.axis()
//     .scale(xScale),
//
// yAxis = d3.svg.axis()
//     .scale(yScale);
//
// vis.append("svg:g")
//     .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
//     .call(xAxis);
//
//
// yAxis = d3.svg.axis()
//     .scale(yScale)
//     .orient("left");
//
// vis.append("svg:g")
//     .attr("transform", "translate(" + (MARGINS.left) + ",0)")
//     .call(yAxis);
//
// var lineGen = d3.svg.line()
//     .x(function(d) {
//       return xScale(d.day);
//     })
//     .y(function(d) {
//       return yScale(d.weight);
//     });
//
// vis.append('svg:path')
//     .attr('d', lineGen(data))
//     .attr('stroke', 'green')
//     .attr('stroke-width', 2)
//     .attr('fill', 'none');
//
// vis.append('svg:path')
//     .attr('d', lineGen(data2))
//     .attr('stroke', 'red')
//     .attr('stroke-width', 2)
//     .attr('fill', 'none');
//
// var lineGen = d3.svg.line()
//     .x(function(d) {
//         return xScale(d.day);
//     })
//     .y(function(d) {
//         return yScale(d.weight);
//     })
//     .interpolate("basis");
//
// }


// $( "#apple" ).hover(
//
//   function() {
//     $( ".hiddeninfo" ).append( $( "<p> Name: Apple; Size: 1 small (4oz); Calories: 80</p>" ) );
//   },
//   function() {
//     $( ".hiddeninfo" ).find( "p:first" ).remove();
//   }
// );

var fooddata = {
  "apple":{"name":"Apple","calorie":"80"},
  "banana":{"name": "Banana","calorie": "101"},
  "grape":{"name": "Grape","calorie": "2"},
  "mango":{"name": "Mango","calorie": "135"},
  "orange":{"name": "Orange","calorie": "71"},
  "pear":{"name": "Pear","calorie": "100"},
  "peach":{"name": "Peach","calorie": "38"},
  "pineapple":{"name": "Pineapple","calorie": "80"},
  "strawberry":{"name": "Strawberry","calorie": "53"},
  "watermelon":{"name": "Watermelon","calorie": "45"},
  "asparagus":{"name": "Asparagus","calorie": "36"},
  "tofu":{"name": "Tofu","calorie": "81"},
  "broccoli":{"name": "Broccoli","calorie": "40"},
  "carrot":{"name": "Carrots","calorie": "45"},
  "cucumber":{"name": "Carrots","calorie": "45"},
  "eggplant":{"name": "Eggplant","calorie": "38"},
  "lettuce":{"name": "Lettuce","calorie": "7"},
  "tomato":{"name": "Tomato","calorie": "29"},
  "steak":{"name": "Steak","calorie": "120"},
  "chicken":{"name": "Chicken","calorie": "95"},
  "egg":{"name": "Egg","calorie": "79"},
  "fish":{"name": "Fish","calorie": "80"},
  "pork":{"name": "Pork","calorie": "130"},
  "shrimp":{"name": "Shrimp","calorie": "70"},
  "bread":{"name": "Bread","calorie": "75"},
  "butter":{"name": "Butter","calorie": "102"},
  "salad":{"name": "Caesar salad","calorie": "360"},
  "cheeseburger":{"name": "Cheeseburger","calorie": "360"},
  "chocolate":{"name": "Chocolate","calorie": "150"},
  "corn":{  "name": "Corn","calorie": "140"},
  "hamburger":{"name": "Hamburger","calorie": "280"},
  "pizza":{"name": "Pizza","calorie": "180"},
  "potato":{"name": "Potato","calorie": "120"},
  "rice":{"name": "Rice","calorie": "225"},
  "sandwich":{"name": "Sandwich","calorie": "310"},
  "beer":{"name": "Beer","calorie": "150"},
  "coke":{"name": "Coke","calorie": "97"},
  "diet_coke":{"name": "Diet Coke","calorie": "3"},
  "whole_milk":{"name": "Whole Milk","calorie": "150"},
  "2p_milk":{"name": "Low fat Milk","calorie": "121"},
  "juice":{"name": "Juice","calorie": "115"},
  "yogurt":{"name": "Yogurt","calorie": "200"},
}


var exercisedata = {
  "golf":{"name": "Golf","calorie": "260"},
  "walk":{"name": "Walk","calorie": "300"},
  "kayaking":{"name": "Kayaking","calorie": "370"},
  "baseball":{"name": "Baseball","calorie": "370"},
  "swimming":{"name": "Swimming","calorie": "440"},
  "tennis":{"name": "Tennis","calorie": "520"},
  "running":{"name": "Running","calorie": "600"},
  "bicycling":{"name": "Bicycling","calorie": "600"},
  "football":{"name": "Football","calorie": "600"},
  "basketball":{"name": "Basketball","calorie": "600"},
  "soccer":{"name": "Soccer","calorie": "600"},
}

$(function(){
    $.each(fooddata, function(key,value){
        $("#"+key).hover(
            (function(name,calorie){
                return function() {
                    $("#foodmsg").remove();
                    $( "#hiddeninfo" ).append( $( "<p id='foodmsg'>Name:"+name+";  Calorie:"+calorie+"</p>" ) );
                }
            })(value.name,value.calorie),
            (function(){
                return function() {
                    $( "#hiddeninfo" ).find( "p:first" ).remove();
                    $( "#hiddeninfo" ).append( $( "<p id='foodmsg'></p>" ) );
                }
            })()
        );
    });
});



$(function(){
    $.each(fooddata, function(key,value){
        $("#"+key).click(
            (function(key,name,calorie){
                return function() {
                  if($("#"+key+"tr").length){
                    var temp=$( "#"+key+"tr" ).find("td:nth-child(3)").html();
                    var temp=parseInt(temp)+1;
                    var calorie_temp=temp * parseInt(calorie);

                    $( "#"+key+"tr"  ).find("td:nth-child(3)").html(temp);
                    $( "#"+key+"tr"  ).find("td:nth-child(4)").html(calorie_temp);
                  }
                  else{
                    $( "#foodtablebody" ).append( $( "<tr id='"+key+"tr'><td>"+name+"</td><td>"+calorie+"</td><td>1</td><td class='foodtotalcal'>"+calorie+"</td><td><button id='delete"+key+"' onclick='removethisrow(\""+key+"tr\")'>Delete</button></td></tr>" ) );
                  }

                  calculateSum();


                }

            })(key,value.name,value.calorie)
        );
    });
});



//table sum
function calculateSum() {
  var sum=0;
  $(".foodtotalcal").each(function() {

        var value = $(this).text();
        // add only if the value is number
        if(!isNaN(value) && value.length != 0) {
            sum += parseFloat(value);
        };

  });
  $("#foodtablefoot").find("tr").find("td:nth-child(4)").text(sum);

};
//http://www.mayoclinic.org/healthy-lifestyle/weight-loss/in-depth/calories/art-20048065
function calculateDays(c_weight, g_weight,calorie_gain, calorie_lose){
  var days = (g_weight- c_weight)/(((calorie_gain-calorie_lose)/3500)*0.45);
  console.log(days);
  return days;


};



//word cloud

//http://bl.ocks.org/ericcoopey/6382449
function drawWordCloud(){
  $(".wordcloud").remove();

  var frequency_list = [];
  $("#foodtablebody").find("tr").each(function() {
    var text = $(this).find("td:first").text();
    var sizeTransfer = d3.scale.linear()
                    .domain([2,1000,5000])
                    .range([10,100,150]);
    var size = parseInt($(this).find("td:nth-child(4)").text());
    var size = sizeTransfer(size);
    frequency_list.push({"text":text,"size":size});
  });
  console.log(frequency_list);
  $.each(frequency_list, function(i){
    console.log(frequency_list[i].text);
  });


  var color = d3.scale.linear()
          .domain([0,1,2,3,4,5,6,10,15,20,100])
          .range(["#ffffff","#fff2e6", "#ffe6cc", "#ffd9b3","#ffcc99", "#ffbf80","#ffb366", "#ff9933", "#ff8c1a","#ff8000", "#e67300","#cc6600"]);

  d3.layout.cloud().size([800, 300])
          .words(frequency_list)
          .rotate(0)
          .fontSize(function(d) { return d.size; })
          .on("end", draw)
          .start();

  function draw(words) {
    console.log(words.length)
      d3.select("body").append("svg")
              .attr("width", 1200)
              .attr("height", 400)
              .attr("class", "wordcloud")
              .append("g")
              // without the transform, words words would get cutoff to the left and top, they would
              // appear outside of the SVG area
              .attr("transform", "translate(320,200)")
              .selectAll("text")
              .data(words)
              .enter().append("text")
              .style("font-size", function(d) { return d.size + "px"; })
              .style("fill", function(d, i) { return color(d.size); })
              .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
              .text(function(d) { return d.text; });
  }

}

function removethisrow(idnum) {
  $("#"+idnum).remove();
  calculateSum();
}
