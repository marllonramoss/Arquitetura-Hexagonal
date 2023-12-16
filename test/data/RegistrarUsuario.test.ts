import RegistrarUsuario from '../../src/core/usuario/RegistrarUsuario'
import UsuarioEmMemoria from '../../src/adapters/db/UsuarioEmMemoria'
import InverterSenha from '../../src/adapters/auth/InverterSenha'
import SenhaComEspaco from '../../src/adapters/auth/SenhaComEspaco'
import CriptoReal from '../../src/adapters/auth/BcryptAdapter'
import ColecaoUsuarioDB from "../../src/adapters/db/knex/ColecaoUsuarioDB"
import usuarios from './usuarios'

test('Deve registrar um usuário invertendo a senha', async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new InverterSenha()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    
    const usuario = await casoDeUso.executar({
        nome: usuarios.completo.nome,
        email: usuarios.completo.email,
        senha: usuarios.completo.senha!,
    })


    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Marllon')
    expect(usuario.email).toBe('marllon@gmail.com')
    expect(usuario.senha).toBe('654321')
})
test('Deve registrar um usuário com senha com espaços', async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new SenhaComEspaco()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    
    const usuario = await casoDeUso.executar({
        nome: usuarios.completo.nome,
        email: usuarios.completo.email,
        senha: usuarios.completo.senha!,
    })


    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Marllon')
    expect(usuario.email).toBe('marllon@gmail.com')
    expect(usuario.senha).toBe('1 2 3 4 5 6')
})
test('Deve registrar um usuário com senha com espaços', async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new SenhaComEspaco()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    
    const usuario = await casoDeUso.executar({
        nome: usuarios.completo.nome,
        email: usuarios.completo.email,
        senha: usuarios.completo.senha!,
    })


    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Marllon')
    expect(usuario.email).toBe('marllon@gmail.com')
    expect(usuario.senha).toBe('1 2 3 4 5 6')
})

test('Deve registrar um usuário com senha criptografada', async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    
    const usuario = await casoDeUso.executar({
        nome: usuarios.completo.nome,
        email: usuarios.completo.email,
        senha: usuarios.completo.senha!,
    })

    console.log(usuario.senha);
    console.log(provedorCripto.criptografar('123456'));
    

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Marllon')
    expect(provedorCripto.comparar("123456", usuario.senha!)).toBeTruthy()
})
test('Deve lançar erro ao cadastrar usuario ja cadastrado', async () => {
    const colecao = new UsuarioEmMemoria()
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    
    const nome = usuarios.completo.nome
    const email = usuarios.completo.email
    const senha = usuarios.completo.senha!


    await casoDeUso.executar({nome, email, senha})
    const exec = async () => await casoDeUso.executar({nome, email, senha})
    await expect(exec).rejects.toThrowError('Usuário já existe')

})
test.skip('Deve registrar um usuário no banco real', async () => {
    const colecao = new ColecaoUsuarioDB
    const provedorCripto = new CriptoReal()
    const casoDeUso = new RegistrarUsuario(colecao, provedorCripto)
    
    const usuario = await casoDeUso.executar({
        nome: usuarios.completo.nome,
        email: usuarios.completo.email,
        senha: usuarios.completo.senha!,
    })

    console.log(usuario.senha);
    console.log(provedorCripto.criptografar('123456'));
    

    expect(usuario).toHaveProperty('id')
    expect(usuario.nome).toBe('Marllon')
    expect(provedorCripto.comparar("123456", usuario.senha!)).toBeTruthy()
})