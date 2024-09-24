import React from 'react'
import Input from './Components/Input'
import Button from './Components/Button'

export default function Todo(){
    const [tasks,setTasks] = React.useState([])
    const [input,setInput] = React.useState('')
    const [active,setActive] = React.useState(true)
    const [edit,setEdit] = React.useState(null)
    const [editVal,setEditVal] = React.useState('')

    const onCreateClick = () => {
        if(input){
            setTasks(prev=>[...prev,{
                id:Date.now(),
                task:input,
                status:'active',
            }])
        }
        setInput('')
    }

    const onActiveClick = () => {
        setActive(true)
    }

    const onCompleteClick = () => {
        setActive(false)
    }

    const onCompletedItemClick = (item) => {
        const taksObj = tasks.find(obj=>obj.id===item.id)
        const newTaksObj = {...taksObj,status:'complete'}
        const filteredTaks = tasks.filter(obj=>obj.id!==item.id)
        setTasks([...filteredTaks,newTaksObj])
    }

    const onDeleteClick = (item) => {
        const filteredTaks = tasks.filter(obj=>obj.id!==item.id)
        setTasks(filteredTaks)
    }

    const handleEditButtonClick = (item) => {
        setEdit(item.id)
        setEditVal(item.task)
    }
    const onEditChangeClick = (item) => {
        const updatedTaks = tasks.map(obj=>{
            if(obj.id===item.id && editVal){
                return {...obj,task:editVal}
            }
            return obj
        })
        setTasks(updatedTaks)
        setInput('')
        setEdit(null)
    }
    return (
        <div style={{display:'flex',flexDirection:"column",justifyContent:'center'}}>
            <h1>To-Do App</h1>

             {/* Create */}
            <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
                <Input value={input} onInputChange={(e)=>setInput(e.target.value)}/>
                <Button value={'Create'} buttonClick={onCreateClick}/>
            </div>

            {/* Filter */}

            <div>
                <Button value={'Active'} buttonClick={onActiveClick}/>
                <Button value={'Completed'} buttonClick={onCompleteClick}/>
            </div>

            {/* Listing of Taks */}
            {active ? <ul>
                {
                    tasks.map(obj=>  // could have used 
                        obj.status==='active' && (
                            <>
                                <li key={obj.id}>{obj.task}</li>
                                {
                                    edit === obj.id ? 
                                    (
                                    <>
                                        <Input value={editVal} onInputChange={(e)=>setEditVal(e.target.value)}/>
                                        <Button value={'Done'} buttonClick={()=>onEditChangeClick(obj)}/>
                                    </>
                                    )
                                    : (
                                    <>
                                        <Button value={'Completed'} buttonClick={()=>onCompletedItemClick(obj)}/>
                                        <Button value={'Delete'} buttonClick={()=>onDeleteClick(obj)}/>
                                        <Button value={'Edit'} buttonClick={() => handleEditButtonClick(obj)}/>
                                    </>)
                                }
                                
                            </>
                        )
                    )
                }
            </ul>
            : 
            <ul>
                {
                    tasks.map(obj=>
                        obj.status==='complete' && (
                            <>
                                <li key={obj.id}>{obj.task}</li>
                                <Button value={'Completed'} buttonClick={()=>onCompletedItemClick(obj)}/>
                                <Button value={'Delete'} buttonClick={()=>onDeleteClick(obj)}/>
                            </>
                        )
                    )
                }
            </ul>
            }
        </div>
    )
}