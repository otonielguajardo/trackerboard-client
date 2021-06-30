export interface Stage {
    sort: number;
    name: string;
    status: {
        textGood: string;
        textBad: string;
        unit: moment.unitOfTime.DurationConstructor;
        modifier: string;
        digit: number;
    };
}
