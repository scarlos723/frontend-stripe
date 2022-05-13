
import './App.css'
import { loadStripe } from '@stripe/stripe-js'
import { Elements ,CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from 'axios'
const stripePromise = loadStripe('public key')

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements() //manipula los elementos en el return (CardElement)
  
  async function handleSubmit (e){
    e.preventDefault()
    const{error, paymentMethod} = await stripe.createPaymentMethod({
      type:'card',
      card: elements.getElement(CardElement) //Se elige el elemento que quiere obtener
    })
    if(!error){
      //console.log(paymentMethod)
      const {id} = paymentMethod //Extrae el id de la transaccion

      const response = await axios.post('http://localhost:3001/api/checkout',
        {
          id,
          amount: 100/0.01 //10000 centavos = 100 dolares
        })
      if (response){
        console.log('respuenta en checkout', response)
      }
    }else{
      console.log('Error:', error)
    }
    
  }
  return(
    <form onSubmit={handleSubmit}>
      <h3>FilmCoin</h3>
      <p>Venta de Filmcoins</p>
      <p>PRICE: $100</p>
      <CardElement />
      <button >Buy</button>
    </form>
  )
}



function App() {
  

  return (
    <div className='container'>
      <h1>Front stripe</h1>
  
      <div className='grid-contain'>
        
        <div className='card'>
        <h2>Ejemplo Stripe</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
        </div>
      
        <div className='card'>
        <h2>Procedimiento stripe</h2>
          <ul>
            <li>Primero se manda la info de la compra a estripe</li>
            <li>Stripe retorna un id de la transaccion </li>
            <li>El id se debe enviar a un backend para mas seguridad</li>
          </ul>
        </div>
      </div>

    </div>
  
  )
}

export default App
