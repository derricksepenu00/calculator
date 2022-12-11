const input = document.querySelector('input');
const actions = {
    'is_action' (val) {
        return ['=', 'RESET', 'DEL'].includes(val)
    },
    'is__clear' () {
        input.value = '';
    },
    'is__del' () {
        input.value = input.value.slice(0, -1);
    },
    'is__equal' () {
        let value = input.value.replaceAll('x', '*');
        value = value.replaceAll('−', '-');

        // console.log(value);
        let calculate = eval(value);
        input.value = calculate;
    }

}

function CaptureClick(val) {
    let temp = actions.is_action(val);

    if (!temp) {
        input.value += val;
        return
    }
    if (val === 'RESET') {
        actions.is__clear();
        return
    }
    if (val === '=') {
        actions.is__equal();
        return
    }
    if (val === 'DEL') {
        actions.is__del();
        return
    }
}

const buttons = [...document.getElementsByTagName("button")];
buttons.forEach((btn) => {
    btn.addEventListener('click', function() {
        CaptureClick(this.textContent.trim())
    })
})