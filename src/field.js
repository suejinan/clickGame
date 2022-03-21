'use strict';
const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCnt, bugCnt) {
    this.carrotCnt = carrotCnt;
    this.bugCnt = bugCnt;
    this.field = document.querySelector('.game__field');;
    this.fieldRec = this.field.getBoundingClientRect();
    // 클래스내 함수를 콜백으로 전달할때는 해당 클래스의 정보가 사라지므로 this 바인딩 필요
    // 1) this.onClick = this.onClick.bind(this); //onClick 함수를 클래스와 바인드
    // 2) onClick = (e) => {} : 변수로 선언
    // 3) () => {} : arrow function 사용
    this.field.addEventListener('click', (e) => {
      this.onClick(e);
    });

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
    if(this.onItemClick && this.onItemClick(target.dataset.type)) {
      if (target.dataset.type === 'carrot') {
        target.remove();
      }
    }
  }
  
}

function getRandomCoord(min, max) {
  return Math.random() * (max - min);
}