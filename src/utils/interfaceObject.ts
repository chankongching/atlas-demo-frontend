
interface selectClickObject {
    data?: Object;
    index?: Number;
    show?: Boolean;
}

interface selectedObject {
    active: String | Number;
    amount: String | Number;
    category: String | Number;
    desc: String | Number;
    entity: String | Number;
    fund: String | Array<any>;
    growth: String | Array<any>;
    history: String | Array<any>;
    id: String | Number;
    in: String | Array<any>;
    out: String | Array<any>;
    percent: String | Number;
    score: String | Number;
    sub: String | Number;
    tag: String | Number;
    title: String | Number;
    value: String | Number;
    value_tag: String | Number;
    wallet: String | Number;
}

interface ExposureObject {
    title?: String;
    value?: Number;
}

interface SelectedTableObject {
    id?: String;
    tag?: Number | String;
    entity?: String;
    wallet?: String;
}
