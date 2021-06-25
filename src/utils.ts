export const rnd = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const asyncForEach = async (array: Array<any>, callback: any): Promise<any> => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};
