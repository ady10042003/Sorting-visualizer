{
    //Variables
    const algorithmes = document.querySelector('.algo');
    const genNr = document.querySelector('.genNr');
    const can = document.querySelector('.can');
    const range = document.querySelector('.inp');
    const option = document.querySelectorAll('.option');

    let numbers = [];
    let divs = [];

    let divNumber = 1;
    let sortingAlg;

    //Functions

    const choose = () => {
        option.forEach(el => {
            el.addEventListener('click', () => {
                sortingAlg = el.textContent;
                if(sortingAlg === 'Bubble sort')
                    bubbleSort();
                else if(sortingAlg === 'Quick sort')
                    quickSort();
                else if(sortingAlg === 'Merge sort')
                    mergeSort(numbers);
                else if(sortingAlg === "Insertion sort")
                    insertionSort();
            });
        });
    };
    
    const generateNumbers = () => {
        const variables = range.value;
        for(let i = 0; i < variables; i++) {
            numbers[numbers.length] = Math.floor(Math.random() * 300 + 25)
        }
        generateVisual();
    };

    const generateElement = (type, clas, width, height) => {
        const dev = document.createElement(`${type}`);

        dev.setAttribute('class', `${clas}`);

        const text = document.createTextNode(``);

        dev.appendChild(text);

        document.querySelector('.can').appendChild(dev);

        dev.style.width = `${width}px`;
        dev.style.height = `${height}px`;

        return dev;
    };

    const commonClass = () => {
        divs.forEach(el => {
            el.classList.add('arrEl');
        });
    };

    const generateVisual = () => {
        divs.forEach(el => {
            el.remove();
        });
        divs.splice(0, divs.length);
        divNumber = 1;
        numbers.forEach(el => {
            divs[divs.length] = generateElement('div', `arrElement${divNumber}`, 100-range.value+10, el);
            divNumber += 1;
        });
        console.log(divs)
        commonClass();
    };
  
    const bubbleSort = async () => {
        for(let i = 0; i < numbers.length; i++)
            for(let j = 0; j < numbers.length; j++)
                if(numbers[j] > numbers[j+1]) {
                    let aux = numbers[j];
                    numbers[j] = numbers[j+1];
                    numbers[j+1] = aux;

                    aux = divs[j].style.height;
                    divs[j].style.height = divs[j+1].style.height;
                    divs[j+1].style.height = aux;
                    await new Promise(res => setTimeout(res, 25));
                }
    };

    const mergeSort = (arr) => {
        if(arr.length < 2) 
            return arr
        const middle = Math.floor(arr.length/2);

        const leftSide = arr.slice(0, middle);
        const rightSide = arr.slice(middle, arr.length);

        return merge(mergeSort(leftSide), mergeSort(rightSide));
    };

    const merge = (left, right) => {
        const result = [];
        while(left.length && right.length) {
            if(left[0] <= right[0]) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }
        while(left.length)
            result.push(left.shift());
        while(right.length)
            result.push(right.shift());

        return result;
    }

    const insertionSort = async () => {
        for(let i = 0; i < numbers.length; i++) {
            let key = numbers[i];
            let key1 = divs[i].style.height;
            j = i - 1;

            while(j >= 0 && key < numbers[j]) {
                await new Promise(res => setTimeout(res, 25));
                numbers[j+1] = numbers[j];

                divs[j+1].style.height = divs[j].style.height;

                j -= 1;
            }

            numbers[j+1] = key;
            divs[j+1].style.height = key1;
        }
    };

    //Events
    range.addEventListener('mouseup', () => {
        numbers.splice(0, numbers.length);
        generateNumbers();
    });

    genNr.addEventListener('click', () => {
        numbers.splice(0, numbers.length);
        generateNumbers();
    });

    window.addEventListener('keypress', () => {
        numbers.forEach( el => {
            console.log(el);
        });
    })

    choose();
    genNr.click();
}