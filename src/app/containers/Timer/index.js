import React, {useState, useEffect} from 'react'

import InputTime from '../../components/InputTime';
import Title from '../../components/Title';
import ButtonSimples from '../../components/ButtonSimples';
import TabelaSimples from '../../components/Tabela'



let getInitalLocalStorage = JSON.parse(localStorage.getItem('TimeStopped')) || []

const Time = () => {
    const [valueInitial, setValueInitial] = useState(0)
    const [timeOutIdGiven, setTimeOutIdGiven] = useState(0)
    const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(valueInitial * 60)
    const [stopValue, setStopValue] = useState(valueInitial)
    const [getValue, setGetValue] = useState(getInitalLocalStorage)
    const [error, setError] = useState('')

    const minutes = Math.floor(totalTimeInSeconds / 60)
    const seconds = totalTimeInSeconds % 60

    const startTime = () => {

        if(valueInitial == 0){
            setError("Preencha um Valor Diferente de 0!")
        }
        if(valueInitial == ""){
            setError('Valor não Pode ser Vazio!')
        }
        if(valueInitial != 0){
            setTotalTimeInSeconds(valueInitial)
       }
       console.log("Valor do Initial", valueInitial)
    }

  
    const stop = () => {
       clearTimeout(timeOutIdGiven)
       setTotalTimeInSeconds(0);
       let timeStop = Math.floor(totalTimeInSeconds / 60) + ":" + totalTimeInSeconds % 60
       //setStopValue(timeStop)
       console.log('sss', timeStop)

       //let valueForSaveLocalStorage = timeStop
        getInitalLocalStorage.push(timeStop)
        localStorage.setItem("TimeStopped", JSON.stringify(getInitalLocalStorage))

       console.log("localstorage: ", Math.floor(totalTimeInSeconds / 60) + ":" + totalTimeInSeconds % 60)

    }

    const storicTime = () => {
        let getTimeStopped = localStorage.getItem("TimeStopped")
        let getTimeStoppedObj = JSON.parse(getTimeStopped)

        if(!getTimeStoppedObj){
            return
        }
        if(getTimeStoppedObj){
            setGetValue(getTimeStoppedObj)
        }
        console.log('foi', getTimeStoppedObj)
        console.log('sdfs', getValue)
    }

    const handleRemoveTime= (index) =>{
        //const index = getInitalLocalStorage.indexOf()

        getInitalLocalStorage.splice(index, 1)
        console.log('Esse é o valor do index', index)
        console.log('GetInitialstorage', getInitalLocalStorage)

    }

    useEffect(() => {
        setError('')
        if(totalTimeInSeconds === 0){
            return
        }
        if(totalTimeInSeconds === ""){
            return
        }
        
        if(totalTimeInSeconds !== 0){
           const id = setTimeout(() => {
            if(totalTimeInSeconds !== 0){
                setTotalTimeInSeconds(totalTimeInSeconds - 1)
            }
            }, 1000)
            setTimeOutIdGiven(id)
        }
        
    }, [totalTimeInSeconds])
  

    return (
        <div className="Info flex flex-center">
      <div className="Card">
        <div className="flex vertical flex-center">
          <Title tipo="h1" title="Sistema TimeWare"/><br/>
            <div className="Sub-Card">
                <span>{minutes.toString().padStart(2, "0")}</span>
                <span>:</span>
                <span>{seconds.toString().padStart(2, "0")}</span>
            </div><br/>

         
        </div> <br/><br/>

        <InputTime
          label="Define o Time: "
          type="text"
          //value={valueInitial}
          onChange={(e) => setValueInitial(e.target.value)}
          error={error}
        />
        
        <div className="flex flex-center ">
        <ButtonSimples onClick={startTime} type="success" label="Iniciar o Time"/>
        <ButtonSimples onClick={stop} type="danger" label="Encerrar o Time"/>
        <ButtonSimples onClick={storicTime} type="warning" label="Histórico dos Time"/>
        </div>
        <div className="TabelaSimples flex flex-center">
        <table className="simples ">
            <thead>
                <tr>
                <th>Id do Time</th>
                <th>Tempo Encerrado</th>
                {/* <th>Remover Tempo Encerrado</th> */}
                </tr>
            </thead>
           
            <tbody>
                {getValue.map((time, index) => (
                <tr key={index}>
                <td>{index}</td>
                <td>{time}</td>
                {/* <td><ButtonSimples onClick={()=> handleRemoveTime(index)} type="danger" label="x"/></td> */}
                </tr>
                ))}
            </tbody>
            </table>
            
        </div>

      </div>
    </div>
    )
}
export default Time;