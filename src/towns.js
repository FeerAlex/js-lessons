import {loadAndSortTowns} from './index';

const homeworkContainer = document.querySelector('#homework-container');
const loadingBlock = homeworkContainer.querySelector('#loading-block');
const filterBlock = homeworkContainer.querySelector('#filter-block');
const filterInput = homeworkContainer.querySelector('#filter-input');
const filterResult = homeworkContainer.querySelector('#filter-result');

function loadTowns() {
    return loadAndSortTowns();
}

function isMatching(full, chunk) {
    return full.toUpperCase().indexOf(chunk.toUpperCase()) !== -1;
}

document.addEventListener('DOMContentLoaded', () => {
    let townsList;

    const hideLoadMsg = () => {
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';
    }
    
    const showLoadMsg = () => {
        loadingBlock.style.display = 'block';
        filterBlock.style.display = 'none';
    }
    
    const inputListen = () => {
        filterResult.innerHTML = '';
    
        if (filterInput.value === '') {
            return;
        }

        townsList = townsList.filter(town => isMatching(town.name, filterInput.value));
    
        renderTowns(townsList);
    }
    
    const renderTowns = (towns) => {
        towns.forEach(town => {
            let div = document.createElement('div');
    
            div.textContent = town.name;
            filterResult.appendChild(div);
        });
    }

    (function getTowns() {
        showLoadMsg();
    
        loadTowns()
            .then(towns => {
                hideLoadMsg();
                townsList = towns;
                filterInput.addEventListener('keyup', inputListen);
            })
            .catch(() => {
                hideLoadMsg();
                
                let message = document.createElement('p'),
                    button = document.createElement('button');
                
                message.textContent = 'Не удалось загрузить города';
                button.textContent = 'Повторить';
                homeworkContainer.appendChild(message);
                homeworkContainer.appendChild(button);

                button.addEventListener('click', () => {
                    homeworkContainer.removeChild(message);
                    homeworkContainer.removeChild(button);
                    getTowns();
                });
            });
    })();
});

export {
    loadTowns,
    isMatching
};
