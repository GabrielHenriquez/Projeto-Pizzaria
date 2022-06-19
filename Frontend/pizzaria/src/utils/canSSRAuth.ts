import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies, destroyCookie } from 'nookies'
import { AuthTokenError } from '../services/errors/AuthTokenError'

//funcao para paginas que só users logados podem ter acesso.
export function canSSRAuth<P>(fn: GetServerSideProps<P>){
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(context);    
    const token = cookies['@project.token'];

    //Se o usuário tentar acessar a página porem não tendo feito login, redirecionamos
    if(!token){
      console.log('Usuario sem login')
      return{
        redirect:{
          destination: '/',
          permanent: false,
        }
      }
    }

    try{
      return await fn(context);
    }catch(error){
      if(error instanceof AuthTokenError){
        destroyCookie(context, '@project.token');
        return{
          redirect:{
            destination: '/',
            permanent: false
          }
        }
      }
    }
  }
}