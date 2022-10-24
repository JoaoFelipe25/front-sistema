import React, { useEffect, useState} from 'react';
import axios from 'axios';

function Formulario(){

    const [servico, setServico] = useState({nomeCliente:'', dataInicio:'',dataTermino:'',descricaoServico:'',valorServico:'',valorPago:'', dataPagamento:''})

    const [servicos, setServicos] = useState([]);
    const [atualizar, setAtualizar] = useState();

    useEffect(()=>{
       buscarTodos();
    },[atualizar]);

    function handleChange(event){
        setServico({...servico,[event.target.name]:event.target.value}); 
    }

    function buscarTodos(event){
        axios.get("http://localhost:8080/api/servico/").then(result =>{
            setServicos(result.data); 
            
        });

    }

    function pagamentoPendente(){
        axios.get("http://localhost:8080/api/servico/pagamentoPendente").then(result =>{
            setServicos(result.data); 
            
        });
    }

    function buscarCancelado(){
        axios.get("http://localhost:8080/api/servico/cancelado").then(result =>{
            setServicos(result.data); 
            
        });
    }

    function limpar(){
        setServico({nomeCliente:'', dataInicio:'',dataTermino:'',descricaoServico:'',valorServico:'',valorPago:'', dataPagamento:''});

    }

    function handleSubmit(event){  
        event.preventDefault();

        if(servico.id == undefined){

            axios.post("http://localhost:8080/api/servico/", servico).then(result =>{
            setAtualizar(result);
            })

        }else{

            axios.put("http://localhost:8080/api/servico/", servico).then(result =>{
            setAtualizar(result);
            })

            }
        
        limpar();
    }

    function excluir(id){
        axios.delete("http://localhost:8080/api/servico/" + id).then(result =>{
            setAtualizar(result);
        });
    }

    function cancelar(id){
        axios.post("http://localhost:8080/api/servico/" + id).then(result =>{
            setAtualizar(result);
        });
        
    }

    return(
        <div className='servico'>

            <h1 className='title-form'>Cadastrar Servico</h1>

            <form className='form-servico' action="" onSubmit={handleSubmit}>

                <div >

                    <div className='campo-servico'>
                        <label htmlFor="">Nome</label>
                        <input className='input-servico' onChange={handleChange} value={servico.nomeCliente || ''} name="nomeCliente" type="text" />
                    </div>

                    <div className='campo-servico'>
                        <label htmlFor="">Data Inicio</label>
                        <input className='input-servico' onChange={handleChange} value={servico.dataInicio || ''} name="dataInicio" type="date" />
                    </div>

                    <div className='campo-servico'>
                        <label htmlFor="">Data de Termino</label>
                        <input className='input-servico' onChange={handleChange} value={servico.dataTermino || ''} name="dataTermino"  type="date" />
                    </div>

                    <div className='campo-servico'>
                        <label htmlFor="">Descrição do Servico</label>
                        <input className='input-servico' onChange={handleChange} value={servico.descricaoServico || ''} name="descricaoServico" type="text" />
                    </div>

                    <div className='campo-servico'>
                        <label htmlFor="">Valor do Servico</label>
                        <input className='input-servico' onChange={handleChange} value={servico.valorServico || ''} name="valorServico" type="number" />
                    </div>

                    <div className='campo-servico'>
                        <label htmlFor="">Valor Pago</label>
                        <input className='input-servico' onChange={handleChange} value={servico.valorPago || ''} name="valorPago" type="number" />
                    </div>

                    <div className='campo-servico'>
                        <label htmlFor="">Data de Pagamento</label>
                        <input className='input-servico' onChange={handleChange} value={servico.dataPagamento || ''} name="dataPagamento" type="date" />
                    </div>

                    <div className='button-form'>

                        <input type="submit" value='Cadastrar'/>

                        <button onClick={limpar} >Limpar</button>

                    </div>
                </div>

            </form>

            <hr />

            <div className='button-buscas'>

                <button onClick={buscarTodos} className='todos'>Listar Todos</button>
                <button onClick={pagamentoPendente} className='pendente'>Pagamento Pendente</button>
                <button onClick={buscarCancelado} className='cancelado'>Serviços Cancelados</button>

            </div>

            <table>
                <thead>

                    <tr>
                        <th>Nome</th>
                        <th>Data Inicio</th>
                        <th>Data Termino</th>
                        <th>Descrição Servico</th>
                        <th>Valor Servico</th>
                        <th>valor Pago</th>
                        <th>Data de Pagamento</th>
                        <th>Statu</th>
                        
                    </tr>

                </thead>

                <tbody>

                    {servicos.map(serv => (

                        <tr key={serv.id}>
                
                            <td>{serv.nomeCliente}</td>
                            <td>{serv.dataInicio}</td>
                            <td>{serv.dataTermino}</td>
                            <td>{serv.descricaoServico}</td>
                            <td>{serv.valorServico}</td>
                            <td>{serv.valorPago}</td>
                            <td>{serv.dataPagamento}</td>
                            <td>{serv.status}</td>
                            <td>
                                <button onClick={()=>setServico(serv)} className='todos'>Alterar</button>                       
                                <button onClick={()=>excluir(serv.id)} className='excluir'>Excluir</button>                          
                                <button onClick={()=>cancelar(serv.id)} className='cancelado'>Cancelar</button>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>
            
            <br/>
            
        </div>
    )
}

export default Formulario