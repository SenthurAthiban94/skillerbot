var addHrMsg = function(){
    var msg = document.getElementById("msgarea");
    var input = document.getElementById("input");
    var userId = document.getElementById("user-id").innerHTML;
    var image = document.getElementById("image").innerHTML;
    var typing = document.getElementById("typing");

    if(input.value.length > 0 && input.value.trim() != ""){
        var div = document.createElement("div");
        div.innerHTML = '<div style="background: #fff; display:flex; justify-content:flex-end ">' +
        '<h4 class="chat-bubble hr" style="font-weight: 400;">'+ input.value +'</h4>' +
        '</div>'
        msg.appendChild(div);
        var hrs = document.getElementsByClassName('hr');
        var element = hrs[hrs.length-1]; 
        var topPos = element.offsetTop;
        document.getElementById('chatbox').scrollTop = topPos-10;
        typing.classList.remove("display-none-type");
        typing.classList.add("display-flex");
        fetch("/findIntent?q=" + input.value,
        {
            method: 'GET'
        })
        .then(function(response){ 
            
            return response.json(); 
        })
        .then(function(intent){ 
            if(intent.error){
                console.log(intent.error); 
                return;               
            }
            if(intent.intent){
                console.log(intent.intent);
                fetch("/findAnswer?q=" + intent.intent + "&user_id=" + userId,
                {
                    method: 'GET'
                })
                .then(function(response){ return response.json(); })
                .then(function(output){ 
                    if(output.answer){
                        var div1 = document.createElement("div");
                        div1.innerHTML = '<div style="background: #fff; display:flex; ">' +
                                    '<img src='+ image + ' class="mini-dp" />' +
                                    '<h4 class="chat-bubble bot" style="font-weight: 400;"> '+ output.answer  + ' </h4>' +
                            '</div>'
                        typing.classList.remove("display-flex");
                        typing.classList.add("display-none-type");
                        msg.appendChild(div1);
                        var bot = document.getElementsByClassName('bot');
                        var element1 = bot[bot.length-1]; 
                        var topPos1 = element1.offsetTop;
                        document.getElementById('chatbox').scrollTop = topPos1-10;
                        return;
                    }else{
                        typing.classList.remove("display-flex");
                        typing.classList.add("display-none-type");
                        var div1 = document.createElement("div");
                        div1.innerHTML = '<div style="background: #fff; display:flex; ">' +
                                    '<img src='+ image + ' class="mini-dp" />' +
                                    '<h4 class="chat-bubble bot" style="font-weight: 400;">I am still learning. Please ask a better question</h4>' +
                            '</div>'
                        msg.appendChild(div1);
                        var bot = document.getElementsByClassName('bot');
                        var element1 = bot[bot.length-1]; 
                        var topPos1 = element1.offsetTop;
                        document.getElementById('chatbox').scrollTop = topPos1-10;
                        return;
                    }
                });

            }else{
                typing.classList.remove("display-flex");
                typing.classList.add("display-none-type");
                var div1 = document.createElement("div");
                div1.innerHTML = '<div style="background: #fff; display:flex; ">' +
                            '<img src='+ image + ' class="mini-dp" />' +
                            '<h4 class="chat-bubble bot" style="font-weight: 400;">I am still learning. Please ask a better question</h4>' +
                    '</div>'
                msg.appendChild(div1);
                var bot = document.getElementsByClassName('bot');
                var element1 = bot[bot.length-1]; 
                var topPos1 = element1.offsetTop;
                document.getElementById('chatbox').scrollTop = topPos1-10;
                return;
            }
            input.value = "";            
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}



document.getElementById("input").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        addHrMsg();
    }
});