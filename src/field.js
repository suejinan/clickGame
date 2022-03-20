'use strict';
const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCnt, bugCnt) {
    this.carrotCnt = carrotCnt;
    this.bugCnt = bugCnt;
    this.field = document.querySelector('.game__field');;
    this.fieldRec = this.field.getBoundingClientRect();

    this.field.addEventListener('click', this.onClick);

  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _setItems(itemType, itemNum) {
    for (let i=0; i<itemNum; i++) {
      const newItem = this._createItem(itemType);
      this.field.appendChild(newItem);
    }
  }

  init() {
    this.field.innerHTML = '';
    this._setItems('bug', this.bugCnt);
    this._setItems('carrot', this.carrotCnt);
  }

  _createItem(type) {
    const item = document.createElement('img');
    const minX = 0;
    const minY = 0;
    const maxX = this.fieldRec.width - CARROT_SIZE;
    const maxY = this.fieldRec.height - CARROT_SIZE;
    
    item.setAttribute('class', `item`);
    item.setAttribute('src', `img/${type}.png`);
    item.setAttribute('data-type', type);
    
    const randomX = getRandomCoord(minX, maxX);
    const randomY = getRandomCoord(minY, maxY);
    // item hover시 transform 적용하기 위해
    //item.style.transform = `translateX(${randomX}px) translateY(${randomY}px)`;
    item.style.left = `${randomX}px`;
    item.style.top = `${randomY}px`;

    return item
  }

  
  
  onClick(event) {
    const target = event.target;

    if (target.dataset.type === 'carrot') {
      target.remove();
    }
    if(this.onItemClick) {
      this.onItemClick(target.dataset.type);
    } 
  }

}

function getRandomCoord(min, max) {
  return Math.random() * (max - min);
}