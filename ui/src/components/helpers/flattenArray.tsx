export default function flattenArray(arr:Array<any>) {
    if (!arr) return [];
    return arr?.reduce((acc, val) => acc.concat(val), [])
}