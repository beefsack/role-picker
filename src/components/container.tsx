import * as React from "react";

import RolePicker from "./role-picker";

// Storage keys
const SK_SPACE = "space";

export interface QueryParams {
    space: string;
}

export interface Space {

}

export interface Storage {
    lastSpace: string;
    spaces: { [key: string]: Space };
}

function loadQueryParams(): QueryParams {
    let rawParams: { [key: string]: string } = {};
    if (location.hash !== "") {
        rawParams = JSON.parse(decodeURI(location.hash.substr(1)));
    }
    return {
        space: rawParams[SK_SPACE] ||
            localStorage.getItem(SK_SPACE) ||
            Math.random().toString(32).substr(2, 6),
    };
}

function saveQueryParams(params: QueryParams) {
    location.hash = JSON.stringify(params);
    localStorage.setItem(SK_SPACE, params.space);
}

export interface Props {
}

export interface State {
    queryParams: QueryParams,
}

export default class Container extends React.Component<Props, State> {
    constructor(props: Props, context?: any) {
        super(props, context);

        const queryParams = loadQueryParams();
        saveQueryParams(queryParams); // In case some values were generated

        this.state = {
            queryParams,
        };
    }

    render = () => {
        return <RolePicker />;
    }
}
