// What to tell the user about a failed request, and what they can do about it

const serviceNames = { steam: 'A Steam', itad: 'O IsThereAnyDeal' }
const keyNames = { steam: 'STEAM_API_KEY', itad: 'ITAD_API_KEY' }

export const publicProfileHint = 'No seu perfil da Steam, em Privacidade, deixe “Detalhes dos jogos” como Público.'

export const describeError = (error) => {
  const service = error?.service ?? 'steam'
  switch (error?.code) {
    case 'private-profile':
      return `Seu perfil não mostra esses dados publicamente. ${publicProfileHint}`
    case 'unauthorized':
      return `${serviceNames[service]} recusou a chave de API. Confira ${keyNames[service]} no .env.local e reinicie o yarn start.`
    case 'network':
      return 'Não foi possível falar com o servidor local. Confira se o app está rodando com yarn start.'
    case 'unavailable':
      return `${serviceNames[service]} está fora do ar ou instável. Tente novamente em alguns minutos.`
    default:
      return 'Verifique sua conexão e as chaves de API no .env.local.'
  }
}
