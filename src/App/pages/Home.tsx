import React, { Component } from 'react';
import TreeMenu from './TreeMenu';

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

    showPage = (clickedPage: string) => {
        this.setState((prevState) => {
            // Reset the page to undefined to allow TreeMenu to refill page
            const newPage = (prevState.currentPage == clickedPage) ? undefined : clickedPage
            return ({currentPage: newPage})
        })
    }

    render() {
        console.log(this.state.currentPage)
        return (
            <div>
                <div className={styles.notReadyYetBanner}>
                    <h2>You're here early! This website is still in development right now, but you can see where I'm at below!</h2>
                </div>
                <div>
                    <TreeMenu pages={PAGES} showPage={this.showPage} halfSized={(this.state.currentPage != null)} />
                </div>
                {} {/* Rest of the page content */}
            </div>
        );
    }
}

export default Home;