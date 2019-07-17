export default function Toggle(selector, className) {
    console.log(selector);
    const el = document.getElementById(selector);
    console.log(el);
        el.classList.toggle(className);
}