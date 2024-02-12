$(document).ready(function() {
    var delay = ( milliseconds ) => new Promise((resolve) => setTimeout(resolve, milliseconds));
    var level_default = 3;
    var correct = 0;
    var incorrect = 0;
    var previous = [];
    var flag_start = true;
    var flag_check = true
    var level_count = 0
    var items_1 = ['PASSION', 'ETERNITY', 'LIBERTY', 'TRANQUILITY', 'DESTINY', 'FANTASTIC', 'MYNAME', 'DELAY', 'METEOR', 'HAMMER']; 
    var items_2 = ['десница', 'ланиты', 'рамена', 'чресла', 'на бале', 'зерцало', 'забрало', 'ендова', 'светец', 'медоварение']; 
    var items_3 = ['āgnian', 'beadu', 'dryht', 'ēacan', 'flēotan', 'gamol', 'hafola', 'ierfan', 'lēanian', 'māðum']; 
    items_list = [items_1, items_2, items_3]

    async function make_list_of_words(items) {
        // var items = ['PASSION', 'LIBERTY'];
        var randomIndex = Math.floor(Math.random() * items.length);
        level_count++;
            if (randomIndex === 1 || randomIndex === 3 || randomIndex === 5 || randomIndex === 7) {
                if (previous.length > level_default) {
                        var text = previous[previous.length - 1 - level_default + 1] ;
                        previous.push(text);
                        if (text && text.length > 0) {
                            return text.toUpperCase();
                        };
                };
                var text = items[randomIndex];
                previous.push(items[randomIndex]);
                if (text && text.length > 0) {
                    return text.toUpperCase();
                };
            } else {
                var text = items[randomIndex];
                previous.push(items[randomIndex]);
                if (text && text.length > 0) {
                    return text.toUpperCase();
                };
        };
    };

    async function showTextLetterByLetter(text, index = 0) {
        if (index < text.length) {
            $("#prompt").append(text[index++]);
            setTimeout(function() {
                showTextLetterByLetter(text, index);
            }, 15);
        }
    }

    async function n_back(items) {
        level_lenght = 20 + level_default ** 2
        if (level_count === level_lenght) {
            $("#prompt").text('Congrats!');
            var percent = "Percent: " + String(correct / (correct + incorrect) * 100 + "%")
            $("#score").text(percent);
            clearInterval(intervalId);
        } else {
            if (flag_check) {
                check_without_user();
            } else {
                flag_check = true;
            };
            text = await make_list_of_words(items);
            $("#prompt").empty();
            await showTextLetterByLetter(text);
            // $("#prompt").text(text);
            $("#repeat-correct").text(`Correct: ${String(correct)}`);
            $("#repeat-incorrect").text(`Incorrect: ${String(incorrect)}`);
        };
    };
    
    function check() {
        if (previous[previous.length - (level_default + 1)] === previous[previous.length - 1]) {
          correct++;
        } else {
            if (previous.length >= level_default) {
                incorrect ++;
            } else {
                //pass;
            };
        };
    };

    function check_without_user() {
        if (previous.length >= level_default) {
            if (previous[previous.length - (level_default + 1)] === previous[previous.length - 1]) {
                incorrect++;
            };
        };
    };

    $("#start-button").click(function() {
        if (flag_start) {
            var randomItems = Math.floor(Math.random() * items_list.length);
            var items = items_list[randomItems]
            intervalId = setInterval(n_back, 2500, items);
            flag_start = false;
        };
    });

    $("#repeat-button").click(function() {
        if (flag_check) {
            check();
            flag_check = false
        };
    });

    
    $("#reset-button").click(function() {
        clearInterval(intervalId);
        previous = [];
        correct = 0;
        incorrect = 0;
        level_count = 0;
        flag_start = true;
        $("#prompt").text("");
        $("#repeat-correct").text("");
        $("#repeat-incorrect").text("");
    });


    $("#set-level-button").click(function() {
        level_default = parseInt($("#level-input").val());
    });
 });
