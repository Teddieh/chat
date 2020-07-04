uhrzeit = document.getElementById("uhrzeit");
input_field = document.getElementById("input_field");
text_field = document.getElementById("text_field");
let message_list = [];

async function get_uhrzeit(){
    const response = await fetch("http://127.0.0.1:5000/uhrzeit/");
    const obj = await response.json();
    return obj.uhrzeit;
}
get_uhrzeit();

function send_message(){
    console.log("sending message");
    fetch("http://127.0.0.1:5000/send/", {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: input_field.value})
        });
}

async function get_messages(){
    const response = await fetch("http://127.0.0.1:5000/messages/");
    const obj = await response.json();
    message_list = obj;
}

async function render_message(){
    text_field.innerHTML = "";
    for(let i = 0; i<message_list.length;i++){
        const div = document.createElement('div');
        div.id = "message";
        div.innerHTML =  "<div>"+message_list[i].message+"<p></p> "+message_list[i].time+"</div>"
        text_field.appendChild(div);
    }
}

function Sleep(milliseconds) {
   return new Promise(resolve => setTimeout(resolve, milliseconds));
}


async function ticker(){
    while(true){
        get_messages();
        render_message();
        await Sleep(1000);
    }
}

function main(){
    ticker();
}
main();