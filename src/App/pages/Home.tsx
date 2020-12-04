import React, { Component, useState } from 'react';
import Welcome from './Welcome'

import styles from './styles/Home.scss';

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      // extends React's HTMLAttributes
      glow?: string;
    }
  }
  

interface State {
    currentMessage: Message
    userName: string
}

enum Message {
    HELLO,
    NAME,
    NAMEUNTYPE,
    WELCOME
}

enum TypingOption {
    TYPE,
    UNTYPE,
    TYPEANDUNTYPE
}

export const NotReadyYetBanner = () =>
    <div className={styles.notReadyYetBanner}>
        There will be something new here.... just wait
    </div>

const TypeWriter = (props: {message: string, typingOption: TypingOption, nextMessage?: Message, callback?: (message: Message) => (void)}) => {
    document.documentElement.style.setProperty(`--textSize`, props.message.length.toString())
    return <div className={styles.typewriter}>
            <h1 key={Math.random()}
                className={(props.typingOption == TypingOption.TYPE) ? styles.typewriterType : 
                (props.typingOption == TypingOption.UNTYPE) ? styles.typewriterUntype : styles.typewriterTypeAndUntype}
                onAnimationEnd={(e) => {if (props.nextMessage && props.callback) props.callback(props.nextMessage)}}>
                {props.message}
            </h1>
        </div>
}

const EnterName = (props: {callback: (name: string) => (void)}) => {
    let name = ""
    const [glow, setGlow] = useState('none')
    return <div className={styles.enterNameBox}>
        <input type='text' id='text' name='name' maxLength={20}
            onChange={(e) => name = e.target.value}
            onAnimationEnd={() => { if (glow == 'red') { setGlow('none') }}}
            glow={glow}
            onKeyPress={(e) => { 
                if (e.key === 'Enter')
                    if (/^[a-zA-Z]+$/.test(name)) {
                        setGlow('green')
                        props.callback(name)
                    } else {
                        setGlow('red')
                    }
            }}/>
    </div>
}

class Home extends Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            currentMessage: Message.HELLO,
            userName: undefined
        }
    }

    typeWriterMessage = () => {
        const updateMethod = (message: Message) => {
            this.setState(() => {
                if (message) return {currentMessage: message}
            })
        }
        switch(this.state.currentMessage) {
            case Message.HELLO: return <TypeWriter message={"Hello there..."} typingOption={TypingOption.TYPEANDUNTYPE} nextMessage={Message.NAME} callback={updateMethod} />
            case Message.NAME: return <TypeWriter message={"What can I call you?"} typingOption={TypingOption.TYPE} />
            case Message.NAMEUNTYPE: return <TypeWriter message={"What can I call you?"} typingOption={TypingOption.UNTYPE} nextMessage={Message.WELCOME} callback={updateMethod} />
            default: undefined                
        }
    }

    render() {
        const {currentMessage, userName} = this.state
        const enterNameBox = <EnterName callback={(name: string) => this.setState({userName: name, currentMessage: Message.NAMEUNTYPE})} />
        if (currentMessage == Message.WELCOME) {
            return <Welcome name={this.state.userName} />
        } else {
            return <div style={{textAlign: 'center'}}>
                <NotReadyYetBanner />
                {this.typeWriterMessage()}
                {enterNameBox}
            </div>
        }
    }
}

export default Home;