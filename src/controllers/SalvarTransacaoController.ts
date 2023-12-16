import SalvarTransacao from "../core/transacao/SalvarTransacao";
import { Express, Request, Response } from "express";

export default class SalvarTransacaoController {

    constructor(
        private servidor: Express,
        private casoDeUso: SalvarTransacao,
        ...middleware: any[]
    ) {
        const fn = async (req: Request, res: Response) => {
            try {
               const resposta = await casoDeUso.executar()
                res.status(200).json(resposta)
            } catch(err: any) {
                res.status(403).send(err.message)
            }
        }
        servidor.post('/transacao', middleware , fn)
    }
}