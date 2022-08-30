import React, {useState, useEffect} from 'react'

import InputTime from '../../components/InputTime';
import Title from '../../components/Title';
import ButtonSimples from '../../components/ButtonSimples';

const Time = () => {
    const [valueInitial, setValueInitial] = useState(0)
    const [timeOutIdGiven, setTimeOutIdGiven] = useState(0)
    const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(valueInitial * 60)
    const [error, setError] = useState('')

    const minutes = Math.floor(totalTimeInSeconds / 60)
    const seconds = totalTimeInSeconds % 60

    const startTime = () => {
        //setValueInitial(valueInitial.trim()); 

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
        console.log('é aqui: ',totalTimeInSeconds)
        console.log("Parou")
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
        <ButtonSimples type="warning" label="Histórico dos Time"/>
        </div>
      </div>
    </div>
    )
}
export default Time;