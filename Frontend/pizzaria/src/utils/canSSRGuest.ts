//Aquirvo da Page utils onde se utilizará do Server side Rendering
//Para Validar que só usuários não logados poderam acessar as rotas não privadas.

import { GetServerSideProps, GetServerSidePropsResult, GetServerSidePropsContext } from "next";
import nookies from 'nookies'

//função para páginas que só poderá ser acessadas por visitantes.
export function canSSRGuest<P>(fn: GetServerSideProps<P>){
    return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        
        const cookies = nookies.get(context)
        const token = cookies['@project.token']

        //Se o usuário tentar acessar a página porem tendo já um login salvo, redirecionamos
        if(token){
            return {
                redirect:{
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }

        return await fn(context)
    }
}
 