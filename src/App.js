import React, {useState} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { default as Actions } from './Redux/actions/index'

const mapStateToProps = store => ({
  addTaks: store.addTaks
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

const App = (props) => {
  const [title,setTitle] = useState('')
  const [descp, setDescp] = useState('')
  const [searchValue,setSearchValue] = useState('')
  const [searchValueRender,setSearchValueRender] = useState(false)
  const [list,setList] = useState([])
  const [buttonBool,setButtonbool] = useState(false)
  const [editIndex,setEditIndex] = useState('')
  const details = props.addTaks.tasklist && props.addTaks.tasklist.data
  const entryData = () =>{
    const obj ={
      noteTitle:title,
      noteDesp:descp
    }
    return obj
  }
  const statenullFun = () =>{
    setTitle('')
    setDescp('')
    setSearchValueRender(false)
  }
  const handleListofItems = (details) =>{
    return details && details.map((data,i)=>(
      <div key={i} style={{marginTop:'20px',width:'450px',alignItems:'center',display:'flex',flexDirection:'column', border: '1px solid red',backgroundColor: '#949294'}}>
        <p>Note Tile : {data.noteTitle }</p>
        <p>Note Description : {data.noteDesp}</p>
        <div>
          <button type="submit" onClick={()=>handleClickEdit(data,i)}>Edit</button>
          <button type="submit" onClick={()=>handleClickDelete(i)}>Delete</button>
        </div>
      </div>
    ))
  }
  const handleClick = () =>{ 
    let array = []
    const typedData = entryData()
    array = [...list,typedData]
    setList(array)
    props.actions.addtasksuccess(array)
    statenullFun()
  }
  const handleUpdate = () =>{
    list[editIndex].noteTitle = title
    list[editIndex].noteDesp = descp
    props.actions.addtasksuccess(list) // i'm using redux to store the data that's way i'm not using local storage concept 
    setList(list)
    setButtonbool(false)
    setEditIndex('')
    statenullFun()
  }

  const handleClickEdit = (data, i) =>{
    setTitle(data.noteTitle)
    setDescp(data.noteDesp)
    setButtonbool(true)
    setEditIndex(i)
    setSearchValueRender(false)
  }
  const handleClickDelete = (i) =>{
    list.splice(i, 1)
    props.actions.addtasksuccess(list) 
    setList(list)
    setSearchValueRender(false)
  }
  const onchangeSearchFun = (e) =>{
    setSearchValue(e.target.value)
    setSearchValueRender(true)
  }
  
  const handleSearchListofItems = () =>{
    const details = list.filter(s => s.noteTitle.includes(searchValue))
    return details && details.map((data,i)=>(
      <div key={i} style={{width:'450px',alignItems:'center',display:'flex',flexDirection:'column', border: '1px solid red',backgroundColor: '#949294'}}>
        <p>Note Tile : {data.noteTitle }</p>
        <p>Note Description : {data.noteDesp}</p>
      </div>
    ))
  }

  return (
   <div >
   <div style={{alignItems:'center',justifyContent:'center',display:'flex',flexDirection:'column'}}>  
   <div style={{marginTop:'20px'}}>
   <label>Note Title : </label>
     <input
        id="Name"
        name="Note Title"
        type="text"
        onChange={(e)=>setTitle(e.target.value)}
        value={title}
      />
   </div>
   <div style={{marginTop:'20px'}}>
   <label>Note Description : </label>
    <input
        id="Name"
        name="Note Description"
        type="text"
        onChange={(e)=>setDescp(e.target.value)}
        value={descp}
      />
   </div>
   <div style={{marginTop:'15px',marginBottom:'15px'}}>
   {buttonBool ? <button type="submit" onClick={()=>handleUpdate()}>Update</button> : <button type="submit" onClick={()=>handleClick()}>Add</button> }
   </div>
   <div>
   <label>Search on note : </label>
   <input
        id="Name"
        name="Search Note "
        type="text"
        onChange={(e)=> onchangeSearchFun(e) }
        value={searchValue}
      />
   </div>
   </div>
   <div style={{alignItems:'center',justifyContent:'center',display:'flex',flexDirection:'column'}}>
    {searchValueRender ? handleSearchListofItems(searchValue.data) : handleListofItems(details) }
    </div>
   </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
