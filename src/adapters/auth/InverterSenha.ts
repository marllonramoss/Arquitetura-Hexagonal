import ProvedorCriptografia from "../../core/usuario/ProvedorCriptografia";

export default class InverterSenha implements ProvedorCriptografia{
    criptografar(senha: string): string {
        return senha.split('').reverse().join('')
    }
    comparar(senha: string, senhaCriptografada: string): boolean {
        const senhFornecida = this.criptografar(senha)
        return senhFornecida === senhaCriptografada
    }
}