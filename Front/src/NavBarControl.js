import {Component} from "react";

export default class NavBarControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "unlogged",
            isLoggedIn: false // Track login status
        };
    }


}