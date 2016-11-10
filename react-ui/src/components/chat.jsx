import React from 'react';


var userName = "-" + Math.floor(Math.random() * 20);

var url = "http://localhost:8080/talk/";
const ChatMessages = (props) => {
    return (

        <ul>
            {
                props.messages.map(msg => (
                    <li key={msg.id}>{msg.user}:{msg.message}</li>
                ))
            }
        </ul>
    )
}
export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [] };
    }
    render() {
        //console.log(this.state);
        return (
            <div className='chart-component'>
                <ChatMessages messages={this.state.messages} />
                <input type='text' onKeyDown={(e) => { this.keyDown(e) } } />
            </div>
        )
    }
    keyDown(e) {
        //console.log(e.target.value);
        if (e.which == 13) {
            this.sendChatMessage(e.target.value);
        }
    }
    sendChatMessage(msg) {
        //this.setState({ messages: this.state.messages.concat([msg]) })

        fetch(url + "chat/send", {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                user: name,
                message: msg
            })
        }).then((resp) => resp.json()).catch((e) => { alert(e) });
    }

    recieveMessages(messages) {
        this.setState({
            messages: messages
        });
    }



    componentDidMount() {

        let that = this;
        setInterval(function () {
            fetch(url + "chat/get").then(resp => resp.json()).then(function (msgs) {
                that.recieveMessages(msgs)

            });

        }, 300);
    }

}

