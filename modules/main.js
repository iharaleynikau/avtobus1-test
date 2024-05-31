import '../common.css'
import bookSvg from '../assets/book.svg'
import crossSvg from '../assets/cross.svg'
import addSvg from '../assets/add.svg'

export const main = () => {
  const bookImg = document.querySelector('#bookImg')
  const crossImgBtns = document.querySelectorAll('#crossImg')
  const addImg = document.querySelector('#addImg')

  bookImg.setAttribute('src', bookSvg)
  addImg.setAttribute('src', addSvg)

  crossImgBtns.forEach((button) => {
    button.setAttribute('src', crossSvg)
  })
}
