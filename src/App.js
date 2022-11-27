import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import { addImg, removeImg } from './toolkitRedux/toolkitSlice';
import { useRef } from 'react'
import { nanoid } from 'nanoid'


function App() {
  const input = useRef(null)
  const data = useSelector(state => state.toolkit.data)
  const dispatch = useDispatch()

  const triggerInput = () => input.current.click()

  const changeHandler = (event) => {
    let files = []
    if (!event.target.files.length) {
      return
    }

    files = Array.from(event.target.files)
    files.forEach(file => {
      if (!file.type.match('image')) {
        return
      }

      const reader = new FileReader()

      reader.onload = ev => {
        const src = ev.target.result
        dispatch(addImg([src, file.name, nanoid()]))
      }

      reader.readAsDataURL(file)
    })
  }

  const removeHandler = event => {
    dispatch(removeImg(event.target.id))

  }


  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <input ref={input} type="file" id="file" onChange={changeHandler} accept='image/*' multiple />
          <button className='btn' onClick={triggerInput}>Открыть</button>
          <div style={{ display: 'inline-flex', flexWrap: 'wrap', marginTop: '3%' }}>
            {data.map((item) => {
              return (
                <div key={item[2]} className='preview-image'>
                  <div className="preview-remove" id={item[2]} onClick={removeHandler}>&times;</div>
                  <img src={item[0]} alt='' />
                  <div className="preview-info">
                    <span>{item[1]}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
