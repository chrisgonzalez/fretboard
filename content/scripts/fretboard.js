var note = '<div class="note"></div>';
var fret = '<div class="fret"></div>';
var string = '<div class="string"></div>';
var numfrets = 23;
var numstrings = 6;

var intervals = [
    0,
    5,
    5,
    5,
    4,
    5
]

var chord = [0];


function drawNotes(){
    var rule = '.note, .fret{ width: '+(100/(numfrets))+'% }'
    $("head style").append(rule);

    for(var i=0; i<numfrets; i++){
        var rule = '.note[data-fret="'+i+'"], .fret[data-fret="'+i+'"] { left: '+(i*100/(numfrets))+'% } ';
        $("head style").append(rule);        

        var newfret = $(fret);
        newfret.attr("data-fret", i);
        $(".fretboard").append(newfret);
        
        for(var j=numstrings-1; j>-1; j--){
            var newnote = $(note);
            newnote.attr("data-string", j);
            newnote.attr("data-fret", i);
            $(".fretboard").append(newnote);
        }        
    }

    for(var k=numstrings-1; k>-1; k--){
        var rule = '.note[data-string="'+k+'"], .string[data-string="'+k+'"] { top: '+(numstrings-1-k)*30+'px } ';
        $("head style").append(rule);

        var newstring = $(string);
        newstring.attr("data-string", k);
        $(".fretboard").append(newstring);
    }
}

$(document).ready(function(){
    $("input.chord").val(chord.join(","));

    drawNotes();
    $('.note').removeClass('active');

    $("input.chord").on("change", function(){
        chord = $(this).val().split(",");
        for(var i=0; i<chord.length; i++){
            chord[i] = parseInt(chord[i]);
        }
    })

    $(".fretboard").on("mouseenter mouseleave", ".note", function(e){
        var string = parseInt($(this).attr("data-string"));
        var fret = parseInt($(this).attr("data-fret"));

        $('.note').removeClass('active');

        if(e.type == "mouseenter"){
            
            $(this).addClass("active");
            $(this).attr("data-note", 0);
            
            var map = [];
            var f=0;

            //first make a map for the string you're on
            // for(f=0; f<numfrets+1; f++){
            //     var note = f < fret ? 11+((f-fret) % 11) : f-fret;
            //     note = note % 11;
            //     $('.note[data-string="'+string+'"][data-fret="'+f+'"]').html(note)
            // }

            for(var s=0; s < numstrings; s++){
                var interval = 0;
                
                var diff = -(s-string);

                while(diff !=0){
                    var index = diff < 0 ? string-diff : string-diff+1;
                    interval += diff < 0 ? intervals[index] : 12-intervals[index];
                    // console.log("string: "+s + " interval: "+interval);
                    // console.log("string: "+(string-diff));
                    diff < 0 ? diff++: diff--;
                }

                for(f=0; f<numfrets; f++){
                    var note = f < fret ? 12+((f+interval-fret) % 12) : f+interval-fret;
                    note = note % 12;
                    console.log("string: "+s + " interval: "+interval);
                    $('.note[data-string="'+s+'"][data-fret="'+f+'"]').attr("data-note", note).html(note);
                    for(var i=0; i<chord.length; i++){
                        if (note == chord[i]){
                            $('.note[data-string="'+s+'"][data-fret="'+f+'"]').addClass("active");
                        };    
                    }                       
                }
            }
        }else{
            $('.note').removeClass('active');
            $('.note').html("");
        }
    });
});

/*

octaves: [0,0] [1, 6] [2,1]  [4,4] [6,0] []


*/

