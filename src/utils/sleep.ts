/**
 * Sleep使用的是setTimeout，delay使用的是backgroundTimer
 * @param ms
 */
export default function sleep(ms = 200) {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
