export const rnd = (min: number, max: number, floor = false): number => {
    const x = Math.random() * (max - min + 1);
    return floor ? Math.floor(x) + min : x + min;
};

export const asyncForEach = async (array: Array<any>, callback: any): Promise<any> => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};
