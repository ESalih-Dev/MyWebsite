import React, { Component } from 'react';

import styles from './styles/Home.scss';

const PAGES: string[] = ["myprojects", "cv", "aboutme", "email", "linkedin", "facebook"];

interface State {
    currentPage?: string
}

class Home extends Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            currentPage: undefined
        }
    }

    render() {
        return (
            <div className={styles.notReadyYetBanner}>
                There will be something new here.... just wait
            </div>
        );
    }
}

export default Home;