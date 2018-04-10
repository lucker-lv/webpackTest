import 'babel-polyfill';
import Person from './Person.js';
import '../stylus/index.styl';

setTimeout(() => {
    const bar = ["a", "b", "cd", "dweb"];
    const copyBar = Array.from(bar);

    // alert(copyBar);
}, 3000);

let p = new Person('李三', 20);
document.querySelector('#text').innerHTML = p.say();

if (module.hot) {
    // module.hot.accept('./Person.js', function() {
    //     console.log('开始更新!');
    //     p = new Person('李三', 20);
    //     document.querySelector('#text').innerHTML = p.say();
    // })
    module.hot.accept()
}