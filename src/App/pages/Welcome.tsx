import React, { Component } from 'react';


interface Props {
    name: string
}

class Welcome extends Component<Props, {}> {

    constructor(props: Props) {
        super(props)
    }

    render() {
        return <div>Hi there {this.props.name}</div>
    }
}

export default Welcome;