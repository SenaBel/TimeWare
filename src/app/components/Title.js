const Title = ({tipo, title}) => {
    switch(tipo){
        case 'h1':
        default:
            return (<h1 className="Titulo">{title}</h1>)
    }
}

export default Title;