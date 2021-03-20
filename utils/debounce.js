export const debounce = (fn, time) => {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn();
        }, time);
    }
}