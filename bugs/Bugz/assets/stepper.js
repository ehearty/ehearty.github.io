var min=1;
var max=20;
function createSteppers(){
    $('.stepper').html("<div class='minus'>-</div><div class='plus'>+</div>");
    $.each($('tr'),function(key,value){
           var controller = $(value).attr('controller');
           var option = $(value).attr('option');
           var display = $(value).find('.count');
           var update = function(){
               if (window[controller].options[option]==max || window[controller].options[option]==min){
                   display.css('color','red');
               }
               else{
                   display.css('color','white');
               }
               display.html(window[controller].options[option])
               };
           $(value).find('.minus').click(function(){
                                         if (window[controller].options[option] > min){
                                             window[controller].options[option]--;
                                         }
                                         update();
                                         });
           $(value).find('.plus').click(function(){
                                        if (window[controller].options[option] < max){
                                            window[controller].options[option]++;
                                        }
                                        update();
                                        });
           update();
           });
}