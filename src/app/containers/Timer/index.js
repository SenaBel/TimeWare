import React, {useState, useEffect, useCallback} from 'react'

import InputTime from '../../components/InputTime';
import Title from '../../components/Title';
import ButtonSimples from '../../components/ButtonSimples';

const Time = () => {

    const [valueInitial, setValueInitial] = useState(0)
    const [timeOutIdGiven, setTimeOutIdGiven] = useState(0)
    const [totalTimeInSeconds, setTotalTimeInSeconds] = useState(valueInitial * 60)

    const [list, setList] = useState([])
    const [canShow, setCanShow] = useState(false);

    const [error, setError] = useState('')

    const [initialRender, setInitialRender] = useState(true)

    const minutes = Math.floor(totalTimeInSeconds / 60)
    const seconds = totalTimeInSeconds % 60

    const startTime = () => {
        setTotalTimeInSeconds(valueInitial)
    }
  
    const stop = () => {
        clearTimeout(timeOutIdGiven)
        setTotalTimeInSeconds(0);

        let timeStop = Math.floor(totalTimeInSeconds / 60) + ":" + totalTimeInSeconds % 60

        if(timeStop.toString() != '0:0'){
           let value = timeStop.toString()
        
        setList((prev) => {
            let list = []
            list = [...prev, value]
            list = [...new Set(list)]
            localStorage.setItem("TimeStopped", JSON.stringify(list))
            return list
            })
       }
       setValueInitial(0)
    }
  
    const fethList = useCallback(() => {
        let data = null 
        data = JSON.parse(localStorage.getItem('TimeStopped')) || []

        if(initialRender && data.length > 0){
            setList([...data])
            setCanShow(true);
        }
        setInitialRender(false)
        
    }, [initialRender])


    useEffect(() => {
        fethList()
    }, [ fethList])


    const handleChange = (value) => {
        if (value == 0) {
            setError("Preencha um Valor Diferente de 0!")
        } else if (value == "") {
            setError('Valor não Pode ser Vazio!')
        } else {
            setValueInitial(value)
        }
    }

    const historyTime = () => {
        setCanShow(!canShow)
    }

    const handleRemoveTime= (list, item, i) =>{
        const index = list.indexOf(item)
        if (index > -1 && index === i) {
            list.splice(index, 1)
        }
        localStorage.setItem("TimeStopped", JSON.stringify(list))
        setList([...list])
  

    }

    const resetHistory = () => {
        localStorage.setItem("TimeStopped", JSON.stringify([]))
        setCanShow(false)
        setList([])
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
                    <Title tipo="h1" className="title-default" title="TimeWare" />
                    <div className="Sub-Card timer-card">
                        <span>{minutes.toString().padStart(2, "0")}</span>
                        <span>:</span>
                        <span>{seconds.toString().padStart(2, "0")}</span>
                    </div><br />

                </div> <br /><br />

                <InputTime
                    label="Tempo: "
                    name="timer"
                    type="number"
                    value={valueInitial}
                    onChange={(e) => handleChange(e.target.value)}
                    error={error}
                />

                <div className="flex flex-center ">
                    <ButtonSimples onClick={startTime} type="success" label="Iniciar" />
                    <ButtonSimples onClick={stop} type="secondary" label="Parar" />
                    <ButtonSimples onClick={historyTime} type="warning" label="Histórico" />
                    <ButtonSimples onClick={resetHistory} type="danger" label="Limpar" />
                </div>
                <div className="TabelaSimples flex flex-center main-table-text">
                    <table className="simples ">
                        <thead>
                            <tr>
                                <th>Id do Time</th>
                                <th>Tempo Encerrado</th>
                                <th>Remover Tempo Encerrado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {canShow && list.map((time, index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{time}</td>
                                    <td><ButtonSimples onClick={() => handleRemoveTime(list, time, index)} type="danger" label="x" /></td>
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