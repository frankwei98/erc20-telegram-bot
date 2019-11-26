import * as functions from 'firebase-functions';

type FirebaseConfigGetter = () => string
const INFURA_ID: FirebaseConfigGetter = () => functions.config().infura.id
// const INFURA_SECRET :FirebaseConfigGetter = () => functions.config().infura.secret

// Infura API Endpoints for 3 networks
export default {
    "MAINNET": `https://mainnet.infura.io/v3/${INFURA_ID()}`,
    "ROPSTEN": `https://ropsten.infura.io/v3/${INFURA_ID()}`,
    "KOVAN": `https://kovan.infura.io/v3/${INFURA_ID()}`,
}