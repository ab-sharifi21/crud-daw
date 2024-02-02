const _servindoOServer = async (id,metodo,endpoint,datos)=>{
    let resposta;
    console.log('datos: ',datos)
    console.log('metodo: ',metodo)
    console.log('endpoint: ',endpoint)
    if(datos != null){
        resposta = await fetch (`/${endpoint}`,{
            method:metodo,
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(datos)})
    }else{
        resposta = await fetch (`/${endpoint}/${id}`,{method:metodo})
    }
    
    let datosConvertidos = await resposta.json();

    console.log('resposta recibida ', datosConvertidos) 

}

export{
    _servindoOServer
}